import { Icategory } from '../modules/services/services.interface';
import { Category } from './category.model';

// For creating category
const post = async (params: Partial<Icategory>) => {
  const result = await Category.create(params);
  return result;
};

// For geting all the category

const getAll = async () => {
  const result = await Category.find();
  return result;
};

export const CategoryService = { post, getAll };
