<script setup>
import { onMounted, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { usePaymentStore } from '@/stores/paymentStore';

const router = useRouter();
const searchQuery = ref('');

const storePayment = usePaymentStore();
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
    console.error('Kesalahan dalam mengambil data payments:', error);
  }
};

const processPayment = async (paymentId) => {
  try {
    payment.value = await storePayment.putPaymentById(paymentId, _payment.value);
    fetchPayments();
  } catch (error) {
    console.error('Kesalahan dalam mengirim data payment:', error);
  }
};

const autoNumber = (i) => {
  return startNumber * i + 1;
};

const goBack = () => {
  router.back();
};

onMounted(fetchPayments);
</script>
<template>
  <div class="payments" v-if="payments[0] && payments[0].transaction.profile && payments[0].transaction.livestock && payments[0].transaction.livestock.livestock_type && payments[0].transaction.livestock.livestock_species && payments[0].transaction.livestock.profile">
    <div class="row">
      <div class="col-md-9">
        <button @click="goBack" class="btn btn-secondary my-2"><i class="bi bi-arrow-left"></i> Kembali</button>
      </div>
      <div class="col-md-3 text-end">
        <h2 class="mb-4">Pembayaran</h2>
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
              <th>No. Telepon</th>
              <th>Tanggal Pembayaran</th>
              <th>Metode Pembayaran</th>
              <th>Hewan Ternak</th>
              <th>Harga</th>
              <th>Status</th>
              <th class="text-center">Aksi</th>
            </tr>
          </thead>
          <tbody v-for="(payment, i) in payments" :key="payment.id">
            <tr>
              <td>{{ autoNumber(i) }}</td>
              <td>{{ payment.transaction.profile.name }}</td>
              <td>{{ payment.transaction.profile.phone_number }}</td>
              <td>{{ payment.transaction.date }}</td>
              <td>{{ payment.transaction.method }}</td>
              <td>{{ payment.transaction.livestock.livestock_type.name }} ({{ payment.transaction.livestock.livestock_species.name }})</td>
              <td>{{ payment.transaction.livestock.price }}</td>
              <td>
                <span v-if="payment.status && payment.livestock.sold" class="text-success"> Diterima</span>
                <span v-else-if="!payment.status && !payment.transaction.livestock.sold && role === 'seller'" class="text-info"> Silahkan diproses</span>
                <span v-else-if="!payment.status && !payment.transaction.livestock.sold && role === 'buyer'" class="text-info"> Sedang diproses penjual</span>
                <span v-else-if="payment.status && !payment.transaction.livestock.sold && role === 'seller'" class="text-info"> Tunggu pembayaran dari pembeli</span>
                <span v-else-if="payment.status && !payment.transaction.livestock.sold && role === 'buyer'" class="text-info"> Lanjutkan pembayaran</span>
                <span v-else class="text-info"> Dalam Proses</span>
              </td>
              <td class="text-truncate text-center">
                <button v-if="!payment.status && !payment.transaction.livestock.sold && role === 'seller'" data-bs-toggle="modal" :data-bs-target="'#showModalpayment-' + payment.id" class="btn btn-secondary me-2"><i class="bi bi-cart-check-fill"></i> Diterima</button>
                <div :id="'showModalpayment-' + payment.id" class="modal" tabindex="-1" role="dialog">
                  <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title">Konfirmasi Proses Transaksi</h5>
                        <button type="button" class="btn-close text-reset" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div class="modal-body text-start">
                        <p>Anda yakin ingin memproses</p>
                        <span>
                          Transaksi <b>{{ payment.transaction.livestock.livestock_type.name }}</b
                          >?
                        </span>
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Tidak</button>
                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="processPayment(payment.id, _payment.status)">Ya</button>
                      </div>
                    </div>
                  </div>
                </div>

                <button v-if="!payment.status && !payment.transaction.livestock.sold && role === 'buyer'" data-bs-toggle="modal" :data-bs-target="'#showModalpayment-' + payment.id" class="btn btn-secondary me-2"><i class="bi bi-cart-check-fill"></i> Diterima</button>
                <div :id="'showModalpayment-' + payment.id" class="modal" tabindex="-1" role="dialog">
                  <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title">Konfirmasi Proses Transaksi</h5>
                        <button type="button" class="btn-close text-reset" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div class="modal-body text-start">
                        <p>Anda yakin ingin memproses</p>
                        <span>
                          Transaksi <b>{{ payment.transaction.livestock.livestock_type.name }}</b
                          >?
                        </span>
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Tidak</button>
                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="processPayment(payment.id, _payment.status)">Ya</button>
                      </div>
                    </div>
                  </div>
                </div>

                <button v-if="payment.status && !payment.livestock.sold && role === 'buyer'" data-bs-toggle="modal" :data-bs-target="'#showModalPayment-' + payment.id" class="btn btn-secondary me-2"><i class="bi bi-cart-check-fill"></i> Bayar</button>
                <div :id="'showModalPayment-' + payment.id" class="modal" tabindex="-1" role="dialog">
                  <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title">Konfirmasi Proses Pembayaran</h5>
                        <button type="button" class="btn-close text-reset" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div class="modal-body text-start">
                        <p>Anda yakin ingin memproses transaksi ini?</p>
                        <div class="mb-3">
                          <p for="payment" class="form-label">Pilih Metode Pembayaran</p>
                          <select class="form-select" :id="'paymentMethod-' + payment.id" v-model="selectedPaymentMethod">
                            <option v-for="optionPayment in paymentMethod" :value="optionPayment" :key="optionPayment">
                              {{ optionPayment }}
                            </option>
                          </select>
                        </div>
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Tidak</button>
                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="methodPayment(payment.id, _payment.method)">Ya</button>
                      </div>
                    </div>
                  </div>
                </div>

                <button data-bs-toggle="modal" :data-bs-target="'#showModalDelete-' + payment.id" class="btn btn-danger"><i class="bi bi-eraser-fill"></i> Hapus</button>
                <div :id="'showModalDelete-' + payment.id" class="modal modal-xl" tabindex="-1" role="dialog">
                  <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                      <div class="modal-header bg-light">
                        <h5 class="modal-title">Konfirmasi Hapus</h5>
                        <button type="button" class="btn-close text-reset" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div class="modal-body text-start">
                        <p>Anda yakin ingin menghapus</p>
                        <span>
                          Transaksi <b>{{ payment.transaction.livestock.livestock_type.name }}</b
                          >?
                        </span>
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal" @click="deletepayment(payment.id)">Ya</button>
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
