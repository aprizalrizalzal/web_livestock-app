<script setup>
import { ref, watch, onMounted } from 'vue';
import { useLivestockStore } from '@/stores/livestockStore';
import { useRouter } from 'vue-router';

const store = useLivestockStore();
const router = useRouter();
const livestocks = ref([]);
const searchQuery = ref('');

const message = ref({});
const modalTrigger = ref(null);

watch(message, (newMessage) => {
  if (newMessage) {
    showModal();
  }
});

const triggerModalClick = () => {
  if (modalTrigger.value) {
    modalTrigger.value.click();
  }
};

const showModal = () => {
  triggerModalClick();
};

const fetchLivestocksAnonymous = async () => {
  try {
    livestocks.value = await store.fetchLivestocksAnonymous();
  } catch (error) {
    console.error('Kesalahan dalam mengambil data livestocks:', error);
    message.value = error;
  }
};

const navigateToDetail = (livestockId) => {
  router.push({ name: 'livestocks-detail', params: { id: livestockId } });
};

onMounted(() => {
  fetchLivestocksAnonymous();
  modalTrigger.value = document.querySelector('[data-bs-toggle="modal"][data-bs-target="#showModalMessage"]');
});
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
          <img :src="livestock.photo_url" class="card-img-top" style="height: 250px; object-fit: cover" :alt="livestock.livestock_type.name" />
          <div class="card-body m-0">
            <h5 class="card-title text-center">{{ livestock.livestock_type.name }} ({{ livestock.livestock_species.name }})</h5>
            <p class="card-text m-0"><i class="bi bi-wallet"></i> {{ livestock.price }}</p>
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
  <a ref="modalTrigger" data-bs-toggle="modal" data-bs-target="#showModalMessage" class="btn btn-warning me-2" style="display: none"><i class="bi bi-view-list"></i> Message</a>
  <div id="showModalMessage" class="modal modal-lg" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="document">
      <div class="modal-content">
        <div class="modal-header bg-light">
          <h5 class="modal-title">Pesan</h5>
          <button type="button" class="btn-close text-reset" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <p>{{ message }}</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Ya</button>
        </div>
      </div>
    </div>
  </div>
</template>
