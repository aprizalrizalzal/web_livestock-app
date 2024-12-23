<script setup>
import { useAuthStore } from '../stores/authStore';
import { useLivestockPhotoStore } from '../stores/livestockPhotoStore';
import { useLivestockSpeciesStore } from '../stores/livestockSpeciesStore';
import { useLivestockStore } from '../stores/livestockStore';
import { useLivestockTypeStore } from '../stores/livestockTypeStore';
import { usePaymentStore } from '../stores/paymentStore';
import { useProfileStore } from '../stores/profileStore';
import { useTransactionStore } from '../stores/transactionStore';
import { useUserStore } from '../stores/userStore';
import { computed, ref, watch } from 'vue';

const useAuth = useAuthStore();
const useLivestockPhoto = useLivestockPhotoStore();
const useLivestockSpecies = useLivestockSpeciesStore();
const useLivestock = useLivestockStore();
const useLivestockType = useLivestockTypeStore();
const usePayment = usePaymentStore();
const useProfile = useProfileStore();
const useTransaction = useTransactionStore();
const useUser = useUserStore();

const isLoading = computed(() => {
    return (
        useAuth.loading ||
        useLivestockPhoto.loading ||
        useLivestockSpecies.loading ||
        useLivestock.loading ||
        useLivestockType.loading ||
        usePayment.loading ||
        useProfile.loading ||
        useTransaction.loading ||
        useUser.loading
    );
});

const hasError = computed(() => {
    return (
        useAuth.error ||
        useLivestockPhoto.error ||
        useLivestockSpecies.error ||
        useLivestock.error ||
        useLivestockType.error ||
        usePayment.error ||
        useProfile.error ||
        useTransaction.error ||
        useUser.error
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
                useAuth.error ||
                useLivestockPhoto.error ||
                useLivestockSpecies.error ||
                useLivestock.error ||
                useLivestockType.error ||
                usePayment.error ||
                useProfile.error ||
                useTransaction.error ||
                useUser.error
            }}</span>
        </div>
    </Dialog>
</template>
