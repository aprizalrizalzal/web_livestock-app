<script setup>
import Logout from '@/views/auth/LogoutView.vue';
</script>
<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm fixed-top">
    <div class="container">
      <a class="navbar-brand" data-bs-toggle="offcanvas" href="#offcanvasStart" role="button" aria-controls="offcanvasStart">Hewan Ternak <i class="btn text-white bi bi-chevron-compact-right"></i></a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'dashboard' }" exact-active-class="active">Dashboard</router-link>
          </li>
        </ul>
        <div class="dropdown ms-auto">
          <button class="btn btn-outline-primary dropdown-toggle text-white" type="button" data-bs-toggle="dropdown" aria-expanded="false">Profile</button>
          <ul class="dropdown-menu">
            <router-link class="dropdown-item" :to="{ name: 'profile' }" exact-active-class="active"><i class="bi bi-person-fill-gear"></i> Pengaturan</router-link>
            <Logout />
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>
