import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import axios from 'axios';

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadOrderData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await axios.post(
        `${backendUrl}/api/order/userorders`,
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        let allOrdersItem = [];
        
        response.data.orders.forEach((order) => {
          order.items.forEach((item) => {
            // Validate and ensure item has required properties
            if (!item.image || !Array.isArray(item.image)) {
              item.image = [''];
            }
            
            if (!item.name) item.name = 'Unnamed Product';
            if (!item.price) item.price = 0;
            if (!item.quantity) item.quantity = 1;
            if (!item.size) item.size = 'N/A';

            allOrdersItem.push({
              ...item,
              status: order.status || 'Processing',
              payment: order.payment || 'Unpaid',
              paymentMethod: order.paymentMethod || 'Unknown',
              date: order.date || new Date().toISOString()
            });
          });
        });

        setOrderData(allOrdersItem.reverse());
      } else {
        throw new Error(response.data.message || 'Failed to load orders');
      }
    } catch (error) {
      console.error('Error loading orders:', error);
      setError(error.message || 'An error occurred while loading your orders');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  if (loading) {
    return (
      <div className="border-t pt-16">
        <div className="text-2xl">
          <Title text1={'MY'} text2={'ORDERS'} />
        </div>
        <div className="py-8 text-center">Loading your orders...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="border-t pt-16">
        <div className="text-2xl">
          <Title text1={'MY'} text2={'ORDERS'} />
        </div>
        <div className="py-8 text-center text-red-500">
          {error}
          <button 
            onClick={loadOrderData} 
            className="mt-4 block mx-auto border px-4 py-2 text-sm font-medium rounded-sm hover:bg-gray-100"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (orderData.length === 0) {
    return (
      <div className="border-t pt-16">
        <div className="text-2xl">
          <Title text1={'MY'} text2={'ORDERS'} />
        </div>
        <div className="py-8 text-center text-gray-500">You haven't placed any orders yet.</div>
      </div>
    );
  }

  return (
    <div className="border-t pt-16">
      <div className="text-2xl">
        <Title text1={'MY'} text2={'ORDERS'} />
      </div>

      <div className="space-y-4">
        {orderData.map((item, index) => (
          <div 
            key={`${item._id || index}-${item.date}`} 
            className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          >
            <div className="flex items-start gap-6 text-sm">
              <img 
                className="w-16 sm:w-20 object-cover" 
                src={item.image[0] || '/placeholder-product.jpg'} 
                alt={item.name} 
                onError={(e) => {
                  e.target.src = '/placeholder-product.jpg';
                }}
              />
              <div>
                <p className="sm:text-base font-medium">{item.name}</p>
                <div className="flex items-center gap-3 mt-1 text-base text-gray-700">
                  <p>{currency}{item.price.toFixed(2)}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Size: {item.size}</p>
                </div>
                <p className="mt-1">
                  Date: <span className="text-gray-400">{new Date(item.date).toDateString()}</span>
                </p>
                <p className="mt-1">
                  Payment: <span className="text-gray-400">{item.paymentMethod}</span>
                </p>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-between">
              <div className="flex items-center gap-2">
                <div className={`min-w-2 h-2 rounded-full ${
                  item.status === 'Delivered' ? 'bg-green-500' :
                  item.status === 'Cancelled' ? 'bg-red-500' :
                  'bg-yellow-500'
                }`}></div>
                <p className="text-sm md:text-base capitalize">{item.status.toLowerCase()}</p>
              </div>
              <button 
                onClick={loadOrderData} 
                className="border px-4 py-2 text-sm font-medium rounded-sm hover:bg-gray-100"
              >
               Track  Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;