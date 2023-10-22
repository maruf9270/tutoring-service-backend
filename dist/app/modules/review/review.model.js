"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Review = void 0;
const mongoose_1 = require("mongoose");
const reviewSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'auth',
    },
    rating: {
        type: Number,
        required: true,
    },
    review: {
        type: String,
        required: true,
    },
    serviceId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'services',
    },
});
exports.Review = (0, mongoose_1.model)('review', reviewSchema);
