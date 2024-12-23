import { defineStore } from 'pinia';
import axios from '@/services/api';

export const useLivestockStore = defineStore({
  id: 'livestockStore',
  state: () => ({
    livestocks: null,
    livestock: null,
    loading: false,
    error: null,
  }),

  getters: {
    getLivestocks: (state) => state.livestocks,
    getLivestock: (state) => state.livestock,
    
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

    fetchLivestocksAnonymous() {
      return new Promise(async (resolve, reject) => {
        this.error = null;
        try {
          const response = await axios.get('/api/livestocks-anonymous');

          this.livestocks = response.data.livestocks;
          resolve(this.livestocks);
        } catch (error) {
          this.error = error.response.data.message;
          reject(this.error);
        }
      });
    },

    fetchLivestocks() {
      return new Promise(async (resolve, reject) => {
        this.error = null;
        try {
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
          this.error = error.response.data.message;
          reject(this.error);
        }
      });
    },

    fetchLivestocksByIdProfile(profileId) {
      return new Promise(async (resolve, reject) => {
        this.error = null;
        try {
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
          this.error = error.response.data.message;
          reject(this.error);
        }
      });
    },

    postLivestock(livestockData) {
      return new Promise(async (resolve, reject) => {
        this.loading = true;
        this.error = null;
        try {
          await this.fetchCsrfToken();

          const token = localStorage.getItem('token');
          const headers = {
            Authorization: `Bearer ${token}`,
          };

          const response = await axios.post('/api/livestock', livestockData, {
            headers,
          });

          this.loading = false;
          this.livestock = response.data.livestock;
          resolve(this.livestock);
        } catch (error) {
          this.loading = false;
          this.error = error.response.data.message;
          reject(this.error);
        }
      });
    },

    postLivestockPhotoById(livestockId, livestockPhoto) {
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

          const response = await axios.post(`/api/livestock-photo/${livestockId}`, livestockPhoto, {
            headers,
          });

          this.loading = false;
          this.livestock = response.data.livestock;
          resolve(this.livestock);
        } catch (error) {
          this.loading = false;
          this.error = error.response.data.message;
          reject(this.error);
        }
      });
    },

    putLivestockPhotoById(livestockId) {
      return new Promise(async (resolve, reject) => {
        this.loading = true;
        this.error = null;
        try {
          await this.fetchCsrfToken();

          const token = localStorage.getItem('token');
          const headers = {
            Authorization: `Bearer ${token}`,
          };

          const response = await axios.post(`/api/livestock-photo/${livestockId}`, null, {
            headers,
          });

          this.loading = false;
          this.livestock = response.data.livestock;
          resolve(this.livestock);
        } catch (error) {
          this.loading = false;
          this.error = error.response.data.message;
          reject(this.error);
        }
      });
    },

    fetchLivestockById(id) {
      return new Promise(async (resolve, reject) => {
        this.error = null;
        try {
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
          this.error = error.response.data.message;
          reject(this.error);
        }
      });
    },

    putLivestockById(id, livestockData) {
      return new Promise(async (resolve, reject) => {
        this.loading = true;
        this.error = null;
        try {
          await this.fetchCsrfToken();

          const token = localStorage.getItem('token');
          const headers = {
            Authorization: `Bearer ${token}`,
          };

          const response = await axios.put(`/api/livestock/${id}`, livestockData, {
            headers,
          });

          this.loading = false;
          this.livestock = response.data.livestock;
          resolve(this.livestock);
        } catch (error) {
          this.loading = false;
          this.error = error.response.data.message;
          reject(this.error);
        }
      });
    },

    deleteLivestockById(id) {
      return new Promise(async (resolve, reject) => {
        this.loading = true;
        this.error = null;
        try {
          await this.fetchCsrfToken();

          const token = localStorage.getItem('token');
          const headers = {
            Authorization: `Bearer ${token}`,
          };

          const response = await axios.delete(`/api/livestock/${id}`, {
            headers,
          });

          this.loading = false;
          this.livestock = null;
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
