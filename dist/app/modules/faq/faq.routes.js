"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FaqRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const faq_controller_1 = require("./faq.controller");
const routes = express_1.default.Router();
// For creating new faq
routes.post('/', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.SUPER_ADMIN), faq_controller_1.FaqController.postFaq);
// For getting all faqs
routes.get('/', faq_controller_1.FaqController.getAllFaq);
exports.FaqRoutes = { routes };
