import { Schema, model } from 'mongoose';
import { Slots } from './serviceBooking.constant';
import { IBooking } from './serviceBooking.interface';

const bookingSchema = new Schema<IBooking>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'auth',
    required: true,
  },
  serviceId: {
    type: Schema.Types.ObjectId,
    ref: 'services',
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  slot: {
    type: String,
    required: true,
    enum: Slots,
  },
  status: {
    type: String,
    required: true,
    default: 'pending',
    enum: ['pending', 'accepted', 'rejected', 'cancelled'],
  },
});

export const Booking = model('bookings', bookingSchema);
