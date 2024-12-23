import { defineStore } from 'pinia';
import axios from '@/services/api';

export const useTransactionStore = defineStore('transactionStore', {
  state: () => ({
    transactions: null,
    transaction: null,
    loading: false,
    error: null,
  }),

  getters: {
    getTransactions: (state) => state.transactions,
    getTransaction: (state) => state.transaction,
    
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
        this.error = null;
        try {
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
          this.error = error.response.data.message;
          reject(this.error);
        }
      });
    },

    postTransactionByIdLivestok(livestockId) {
      return new Promise(async (resolve, reject) => {
        this.loading = true;
        this.error = null;
        
        try {
          await this.fetchCsrfToken();

          const token = localStorage.getItem('token');
          const headers = {
            Authorization: `Bearer ${token}`,
          };

          const response = await axios.post(`/api/transaction/${livestockId}`, null, {
            headers,
          });

          this.loading = false;
          this.transaction = response.data.transaction;
          resolve(this.transaction);
        } catch (error) {
          this.loading = false;
          this.error = error.response.data.message;
          reject(this.error);
        }
      });
    },

    fetchTransactionById(id) {
      return new Promise(async (resolve, reject) => {
        this.error = null;
        try {
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
          this.error = error.response.data.message;
          reject(this.error);
        }
      });
    },

    putTransactionById(id, transactionData) {
      return new Promise(async (resolve, reject) => {
        this.loading = true;
        this.error = null;
        
        try {
          await this.fetchCsrfToken();

          const token = localStorage.getItem('token');
          const headers = {
            Authorization: `Bearer ${token}`,
          };

          const response = await axios.put(`/api/transaction/${id}`, transactionData, {
            headers,
          });

          this.loading = false;
          this.transaction = response.data.transaction;
          resolve(this.transaction);
        } catch (error) {
          this.loading = false;
          this.error = error.response.data.message;
          reject(this.error);
        }
      });
    },

    deleteTransactionById(id) {
      return new Promise(async (resolve, reject) => {
        this.loading = true;
        this.error = null;
        
        try {
          await this.fetchCsrfToken();

          const token = localStorage.getItem('token');
          const headers = {
            Authorization: `Bearer ${token}`,
          };

          const response = await axios.delete(`/api/transaction/${id}`, {
            headers,
          });

          this.loading = false;
          this.transaction = null;
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
