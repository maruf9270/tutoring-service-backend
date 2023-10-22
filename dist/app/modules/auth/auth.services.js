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
exports.AuthServices = exports.patchUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const http_status_1 = __importDefault(require("http-status"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../../config"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const emailCapitalLetter_1 = require("../../../helpers/emailCapitalLetter");
const auth_schema_1 = require("./auth.schema");
// For getting all the users
const fetchUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_schema_1.Auth.find();
    return result;
});
// For creating new user
const postUser = (params) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_schema_1.Auth.create(params);
    return result;
});
// For logging in
const login = (params) => __awaiter(void 0, void 0, void 0, function* () {
    const email = (0, emailCapitalLetter_1.InvertToUppercast)(params.email);
    const isUserExists = yield auth_schema_1.Auth.findOne({ email: email });
    if (!isUserExists) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Invalid Login Informaiton');
    }
    const isPasswordmatched = yield bcrypt_1.default.compare(params.password, isUserExists.password);
    if (!isPasswordmatched) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Invalid Login Informaiton');
    }
    const accessToken = jsonwebtoken_1.default.sign({ id: isUserExists._id, role: isUserExists.role }, config_1.default.jwt.secret, { expiresIn: config_1.default.jwt.expires_in });
    const refreashToken = jsonwebtoken_1.default.sign({ id: isUserExists._id, role: isUserExists.role }, config_1.default.jwt.refresh_secret, { expiresIn: config_1.default.jwt.refresh_expires_in });
    return {
        refreashToken: refreashToken,
        accessToken: accessToken,
    };
});
// For updaing the user
const patchUser = (params, uidr) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExists = yield auth_schema_1.Auth.findById(uidr);
    if (!isUserExists) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
    // if (
    //   isUinfoReal?._id !== isUserExists?._id ||
    //   isUinfoReal?.role !== 'super_admin'
    // ) {
    //   if (isUinfoReal?.role !== 'admin') {
    //     throw new ApiError(
    //       httpStatus.UNAUTHORIZED,
    //       'YOu are not authorized to to the action'
    //     );
    //   }
    // }
    const result = yield auth_schema_1.Auth.updateOne({ _id: uidr }, params);
    return result;
});
exports.patchUser = patchUser;
// for deleting user
const deleteUser = (params, user) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserAuthorized = yield auth_schema_1.Auth.findOne({
        _id: user.id,
        role: user.role,
    });
    if (!isUserAuthorized || isUserAuthorized.role !== 'admin') {
        if ((isUserAuthorized === null || isUserAuthorized === void 0 ? void 0 : isUserAuthorized.role) !== 'super_admin') {
            throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'YOu are not authorized to do the action');
        }
    }
    const result = yield auth_schema_1.Auth.deleteOne({ _id: params });
    return result;
});
// For getting profile information
const getProfile = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_schema_1.Auth.findById(user.id).select({ password: false });
    return result;
});
// By is
exports.AuthServices = {
    postUser,
    login,
    patchUser: exports.patchUser,
    deleteUser,
    fetchUsers,
    getProfile,
};
