import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { ReviewController } from './review.controller';
import { ReviewValidator } from './review.validator';
const routes = express.Router();
// For getting all the review
routes.get('/', ReviewController.getAllReviews);
// For creating new review
routes.post(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.USER),
  validateRequest(ReviewValidator.reviewValidator),
  ReviewController.createReview
);

// For getting a specific book review
routes.get('/:id', ReviewController.specifreview);
// For edting  a review

routes.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.USER),
  validateRequest(ReviewValidator.reviewEditValidator),
  ReviewController.editReview
);
// For deleting a review

routes.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.USER),
  ReviewController.removeReview
);

export const ReviewRoutes = { routes };
