"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvertToUppercast = void 0;
const InvertToUppercast = (param) => {
    const upperCasedEmail = param.charAt(0).toUpperCase() + param.slice(1).toLowerCase();
    return upperCasedEmail;
};
exports.InvertToUppercast = InvertToUppercast;
