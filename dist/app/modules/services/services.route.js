"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const services_controller_1 = require("./services.controller");
const services_validate_1 = require("./services.validate");
const router = express_1.default.Router();
// For getting all the services available
router.get('/', services_controller_1.ServiceController.getServices);
// For creataign new services
router.post('/', (0, validateRequest_1.default)(services_validate_1.ServiceValidator.serviceValidator), (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN), services_controller_1.ServiceController.createNewService);
// For updaing the service
router.patch('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN), (0, validateRequest_1.default)(services_validate_1.ServiceValidator.updateValidator), services_controller_1.ServiceController.updateService);
// For deleting the service
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN), services_controller_1.ServiceController.deleteService);
exports.ServiceRoutes = { router };
