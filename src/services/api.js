import axios from 'axios';
import router from '../router';

const instance = axios.create({
  baseURL: 'http://localhost:8000',
  timeout: 5000,
  withCredentials: true,
  withXSRFToken: true,
    headers: {
        Accept: 'application/json'
    }
});

// Meng-handle error global
instance.interceptors.response.use(
  (response) => response,
  (error) => {
      if (error.response && (error.response.status === 401 || error.response.status === 419)) {
          localStorage.removeItem('isLoggedIn');
          localStorage.removeItem('reload');
          localStorage.removeItem('role');
          localStorage.removeItem('token');

          router.push({ name: 'login' });
      }
      return Promise.reject(error);
  }
);

export default instance;
