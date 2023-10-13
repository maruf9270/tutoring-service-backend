import { Types } from 'mongoose';

export type IFeedback = {
  userId: Types.ObjectId;
  text: string;
  topic: string;
};
