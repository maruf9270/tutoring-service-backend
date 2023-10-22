import { Types } from 'mongoose';

export type IReview = {
  userId: Types.ObjectId;
  rating: number;
  review: string;
  serviceId: Types.ObjectId;
};
