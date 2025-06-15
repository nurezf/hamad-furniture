import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';

const Cart = () => {
  const { products, cartItems, updateQuantity, navigate } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (products && products.length > 0) {
      const tempData = [];
      for (const productId in cartItems) {
        for (const color in cartItems[productId]) {
          if (cartItems[productId][color] > 0) {
            tempData.push({
              _id: productId,
              color: color,
              quantity: cartItems[productId][color]
            });
          }
        }
      }
      setCartData(tempData);
    }
  }, [cartItems, products]);

  if (!products || products.length === 0) {
    return <div>Loading products...</div>;
  }

  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <Title text1="YOUR" text2="CART" />
      </div>

      <div>
        {cartData.map((item, index) => {
          const productData = products.find((product) => product._id === item._id);

          return (
            <div
              key={index}
              className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
            >
              {productData ? (
                <div className="flex items-start gap-6">
                  <img 
                    className="w-16 sm:w-20" 
                    src={productData.image?.[0] || assets.placeholder_image} 
                    alt={productData.name || 'Product image'} 
                  />
                  <div>
                    <p className="text-xs sm:text-lg font-medium">{productData.name}</p>
                    <div className="flex items-center gap-5 mt-2">
                      <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50 capitalize">
                        {item.color}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-red-500">Product not found</div>
              )}

              <input
                type="number"
                min={1}
                defaultValue={item.quantity}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === '' || value === '0') return;
                  updateQuantity(item._id, item.color, Number(value));
                }}
                className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
              />

              <img
                onClick={() => updateQuantity(item._id, item.color, 0)}
                className="w-4 mr-4 sm:w-5 cursor-pointer"
                src={assets.bin_icon}
                alt="Remove"
              />
            </div>
          );
        })}
      </div>

      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal />
          <div className="w-full text-end">
            <button
              onClick={() => navigate('/place-order')}
              className="bg-black text-white text-sm my-8 px-8 py-3"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;