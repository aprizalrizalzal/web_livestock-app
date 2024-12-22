<script setup>
import { useAuthStore } from '../stores/authStore';
import { useProfileStore } from '../stores/profileStore';
import { computed, ref, watch } from 'vue';

const useAuth = useAuthStore();
const useProfile = useProfileStore();

const isLoading = computed(() => {
    return (
        useAuth.loading ||
        useProfile.loading
    );
});

const hasError = computed(() => {
    return (
        useAuth.error ||
        useProfile.error
    );
});

const dialogLoading = ref(false);
const dialogError = ref(false);

watch(isLoading, (loading) => {
    dialogLoading.value = loading;
});

watch(hasError, (error) => {
    dialogError.value = !!error;
});
</script>

<template>
    <Dialog v-model:visible="dialogLoading" :draggable="false" :show-header="false" modal closeIcon="false">
        <div class="d-flex row align-items-center text-center pt-5">
            <ProgressSpinner />
            <h2 class="py-3">Loading...</h2>
            <p>Tunggu sebentar ya!</p>
        </div>
    </Dialog>

    <Dialog v-model:visible="dialogError" :draggable="false" header="Warning" modal>
        <div>
            <span>{{
                useAuth.error || useProfile.error
            }}</span>
        </div>
    </Dialog>
</template>
