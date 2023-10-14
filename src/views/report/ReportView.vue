<script setup>
import { onMounted, ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { usePaymentStore } from '@/stores/paymentStore';

import jsPDF from 'jspdf';
import 'jspdf-autotable';

const pdfData = ref(null);

const storePayment = usePaymentStore();
const router = useRouter();

const payments = ref([]);
const filteredPayments = ref([]);
const selectedMonth = ref('');
const message = ref('');

const fetchPayments = async () => {
  try {
    payments.value = await storePayment.fetchPayments();
    // Set filteredPayments to payments if selectedMonth is empty
    if (!selectedMonth.value) {
      filteredPayments.value = payments.value;
    } else {
      filterPaymentsByMonth();
    }
  } catch (error) {
    console.error('Kesalahan dalam mengambil data payments:', error);
    message.value = error;
  }
};

const filterPaymentsByMonth = () => {
  if (selectedMonth.value) {
    const [selectedMonthValue, selectedYear] = selectedMonth.value.split('/');
    const filteredPaymentsValue = payments.value.filter((payment) => {
      const paymentDate = new Date(payment.date);
      const paymentMonth = paymentDate.getMonth() + 1;
      const paymentYear = paymentDate.getFullYear();
      return paymentMonth.toString() === selectedMonthValue && paymentYear.toString() === selectedYear;
    });
    filteredPayments.value = filteredPaymentsValue;
  } else {
    filteredPayments.value = payments.value;
  }
};

const months = computed(() => {
  const monthsSet = new Set();
  for (const payment of payments.value) {
    const paymentDate = new Date(payment.date);
    const monthYear = `${paymentDate.getMonth() + 1}/${paymentDate.getFullYear()}`;
    monthsSet.add(monthYear);
  }
  return Array.from(monthsSet).sort();
});

const totalPaymentPrice = computed(() => {
  return filteredPayments.value.reduce((total, payment) => {
    return total + parseFloat(payment.price);
  }, 0);
});

const goBack = () => {
  router.back();
};

const viewPDF = () => {
  const doc = new jsPDF({
    orientation: 'landscape',
  });

  doc.text('Sistem Informasi Penjual Hewan Ternak di Nusa Tenggara Barat', doc.internal.pageSize.width / 2, 10, 'center');

  const tableData = [];
  const columns = ['No', 'Hewan Ternak', 'Tanggal Transaksi', 'Pembeli', 'No. Telepon', 'Tanggal Pembayaran', 'Penjual', 'No. Telepon', 'Status', 'Harga'];

  filteredPayments.value.forEach((payment, i) => {
    const rowData = [
      i + 1,
      `${payment.transaction.livestock.livestock_type.name} (${payment.transaction.livestock.livestock_species.name})`,
      payment.transaction.date,
      payment.transaction.profile.name,
      payment.transaction.profile.phone_number,
      payment.date,
      payment.transaction.livestock.profile.name,
      payment.transaction.livestock.profile.phone_number,
      payment.transaction.livestock.status ? 'Terjual' : 'Dalam Proses',
      payment.price,
    ];
    tableData.push(rowData);
  });

  doc.autoTable({
    head: [columns],
    body: tableData,
    startY: 20,
    styles: { font: 'helvetica', fontSize: 10 },
    columnStyles: { 1: { cellWidth: 'auto' } },
  });

  doc.autoTable({
    body: [[{ content: 'Total', colSpan: 8, styles: { halign: 'right' } }, totalPaymentPrice.value]],
    startY: doc.previousAutoTable.finalY + 10,
  });

  const totalPages = doc.internal.getNumberOfPages();

  doc.setPage(totalPages);
  doc.setFontSize(8);
  doc.text(`Tanggal ${new Date().toLocaleString('id-ID')}`, doc.internal.pageSize.getWidth() - 20, doc.internal.pageSize.getHeight() - 10, { align: 'right' });

  const pdfOutput = doc.output('datauristring');
  const blob = doc.output('blob');
  const pdfURL = URL.createObjectURL(blob);
  const newTabPdf = window.open('', '_blank');
  newTabPdf.location.href = pdfURL;
};

const autoNumber = (i) => {
  return i + 1;
};

onMounted(() => {
  fetchPayments();
});
</script>

<template>
  <div class="reports">
    <div class="row">
      <div class="col-md-9">
        <button @click="goBack" class="btn btn-secondary my-2"><i class="bi bi-arrow-left"></i> Kembali</button>
        <button @click="viewPDF" class="btn btn-primary mx-1"><i class="bi bi-file-pdf-fill"></i> Lihat Pdf</button>
      </div>
      <div v-if="pdfData">
        <embed :src="pdfData" type="application/pdf" width="100%" height="500px" />
      </div>
      <div class="col-md-3 text-end">
        <h2 class="mb-4">Laporan</h2>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6 text-start">
        <h4 class="mb-4">Bulan Pembayaran</h4>
      </div>
      <div class="col-md-6">
        <select v-model="selectedMonth" class="form-select mb-4" @change="filterPaymentsByMonth">
          <option value="">Semua Bulan</option>
          <option v-for="month in months" :key="month" :value="month">{{ month }}</option>
        </select>
      </div>
    </div>
    <div v-if="message" class="mt-3 text-center">
      <div class="alert alert-danger">
        <small>{{ message }}</small>
      </div>
    </div>
  </div>
  <div class="payments" v-if="filteredPayments[0] && filteredPayments[0].transaction.profile && filteredPayments[0].transaction.livestock && filteredPayments[0].transaction.livestock.livestock_type && filteredPayments[0].transaction.livestock.livestock_species && filteredPayments[0].transaction.livestock.profile">
    <div class="bg-body rounded shadow-sm">
      <div class="table-responsive px-3 pt-4">
        <table class="table text-truncate">
          <thead>
            <tr>
              <th>No.</th>
              <th>Hewan Ternak</th>
              <th>Tanggal Transaksi</th>
              <th>Pembeli</th>
              <th>No. Telepon</th>
              <th>Tanggal Pembayaran</th>
              <th>Penjual</th>
              <th>No. Telepon</th>
              <th>Status</th>
              <th>Harga</th>
            </tr>
          </thead>
          <tbody v-for="(payment, i) in filteredPayments" :key="payment.id">
            <tr>
              <td>{{ autoNumber(i) }}</td>
              <td>{{ payment.transaction.livestock.livestock_type.name }} ({{ payment.transaction.livestock.livestock_species.name }})</td>
              <td>{{ payment.transaction.date }}</td>
              <td>{{ payment.transaction.profile.name }}</td>
              <td>{{ payment.transaction.profile.phone_number }}</td>
              <td>{{ payment.date }}</td>
              <td>{{ payment.transaction.livestock.profile.name }}</td>
              <td>{{ payment.transaction.livestock.profile.phone_number }}</td>
              <td>
                <span v-if="payment.transaction.livestock.status" class="text-success"> Terjual</span>
                <span v-else class="text-info"> Dalam Proses</span>
              </td>
              <td>{{ $n(payment.price, 'currency', 'id-ID') }}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <th colspan="9">Total</th>
              <th>{{ totalPaymentPrice }}</th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  </div>
  <div v-else class="reports">
    <h2 class="mb-4">Loading...</h2>
  </div>
</template>
