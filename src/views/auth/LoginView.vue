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

onMounted(() => {});
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
            <RouterLink class="text-decoration-none" :to="{ name: 'dashboard' }" exact-active-class="active">Lupa Password?</RouterLink>
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
