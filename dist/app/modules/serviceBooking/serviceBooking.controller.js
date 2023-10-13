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
exports.ServiceBookingController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const serviceBooking_service_1 = require("./serviceBooking.service");
// For booking for new service
const bookservice = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        const result = yield serviceBooking_service_1.ServiceBookingService.bookService(req.body, user);
        (0, sendResponse_1.default)(res, {
            success: true,
            data: result,
            statusCode: http_status_1.default.OK,
            message: 'Booking conpleted successfully',
        });
    }
    catch (error) {
        next(error);
    }
});
const cancelBooking = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const user = req.user;
        const result = yield serviceBooking_service_1.ServiceBookingService.cancelBooking(id, user);
        (0, sendResponse_1.default)(res, {
            success: true,
            data: result,
            statusCode: http_status_1.default.OK,
            message: 'Booking cancelled successfully',
        });
    }
    catch (error) {
        next(error);
    }
});
// For changing booking status
const patchStatus = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        console.log(id);
        const status = req.body.status;
        const result = yield serviceBooking_service_1.ServiceBookingService.patchStatus({
            id,
            status,
        });
        (0, sendResponse_1.default)(res, {
            success: true,
            data: result,
            statusCode: http_status_1.default.OK,
            message: 'Booking status changed successfully',
        });
    }
    catch (error) {
        next(error);
    }
});
// For getting bookings
const getBookings = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        const result = yield serviceBooking_service_1.ServiceBookingService.getBookings(user);
        (0, sendResponse_1.default)(res, {
            success: true,
            data: result,
            statusCode: http_status_1.default.OK,
            message: 'Bookings data retrieved successfully',
        });
    }
    catch (error) {
        next(error);
    }
});
exports.ServiceBookingController = {
    bookservice,
    cancelBooking,
    patchStatus,
    getBookings,
};
