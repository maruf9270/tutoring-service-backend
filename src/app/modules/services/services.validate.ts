import { z } from 'zod';
import { category } from './services.interface';

const serviceValidator = z.object({
  body: z.object({
    title: z.string({ required_error: 'TItle is required' }),
    description: z.string({ required_error: 'Description is required' }),
    price: z.number({ required_error: 'Price is required' }),
    category: z.enum([...category] as [string, ...string[]], {
      required_error: 'category is required',
    }),
    available: z.string({ required_error: 'Available option is required' }),
    image: z.string({ required_error: 'Image is required' }),
    publish: z.string({ required_error: 'Publish state is required' }),
  }),
});
const updateValidator = z.object({
  body: z.object({
    title: z.string({ required_error: 'TItle is required' }).optional(),
    description: z
      .string({ required_error: 'Description is required' })
      .optional(),
    price: z.number({ required_error: 'Price is required' }).optional(),
    category: z
      .enum([...category] as [string, ...string[]], {
        required_error: 'category is required',
      })
      .optional(),
    availabl: z
      .string({ required_error: 'Available option is required' })
      .optional(),
    Image: z.string({ required_error: 'Image is required' }).optional(),
    publish: z
      .string({ required_error: 'Publish state is required' })
      .optional(),
  }),
});

export const ServiceValidator = { serviceValidator, updateValidator };
