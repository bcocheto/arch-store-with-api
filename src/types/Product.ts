import { Category } from './Category';
import { CreatedBy } from './CreatedBy';

export type Product = {
  _id: string;
  category: Category;
  createdAt: Date;
  createdBy: CreatedBy;
  description: string;
  image: string;
  price: number;
  slug: string;
  title: string;
  updatedAt: Date;
};
