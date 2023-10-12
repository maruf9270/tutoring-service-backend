import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse';
import { AuthServices } from './auth.services';

// For creating new user
const createNewUser: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    const data = req.body;
    const result = await AuthServices.postUser(data);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Account Created successfuly',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// For logging in
const loginUsr: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    const result = await AuthServices.login(req.body);
    res.cookie('user', result.refreashToken, {
      httpOnly: false,
      secure: false,
    });

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Logged in successfully',
      data: {
        accessToken: result.accessToken,
      },
    });
  } catch (error) {
    next(error);
  }
};
export const AuthController = { createNewUser, loginUsr };
