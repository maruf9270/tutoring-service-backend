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
exports.BlogService = void 0;
const blog_model_1 = require("./blog.model");
// For crating new blog post
const post = (params) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = yield blog_model_1.Blog.create(params);
    return blog;
});
// For getting all blog posts
const getAll = () => __awaiter(void 0, void 0, void 0, function* () {
    const blog = yield blog_model_1.Blog.find();
    return blog;
});
exports.BlogService = { post, getAll };
