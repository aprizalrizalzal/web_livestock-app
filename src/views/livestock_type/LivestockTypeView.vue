<script setup>
import { ref, onMounted, computed } from 'vue';
import { useLivestockTypeStore } from '@/stores/livestockTypeStore';
import { useRouter, useRoute } from 'vue-router';

const store = useLivestockTypeStore();
const router = useRouter();
const livestockTypes = ref([]);
const _livestockType = ref({
  name: '',
});
const searchQuery = ref('');
const startNumber = 1;

const message = ref('');

const fetchLivestockTypes = async () => {
  try {
    livestockTypes.value = await store.fetchLivestockTypes();
  } catch (error) {
    console.error('Kesalahan dalam mengambil data livestockTypes:', error);
    message.value = error;
  }
};

const addLivestockType = async () => {
  try {
    livestockTypes.value = await store.postLivestockType(_livestockType.value);
    fetchLivestockTypes();
  } catch (error) {
    console.error('Kesalahan dalam menambah data livestockTypes:', error);
    message.value = error;
  }
};

const navigateToLivestockSpeciesById = (livestockTypeId) => {
  router.push({ name: 'livestock-species', params: { id: livestockTypeId } });
};

const updateLivestockType = async (livestockTypeId) => {
  try {
    livestockTypes.value = await store.putLivestockTypeById(livestockTypeId, _livestockType.value);
    fetchLivestockTypes();
  } catch (error) {
    console.error('Kesalahan dalam merubah data livestockTypes:', error);
    message.value = error;
  }
};

const deleteLivestockType = async (livestockTypeId) => {
  try {
    livestockTypes.value = await store.deleteLivestockTypeById(livestockTypeId);
    fetchLivestockTypes();
  } catch (error) {
    console.error('Kesalahan dalam menghapus data livestockTypes:', error);
    message.value = error;
  }
};

const goBack = () => {
  router.back();
};

const autoNumber = (i) => {
  return startNumber * i + 1;
};

onMounted(() => {
  fetchLivestockTypes();
});

const filteredLivestockType = computed(() => {
  if (searchQuery.value === '') {
    return livestockTypes.value;
  } else {
    const query = searchQuery.value.toLowerCase();
    return livestockTypes.value.filter((livestockTypes) => {
      const livestockTypesName = livestockTypes.name.toLowerCase();
      return livestockTypesName.includes(query);
    });
  }
});
</script>

<template>
  <div class="row">
    <div class="col-md-9">
      <button @click="goBack" class="btn btn-secondary me-2"><i class="bi bi-arrow-left"></i> Kembali</button>
    </div>
    <div class="col-md-3 text-end">
      <h2 class="mb-4">Jenis Hewan Ternak</h2>
    </div>
    <div class="col-md-12">
      <input v-model="searchQuery" class="form-control mb-2" type="search" placeholder="Cari Jenis Hewan Ternak" aria-label="Search" />
    </div>
    <div v-if="message" class="mt-3 text-center">
      <div class="alert alert-danger">
        <small>{{ message }}</small>
      </div>
    </div>
  </div>
  <div class="livestock-type" v-if="filteredLivestockType[0] && filteredLivestockType[0].livestock_species">
    <div class="bg-body rounded shadow-sm">
      <div class="table-responsive px-3 pt-4">
        <table class="table text-truncate">
          <thead>
            <tr>
              <th>No.</th>
              <th>Jenis Hewan</th>
              <th colspan="2" class="text-center">Banyak Spesies</th>
              <th class="text-center">Aksi</th>
            </tr>
          </thead>
          <tbody v-for="(livestockType, i) in filteredLivestockType" :key="livestockType.id">
            <tr>
              <td>{{ autoNumber(i) }}</td>
              <td>{{ livestockType.name }}</td>
              <td v-if="livestockType.livestock_species.length === 0">Tidak Ada</td>
              <td v-else>{{ livestockType.livestock_species.length }}</td>
              <td>
                <button @click="navigateToLivestockSpeciesById(livestockType.id)" class="btn btn-primary me-2"><i class="bi bi-view-list"></i> Detail</button>
              </td>
              <td class="text-truncate text-center">
                <button data-bs-toggle="modal" :data-bs-target="'#showModalEdit-' + livestockType.id" class="btn btn-secondary me-2"><i class="bi bi-pencil-square"></i> Edit</button>
                <div :id="'showModalEdit-' + livestockType.id" class="modal modal-lg" tabindex="-1" role="dialog">
                  <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="document">
                    <div class="modal-content">
                      <div class="modal-header bg-light">
                        <h5 class="modal-title">Edit</h5>
                        <button type="button" class="btn-close text-reset" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div class="modal-body text-start">
                        <div class="row">
                          <label class="col-md-5"> Jenis Hewan Ternak</label>
                          <div class="col-md-7 text-start">
                            <p>
                              <b>{{ livestockType.name }}</b>
                            </p>
                          </div>
                        </div>
                        <div class="row mb-3">
                          <label for="farm-animal" class="col-md-5 col-form-label">Ubah Jenis Hewan Ternak</label>
                          <div class="col-md-7">
                            <input type="text" class="form-control" id="farm-animal" v-model="_livestockType.name" placeholder="Sapi, Kambing, Dll." required />
                          </div>
                        </div>
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
                        <button type="button" @click="updateLivestockType(livestockType.id)" class="btn btn-primary" data-bs-dismiss="modal">Ya</button>
                      </div>
                    </div>
                  </div>
                </div>

                <button data-bs-toggle="modal" :data-bs-target="'#showModalDelete-' + livestockType.id" class="btn btn-danger"><i class="bi bi-eraser-fill"></i> Hapus</button>
                <div :id="'showModalDelete-' + livestockType.id" class="modal modal-lg" tabindex="-1" role="dialog">
                  <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="document">
                    <div class="modal-content">
                      <div class="modal-header bg-light">
                        <h5 class="modal-title">Konfirmasi Hapus</h5>
                        <button type="button" class="btn-close text-reset" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div class="modal-body">
                        <p>Anda yakin ingin menghapus</p>
                        <p>
                          Jenis hewan <b>{{ livestockType.name }}</b
                          >?
                        </p>
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal" @click="deleteLivestockType(livestockType.id)">Ya</button>
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
                    <label for="farm-animal" class="col-md-5 col-form-label">Tambah Jenis Hewan Ternak</label>
                    <div class="col-md-12">
                      <input type="text" class="form-control" id="farm-animal" v-model="_livestockType.name" placeholder="Jenis Hewan Ternak" required />
                    </div>
                  </div>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
                  <button type="button" @click="addLivestockType()" class="btn btn-primary" data-bs-dismiss="modal">Ya</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="livestock-type" v-else>
    <h2 class="mb-4">Loading...</h2>
  </div>
</template>
