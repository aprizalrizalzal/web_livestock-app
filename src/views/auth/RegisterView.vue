<script setup>
import { ref, onMounted } from 'vue';
import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'vue-router';

const store = useAuthStore();
const userData = {
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
};

const router = useRouter();

const registerUser = async () => {
  try {
    await store.register(userData);
    if (store.isLoggedIn) {
      router.push({ name: 'home' });
    } else {
      router.push({ name: 'login' });
    }
  } catch (error) {
    console.error('Kesalahan dalam register:', error);
  }
};
</script>
<template>
  <div class="register">
    <h2 class="fw-bold mb-4 pt-4 text-center"><i class="bi bi-box-arrow-in-left"></i> Daftar</h2>
    <div class="row d-flex justify-content-center mx-4">
      <div class="rounded bg-white p-4 shadow-sm col-md-6">
        <p>Daftar sekarang untuk bisa mengakses semua fitur.</p>
        <form @submit.prevent="registerUser">
          <div class="form-floating mb-2">
            <input type="text" class="form-control shadow-sm" id="floatingName" placeholder="Example" v-model="userData.name" required />
            <label for="floatingName">Nama</label>
          </div>
          <div class="form-floating mb-2">
            <input type="email" class="form-control shadow-sm" id="floatingEmail" placeholder="name@example.com" v-model="userData.email" required />
            <label for="floatingEmail">Email</label>
          </div>
          <div class="form-floating mb-2">
            <input type="password" class="form-control shadow-sm" id="floatingPassword" placeholder="Password" v-model="userData.password" required />
            <label for="floatingPassword">Password</label>
          </div>
          <div class="form-floating mb-2">
            <input type="password" class="form-control shadow-sm" id="floatingPasswordConfirmation" placeholder="Konfirmasi Password" v-model="userData.password_confirmation" required />
            <label for="floatingPasswordConfirmation">Konfirmasi Password</label>
          </div>
          <div class="form-check">
            <input class="form-check-input shadow-sm" type="checkbox" v-model="userData.agree" id="flexCheckChecked" checked />
            <label class="form-check-label" for="flexCheckChecked"> Setuju dengan syarat dan ketentuan </label>
          </div>
          <div v-if="message" class="mt-3 text-center">
            <div class="alert alert-danger">
              <small>{{ message }}</small>
            </div>
          </div>
          <div class="d-flex justify-content-end">
            <button type="submit" class="btn btn-primary shadow-sm mt-2"><i class="bi bi-box-arrow-in-left"></i> Daftar</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
