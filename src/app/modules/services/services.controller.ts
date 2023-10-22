import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import {
  serviceFilterableField,
  serviceFilterableFields,
} from './services.interface';
import { ServicesService, paginationOption } from './services.service';

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
    console.log(req.params);
    const filterableFIelds = pick(req.query, serviceFilterableFields);
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
    const result = await ServicesService.getAllServices(
      filterableFIelds as serviceFilterableField,
      options as unknown as paginationOption
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
