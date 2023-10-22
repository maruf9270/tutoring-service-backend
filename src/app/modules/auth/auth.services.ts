import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import jwt, { Secret } from 'jsonwebtoken';
import { UpdateWriteOpResult } from 'mongoose';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { InvertToUppercast } from '../../../helpers/emailCapitalLetter';
import { IAuth, ILogin, ITokens, IUser } from './auth.interface';
import { Auth } from './auth.schema';

// For getting all the users
const fetchUsers = async (): Promise<IAuth[]> => {
  const result = await Auth.find();
  return result;
};

// For creating new user
const postUser = async (params: IAuth): Promise<IAuth> => {
  const result = await Auth.create(params);
  return result;
};

// For logging in
const login = async (params: ILogin): Promise<ITokens> => {
  const email = InvertToUppercast(params.email);
  const isUserExists = await Auth.findOne({ email: email });
  if (!isUserExists) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid Login Informaiton');
  }
  const isPasswordmatched = await bcrypt.compare(
    params.password,
    isUserExists.password
  );
  if (!isPasswordmatched) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid Login Informaiton');
  }
  const accessToken = jwt.sign(
    { id: isUserExists._id, role: isUserExists.role },
    config.jwt.secret as Secret,
    { expiresIn: config.jwt.expires_in }
  );
  const refreashToken = jwt.sign(
    { id: isUserExists._id, role: isUserExists.role },
    config.jwt.refresh_secret as Secret,
    { expiresIn: config.jwt.refresh_expires_in }
  );
  return {
    refreashToken: refreashToken,
    accessToken: accessToken,
  };
};
// For updaing the user
export const patchUser = async (
  params: Partial<IAuth>,
  uidr: string
): Promise<UpdateWriteOpResult> => {
  const isUserExists = await Auth.findById(uidr);
  if (!isUserExists) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  // if (
  //   isUinfoReal?._id !== isUserExists?._id ||
  //   isUinfoReal?.role !== 'super_admin'
  // ) {
  //   if (isUinfoReal?.role !== 'admin') {
  //     throw new ApiError(
  //       httpStatus.UNAUTHORIZED,
  //       'YOu are not authorized to to the action'
  //     );
  //   }
  // }
  const result = await Auth.updateOne({ _id: uidr }, params);
  return result;
};
// for deleting user
const deleteUser = async (params: string, user: IUser) => {
  const isUserAuthorized = await Auth.findOne({
    _id: user.id,
    role: user.role,
  });
  if (!isUserAuthorized || isUserAuthorized.role !== 'admin') {
    if (isUserAuthorized?.role !== 'super_admin') {
      throw new ApiError(
        httpStatus.UNAUTHORIZED,
        'YOu are not authorized to do the action'
      );
    }
  }
  const result = await Auth.deleteOne({ _id: params });
  return result;
};

// For getting profile information

const getProfile = async (user: Partial<IUser>): Promise<IAuth | null> => {
  const result = await Auth.findById(user.id).select({ password: false });
  return result;
};

// By is

export const AuthServices = {
  postUser,
  login,
  patchUser,
  deleteUser,
  fetchUsers,
  getProfile,
};
