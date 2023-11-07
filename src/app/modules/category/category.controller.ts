import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse';
import { CategoryService } from './category.service';

// For creataign new category
const newCategory: RequestHandler = async (req, res, next) => {
  try {
    const result = await CategoryService.post(req.body);
    sendResponse(res, {
      success: true,
      message: 'Category created successfully',
      data: result,
      statusCode: httpStatus.OK,
    });
  } catch (error) {
    next(error);
  }
};

// FOr getAllCategory
const getAll: RequestHandler = async (req, res, next) => {
  try {
    const result = await CategoryService.getAll();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      data: result,
      success: true,
      message: 'Category Featched successfully',
    });
  } catch (error) {
    next(error);
  }
};
export const CategoryController = { newCategory, getAll };
