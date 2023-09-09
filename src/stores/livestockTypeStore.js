import { defineStore } from 'pinia';
import axios from '@/services/api';

export const useLivestockTypeStore = defineStore('livestockTypeStore', {
  state: () => ({
    livestockTypes: null,
    livestockType: null,
    message: null,
  }),

  getters: {
    getLivestockTypes: (state) => state.livestockTypes,
    getLivestockType: (state) => state.livestockType,
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

    fetchLivestockTypes() {
      return new Promise(async (resolve, reject) => {
        try {
          await this.fetchCsrfToken();

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
          console.error('Error in getLivestockTypes ', error);
          this.message = error.response.data.message;
          reject(this.message);
        }
      });
    },

    postLivestockType(livestockTypeData) {
      return new Promise(async (resolve, reject) => {
        try {
          await this.fetchCsrfToken();

          const token = localStorage.getItem('token');
          const headers = {
            Authorization: `Bearer ${token}`,
          };

          const response = await axios.post('/api/livestock-type', livestockTypeData, {
            headers,
          });

          this.livestockType = response.data.livestockType;
          resolve(this.livestockType);
        } catch (error) {
          console.error('Error in postLivestockType ', error);
          this.message = error.response.data.message;
          reject(this.message);
        }
      });
    },

    fetchLivestockTypeById(id) {
      return new Promise(async (resolve, reject) => {
        try {
          await this.fetchCsrfToken();

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
          console.error('Error in getLivestockTypeById ', error);
          this.message = error.response.data.message;
          reject(this.message);
        }
      });
    },

    putLivestockTypeById(id, livestockTypeData) {
      return new Promise(async (resolve, reject) => {
        try {
          await this.fetchCsrfToken();

          const token = localStorage.getItem('token');
          const headers = {
            Authorization: `Bearer ${token}`,
          };

          const response = await axios.put(`/api/livestock-type/${id}`, livestockTypeData, {
            headers,
          });

          this.livestockType = response.data.livestockType;
          resolve(this.livestockType);
        } catch (error) {
          console.error('Error in putLivestockTypeById ', error);
          this.message = error.response.data.message;
          reject(this.message);
        }
      });
    },

    deleteLivestockTypeById(id) {
      return new Promise(async (resolve, reject) => {
        try {
          await this.fetchCsrfToken();

          const token = localStorage.getItem('token');
          const headers = {
            Authorization: `Bearer ${token}`,
          };

          const response = await axios.delete(`/api/livestock-type/${id}`, {
            headers,
          });

          // Assuming you want to reset to null after a successful delete.
          this.livestockType = null;
          resolve(response.data.message);
        } catch (error) {
          console.error('Error in deleteLivestockTypeById ', error);
          this.message = error.response.data.message;
          reject(this.message);
        }
      });
    },
  },
});
