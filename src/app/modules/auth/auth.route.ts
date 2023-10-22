import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { AuthController } from './auth.controller';
import { AuthValidator } from './auth.validator';
const routes = express.Router();
// For gettng all the users
routes.get(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  AuthController.gethUsers
);
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
// For getting profofile
routes.get(
  '/profile',
  auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  AuthController.getProfile
);
// For getting single
routes.get(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  AuthController.getById
);
// For updaing user
routes.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.USER),
  validateRequest(AuthValidator.patchValidator),
  AuthController.updateUinfo
);
// for deleting user
routes.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  AuthController.removeuser
);
export const AuthRoutes = { routes };
