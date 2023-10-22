"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const category_route_1 = require("../category/category.route");
const auth_route_1 = require("../modules/auth/auth.route");
const blog_routes_1 = require("../modules/blog/blog.routes");
const faq_routes_1 = require("../modules/faq/faq.routes");
const feedback_routes_1 = require("../modules/feedback/feedback.routes");
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
    {
        path: '/feedbacks',
        routes: feedback_routes_1.FeedBackRoutes.routes,
    },
    {
        path: '/faq',
        routes: faq_routes_1.FaqRoutes.routes,
    },
    {
        path: '/blogs',
        routes: blog_routes_1.BlogRoutes.routes,
    },
    {
        path: '/category',
        routes: category_route_1.CategoryRoutes.routes,
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.routes));
exports.default = router;
