"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const products_1 = require("../controllers/products");
const zodMiddleware_1 = require("../middlewares/zodMiddleware");
const productRouter = (0, express_1.Router)();
productRouter.post("/", zodMiddleware_1.ProductValidateMiddleware, products_1.createProduct);
productRouter.get("/", products_1.getAllProducts);
productRouter.get("/:id", products_1.getProductById);
productRouter.put("/:id", zodMiddleware_1.ProductValidateMiddleware, products_1.updateProduct);
productRouter.delete("/:id", products_1.deleteProduct);
exports.default = productRouter;
//# sourceMappingURL=products.js.map