<script setup>
import { ref, watch, onMounted } from 'vue';
import { useProfileStore } from '@/stores/profileStore';
import { useUserStore } from '@/stores/userStore';
import { useRouter, useRoute } from 'vue-router';

const storeProfile = useProfileStore();
const router = useRouter();
const storeUser = useUserStore();

const profile = ref({
  name: '',
  gender: '',
  phone_number: '',
  address: '',
});

const user = ref({});
const message = ref({});
const modalTrigger = ref(null);

watch(message, (newMessage) => {
  if (newMessage) {
    showModal();
  }
});

const triggerModalClick = () => {
  if (modalTrigger.value) {
    modalTrigger.value.click();
  }
};

const showModal = () => {
  triggerModalClick();
};

onMounted(() => {
  modalTrigger.value = document.querySelector('[data-bs-toggle="modal"][data-bs-target="#showModalMessage"]');
});

const isEditPhoto = ref(false);

const fetchProfile = async () => {
  try {
    profile.value = await storeProfile.fetchProfile();
    if (profile.value && profile.value.user_id) {
      fetchUserById(profile.value.user_id);
    }
  } catch (error) {
    console.error('Kesalahan dalam mengambil data profile:', error);
    message.value = error;
  }
};

const fetchUserById = async (userId) => {
  try {
    user.value = await storeUser.fetchUserById(userId);
  } catch (error) {
    console.error('Kesalahan dalam mengambil data user:', error);
    message.value = error;
  }
};

const handleFileUpload = async (event) => {
  const selectedFile = event.target.files[0];

  if (selectedFile) {
    try {
      const formData = new FormData();
      formData.append('photo', selectedFile);

      const response = await storeProfile.postProfilePhoto(formData);
      if (response) {
        isEditPhoto.value = false;
        fetchProfile();
      }
    } catch (error) {
      console.error('Kesalahan dalam mengunggah gambar profil:', error);
      message.value = error;
    }
  }
};

const putProfilePhoto = async () => {
  try {
    const response = await storeProfile.putProfilePhoto();
    if (response) {
      fetchProfile();
    }
  } catch (error) {
    console.error('Kesalahan dalam menghapus gambar profile:', error);
    message.value = error;
  }
};

const saveProfile = async () => {
  try {
    const response = await storeProfile.postProfile(profile.value);
    profile.value = response;
  } catch (error) {
    console.error('Kesalahan dalam mengirim data profile:', error);
    message.value = error;
  }
};

const updateProfile = async () => {
  try {
    const response = await storeProfile.putProfile(profile.value);
    profile.value = response;
  } catch (error) {
    console.error('Kesalahan dalam mengirim data profile:', error);
    message.value = error;
  }
};

const saveEmail = () => {};

const savePassword = () => {};

const goBack = () => {
  router.back();
};

onMounted(fetchProfile);
</script>
<template>
  <div class="profile" v-if="profile && user && user.roles && user.permissions">
    <div class="row">
      <div class="col-md-9">
        <button @click="goBack" class="btn btn-secondary my-2"><i class="bi bi-arrow-left"></i> Kembali</button>
      </div>
      <div class="col-md-3 text-end">
        <h2 class="mb-4">Profile</h2>
      </div>
    </div>
    <a ref="modalTrigger" data-bs-toggle="modal" data-bs-target="#showModalMessage" class="btn btn-warning me-2" style="display: none"><i class="bi bi-view-list"></i> Message</a>
    <div id="showModalMessage" class="modal modal-lg" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="document">
        <div class="modal-content">
          <div class="modal-header bg-light">
            <h5 class="modal-title">Pesan</h5>
            <button type="button" class="btn-close text-reset" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p>{{ message }}</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Ya</button>
          </div>
        </div>
      </div>
    </div>
    <div class="container rounded bg-white mt-3 mb-5 shadow-sm">
      <div class="row">
        <div class="col-md-3 border-right">
          <div class="d-flex flex-column align-items-center text-center pt-5">
            <img src="../../../assets/image/person-circle.svg" alt="Profile Photo" width="200" class="rounded-circle img-thumbnail mb-3" v-if="!profile.photo_url" />
            <img :src="profile.photo_url" alt="Profile Photo" width="200" class="rounded-circle img-thumbnail mb-3" v-else />
            <span>{{ user.name }}</span>
            <span>{{ user.email }}</span>
            <span>{{ user.roles[0].name }} ({{ user.permissions[0].name }})</span>
            <div class="mt-5 text-center">
              <input type="file" @change="handleFileUpload" class="form-control" id="inputGroupFile" style="display: none" />
              <label class="btn btn-primary shadow-sm me-2" for="inputGroupFile"><i class="bi bi-upload"></i> Unggah</label>
              <button @click="putProfilePhoto" class="btn btn-danger shadow-sm"><i class="bi bi-eraser-fill"></i> Hapus Foto</button>
            </div>
          </div>
        </div>
        <div class="col-md-5 border-right">
          <div class="p-3 py-5">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <h4 class="text-right">Pengaturan Profil</h4>
            </div>
            <div class="row mt-3">
              <form @submit.prevent="profile ? updateProfile() : saveProfile()">
                <div class="col-md-12">
                  <label class="labels">Nama</label>
                  <input type="text" class="form-control shadow-sm mb-2" placeholder="Nama" v-model="profile.name" required />
                </div>
                <div class="col-md-12">
                  <label class="labels">Jenis Kelamin</label>
                  <div class="mt-2 mb-2">
                    <div class="form-check form-check-inline">
                      <input class="form-check-input shadow-sm" type="radio" name="inlineRadioOptions" id="male" value="Male" v-model="profile.gender" />
                      <label class="form-check-label" for="male">Laki-laki</label>
                    </div>
                    <div class="form-check form-check-inline">
                      <input class="form-check-input shadow-sm" type="radio" name="inlineRadioOptions" id="female" value="Female" v-model="profile.gender" />
                      <label class="form-check-label" for="female">Perempuan</label>
                    </div>
                  </div>
                </div>
                <div class="col-md-12">
                  <label class="labels">Nomer Telpon</label>
                  <input type="text" class="form-control shadow-sm mb-2" placeholder="Nomor Telepon" v-model="profile.phone_number" required />
                </div>
                <div class="col-md-12">
                  <label class="labels">Alamat</label>
                  <input type="text" class="form-control shadow-sm mb-2" placeholder="Alamat" v-model="profile.address" required />
                </div>
                <div class="mt-3 text-end">
                  <button type="submit" :class="profile ? ' btn btn-secondary shadow-sm' : 'btn btn-primary shadow-sm'"><i class="bi bi-save"></i> {{ profile ? 'Perbarui Profil' : 'Simpan Profil' }}</button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="p-3 py-5">
            <div class="d-flex justify-content-between align-items-center experience">
              <h4>Tambahan</h4>
            </div>
            <div class="row mt-3">
              <form @submit.prevent="saveEmail">
                <div class="col-md-12">
                  <label class="labels">Email</label>
                  <input type="text" class="form-control shadow-sm mb-2" :placeholder="user.email" required />
                </div>
                <div class="mt-3 text-end">
                  <button type="submit" class="btn btn-primary shadow-sm"><i class="bi bi-save"></i> Perbarui Email</button>
                </div>
              </form>
            </div>
            <div class="row mt-4">
              <form @submit.prevent="savePassword">
                <div class="col-md-12">
                  <label class="labels">Password</label>
                  <input type="password" class="form-control shadow-sm mb-2" placeholder="Password" required />
                </div>
                <div class="col-md-12">
                  <label class="labels">Konfirmasi Password</label>
                  <input type="password" class="form-control shadow-sm mb-2" placeholder="Konfirmasi Password" required />
                </div>
                <div class="mt-3 text-end">
                  <button type="submit" class="btn btn-danger shadow-sm"><i class="bi bi-save"></i> Perbarui Password</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="profile" v-else>
    <h2 class="mb-4">Loading...</h2>
  </div>
</template>
