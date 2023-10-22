"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceBookingRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const serviceBooking_controller_1 = require("./serviceBooking.controller");
const serviceBooking_validator_1 = require("./serviceBooking.validator");
const routes = express_1.default.Router();
// For getting bookings
routes.get('/', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.USER), serviceBooking_controller_1.ServiceBookingController.getBookings);
// For booking a new service
routes.post('/', (0, validateRequest_1.default)(serviceBooking_validator_1.BookingValidator.bookingValidator), (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.USER), serviceBooking_controller_1.ServiceBookingController.bookservice);
// For getting available Slots
routes.post('/slots', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.USER), serviceBooking_controller_1.ServiceBookingController.availabe);
// For cancelling a booking
routes.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.USER), serviceBooking_controller_1.ServiceBookingController.cancelBooking);
// For changing booking status
routes.patch('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.USER), serviceBooking_controller_1.ServiceBookingController.patchStatus);
exports.ServiceBookingRoutes = { routes };
