<script setup>
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();

const goBack = () => {
  router.back();
};
</script>
<template>
  <div class="about">
    <div class="row">
      <div class="col-md-9">
        <button @click="goBack" class="btn btn-secondary my-2"><i class="bi bi-arrow-left"></i> Kembali</button>
      </div>
      <div class="col-md-3 text-end">
        <h2 class="mb-4">Tentang</h2>
      </div>
    </div>
  </div>
</template>
