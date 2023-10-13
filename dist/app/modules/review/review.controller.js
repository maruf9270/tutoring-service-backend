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
exports.ReviewController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const review_service_1 = require("./review.service");
// For getting all the reviews
const getAllReviews = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reviews = yield review_service_1.ReviewService.reviews();
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            data: reviews,
            message: 'Reviews successfully fatched',
            success: true,
        });
    }
    catch (error) {
        next(error);
    }
});
// For creatin new review
const createReview = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const review = req.body;
        const user = req.user;
        const result = yield review_service_1.ReviewService.postReview(review, user);
        (0, sendResponse_1.default)(res, {
            message: 'review successfully created',
            statusCode: http_status_1.default.OK,
            success: true,
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const editReview = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const review = req.body;
        const user = req.user;
        const id = req.params.id;
        const result = yield review_service_1.ReviewService.patchReview(review, user, id);
        (0, sendResponse_1.default)(res, {
            success: true,
            data: result,
            statusCode: http_status_1.default.OK,
            message: 'review successfully updated',
        });
    }
    catch (error) {
        next(error);
    }
});
// For deleteReview
const removeReview = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const user = req.user;
        const result = yield review_service_1.ReviewService.deleteReview(id, user);
        (0, sendResponse_1.default)(res, {
            success: true,
            data: result,
            statusCode: http_status_1.default.OK,
            message: 'Review deleted successfully',
        });
    }
    catch (error) {
        next(error);
    }
});
// For getting a specific service review
const specifreview = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        console.log(id);
        const result = yield review_service_1.ReviewService.fetchReview(id);
        (0, sendResponse_1.default)(res, {
            success: true,
            data: result,
            message: 'Review fetched successfully',
            statusCode: http_status_1.default.OK,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.ReviewController = {
    createReview,
    editReview,
    removeReview,
    getAllReviews,
    specifreview,
};
