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
  const [isLoading, setIsLoading] = useState(false);
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
    const allItems = await items.getAll();
    if (allItems instanceof Error) return;

    console.log(allItems);

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
  };

  const deleteItem = useCallback(
    (itemId: string) => () => {
      items.deleteById(itemId);
    },
    [],
  );

  const addItem = useCallback((item: Product) => {
    items.create(item);
    console.log('create', item);
  }, []);

  const editItem = useCallback((newItem: Product) => {
    console.log('edit', newItem);
    items.updateById(newItem.id, newItem);
  }, []);

  return { data, isLoading, categories, deleteItem, editItem, addItem };
};
