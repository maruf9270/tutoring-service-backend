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
exports.AuthController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const auth_services_1 = require("./auth.services");
// For getting all user
const gethUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield auth_services_1.AuthServices.fetchUsers();
        (0, sendResponse_1.default)(res, {
            data: users,
            statusCode: http_status_1.default.OK,
            success: true,
            message: 'Users featched successfully',
        });
    }
    catch (error) {
        next(error);
    }
});
// For creating new user
const createNewUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const result = yield auth_services_1.AuthServices.postUser(data);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: 'Account Created successfuly',
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
// For logging in
const loginUsr = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield auth_services_1.AuthServices.login(req.body);
        res.cookie('user', result.refreashToken, {
            httpOnly: false,
            secure: false,
        });
        (0, sendResponse_1.default)(res, {
            success: true,
            statusCode: http_status_1.default.OK,
            message: 'Logged in successfully',
            data: {
                accessToken: result.accessToken,
            },
        });
    }
    catch (error) {
        next(error);
    }
});
// For updaing
const updateUinfo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const uinfo = req.user;
        const uidr = req.params.id;
        const data = req.body;
        const result = yield auth_services_1.AuthServices.patchUser(data, uidr, uinfo);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            message: 'User updated successfully',
            success: true,
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
// FOr removing tuser
const removeuser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const uinfo = req.user;
        const uidr = req.params.id;
        const result = yield auth_services_1.AuthServices.deleteUser(uidr, uinfo);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            message: 'User deleted successfully',
            success: true,
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.AuthController = {
    createNewUser,
    loginUsr,
    updateUinfo,
    removeuser,
    gethUsers,
};
