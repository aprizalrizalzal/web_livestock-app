import { defineStore } from 'pinia';
import axios from '@/services/api';

export const useLivestockStore = defineStore({
  id: 'livestockStore',
  state: () => ({
    livestocks: null,
    livestock: null,
    message: null,
  }),

  getters: {
    getLivestocks: (state) => state.livestocks,
    getLivestock: (state) => state.livestock,
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

    fetchLivestocks() {
      return new Promise(async (resolve, reject) => {
        try {
          await this.fetchCsrfToken();

          const token = localStorage.getItem('token');
          const headers = {
            Authorization: `Bearer ${token}`,
          };

          const response = await axios.get('/api/livestocks', {
            headers,
          });

          this.livestocks = response.data.livestocks;
          resolve(this.livestocks);
        } catch (error) {
          console.error('Error in fetchLivestocks ', error);
          reject(error);
        }
      });
    },

    fetchLivestocksByIdProfile(profileId) {
      return new Promise(async (resolve, reject) => {
        try {
          await this.fetchCsrfToken();

          const token = localStorage.getItem('token');
          const headers = {
            Authorization: `Bearer ${token}`,
          };

          const response = await axios.get(`/api/livestocks/${profileId}`, {
            headers,
          });

          this.livestocks = response.data.livestocks;
          resolve(this.livestocks);
        } catch (error) {
          console.error('Error in fetchLivestocksByIdProfile ', error);
          reject(error);
        }
      });
    },

    postLivestock(livestockData) {
      return new Promise(async (resolve, reject) => {
        try {
          await this.fetchCsrfToken();

          const token = localStorage.getItem('token');
          const headers = {
            Authorization: `Bearer ${token}`,
          };

          const response = await axios.post('/api/livestock', livestockData, {
            headers,
          });

          this.livestock = response.data.livestock;
          resolve(this.livestock);
        } catch (error) {
          console.error('Error in postLivestock ', error);
          reject(error);
        }
      });
    },

    fetchLivestockById(id) {
      return new Promise(async (resolve, reject) => {
        try {
          await this.fetchCsrfToken();

          const token = localStorage.getItem('token');
          const headers = {
            Authorization: `Bearer ${token}`,
          };

          const response = await axios.get(`/api/livestock/${id}`, {
            headers,
          });

          this.livestock = response.data.livestock;
          resolve(this.livestock);
        } catch (error) {
          console.error('Error in fetchLivestockById ', error);
          reject(error);
        }
      });
    },

    putLivestockById(id, livestockData) {
      return new Promise(async (resolve, reject) => {
        try {
          await this.fetchCsrfToken();

          const token = localStorage.getItem('token');
          const headers = {
            Authorization: `Bearer ${token}`,
          };

          const response = await axios.put(`/api/livestock/${id}`, livestockData, {
            headers,
          });

          this.livestock = response.data.livestock;
          resolve(this.livestock);
        } catch (error) {
          console.error('Error in putLivestockById ', error);
          reject(error);
        }
      });
    },

    deleteLivestockById(id) {
      return new Promise(async (resolve, reject) => {
        try {
          await this.fetchCsrfToken();

          const token = localStorage.getItem('token');
          const headers = {
            Authorization: `Bearer ${token}`,
          };

          const response = await axios.delete(`/api/livestock/${id}`, {
            headers,
          });

          // Assuming you want to reset to null after a successful delete.
          this.livestock = null;
          resolve(response.data.message);
        } catch (error) {
          console.error('Error in deleteLivestockById ', error);
          reject(error);
        }
      });
    },
  },
});
