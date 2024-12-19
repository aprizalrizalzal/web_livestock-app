import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://127.0.0.1:8000',
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
          // localStorage.removeItem('session');
          localStorage.removeItem('reload');
          localStorage.removeItem('role');
          localStorage.removeItem('token');

          router.push({ name: 'login' });
      }
      return Promise.reject(error);
  }
);

export default instance;
