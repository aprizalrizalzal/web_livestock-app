<script setup>
import { ref, onMounted } from 'vue';
import { useProfileStore } from '@/stores/profileStore';
import { useUserStore } from '@/stores/userStore';

const storeProfile = useProfileStore();
const storeUser = useUserStore();
const profile = ref({});
const user = ref({});
const isEditPhoto = ref(false);
const isEditProfile = ref(false);
const isEditEmail = ref(false);
const isEditPassword = ref(false);

const fetchProfile = async () => {
  try {
    profile.value = await storeProfile.fetchProfile();
    if (profile.value && profile.value.user_id) {
      fetchUser(profile.value.user_id);
    }
  } catch (error) {
    console.error('Kesalahan dalam mengambil data profile:', error);
  }
};

const fetchUser = async (userId) => {
  try {
    user.value = await storeUser.fetchUserById(userId);
  } catch (error) {
    console.error('Kesalahan dalam mengambil data profile:', error);
  }
};

const startEditPhoto = () => {
  isEditPhoto.value = true;
};

const savePhoto = () => {
  isEditPhoto.value = false;
};

const deletePhoto = () => {};

const startEditProfile = () => {
  isEditProfile.value = true;
};

const saveProfile = () => {
  isEditProfile.value = false;
};

const startEditEmail = () => {
  isEditEmail.value = true;
};

const saveEmail = () => {
  isEditEmail.value = false;
};

const startEditPassword = () => {
  isEditPassword.value = true;
};

const savePassword = () => {
  isEditPassword.value = false;
};

onMounted(fetchProfile);
</script>
<template>
  <div class="profile">
    <div class="container rounded bg-white mt-3 mb-5 shadow-sm">
      <div class="row">
        <div class="col-md-3 border-right">
          <div class="d-flex flex-column align-items-center text-center pt-5">
            <img :src="profile.photo_url" alt="Profile Photo" width="200" class="rounded-circle img-thumbnail mb-3" />
            <span>{{ user.name }}</span>
            <span>{{ user.email }}</span>
            <div class="mt-4 text-center" v-if="!isEditPhoto">
              <button @click="startEditPhoto" class="btn btn-outline-primary shadow-sm me-2">Edit</button>
              <button @click="deletePhoto" class="btn btn-outline-danger shadow-sm">Hapus Foto</button>
            </div>
            <div class="mt-4 text-center" v-else>
              <button @click="savePhoto" class="btn btn-outline-primary shadow-sm">Simpan Foto</button>
            </div>
          </div>
        </div>
        <div class="col-md-5 border-right">
          <div class="p-3 py-5">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <h4 class="text-right">Pengaturan Profil</h4>
            </div>
            <div class="row mt-3">
              <div class="col-md-12">
                <label class="labels">Nama</label>
                <input type="text" class="form-control shadow-sm mb-2" placeholder="Nama" v-model="profile.name" />
              </div>
              <div class="col-md-12">
                <label class="labels">Jenis Kelamin</label>
                <input type="text" class="form-control shadow-sm mb-2" placeholder="Jenis Kelamin" v-model="profile.gender" />
              </div>
              <div class="col-md-12">
                <label class="labels">Nomer Telpon</label>
                <input type="text" class="form-control shadow-sm mb-2" placeholder="Nomor Telepon" v-model="profile.phone_number" />
              </div>
              <div class="col-md-12">
                <label class="labels">Alamat</label>
                <input type="text" class="form-control shadow-sm mb-2" placeholder="Alamat" v-model="profile.address" />
              </div>
            </div>
            <div class="mt-3 text-end">
              <button @click="startEditProfile" class="btn btn-outline-primary shadow-sm" v-if="!isEditProfile">Edit</button>
              <button @click="saveProfile" class="btn btn-outline-primary shadow-sm" v-else>Simpan Profil</button>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="p-3 py-5">
            <div class="d-flex justify-content-between align-items-center experience">
              <h4>Tambahan</h4>
            </div>
            <div class="row mt-3">
              <div class="col-md-12">
                <label class="labels">Email Baru</label>
                <input type="text" class="form-control shadow-sm mb-2" placeholder="Email Baru" />
              </div>
              <div class="mt-3 text-end">
                <button @click="startEditEmail" class="btn btn-outline-primary shadow-sm" v-if="!isEditEmail">Edit</button>
                <button @click="saveEmail" class="btn btn-outline-primary shadow-sm" v-else>Simpan Email</button>
              </div>
            </div>
            <div class="row mt-3">
              <div class="col-md-12">
                <label class="labels">Password</label>
                <input type="password" class="form-control shadow-sm mb-2" placeholder="Password" />
              </div>
              <div class="col-md-12">
                <label class="labels">Password Baru</label>
                <input type="password" class="form-control shadow-sm mb-2" placeholder="Password Baru" />
              </div>
              <div class="mt-3 text-end">
                <button @click="startEditPassword" class="btn btn-outline-primary shadow-sm" v-if="!isEditPassword">Edit</button>
                <button @click="savePassword" class="btn btn-outline-primary shadow-sm" v-else>Simpan Password</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
