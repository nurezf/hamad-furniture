import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';
import { toast } from 'react-toastify';

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  const manualColors = ['red', 'blue', 'green', 'black', 'white'];

  useEffect(() => {
    const fetchProductData = () => {
      const product = products.find(item => item._id === productId);
      if (product) {
        const modifiedProduct = {
          ...product,
          colors: manualColors,
          description: product.description || "This is a manually enhanced product description with more details about the features and benefits."
        };
        setProductData(modifiedProduct);

        if (modifiedProduct.image && modifiedProduct.image.length > 0) {
          setSelectedImage(modifiedProduct.image[0]);
        }
        if (modifiedProduct.colors && modifiedProduct.colors.length > 0) {
          setSelectedColor(modifiedProduct.colors[0]);
        }
      }
    };

    fetchProductData();
  }, [productId, products]);

  if (!productData) {
    return <div className="opacity-0"></div>;
  }

  const handleAddToCart = () => {
    if (!selectedColor && productData.colors && productData.colors.length > 0) {
      toast.error("Please select a color");
      return;
    }
    addToCart(productData._id, selectedColor, );
    toast.success(`$ ${productData.name} added to cart!`);
  };

  const getColorSwatch = (color) => {
    const colorMap = {
      red: 'bg-red-500',
      blue: 'bg-blue-500',
      green: 'bg-green-500',
      black: 'bg-black',
      white: 'bg-white border border-gray-300'
    };
    return (
      <span
        className={`inline-block w-5 h-5 rounded-full mr-2 ${colorMap[color] || 'bg-gray-300'}`}
        title={color}
      />
    );
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="flex gap-8 flex-col lg:flex-row">
        <div className="flex-1 flex flex-col-reverse gap-4 md:flex-row">
          <div className="flex md:flex-col overflow-x-auto md:overflow-y-auto gap-2 md:w-24">
            {productData.image.map((item, index) => (
              <img
                onClick={() => setSelectedImage(item)}
                src={item}
                key={index}
                className={`w-16 h-16 md:w-full md:h-24 object-cover cursor-pointer border-2 rounded-md transition-all ${
                  selectedImage === item 
                    ? 'border-pink-500 scale-105 shadow-md' 
                    : 'border-gray-200 hover:border-pink-300'
                }`}
                alt={`Product thumbnail ${index + 1}`}
              />
            ))}
          </div>
          <div className="w-full md:flex-1">
            <img 
              className="w-full h-auto max-h-[500px] object-contain rounded-lg border border-gray-200 shadow-sm" 
              src={selectedImage} 
              alt={productData.name} 
            />
          </div>
        </div>

        <div className="flex-1 px-4">
          <h1 className="text-3xl font-semibold text-gray-800">{productData.name}</h1>

          <div className="flex items-center gap-1 mt-3">
            {[...Array(4)].map((_, i) => (
              <img key={i} src={assets.star_icon} alt="star" className="w-4" />
            ))}
            <img src={assets.star_dull_icon} alt="star" className="w-4" />
            <span className="text-gray-600 ml-2">(122 reviews)</span>
          </div>

          <p className="mt-4 text-3xl font-semibold text-pink-600">
            {currency}
            {productData.price}
          </p>

          <p className="mt-4 text-gray-600 leading-relaxed">
            {productData.description}
          </p>

          {/* Color Selector */}
          <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-700 mb-3">Select Color</h3>
            <div className="flex flex-wrap gap-3">
              {productData.colors.map((color, index) => (
                <div key={index} className="relative">
                  <input
                    type="radio"
                    id={`color-${index}`}
                    name="color"
                    value={color}
                    checked={selectedColor === color}
                    onChange={() => setSelectedColor(color)}
                    className="hidden peer"
                  />
                  <label
                    htmlFor={`color-${index}`}
                    className={`inline-flex items-center px-4 py-2 border-2 rounded-md cursor-pointer transition-all ${
                      selectedColor === color
                        ? 'bg-pink-100 border-pink-500 text-pink-600 font-medium shadow-md'
                        : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {getColorSwatch(color)}
                    <span className="capitalize">{color}</span>
                  </label>
                  {selectedColor === color && (
                    <div className="absolute -top-2 -right-2 w-5 h-5 bg-pink-500 rounded-full flex items-center justify-center shadow-md">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3 text-white"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
            {selectedColor && (
              <p className="mt-2 text-sm text-gray-500">
                Selected color: <span className="font-medium capitalize">{selectedColor}</span>
              </p>
            )}
          </div>

          

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="mt-8 w-full max-w-md bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 rounded-md shadow-md transition-colors flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
            </svg>
            ADD TO CART
          </button>

          {/* Product Details */}
          <div className="mt-8 border-t pt-6">
            <h3 className="text-lg font-medium text-gray-700 mb-3">Product Details</h3>
            <ul className="text-gray-600 space-y-2 text-sm">
              <li><span className="font-medium">Category:</span> {productData.category}</li>
              <li><span className="font-medium">Subcategory:</span> {productData.subCategory}</li>
              <li><span className="font-medium">Availability:</span> {productData.quantity > 0 ? 'In Stock' : 'Out of Stock'}</li>
              {productData.bestseller && (
                <li className="text-pink-600 font-medium">Bestseller Product</li>
              )}
              <li><span className="font-medium">Material:</span> Premium Quality</li>
              <li><span className="font-medium">Warranty:</span> 1 Year</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-16">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Related Products</h2>
        <RelatedProducts category={productData.category} currentProductId={productId} />
      </div>
    </div>
  );
};

export default Product;
