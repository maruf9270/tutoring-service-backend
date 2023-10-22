"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedBackRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const feedback_controller_1 = require("./feedback.controller");
const feedback_validator_1 = require("./feedback.validator");
const routes = express_1.default.Router();
// For postign new feedback
routes.post('/', (0, validateRequest_1.default)(feedback_validator_1.FeedbackValidator.feedbackValidator), (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.USER), feedback_controller_1.FeedbackController.addNewFeedback);
// For getting all the feedback
routes.get('/', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.SUPER_ADMIN), feedback_controller_1.FeedbackController.getFeedback);
exports.FeedBackRoutes = { routes };
