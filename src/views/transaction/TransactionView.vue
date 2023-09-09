<script setup>
import { ref, onMounted } from 'vue';
import { useTransactionStore } from '@/stores/transactionStore';
// import { usePaymentStore } from '@/stores/paymentStore';
import { useRouter, useRoute } from 'vue-router';

const storeTransaction = useTransactionStore();
// const storePayment = usePaymentStore();
const router = useRouter();
const route = useRoute();
const transactionId = route.params.id;
const searchQuery = ref([]);
const startNumber = 1;

const transactions = ref([]);
const transaction = ref([]);
const payment = ref([]);

const fetchTransactions = async () => {
  try {
    transactions.value = await storeTransaction.fetchTransactions();
  } catch (error) {
    console.error('Kesalahan dalam mengambil data transactions:', error);
  }
};

// const addPayment = async () => {
//   try {
//     payment.value = await storePayment.postPaymentByIdTransaction(transactionId);
//     router.push({ name: 'payments' });
//   } catch (error) {
//     console.error('Kesalahan dalam mengirim data payment:', error);
//   }
// };

const autoNumber = (i) => {
  return startNumber * i + 1;
};

const goBack = () => {
  router.back();
};

onMounted(fetchTransactions);
</script>
<template>
  <div class="transactions" v-if="transactions[0] && transactions[0].profile && transactions[0].livestock && transactions[0].livestock.livestock_type && transactions[0].livestock.livestock_species && transactions[0].livestock.profile">
    <div class="row">
      <div class="col-md-9">
        <button @click="goBack" class="btn btn-secondary my-2"><i class="bi bi-arrow-left"></i> Kembali</button>
      </div>
      <div class="col-md-3 text-end">
        <h2 class="mb-4">Transaksi</h2>
      </div>
      <div class="col-md-12">
        <input v-model="searchQuery" class="form-control mb-2" type="search" placeholder="Cari Nama atau No. Telepon" aria-label="Search" />
      </div>
    </div>
    <div class="bg-body rounded shadow-sm">
      <div class="table-responsive px-3 pt-4">
        <table class="table text-truncate">
          <thead>
            <tr>
              <th>No.</th>
              <th>Pembeli</th>
              <th>Tanggal Transaksi</th>
              <th>Hewan Ternak</th>
              <th>Penjual</th>
              <th>No. Telepon</th>
              <th>Harga</th>
              <th>Status</th>
              <th class="text-center">Aksi</th>
            </tr>
          </thead>
          <tbody v-for="(transaction, i) in transactions" :key="transaction.id">
            <tr>
              <td>{{ autoNumber(i) }}</td>
              <td>{{ transaction.profile.name }}</td>
              <td>{{ transaction.date }}</td>
              <td>{{ transaction.livestock.livestock_type.name }} ({{ transaction.livestock.livestock_species.name }})</td>
              <td>{{ transaction.livestock.profile.name }}</td>
              <td>{{ transaction.livestock.profile.phone_number }}</td>
              <td>{{ transaction.livestock.price }}</td>
              <td>{{ transaction.status }}</td>
              <td class="text-truncate text-center">
                <button data-bs-toggle="modal" :data-bs-target="'#showModalDelete-' + transaction.id" class="btn btn-danger"><i class="bi bi-eraser-fill"></i> Hapus</button>
                <div :id="'showModalDelete-' + transaction.id" class="modal modal-xl" tabindex="-1" role="dialog">
                  <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                      <div class="modal-header bg-light">
                        <h5 class="modal-title">Konfirmasi Hapus</h5>
                        <button type="button" class="btn-close text-reset" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div class="modal-body">
                        <p>Anda yakin ingin menghapus</p>
                        <p>
                          Transaksi <b>{{ transaction.livestock.name }}</b
                          >?
                        </p>
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal" @click="deletetransaction(transaction.id)">Ya</button>
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
  <div class="transactions" v-else>
    <h2 class="mb-4">Loading...</h2>
  </div>
</template>
