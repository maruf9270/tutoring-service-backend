import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.route';

const router = express.Router();

const moduleRoutes = [
  // ... routes
  {
    path: '/auth',
    routes: AuthRoutes.routes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.routes));
export default router;
