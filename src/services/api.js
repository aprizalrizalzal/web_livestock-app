import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://backend.example.com',
  timeout: 5000,
  withCredentials: true,
});

export default instance;
