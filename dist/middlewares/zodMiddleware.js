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
exports.ProductValidateMiddleware = void 0;
const product_schema_1 = __importDefault(require("../utils/zod/product.schema"));
const formatZodError_1 = require("../utils/formatZodError");
const ProductValidateMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        product_schema_1.default.parse(req.body);
        next();
    }
    catch (err) {
        const formattedError = (0, formatZodError_1.formatZodError)(err.errors);
        const error = new Error(formattedError);
        next(error);
    }
});
exports.ProductValidateMiddleware = ProductValidateMiddleware;
//# sourceMappingURL=zodMiddleware.js.map