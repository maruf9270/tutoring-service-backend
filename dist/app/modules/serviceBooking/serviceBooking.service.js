"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceBookingService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const auth_schema_1 = require("../auth/auth.schema");
const services_schema_1 = require("../services/services.schema");
const serviceBooking_constant_1 = require("./serviceBooking.constant");
const serviceBooking_model_1 = require("./serviceBooking.model");
// For booking service
const bookService = (params, user) => __awaiter(void 0, void 0, void 0, function* () {
    const doesexist = yield serviceBooking_model_1.Booking.find({
        date: params.date,
        serviceId: params.serviceId,
    });
    const doesServiceExist = yield services_schema_1.Service.findById(params.serviceId);
    if (!doesServiceExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Service not found');
    }
    if (doesexist.length > 0) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Booking already exists on this date');
    }
    const doesSlotexist = yield serviceBooking_model_1.Booking.find({
        date: params.date,
        serviceId: params.serviceId,
    });
    let bookedSLots = [];
    if (doesSlotexist.length > 0) {
        bookedSLots = doesSlotexist.map(slot => {
            return slot.slot;
        });
    }
    if (bookedSLots.includes(params.slot)) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Slot already booked');
    }
    const totalSlots = serviceBooking_constant_1.Slots;
    const availableSlots = totalSlots.filter(slot => {
        return !bookedSLots.includes(slot);
    });
    if (availableSlots.length === 0) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'No slot available');
    }
    const bookingData = Object.assign(Object.assign({}, params), { userId: user.id });
    const result = (yield (yield serviceBooking_model_1.Booking.create(bookingData)).populate('userId')).populate('serviceId');
    return result;
});
// For cancelling a booking
const cancelBooking = (params, user) => __awaiter(void 0, void 0, void 0, function* () {
    const booking = yield serviceBooking_model_1.Booking.findById(params);
    if (!booking) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Booking not found');
    }
    if (booking.userId.toString() !== user.id) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'Forbidden');
    }
    const result = yield serviceBooking_model_1.Booking.findByIdAndDelete(params);
    return result;
});
// For changing booking status
const patchStatus = (params) => __awaiter(void 0, void 0, void 0, function* () {
    const booking = yield serviceBooking_model_1.Booking.findById(params.id);
    if (!booking) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Booking not found');
    }
    const result = yield serviceBooking_model_1.Booking.findByIdAndUpdate(params.id, {
        status: params.status,
    }, { new: true });
    return result;
});
// For getting bookings
const getBookings = (params) => __awaiter(void 0, void 0, void 0, function* () {
    const findUser = yield auth_schema_1.Auth.findById(params.id);
    if (!findUser) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'Forbidden');
    }
    if (findUser.role === 'user') {
        const bookings = yield serviceBooking_model_1.Booking.find({ userId: params.id });
        return bookings;
    }
    if (findUser.role === 'admin' || findUser.role === 'super_admin') {
        const bookings = yield serviceBooking_model_1.Booking.find();
        return bookings;
    }
});
exports.ServiceBookingService = {
    bookService,
    cancelBooking,
    patchStatus,
    getBookings,
};
