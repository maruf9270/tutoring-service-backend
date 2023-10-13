import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse';
import { FaqService } from './faq.service';

// for creating new faq
const postFaq: RequestHandler = async (req, res, next) => {
  try {
    const result = await FaqService.post(req.body);
    sendResponse(res, {
      success: true,
      message: 'Faq created successfully',
      statusCode: httpStatus.OK,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// for getting all faqs

const getAllFaq: RequestHandler = async (req, res, next) => {
  try {
    const result = await FaqService.getAll();
    sendResponse(res, {
      success: true,
      message: 'Faq fetched successfully',
      statusCode: httpStatus.OK,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const FaqController = { postFaq, getAllFaq };
