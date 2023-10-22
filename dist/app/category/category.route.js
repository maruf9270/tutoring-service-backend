"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../enums/user");
const auth_1 = __importDefault(require("../middlewares/auth"));
const category_controller_1 = require("./category.controller");
const routes = express_1.default.Router();
// FOr new category
routes.post('/', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.SUPER_ADMIN), category_controller_1.CategoryController.newCategory);
// FOr all
routes.get('/', category_controller_1.CategoryController.getAll);
exports.CategoryRoutes = { routes };
