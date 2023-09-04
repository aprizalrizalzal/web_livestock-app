import { defineStore } from 'pinia';
import axios from '@/services/api';

export const useAuthStore = defineStore({
  id: 'authStore',
  state: () => ({
    user: null,
    token: localStorage.getItem('token') || null,
    message: null,
  }),

  getters: {
    isLoggedIn: (state) => !!state.token,
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

    async register(userData) {
      return new Promise(async (resolve, reject) => {
        try {
          await this.fetchCsrfToken();

          const response = await axios.post('/api/register', userData);
          const user = response.data.user;
          const token = response.data.token;

          this.user = user;
          this.token = token;

          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('token', token);

          resolve(user);
        } catch (error) {
          console.error('Error in post register ', error);
          reject(error);
        }
      });
    },

    async login(userData) {
      return new Promise(async (resolve, reject) => {
        try {
          await this.fetchCsrfToken();

          const response = await axios.post('/api/login', userData);
          const user = response.data.user;
          const token = response.data.token;

          this.user = user;
          this.token = token;

          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('token', token);

          resolve(user);
        } catch (error) {
          console.error('Error in post login ', error);
          reject(error);
        }
      });
    },

    async logout() {
      return new Promise(async (resolve, reject) => {
        try {
          await this.fetchCsrfToken();

          const token = this.token;
          if (!token) {
            // No token, consider it a success.
            this.user = null;
            localStorage.removeItem('isLoggedIn');
            resolve('Logged out');
            return;
          }

          const headers = {
            Authorization: `Bearer ${token}`,
          };

          const response = await axios.post('/api/logout', null, {
            headers,
          });
          const message = response.data.message;

          this.user = null;
          this.token = null;

          localStorage.removeItem('isLoggedIn');
          localStorage.removeItem('token');

          resolve(message);
        } catch (error) {
          console.error('Error in post logout ', error);
          reject(error);
        }
      });
    },
  },
});
