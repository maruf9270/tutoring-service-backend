import { Schema, model } from 'mongoose';
import { Icategory } from '../modules/services/services.interface';

const categoryschema = new Schema<Icategory>({
  title: {
    type: String,
    required: true,
  },
});

export const Category = model('category', categoryschema);
