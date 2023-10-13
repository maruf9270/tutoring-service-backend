import { IService } from './services.interface';
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

// For getting all the services
const getAllServices = async (): Promise<IService[]> => {
  const result = await Service.find();
  return result;
};
export const ServicesService = {
  postService,
  patchService,
  deleteService,
  getAllServices,
};
