<script setup>
import { ref, onMounted, computed } from 'vue';
import { useUserStore } from '@/stores/userStore';
import { useLivestockStore } from '@/stores/livestockStore';
import { useTransactionStore } from '@/stores/transactionStore';
import { usePaymentStore } from '@/stores/paymentStore';
import { useRouter } from 'vue-router';

import { LineChart } from 'vue-chart-3';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const storeUser = useUserStore();
const storeLivestock = useLivestockStore();
const storeTransaction = useTransactionStore();
const storePayment = usePaymentStore();
const router = useRouter();

const users = ref([]);
const livestocks = ref([]);
const transactions = ref([]);
const payments = ref([]);

const usersLength = ref('');
const livestocksLength = ref('');
const transactionsLength = ref('');
const paymentsLength = ref('');

const goBack = () => {
  router.back();
};

const buttonUser = () => {
  router.push({ name: 'users' });
};

const fetchUsers = async () => {
  try {
    users.value = await storeUser.fetchUsers();
    usersLength.value = users.value.length;
    fetchChartData();
  } catch (error) {
    console.error('Kesalahan dalam mengambil data users:', error);
  }
};

const buttonLivestock = () => {
  router.push({ name: 'livestocks' });
};

const fetchLivestocks = async () => {
  try {
    livestocks.value = await storeLivestock.fetchLivestocks();
    livestocksLength.value = livestocks.value.length;
    fetchChartData();
  } catch (error) {
    console.error('Kesalahan dalam mengambil data livestocks:', error);
  }
};

const buttonTransaction = () => {
  router.push({ name: 'transactions' });
};

const fetchTransactions = async () => {
  try {
    transactions.value = await storeTransaction.fetchTransactions();
    transactionsLength.value = transactions.value.length;
    fetchChartData();
  } catch (error) {
    console.error('Kesalahan dalam mengambil data transactions:', error);
  }
};

const buttonPayment = () => {
  router.push({ name: 'payments' });
};

const fetchPayments = async () => {
  try {
    payments.value = await storePayment.fetchPayments();
    paymentsLength.value = payments.value.length;
    fetchChartData();
  } catch (error) {
    console.error('Kesalahan dalam mengambil data payments:', error);
  }
};

const chartData = ref({
  labels: ['Pengguna', 'Hewan Ternak', 'Transaksi', 'Pembayaran'],
  datasets: [
    {
      label: 'Data',
      data: [],
      backgroundColor: ['#77CEFF', '#0079AF', '#123E6B', '#97B0C4'],
      borderColor: 'rgb(75, 192, 192)',
      fill: false,
      tension: 0.1,
    },
  ],
});

const fetchChartData = async () => {
  try {
    chartData.value.datasets[0].data = [parseInt(usersLength.value), parseInt(livestocksLength.value), parseInt(transactionsLength.value), parseInt(paymentsLength.value)];
  } catch (error) {
    console.error('Kesalahan dalam mengambil data:', error);
  }
};

onMounted(() => {
  fetchUsers();
  fetchLivestocks();
  fetchTransactions();
  fetchPayments();
});
</script>
<template>
  <div class="dashboard">
    <main class="mb-3">
      <div class="row">
        <div class="col">
          <button @click="goBack" class="btn btn-secondary"><i class="bi bi-back"></i> Kembali</button>
        </div>
        <div class="col text-end">
          <h4>Dashboard</h4>
        </div>
      </div>
      <hr />
      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-2 m-auto">
        <div class="col">
          <div class="card btn btn-primary shadow-sm" @click="buttonUser">
            <div class="row g-0">
              <div class="col-md-2 g-2">
                <i class="bi bi-person-fill"></i>
              </div>
              <div class="col-md-10">
                <div class="card-body">
                  <h5 class="card-title">Pengguna</h5>
                  <p class="card-text">
                    <small
                      >Jumlah pengguna <b>{{ usersLength }}</b></small
                    >
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col">
          <div class="card btn btn-primary shadow-sm" @click="buttonLivestock">
            <div class="row g-0">
              <div class="col-md-2 g-2">
                <i class="bi bi-box-seam-fill"></i>
              </div>
              <div class="col-md-10">
                <div class="card-body">
                  <h5 class="card-title">Hewan Ternak</h5>
                  <p class="card-text">
                    <small
                      >Jumlah Hewan <b>{{ livestocksLength }}</b></small
                    >
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col">
          <div class="card btn btn-primary shadow-sm" @click="buttonTransaction">
            <div class="row g-0">
              <div class="col-md-2 g-2">
                <i class="bi bi-clipboard-check-fill"></i>
              </div>
              <div class="col-md-10">
                <div class="card-body">
                  <h5 class="card-title">Transaksi</h5>
                  <p class="card-text">
                    <small
                      >Jumlah Transaksi <b>{{ transactionsLength }}</b></small
                    >
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col">
          <div class="card btn btn-primary shadow-sm" @click="buttonPayment">
            <div class="row g-0">
              <div class="col-md-2 g-2">
                <i class="bi bi-wallet-fill"></i>
              </div>
              <div class="col-md-10">
                <div class="card-body">
                  <h5 class="card-title">Pembayaran</h5>
                  <p class="card-text">
                    <small
                      >Jumlah pembayaran <b>{{ paymentsLength }}</b></small
                    >
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div class="my-8">
        <LineChart :chartData="chartData" />
      </div>
    </main>
  </div>
</template>
