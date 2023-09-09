<script setup>
import { ref, onMounted } from 'vue';
import { useLivestockTypeStore } from '@/stores/livestockTypeStore';
import { useRouter, useRoute } from 'vue-router';

const store = useLivestockTypeStore();
const router = useRouter();
const livestockTypes = ref([]);

const goBack = () => {
  router.back();
};
</script>
<template>
  <div class="livestock-types-add">
    <div class="row">
      <div class="col-md-9">
        <button @click="goBack" class="btn btn-secondary my-2"><i class="bi bi-arrow-left"></i> Kembali</button>
      </div>
      <div class="col-md-3 text-end">
        <h2 class="mb-4">Tambah Jenis Hewan Ternak</h2>
      </div>
    </div>
  </div>
</template>
