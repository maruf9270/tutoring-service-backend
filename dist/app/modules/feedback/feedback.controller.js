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
exports.FeedbackController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const feedback_service_1 = require("./feedback.service");
const addNewFeedback = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        const feedback = req.body;
        const result = yield feedback_service_1.FeeedbackService.post(feedback, user);
        (0, sendResponse_1.default)(res, {
            success: true,
            data: result,
            statusCode: http_status_1.default.OK,
            message: 'Feedback successfully posted',
        });
    }
    catch (error) {
        next(error);
    }
});
// For getting all the feedback
const getFeedback = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield feedback_service_1.FeeedbackService.fetchAllFeedback();
        (0, sendResponse_1.default)(res, {
            success: true,
            data: result,
            statusCode: http_status_1.default.OK,
            message: 'Feedback successfully fetched',
        });
    }
    catch (error) {
        next(error);
    }
});
exports.FeedbackController = { addNewFeedback, getFeedback };
