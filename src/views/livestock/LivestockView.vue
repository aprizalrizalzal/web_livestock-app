<script setup>
import { ref, onMounted } from 'vue';
import { useLivestockStore } from '@/stores/livestockStore';

const store = useLivestockStore();
const livestocks = ref([]);
const startNumber = 1;

const fetchLivestocks = async () => {
  try {
    livestocks.value = await store.fetchLivestocks();
  } catch (error) {
    console.error('Kesalahan dalam mengambil data livestocks:', error);
  }
};

const autoNumber = (i) => {
  return startNumber * i + 1;
};

onMounted(fetchLivestocks);
</script>

<template>
  <div class="livestock" v-if="livestocks[0] && livestocks[0].profile && livestocks[0].livestock_type && livestocks[0].livestock_species">
    <h2 class="mb-4">Hewan Ternak</h2>
    <div class="bg-body rounded shadow-sm">
      <div class="table-responsive px-3 pt-4">
        <table class="table align-middle table-sm">
          <thead>
            <tr>
              <th>No.</th>
              <th>Hewan</th>
              <th>Jenis</th>
              <th>Umur</th>
              <th>Jenis Kelamin</th>
              <th>Harga</th>
              <th>Detail</th>
              <th>Status</th>
              <th class="text-center">Aksi</th>
            </tr>
          </thead>
          <tbody v-for="(livestock, i) in livestocks" :key="livestock.id">
            <tr>
              <td>{{ autoNumber(i) }}</td>
              <td>{{ livestock.livestock_type.name }}</td>
              <td>{{ livestock.livestock_species.name }}</td>
              <td>{{ livestock.age }} Tahun</td>
              <td>{{ livestock.gender === 'Male' ? 'Jantan' : 'Betina' }}</td>
              <td>{{ livestock.price }}</td>
              <td class="text-truncate" style="max-width: 150px">
                {{ livestock.detail }}
              </td>
              <td v-if="livestock.sold === 1" class="text-success">Terjual</td>
              <td v-else class="text-info">Tersedia</td>
              <td class="text-truncate text-center">
                <button @click="detailLivestockById(livestock.id)" class="btn btn-primary me-2"><i class="bi bi-view-list"></i> Detail</button>
                <button v-if="livestock.sold === 0" @click="editLivestockById(livestock.id)" class="btn btn-secondary me-2"><i class="bi bi-pencil-square"></i> Edit</button>
                <button data-bs-toggle="modal" :data-bs-target="'#showModalDelete-' + livestock.id" class="btn btn-danger me-2"><i class="bi bi-eraser-fill"></i> Hapus</button>
                <div :id="'showModalDelete-' + livestock.id" class="modal" tabindex="-1" role="dialog">
                  <div class="modal-dialog modal-dialog-centered" role="document">
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
                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal" @click="deletelivestockById(livestock.id)">Ya</button>
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
