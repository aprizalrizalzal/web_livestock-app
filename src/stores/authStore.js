import { defineStore } from 'pinia';
import axios from '@/services/api';

export const useAuthStore = defineStore({
  id: 'authStore',
  state: () => ({
    user: null,
    reloaded: localStorage.getItem('reloaded') || null,
    role: localStorage.getItem('role') || null,
    token: localStorage.getItem('token') || null,
    loading: false,
    error: null,
  }),

  getters: {
    isLoggedIn: (state) => !!state.token,
    getReloaded: (state) => state.reloaded,
    getRole: (state) => state.role,
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
        this.loading = true;
        this.error = null;

        try {
          await this.fetchCsrfToken();

          const response = await axios.post('/api/register', userData);

          this.user = response.data.user;
          this.token = response.data.token;

          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('reloaded', 'false');
          localStorage.setItem('role', this.user.roles[0].name);
          localStorage.setItem('token', this.token);

          this.loading = false;
          resolve(this.user);
        } catch (error) {
          this.loading = false
          this.error = error.response.data.message;
          reject(this.error);
        }
      });
    },

    fetchRoles() {
      return new Promise(async (resolve, reject) => {
        this.error = null;
        try {
          const response = await axios.get('/api/roles');

          this.roles = response.data.roles;
          resolve(this.roles);
        } catch (error) {
          this.error = error.response.data.message;
          reject(this.error);
        }
      });
    },

    fetchPermissions() {
      return new Promise(async (resolve, reject) => {
        this.error = null;
        try {
          const response = await axios.get('/api/permissions');

          this.permissions = response.data.permissions;
          resolve(this.permissions);
        } catch (error) {
          this.error = error.response.data.message;
          reject(this.error);
        }
      });
    },

    async login(userData) {
      return new Promise(async (resolve, reject) => {
        this.loading = true;
        this.error = null;
       
        try {
          await this.fetchCsrfToken();

          const response = await axios.post('/api/login', userData);

          this.user = response.data.user;
          this.token = response.data.token;

          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('reloaded', 'false');
          localStorage.setItem('role', this.user.roles[0].name);
          localStorage.setItem('token', this.token);

          this.loading = false;
          resolve(this.user);
        } catch (error) {
          this.loading = false
          this.error = error.response.data.message;
          reject(this.error);
        }
      });
    },

    async logout() {
      return new Promise(async (resolve, reject) => {
        this.loading = true;
        this.error = null;
        
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
          this.error = response.data.message;

          this.user = null;
          this.token = null;

          localStorage.removeItem('isLoggedIn');
          localStorage.setItem('reloaded', 'false');
          localStorage.removeItem('role');
          localStorage.removeItem('token');

          this.loading = false;
          resolve(this.error);
        } catch (error) {
          this.loading = false;
          this.error = error.response.data.message;
          reject(this.error);
        }
      });
    },
  },
});
