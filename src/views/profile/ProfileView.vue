<script setup>
import { ref, onMounted } from 'vue';
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
  phone_number_verified_at: '',
  address: '',
});

const user = ref({});

const messagePhoto = ref('');

onMounted(() => {});

const isEditPhoto = ref(false);

const fetchProfile = async () => {
  try {
    profile.value = await storeProfile.fetchProfile();
    if (profile.value.user_id) {
      fetchUserById(profile.value.user_id);
    }
  } catch (error) {

  }
};

const fetchUserById = async (userId) => {
  try {
    user.value = await storeUser.fetchUserById(userId);
  } catch (error) {

  }
};

const handleFileUpload = async (event) => {
  const selectedFile = event.target.files[0];

  if (selectedFile) {
    try {
      const formData = new FormData();
      formData.append('photo', selectedFile);

      await storeProfile.postProfilePhoto(formData);
      isEditPhoto.value = false;
      fetchProfile();
    } catch (error) {
      console.error('Kesalahan dalam mengunggah gambar profil:', error);
      messagePhoto.value = error;
    }
  }
};

const putProfilePhoto = async () => {
  try {
    profile.value = await storeProfile.putProfilePhoto();
    fetchProfile();
  } catch (error) {
    console.error('Kesalahan dalam menghapus gambar profile:', error);
    messagePhoto.value = error;
  }
};

const saveProfile = async () => {
  try {
    profile.value = await storeProfile.postProfile(profile.value);
    window.location.reload();
  } catch (error) {

  }
};

const updateProfile = async () => {
  try {
    profile.value = await storeProfile.putProfile(profile.value);
  } catch (error) {

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
  <div class="row">
    <div class="col-md-9">
      <button @click="goBack" class="btn btn-secondary my-2"><i class="bi bi-arrow-left"></i> Kembali</button>
    </div>
    <div class="col-md-3 text-end">
      <h2 class="mb-4">Profile</h2>
    </div>
  </div>
  <div class="profile">
    <div class="container rounded bg-white mt-3 mb-5 shadow-sm">
      <div class="row">
        <div class="col-md-3 border-right">
          <div class="d-flex flex-column align-items-center text-center pt-5">
            <img v-if="profile.photo_url" :src="profile.photo_url" alt="Profile Photo" width="200" class="rounded-circle mb-3" />
            <span v-if="user">{{ user.name }}</span>
            <span v-if="user.roles">{{ user.email }}</span>
            <span v-if="user.permissions">{{ user.roles[0].name }} ({{ user.permissions[0].name }})</span>
            <div class="mt-5 text-center">
              <div v-if="messagePhoto" class="mt-3 text-center">
                <div class="alert alert-danger">
                  <small>{{ messagePhoto }}</small>
                </div>
              </div>
              <input type="file" @change="handleFileUpload" class="form-control" id="inputGroupFile" style="display: none" />
              <label v-if="profile.photo_url" class="btn btn-primary shadow-sm mx-2" for="inputGroupFile"><i class="bi bi-upload"></i> Unggah</label>
              <button v-if="profile.photo_url" @click="putProfilePhoto" class="btn btn-danger shadow-sm my-2"><i class="bi bi-eraser-fill"></i> Hapus Foto</button>
            </div>
          </div>
        </div>
        <div class="col-md-5 border-right">
          <div class="p-3 py-5">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <h4 class="text-right">Pengaturan Profil</h4>
            </div>
            <div class="row mt-3">
              <form @submit.prevent="profile.id ? updateProfile() : saveProfile()">
                <div class="col-md-12">
                  <label class="labels">Nama</label>
                  <input type="text" class="form-control shadow-sm mb-2" placeholder="Nama" v-model="profile.name" required />
                </div>
                <div class="col-md-12">
                  <label class="labels">Jenis Kelamin</label>
                  <div class="my-2">
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
                  <div class="d-flex">
                    <div class="col">
                      <label class="labels">Nomor Telpon</label>
                      <input type="text" class="form-control shadow-sm mb-2" placeholder="Nomor Telepon" v-model="profile.phone_number" required />
                    </div>
                    <div class="ms-2 mt-auto mb-2">
                      <button type="button" v-if="profile.phone_number_verified_at === null" class="btn btn-success shadow-sm">Verifikasi</button>
                      <p v-else class="text-success">Terverifikasi</p>
                    </div>
                  </div>
                </div>
                <div class="col-md-12">
                  <label class="labels">Alamat</label>
                  <input type="text" class="form-control shadow-sm mb-2" placeholder="Alamat" v-model="profile.address" required />
                </div>
                <div class="mt-4 text-end">
                  <button type="submit" :class="profile.id ? ' btn btn-secondary shadow-sm' : 'btn btn-primary shadow-sm'"><i class="bi bi-save"></i> {{ profile.id ? 'Perbarui Profil' : 'Simpan Profil' }}</button>
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
                  <input type="text" class="form-control shadow-sm mb-2" disabled :placeholder="user.email" required />
                </div>
                <div class="mt-4 text-end">
                  <button data-bs-toggle="modal" data-bs-target="#showModal" class="btn btn-primary me-2"><i class="bi bi-info-circle"></i> Perbarui Email</button>
                  <!-- <button type="submit" class="btn btn-primary shadow-sm"><i class="bi bi-info-circle"></i> Perbarui Email</button> -->
                </div>
              </form>
            </div>
            <div class="row mt-2">
              <form @submit.prevent="savePassword">
                <div class="col-md-12">
                  <label class="labels">Password</label>
                  <input type="password" class="form-control shadow-sm mb-2" disabled placeholder="Password" required />
                </div>
                <div class="col-md-12">
                  <label class="labels">Konfirmasi Password</label>
                  <input type="password" class="form-control shadow-sm mb-2" disabled placeholder="Konfirmasi Password" required />
                </div>
                <div class="mt-4 text-end">
                  <button data-bs-toggle="modal" data-bs-target="#showModal" class="btn btn-danger me-2"><i class="bi bi-info-circle"></i> Perbarui Password</button>
                  <!-- <button type="submit" class="btn btn-danger shadow-sm"><i class="bi bi-info-circle"></i> Perbarui Password</button> -->
                </div>
              </form>
            </div>
          </div>
        </div>
        <div id="showModal" class="modal modal-lg" tabindex="-1" role="dialog">
          <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Pesan</h5>
                <button type="button" class="btn-close text-reset" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body text-start">
                <p>Hai Pengguna <b>Sistem Informasi Penjualan Hewan Ternak NTB</b>,</p>
                <p>Terima kasih sudah menggunakan aplikasi <b>Sistem Informasi Penjualan Hewan Ternak NTB</b>! Mau kami kasih tahu nih, aplikasi kami masih digarap dengan semangat biar makin asyik buat kalian.</p>
                <p>Nah, buat bantuin <b>Sistem Informasi Penjualan Hewan Ternak NTB</b> bikin semua aman dan makin oke, kami butuh bantuan kalian juga nih. Kalau kalian mau ganti email atau kata sandi, Sistem Informasi Penjualan Hewan Ternak Nusa Tenggara Barat minta kalian hubungin tim kami yang super ramah.</p>
                <p>Langkahnya simpel, nih:</p>
                <ol>
                  <li>Kirim pesan ke tim dukungan kami lewat email di info@contoh.com atau nomor telepon (123) 456 7890.</li>
                  <li>Tim dukungan bakal kasih tahu cara ganti email atau kata sandi kalian.</li>
                  <li>Ikutin aja petunjuk dari tim dukungan kami, pasti bakal jadi deh!</li>
                </ol>
                <p>Dengan begini, kalian ikut menjaga keamanan data kalian dan pasti bisa tetep nikmatin fitur-fitur seru yang bakal kami tambahin ke aplikasi ini.</p>
                <p>Makasih banget ya udah dukung dan pake aplikasi <b>Sistem Informasi Penjualan Hewan Ternak NTB</b>. Kalau ada pertanyaan atau masalah, langsung aja kontak tim dukungan kami di info@contoh.com atau nomor telepon (123) 456 7890.</p>
                <p>Terus stay cool, ya!</p>
                <p class="m-0">Salam, Tim Pengembang Aplikasi</p>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Ya</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
