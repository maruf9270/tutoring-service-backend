import { z } from 'zod';

const authValidator = z.object({
  body: z.object({
    name: z.object({
      firstName: z.string({ required_error: 'First Name is required' }),
      middleName: z.string().optional(),
      lastName: z.string({ required_error: 'Last name is required' }),
    }),
    role: z.enum(['super_admin', 'admin', 'user'], {
      required_error: 'Role is required',
    }),
    email: z
      .string({ required_error: 'Email is required' })
      .email({ message: 'Provide a valid email' }),
    phone: z
      .string({ required_error: 'Email is required' })
      .min(11, { message: 'Provide a valid mobile number' })
      .max(15, { message: 'Provide a valid mobile number' }),
    address: z.string({ required_error: 'Address is required' }),
    profileImage: z.string({
      required_error: 'Profile image link is required',
    }),
    password: z
      .string({ required_error: 'Password is required' })
      .min(6, { message: 'Password must be at least 6 charecter' })
      .max(32, { message: 'Password cannot be more then 32 charecter' }),
  }),
});

const loginVlaidator = z.object({
  body: z.object({
    email: z
      .string({ required_error: 'Email is required' })
      .email({ message: 'Invalid email ' }),
    password: z.string({ required_error: 'Password is required' }),
  }),
});
const patchValidator = z.object({
  body: z.object({
    name: z
      .object({
        firstName: z.string().optional(),
        middleName: z.string().optional(),
        lastName: z.string().optional(),
      })
      .optional(),
    role: z
      .enum(['super_admin', 'admin', 'user'], {
        required_error: 'Role is required',
      })
      .optional(),
    email: z
      .string({ required_error: 'Email is required' })
      .email({ message: 'Provide a valid email' })
      .optional(),
    phone: z
      .string({ required_error: 'Email is required' })
      .min(11, { message: 'Provide a valid mobile number' })
      .max(15, { message: 'Provide a valid mobile number' })
      .optional(),
    address: z.string({ required_error: 'Address is required' }).optional(),
    profileImage: z
      .string({
        required_error: 'Profile image link is required',
      })
      .optional(),
    password: z
      .string({ required_error: 'Password is required' })
      .min(6, { message: 'Password must be at least 6 charecter' })
      .max(32, { message: 'Password cannot be more then 32 charecter' })
      .optional(),
  }),
});
export const AuthValidator = { authValidator, loginVlaidator, patchValidator };
