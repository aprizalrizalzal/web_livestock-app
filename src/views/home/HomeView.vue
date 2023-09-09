<script setup>
import { ref, onMounted } from 'vue';
import { useLivestockStore } from '@/stores/livestockStore';
import { useRouter } from 'vue-router';

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

const navigateToDetail = (livestockId) => {
  router.push({ name: 'livestocks-detail', params: { id: livestockId } });
};

onMounted(fetchLivestocks);
</script>

<template>
  <div class="home" v-if="livestocks[0] && livestocks[0].profile && livestocks[0].livestock_type && livestocks[0].livestock_species">
    <h2 class="mb-4">Beranda</h2>
    <div class="col-md-12">
      <input v-model="searchQuery" class="form-control mb-2" type="search" placeholder="Cari Hewan, Jenis, Alamat" aria-label="Search" />
    </div>
    <div class="row justify-content-center">
      <div class="col-md-4 mb-2" v-for="livestock in livestocks" :key="livestock.id">
        <div class="card shadow-sm">
          <img :src="livestock.photo_url" class="card-img-top" :alt="livestock.livestock_type.name" />
          <div class="card-body m-0">
            <h5 class="card-title text-center">{{ livestock.livestock_type.name }} ({{ livestock.livestock_species.name }})</h5>
            <p class="card-text m-0"><i class="bi bi-wallet"></i> {{ livestock.price }}</p>
            <p class="card-text m-0"><i class="bi bi-person"></i> {{ livestock.profile.name }}</p>
            <p class="card-text"><i class="bi bi-geo-alt"></i> {{ livestock.profile.address }}</p>
            <button @click="navigateToDetail(livestock.id)" class="btn btn-primary"><i class="bi bi-view-list"></i> Lihat Detail</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="home" v-else>
    <h2 class="mb-4">Loading...</h2>
  </div>
</template>
