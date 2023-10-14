<script setup></script>
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
              <div class="col-md-2">
                <i class="btn bi bi-person-fill"></i>
              </div>
              <div class="col-md-10">
                <div class="card-body">
                  <h5 class="card-title">Pengguna</h5>
                  <p class="card-text">
                    <!-- <small class="text-body-secondary">Jumlah pengguna <b>{{ usersLength || 0 }}</b></small> -->
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col">
          <div class="card btn btn-primary shadow-sm" @click="buttonAnimal">
            <div class="row g-0">
              <div class="col-md-2">
                <i class="btn bi bi-box-seam-fill"></i>
              </div>
              <div class="col-md-10">
                <div class="card-body">
                  <h5 class="card-title">Hewan</h5>
                  <p class="card-text">
                    <!-- <small class="text-body-secondary">Jumlah Hewan <b>{{ animalsLength || 0 }}</b></small> -->
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col">
          <div class="card btn btn-primary shadow-sm" @click="buttonTransaction">
            <div class="row g-0">
              <div class="col-md-2">
                <i class="btn bi bi-clipboard-check-fill"></i>
              </div>
              <div class="col-md-10">
                <div class="card-body">
                  <h5 class="card-title">Transaksi</h5>
                  <p class="card-text">
                    <!-- <small class="text-body-secondary">Jumlah Transaksi <b>{{ transactionsLength || 0 }}</b></small> -->
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col">
          <div class="card btn btn-primary shadow-sm" @click="buttonPayment">
            <div class="row g-0">
              <div class="col-md-2">
                <i class="btn bi bi-wallet-fill"></i>
              </div>
              <div class="col-md-10">
                <div class="card-body">
                  <h5 class="card-title">Pembayaran</h5>
                  <p class="card-text">
                    <!-- <small class="text-body-secondary">Jumlah pembayaran <b>{{ paymentsLength || 0 }}</b></small> -->
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div class="my-8">
        <!-- <line-chart v-if="chartData.datasets[0].data.length > 0" :chart-data="chartData" :options="chartOptions"></line-chart> -->
      </div>
    </main>
  </div>
  <div class="dashboard">
    <h2 class="mb-4">Loading...</h2>
  </div>
</template>
