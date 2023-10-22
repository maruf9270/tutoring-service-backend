import { Schema, model } from 'mongoose';
import { IService } from './services.interface';

const serviceSchema = new Schema<IService>(
  {
    title: {
      type: String,
      required: true,
    },
    description: { type: String, required: true },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    available: {
      type: Boolean,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    publish: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Service = model('services', serviceSchema);
