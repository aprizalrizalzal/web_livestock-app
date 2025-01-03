<script setup>
import { ref, onMounted, computed } from 'vue';
import { useLivestockStore } from '@/stores/livestockStore';
import { useRouter, useRoute } from 'vue-router';

const store = useLivestockStore();
const router = useRouter();
const route = useRoute();
const profileId = route.params.id;
const livestocks = ref([]);
const searchQuery = ref('');
const startNumber = 1;

const role = localStorage.getItem('role');

const fetchLivestocks = async () => {
  try {
    livestocks.value = await store.fetchLivestocks();
  } catch (error) {
    console.error(error);
  }
};

const fetchLivestocksByIdProfile = async () => {
  try {
    livestocks.value = await store.fetchLivestocksByIdProfile(profileId);
  } catch (error) {
    console.error(error);
  }
};

const navigateToAdd = () => {
  router.push({ name: 'livestocks-add' });
};

const navigateToEdit = (livestockId) => {
  router.push({ name: 'livestocks-edit', params: { id: livestockId } });
};

const navigateToDetail = (livestockId) => {
  router.push({ name: 'livestocks-detail', params: { id: livestockId } });
};

const deleteLivestockById = async (livestockId) => {
  try {
    livestocks.value = await store.deleteLivestockById(livestockId);
    if (profileId) {
      fetchLivestocksByIdProfile();
    } else {
      fetchLivestocks();
    }
  } catch (error) {
    console.error(error);
  }
};

const goBack = () => {
  router.back();
};

const autoNumber = (i) => {
  return startNumber * i + 1;
};

onMounted(() => {
  if (profileId) {
    fetchLivestocksByIdProfile();
  } else {
    fetchLivestocks();
  }
});

const filteredLivestocks = computed(() => {
  if (searchQuery.value === '') {
    return livestocks.value;
  } else {
    const query = searchQuery.value.toLowerCase();
    return livestocks.value.filter((livestock) => {
      const livestockName = livestock.livestock_type.name.toLowerCase();
      const livestockSpecies = livestock.livestock_species.name.toLowerCase();
      return livestockName.includes(query) || livestockSpecies.includes(query);
    });
  }
});
</script>

<template>
  <div class="row">
    <div class="col-md-9">
      <button @click="goBack" class="btn btn-secondary my-2 me-2"><i class="bi bi-arrow-left"></i> Kembali</button>
      <button v-if="role !== 'admin'" @click="navigateToAdd" class="btn btn-primary my-2"><i class="bi bi-plus"></i> Tambah</button>
    </div>
    <div class="col-md-3 text-end">
      <h2 class="mb-4">Hewan Ternak</h2>
    </div>
    <div class="col-md-12">
      <input v-model="searchQuery" class="form-control mb-2" type="search" placeholder="Cari Hewan Ternak atau Jenis" aria-label="Search" />
    </div>
  </div>
  <div class="livestock" v-if="filteredLivestocks[0] && filteredLivestocks[0].profile && filteredLivestocks[0].livestock_type && filteredLivestocks[0].livestock_species">
    <div class="bg-body rounded shadow-sm">
      <div class="table-responsive px-3 pt-4">
        <table class="table align-middle table-sm">
          <thead>
            <tr>
              <th>No.</th>
              <th>Hewan</th>
              <th>Jenis</th>
              <th>Umur </th>
              <th>Berat (Satuan) </th>
              <th>Jenis Kelamin</th>
              <th>Harga</th>
              <th>Kondisi</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody v-for="(livestock, i) in filteredLivestocks" :key="livestock.id">
            <tr>
              <td>{{ autoNumber(i) }}</td>
              <td>{{ livestock.livestock_type.name }}</td>
              <td>{{ livestock.livestock_species.name }}</td>
              <td>{{ livestock.age }} Bulan</td>
              <td>{{ livestock.weight }} {{livestock.unit}}</td>
              <td>{{ livestock.gender === 'Male' ? 'Jantan' : 'Betina' }}</td>
              <td>{{ $n(livestock.price, 'currency', 'id-ID') }}</td>
              <td class="text-truncate" style="max-width: 150px">
                {{ livestock.condition }}
              </td>
              <td v-if="livestock.status === 1" class="text-success">Terjual</td>
              <td v-else class="text-info">Tersedia</td>
              <td class="text-truncate text-center">
                <button @click="navigateToDetail(livestock.id)" class="btn btn-primary me-2"><i class="bi bi-view-list"></i> Detail</button>
                <button v-if="livestock.status === 0 && role !== 'admin'" @click="navigateToEdit(livestock.id)" class="btn btn-secondary me-2"><i class="bi bi-pencil-square"></i> Edit</button>
                <button data-bs-toggle="modal" :data-bs-target="'#showModalDelete-' + livestock.id" class="btn btn-danger me-2"><i class="bi bi-eraser-fill"></i> Hapus</button>
                <div :id="'showModalDelete-' + livestock.id" class="modal modal-lg" tabindex="-1" role="dialog">
                  <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="document">
                    <div class="modal-content">
                      <div class="modal-header bg-light">
                        <h5 class="modal-title">Konfirmasi Hapus</h5>
                        <button type="button" class="btn-close text-reset" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div class="modal-body">
                        <p>
                          Anda yakin ingin menghapus hewan
                          <b>{{ livestock.livestock_type.name }}</b>
                        </p>
                        <p>
                          Jenis <b>{{ livestock.livestock_species.name }}</b
                          >?
                        </p>
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal" @click="deleteLivestockById(livestock.id)">Ya</button>
                      </div>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <!-- Jika diperlukan -->
          </tfoot>
        </table>
      </div>
    </div>
  </div>
  <div class="livestock" v-else>
    <h2 class="mb-4">Loading...</h2>
  </div>
</template>
