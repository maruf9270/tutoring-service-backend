"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_route_1 = require("../modules/auth/auth.route");
const review_route_1 = require("../modules/review/review.route");
const serviceBooking_routs_1 = require("../modules/serviceBooking/serviceBooking.routs");
const services_route_1 = require("../modules/services/services.route");
const router = express_1.default.Router();
const moduleRoutes = [
    // ... routes
    {
        path: '/auth',
        routes: auth_route_1.AuthRoutes.routes,
    },
    {
        path: '/services',
        routes: services_route_1.ServiceRoutes.router,
    },
    {
        path: '/reviews',
        routes: review_route_1.ReviewRoutes.routes,
    },
    {
        path: '/bookings',
        routes: serviceBooking_routs_1.ServiceBookingRoutes.routes,
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.routes));
exports.default = router;
