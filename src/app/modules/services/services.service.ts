import { SortOrder } from 'mongoose';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import {
  IService,
  serviceFilterableField,
  serviceFilterableFields,
} from './services.interface';
import { Service } from './services.schema';

// For creating a new services
const postService = async (params: IService): Promise<IService> => {
  const result = await Service.create(params);
  return result;
};

// for updaing a service
const patchService = async (
  params: Partial<IService>,
  id: string
): Promise<IService | null> => {
  const result = await Service.findByIdAndUpdate(id, params, { new: true });
  return result;
};

// For deleting a service
const deleteService = async (params: string): Promise<IService | null> => {
  const result = await Service.findByIdAndDelete(params);
  return result;
};

export type paginationOption = {
  page: number;
  limit: number;
  sortBy: string;
  sortOrder: string;
};

// For getting all the services
const getAllServices = async (
  filters: serviceFilterableField,
  paginationOptions: paginationOption
) => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];
  // Search needs $or for searching in specified fields
  if (searchTerm) {
    andConditions.push({
      $or: serviceFilterableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }
  // Filters needs $and to fullfill all the conditions
  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  // Dynamic  Sort needs  field to  do sorting
  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder as SortOrder;
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};
  const result = await Service.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Service.countDocuments();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

// For getting single services
const getSingleService = async (params: string): Promise<IService | null> => {
  const result = await Service.findById(params);
  return result;
};
export const ServicesService = {
  postService,
  patchService,
  deleteService,
  getAllServices,
  getSingleService,
};
