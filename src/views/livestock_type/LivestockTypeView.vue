<script setup>
import { ref, onMounted } from 'vue';
import { useLivestockTypeStore } from '@/stores/livestockTypeStore';

const store = useLivestockTypeStore();
const livestockTypes = ref([]);

const fetchLivestockTypes = async () => {
  try {
    livestockTypes.value = await store.fetchLivestockTypes();
  } catch (error) {
    console.error('Kesalahan dalam mengambil data livestockTypes:', error);
  }
};

onMounted(fetchLivestockTypes);
</script>

<template>
  <div class="livestock-type">
    <h2 class="mb-4">Jenis Hewan Ternak</h2>
    <ul>
      <li v-for="livestockType in livestockTypes" :key="livestockType.id">{{ livestockType }}</li>
    </ul>
  </div>
</template>
