// models/productModel.js

import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  subCategory: { type: String, required: true },
  colors: { type: [String], required: true },
  quantity: { type: Number, required: true },
  image: { type: [String], default: [] },
  date: { type: Date, default: Date.now }
}, {
  timestamps: true
});

const productModel = mongoose.models.product || mongoose.model("product", productSchema);
export default productModel;
