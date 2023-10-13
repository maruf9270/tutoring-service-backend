import { Types } from 'mongoose';

export type IReview = {
  userId: Types.ObjectId;
  rating: string;
  review: string;
  serviceId: Types.ObjectId;
};
