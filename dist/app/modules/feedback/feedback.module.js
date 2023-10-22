"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Feedback = void 0;
const mongoose_1 = require("mongoose");
const feedbackSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'auth',
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    topic: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});
exports.Feedback = (0, mongoose_1.model)('feedback', feedbackSchema);
