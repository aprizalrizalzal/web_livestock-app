<script setup></script>
<template>
  <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasStart" aria-labelledby="offcanvasStartLabel">
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="offcanvasStartLabel">Hewan Ternak</h5>
      <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body">
      <ul class="nav nav-underline flex-column">
        <li class="nav-item">
          <router-link class="nav-link text-secondary-emphasis" :to="{ name: 'home' }" exact-active-class="active"><i class="btn bi bi-house-door-fill"></i>Beranda</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link text-secondary-emphasis" :to="{ name: 'users' }" exact-active-class="active"><i class="btn bi bi-person-lines-fill"></i>Pengguna</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link text-secondary-emphasis" :to="{ name: 'livestocks' }" exact-active-class="active"><i class="btn bi bi-box-seam-fill"></i>Hewan Ternak</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link text-secondary-emphasis" :to="{ name: 'livestock-types' }" exact-active-class="active"><i class="btn bi bi-list-nested"></i>Jenis Hewan Ternak</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link text-secondary-emphasis" :to="{ name: 'transactions' }" exact-active-class="active"><i class="btn bi bi-clipboard-check-fill"></i>Transaksi</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link text-secondary-emphasis" :to="{ name: 'payments' }" exact-active-class="active"><i class="btn bi bi-wallet-fill"></i>Pembayaran</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link text-secondary-emphasis" :to="{ name: 'reports' }" exact-active-class="active"><i class="btn bi bi-file-earmark-text-fill"></i>Laporan</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link text-secondary-emphasis" :to="{ name: 'about' }" exact-active-class="active"><i class="btn bi bi-info-circle-fill"></i>About</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
