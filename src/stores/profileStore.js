import { defineStore } from 'pinia';
import axios from '@/services/api';

export const useProfileStore = defineStore({
  id: 'profileStore',
  state: () => ({
    profile: null,
    loading: false,
    error: null,
  }),

  getters: {
    getProfile: (state) => state.profile,
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
        this.error = null;

        try {
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
          this.error = error.response.data.message;
          reject(this.error);
        }
      });
    },

    postProfile(profileData) {
      return new Promise(async (resolve, reject) => {
        this.loading = true;
        this.error = null;

        try {
          await this.fetchCsrfToken();

          const token = localStorage.getItem('token');
          const headers = {
            Authorization: `Bearer ${token}`,
          };

          const response = await axios.post('/api/profile', profileData, {
            headers,
          });

          this.loading = false;
          this.profile = response.data.profile;
          resolve(this.profile);
        } catch (error) {
          this.loading = false;
          this.error = error.response.data.message;
          reject(this.error);
        }
      });
    },

    postProfilePhoto(profilePhoto) {
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

          const response = await axios.post('/api/profile-photo', profilePhoto, {
            headers,
          });

          this.loading = false;
          this.profile = response.data.profile;
          resolve(this.profile);
        } catch (error) {
          this.loading = false;
          this.error = error.response.data.message;
          reject(this.error);
        }
      });
    },

    putProfilePhoto() {
      return new Promise(async (resolve, reject) => {
        this.loading = true;
        this.error = null;

        try {
          await this.fetchCsrfToken();

          const token = localStorage.getItem('token');
          const headers = {
            Authorization: `Bearer ${token}`,
          };

          const response = await axios.put('/api/profile-photo', null, {
            headers,
          });

          this.loading = false;
          this.profile = response.data.profile;
          resolve(this.profile);
        } catch (error) {
          this.loading = false;
          this.error = error.response.data.message;
          reject(this.error);
        }
      });
    },

    putProfile(profileData) {
      return new Promise(async (resolve, reject) => {
        this.loading = true;
        this.error = null;

        try {
          await this.fetchCsrfToken();

          const token = localStorage.getItem('token');
          const headers = {
            Authorization: `Bearer ${token}`,
          };

          const response = await axios.put(`/api/profile`, profileData, {
            headers,
          });

          this.loading = false;
          this.profile = response.data.profile;
          resolve(this.profile);
        } catch (error) {
          this.loading = false;
          this.error = error.response.data.message;
          reject(this.error);
        }
      });
    },

    deleteProfile() {
      return new Promise(async (resolve, reject) => {
        this.loading = true;
        this.error = null;

        try {
          await this.fetchCsrfToken();

          const token = localStorage.getItem('token');
          const headers = {
            Authorization: `Bearer ${token}`,
          };

          const response = await axios.delete(`/api/profile`, {
            headers,
          });

          this.loading = false;
          this.profile = null;
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
