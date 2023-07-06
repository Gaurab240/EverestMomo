import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} from "../controller/productController.js";

const router = express.Router();
router.post("/createProduct", createProduct);
router.delete("/deleteProduct/:id", deleteProduct);
router.get("/getProducts", getAllProducts);
router.put("/updateProducts/:id", updateProduct);
router.get("/getProduct/:id", getProductById);

export default router;
