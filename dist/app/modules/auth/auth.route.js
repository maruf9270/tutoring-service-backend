"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const auth_controller_1 = require("./auth.controller");
const auth_validator_1 = require("./auth.validator");
const routes = express_1.default.Router();
// For Creating new user
routes.post('/register', (0, validateRequest_1.default)(auth_validator_1.AuthValidator.authValidator), auth_controller_1.AuthController.createNewUser);
// For loggin in
routes.post('/login', (0, validateRequest_1.default)(auth_validator_1.AuthValidator.loginVlaidator), auth_controller_1.AuthController.loginUsr);
exports.AuthRoutes = { routes };
