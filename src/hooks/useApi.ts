import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API,
});

export const useApi = () => ({
  getData: async () => {
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
});
