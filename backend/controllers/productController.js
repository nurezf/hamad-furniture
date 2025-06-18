// controllers/productController.js

import cloudinary from "../config/cloudinary.js";
import productModel from "../models/productModel.js";

// Add product
// Add product
const addProduct = async (req, res) => {
  try {
    const { name, description, category, subCategory, colors, quantity } =
      req.body;

    if (
      !name ||
      !description ||
      !category ||
      !subCategory ||
      !colors ||
      !quantity
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields." });
    }

    // Defensive check for multer input structure
    const imageFiles = [
      ...(req.files?.image1 || []),
      ...(req.files?.image2 || []),
      ...(req.files?.image3 || []),
      ...(req.files?.image4 || []),
    ];

    console.log("Received image files:", imageFiles);

    // Validate presence of files before uploading
    if (imageFiles.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "At least one image is required." });
    }

    const imagesUrl = await Promise.all(
      imageFiles.map(async (file) => {
        if (!file?.path) {
          throw new Error(
            "File path is missing for one of the uploaded images."
          );
        }

        const result = await cloudinary.uploader.upload(file.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );

    console.log("Uploaded image URLs:", imagesUrl);

    const parsedColors =
      typeof colors === "string" ? JSON.parse(colors) : colors;

    const productData = {
      name,
      description,
      category,
      subCategory,
      colors: parsedColors,
      quantity: parseInt(quantity),
      image: imagesUrl,
      date: new Date(),
    };

    const product = new productModel(productData);
    await product.save();

    res.json({ success: true, message: "Product added successfully." });
  } catch (error) {
    console.error("Error adding product:", error.message || error);
    res.status(500).json({ success: false, message: "Failed to add product." });
  }
};

// List all products
const listProducts = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.json({ success: true, products });
  } catch (error) {
    console.error("Error listing products:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch products." });
  }
};

// Remove product by ID
const removeProduct = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id)
      return res
        .status(400)
        .json({ success: false, message: "Product ID is required." });

    const deletedProduct = await productModel.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found." });
    }

    res.json({ success: true, message: "Product removed successfully." });
  } catch (error) {
    console.error("Error removing product:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to remove product." });
  }
};

// Get single product details
const singleProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    if (!productId)
      return res
        .status(400)
        .json({ success: false, message: "Product ID is required." });

    const product = await productModel.findById(productId);
    if (!product)
      return res
        .status(404)
        .json({ success: false, message: "Product not found." });

    res.json({ success: true, product });
  } catch (error) {
    console.error("Error fetching product:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch product." });
  }
};

export { addProduct, listProducts, removeProduct, singleProduct };
