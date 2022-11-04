import axios from 'axios';
import { Product } from '~/types/Product';

const api = axios.create({
  baseURL: import.meta.env.VITE_API,
});

export const useApi = () => ({
  getProducts: async () => {
    try {
      const {
        data: { data },
      } = await api.get('/products');
      console.log(data);
      return data;
    } catch (error) {
      console.log('Erro ao solicitar dados: ', error);
    }
  },
  getCategories: async () => {
    try {
      const {
        data: { data },
      } = await api.get('/products');
      const categories = data.map((item: Product) => item.category);
      return categories;
    } catch (error) {
      console.log('Erro ao solicitar dados: ', error);
    }
  },
});
