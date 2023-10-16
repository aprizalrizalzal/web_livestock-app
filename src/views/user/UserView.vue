<script setup>
import { ref, onMounted, computed } from 'vue';
import { useUserStore } from '@/stores/userStore';
import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'vue-router';

const storeUser = useUserStore();
const storeAuth = useAuthStore();
const router = useRouter();
const users = ref([]);
const roles = ref([]);
const permissions = ref([]);
const isEditing = ref(false);
const searchQuery = ref('');
const startNumber = 1;

const message = ref('');

const fetchUsers = async () => {
  try {
    users.value = await storeUser.fetchUsers();
  } catch (error) {
    console.error('Kesalahan dalam mengambil data users:', error);
    message.value = error;
  }
};

const navigateLivestocksByIdProfile = (profileId) => {
  router.push({ name: 'livestocks-profile', params: { id: profileId } });
};

const deleteUserById = async (userId) => {
  try {
    users.value = await storeUser.deleteUserById(userId);
    fetchUsers();
  } catch (error) {
    console.error('Kesalahan dalam menghapus data users:', error);
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
  fetchUsers();
});

const filteredUsers = computed(() => {
  if (searchQuery.value === '') {
    return users.value;
  } else {
    const query = searchQuery.value.toLowerCase();
    return users.value.filter((user) => {
      const userName = user.name.toLowerCase();
      const userEmail = user.email.toLowerCase();
      return userName.includes(query) || userEmail.includes(query);
    });
  }
});
</script>

<template>
  <div class="row">
    <div class="col-md-9">
      <button @click="goBack" class="btn btn-secondary my-2"><i class="bi bi-arrow-left"></i> Kembali</button>
    </div>
    <div class="col-md-3 text-end">
      <h2 class="mb-4">Pengguna</h2>
    </div>
    <div class="col-md-12">
      <input v-model="searchQuery" class="form-control mb-2" type="search" placeholder="Cari Nama atau Email" aria-label="Search" />
    </div>
    <div v-if="message" class="mt-3 text-center">
      <div class="alert alert-danger">
        <small>{{ message }}</small>
      </div>
    </div>
  </div>
  <div class="users" v-if="filteredUsers[0] && filteredUsers[0].profile && filteredUsers[0].roles[0]">
    <div class="bg-body rounded shadow-sm">
      <div class="table-responsive px-3 pt-4">
        <table class="table align-middle table-sm">
          <thead>
            <tr>
              <th>No.</th>
              <th>Nama</th>
              <th>Email</th>
              <th class="text-center">Peran</th>
              <th class="text-center">Hewan Ternak</th>
              <th class="text-center">Aksi</th>
            </tr>
          </thead>
          <tbody v-for="(user, i) in filteredUsers" :key="user.id">
            <tr>
              <td>{{ autoNumber(i) }}</td>
              <td>{{ user.name }}</td>
              <td>{{ user.email }}</td>
              <td class="text-center">{{ user.roles[0].name }}</td>
              <td class="text-truncate text-center">
                <button v-if="user.roles && user.roles[0].name === 'seller'" @click="navigateLivestocksByIdProfile(user.profile.id)" class="btn btn-secondary"><i class="bi bi-box-seam-fill"></i> Lihat</button>
                <span v-else class="text-info">Tidak Ada</span>
              </td>
              <td class="text-truncate text-center">
                <button v-if="user.profile ? user.profile.id : null" data-bs-toggle="modal" :data-bs-target="'#showModalDetail-' + user.id" class="btn btn-primary me-2"><i class="bi bi-person-badge"></i> Detail</button>
                <button v-else class="btn btn-warning me-2" disabled><i class="bi bi-person-fill-exclamation"></i> Profile</button>

                <div v-if="user.profile ? user.profile.id : null" :id="'showModalDetail-' + user.id" class="modal modal-lg" tabindex="-1" role="dialog">
                  <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="document">
                    <div class="modal-content">
                      <div class="modal-header bg-light">
                        <h5 class="modal-title">Detail Pengguna</h5>
                        <button type="button" class="btn-close text-reset" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div class="modal-body text-start m-2">
                        <div class="row m-0">
                          <div class="col-sm-5">
                            <img v-if="user.profile.photo_url" :src="user.profile.photo_url" alt="Profile Photo" width="250" class="rounded" />
                          </div>
                          <div class="col-sm-7">
                            <div class="row">
                              <div class="col-sm-6 ms-auto">
                                <p><b>Nama</b></p>
                              </div>
                              <div class="col-sm-6">
                                <p>{{ user.profile.name }}</p>
                              </div>
                            </div>
                            <div class="row">
                              <div class="col-sm-6 ms-auto">
                                <p><b>Jenis Kelamin</b></p>
                              </div>
                              <div class="col-sm-6">
                                <p>{{ user.profile.gender === 'Male' ? 'Laki-laki' : 'Perempuan' }}</p>
                              </div>
                            </div>
                            <div class="row">
                              <div class="col-sm-6 ms-auto">
                                <p><b>Nomor Telepon</b></p>
                              </div>
                              <div class="col-sm-6">
                                <p>{{ user.profile.phone_number }}</p>
                              </div>
                            </div>
                            <div class="row">
                              <div class="col-sm-6 ms-auto">
                                <p><b>Alamat</b></p>
                              </div>
                              <div class="col-sm-6">
                                <p>{{ user.profile.address }}</p>
                              </div>
                            </div>
                            <div class="row mb-2">
                              <div class="col-sm-6">
                                <b v-if="!isEditing">Peran </b>
                              </div>
                              <div class="col-sm-6">
                                <p>{{ user.roles[0].name }}</p>
                              </div>
                            </div>
                            <div class="row">
                              <div class="col-sm-6">
                                <b v-if="!isEditing">Izin </b>
                              </div>
                              <div class="col-sm-6">
                                <p>{{ user.permissions[0].name }}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="modal-footer ms-1">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Tutup</button>
                      </div>
                    </div>
                  </div>
                </div>

                <button data-bs-toggle="modal" :data-bs-target="'#showModalDelete-' + user.id" class="btn btn-danger"><i class="bi bi-eraser-fill"></i> Hapus</button>
                <div :id="'showModalDelete-' + user.id" class="modal modal-lg" tabindex="-1" role="dialog">
                  <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="document">
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
