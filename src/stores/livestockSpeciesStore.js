import { defineStore } from 'pinia';
import axios from '@/services/api';

export const useLivestockSpeciesStore = defineStore('livestockSpeciesStore', {
  state: () => ({
    livestockSpecies: null,
    livestockSpeciesList: null,
    message: null,
  }),

  getters: {
    getLivestockSpecies: (state) => state.livestockSpecies,
    getLivestockSpeciesList: (state) => state.livestockSpeciesList,
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

    fetchLivestockSpeciesByIdLivestockType(livestockTypeId) {
      return new Promise(async (resolve, reject) => {
        try {
          await this.fetchCsrfToken();

          const token = localStorage.getItem('token');
          const headers = {
            Authorization: `Bearer ${token}`,
          };

          const response = await axios.get(`/api/livestocks-species/${livestockTypeId}`, {
            headers,
          });

          this.livestockSpecies = response.data.livestockSpecies;
          resolve(this.livestockSpecies);
        } catch (error) {
          console.error('Error in getLivestockSpeciesByIdLivestockType ', error);
          this.message = error.response.data.message;
          reject(this.message);
        }
      });
    },

    postLivestockSpeciesByIdLivestockType(livestockTypeId, livestockSpeciesData) {
      return new Promise(async (resolve, reject) => {
        try {
          await this.fetchCsrfToken();

          const token = localStorage.getItem('token');
          const headers = {
            Authorization: `Bearer ${token}`,
          };

          const response = await axios.post(`/api/livestock-species/${livestockTypeId}`, livestockSpeciesData, {
            headers,
          });

          this.livestockSpecies = response.data.livestockSpecies;
          resolve(this.livestockSpecies);
        } catch (error) {
          console.error('Error in postLivestockSpecies ', error);
          this.message = error.response.data.message;
          reject(this.message);
        }
      });
    },

    fetchLivestockSpeciesById(id) {
      return new Promise(async (resolve, reject) => {
        try {
          await this.fetchCsrfToken();

          const token = localStorage.getItem('token');
          const headers = {
            Authorization: `Bearer ${token}`,
          };

          const response = await axios.get(`/api/livestock-species/${id}`, {
            headers,
          });

          this.livestockSpecies = response.data.livestockSpecies;
          resolve(this.livestockSpecies);
        } catch (error) {
          console.error('Error in getLivestockSpeciesById ', error);
          this.message = error.response.data.message;
          reject(this.message);
        }
      });
    },

    putLivestockSpeciesById(id, livestockSpeciesData) {
      return new Promise(async (resolve, reject) => {
        try {
          await this.fetchCsrfToken();

          const token = localStorage.getItem('token');
          const headers = {
            Authorization: `Bearer ${token}`,
          };

          const response = await axios.put(`/api/livestock-species/${id}`, livestockSpeciesData, {
            headers,
          });

          this.livestockSpecies = response.data.livestockSpecies;
          resolve(this.livestockSpecies);
        } catch (error) {
          console.error('Error in putLivestockSpeciesById ', error);
          this.message = error.response.data.message;
          reject(this.message);
        }
      });
    },

    deleteLivestockSpeciesById(id) {
      return new Promise(async (resolve, reject) => {
        try {
          await this.fetchCsrfToken();

          const token = localStorage.getItem('token');
          const headers = {
            Authorization: `Bearer ${token}`,
          };

          const response = await axios.delete(`/api/livestock-species/${id}`, {
            headers,
          });

          // Assuming you want to reset to null after a successful delete.
          this.livestockSpecies = null;
          resolve(response.data.message);
        } catch (error) {
          console.error('Error in deleteLivestockSpeciesById ', error);
          this.message = error.response.data.message;
          reject(this.message);
        }
      });
    },
  },
});
