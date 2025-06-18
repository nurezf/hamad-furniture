import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) return;

    try {
      const response = await axios.post(
        backendUrl + "/api/order/list",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.success) {
        setOrders(response.data.orders.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error(error.message);
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/order/status",
        { orderId, status: event.target.value },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.success) {
        await fetchAllOrders();
      }
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div className="p-4 md:p-8">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">📦 Orders</h3>
      <div className="space-y-6">
        {orders.map((order, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-2xl p-6 border border-gray-100 transition hover:shadow-2xl"
          >
            <div className="grid grid-cols-1 sm:grid-cols-[50px_1fr] gap-4">
              <img
                className="w-12 h-12 object-contain"
                src={assets.parcel_icon}
                alt="Parcel"
              />
              <div className="space-y-2">
                <div className="flex flex-wrap gap-x-2 text-sm font-medium text-gray-700">
                  {order.items.map((item, idx) => (
                    <p key={idx}>
                      {item.name} x {item.quantity}{" "}
                      <span className="text-xs font-normal text-gray-500">
                        ({item.size})
                      </span>
                      {idx < order.items.length - 1 && ","}
                    </p>
                  ))}
                </div>

                <div className="mt-2">
                  <p className="font-semibold">
                    {order.address.firstName} {order.address.lastName}
                  </p>
                  <p>
                    {order.address.street}, {order.address.city},{" "}
                    {order.address.state}
                  </p>
                  <p>
                    {order.address.country} - {order.address.zipcode}
                  </p>
                  <p className="text-sm text-gray-600">{order.address.phone}</p>
                </div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-700">
              <div>
                <p>
                  🛒 Quantity:{" "}
                  <span className="font-semibold">
                    {order.items.reduce(
                      (total, item) => total + item.quantity,
                      0
                    )}
                  </span>
                </p>
                <p>
                  🧾 Payment:{" "}
                  <span
                    className={
                      order.payment
                        ? "text-green-600 font-medium"
                        : "text-red-500 font-medium"
                    }
                  >
                    {order.payment ? "Done" : "Pending"}
                  </span>
                </p>
              </div>
              <div>
                <p>💳 Method: {order.paymentMethod}</p>
                <p>📅 Date: {new Date(order.date).toLocaleDateString()}</p>
              </div>
              <div>
                <p>
                  💰 Total:{" "}
                  <span className="font-bold">
                    {currency}
                    {order.amount}
                  </span>
                </p>
              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Status:
                </label>
                <select
                  onChange={(event) => statusHandler(event, order._id)}
                  value={order.status}
                  className="w-full p-2 rounded-lg border border-gray-300 shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="Order Placed">Order Placed</option>
                  <option value="Packing">Packing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Out for delivery">Out for delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
