import { useEffect, useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { ItemsService } from '~/services/api/items/ItemsService';
import { Category } from '~/types/Category';
import { Product } from '~/types/Product';

const items = ItemsService;

export const useApi = () => {
  const location = useLocation();
  const path = location.pathname.replace('/', '');
  const [data, setData] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    createCategories();
  }, []);

  useEffect(() => {
    const setPath = async () => {
      setIsLoading(true);
      const allItems = await items.getAll();
      if (allItems instanceof Error) return;
      if (path === '') {
        setData(allItems);
        setIsLoading(false);
      }
      if (path !== '') {
        const itemsFiltered = allItems?.filter((item: Product) => item.category.slug === path);
        setData(itemsFiltered);
        setIsLoading(false);
      }
    };
    setPath();
  }, [path]);

  const createCategories = async () => {
    try {
      setIsLoading(true);
      const allItems = await items.getAll();
      if (allItems instanceof Error) return;
      const categories = allItems?.map((item: Product) => item.category);
      const uniqueIds: string[] = [];
      const uniqueCategories = categories?.filter((element: Category) => {
        const isDuplicate = uniqueIds.includes(element.id);
        if (!isDuplicate) {
          uniqueIds.push(element.id);
          return true;
        }
        return false;
      });
      setCategories(uniqueCategories);
      setIsLoading(false);
    } catch (error) {
      return;
    }
  };

  const deleteItem = useCallback(
    (itemId: string) => async () => {
      try {
        setIsLoading(true);
        const data = await items.deleteById(itemId);
        setIsLoading(false);
      } catch (error) {
        return false;
      }
    },
    [],
  );

  const addItem = useCallback(async (item: Product) => {
    try {
      setIsLoading(true);
      const data = await items.create(item);
      setIsLoading(false);
    } catch (error) {
      return;
    }
  }, []);

  const editItem = useCallback((newItem: Product) => {
    try {
      setIsLoading(true);
      items.updateById(newItem.id, newItem);
      setIsLoading(false);
    } catch (error) {
      return;
    }
  }, []);

  return { data, isLoading, categories, deleteItem, editItem, addItem };
};
