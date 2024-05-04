"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const productSchema = zod_1.z.object({
    name: zod_1.z.string().min(2),
    description: zod_1.z.string().min(2),
    price: zod_1.z.number(),
    quantity: zod_1.z.number(),
});
exports.default = productSchema;
//# sourceMappingURL=product.schema.js.map