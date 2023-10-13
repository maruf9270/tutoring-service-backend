import { Faq } from './faq.model';
import { IFaq } from './faw.interface';

// For creating faq
const post = async (params: Partial<IFaq>): Promise<IFaq> => {
  const result = await Faq.create(params);
  return result;
};

// For getting all faqs
const getAll = async () => {
  const result = await Faq.find();
  return result;
};

export const FaqService = { post, getAll };
