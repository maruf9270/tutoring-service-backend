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
exports.ReviewService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const mongodb_1 = require("mongodb");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const review_model_1 = require("./review.model");
// For getting all the reviews
const reviews = () => __awaiter(void 0, void 0, void 0, function* () {
    const review = yield review_model_1.Review.find();
    return review;
});
// For creating a new review
const postReview = (params, user) => __awaiter(void 0, void 0, void 0, function* () {
    const doesReviewExist = yield review_model_1.Review.find({
        userId: user.id,
        serviceId: params.serviceId,
    });
    if (doesReviewExist) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Review already exists');
    }
    const data = Object.assign(Object.assign({}, params), { userId: user.id });
    const result = (yield (yield review_model_1.Review.create(data)).populate('userId')).populate('serviceId');
    return result;
});
// For patching a review
const patchReview = (params, user, id) => __awaiter(void 0, void 0, void 0, function* () {
    const doesRwviewexist = yield review_model_1.Review.find({
        _id: id,
        serviceId: params.serviceId,
    });
    if (!doesRwviewexist) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'Review not found or you are not allowed to editReview');
    }
    const result = yield review_model_1.Review.updateOne({ _id: new mongodb_1.ObjectId(id) }, params, {
        new: true,
    });
    return result;
});
// For deleting a review
const deleteReview = (params, user) => __awaiter(void 0, void 0, void 0, function* () {
    const doesRwviewexist = yield review_model_1.Review.findOne({
        _id: params,
        userId: user.id,
    });
    if (!doesRwviewexist) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'Review not found or you are not allowed to deleteReview');
    }
    const result = yield review_model_1.Review.findOneAndDelete({ _id: params })
        .populate('userId')
        .populate('serviceId');
    return result;
});
// Fetching a specific review
const fetchReview = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const reviews = yield review_model_1.Review.find({ serviceId: id })
        .populate('userId')
        .populate('serviceId');
    return reviews;
});
exports.ReviewService = {
    postReview,
    patchReview,
    deleteReview,
    reviews,
    fetchReview,
};
