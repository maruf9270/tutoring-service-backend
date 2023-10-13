import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse';
import { IUser } from '../auth/auth.interface';
import { FeeedbackService } from './feedback.service';

const addNewFeedback: RequestHandler = async (req, res, next) => {
  try {
    const user = req.user;
    const feedback = req.body;
    const result = await FeeedbackService.post(feedback, user as IUser);
    sendResponse(res, {
      success: true,
      data: result,
      statusCode: httpStatus.OK,
      message: 'Feedback successfully posted',
    });
  } catch (error) {
    next(error);
  }
};

// For getting all the feedback
const getFeedback: RequestHandler = async (req, res, next) => {
  try {
    const result = await FeeedbackService.fetchAllFeedback();
    sendResponse(res, {
      success: true,
      data: result,
      statusCode: httpStatus.OK,
      message: 'Feedback successfully fetched',
    });
  } catch (error) {
    next(error);
  }
};

export const FeedbackController = { addNewFeedback, getFeedback };
