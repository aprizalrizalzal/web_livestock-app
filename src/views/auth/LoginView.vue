<script setup>
import { ref, onMounted } from 'vue';
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

const message = ref({});

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
          <div class="d-flex justify-content-end">
            <button type="submit" class="btn btn-primary shadow-sm mt-2"><i class="bi bi-box-arrow-in-right"></i> Masuk</button>
          </div>
        </form>
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
  </div>
</template>
