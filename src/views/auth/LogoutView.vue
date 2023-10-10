<script setup>
import { ref, watch, onMounted } from 'vue';
import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'vue-router';

const store = useAuthStore();
const router = useRouter();

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

const logoutUser = async () => {
  try {
    await store.logout();
    router.push({ name: 'login' });
  } catch (error) {
    console.error('Kesalahan dalam logout:', error);
    message.value = error;
  }
};

onMounted(() => {
  modalTrigger.value = document.querySelector('[data-bs-toggle="modal"][data-bs-target="#showModalMessage"]');
});
</script>
<template>
  <div class="logout">
    <button @click="logoutUser" class="dropdown-item"><i class="bi bi-box-arrow-left"></i> Keluar</button>
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
</template>
