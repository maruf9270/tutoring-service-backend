import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { paginationOptions } from './service.constant';
import {
  paginationOption,
  serviceFilterableField,
  serviceFilterableFields,
} from './services.interface';
import { ServicesService } from './services.service';

// For creataign new services
const createNewService: RequestHandler = async (
  req,
  res,
  next
): Promise<void> => {
  try {
    const result = await ServicesService.postService(req.body);
    sendResponse(res, {
      success: true,
      message: 'Service created successfully',
      statusCode: httpStatus.OK,
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

// For updaing services
const updateService: RequestHandler = async (req, res, next) => {
  try {
    const result = await ServicesService.patchService(req.body, req.params.id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      data: result,
      message: 'Service updated successfully',
      success: true,
    });
  } catch (err) {
    next(err);
  }
};

// controller for delete service
const deleteService: RequestHandler = async (req, res, next) => {
  try {
    const result = await ServicesService.deleteService(req.params.id);
    sendResponse(res, {
      data: result,
      message: 'Service deleted successfully',
      success: true,
      statusCode: httpStatus.OK,
    });
  } catch (err) {
    next(err);
  }
};

//for getting services
const getServices: RequestHandler = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    let user = undefined;
    if (token) {
      user = jwtHelpers.verifyToken(
        token as string,
        config.jwt.secret as Secret
      );
    }

    const filterableFIelds = pick(req.query, serviceFilterableFields);
    const options = pick(req.query, paginationOptions);
    const result = await ServicesService.getAllServices(
      filterableFIelds as serviceFilterableField,
      options as unknown as paginationOption,
      user as never
    );
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      data: result,
      message: 'Services retrieved successfully',
    });
  } catch (error) {
    next(error);
  }
};

// For getting single services

const getSingleService: RequestHandler = async (req, res, next) => {
  try {
    const result = await ServicesService.getSingleService(req.params.id);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      data: result,
      message: 'Services retrieved successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const ServiceController = {
  createNewService,
  updateService,
  deleteService,
  getServices,
  getSingleService,
};
