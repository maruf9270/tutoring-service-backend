import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { FeedbackController } from './feedback.controller';
import { FeedbackValidator } from './feedback.validator';
const routes = express.Router();
// For postign new feedback
routes.post(
  '/',
  validateRequest(FeedbackValidator.feedbackValidator),
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.USER),
  FeedbackController.addNewFeedback
);

// For getting all the feedback
routes.get(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  FeedbackController.getFeedback
);
export const FeedBackRoutes = { routes };
