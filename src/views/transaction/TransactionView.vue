<script setup>
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const searchQuery = ref([]);

const goBack = () => {
  router.back();
};
</script>
<template>
  <div class="transactions">
    <div class="row">
      <div class="col-md-9">
        <button @click="goBack" class="btn btn-secondary my-2"><i class="bi bi-arrow-left"></i> Kembali</button>
      </div>
      <div class="col-md-3 text-end">
        <h2 class="mb-4">Transaksi</h2>
      </div>
      <div class="col-md-12">
        <input v-model="searchQuery" class="form-control mb-2" type="search" placeholder="Cari Nama, Email atau Pengguna" aria-label="Search" />
      </div>
    </div>
  </div>
  <div class="transactions">
    <h2 class="mb-4">Loading...</h2>
  </div>
</template>
