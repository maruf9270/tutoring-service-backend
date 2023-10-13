"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceValidator = void 0;
const zod_1 = require("zod");
const services_interface_1 = require("./services.interface");
const serviceValidator = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({ required_error: 'TItle is required' }),
        description: zod_1.z.string({ required_error: 'Description is required' }),
        price: zod_1.z.number({ required_error: 'Price is required' }),
        category: zod_1.z.enum([...services_interface_1.category], {
            required_error: 'category is required',
        }),
        available: zod_1.z.string({ required_error: 'Available option is required' }),
        image: zod_1.z.string({ required_error: 'Image is required' }),
        publish: zod_1.z.string({ required_error: 'Publish state is required' }),
    }),
});
const updateValidator = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({ required_error: 'TItle is required' }).optional(),
        description: zod_1.z
            .string({ required_error: 'Description is required' })
            .optional(),
        price: zod_1.z.number({ required_error: 'Price is required' }).optional(),
        category: zod_1.z
            .enum([...services_interface_1.category], {
            required_error: 'category is required',
        })
            .optional(),
        availabl: zod_1.z
            .string({ required_error: 'Available option is required' })
            .optional(),
        Image: zod_1.z.string({ required_error: 'Image is required' }).optional(),
        publish: zod_1.z
            .string({ required_error: 'Publish state is required' })
            .optional(),
    }),
});
exports.ServiceValidator = { serviceValidator, updateValidator };
