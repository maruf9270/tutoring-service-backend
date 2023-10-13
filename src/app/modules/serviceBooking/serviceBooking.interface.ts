import { Types } from 'mongoose';
export type Istatus = 'accepted' | 'rejected' | 'adjusted' | 'pending';
export type IBooking = {
  userId: Types.ObjectId;
  date: string;
  slot: string;
  serviceId: Types.ObjectId;
  status: Istatus;
};
