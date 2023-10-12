import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AuthController } from './auth.controller';
import { AuthValidator } from './auth.validator';
const routes = express.Router();
// For Creating new user
routes.post(
  '/register',
  validateRequest(AuthValidator.authValidator),
  AuthController.createNewUser
);

// For loggin in
routes.post(
  '/login',
  validateRequest(AuthValidator.loginVlaidator),
  AuthController.loginUsr
);
export const AuthRoutes = { routes };
