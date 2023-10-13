import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse';
import { BlogService } from './blog.service';

// For creating new Blog
const postBlog: RequestHandler = async (req, res, next) => {
  try {
    const result = await BlogService.post(req.body);
    sendResponse(res, {
      success: true,
      message: 'Blog created successfully',
      data: result,
      statusCode: httpStatus.OK,
    });
  } catch (error) {
    next(error);
  }
};

// For getting all blog posts

const getAllBlog: RequestHandler = async (req, res, next) => {
  try {
    const result = await BlogService.getAll();
    sendResponse(res, {
      success: true,
      message: 'Blog fetched successfully',
      data: result,
      statusCode: httpStatus.OK,
    });
  } catch (error) {
    next(error);
  }
};
export const BlogController = {
  postBlog,
  getAllBlog,
};
