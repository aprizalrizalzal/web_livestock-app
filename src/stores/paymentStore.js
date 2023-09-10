import { defineStore } from 'pinia';
import axios from '@/services/api';

export const usePaymentStore = defineStore('paymentStore', {
  state: () => ({
    payments: null,
    payment: null,
    message: null,
  }),

  getters: {
    getPayments: (state) => state.payments,
    getPayment: (state) => state.payment,
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

    fetchPayments() {
      return new Promise(async (resolve, reject) => {
        try {
          await this.fetchCsrfToken();

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
          console.error('Error in getPayment ', error);
          this.message = error.response.data.message;
          reject(this.message);
        }
      });
    },

    postPaymentByIdTransaction(transactionId) {
      return new Promise(async (resolve, reject) => {
        try {
          await this.fetchCsrfToken();

          const token = localStorage.getItem('token');
          const headers = {
            Authorization: `Bearer ${token}`,
          };

          const response = await axios.post(`/api/payment/${transactionId}`, null, {
            headers,
          });

          this.payment = response.data.payment;
          resolve(this.payment);
        } catch (error) {
          console.error('Error in postPayment ', error);
          this.message = error.response.data.message;
          reject(this.message);
        }
      });
    },

    fetchPaymentById(id) {
      return new Promise(async (resolve, reject) => {
        try {
          await this.fetchCsrfToken();

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
          console.error('Error in getPaymentById ', error);
          this.message = error.response.data.message;
          reject(this.message);
        }
      });
    },

    putPaymentById(id, paymentData) {
      return new Promise(async (resolve, reject) => {
        try {
          await this.fetchCsrfToken();

          const token = localStorage.getItem('token');
          const headers = {
            Authorization: `Bearer ${token}`,
          };

          const response = await axios.put(`/api/payment/${id}`, paymentData, {
            headers,
          });

          this.payment = response.data.payment;
          resolve(this.payment);
        } catch (error) {
          console.error('Error in putPaymentById ', error);
          this.message = error.response.data.message;
          reject(this.message);
        }
      });
    },

    deletePaymentById(id) {
      return new Promise(async (resolve, reject) => {
        try {
          await this.fetchCsrfToken();

          const token = localStorage.getItem('token');
          const headers = {
            Authorization: `Bearer ${token}`,
          };

          const response = await axios.delete(`/api/payment/${id}`, {
            headers,
          });

          // Assuming you want to reset to null after a successful delete.
          this.transaction = null;
          resolve(response.data.message);
        } catch (error) {
          console.error('Error in deletePaymentById ', error);
          this.message = error.response.data.message;
          reject(this.message);
        }
      });
    },
  },
});
