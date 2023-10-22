"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Service = void 0;
const mongoose_1 = require("mongoose");
const serviceSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    description: { type: String, required: true },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    available: {
        type: Boolean,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    publish: {
        type: Boolean,
        required: true,
    },
}, {
    timestamps: true,
});
exports.Service = (0, mongoose_1.model)('services', serviceSchema);
