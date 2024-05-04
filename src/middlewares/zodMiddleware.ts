import { NextFunction, Request, Response } from "express";
import productSchema from "../utils/zod/product.schema";
import { formatZodError } from "../utils/formatZodError";

export const ProductValidateMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    productSchema.parse(req.body);
    next();
  } catch (err) {
    const formattedError = formatZodError(err.errors);
    const error = new Error(formattedError);
    next(error);
  }
};
