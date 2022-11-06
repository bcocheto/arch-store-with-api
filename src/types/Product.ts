import { Category } from './Category';
import { CreatedBy } from './CreatedBy';

export type Product = {
  id: string;
  category: Category;
  createdAt: string;
  createdBy: CreatedBy;
  description: string;
  image: string;
  price: number;
  slug: string;
  title: string;
  updatedAt: Date;
};
