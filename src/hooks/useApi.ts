import { useEffect, useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import storageItems from '~/data/items.json';
import { Product } from '~/types/Product';

const MOCK_LOADING_TIME_IN_MS = 500;

const createCategories = () => {
  const categories = storageItems.map((item) => item.category);
  const uniqueIds: string[] = [];
  const uniqueCategories = categories.filter((element) => {
    const isDuplicate = uniqueIds.includes(element.id);
    if (!isDuplicate) {
      uniqueIds.push(element.id);
      return true;
    }
    return false;
  });
  return uniqueCategories;
};

export const useApi = () => {
  const location = useLocation();
  const path = location.pathname.replace('/', '');
  const [data, setData] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const categories = createCategories();

  useEffect(() => {
    console.log('path', path);
    if (path === '') {
      setIsLoading(true);
      setTimeout(() => {
        setData(storageItems);
        setIsLoading(false);
      }, MOCK_LOADING_TIME_IN_MS);
    }
    if (path !== '') {
      setIsLoading(true);
      setTimeout(() => {
        const storageItemsFiltered = storageItems.filter((item) => item.category.slug === path);
        setData(storageItemsFiltered);
        setIsLoading(false);
      }, MOCK_LOADING_TIME_IN_MS);
    }
  }, [path]);

  const deleteItem = useCallback(
    (itemId: string) => () => {
      const newData = data.filter((item) => item.id !== itemId);
      setData([...newData]);
    },
    [data],
  );

  const editItem = useCallback(
    (newItem: Product) => {
      const newData = data.map((item) => {
        if (item.id === newItem.id) {
          return {
            ...item,
            ...newItem,
          };
        }
        return item;
      });
      setData(newData);
    },
    [data],
  );

  return { data, isLoading, categories, deleteItem, editItem };
};
