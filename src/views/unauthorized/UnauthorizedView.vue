<script setup>
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();

const goBack = () => {
  router.back();
};
</script>
<template>
  <div class="unauthorized">
    <main class="mb-3">
      <div class="text-center">
        <h1 class="display-4 mt-5">Halaman Tidak Ditemukan</h1>
      </div>
      <div class="d-flex justify-content-center align-items-center">
        <p class="lead">Maaf, halaman yang Anda cari tidak dapat ditemukan.</p>
        <p class="lead">Silakan kembali ke halaman sebelumnya atau navigasikan ke halaman lain.</p>
      </div>
      <div class="d-flex justify-content-center align-items-center">
        <button @click="goBack" class="btn btn-outline-secondary"><i class="bi bi-back"></i> Kembali</button>
      </div>
    </main>
  </div>
</template>
