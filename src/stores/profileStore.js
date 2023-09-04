import { defineStore } from 'pinia';
import axios from '@/services/api';

export const useProfileStore = defineStore({
  id: 'profileStore',
  state: () => ({
    profile: null,
    message: null,
  }),

  getters: {
    getProfile: (state) => state.profile,
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

    fetchProfile() {
      return new Promise(async (resolve, reject) => {
        try {
          await this.fetchCsrfToken();

          const token = localStorage.getItem('token');
          const headers = {
            Authorization: `Bearer ${token}`,
          };

          const response = await axios.get('/api/profile', {
            headers,
          });

          this.profile = response.data.profile;
          resolve(this.profile);
        } catch (error) {
          console.error('Error in getProfile ', error);
          reject(error);
        }
      });
    },

    postProfile(profileData) {
      return new Promise(async (resolve, reject) => {
        try {
          await this.fetchCsrfToken();

          const token = localStorage.getItem('token');
          const headers = {
            Authorization: `Bearer ${token}`,
          };

          const response = await axios.post('/api/profile', profileData, {
            headers,
          });

          this.profile = response.data.profile;
          resolve(this.profile);
        } catch (error) {
          console.error('Error in postProfile ', error);
          reject(error);
        }
      });
    },

    putProfile(profileData) {
      return new Promise(async (resolve, reject) => {
        try {
          await this.fetchCsrfToken();

          const token = localStorage.getItem('token');
          const headers = {
            Authorization: `Bearer ${token}`,
          };

          const response = await axios.put(`/api/profile`, profileData, {
            headers,
          });

          this.profile = response.data.profile;
          resolve(this.profile);
        } catch (error) {
          console.error('Error in putProfile ', error);
          reject(error);
        }
      });
    },

    deleteProfile() {
      return new Promise(async (resolve, reject) => {
        try {
          await this.fetchCsrfToken();

          const token = localStorage.getItem('token');
          const headers = {
            Authorization: `Bearer ${token}`,
          };

          const response = await axios.delete(`/api/profile`, {
            headers,
          });

          // Assuming you want to reset to null after a successful delete.
          this.profile = null;
          resolve(response.data.message);
        } catch (error) {
          console.error('Error in deleteProfile ', error);
          reject(error);
        }
      });
    },
  },
});
