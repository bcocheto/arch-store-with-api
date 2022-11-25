import { Product } from '~/types/Product';
import { Api } from '../axios-config';

type ItemsTotalCount = {
  data: Product[];
  totalCount: number;
};

const getAll = async (): Promise<Product[] | Error> => {
  try {
    const { data } = await Api.get('/items');

    if (data) {
      return data;
    }
    return new Error('Erro ao listar os registros.');
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao listar os registros.');
  }
};

const filterAll = async (page = 1, filter = '', id = ''): Promise<ItemsTotalCount | Error> => {
  try {
    const urlRelativa = `/items?_page=${page}&_limit=10&nome_like=${filter}&id_like=${id}`;

    const { data, headers } = await Api.get(urlRelativa);

    if (data) {
      return {
        data,
        totalCount: Number(headers['x-total-count']),
      };
    }

    return new Error('Erro ao listar os registros.');
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao listar os registros.');
  }
};

const getById = async (id: string): Promise<Product | Error> => {
  try {
    const { data } = await Api.get(`/items/${id}`);

    if (data) {
      return data;
    }

    return new Error('Erro ao consultar o registro.');
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao consultar o registro.');
  }
};

const create = async (item: Omit<Product, 'id'>): Promise<number | Error> => {
  try {
    const { data } = await Api.post<Product>('/items', item);

    if (data) {
      return Number(data.id);
    }

    return new Error('Erro ao criar o registro.');
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao criar o registro.');
  }
};

const updateById = async (id: string, item: Product): Promise<void | Error> => {
  try {
    await Api.put(`/items/${id}`, item);
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao atualizar o registro.');
  }
};

const deleteById = async (id: string): Promise<void | Error> => {
  try {
    await Api.delete(`/items/${id}`);
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao apagar o registro.');
  }
};

export const ItemsService = {
  getAll,
  filterAll,
  create,
  getById,
  updateById,
  deleteById,
};
