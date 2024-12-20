import { defineStore } from 'pinia';
import axios from '@/services/api';

export const useAuthStore = defineStore({
  id: 'authStore',
  state: () => ({
    user: null,
    reloaded: localStorage.getItem('reloaded') || null,
    role: localStorage.getItem('role') || null,
    token: localStorage.getItem('token') || null,
    message: null,
  }),

  getters: {
    isLoggedIn: (state) => !!state.token,
    getReloaded: (state) => state.reloaded,
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

          this.user = response.data.user;
          this.token = response.data.token;

          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('reloaded', 'false');
          localStorage.setItem('role', this.user.roles[0].name);
          localStorage.setItem('token', this.token);

          resolve(this.user);
        } catch (error) {
          console.error('Error in post register ', error);
          this.message = error.response.data.message;
          reject(this.message);
        }
      });
    },

    fetchRoles() {
      return new Promise(async (resolve, reject) => {
        try {
          const response = await axios.get('/api/roles');

          this.roles = response.data.roles;
          resolve(this.roles);
        } catch (error) {
          console.error('Error in getUsers ', error);
          this.message = error.response.data.message;
          reject(this.message);
        }
      });
    },

    fetchPermissions() {
      return new Promise(async (resolve, reject) => {
        try {
          const response = await axios.get('/api/permissions');

          this.permissions = response.data.permissions;
          resolve(this.permissions);
        } catch (error) {
          console.error('Error in getUsers ', error);
          this.message = error.response.data.message;
          reject(this.message);
        }
      });
    },

    async login(userData) {
      return new Promise(async (resolve, reject) => {
        try {
          await this.fetchCsrfToken();

          const response = await axios.post('/api/login', userData);

          this.user = response.data.user;
          this.token = response.data.token;

          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('reloaded', 'false');
          localStorage.setItem('role', this.user.roles[0].name);
          localStorage.setItem('token', this.token);

          resolve(this.user);
        } catch (error) {
          console.error('Error in post login ', error);
          this.message = error.response.data.message;
          reject(this.message);
        }
      });
    },

    async logout() {
      return new Promise(async (resolve, reject) => {
        try {
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
          this.message = response.data.message;

          this.user = null;
          this.token = null;

          localStorage.removeItem('isLoggedIn');
          localStorage.setItem('reloaded', 'false');
          localStorage.removeItem('role');
          localStorage.removeItem('token');

          resolve(this.message);
        } catch (error) {
          console.error('Error in post logout ', error);
          this.message = error.response.data.message;
          reject(this.message);
        }
      });
    },
  },
});
