import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { ServiceController } from './services.controller';
import { ServiceValidator } from './services.validate';
const router = express.Router();

// For getting all the services available
router.get('/', ServiceController.getServices);
// For creataign new services
router.post(
  '/',
  validateRequest(ServiceValidator.serviceValidator),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  ServiceController.createNewService
);
// For updaing the service
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  validateRequest(ServiceValidator.updateValidator),
  ServiceController.updateService
);
// For deleting the service
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  ServiceController.deleteService
);

export const ServiceRoutes = { router };
