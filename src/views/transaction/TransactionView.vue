<script setup>
import { ref, onMounted, computed, onBeforeUnmount } from 'vue';
import { useTransactionStore } from '@/stores/transactionStore';
import { usePaymentStore } from '@/stores/paymentStore';
import { useRouter } from 'vue-router';

const storeTransaction = useTransactionStore();
const storePayment = usePaymentStore();
const router = useRouter();
const role = localStorage.getItem('role');
const searchQuery = ref('');
const startNumber = 1;

const transactions = ref([]);
const transaction = ref({});
const payment = ref({});
const transactionMethod = ref(['Bayar di tempat', 'Lain-nya']);
const selectedTransactionMethod = ref({});
const _transaction = ref({
  status: true,
  method: selectedTransactionMethod,
});

const message = ref('');

const fetchTransactions = async () => {
  try {
    transactions.value = await storeTransaction.fetchTransactions();
  } catch (error) {
    console.error('Kesalahan dalam mengambil data transactions:', error);
    message.value = error;
  }
};

const autoReload = () => {
  fetchTransactions();
};

const reloadInterval = setInterval(autoReload, 10000);

onBeforeUnmount(() => {
  clearInterval(reloadInterval);
});

const processTransaction = async (transactionId) => {
  try {
    transaction.value = await storeTransaction.putTransactionById(transactionId, _transaction.value);
    fetchTransactions();
  } catch (error) {
    console.error('Kesalahan dalam mengirim data transaction:', error);
    message.value = error;
  }
};

const methodTransaction = async (transactionId) => {
  try {
    transaction.value = await storeTransaction.putTransactionById(transactionId, _transaction.value);
    processPayment(transactionId);
  } catch (error) {
    console.error('Kesalahan dalam mengirim data transaction:', error);
    message.value = error;
  }
};

const processPayment = async (transactionId) => {
  try {
    payment.value = await storePayment.postPaymentByIdTransaction(transactionId);
    router.push({ name: 'payments' });
  } catch (error) {
    console.error('Kesalahan dalam mengirim data payment:', error);
    message.value = error;
  }
};

const deleteTransaction = async (transactionId) => {
  try {
    await storeTransaction.deleteTransactionById(transactionId);
    fetchTransactions();
  } catch (error) {
    console.error('Kesalahan dalam menghapus transaction');
    message.value = error;
  }
};

const _transactionMethod = computed(() => {
  return transaction.value.method === null;
});

const autoNumber = (i) => {
  return startNumber * i + 1;
};

const goBack = () => {
  router.back();
};

onMounted(() => {
  fetchTransactions();
});

const filteredTransactions = computed(() => {
  if (searchQuery.value === '') {
    return transactions.value;
  } else {
    const query = searchQuery.value.toLowerCase();
    return transactions.value.filter((transaction) => {
      const transactionName = transaction.livestock.profile.name.toLowerCase();
      const transactionPhoneNumber = transaction.livestock.profile.phone_number.toLowerCase();
      return transactionName.includes(query) || transactionPhoneNumber.includes(query);
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
      <h2 class="mb-4">Transaksi</h2>
    </div>
    <div class="col-md-12">
      <input v-model="searchQuery" class="form-control mb-2" type="search" placeholder="Cari Penjual atau No. Telepon" aria-label="Search" />
    </div>
    <div v-if="message" class="mt-3 text-center">
      <div class="alert alert-danger">
        <small>{{ message }}</small>
      </div>
    </div>
  </div>
  <div class="transactions" v-if="filteredTransactions[0] && filteredTransactions[0].profile && filteredTransactions[0].livestock && filteredTransactions[0].livestock.livestock_type && filteredTransactions[0].livestock.livestock_species && filteredTransactions[0].livestock.profile">
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
          <tbody v-for="(transaction, i) in filteredTransactions" :key="transaction.id">
            <tr>
              <td>{{ autoNumber(i) }}</td>
              <td>{{ transaction.profile.name }}</td>
              <td>{{ transaction.date }}</td>
              <td>{{ transaction.livestock.livestock_type.name }} ({{ transaction.livestock.livestock_species.name }})</td>
              <td>{{ transaction.livestock.profile.name }}</td>
              <td>{{ transaction.livestock.profile.phone_number }}</td>
              <td>{{ $n(transaction.livestock.price, 'currency', 'id-ID') }}</td>
              <td>
                <span v-if="transaction.status && transaction.livestock.status" class="text-success"> Diterima</span>
                <span v-else-if="!transaction.status && !transaction.livestock.status && !_transactionMethod && role === 'seller'" class="text-info"> Silahkan diproses</span>
                <span v-else-if="!transaction.status && !transaction.livestock.status && !_transactionMethod && role === 'buyer'" class="text-info"> Sedang diproses penjual</span>
                <router-link v-else-if="transaction.status && !transaction.livestock.status && !_transactionMethod && role === 'seller'" class="text-info" :to="{ name: 'payments' }"> Lihat pembayaran dari pembeli</router-link>
                <span v-else-if="transaction.status && !transaction.livestock.status && !_transactionMethod && role === 'buyer'" class="text-info"> Lanjutkan pembayaran</span>
                <span v-else class="text-info"> Dalam Proses</span>
              </td>
              <td class="text-truncate text-center">
                <button v-if="!transaction.status && !transaction.livestock.status && !_transactionMethod && role === 'seller'" data-bs-toggle="modal" :data-bs-target="'#showModalTransaction-' + transaction.id" class="btn btn-secondary me-2"><i class="bi bi-cart-check-fill"></i> Proses</button>
                <div :id="'showModalTransaction-' + transaction.id" class="modal modal-lg" tabindex="-1" role="dialog">
                  <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title">Konfirmasi Proses Transaksi</h5>
                        <button type="button" class="btn-close text-reset" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div class="modal-body text-start">
                        <p>Anda yakin ingin memproses</p>
                        <span>
                          Transaksi <b>{{ transaction.livestock.livestock_type.name }}</b
                          >?
                        </span>
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Tidak</button>
                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="processTransaction(transaction.id)">Ya</button>
                      </div>
                    </div>
                  </div>
                </div>

                <button v-if="transaction.status && !transaction.livestock.status && !_transactionMethod && role === 'buyer'" data-bs-toggle="modal" :data-bs-target="'#showModalPayment-' + transaction.id" class="btn btn-secondary me-2"><i class="bi bi-cart-check-fill"></i> Bayar</button>
                <div :id="'showModalPayment-' + transaction.id" class="modal modal-lg" tabindex="-1" role="dialog">
                  <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title">Konfirmasi Proses Pembayaran</h5>
                        <button type="button" class="btn-close text-reset" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div class="modal-body text-start">
                        <p>Anda yakin ingin memproses transaksi ini?</p>
                        <div class="mb-3">
                          <p for="payment" class="form-label">Pilih Metode Pembayaran</p>
                          <select class="form-select" :id="'transactionMethod-' + transaction.id" v-model="selectedTransactionMethod">
                            <option v-for="optionPayment in transactionMethod" :value="optionPayment" :key="optionPayment">
                              {{ optionPayment }}
                            </option>
                          </select>
                        </div>
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Tidak</button>
                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="methodTransaction(transaction.id, _transaction.method)">Ya</button>
                      </div>
                    </div>
                  </div>
                </div>

                <button data-bs-toggle="modal" :data-bs-target="'#showModalDelete-' + transaction.id" class="btn btn-danger"><i class="bi bi-eraser-fill"></i> Hapus</button>
                <div :id="'showModalDelete-' + transaction.id" class="modal modal-lg" tabindex="-1" role="dialog">
                  <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="document">
                    <div class="modal-content">
                      <div class="modal-header bg-light">
                        <h5 class="modal-title">Konfirmasi Hapus</h5>
                        <button type="button" class="btn-close text-reset" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div class="modal-body text-start">
                        <p>Anda yakin ingin menghapus</p>
                        <span>
                          Transaksi <b>{{ transaction.livestock.livestock_type.name }}</b
                          >?
                        </span>
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal" @click="deleteTransaction(transaction.id)">Ya</button>
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
