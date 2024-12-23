import { defineStore } from 'pinia';
import axios from '@/services/api';

export const useLivestockSpeciesStore = defineStore('livestockSpeciesStore', {
  state: () => ({
    livestockSpecies: null,
    livestockSpeciesList: null,
    loading: false,
    error: null,
  }),

  getters: {
    getLivestockSpecies: (state) => state.livestockSpecies,
    getLivestockSpeciesList: (state) => state.livestockSpeciesList,
    
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
          this.error = error.response.data.message;
          reject(this.error);
        }
      });
    },

    postLivestockSpeciesByIdLivestockType(livestockTypeId, livestockSpeciesData) {
      return new Promise(async (resolve, reject) => {
        this.loading = true;
        this.error = null;
        try {
          await this.fetchCsrfToken();

          const token = localStorage.getItem('token');
          const headers = {
            Authorization: `Bearer ${token}`,
          };

          const response = await axios.post(`/api/livestock-species/${livestockTypeId}`, livestockSpeciesData, {
            headers,
          });

          this.loading = false;
          this.livestockSpecies = response.data.livestockSpecies;
          resolve(this.livestockSpecies);
        } catch (error) {
          this.loading = false;
          this.error = error.response.data.message;
          reject(this.error);
        }
      });
    },

    fetchLivestockSpeciesById(id) {
      return new Promise(async (resolve, reject) => {
        try {
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
          this.error = error.response.data.message;
          reject(this.error);
        }
      });
    },

    putLivestockSpeciesById(id, livestockSpeciesData) {
      return new Promise(async (resolve, reject) => {
        this.loading = true;
        this.error = null;
        try {
          await this.fetchCsrfToken();

          const token = localStorage.getItem('token');
          const headers = {
            Authorization: `Bearer ${token}`,
          };

          const response = await axios.put(`/api/livestock-species/${id}`, livestockSpeciesData, {
            headers,
          });

          this.loading = false;
          this.livestockSpecies = response.data.livestockSpecies;
          resolve(this.livestockSpecies);
        } catch (error) {
          this.loading = false;
          this.error = error.response.data.message;
          reject(this.error);
        }
      });
    },

    deleteLivestockSpeciesById(id) {
      return new Promise(async (resolve, reject) => {
        this.loading = true;
        this.error = null;
        try {
          await this.fetchCsrfToken();

          const token = localStorage.getItem('token');
          const headers = {
            Authorization: `Bearer ${token}`,
          };

          const response = await axios.delete(`/api/livestock-species/${id}`, {
            headers,
          });

          this.loading = false;
          this.livestockSpecies = null;
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
