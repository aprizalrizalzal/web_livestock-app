<script setup>
import { ref, onMounted } from 'vue';
import { useLivestockStore } from '@/stores/livestockStore';
import { useLivestockPhotoStore } from '@/stores/livestockPhotoStore';
import { useLivestockTypeStore } from '@/stores/livestockTypeStore';
import { useLivestockSpeciesStore } from '@/stores/livestockSpeciesStore';
import { useRouter, useRoute } from 'vue-router';

const storeLivestock = useLivestockStore();
const storeLivestockPhoto = useLivestockPhotoStore();
const storeLivestockType = useLivestockTypeStore();
const storeLivestockSpecies = useLivestockSpeciesStore();
const router = useRouter();
const route = useRoute();

const livestockId = route.params.id;

const selectedLivestockTypeId = ref({});
const selectedLivestockSpeciesId = ref({});

const livestock = ref({
  livestock_type_id: selectedLivestockTypeId,
  livestock_species_id: selectedLivestockSpeciesId,
  age: '',
  weight: '',
  unit: '',
  gender: '',
  price: '',
  condition: '',
});

const livestockPhotos = ref([]);
const livestockTypes = ref({});
const livestocksSpecies = ref([]);
const livestocksUnits = ref([
  {
    name: 'Ton'
  },
  {
    name: 'Quintal'
  }
]);

const fetchLivestockById = async () => {
  try {
    livestock.value = await storeLivestock.fetchLivestockById(livestockId);
    selectedLivestockTypeId.value = livestock.value.livestock_type_id;
    selectedLivestockSpeciesId.value = livestock.value.livestock_species_id;
    fetchLivestockTypes();
  } catch (error) {
    console.error('Kesalahan dalam mengambil data livestock:', error);
  }
};

const fetchLivestockTypes = async () => {
  try {
    livestockTypes.value = await storeLivestockType.fetchLivestockTypes();
    fetchLivestockSpeciesByIdLivestockType();
  } catch (error) {
    console.error('Kesalahan dalam mengambil data livestockType:', error);
  }
};

const fetchLivestockSpeciesByIdLivestockType = async () => {
  try {
    livestocksSpecies.value = await storeLivestockSpecies.fetchLivestockSpeciesByIdLivestockType(selectedLivestockTypeId.value);
  } catch (error) {
    console.error('Kesalahan dalam mengambil data livestockSpecies:', error);
  }
};

const saveLivestock = async () => {
  try {
    livestock.value = await storeLivestock.postLivestock(livestock.value);
    goBack();
  } catch (error) {
    console.error('Kesalahan dalam mengirim data livestock:', error);
  }
};

const updateLivestock = async (livestockId) => {
  try {
    const _livestock = livestock.value;

    _livestock.livestock_type_id = selectedLivestockTypeId.value;
    _livestock.livestock_species_id = selectedLivestockSpeciesId.value;

    livestock.value = await storeLivestock.putLivestockById(livestockId, _livestock);
    goBack();
  } catch (error) {
    console.error('Kesalahan dalam mengirim data livestock:', error);
  }
};

const fetchLivestockPhotosByIdLivestock = async () => {
  try {
    livestockPhotos.value = await storeLivestockPhoto.fetchLivestockPhotosByIdLivestock(livestockId);
    fetchLivestockById();
  } catch (error) {
    console.error('Kesalahan dalam mengambil gambar livestockPhotos:', error);
  }
};

const handleSampulFileUpload = async (event) => {
  const selectedFile = event.target.files[0];

  if (selectedFile) {
    try {
      const formData = new FormData();
      formData.append('photo', selectedFile);

      livestock.value = await storeLivestock.postLivestockPhotoById(livestockId, formData);
      fetchLivestockById();
    } catch (error) {
      console.error('Kesalahan dalam mengunggah gambar livestock:', error);
    }
  }
};

const putLivestockPhotoById = async (livestockId) => {
  try {
    livestock.value = await storeLivestock.putLivestockPhotoById(livestockId);
    fetchLivestockById();
  } catch (error) {
    console.error('Kesalahan dalam menghapus gambar livestock:', error);
  }
};

const handleDetailFileUpload = async (event) => {
  const selectedFile = event.target.files[0];

  if (selectedFile) {
    try {
      const formData = new FormData();
      formData.append('photo', selectedFile);

      livestockPhotos.value = await storeLivestockPhoto.postLivestockPhotoByIdLivestock(livestockId, formData);
      fetchLivestockPhotosByIdLivestock();
    } catch (error) {
      console.error('Kesalahan dalam mengunggah gambar livestockPhoto:', error);
    }
  }
};

const deleteLivestockPhotoById = async (livestockPhotoId) => {
  try {
    await storeLivestockPhoto.deleteLivestockPhotoById(livestockPhotoId);
    fetchLivestockPhotosByIdLivestock();
  } catch (error) {
    console.error('Kesalahan dalam menghapus gambar livestock:', error);
  }
};

const goBack = () => {
  router.back();
};

onMounted(() => {
  if (livestockId) {
    fetchLivestockById();
    fetchLivestockPhotosByIdLivestock();
  } else {
    fetchLivestockTypes();
  }
});
</script>
<template>
  <div class="row">
    <div class="col-md-9">
      <button @click="goBack" class="btn btn-secondary my-2"><i class="bi bi-arrow-left"></i> Kembali</button>
    </div>
    <div class="col-md-3 text-end">
      <h2 v-if="livestockId" class="mb-4">Edit Hewan Ternak</h2>
      <h2 v-else class="mb-4">Tambah Hewan Ternak</h2>
    </div>
  </div>
  <div class="livestocks-add-edit" v-if="(livestock && livestock.profile && livestock.livestock_type_id && livestock.livestock_species_id) || (livestockTypes && livestocksSpecies)">
    <div class="container rounded bg-white mt-3 mb-5 shadow-sm">
      <div class="row px-3 py-4">
        <div class="col-md-4" v-if="livestockId">
          <h4 class="mb-4">Foto Sampul</h4>
          <div class="text-center">
            <img v-if="livestock.photo_url" :src="livestock.photo_url" alt="Livestock Photo" style="width: 300px; height: 200px; object-fit: cover" class="rounded mx-auto d-block" />
          </div>
          <div class="my-3 text-center">
            <input type="file" @change="handleSampulFileUpload" class="form-control" id="inputGroupSampulFile" style="display: none" />
            <label class="btn btn-primary shadow-sm me-2" for="inputGroupSampulFile"><i class="bi bi-upload"></i> Unggah</label>
            <button @click="putLivestockPhotoById(livestock.id)" class="btn btn-danger shadow-sm"><i class="bi bi-eraser-fill"></i> Hapus Foto</button>
          </div>
          <h4 class="mt-4">Foto Detail</h4>
          <div class="col-md-12">
            <div class="row text-center">
              <div class="col-md-6" v-for="livestockPhoto in livestockPhotos" :key="livestockPhoto.id">
                <img v-if="livestockPhoto.photo_url" :src="livestockPhoto.photo_url" alt="Livestock Photos" style="width: 150px; height: 100px; object-fit: cover" class="rounded mx-auto d-block" />
                <button @click="deleteLivestockPhotoById(livestockPhoto.id)" class="btn btn-danger shadow-sm my-3"><i class="bi bi-eraser-fill"></i> Hapus</button>
              </div>
            </div>
          </div>
          <div class="text-center">
            <input type="file" @change="handleDetailFileUpload" class="form-control" id="inputGroupDetailFile" style="display: none" />
            <label class="btn btn-primary shadow-sm" for="inputGroupDetailFile"><i class="bi bi-upload"></i> Unggah</label>
          </div>
        </div>
        <div :class="{ 'col-md-12': !livestockId, 'col-md-8': livestockId }">
          <h4 class="mb-4">Hewan</h4>
          <form @submit.prevent="livestockId ? updateLivestock(livestockId) : saveLivestock()">
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
              <label class="labels">Umur (Bulan)</label>
              <input type="text" class="form-control shadow-sm mb-2" placeholder="Umur (Bulan)" v-model="livestock.age" required />
            </div>
            <div class="d-flex col-md-12 gap-2">
              <div class="col-md-6">
                <label class="labels">Berat</label>
                <input type="text" class="form-control shadow-sm mb-2" placeholder="Berat" v-model="livestock.weight" required />
              </div>
              <div class="col-md-6">
                <label class="labels">Satuan</label>
                <select class="form-select mb-2" v-model="livestock.unit">
                <option v-for="livestocksUnit in livestocksUnits" :value="livestocksUnit.name" :key="livestocksUnit.name">
                  {{ livestocksUnit.name }}
                </option>
              </select>
              </div>
            </div>
            <div class="col-md-12">
              <label class="labels">Harga (Rp)</label>
              <input type="text" class="form-control shadow-sm mb-2" placeholder="Harga (Rp)" v-model="livestock.price" required />
            </div>
            <div class="col-md-12">
              <label class="labels">Kondisi</label>
              <textarea type="text" class="form-control shadow-sm mb-2" rows="3" placeholder="Kondisi" v-model="livestock.condition" required></textarea>
            </div>
            <div class="mt-3 text-end">
              <button type="submit" :class="livestockId ? ' btn btn-secondary shadow-sm' : 'btn btn-primary shadow-sm'"><i class="bi bi-save"></i> {{ livestockId ? 'Perbarui' : 'Simpan' }}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  <div class="livestock-add-edit" v-else>
    <h2 class="mb-4">Loading...</h2>
  </div>
</template>
