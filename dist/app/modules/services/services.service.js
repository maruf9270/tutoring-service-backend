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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServicesService = void 0;
const services_schema_1 = require("./services.schema");
// For creating a new services
const postService = (params) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield services_schema_1.Service.create(params);
    return result;
});
// for updaing a service
const patchService = (params, id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield services_schema_1.Service.findByIdAndUpdate(id, params, { new: true });
    return result;
});
// For deleting a service
const deleteService = (params) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield services_schema_1.Service.findByIdAndDelete(params);
    return result;
});
// For getting all the services
const getAllServices = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield services_schema_1.Service.find();
    return result;
});
exports.ServicesService = {
    postService,
    patchService,
    deleteService,
    getAllServices,
};
