"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function productSerializer(product) {
    return {
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        quantity: product.quantity,
        createdAt: product.createdAt
    };
}
exports.default = productSerializer;
//# sourceMappingURL=product.serializer.js.map