"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedbackValidator = void 0;
const zod_1 = require("zod");
const feedbackValidator = zod_1.z.object({
    body: zod_1.z.object({
        topic: zod_1.z.string({ required_error: 'Topic is required' }),
        text: zod_1.z.string({ required_error: 'Text is required' }),
    }),
});
exports.FeedbackValidator = { feedbackValidator };
