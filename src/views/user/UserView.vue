<script setup>
import { ref, onMounted } from 'vue';
import { useUserStore } from '@/stores/userStore';

const store = useUserStore();
const users = ref([]);
const startNumber = 1;

const fetchUsers = async () => {
  try {
    users.value = await store.fetchUsers();
  } catch (error) {
    console.error('Kesalahan dalam mengambil data users:', error);
  }
};

const fetchUserById = async (userId) => {
  try {
    users.value = await store.fetchUserById(userId);
  } catch (error) {
    console.error('Kesalahan dalam menghapus data users:', error);
  }
};

const deleteUserById = async (userId) => {
  try {
    users.value = await store.deleteUserById(userId);
    fetchUsers();
  } catch (error) {
    console.error('Kesalahan dalam menghapus data users:', error);
  }
};

const autoNumber = (i) => {
  return startNumber * i + 1;
};

onMounted(fetchUsers);
</script>

<template>
  <div class="users" v-if="users[0] && users[0].profile && users[0].roles[0]">
    <h2 class="mb-4">Pengguna</h2>
    <div class="bg-body rounded shadow-sm">
      <div class="table-responsive px-3 pt-4">
        <table class="table align-middle table-sm">
          <thead>
            <tr>
              <th>No.</th>
              <th>Nama</th>
              <th>Email</th>
              <th>Peran</th>
              <th class="text-center">Aksi</th>
            </tr>
          </thead>
          <tbody v-for="(user, i) in users" :key="user.id">
            <tr>
              <td>{{ autoNumber(i) }}</td>
              <td>{{ user.name }}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.roles[0].name }}</td>
              <td class="text-truncate text-center">
                <button data-bs-toggle="modal" :data-bs-target="'#showModalDetail-' + user.id" class="btn btn-primary me-2"><i class="bi bi-person-badge"></i> Detail</button>
                <div :id="'showModalDetail-' + user.id" class="modal" tabindex="-1" role="dialog">
                  <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                      <div class="modal-header bg-light">
                        <h5 class="modal-title">Detail Pengguna</h5>
                        <button type="button" class="btn-close text-reset" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div class="row ms-0 me-2">
                        <div class="modal-body text-start">
                          <div class="row g-2">
                            <div class="col-sm-6">
                              <p><b>Nama</b></p>
                            </div>
                            <div class="col-sm-3">
                              <p>{{ user.profile.name }}</p>
                            </div>
                          </div>
                          <div class="row g-2">
                            <div class="col-sm-6">
                              <p><b>Jenis Kelamin</b></p>
                            </div>
                            <div class="col-sm-3">
                              <p>{{ user.profile.gender === 'Male' ? 'Laki-laki' : 'Perempuan' }}</p>
                            </div>
                          </div>
                          <div class="row g-2">
                            <div class="col-sm-6">
                              <p><b>Nomor Telepon</b></p>
                            </div>
                            <div class="col-sm-3">
                              <p>{{ user.profile.phone_number }}</p>
                            </div>
                          </div>
                          <div class="row g-2">
                            <div class="col-sm-6">
                              <p><b>Alamat</b></p>
                            </div>
                            <div class="col-sm-3">
                              <p>{{ user.profile.address }}</p>
                            </div>
                          </div>
                        </div>
                        <div class="modal-footer ms-1">
                          <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Ya</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <button v-if="user.profile ? user.profile.id : null" @click="fetchLivestocksByIdProfile(user.profile.id)" class="btn btn-secondary me-2"><i class="bi bi-box-seam-fill"></i> Produk</button>
                <button v-else class="btn btn-warning me-2"><i class="bi bi-person-fill-exclamation"></i> Profile</button>

                <button data-bs-toggle="modal" :data-bs-target="'#showModalDelete-' + user.id" class="btn btn-danger"><i class="bi bi-eraser-fill"></i> Hapus</button>
                <div :id="'showModalDelete-' + user.id" class="modal" tabindex="-1" role="dialog">
                  <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                      <div class="modal-header bg-light">
                        <h5 class="modal-title">Konfirmasi Hapus</h5>
                        <button type="button" class="btn-close text-reset" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div class="modal-body">
                        <p>Anda yakin ingin menghapus Pengguna {{ user.name }}?</p>
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal" @click="deleteUserById(user.id)">Ya</button>
                      </div>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
          <tfoot></tfoot>
        </table>
      </div>
    </div>
  </div>
  <div class="users" v-else>
    <h2 class="mb-4">Loading...</h2>
  </div>
</template>
