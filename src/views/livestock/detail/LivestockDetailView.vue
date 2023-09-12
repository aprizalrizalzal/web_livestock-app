<script setup>
import { ref, onMounted } from 'vue';
import { useLivestockStore } from '@/stores/livestockStore';
import { useTransactionStore } from '@/stores/transactionStore';
import { useRouter, useRoute } from 'vue-router';

const storeLivestock = useLivestockStore();
const storeTransaction = useTransactionStore();
const router = useRouter();
const route = useRoute();
const livestockId = route.params.id;

const livestock = ref({});
const transaction = ref({});

const fetchLivestockById = async () => {
  try {
    livestock.value = await storeLivestock.fetchLivestockById(livestockId);
  } catch (error) {
    console.error('Kesalahan dalam mengambil data detail livestock:', error);
  }
};

const addTransaction = async () => {
  try {
    transaction.value = await storeTransaction.postTransactionByIdLivestok(livestockId);
    router.push({ name: 'transactions' });
  } catch (error) {
    console.error('Kesalahan dalam mengirim data transaction:', error);
  }
};

const goBack = () => {
  router.back();
};

onMounted(fetchLivestockById);
</script>

<template>
  <div class="livestock-detail" v-if="livestock && livestock.livestock_photos && livestock.profile && livestock.livestock_type && livestock.livestock_species">
    <div class="row">
      <div class="col-md-9">
        <button @click="goBack" class="btn btn-secondary me-2"><i class="bi bi-arrow-left"></i> Kembali</button>
        <button data-bs-toggle="modal" :data-bs-target="'#showModal'" class="btn btn-primary my-2"><i class="bi bi-bag-fill"></i> Pesan Hewan</button>
      </div>
      <div :id="'showModal'" class="modal modal-lg" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Konfirmasi</h5>
              <button type="button" class="btn-close text-reset" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <p>
                Anda yakin ingin memesan hewan <b>{{ livestock.livestock_type.name }}</b> Jenis <b>{{ livestock.livestock_species.name }}</b
                >?
              </p>
              <p>Harga {{ livestock.price }}</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
              <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="addTransaction">Ya</button>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-3 text-end">
        <h2 class="mb-4">Hewan Ternak {{ livestock.livestock_type.name }} {{ livestock.livestock_species.name }}</h2>
      </div>
      <div class="col-md-12 mb-4">
        <div v-if="livestock.livestock_photos" :id="'carouselExampleCaptions-' + livestock.livestock_photos.id" class="carousel slide carousel-dark rounded">
          <ol class="carousel-indicators">
            <span v-for="(livestockPhoto, index) in livestock.livestock_photos" :key="index" :data-bs-target="'#carouselExampleCaptions-' + livestock.livestock_photos.id" :data-bs-slide-to="index" :class="{ active: index === 0 }"></span>
          </ol>
          <div class="carousel-inner">
            <div class="carousel-item" v-for="(livestockPhoto, index) in livestock.livestock_photos" :key="index" :class="{ active: index === 0 }">
              <img :src="livestockPhoto.photo_url" class="rounded mx-auto d-block" style="width: 100%; height: 600px; object-fit: cover" :alt="'Foto Hewan ternak ' + livestockPhoto.id" />
            </div>
          </div>
          <a class="carousel-control-prev" :href="'#carouselExampleCaptions-' + livestock.livestock_photos.id" role="button" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </a>
          <a class="carousel-control-next" :href="'#carouselExampleCaptions-' + livestock.livestock_photos.id" role="button" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </a>
        </div>
      </div>
    </div>
    <div class="bg-body rounded shadow-sm">
      <div class="table-responsive px-3 pt-4">
        <table class="table align-middle table-borderless table-sm">
          <thead></thead>
          <tbody>
            <tr>
              <td>Hewan Ternak</td>
              <td>{{ livestock.livestock_type.name }}</td>
            </tr>
            <tr>
              <td>Jenis</td>
              <td>{{ livestock.livestock_species.name }}</td>
            </tr>
            <tr>
              <td>Jenis Kelamin</td>
              <td>{{ livestock.gender === 'Male' ? 'Jantan' : 'Betina' }}</td>
            </tr>
            <tr>
              <td>Umur</td>
              <td>{{ livestock.age }} Tahun</td>
            </tr>
            <tr>
              <td>Harga</td>
              <td>{{ livestock.price }}</td>
            </tr>
            <tr>
              <td>Status</td>
              <td>{{ livestock.status === 0 ? 'Tersedia' : 'Terjual' }}</td>
            </tr>
            <tr>
              <td class="text-truncate">Detail</td>
              <td>{{ livestock.detail }}</td>
            </tr>
            <tr>
              <th>Penjual</th>
              <td></td>
            </tr>
            <tr>
              <td>Nama</td>
              <td>{{ livestock.profile.name }}</td>
            </tr>
            <tr>
              <td>Jenis Kelamin</td>
              <td>{{ livestock.profile.gender === 'Male' ? 'Laki-laki' : 'Perempuan' }}</td>
            </tr>
            <tr>
              <td>No. Telepon</td>
              <td>{{ livestock.profile.phone_number }}</td>
            </tr>
            <tr>
              <td>Alamat</td>
              <td>{{ livestock.profile.address }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <div class="livestock-detail" v-else>
    <h2>Loading...</h2>
  </div>
</template>
