import { Products } from "@prisma/client";

export default function productSerializer(product: Products): Partial<Products> {
    return {
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        quantity: product.quantity,
        createdAt: product.createdAt
    }
}
