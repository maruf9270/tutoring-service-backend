import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { ServiceBookingController } from './serviceBooking.controller';
import { BookingValidator } from './serviceBooking.validator';
const routes = express.Router();
// For getting bookings
routes.get(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.USER),
  ServiceBookingController.getBookings
);
// For booking a new service
routes.post(
  '/',
  validateRequest(BookingValidator.bookingValidator),
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.USER),
  ServiceBookingController.bookservice
);
// For getting available Slots
routes.post(
  '/slots',

  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.USER),
  ServiceBookingController.availabe
);
// For cancelling a booking
routes.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.USER),
  ServiceBookingController.cancelBooking
);
// For changing booking status
routes.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.USER),
  ServiceBookingController.patchStatus
);

export const ServiceBookingRoutes = { routes };
