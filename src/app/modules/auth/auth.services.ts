import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import jwt, { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { InvertToUppercast } from '../../../helpers/emailCapitalLetter';
import { IAuth, ILogin, ITokens } from './auth.interface';
import { Auth } from './auth.schema';

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
export const AuthServices = { postUser, login };
