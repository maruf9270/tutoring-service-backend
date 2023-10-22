import express from 'express';
import { ENUM_USER_ROLE } from '../../enums/user';
import auth from '../middlewares/auth';
import { CategoryController } from './category.controller';
const routes = express.Router();
// FOr new category
routes.post(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  CategoryController.newCategory
);

// FOr all

routes.get('/', CategoryController.getAll);
export const CategoryRoutes = { routes };
