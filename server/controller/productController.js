import productModel from "../models/productModel.js";
import cloudinary from "../utils/cloudinary.js";
import path from "path";

export const createProduct = async (req, res,next) => {
  const {
    itemName,
    price,
    category,
    categoryItem,
    description,
  } = req.body;
  const file = req.files.image
  try {
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      folder: "products",
    });
    const product = await productModel.create({
      itemName,
      price,
      category,
      categoryItem,
      image: {
        public_id: result.public_id,
        url: result.secure_url,
      },
      description
    });

   // await newProduct.save();

    res.status(200).json({
      message: "Product created successfully",
      product: product
    });
  } catch (error) {
    console.log(error);
    
    res.status(500).json({ error: "Failed to upload product" });
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  const productId = req.params.id; // Assuming you pass the product ID as a parameter

  try {
    const product = await productModel.findOneAndDelete({ _id: productId });
    
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Delete the product image from Cloudinary
    await cloudinary.uploader.destroy(product.image.public_id);

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to delete product" });
    next(error);
  }
};

export const getAllProducts = async (req, res, next) => {
  try {
    const products = await productModel.find();
    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to fetch products" });
    next(error);
  }
};

export const getProductById = async (req, res, next) => {
  const productId = req.params.id; // Assuming you pass the product ID as a parameter

  try {
    const product = await productModel.findById(productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json({
      message: "Product retrieved successfully",
      product: product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to retrieve product" });
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  const productId = req.params.id; // Assuming you pass the product ID as a parameter
  const {
    itemName,
    price,
    category,
    categoryItem,
    description,
  } = req.body;

  try {
    let product = await productModel.findById(productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    if (req.files && req.files.image) {
      const file = req.files.image;

      // Update the product image in Cloudinary
      const result = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: "products",
      });

      // Delete the previous product image from Cloudinary
      await cloudinary.uploader.destroy(product.image.public_id);

      product.image.public_id = result.public_id;
      product.image.url = result.secure_url;
    }

    product.itemName = itemName;
    product.price = price;
    product.category = category;
    product.categoryItem = categoryItem;
    product.description = description;

    await product.save();

    res.status(200).json({
      message: "Product updated successfully",
      product: product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to update product" });
    next(error);
  }
};
