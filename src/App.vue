<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';

import navbar from '@/views/layouts/Navbar.vue';
import navbarGuest from '@/views/layouts/NavbarGuest.vue';
import offcanvas from '@/views/layouts/Offcanvas.vue';

const isLoggedIn = computed(() => {
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  const token = localStorage.getItem('token');
  return isLoggedIn === 'true' && token;
});
</script>

<template>
  <header>
    <navbar v-if="isLoggedIn" />
    <navbarGuest v-else />
  </header>

  <offcanvas />

  <main class="container" style="padding-top: 5rem">
    <router-view />
  </main>

  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1220 120">
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
