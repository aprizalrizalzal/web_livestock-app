<script setup>
import { ref, onMounted } from 'vue';
import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'vue-router';

const store = useAuthStore();
const router = useRouter();
const userData = {
  email: '',
  password: '',
};

const message = ref('');
const reload = localStorage.getItem('reloaded');

const loginUser = async () => {
  try {
    await store.login(userData);

    if (store.isLoggedIn) {
      router.push({ name: 'home' });
    } else {
      router.push({ name: 'login' });
    }
  } catch (error) {
    console.error('Kesalahan dalam login:', error);
    message.value = error;
  }
};

onMounted(() => {
  if (reload === 'false') {
    window.location.reload();
    localStorage.setItem('reloaded', true);
  }
});
</script>

<template>
  <div class="login">
    <h2 class="fw-bold mb-4 pt-4 text-center"><i class="bi bi-box-arrow-in-right"></i> Masuk</h2>
    <div class="row d-flex justify-content-center mx-4">
      <div class="rounded bg-white p-4 shadow-sm col-md-6">
        <p>Silakan masuk ke akun Anda untuk melanjutkan.</p>
        <form @submit.prevent="loginUser">
          <div class="form-floating mb-2">
            <input type="email" class="form-control shadow-sm" id="floatingEmail" placeholder="name@example.com" v-model="userData.email" required />
            <label for="floatingEmail">Email</label>
          </div>
          <div class="form-floating mb-2">
            <input type="password" class="form-control shadow-sm" id="floatingPassword" placeholder="Password" v-model="userData.password" required />
            <label for="floatingPassword">Password</label>
          </div>
          <div class="form-floating text-end">
            <!-- <button data-bs-toggle="modal" data-bs-target="#showModal" class="btn btn-danger me-2"><i class="bi bi-info-circle"></i> Lupa Password?</button> -->
            <a href="#" data-bs-toggle="modal" data-bs-target="#showModal" class="text-decoration-none"><i class="bi bi-info-circle"></i> Lupa Password?</a>
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
                  <p>Nah, buat bantuin <b>Sistem Informasi Penjualan Hewan Ternak NTB</b> bikin semua aman dan makin oke, kami butuh bantuan kalian juga nih. Kalau kalian mau ganti kata sandi, Sistem Informasi Penjualan Hewan Ternak Nusa Tenggara Barat minta kalian hubungin tim kami yang super ramah.</p>
                  <p>Langkahnya simpel, nih:</p>
                  <ol>
                    <li>Kirim pesan ke tim dukungan kami lewat email di info@contoh.com atau nomor telepon (123) 456 7890.</li>
                    <li>Tim dukungan bakal kasih tahu cara ganti kata sandi kalian.</li>
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
          <div v-if="message" class="mt-3 text-center">
            <div class="alert alert-danger show">
              <small>{{ message }}</small>
            </div>
          </div>
          <div class="d-flex justify-content-end">
            <button type="submit" class="btn btn-primary shadow-sm mt-2"><i class="bi bi-box-arrow-in-right"></i> Masuk</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
