import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { Product } from "../utils/cronJob";
import axios from "axios";
import { z } from "zod";
import { formatZodError } from "../utils/formatZodError";
import productSerializer from "../utils/product.serializer";

const prisma = new PrismaClient();

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, description, price, quantity } = req.body;

    await prisma.products.create({
      data: { name, description, price, quantity },
    });
    res.json({ message: "Product created successfully" });
  } catch (err) {
    const error = new Error(err?.message || "Something went wrong!");
    next(error);
  }
};

export const getAllProducts = async (req: Request, res: Response) => {
  const products = await prisma.products.findMany({
    where: { isDeleted: false },
  });
  res.json({
    data: { products: products.map((product) => productSerializer(product)) },
  });
};

export const getProductById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const idSchema = z.number();
    idSchema.parse(+id);

    const product = await prisma.products.findFirst({
      where: { id: +id, isDeleted: false },
    });

    if (!product) {
      next(new Error("Product not found"));
    }

    res.json({ product: productSerializer(product) || {} });
  } catch (err) {
    const formattedError = formatZodError(err.errors);
    const error = new Error(formattedError || "Something went wrong!");
    next(error);
  }
};

export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const idSchema = z.number();
    idSchema.parse(+id);

    const { name, description, price, quantity } = req.body;

    const product = await prisma.products.findFirst({
      where: { id: +id, isDeleted: false },
    });

    if (!product) {
      next(new Error("Product not found"));
    }

    await prisma.products.update({
      where: { id: +id },
      data: { name, description, price, quantity },
    });
    res.json({ message: "Product updated successfully" });
  } catch (err) {
    const formattedError = formatZodError(err.errors);
    const error = new Error(formattedError || "Something went wrong!");
    next(error);
  }
};

export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const idSchema = z.number();
    idSchema.parse(+id);

    const product = await prisma.products.findFirst({
      where: { id: +id, isDeleted: false },
    });
    if (!product) {
      next(new Error("Product not found"));
    }

    await prisma.products.update({
      where: { id: +id },
      data: { isDeleted: true },
    });
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    const formattedError = formatZodError(err.errors);
    const error = new Error(formattedError || "Something went wrong!");
    next(error);
  }
};

export const executeOnceOnServerStart = async () => {
  try {
    const { data }: { data: Product[] } = await axios.get(
      "https://fakestoreapi.com/products"
    );
    const products = await prisma.products.findMany({});
    if (data && !products.length) {
      data.map(
        async (product) =>
          await prisma.products.create({
            data: {
              name: product.title,
              description: product.description,
              quantity: Math.floor(Math.random() * 10) + 1,
              price: product.price,
            },
          })
      );
    }
  } catch (error) {
    console.error("Error: ", error);
  }
};
