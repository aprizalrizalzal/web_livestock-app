<script setup>
import { ref, onMounted } from 'vue';
import { useLivestockTypeStore } from '@/stores/livestockTypeStore';

const store = useLivestockTypeStore();
const livestockTypes = ref([]);
const startNumber = 1;

const fetchLivestockTypes = async () => {
  try {
    livestockTypes.value = await store.fetchLivestockTypes();
  } catch (error) {
    console.error('Kesalahan dalam mengambil data livestockTypes:', error);
  }
};

const autoNumber = (i) => {
  return startNumber * i + 1;
};

onMounted(fetchLivestockTypes);
</script>

<template>
  <div class="livestock-type" v-if="livestockTypes[0] && livestockTypes[0].livestock_species">
    <h2 class="mb-4">Jenis Hewan Ternak</h2>
    <div class="bg-body rounded shadow-sm">
      <div class="table-responsive px-3 pt-4">
        <table class="table text-truncate">
          <thead>
            <tr>
              <th>No.</th>
              <th>Jenis Hewan</th>
              <th>Banyak Spesies</th>
              <th class="text-center">Aksi</th>
            </tr>
          </thead>
          <tbody v-for="(livestockType, i) in livestockTypes" :key="livestockType.id">
            <tr>
              <td>{{ autoNumber(i) }}</td>
              <td>{{ livestockType.name }}</td>
              <td v-if="livestockType.livestock_species.length === 0">Tidak Ada</td>
              <td v-else>{{ livestockType.livestock_species.length }}</td>
              <td class="text-truncate text-center">
                <button @click="detailLivestockTypeById(livestockType.id)" class="btn btn-primary me-2"><i class="bi bi-view-list"></i> Detail</button>

                <button data-bs-toggle="modal" :data-bs-target="'#showModalEdit-' + livestockType.id" class="btn btn-secondary me-2"><i class="bi bi-pencil-square"></i> Edit</button>
                <div :id="'showModalEdit-' + livestockType.id" class="modal" tabindex="-1" role="dialog">
                  <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                      <div class="modal-header bg-light">
                        <h5 class="modal-title">Edit Jenis Hewan</h5>
                        <button type="button" class="btn-close text-reset" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div class="modal-body m-3">
                        <div class="row">
                          <label class="col-sm-4"> Jenis Hewan </label>
                          <div class="col-sm-8 text-start">
                            <p>
                              <b>{{ livestockType.name }}</b>
                            </p>
                          </div>
                        </div>
                        <div class="row mb-3">
                          <label for="farm-animal" class="col-sm-4 col-form-label">Ubah Nama</label>
                          <div class="col-sm-8">
                            <input type="text" class="form-control" id="farm-animal" v-model="livestockType.name" placeholder="Sapi, Kambing, Dll." required />
                          </div>
                        </div>
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
                        <button type="button" @click="updateLivestockTypeById(livestockType.id)" class="btn btn-primary" data-bs-dismiss="modal">Ya</button>
                      </div>
                    </div>
                  </div>
                </div>

                <button data-bs-toggle="modal" :data-bs-target="'#showModalDelete-' + livestockType.id" class="btn btn-danger"><i class="bi bi-eraser-fill"></i> Hapus</button>
                <div :id="'showModalDelete-' + livestockType.id" class="modal" tabindex="-1" role="dialog">
                  <div class="modal-dialog modal-dialog-centered" role="document">
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
                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal" @click="deleteLivestockTypeById(livestockType.id)">Ya</button>
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
  <div class="livestock-type" v-else>
    <h2 class="mb-4">Loading...</h2>
  </div>
</template>
