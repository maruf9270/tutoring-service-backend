import { z } from 'zod';
import { Slots } from './serviceBooking.constant';

const bookingValidator = z.object({
  body: z.object({
    date: z.string({ required_error: 'Date is required0' }),
    slot: z.enum([...Slots] as [string, ...string[]], {
      required_error: 'Slot Is required',
    }),
    serviceId: z.string({ required_error: 'Service Id is required' }),
    status: z.string({ required_error: 'Status is required' }).optional(),
  }),
});

const bookingValidator2 = z.object({
  body: z.object({
    date: z.string({ required_error: 'Date is required0' }),
    serviceId: z.string({ required_error: 'Service Id is required' }),
  }),
});
export const BookingValidator = { bookingValidator, bookingValidator2 };
