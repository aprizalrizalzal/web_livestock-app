import { defineStore } from 'pinia';
import axios from '@/services/api';

export const useLivestockPhotoStore = defineStore({
  id: 'livestockPhotoStore',
  state: () => ({
    livestockPhotos: null,
    livestockPhoto: null,
    loading: false,
    error: null,
  }),

  getters: {
    getLivestockPhotos: (state) => state.livestockPhotos,
    getLivestockPhoto: (state) => state.livestockPhoto,
    
  },

  actions: {
    async fetchCsrfToken() {
      try {
        await axios.get('/sanctum/csrf-cookie');
      } catch (error) {
        console.error('Error fetching CSRF token', error);
        throw error;
      }
    },

    fetchLivestockPhotosByIdLivestock(livestockId) {
      return new Promise(async (resolve, reject) => {
        this.error = null;
        try {
          const token = localStorage.getItem('token');
          const headers = {
            Authorization: `Bearer ${token}`,
          };

          const response = await axios.get(`/api/livestock/livestock-photos/${livestockId}`, {
            headers,
          });

          this.livestockPhotos = response.data.livestockPhotos;
          resolve(this.livestockPhotos);
        } catch (error) {
          this.error = error.response.data.message;
          reject(this.error);
        }
      });
    },

    postLivestockPhotoByIdLivestock(livestockId, livestockPhoto) {
      return new Promise(async (resolve, reject) => {
        this.loading = true;
        this.error = null;
        try {
          await this.fetchCsrfToken();

          const token = localStorage.getItem('token');
          const headers = {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          };

          const response = await axios.post(`/api/livestock/livestock-photo/${livestockId}`, livestockPhoto, {
            headers,
          });

          this.loading = false;
          this.livestockPhoto = response.data.livestockPhoto;
          resolve(this.livestockPhoto);
        } catch (error) {
          this.loading = false;
          this.error = error.response.data.message;
          reject(this.error);
        }
      });
    },

    deleteLivestockPhotoById(livestockPhotoId) {
      return new Promise(async (resolve, reject) => {
        this.loading = true;
        this.error = null;
        try {
          await this.fetchCsrfToken();

          const token = localStorage.getItem('token');
          const headers = {
            Authorization: `Bearer ${token}`,
          };

          const response = await axios.delete(`/api/livestock/livestock-photo/${livestockPhotoId}`, {
            headers,
          });

          this.loading = false;
          this.livestockPhoto = null;
          resolve(response.data.message);
        } catch (error) {
          this.loading = false;
          this.error = error.response.data.message;
          reject(this.error);
        }
      });
    },
  },
});
