<script setup>
import { ref, onMounted } from 'vue';
import { useLivestockStore } from '@/stores/livestockStore';
import { useRouter, useRoute } from 'vue-router';

const store = useLivestockStore();
const router = useRouter();
const livestocks = ref([]);
const searchQuery = ref([]);

const fetchLivestocks = async () => {
  try {
    livestocks.value = await store.fetchLivestocks();
  } catch (error) {
    console.error('Kesalahan dalam mengambil data livestocks:', error);
  }
};

const goBack = () => {
  router.back();
};

onMounted(fetchLivestocks);
</script>

<template>
  <div class="livestock-species">
    <div class="row">
      <div class="col-md-9">
        <button @click="goBack" class="btn btn-secondary my-2"><i class="bi bi-arrow-left"></i> Kembali</button>
      </div>
      <div class="col-md-3 text-end">
        <h2 class="mb-4">Spesies Dari Jenis Hewan Ternak</h2>
      </div>
      <div class="col-md-12">
        <input v-model="searchQuery" class="form-control mb-2" type="search" placeholder="Cari Nama, Email atau Pengguna" aria-label="Search" />
      </div>
    </div>
    <ul>
      <li v-for="livestock in livestocks" :key="livestock.id">{{ livestock }}</li>
    </ul>
  </div>
</template>
