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
exports.executeOnceOnServerStart = exports.deleteProduct = exports.updateProduct = exports.getProductById = exports.getAllProducts = exports.createProduct = void 0;
const client_1 = require("@prisma/client");
const axios_1 = __importDefault(require("axios"));
const zod_1 = require("zod");
const formatZodError_1 = require("../utils/formatZodError");
const product_serializer_1 = __importDefault(require("../utils/product.serializer"));
const prisma = new client_1.PrismaClient();
const createProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description, price, quantity } = req.body;
        yield prisma.products.create({
            data: { name, description, price, quantity },
        });
        res.json({ message: "Product created successfully" });
    }
    catch (err) {
        const error = new Error((err === null || err === void 0 ? void 0 : err.message) || "Something went wrong!");
        next(error);
    }
});
exports.createProduct = createProduct;
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield prisma.products.findMany({
        where: { isDeleted: false },
    });
    res.json({
        data: { products: products.map((product) => (0, product_serializer_1.default)(product)) },
    });
});
exports.getAllProducts = getAllProducts;
const getProductById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const idSchema = zod_1.z.number();
        idSchema.parse(+id);
        const product = yield prisma.products.findFirst({
            where: { id: +id, isDeleted: false },
        });
        if (!product) {
            next(new Error("Product not found"));
        }
        res.json({ product: (0, product_serializer_1.default)(product) || {} });
    }
    catch (err) {
        const formattedError = (0, formatZodError_1.formatZodError)(err.errors);
        const error = new Error(formattedError || "Something went wrong!");
        next(error);
    }
});
exports.getProductById = getProductById;
const updateProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const idSchema = zod_1.z.number();
        idSchema.parse(+id);
        const { name, description, price, quantity } = req.body;
        const product = yield prisma.products.findFirst({
            where: { id: +id, isDeleted: false },
        });
        if (!product) {
            next(new Error("Product not found"));
        }
        yield prisma.products.update({
            where: { id: +id },
            data: { name, description, price, quantity },
        });
        res.json({ message: "Product updated successfully" });
    }
    catch (err) {
        const formattedError = (0, formatZodError_1.formatZodError)(err.errors);
        const error = new Error(formattedError || "Something went wrong!");
        next(error);
    }
});
exports.updateProduct = updateProduct;
const deleteProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const idSchema = zod_1.z.number();
        idSchema.parse(+id);
        const product = yield prisma.products.findFirst({
            where: { id: +id, isDeleted: false },
        });
        if (!product) {
            next(new Error("Product not found"));
        }
        yield prisma.products.update({
            where: { id: +id },
            data: { isDeleted: true },
        });
        res.json({ message: "Product deleted successfully" });
    }
    catch (err) {
        const formattedError = (0, formatZodError_1.formatZodError)(err.errors);
        const error = new Error(formattedError || "Something went wrong!");
        next(error);
    }
});
exports.deleteProduct = deleteProduct;
const executeOnceOnServerStart = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data } = yield axios_1.default.get("https://fakestoreapi.com/products");
        const products = yield prisma.products.findMany({});
        if (data && !products.length) {
            data.map((product) => __awaiter(void 0, void 0, void 0, function* () {
                return yield prisma.products.create({
                    data: {
                        name: product.title,
                        description: product.description,
                        quantity: Math.floor(Math.random() * 10) + 1,
                        price: product.price,
                    },
                });
            }));
        }
    }
    catch (error) {
        console.error("Error: ", error);
    }
});
exports.executeOnceOnServerStart = executeOnceOnServerStart;
//# sourceMappingURL=products.js.map