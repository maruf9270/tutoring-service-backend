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
exports.Auth = void 0;
/* eslint-disable @typescript-eslint/no-this-alias */
const bcrypt_1 = __importDefault(require("bcrypt"));
const http_status_1 = __importDefault(require("http-status"));
const mongoose_1 = require("mongoose");
const config_1 = __importDefault(require("../../../config"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const authSchema = new mongoose_1.Schema({
    name: {
        firstName: {
            type: String,
            required: true,
        },
        middleName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
    },
    role: {
        type: String,
        required: true,
        enum: ['super_admin', 'admin', 'user'],
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        required: true,
        minlength: 11,
        maxlength: 14,
    },
    address: {
        type: String,
        required: true,
    },
    profileImage: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 32,
    },
});
authSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const upperCasedEmail = this.email.charAt(0).toUpperCase() + this.email.slice(1).toLowerCase();
        const isUserExists = yield exports.Auth.findOne({ email: upperCasedEmail });
        if (isUserExists) {
            throw new ApiError_1.default(http_status_1.default.CONFLICT, 'User already exists by this email.');
        }
        next();
    });
});
authSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        const upperCasedEmail = user.email.charAt(0).toUpperCase() + user.email.slice(1).toLowerCase();
        user.email = upperCasedEmail;
        const password = user.password;
        const hashedPassword = yield bcrypt_1.default.hash(password, Number(config_1.default.bycrypt_salt_rounds));
        user.password = hashedPassword;
        next();
    });
});
exports.Auth = (0, mongoose_1.model)('auth', authSchema);
