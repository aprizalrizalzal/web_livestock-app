<script setup>
import { ref, onMounted } from 'vue';
import { useLivestockStore } from '@/stores/livestockStore';
import { useLivestockTypeStore } from '@/stores/livestockTypeStore';
import { useLivestockSpeciesStore } from '@/stores/livestockSpeciesStore';
import { useRouter, useRoute } from 'vue-router';

const storeLivestock = useLivestockStore();
const storeLivestockType = useLivestockTypeStore();
const storeLivestockSpecies = useLivestockSpeciesStore();
const router = useRouter();
const route = useRoute();
const livestockId = route.params.id;
const livestock = ref([]);
const livestockTypes = ref([]);
const livestocksSpecies = ref([]);
const selectedLivestockTypeId = ref({});
const selectedLivestockSpeciesId = ref({});

const fetchLivestockById = async () => {
  try {
    livestock.value = await storeLivestock.fetchLivestockById(livestockId);
    if (livestock.value) {
      selectedLivestockTypeId.value = livestock.value.livestock_type.id;
      selectedLivestockSpeciesId.value = livestock.value.livestock_species.id;
      fetchLivestockTypes();
    }
  } catch (error) {
    console.error('Kesalahan dalam mengambil data livestock:', error);
  }
};

const fetchLivestockTypes = async () => {
  try {
    livestockTypes.value = await storeLivestockType.fetchLivestockTypes();
    if (livestockTypes.value) {
      fetchLivestockSpeciesByIdLivestockType();
    }
  } catch (error) {
    console.error('Kesalahan dalam mengambil data livestock:', error);
  }
};

const fetchLivestockSpeciesByIdLivestockType = async () => {
  try {
    livestocksSpecies.value = await storeLivestockSpecies.fetchLivestockSpeciesByIdLivestockType(selectedLivestockTypeId.value);
  } catch (error) {
    console.error('Kesalahan dalam mengambil data livestock:', error);
  }
};

const updateLivestock = async () => {};

const saveLivestock = async () => {};

const goBack = () => {
  router.back();
};

onMounted(() => {
  if (livestockId) {
    fetchLivestockById();
  }
});
</script>
<template>
  <div class="livestocks-edit">
    <div class="row">
      <div class="col-md-8">
        <button @click="goBack" class="btn btn-secondary my-2"><i class="bi bi-arrow-left"></i> Kembali</button>
      </div>
      <div class="col-md-4 text-end">
        <h2 v-if="livestockId" class="mb-4">Edit Hewan Ternak</h2>
        <h2 v-else class="mb-4">Tambah Hewan Ternak</h2>
      </div>
    </div>
    <div class="container rounded bg-white mt-3 mb-5 shadow-sm">
      <div class="row px-3 py-4">
        <div class="col-md-4">
          <h4 class="mb-4">Foto Sampul</h4>
          <form @submit.prevent="">
            <div class="col-md-12"></div>
            <div class="mt-3 text-center">
              <label class="btn btn-primary shadow-sm me-2" for="inputGroupFile"><i class="bi bi-upload"></i> Unggah</label>
              <button @click="deleteLivestockPhoto" class="btn btn-danger shadow-sm"><i class="bi bi-eraser-fill"></i> Hapus Foto</button>
            </div>
          </form>
          <h4 class="mt-4">Foto Detail</h4>
          <form @submit.prevent="">
            <div class="col-md-12">
              <button @click="deleteLivestockPhotoById()" class="btn btn-danger shadow-sm"><i class="bi bi-eraser-fill"></i></button>
            </div>
            <div class="mt-3 text-center">
              <label class="btn btn-primary shadow-sm me-2" for="inputGroupFile"><i class="bi bi-upload"></i> Unggah</label>
            </div>
          </form>
        </div>
        <div class="col-md-8">
          <h4 class="mb-4">Hewan</h4>
          <form @submit.prevent="livestockId ? updateLivestock() : saveLivestock()">
            <div class="col-md-12">
              <label class="labels">Hewan Ternak</label>
              <select class="form-select mb-2" v-model="selectedLivestockTypeId" @change="fetchLivestockSpeciesByIdLivestockType(selectedLivestockTypeId)">
                <option v-for="livestockType in livestockTypes" :value="livestockType.id" :key="livestockType.id">
                  {{ livestockType.name }}
                </option>
              </select>
            </div>
            <div class="col-md-12">
              <label class="labels">Jenis</label>
              <select class="form-select mb-2" v-model="selectedLivestockSpeciesId">
                <option v-for="livestockSpecies in livestocksSpecies" :value="livestockSpecies.id" :key="livestockSpecies.id">
                  {{ livestockSpecies.name }}
                </option>
              </select>
            </div>
            <div class="col-md-12">
              <label class="labels">Jenis Kelamin</label>
              <div class="mt-2 mb-2">
                <div class="form-check form-check-inline">
                  <input class="form-check-input shadow-sm" type="radio" name="inlineRadioOptions" id="male" value="Male" v-model="livestock.gender" />
                  <label class="form-check-label" for="male">Jantan</label>
                </div>
                <div class="form-check form-check-inline">
                  <input class="form-check-input shadow-sm" type="radio" name="inlineRadioOptions" id="female" value="Female" v-model="livestock.gender" />
                  <label class="form-check-label" for="female">Betina</label>
                </div>
              </div>
            </div>
            <div class="col-md-12">
              <label class="labels">Umur</label>
              <input type="text" class="form-control shadow-sm mb-2" placeholder="Umur" v-model="livestock.age" required />
            </div>
            <div class="col-md-12">
              <label class="labels">Harga</label>
              <input type="text" class="form-control shadow-sm mb-2" placeholder="Harga" v-model="livestock.price" required />
            </div>
            <div class="col-md-12">
              <label class="labels">Detail</label>
              <textarea type="text" class="form-control shadow-sm mb-2" rows="3" placeholder="Detail" v-model="livestock.detail" required></textarea>
            </div>
            <div class="mt-3 text-end">
              <button type="submit" :class="livestockId ? ' btn btn-secondary shadow-sm' : 'btn btn-primary shadow-sm'"><i class="bi bi-save"></i> {{ livestockId ? 'Perbarui' : 'Simpan' }}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
