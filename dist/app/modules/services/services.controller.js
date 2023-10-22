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
exports.ServiceController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const services_interface_1 = require("./services.interface");
const services_service_1 = require("./services.service");
// For creataign new services
const createNewService = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield services_service_1.ServicesService.postService(req.body);
        (0, sendResponse_1.default)(res, {
            success: true,
            message: 'Service created successfully',
            statusCode: http_status_1.default.OK,
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
// For updaing services
const updateService = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield services_service_1.ServicesService.patchService(req.body, req.params.id);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            data: result,
            message: 'Service updated successfully',
            success: true,
        });
    }
    catch (err) {
        next(err);
    }
});
// controller for delete service
const deleteService = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield services_service_1.ServicesService.deleteService(req.params.id);
        (0, sendResponse_1.default)(res, {
            data: result,
            message: 'Service deleted successfully',
            success: true,
            statusCode: http_status_1.default.OK,
        });
    }
    catch (err) {
        next(err);
    }
});
//for getting services
const getServices = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.params);
        const filterableFIelds = (0, pick_1.default)(req.query, services_interface_1.serviceFilterableFields);
        const options = (0, pick_1.default)(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
        const result = yield services_service_1.ServicesService.getAllServices(filterableFIelds, options);
        (0, sendResponse_1.default)(res, {
            success: true,
            statusCode: http_status_1.default.OK,
            data: result,
            message: 'Services retrieved successfully',
        });
    }
    catch (error) {
        next(error);
    }
});
// For getting single services
const getSingleService = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield services_service_1.ServicesService.getSingleService(req.params.id);
        (0, sendResponse_1.default)(res, {
            success: true,
            statusCode: http_status_1.default.OK,
            data: result,
            message: 'Services retrieved successfully',
        });
    }
    catch (error) {
        next(error);
    }
});
exports.ServiceController = {
    createNewService,
    updateService,
    deleteService,
    getServices,
    getSingleService,
};
