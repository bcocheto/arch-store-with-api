import axios from 'axios';
import { errorInterceptor } from './interceptors/ErrorInterceptor';
import { responseInterceptor } from './interceptors/ResponseInterceptor';

const Api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

Api.interceptors.response.use(
  (response) => responseInterceptor(response),
  (error) => errorInterceptor(error),
);

export { Api };
