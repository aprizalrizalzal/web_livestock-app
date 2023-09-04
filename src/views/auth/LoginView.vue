<script setup>
import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'vue-router';

const store = useAuthStore();
const userData = {
  email: '',
  password: '',
};

const router = useRouter();

const loginUser = async () => {
  try {
    const user = await store.login(userData);
    console.log('Login berhasil:', user);

    if (store.isLoggedIn) {
      router.push({ name: 'home' });
    } else {
      router.push({ name: 'login' });
    }
  } catch (error) {
    console.error('Kesalahan dalam login:', error);
  }
};
</script>

<template>
  <div class="login rounded bg-white mt-4 pb-4 shadow-sm">
    <h2 class="fw-bold mb-4 pt-4 text-center">Masuk</h2>
    <div class="row d-flex justify-content-center mx-4">
      <div class="col-md-6">
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
            <RouterLink class="text-decoration-none" :to="{ name: 'dashboard' }" exact-active-class="active">Lupa Password?</RouterLink>
          </div>
          <div class="d-flex justify-content-end">
            <button type="submit" class="btn btn-outline-primary shadow-sm mt-2">Masuk</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
