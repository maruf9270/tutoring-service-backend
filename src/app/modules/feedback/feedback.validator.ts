import { z } from 'zod';

const feedbackValidator = z.object({
  body: z.object({
    topic: z.string({ required_error: 'Topic is required' }),
    text: z.string({ required_error: 'Text is required' }),
  }),
});

export const FeedbackValidator = { feedbackValidator };
