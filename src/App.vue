<script setup>
import { computed } from 'vue';

import navbarAdmin from '@/views/layouts/navbar/NavbarAdmin.vue';
import navbarUser from '@/views/layouts/navbar/NavbarUser.vue';
import navbarGuest from '@/views/layouts/navbar/NavbarGuest.vue';

import offcanvasAdmin from '@/views/layouts/offcanvas/OffcanvasAdmin.vue';
import offcanvasSeller from '@/views/layouts/offcanvas/offcanvasSeller.vue';
import offcanvasBuyer from '@/views/layouts/offcanvas/offcanvasBuyer.vue';
import GlobalLoader from './components/GlobalLoader.vue';

const isLoggedIn = localStorage.getItem('isLoggedIn');

const role = localStorage.getItem('role');
const token = localStorage.getItem('token');

const login = computed(() => {
  return isLoggedIn === 'true' && role !== null && token !== null;
});
</script>

<template>
  <header>
    <navbarAdmin v-if="login && role === 'admin'" />
    <navbarUser v-else-if="(login && role === 'seller') || (login && role === 'buyer')" />
    <navbarGuest v-else />
  </header>

  <main class="container" style="padding-top: 5rem">
    <div class="offcanvas" v-if="login">
      <offcanvasAdmin v-if="role === 'admin'" />
      <offcanvasSeller v-if="role === 'seller'" />
      <offcanvasBuyer v-if="role === 'buyer'" />
    </div>
    <GlobalLoader />
    <router-view />
  </main>

  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1220 122">
    <path
      fill="#0d6efd"
      fill-opacity="1"
      d="M0,32L48,37.3C96,43,192,53,288,58.7C384,64,480,64,576,58.7C672,53,768,43,864,48C960,53,1056,75,1152,74.7C1248,75,1344,53,1392,42.7L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
    ></path>
  </svg>

  <footer class="text-center text-white bg-primary pb-2">
    <div class="container">
      <div class="row">
        <div class="col-md-4">
          <h5>Tentang Kami</h5>
          <p>Kami adalah perusahaan yang berkomitmen untuk memberikan solusi terbaik kepada pelanggan.</p>
        </div>
        <div class="col-md-4">
          <h5>Hubungi Kami</h5>
          <ul class="list-unstyled">
            <li>
              <a href="https://maps.google.com" target="_blank" class="nav-link text-white"><i class="bi bi-geo-alt"></i> Jalan Contoh No. 123</a>
            </li>
            <li>
              <a href="https://wa.me/1234567890" target="_blank" class="nav-link text-white"><i class="bi bi-telephone"></i> (123) 456-7890</a>
            </li>
            <li>
              <a href="mailto:info@contoh.com" class="nav-link text-white"><i class="bi bi-envelope"></i> info@contoh.com</a>
            </li>
          </ul>
        </div>
        <div class="col-md-4">
          <h5>Ikuti Kami</h5>
          <ul class="list-unstyled">
            <li>
              <a href="#" class="nav-link text-white"><i class="bi bi-facebook"></i> Facebook</a>
            </li>
            <li>
              <a href="#" class="nav-link text-white"><i class="bi bi-twitter"></i> Twitter</a>
            </li>
            <li>
              <a href="#" class="nav-link text-white"><i class="bi bi-instagram"></i> Instagram</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>
