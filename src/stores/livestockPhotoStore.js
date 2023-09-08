import { defineStore } from 'pinia';
import axios from '@/services/api';

export const useLivestockPhotoStore = defineStore({
  id: 'livestockPhotoStore',
  state: () => ({
    livestockPhotos: null,
    livestockPhoto: null,
    message: null,
  }),

  getters: {
    getLivestockPhotos: (state) => state.livestockPhotos,
    getLivestockPhoto: (state) => state.livestockPhoto,
    getMessage: (state) => state.message,
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
        try {
          await this.fetchCsrfToken();

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
          console.error('Error in fetchLivestockPhotosByIdProfile ', error);
          this.message = error.response.data.message;
          reject(this.message);
        }
      });
    },

    postLivestockPhotoByIdLivestock(livestockId, livestockPhoto) {
      return new Promise(async (resolve, reject) => {
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

          this.livestockPhoto = response.data.livestockPhoto;
          resolve(this.livestockPhoto);
        } catch (error) {
          console.error('Error in postLivestockPhoto ', error);
          this.message = error.response.data.message;
          reject(this.message);
        }
      });
    },

    deleteLivestockPhotoById(livestockPhotoId) {
      return new Promise(async (resolve, reject) => {
        try {
          await this.fetchCsrfToken();

          const token = localStorage.getItem('token');
          const headers = {
            Authorization: `Bearer ${token}`,
          };

          const response = await axios.delete(`/api/livestock/livestock-photo/${livestockPhotoId}`, {
            headers,
          });

          // Assuming you want to reset to null after a successful delete.
          this.livestockPhoto = null;
          resolve(response.data.message);
        } catch (error) {
          console.error('Error in deleteLivestockPhotoById ', error);
          this.message = error.response.data.message;
          reject(this.message);
        }
      });
    },
  },
});
