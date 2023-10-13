export type Icategory =
  | 'academic'
  | 'test preparation'
  | 'special-education'
  | 'music'
  | 'arts'
  | 'profesional and skill development'
  | 'language'
  | 'programming'
  | 'early childhood education'
  | 'online'
  | 'parental guidence';

export type IService = {
  title: string;
  category: Icategory;
  price: number;
  available: boolean;
  publish: boolean;
  image: string;
  description: string;
};
export const category: Icategory[] = [
  'academic',
  'test preparation',
  'special-education',
  'music',
  'arts',
  'profesional and skill development',
  'language',
  'programming',
  'early childhood education',
  'online',
  'parental guidence',
];
