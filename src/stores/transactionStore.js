import { defineStore } from 'pinia';
import axios from '@/services/api';

export const useTransactionStore = defineStore('transactionStore', {
  state: () => ({
    transactions: null,
    transaction: null,
    message: null,
  }),

  getters: {
    getTransactions: (state) => state.transactions,
    getTransaction: (state) => state.transaction,
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

    fetchTransactions() {
      return new Promise(async (resolve, reject) => {
        try {
          await this.fetchCsrfToken();

          const token = localStorage.getItem('token');
          const headers = {
            Authorization: `Bearer ${token}`,
          };

          const response = await axios.get('/api/transactions', {
            headers,
          });

          this.transactions = response.data.transactions;
          resolve(this.transactions);
        } catch (error) {
          console.error('Error in getTransaction ', error);
          this.message = error.response.data.message;
          reject(this.message);
        }
      });
    },

    postTransactionByIdLivestok(livestockId) {
      return new Promise(async (resolve, reject) => {
        try {
          await this.fetchCsrfToken();

          const token = localStorage.getItem('token');
          const headers = {
            Authorization: `Bearer ${token}`,
          };

          const response = await axios.post(`/api/transaction/${livestockId}`, null, {
            headers,
          });

          this.transaction = response.data.transaction;
          resolve(this.transaction);
        } catch (error) {
          console.error('Error in postTransaction ', error);
          this.message = error.response.data.message;
          reject(this.message);
        }
      });
    },

    fetchTransactionById(id) {
      return new Promise(async (resolve, reject) => {
        try {
          await this.fetchCsrfToken();

          const token = localStorage.getItem('token');
          const headers = {
            Authorization: `Bearer ${token}`,
          };

          const response = await axios.get(`/api/transaction/${id}`, {
            headers,
          });

          this.transaction = response.data.transaction;
          resolve(this.transaction);
        } catch (error) {
          console.error('Error in getTransactionById ', error);
          this.message = error.response.data.message;
          reject(this.message);
        }
      });
    },

    putTransactionById(id, transactionData) {
      return new Promise(async (resolve, reject) => {
        try {
          await this.fetchCsrfToken();

          const token = localStorage.getItem('token');
          const headers = {
            Authorization: `Bearer ${token}`,
          };

          const response = await axios.put(`/api/transaction/${id}`, transactionData, {
            headers,
          });

          this.transaction = response.data.transaction;
          resolve(this.transaction);
        } catch (error) {
          console.error('Error in putTransactionById ', error);
          this.message = error.response.data.message;
          reject(this.message);
        }
      });
    },

    deleteTransactionById(id) {
      return new Promise(async (resolve, reject) => {
        try {
          await this.fetchCsrfToken();

          const token = localStorage.getItem('token');
          const headers = {
            Authorization: `Bearer ${token}`,
          };

          const response = await axios.delete(`/api/transaction/${id}`, {
            headers,
          });

          // Assuming you want to reset to null after a successful delete.
          this.livestockType = null;
          resolve(response.data.message);
        } catch (error) {
          console.error('Error in deleteTransactionById ', error);
          this.message = error.response.data.message;
          reject(this.message);
        }
      });
    },
  },
});
