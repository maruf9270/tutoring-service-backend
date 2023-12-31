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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServicesService = void 0;
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const services_interface_1 = require("./services.interface");
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
const getAllServices = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions);
    const andConditions = [];
    // Search needs $or for searching in specified fields
    if (searchTerm) {
        andConditions.push({
            $or: services_interface_1.serviceFilterableFields.map(field => ({
                [field]: {
                    $regex: searchTerm,
                    $options: 'i',
                },
            })),
        });
    }
    // Filters needs $and to fullfill all the conditions
    if (Object.keys(filtersData).length) {
        andConditions.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }
    // Dynamic  Sort needs  field to  do sorting
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};
    const result = yield services_schema_1.Service.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = yield services_schema_1.Service.countDocuments();
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
// For getting single services
const getSingleService = (params) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield services_schema_1.Service.findById(params);
    return result;
});
exports.ServicesService = {
    postService,
    patchService,
    deleteService,
    getAllServices,
    getSingleService,
};
