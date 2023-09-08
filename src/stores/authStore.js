import { defineStore } from 'pinia';
import axios from '@/services/api';

export const useAuthStore = defineStore({
  id: 'authStore',
  state: () => ({
    user: null,
    role: localStorage.getItem('role') || null,
    token: localStorage.getItem('token') || null,
    message: null,
  }),

  getters: {
    isLoggedIn: (state) => !!state.token,
    getRole: (state) => state.role,
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
          localStorage.setItem('role', user.roles[0].name);
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
          localStorage.setItem('role', user.roles[0].name);
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
          localStorage.removeItem('role');
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
