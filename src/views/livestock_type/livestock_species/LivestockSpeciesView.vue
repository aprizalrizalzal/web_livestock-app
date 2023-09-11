<script setup>
import { ref, onMounted } from 'vue';
import { useLivestockSpeciesStore } from '@/stores/livestockSpeciesStore';
import { useRouter, useRoute } from 'vue-router';

const store = useLivestockSpeciesStore();
const router = useRouter();
const route = useRoute();
const livestocksSpecies = ref([]);
const _livestockSpecies = ref({
  name: '',
});
const livestockTypeId = route.params.id;
const searchQuery = ref('');
const startNumber = 1;

const fetchLivestockSpecies = async () => {
  try {
    livestocksSpecies.value = await store.fetchLivestockSpeciesByIdLivestockType(livestockTypeId);
  } catch (error) {
    console.error('Kesalahan dalam mengambil data livestocksType:', error);
  }
};

const addLivestockSpecies = async () => {
  try {
    livestocksSpecies.value = await store.postLivestockSpeciesByIdLivestockType(livestockTypeId, _livestockSpecies.value);
    fetchLivestockSpecies();
  } catch (error) {
    console.error('Kesalahan dalam mengirim data livestockSpecies:', error);
  }
};

const updateLivestockSpecies = async (livestockSpeciesId) => {
  try {
    livestocksSpecies.value = await store.putLivestockSpeciesById(livestockSpeciesId, _livestockSpecies.value);
    fetchLivestockSpecies();
  } catch (error) {
    console.error('Kesalahan dalam merubah data livestockSpecies:', error);
  }
};

const deleteLivestockSpecies = async (livestockSpeciesId) => {
  try {
    livestocksSpecies.value = await store.deleteLivestockSpeciesById(livestockSpeciesId);
    fetchLivestockSpecies();
  } catch (error) {
    console.error('Kesalahan dalam menghapus data livestockSpecies:', error);
  }
};

const autoNumber = (i) => {
  return startNumber * i + 1;
};

const goBack = () => {
  router.back();
};

onMounted(fetchLivestockSpecies);
</script>

<template>
  <div class="livestock-species" v-if="livestocksSpecies">
    <div class="row">
      <div class="col-md-9">
        <button @click="goBack" class="btn btn-secondary me-2"><i class="bi bi-arrow-left"></i> Kembali</button>
      </div>
      <div class="col-md-3 text-end">
        <h2 class="mb-4">Spesies Hewan Ternak</h2>
      </div>
      <div class="col-md-12">
        <input v-model="searchQuery" class="form-control mb-2" type="search" placeholder="Cari Spesies Hewan Ternak" aria-label="Search" />
      </div>
    </div>
    <div class="bg-body rounded shadow-sm">
      <div class="table-responsive px-3 pt-4">
        <table class="table text-truncate">
          <thead>
            <tr>
              <th>No.</th>
              <th>Spesies Hewan Ternak</th>
              <th class="text-center">Aksi</th>
            </tr>
          </thead>
          <tbody v-for="(livestockSpecies, i) in livestocksSpecies" :key="livestockSpecies.id">
            <tr>
              <td>{{ autoNumber(i) }}</td>
              <td>{{ livestockSpecies.name }}</td>
              <td class="text-truncate text-center">
                <button data-bs-toggle="modal" :data-bs-target="'#showModalEdit-' + livestockSpecies.id" class="btn btn-secondary me-2"><i class="bi bi-pencil-square"></i> Edit</button>
                <div :id="'showModalEdit-' + livestockSpecies.id" class="modal modal-lg" tabindex="-1" role="dialog">
                  <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="document">
                    <div class="modal-content">
                      <div class="modal-header bg-light">
                        <h5 class="modal-title">Edit</h5>
                        <button type="button" class="btn-close text-reset" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div class="modal-body text-start">
                        <div class="row">
                          <label class="col-md-5"> Spesies Hewan Ternak</label>
                          <div class="col-md-7 text-start">
                            <p>
                              <b>{{ livestockSpecies.name }}</b>
                            </p>
                          </div>
                        </div>
                        <div class="row mb-3">
                          <label for="farm-animal" class="col-md-5 col-form-label">Ubah Spesies Hewan Ternak</label>
                          <div class="col-md-7">
                            <input type="text" class="form-control" id="farm-animal" v-model="_livestockSpecies.name" placeholder="Spesies Hewan Ternak" required />
                          </div>
                        </div>
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
                        <button type="button" @click="updateLivestockSpecies(livestockSpecies.id)" class="btn btn-primary" data-bs-dismiss="modal">Ya</button>
                      </div>
                    </div>
                  </div>
                </div>
                <button data-bs-toggle="modal" :data-bs-target="'#showModalDelete-' + livestockSpecies.id" class="btn btn-danger"><i class="bi bi-eraser-fill"></i> Hapus</button>
                <div :id="'showModalDelete-' + livestockSpecies.id" class="modal modal-lg" tabindex="-1" role="dialog">
                  <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="document">
                    <div class="modal-content">
                      <div class="modal-header bg-light">
                        <h5 class="modal-title">Konfirmasi Hapus</h5>
                        <button type="button" class="btn-close text-reset" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div class="modal-body text-start">
                        <p>Anda yakin ingin menghapus spesies hewan</p>
                        <p>
                          <b>{{ livestockSpecies.name }}</b
                          >?
                        </p>
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal" @click="deleteLivestockSpecies(livestockSpecies.id)">Ya</button>
                      </div>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
          <tfoot></tfoot>
        </table>
        <div class="row m-1">
          <button data-bs-toggle="modal" data-bs-target="#showModalAdd" class="btn btn-primary my-2"><i class="bi bi-plus"></i> Tambah</button>
          <div id="showModalAdd" class="modal modal-lg" tabindex="-1" role="dialog">
            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="document">
              <div class="modal-content">
                <div class="modal-header bg-light">
                  <h5 class="modal-title">Tambah</h5>
                  <button type="button" class="btn-close text-reset" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body text-start">
                  <div class="row mb-3">
                    <label for="farm-animal" class="col-md-5 col-form-label">Tambah Spesies Hewan Ternak</label>
                    <div class="col-md-12">
                      <input type="text" class="form-control" id="farm-animal" v-model="_livestockSpecies.name" placeholder="Spesies Hewan Ternak" required />
                    </div>
                  </div>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
                  <button type="button" @click="addLivestockSpecies()" class="btn btn-primary" data-bs-dismiss="modal">Ya</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="livestock-species" v-else>
    <h2 class="mb-4">Loading...</h2>
  </div>
</template>
