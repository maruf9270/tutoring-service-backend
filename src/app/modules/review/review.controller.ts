import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse';
import { IUser } from '../auth/auth.interface';
import { ReviewService } from './review.service';

// For getting all the reviews

const getAllReviews: RequestHandler = async (req, res, next) => {
  try {
    const reviews = await ReviewService.reviews();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      data: reviews,
      message: 'Reviews successfully fatched',
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

// For creatin new review
const createReview: RequestHandler = async (req, res, next) => {
  try {
    const review = req.body;
    const user = req.user;
    const result = await ReviewService.postReview(review, user as IUser);
    sendResponse(res, {
      message: 'review successfully created',
      statusCode: httpStatus.OK,
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const editReview: RequestHandler = async (req, res, next) => {
  try {
    const review = req.body;
    const user = req.user;
    const id = req.params.id;
    const result = await ReviewService.patchReview(review, user as IUser, id);
    sendResponse(res, {
      success: true,
      data: result,
      statusCode: httpStatus.OK,
      message: 'review successfully updated',
    });
  } catch (error) {
    next(error);
  }
};
// For deleteReview
const removeReview: RequestHandler = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = req.user;
    const result = await ReviewService.deleteReview(id, user as IUser);
    sendResponse(res, {
      success: true,
      data: result,
      statusCode: httpStatus.OK,
      message: 'Review deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
// For getting a specific service review
const specifreview: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    const id = req.params.id;
    console.log(id);
    const result = await ReviewService.fetchReview(id);
    sendResponse(res, {
      success: true,
      data: result,
      message: 'Review fetched successfully',
      statusCode: httpStatus.OK,
    });
  } catch (error) {
    next(error);
  }
};

export const ReviewController = {
  createReview,
  editReview,
  removeReview,
  getAllReviews,
  specifreview,
};
