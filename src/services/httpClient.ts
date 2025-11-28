import axios from 'axios';
import { API_CONFIG } from './config';

// 创建axios实例
const httpClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: 30000,
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_CONFIG.API_KEY}`,
  },
});

httpClient.interceptors.request.use(
  config => {
    console.log('request', config);
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

httpClient.interceptors.response.use(
  response => {
    console.log('response', response);
    return response;
  },
  error => {
    return Promise.reject(error);
  },
);

export default httpClient;
