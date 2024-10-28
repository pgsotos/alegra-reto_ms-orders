import axios from 'axios';

export function createAxiosInstance(url: string) {
  const axiosInstance = axios.create({
    baseURL: url,
    timeout: 10000,
  });
  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      // Puedes manejar el error de manera centralizada aquí
      console.error('API Error:', error);
      return Promise.reject(error);
    }
  );
  return axiosInstance;
}

export default createAxiosInstance;
