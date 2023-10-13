import { Schema, model } from 'mongoose';
import { IFaq } from './faw.interface';

const faqSchema = new Schema<IFaq>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Faq = model('faq', faqSchema);
