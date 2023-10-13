"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewValidator = void 0;
const zod_1 = require("zod");
const reviewValidator = zod_1.z.object({
    body: zod_1.z.object({
        rating: zod_1.z.string({ required_error: 'Rating not provided' }),
        review: zod_1.z.string({ required_error: 'Review not provided' }),
        serviceId: zod_1.z.string({ required_error: 'Service id not provided' }),
    }),
});
const reviewEditValidator = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.string({ required_error: 'User id not provided' }).optional(),
        rating: zod_1.z.string({ required_error: 'Rating not provided' }).optional(),
        review: zod_1.z.string({ required_error: 'Review not provided' }).optional(),
        serviceId: zod_1.z
            .string({ required_error: 'Service id not provided' })
            .optional(),
    }),
});
exports.ReviewValidator = { reviewValidator, reviewEditValidator };
