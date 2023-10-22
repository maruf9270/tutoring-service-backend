"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingValidator = void 0;
const zod_1 = require("zod");
const serviceBooking_constant_1 = require("./serviceBooking.constant");
const bookingValidator = zod_1.z.object({
    body: zod_1.z.object({
        date: zod_1.z.string({ required_error: 'Date is required0' }),
        slot: zod_1.z.enum([...serviceBooking_constant_1.Slots], {
            required_error: 'Slot Is required',
        }),
        serviceId: zod_1.z.string({ required_error: 'Service Id is required' }),
        status: zod_1.z.string({ required_error: 'Status is required' }).optional(),
    }),
});
const bookingValidator2 = zod_1.z.object({
    body: zod_1.z.object({
        date: zod_1.z.string({ required_error: 'Date is required0' }),
        serviceId: zod_1.z.string({ required_error: 'Service Id is required' }),
    }),
});
exports.BookingValidator = { bookingValidator, bookingValidator2 };
