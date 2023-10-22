"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const auth_controller_1 = require("./auth.controller");
const auth_validator_1 = require("./auth.validator");
const routes = express_1.default.Router();
// For gettng all the users
routes.get('/', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.SUPER_ADMIN), auth_controller_1.AuthController.gethUsers);
// For Creating new user
routes.post('/register', (0, validateRequest_1.default)(auth_validator_1.AuthValidator.authValidator), auth_controller_1.AuthController.createNewUser);
// For loggin in
routes.post('/login', (0, validateRequest_1.default)(auth_validator_1.AuthValidator.loginVlaidator), auth_controller_1.AuthController.loginUsr);
// For getting profofile
routes.get('/profile', (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER, user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.SUPER_ADMIN), auth_controller_1.AuthController.getProfile);
// For getting single
routes.get('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.SUPER_ADMIN), auth_controller_1.AuthController.getById);
// For updaing user
routes.patch('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.USER), (0, validateRequest_1.default)(auth_validator_1.AuthValidator.patchValidator), auth_controller_1.AuthController.updateUinfo);
// for deleting user
routes.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.SUPER_ADMIN), auth_controller_1.AuthController.removeuser);
exports.AuthRoutes = { routes };
