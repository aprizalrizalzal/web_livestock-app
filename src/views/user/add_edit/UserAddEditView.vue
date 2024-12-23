<script setup>
import { ref, onMounted } from 'vue';
import { useUserStore } from '@/stores/userStore';
import { useRouter, useRoute } from 'vue-router';

const storeUser = useUserStore();
const router = useRouter();
const route = useRoute();

const userId = route.params.id;

const selectedUserSpeciesId = ref({});

const user = ref({
  user_species_id: selectedUserSpeciesId,
  name: '',
  email: '',
});

const usersRoles = ref([
  {
    name: 'admin'
  },
  {
    name: 'seller'
  },
  {
    name: 'buyer'
  }
]);

const fetchUserById = async () => {
  try {
    user.value = await storeUser.fetchUserById(userId);
    selectedUserSpeciesId.value = user.value.user_species_id;
    fetchUserTypes();
  } catch (error) {
    console.error('Kesalahan dalam mengambil data user:', error);
  }
};

const saveUser = async () => {
  try {
    user.value = await storeUser.postUser(user.value);
    goBack();
  } catch (error) {
    console.error('Kesalahan dalam mengirim data user:', error);
  }
};

const updateUser = async (userId) => {
  try {
    const _user = user.value;

    _user.user_species_id = selectedUserSpeciesId.value;

    user.value = await storeUser.putUserById(userId, _user);
    goBack();
  } catch (error) {
    console.error('Kesalahan dalam mengirim data user:', error);
  }
};

const goBack = () => {
  router.back();
};

onMounted(() => {
  if (userId) {
    fetchUserById();
  } 
});
</script>
<template>
  <div class="row">
    <div class="col-md-9">
      <button @click="goBack" class="btn btn-secondary my-2"><i class="bi bi-arrow-left"></i> Kembali</button>
    </div>
    <div class="col-md-3 text-end">
      <h2 v-if="userId" class="mb-4">Edit Pengguna</h2>
      <h2 v-else class="mb-4">Tambah Pengguna</h2>
    </div>
  </div>
  <div class="users-add-edit" v-if="(user ) ">
    <div class="container rounded bg-white mt-3 mb-5 shadow-sm">
      <div class="row px-3 py-4">
        <div class="col-md-12">
          <h4 class="mb-4">Pengguna</h4>
          <form @submit.prevent="userId ? updateUser(userId) : saveUser()">
            <div class="col-md-12">
              <label class="labels">Nama</label>
              <input type="text" class="form-control shadow-sm mb-2" placeholder="Nama" v-model="user.name" required />
            </div>
            <div class="col-md-12 gap-2">
                <label class="labels">Email</label>
                <input type="text" class="form-control shadow-sm mb-2" placeholder="Email" v-model="user.email" required />
            </div>
            <div class="col-md-12 gap-2">
                <label class="labels">Peran</label>
                <select class="form-select mb-2" v-model="user.unit">
                    <option v-for="usersRole in usersRoles" :value="usersRole.name" :key="usersRole.name">
                    {{ usersRole.name }}
                    </option>
                </select>
            </div>
            <div class="mt-3 text-end">
              <button type="submit" :class="userId ? ' btn btn-secondary shadow-sm' : 'btn btn-primary shadow-sm'"><i class="bi bi-save"></i> {{ userId ? 'Perbarui' : 'Simpan' }}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  <div class="user-add-edit" v-else>
    <h2 class="mb-4">Loading...</h2>
  </div>
</template>
