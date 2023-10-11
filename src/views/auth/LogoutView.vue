<script setup>
import { ref, onMounted } from 'vue';
import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'vue-router';

const store = useAuthStore();
const router = useRouter();

const message = ref('');

const logoutUser = async () => {
  try {
    await store.logout();
    router.push({ name: 'login' });
  } catch (error) {
    console.error('Kesalahan dalam logout:', error);
    message.value = error;
  }
};

onMounted(() => {});
</script>
<template>
  <div class="logout">
    <button @click="logoutUser" class="dropdown-item"><i class="bi bi-box-arrow-left"></i> Keluar</button>
  </div>
</template>
