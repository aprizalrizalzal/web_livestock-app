import { defineStore } from 'pinia';
import axios from '@/services/api';

export const usePaymentStore = defineStore('paymentStore', {
  state: () => ({
    payments: null,
    payment: null,
    loading: false,
    error: null,
  }),

  getters: {
    getPayments: (state) => state.payments,
    getPayment: (state) => state.payment,
    
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

    fetchPayments() {
      return new Promise(async (resolve, reject) => {
        this.error = null;

        try {
          const token = localStorage.getItem('token');
          const headers = {
            Authorization: `Bearer ${token}`,
          };

          const response = await axios.get('/api/payments', {
            headers,
          });

          this.payments = response.data.payments;
          resolve(this.payments);
        } catch (error) {
          this.error = error.response.data.message;
          reject(this.error);
        }
      });
    },

    postPaymentByIdTransaction(transactionId) {
      return new Promise(async (resolve, reject) => {
        this.loading = true;
        this.error = null;

        try {
          await this.fetchCsrfToken();

          const token = localStorage.getItem('token');
          const headers = {
            Authorization: `Bearer ${token}`,
          };

          const response = await axios.post(`/api/payment/${transactionId}`, null, {
            headers,
          });

          this.loading = false;
          this.payment = response.data.payment;
          resolve(this.payment);
        } catch (error) {
          this.loading = false;
          this.error = error.response.data.message;
          reject(this.error);
        }
      });
    },

    fetchPaymentById(id) {
      return new Promise(async (resolve, reject) => {
        this.error = null;

        try {
          const token = localStorage.getItem('token');
          const headers = {
            Authorization: `Bearer ${token}`,
          };

          const response = await axios.get(`/api/payment/${id}`, {
            headers,
          });

          this.payment = response.data.payment;
          resolve(this.payment);
        } catch (error) {
          this.error = error.response.data.message;
          reject(this.error);
        }
      });
    },

    putPaymentById(id, paymentData) {
      return new Promise(async (resolve, reject) => {
        this.loading = true;
        this.error = null;

        try {
          await this.fetchCsrfToken();

          const token = localStorage.getItem('token');
          const headers = {
            Authorization: `Bearer ${token}`,
          };

          const response = await axios.put(`/api/payment/${id}`, paymentData, {
            headers,
          });

          this.loading = false;
          this.payment = response.data.payment;
          resolve(this.payment);
        } catch (error) {
          this.loading = false;
          this.error = error.response.data.message;
          reject(this.error);
        }
      });
    },

    deletePaymentById(id) {
      return new Promise(async (resolve, reject) => {
        this.loading = true;
        this.error = null;

        try {
          await this.fetchCsrfToken();

          const token = localStorage.getItem('token');
          const headers = {
            Authorization: `Bearer ${token}`,
          };

          const response = await axios.delete(`/api/payment/${id}`, {
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
