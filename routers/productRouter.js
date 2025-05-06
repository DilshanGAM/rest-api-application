import express from "express";
import { createProduct, deleteProduct, getProducts, updateProduct } from "../controllers/productController.js";

const productRouter = express.Router();

productRouter.get("/",getProducts)
productRouter.post("/",createProduct)
productRouter.put("/:productId",updateProduct)
productRouter.delete("/:productId",deleteProduct)

export default productRouter