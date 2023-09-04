<script setup>
import { ref, onMounted } from 'vue';
import { useLivestockStore } from '@/stores/livestockStore';

const store = useLivestockStore();
const livestocks = ref([]);

const fetchLivestocks = async () => {
  try {
    livestocks.value = await store.fetchLivestocks();
  } catch (error) {
    console.error('Kesalahan dalam mengambil data livestocks:', error);
  }
};

onMounted(fetchLivestocks);
</script>

<template>
  <div class="livestock-species">
    <h2 class="mb-4">Spesies Dari Jenis Hewan Ternak</h2>
    <ul>
      <li v-for="livestock in livestocks" :key="livestock.id">{{ livestock }}</li>
    </ul>
  </div>
</template>
