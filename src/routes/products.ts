import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} from "../controllers/products";
import { ProductValidateMiddleware } from "../middlewares/zodMiddleware";

const productRouter = Router();

productRouter.post("/", ProductValidateMiddleware, createProduct);
productRouter.get("/", getAllProducts);
productRouter.get("/:id", getProductById);
productRouter.put("/:id",ProductValidateMiddleware, updateProduct);
productRouter.delete("/:id", deleteProduct);

export default productRouter;
