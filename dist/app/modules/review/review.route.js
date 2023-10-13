"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const review_controller_1 = require("./review.controller");
const review_validator_1 = require("./review.validator");
const routes = express_1.default.Router();
// For getting all the review
routes.get('/', review_controller_1.ReviewController.getAllReviews);
// For creating new review
routes.post('/', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.USER), (0, validateRequest_1.default)(review_validator_1.ReviewValidator.reviewValidator), review_controller_1.ReviewController.createReview);
// For getting a specific book review
routes.get('/:id', review_controller_1.ReviewController.specifreview);
// For edting  a review
routes.patch('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.USER), (0, validateRequest_1.default)(review_validator_1.ReviewValidator.reviewEditValidator), review_controller_1.ReviewController.editReview);
// For deleting a review
routes.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.USER), review_controller_1.ReviewController.removeReview);
exports.ReviewRoutes = { routes };
