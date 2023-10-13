import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { BlogController } from './blog.controller';
import { BlogValidator } from './blog.validator';
const routes = express.Router();
// For creating new blog
routes.post(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  validateRequest(BlogValidator.blogValidator),
  BlogController.postBlog
);

// For getting all the blog
routes.get('/', BlogController.getAllBlog);

export const BlogRoutes = { routes };
