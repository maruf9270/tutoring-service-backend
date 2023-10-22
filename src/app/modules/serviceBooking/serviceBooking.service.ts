import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IUser } from '../auth/auth.interface';
import { Auth } from '../auth/auth.schema';
import { Service } from '../services/services.schema';
import { Slots } from './serviceBooking.constant';
import { IBooking, Istatus } from './serviceBooking.interface';
import { Booking } from './serviceBooking.model';

// For booking service
const bookService = async (
  params: Partial<IBooking>,
  user: IUser
): Promise<IBooking> => {
  const doesexist = await Booking.find({
    date: params.date,
    serviceId: params.serviceId,
  });
  const doesServiceExist = await Service.findById(params.serviceId);
  if (!doesServiceExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Service not found');
  }
  if (doesexist.length > 0) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Booking already exists on this date'
    );
  }
  const doesSlotexist = await Booking.find({
    date: params.date,
    serviceId: params.serviceId,
  });
  let bookedSLots: string[] = [];

  if (doesSlotexist.length > 0) {
    bookedSLots = doesSlotexist.map(slot => {
      return slot.slot;
    });
  }
  if (bookedSLots.includes(params.slot as string)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Slot already booked');
  }
  const totalSlots = Slots;
  const availableSlots = totalSlots.filter(slot => {
    return !bookedSLots.includes(slot);
  });
  if (availableSlots.length === 0) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'No slot available');
  }
  const bookingData = {
    ...params,
    userId: user.id,
  };
  const result = (
    await (await Booking.create(bookingData)).populate('userId')
  ).populate('serviceId');
  return result;
};

// For cancelling a booking

const cancelBooking = async (
  params: string,
  user: IUser
): Promise<IBooking | null> => {
  const booking = await Booking.findById(params);
  if (!booking) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Booking not found');
  }
  if (booking.userId.toString() !== user.id) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden');
  }
  const result = await Booking.findByIdAndDelete(params);
  return result;
};

// For changing booking status
const patchStatus = async (params: { id: string; status: Istatus }) => {
  const booking = await Booking.findById(params.id);
  if (!booking) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Booking not found');
  }
  const result = await Booking.findByIdAndUpdate(
    params.id,
    {
      status: params.status,
    },
    { new: true }
  );
  return result;
};
// For getting bookings
const getBookings = async (params: IUser) => {
  const findUser = await Auth.findById(params.id);
  if (!findUser) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden');
  }
  if (findUser.role === 'user') {
    const bookings = await Booking.find({ userId: params.id })
      .populate('userId')
      .populate('serviceId');
    return bookings;
  }
  if (findUser.role === 'admin' || findUser.role === 'super_admin') {
    const bookings = await Booking.find()
      .populate('userId')
      .populate('serviceId');
    return bookings;
  }
};

// FOr getitng availabe slots
const slots = async (params: Partial<IBooking>) => {
  const bookings = await Booking.find({
    serviceId: params.serviceId,
    date: params.date,
  });
  if (bookings.length > 0) {
    return Slots;
  }
  const bookedSlots = bookings.map(slot => {
    return slot.slot;
  });
  const totalSlots = Slots;
  const availableSlots = totalSlots.filter(slot => {
    return !bookedSlots.includes(slot);
  });

  return availableSlots;
};
export const ServiceBookingService = {
  bookService,
  cancelBooking,
  patchStatus,
  getBookings,
  slots,
};
