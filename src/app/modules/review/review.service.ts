import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IUser } from '../auth/auth.interface';
import { IReview } from './review.interface';
import { Review } from './review.model';

// For getting all the reviews
const reviews = async (): Promise<IReview[]> => {
  const review = await Review.find();
  return review;
};

// For creating a new review
const postReview = async (params: IReview): Promise<IReview | null> => {
  const result = (
    await (await Review.create(params)).populate('userId')
  ).populate('serviceId');
  return result;
};

// For patching a review
const patchReview = async (
  params: IReview,
  user: IUser,
  id: string
): Promise<IReview | null> => {
  const doesRwviewexist = await Review.findOne({ _id: id, userId: user.id });
  if (!doesRwviewexist) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      'Review not found or you are not allowed to editReview'
    );
  }
  const result = await Review.findOneAndUpdate({ _id: id }, params)
    .populate('userId')
    .populate('serviceId');
  return result;
};

// For deleting a review
const deleteReview = async (
  params: string,
  user: IUser
): Promise<IReview | null> => {
  const doesRwviewexist = await Review.findOne({
    _id: params,
    userId: user.id,
  });
  if (!doesRwviewexist) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      'Review not found or you are not allowed to deleteReview'
    );
  }
  const result = await Review.findOneAndDelete({ _id: params })
    .populate('userId')
    .populate('serviceId');
  return result;
};
// Fetching a specific review
const fetchReview = async (id: string) => {
  const reviews = await Review.find({ serviceId: id })
    .populate('userId')
    .populate('serviceId');
  return reviews;
};
export const ReviewService = {
  postReview,
  patchReview,
  deleteReview,
  reviews,
  fetchReview,
};
