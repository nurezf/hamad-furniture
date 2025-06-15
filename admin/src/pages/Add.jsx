import React, { useState, useEffect } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Add = ({ token }) => {
  console.log("Token in Add component:", token);
  if (!token) {
    toast.error("You are not authorized to access this page. Please log in.");
    return null; // Prevent rendering if token is not available
  }
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [bestseller, setBestseller] = useState(false);
  const [colors, setColors] = useState([]);

  const colorOptions = ["Red", "Blue", "Green", "Black", "White"];

  const subcategoryOptions = {
    Chair: ["Ergonomic Chair", "Executive Chair", "Conference Chair"],
    Table: ["Mango Wood Table", "Office Table", "Metal Table"],
    Shelf: ["Wooden Shelf", "Glass Shelf", "Plastic Shelf"],
  };

  useEffect(() => {
    // Reset subCategory when category changes
    if (category) {
      setSubCategory(subcategoryOptions[category][0]);
    } else {
      setSubCategory("");
    }
  }, [category]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("quantity", quantity);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("colors", JSON.stringify(colors));
      formData.append("bestseller", bestseller);

      if (image1) formData.append("image1", image1);
      if (image2) formData.append("image2", image2);
      if (image3) formData.append("image3", image3);
      if (image4) formData.append("image4", image4);

      const response = await axios.post(
        `http://localhost:4000/api/product/add`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setName("");
        setDescription("");
        setQuantity("");
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setColors([]);
        setBestseller(false);
        setCategory("");
        setSubCategory("");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg border border-gray-200"
    >
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 border-b pb-3">
        Add New Product
      </h2>

      {/* Image Upload */}
      <div>
        <p className="mb-2 font-medium text-gray-700">Upload Images (Max 4)</p>
        <div className="flex gap-4 flex-wrap">
          {[image1, image2, image3, image4].map((img, idx) => (
            <label
              key={idx}
              htmlFor={`image${idx + 1}`}
              className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-md cursor-pointer flex items-center justify-center overflow-hidden relative hover:border-pink-500 transition-colors"
            >
              {img ? (
                <img
                  src={URL.createObjectURL(img)}
                  alt={`Preview ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <img
                  src={assets.upload_area}
                  alt="upload placeholder"
                  className="w-12 h-12 opacity-50"
                />
              )}
              <input
                id={`image${idx + 1}`}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const setters = [
                      setImage1,
                      setImage2,
                      setImage3,
                      setImage4,
                    ];
                    setters[idx](file);
                  }
                }}
              />
            </label>
          ))}
        </div>
      </div>

      {/* Product Info */}
      <div className="mt-6 space-y-5">
        <div>
          <label
            htmlFor="name"
            className="block mb-2 font-medium text-gray-700"
          >
            Product Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Type product name"
            required
            className="w-full max-w-lg px-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block mb-2 font-medium text-gray-700"
          >
            Product Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Write product details"
            required
            rows={4}
            className="w-full max-w-lg px-4 py-2 border rounded-md border-gray-300 resize-none focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
        </div>

        {/* Category & Subcategory */}
        <div className="flex flex-col sm:flex-row gap-6 max-w-lg">
          <div className="flex-1">
            <label
              htmlFor="category"
              className="block mb-2 font-medium text-gray-700"
            >
              Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
            >
              <option value="">Select Category</option>
              <option value="Chair">Chair</option>
              <option value="Table">Table</option>
              <option value="Shelf">Shelf</option>
            </select>
          </div>

          <div className="flex-1">
            <label
              htmlFor="subcategory"
              className="block mb-2 font-medium text-gray-700"
            >
              Sub Category
            </label>
            <select
              id="subcategory"
              value={subCategory}
              onChange={(e) => setSubCategory(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
              disabled={!category}
            >
              {category &&
                subcategoryOptions[category].map((sub) => (
                  <option key={sub} value={sub}>
                    {sub}
                  </option>
                ))}
            </select>
          </div>
        </div>

        {/* Quantity */}
        <div>
          <label
            htmlFor="quantity"
            className="block mb-2 font-medium text-gray-700"
          >
            Quantity
          </label>
          <input
            id="quantity"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="10"
            required
            className="w-full max-w-lg px-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
            min="0"
          />
        </div>

        {/* Colors */}
        <div>
          <p className="mb-2 font-medium text-gray-700">Select Colors</p>
          <div className="flex flex-wrap gap-3 max-w-lg">
            {colorOptions.map((color) => (
              <button
                key={color}
                type="button"
                onClick={() =>
                  setColors((prev) =>
                    prev.includes(color)
                      ? prev.filter((c) => c !== color)
                      : [...prev, color]
                  )
                }
                className={`px-4 py-1 rounded-md font-medium cursor-pointer transition ${
                  colors.includes(color)
                    ? "bg-pink-500 text-white shadow-lg"
                    : "bg-gray-200 text-gray-700 hover:bg-pink-200"
                }`}
              >
                {color}
              </button>
            ))}
          </div>
        </div>

        {/* Bestseller */}
        <div className="flex items-center gap-2 max-w-lg">
          <input
            type="checkbox"
            id="bestseller"
            checked={bestseller}
            onChange={() => setBestseller((prev) => !prev)}
            className="w-5 h-5 accent-pink-500 cursor-pointer"
          />
          <label
            htmlFor="bestseller"
            className="cursor-pointer text-gray-700 font-medium"
          >
            Add to Bestseller
          </label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full max-w-lg bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 rounded-md shadow-md transition"
        >
          Add Product
        </button>
      </div>
    </form>
  );
};

export default Add;
