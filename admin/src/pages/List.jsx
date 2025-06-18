import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";

const List = ({ token }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      if (response.data.success) {
        setList(response.data.products.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/product/remove`,
        { id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4">📦 All Products List</h2>
      <div className="flex flex-col gap-2">
        {/* Table Header */}
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr_0.5fr] items-center py-3 px-4 border bg-gray-100 rounded-md text-sm font-semibold text-gray-700">
          <span>Image</span>
          <span>Name</span>
          <span>Category</span>
          <span>quantity</span>
          <span className="text-center">Action</span>
        </div>

        {/* Product List */}
        {list.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr_0.5fr] items-center gap-2 py-3 px-4 border rounded-md shadow-sm bg-white hover:bg-gray-50 transition duration-200 ease-in-out"
          >
            <img
              className="w-12 h-12 object-cover rounded-md border"
              src={item.image[0]}
              alt={item.name}
            />
            <p className="truncate">{item.name}</p>
            <p className="text-sm text-gray-600">{item.category}</p>
            <p className="text-sm text-gray-700">{item.quantity ?? "-"}</p>
            <button
              onClick={() => removeProduct(item._id)}
              className="text-red-600 hover:text-red-800 text-center font-bold text-lg transition duration-150"
              title="Remove Product"
            >
              ×
            </button>
          </div>
        ))}

        {list.length === 0 && (
          <p className="text-center text-gray-500 mt-6">No products found.</p>
        )}
      </div>
    </div>
  );
};

export default List;
