import { defineStore } from 'pinia';
import axios from '@/services/api';

export const useUserStore = defineStore({
  id: 'userStore',
  state: () => ({
    users: null,
    user: null,
    roles: null,
    permissions: null,
    message: null,
  }),

  getters: {
    getUsers: (state) => state.users,
    getUser: (state) => state.user,
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

    fetchUsers() {
      return new Promise(async (resolve, reject) => {
        try {
          const token = localStorage.getItem('token');
          const headers = {
            Authorization: `Bearer ${token}`,
          };

          const response = await axios.get('/api/users', {
            headers,
          });

          this.users = response.data.users;
          resolve(this.users);
        } catch (error) {
          console.error('Error in getUsers ', error);
          this.message = error.response.data.message;
          reject(this.message);
        }
      });
    },

    fetchUserById(id) {
      return new Promise(async (resolve, reject) => {
        try {
          const token = localStorage.getItem('token');
          const headers = {
            Authorization: `Bearer ${token}`,
          };

          const response = await axios.get(`/api/user/${id}`, {
            headers,
          });

          this.user = response.data.user;
          resolve(this.user);
        } catch (error) {
          console.error('Error in getUserById ', error);
          this.message = error.response.data.message;
          reject(this.message);
        }
      });
    },

    deleteUserById(id) {
      return new Promise(async (resolve, reject) => {
        try {
          await this.fetchCsrfToken();

          const token = localStorage.getItem('token');
          const headers = {
            Authorization: `Bearer ${token}`,
          };

          const response = await axios.delete(`/api/user/${id}`, {
            headers,
          });

          // Assuming you want to reset to null after a successful delete.
          this.user = null;
          resolve(response.data.message);
        } catch (error) {
          console.error('Error in deleteUserById ', error);
          this.message = error.response.data.message;
          reject(this.message);
        }
      });
    },
  },
});
