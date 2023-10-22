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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeeedbackService = void 0;
const feedback_module_1 = require("./feedback.module");
//  For posting new feedback
const post = (params, user) => __awaiter(void 0, void 0, void 0, function* () {
    const feedbackData = Object.assign(Object.assign({}, params), { userId: user.id });
    const result = (yield feedback_module_1.Feedback.create(feedbackData)).populate('userId');
    return result;
});
// For fetching all feedback
const fetchAllFeedback = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield feedback_module_1.Feedback.find().populate('userId');
    return result;
});
exports.FeeedbackService = { post, fetchAllFeedback };
