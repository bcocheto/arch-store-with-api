import { Category } from './Category';

export type Product = {
  id: string;
  category: Category;
  description: string;
  image: string;
  price: number;
  slug: string;
  title: string;
};
