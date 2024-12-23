<script setup>
import { ref, onMounted, computed, onBeforeMount } from 'vue';
import { useLivestockStore } from '@/stores/livestockStore';
import { useRouter } from 'vue-router';

const store = useLivestockStore();
const router = useRouter();
const livestocks = ref([]);
const searchQuery = ref('');

const error = ref('');
const reload = localStorage.getItem('reloaded');

const fetchLivestocksAnonymous = async () => {
  try {
    livestocks.value = await store.fetchLivestocksAnonymous();
  } catch (error) {
    console.error('Kesalahan dalam mengambil data livestocks:', error);
    error.value = error;
  }
};

const navigateToDetail = (livestockId) => {
  router.push({ name: 'livestocks-detail', params: { id: livestockId } });
};

onMounted(() => {
  if (reload === 'false') {
    window.location.reload();
    localStorage.setItem('reloaded', true);
  }
  fetchLivestocksAnonymous();
});

const filteredLivestocks = computed(() => {
  if (searchQuery.value === '') {
    return livestocks.value;
  } else {
    const query = searchQuery.value.toLowerCase();
    return livestocks.value.filter((livestock) => {
      const livestockName = livestock.livestock_type.name.toLowerCase();
      const livestockSpecies = livestock.livestock_species.name.toLowerCase();
      const livestockAddress = livestock.profile.address.toLowerCase();
      return livestockName.includes(query) || livestockSpecies.includes(query) || livestockAddress.includes(query);
    });
  }
});
</script>

<template>
  <h2 class="mb-4">Beranda</h2>
  <div class="col-md-12">
    <input v-model="searchQuery" class="form-control mb-2" type="search" placeholder="Cari Hewan, Jenis, Alamat" aria-label="Search" />
  </div>
  <div v-if="error" class="mt-3 text-center">
    <div role="alert" class="fade alert alert-danger show">
      <small>{{ error }}</small>
    </div>
  </div>
  <div class="home" v-if="filteredLivestocks[0] && filteredLivestocks[0].profile && filteredLivestocks[0].livestock_type && filteredLivestocks[0].livestock_species">
    <div class="row justify-content-center">
      <div class="col-md-4 mb-2" v-for="livestock in filteredLivestocks" :key="livestock.id">
        <div class="card shadow-sm">
          <img :src="livestock.photo_url" class="card-img-top" style="height: 250px; object-fit: cover" :alt="livestock.livestock_type.name" />
          <div class="card-body m-0">
            <h5 class="card-title text-center">{{ livestock.livestock_type.name }} ({{ livestock.livestock_species.name }})</h5>
            <p class="card-text m-0"><i class="bi bi-wallet"></i> {{ $n(livestock.price, 'currency', 'id-ID') }}</p>
            <p class="card-text m-0"><i class="bi bi-person"></i> {{ livestock.profile.name }}</p>
            <p class="card-text m-0"><i class="bi bi-geo-alt"></i> {{ livestock.profile.address }}</p>
            <p class="card-text text-center">
              <i v-if="livestock.status" class="text-success">Terjual</i>
              <i v-else class="text-info">Tersedia</i>
            </p>
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
