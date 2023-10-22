import httpStatus from 'http-status';
import { ObjectId } from 'mongodb';
import ApiError from '../../../errors/ApiError';
import { IUser } from '../auth/auth.interface';
import { IReview } from './review.interface';
import { Review } from './review.model';

// For getting all the reviews
const reviews = async (): Promise<IReview[]> => {
  const review = await Review.find().populate('userId');
  return review;
};

// For creating a new review
const postReview = async (
  params: IReview,
  user: IUser
): Promise<IReview | null> => {
  const doesReviewExist = await Review.find({
    userId: user.id,
    serviceId: params.serviceId,
  });
  if (doesReviewExist.length > 0) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Review already exists');
  }
  const data = {
    ...params,
    userId: user.id,
  };
  const result = (
    await (await Review.create(data)).populate('userId')
  ).populate('serviceId');
  return result;
};

// For patching a review
const patchReview = async (
  params: IReview,
  user: IUser,
  id: string
): Promise<IReview | null> => {
  const doesRwviewexist = await Review.find({
    _id: id,
    serviceId: params.serviceId,
  });

  if (!doesRwviewexist) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      'Review not found or you are not allowed to editReview'
    );
  }
  const result = await Review.updateOne({ _id: new ObjectId(id) }, params, {
    new: true,
  });
  return result as unknown as IReview;
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
