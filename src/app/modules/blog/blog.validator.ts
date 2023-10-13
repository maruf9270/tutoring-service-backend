import { z } from 'zod';

const blogValidator = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title is required' }).min(3).max(255),
    description: z.string({ required_error: 'Description is required' }),
    image: z.string({ required_error: 'Image is required' }).min(3).max(255),
  }),
});

export const BlogValidator = { blogValidator };
