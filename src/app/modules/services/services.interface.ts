export const serviceFilterableFields: string[] = [
  'searchTerm',
  'title',
  'description',
  'available',
  'category',
  'price',
];

export type serviceFilterableField = {
  searchTerm: string;
  title: string;
  description: string;
  available: string;
  category: string;
  minPrice: string;
  maxPrice: string;
};

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
  category: string;
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
