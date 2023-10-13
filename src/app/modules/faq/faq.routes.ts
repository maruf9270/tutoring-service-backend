import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { FaqController } from './faq.controller';
const routes = express.Router();
// For creating new faq
routes.post(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  FaqController.postFaq
);

// For getting all faqs
routes.get('/', FaqController.getAllFaq);
export const FaqRoutes = { routes };
