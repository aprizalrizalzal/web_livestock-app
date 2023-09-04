<script setup>
import { ref, onMounted } from 'vue';
import { useUserStore } from '@/stores/userStore';

const store = useUserStore();
const users = ref([]);

const fetchUsers = async () => {
  try {
    users.value = await store.fetchUsers();
  } catch (error) {
    console.error('Kesalahan dalam mengambil data users:', error);
  }
};

onMounted(fetchUsers);
</script>

<template>
  <div class="users">
    <h2 class="mb-4">Pengguna</h2>
    <ul>
      <li v-for="user in users" :key="user.id">{{ user }}</li>
    </ul>
  </div>
</template>
