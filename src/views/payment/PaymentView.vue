<script setup>
import { onMounted, ref, computed, onBeforeUnmount } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { usePaymentStore } from '@/stores/paymentStore';
import { useLivestockStore } from '@/stores/livestockStore';

import { format } from 'date-fns';
import { id } from 'date-fns/locale';

const router = useRouter();
const searchQuery = ref('');

const storePayment = usePaymentStore();
const storeLivestock = useLivestockStore();
const role = localStorage.getItem('role');
const startNumber = 1;

const payments = ref([]);
const payment = ref({});

const _payment = ref({
  status: true,
});

const fetchPayments = async () => {
  try {
    payments.value = await storePayment.fetchPayments();
  } catch (error) {
    console.error(error);
  }
};

const formatDate = (date) => {
  const formattedDate = format(new Date(date), 'dd MMMM yyyy', { locale: id });
  return formattedDate;
};

const autoReload = () => {
  fetchPayments();
};

const reloadInterval = setInterval(autoReload, 10000);

onBeforeUnmount(() => {
  clearInterval(reloadInterval);
});

const processLivestock = async (livestock) => {
  try {
    const _livestock = ref({
      livestock_type_id: livestock.livestock_type_id,
      livestock_species_id: livestock.livestock_species_id,
      gender: livestock.gender,
      age: livestock.age,
      price: livestock.price,
      status: true,
      detail: livestock.condition,
    });
    await storeLivestock.putLivestockById(livestock.id, _livestock.value);
    fetchPayments();
  } catch (error) {
    console.error(error);
  }
};

const processPaymentLivestock = async (paymentId, livestock) => {
  try {
    payment.value = await storePayment.putPaymentById(paymentId, _payment.value);
    if (role === 'seller') {
      processLivestock(livestock);
    } else {
      fetchPayments();
    }
  } catch (error) {
    console.error(error);
  }
};

const deletePayment = async (paymentId) => {
  try {
    await storePayment.deletePaymentById(paymentId);
    fetchPayments();
  } catch (error) {
    console.error(error);
  }
};

const autoNumber = (i) => {
  return startNumber * i + 1;
};

const goBack = () => {
  router.back();
};

onMounted(() => {
  fetchPayments();
});

const filteredPayments = computed(() => {
  if (searchQuery.value === '') {
    return payments.value;
  } else {
    const query = searchQuery.value.toLowerCase();
    return payments.value.filter((payment) => {
      const paymentName = payment.transaction.profile.name.toLowerCase();
      const paymentPhoneNumber = payment.transaction.profile.phone_number.toLowerCase();
      return paymentName.includes(query) || paymentPhoneNumber.includes(query);
    });
  }
});
</script>
<template>
  <div class="row">
    <div class="col-md-9">
      <button @click="goBack" class="btn btn-secondary my-2"><i class="bi bi-arrow-left"></i> Kembali</button>
    </div>
    <div class="col-md-3 text-end">
      <h2 class="mb-4">Pembayaran</h2>
    </div>
    <div class="col-md-12">
      <input v-model="searchQuery" class="form-control mb-2" type="search" placeholder="Cari Pembeli atau No. Telepon" aria-label="Search" />
    </div>
  </div>
  <div class="payments" v-if="filteredPayments[0] && filteredPayments[0].transaction.profile && filteredPayments[0].transaction.livestock && filteredPayments[0].transaction.livestock.livestock_type && filteredPayments[0].transaction.livestock.livestock_species && filteredPayments[0].transaction.livestock.profile">
    <div class="bg-body rounded shadow-sm">
      <div class="table-responsive px-3 pt-4">
        <table class="table text-truncate">
          <thead>
            <tr>
              <th>No.</th>
              <th>Pembeli</th>
              <th>No. Telepon</th>
              <th>Tanggal Pembayaran</th>
              <th>Metode Pembayaran</th>
              <th>Hewan Ternak</th>
              <th>Harga (Rp)</th>
              <th>Status</th>
              <th v-if="role !== 'buyer'" class="text-center">Aksi</th>
            </tr>
          </thead>
          <tbody v-for="(payment, i) in filteredPayments" :key="payment.id">
            <tr>
              <td>{{ autoNumber(i) }}</td>
              <td>{{ payment.transaction.profile.name }}</td>
              <td>{{ payment.transaction.profile.phone_number }}</td>
              <td>{{ formatDate(payment.transaction.date) }}</td>
              <td>{{ payment.transaction.method }}</td>
              <td>{{ payment.transaction.livestock.livestock_type.name }} ({{ payment.transaction.livestock.livestock_species.name }})</td>
              <td>{{ $n(payment.transaction.livestock.price, 'currency', 'id-ID') }}</td>
              <td>
                <span v-if="payment.status && payment.transaction.livestock.status" class="text-success"> Diterima</span>
                <span v-else-if="!payment.status && !payment.transaction.livestock.status && role === 'seller'" class="text-info"> Silahkan di konfirmasi</span>
                <span v-else-if="payment.status && !payment.transaction.livestock.status && role === 'buyer'" class="text-info"> Silahkan di konfirmasi</span>
                <span v-else class="text-info"> Dalam Proses</span>
              </td>
              <td class="text-truncate text-center">
                <button v-if="!payment.status && !payment.transaction.livestock.status && role === 'seller'" data-bs-toggle="modal" :data-bs-target="'#showModalpayment-' + payment.id" class="btn btn-secondary me-2"><i class="bi bi-wallet"></i> Konfirmasi</button>
                <div :id="'showModalpayment-' + payment.id" class="modal modal-lg" tabindex="-1" role="dialog">
                  <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title">Konfirmasi Pembayaran</h5>
                        <button type="button" class="btn-close text-reset" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div class="modal-body text-start">
                        <p>Apakah Anda sudah menerima pembayaran dari {{ payment.transaction.profile.name }}</p>
                        <span>
                          <b>{{ $n(payment.transaction.livestock.price, 'currency', 'id-ID') }}</b
                          >?
                        </span>
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Tidak</button>
                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="processPaymentLivestock(payment.id, payment.transaction.livestock)">Ya</button>
                      </div>
                    </div>
                  </div>
                </div>

                <button v-if="role !== 'buyer'" data-bs-toggle="modal" :data-bs-target="'#showModalDelete-' + payment.id" class="btn btn-danger"><i class="bi bi-eraser-fill"></i> Hapus</button>
                <div :id="'showModalDelete-' + payment.id" class="modal modal-lg" tabindex="-1" role="dialog">
                  <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="document">
                    <div class="modal-content">
                      <div class="modal-header bg-light">
                        <h5 class="modal-title">Konfirmasi Hapus</h5>
                        <button type="button" class="btn-close text-reset" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div class="modal-body text-start">
                        <p>Anda yakin ingin menghapus</p>
                        <span>
                          Pembayaran <b>{{ payment.transaction.livestock.livestock_type.name }}</b
                          >?
                        </span>
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal" @click="deletePayment(payment.id)">Ya</button>
                      </div>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
          <tfoot></tfoot>
        </table>
      </div>
    </div>
  </div>
  <div class="payments" v-else>
    <h2 class="mb-4">Loading...</h2>
  </div>
</template>
