import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse';
import { IUser } from './auth.interface';
import { AuthServices } from './auth.services';

// For getting all user

const gethUsers: RequestHandler = async (req, res, next) => {
  try {
    const users = await AuthServices.fetchUsers();
    sendResponse(res, {
      data: users,
      statusCode: httpStatus.OK,
      success: true,
      message: 'Users featched successfully',
    });
  } catch (error) {
    next(error);
  }
};

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
// For updaing
const updateUinfo: RequestHandler = async (req, res, next) => {
  try {
    const uidr = req.params.id;
    const data = req.body;
    const result = await AuthServices.patchUser(data, uidr);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      message: 'User updated successfully',
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
// FOr removing tuser
const removeuser: RequestHandler = async (req, res, next) => {
  try {
    const uinfo = req.user;
    const uidr = req.params.id;

    const result = await AuthServices.deleteUser(uidr, uinfo as IUser);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      message: 'User deleted successfully',
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// For geting profile information

const getProfile: RequestHandler = async (req, res, next) => {
  try {
    const result = await AuthServices.getProfile(req.user as IUser);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Profile fetched successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// For gettinga a single bu id
const getById: RequestHandler = async (req, res, next) => {
  try {
    const user = {
      id: req.params.id,
    };
    const result = await AuthServices.getProfile(user);
    sendResponse(res, {
      data: result,
      statusCode: httpStatus.OK,
      success: true,
      message: '',
    });
  } catch (error) {
    next(error);
  }
};
export const AuthController = {
  createNewUser,
  loginUsr,
  updateUinfo,
  removeuser,
  gethUsers,
  getProfile,
  getById,
};
