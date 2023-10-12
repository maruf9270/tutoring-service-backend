/* eslint-disable @typescript-eslint/no-this-alias */
import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import { Schema, model } from 'mongoose';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { IAuth } from './auth.interface';

const authSchema = new Schema<IAuth>({
  name: {
    firstName: {
      type: String,
      required: true,
    },
    middleName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
  },
  role: {
    type: String,
    required: true,
    enum: ['super_admin', 'admin', 'user'],
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
    minlength: 11,
    maxlength: 14,
  },
  address: {
    type: String,
    required: true,
  },
  profileImage: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 32,
  },
});

authSchema.pre('save', async function (next) {
  const upperCasedEmail =
    this.email.charAt(0).toUpperCase() + this.email.slice(1).toLowerCase();
  const isUserExists = await Auth.findOne({ email: upperCasedEmail });

  if (isUserExists) {
    throw new ApiError(
      httpStatus.CONFLICT,
      'User already exists by this email.'
    );
  }
  next();
});
authSchema.pre('save', async function (next) {
  const user = this;
  const upperCasedEmail =
    user.email.charAt(0).toUpperCase() + user.email.slice(1).toLowerCase();
  user.email = upperCasedEmail;
  const password = user.password;
  const hashedPassword = await bcrypt.hash(
    password,
    Number(config.bycrypt_salt_rounds)
  );
  user.password = hashedPassword;
  next();
});

export const Auth = model('Auth', authSchema);
