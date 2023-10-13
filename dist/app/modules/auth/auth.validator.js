"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidator = void 0;
const zod_1 = require("zod");
const authValidator = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.object({
            firstName: zod_1.z.string({ required_error: 'First Name is required' }),
            middleName: zod_1.z.string().optional(),
            lastName: zod_1.z.string({ required_error: 'Last name is required' }),
        }),
        role: zod_1.z.enum(['super_admin', 'admin', 'user'], {
            required_error: 'Role is required',
        }),
        email: zod_1.z
            .string({ required_error: 'Email is required' })
            .email({ message: 'Provide a valid email' }),
        phone: zod_1.z
            .string({ required_error: 'Email is required' })
            .min(11, { message: 'Provide a valid mobile number' })
            .max(15, { message: 'Provide a valid mobile number' }),
        address: zod_1.z.string({ required_error: 'Address is required' }),
        profileImage: zod_1.z.string({
            required_error: 'Profile image link is required',
        }),
        password: zod_1.z
            .string({ required_error: 'Password is required' })
            .min(6, { message: 'Password must be at least 6 charecter' })
            .max(32, { message: 'Password cannot be more then 32 charecter' }),
    }),
});
const loginVlaidator = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z
            .string({ required_error: 'Email is required' })
            .email({ message: 'Invalid email ' }),
        password: zod_1.z.string({ required_error: 'Password is required' }),
    }),
});
exports.AuthValidator = { authValidator, loginVlaidator };
