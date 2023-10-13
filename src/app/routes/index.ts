import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.route';
import { ReviewRoutes } from '../modules/review/review.route';
import { ServiceBookingRoutes } from '../modules/serviceBooking/serviceBooking.routs';
import { ServiceRoutes } from '../modules/services/services.route';

const router = express.Router();

const moduleRoutes = [
  // ... routes
  {
    path: '/auth',
    routes: AuthRoutes.routes,
  },
  {
    path: '/services',
    routes: ServiceRoutes.router,
  },
  {
    path: '/reviews',
    routes: ReviewRoutes.routes,
  },
  {
    path: '/bookings',
    routes: ServiceBookingRoutes.routes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.routes));
export default router;
