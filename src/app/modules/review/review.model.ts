import { Schema, model } from 'mongoose';
import { IReview } from './review.interface';

const reviewSchema = new Schema<IReview>({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'auth',
  },
  rating: {
    type: String,
    required: true,
  },
  review: {
    type: String,
    required: true,
  },
  serviceId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'services',
  },
});

export const Review = model('review', reviewSchema);
