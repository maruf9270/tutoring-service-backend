"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogValidator = void 0;
const zod_1 = require("zod");
const blogValidator = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({ required_error: 'Title is required' }).min(3).max(255),
        description: zod_1.z.string({ required_error: 'Description is required' }),
        image: zod_1.z.string({ required_error: 'Image is required' }).min(3).max(255),
    }),
});
exports.BlogValidator = { blogValidator };
