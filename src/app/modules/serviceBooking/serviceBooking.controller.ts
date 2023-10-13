import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse';
import { IUser } from '../auth/auth.interface';
import { ServiceBookingService } from './serviceBooking.service';

// For booking for new service
const bookservice: RequestHandler = async (req, res, next) => {
  try {
    const user = req.user;
    const result = await ServiceBookingService.bookService(
      req.body,
      user as IUser
    );
    sendResponse(res, {
      success: true,
      data: result,
      statusCode: httpStatus.OK,
      message: 'Booking conpleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
const cancelBooking: RequestHandler = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = req.user;
    const result = await ServiceBookingService.cancelBooking(id, user as IUser);
    sendResponse(res, {
      success: true,
      data: result,
      statusCode: httpStatus.OK,
      message: 'Booking cancelled successfully',
    });
  } catch (error) {
    next(error);
  }
};

// For changing booking status

const patchStatus: RequestHandler = async (req, res, next) => {
  try {
    const id = req.params.id;
    console.log(id);
    const status = req.body.status;
    const result = await ServiceBookingService.patchStatus({
      id,
      status,
    });
    sendResponse(res, {
      success: true,
      data: result,
      statusCode: httpStatus.OK,
      message: 'Booking status changed successfully',
    });
  } catch (error) {
    next(error);
  }
};

// For getting bookings
const getBookings: RequestHandler = async (req, res, next) => {
  try {
    const user = req.user;
    const result = await ServiceBookingService.getBookings(user as IUser);
    sendResponse(res, {
      success: true,
      data: result,
      statusCode: httpStatus.OK,
      message: 'Bookings data retrieved successfully',
    });
  } catch (error) {
    next(error);
  }
};
export const ServiceBookingController = {
  bookservice,
  cancelBooking,
  patchStatus,
  getBookings,
};
