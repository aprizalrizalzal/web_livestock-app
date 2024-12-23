import { defineStore } from 'pinia';
import axios from '@/services/api';

export const useLivestockTypeStore = defineStore('livestockTypeStore', {
  state: () => ({
    livestockTypes: null,
    livestockType: null,
    loading: false,
    error: null,
  }),

  getters: {
    getLivestockTypes: (state) => state.livestockTypes,
    getLivestockType: (state) => state.livestockType,
    
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

    fetchLivestockTypes() {
      return new Promise(async (resolve, reject) => {
        this.error = null;
        try {
          const token = localStorage.getItem('token');
          const headers = {
            Authorization: `Bearer ${token}`,
          };

          const response = await axios.get('/api/livestock-types', {
            headers,
          });

          this.livestockTypes = response.data.livestockTypes;
          resolve(this.livestockTypes);
        } catch (error) {
          this.error = error.response.data.message;
          reject(this.error);
        }
      });
    },

    postLivestockType(livestockTypeData) {
      return new Promise(async (resolve, reject) => {
        this.loading = true;
        this.error = null;
        try {
          await this.fetchCsrfToken();

          const token = localStorage.getItem('token');
          const headers = {
            Authorization: `Bearer ${token}`,
          };

          const response = await axios.post('/api/livestock-type', livestockTypeData, {
            headers,
          });

          this.loading = false;
          this.livestockType = response.data.livestockType;
          resolve(this.livestockType);
        } catch (error) {
          this.loading = false;
          this.error = error.response.data.message;
          reject(this.error);
        }
      });
    },

    fetchLivestockTypeById(id) {
      return new Promise(async (resolve, reject) => {
        this.error = null;
        try {
          const token = localStorage.getItem('token');
          const headers = {
            Authorization: `Bearer ${token}`,
          };

          const response = await axios.get(`/api/livestock-type/${id}`, {
            headers,
          });

          this.livestockType = response.data.livestockType;
          resolve(this.livestockType);
        } catch (error) {
          this.error = error.response.data.message;
          reject(this.error);
        }
      });
    },

    putLivestockTypeById(id, livestockTypeData) {
      return new Promise(async (resolve, reject) => {
        this.loading = true;
        this.error = null;
        try {
          await this.fetchCsrfToken();

          const token = localStorage.getItem('token');
          const headers = {
            Authorization: `Bearer ${token}`,
          };

          const response = await axios.put(`/api/livestock-type/${id}`, livestockTypeData, {
            headers,
          });

          this.loading = false;
          this.livestockType = response.data.livestockType;
          resolve(this.livestockType);
        } catch (error) {
          this.loading = false;
          this.error = error.response.data.message;
          reject(this.error);
        }
      });
    },

    deleteLivestockTypeById(id) {
      return new Promise(async (resolve, reject) => {
        this.loading = true;
        this.error = null;
       
        try {
          await this.fetchCsrfToken();

          const token = localStorage.getItem('token');
          const headers = {
            Authorization: `Bearer ${token}`,
          };

          const response = await axios.delete(`/api/livestock-type/${id}`, {
            headers,
          });

          this.loading = false;
          this.livestockType = null;
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
