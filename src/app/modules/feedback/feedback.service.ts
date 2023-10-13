import { IUser } from '../auth/auth.interface';
import { IFeedback } from './feedback.interface';
import { Feedback } from './feedback.module';

//  For posting new feedback
const post = async (
  params: Partial<IFeedback>,
  user: IUser
): Promise<IFeedback> => {
  const feedbackData = {
    ...params,
    userId: user.id,
  };
  const result = (await Feedback.create(feedbackData)).populate('userId');
  return result;
};
// For fetching all feedback
const fetchAllFeedback = async (): Promise<IFeedback[]> => {
  const result = await Feedback.find().populate('userId');
  return result;
};

export const FeeedbackService = { post, fetchAllFeedback };
