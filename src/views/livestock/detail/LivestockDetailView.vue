<script setup>
import { ref, onMounted } from 'vue';
import { useLivestockStore } from '@/stores/livestockStore';
import { useRoute } from 'vue-router';

const store = useLivestockStore();
const route = useRoute();
const livestockId = route.params.id;

const livestock = ref([]);

const fetchLivestockById = async () => {
  try {
    livestock.value = await store.fetchLivestockById(livestockId);
  } catch (error) {
    console.error('Kesalahan dalam mengambil data detail livestock:', error);
  }
};

onMounted(fetchLivestockById);
</script>

<template>
  <div class="livestock-detail" v-if="livestock && livestock.livestock_photos && livestock.profile && livestock.livestock_type && livestock.livestock_species">
    <h2 class="mb-4">Hewan Ternak {{ livestock.livestock_type.name }} {{ livestock.livestock_species.name }}</h2>
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
              <td>{{ livestock.sold === 0 ? 'Tersedia' : 'Terjual' }}</td>
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
