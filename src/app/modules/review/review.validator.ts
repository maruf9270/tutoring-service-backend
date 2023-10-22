import { z } from 'zod';

const reviewValidator = z.object({
  body: z.object({
    rating: z.number({ required_error: 'Rating not provided' }),
    review: z.string({ required_error: 'Review not provided' }),
    serviceId: z.string({ required_error: 'Service id not provided' }),
  }),
});
const reviewEditValidator = z.object({
  body: z.object({
    userId: z.string({ required_error: 'User id not provided' }).optional(),
    rating: z.string({ required_error: 'Rating not provided' }).optional(),
    review: z.string({ required_error: 'Review not provided' }).optional(),
    serviceId: z
      .string({ required_error: 'Service id not provided' })
      .optional(),
  }),
});

export const ReviewValidator = { reviewValidator, reviewEditValidator };
