import axios from 'axios';
import storageItems from '~/data/items.json';

const api = axios.create({
  baseURL: import.meta.env.VITE_API,
});

export const useApi = () => ({
  getProducts: async () => {
    return storageItems;
    // try {
    //   const {
    //     data: { data },
    //   } = await api.get('/products');
    //   console.log(data);
    //   return data;
    // } catch (error) {
    //   console.log('Erro ao solicitar dados: ', error);
    // }
  },
  getCategories: async () => {
    const categories = storageItems.map((item) => item.category);
    return categories;
    // try {
    //   const {
    //     data: { data },
    //   } = await api.get('/products');
    //   const categories = data.map((item: Product) => item.category);
    //   return categories;
    // } catch (error) {
    //   console.log('Erro ao solicitar dados: ', error);
    // }
  },
});
