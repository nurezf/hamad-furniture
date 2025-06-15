import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { backendUrl, currency } from '../App'

const Dashboard = ({ token }) => {
  const [products, setProducts] = useState([])
  const [orders, setOrders] = useState([])

  const fetchStats = async () => {
    try {
      const productRes = await axios.get(`${backendUrl}/api/product/list`)
      const orderRes = await axios.post(`${backendUrl}/api/order/list`, {}, { headers: { token } })

      if (productRes.data.success && orderRes.data.success) {
        setProducts(productRes.data.products)
        setOrders(orderRes.data.orders)
      } else {
        toast.error("Failed to fetch dashboard data")
      }

    } catch (error) {
      toast.error("Error loading dashboard data")
      console.log(error)
    }
  }

  useEffect(() => {
    fetchStats()
  }, [token])

  const totalSales = orders.reduce((acc, order) => acc + (order.payment ? order.amount : 0), 0)
  const completedOrders = orders.filter(o => o.status === 'Delivered').length
  const pendingOrders = orders.filter(o => o.status !== 'Delivered').length
  const lowStock = products.filter(p => p.stock < 5).length

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">📊 Admin Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg shadow">
          <p className="text-sm text-gray-600">Total Products</p>
          <h3 className="text-xl font-bold text-blue-700">{products.length}</h3>
        </div>
        <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-lg shadow">
          <p className="text-sm text-gray-600">Total Sales</p>
          <h3 className="text-xl font-bold text-green-700">{currency}{totalSales}</h3>
        </div>
        <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded-lg shadow">
          <p className="text-sm text-gray-600">Total Orders</p>
          <h3 className="text-xl font-bold text-purple-700">{orders.length}</h3>
        </div>
        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-lg shadow">
          <p className="text-sm text-gray-600">Pending Orders</p>
          <h3 className="text-xl font-bold text-yellow-700">{pendingOrders}</h3>
        </div>
        <div className="bg-indigo-50 border-l-4 border-indigo-500 p-4 rounded-lg shadow">
          <p className="text-sm text-gray-600">Delivered Orders</p>
          <h3 className="text-xl font-bold text-indigo-700">{completedOrders}</h3>
        </div>
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg shadow">
          <p className="text-sm text-gray-600">Low Stock</p>
          <h3 className="text-xl font-bold text-red-700">{lowStock}</h3>
        </div>
      </div>

      {/* Embed Orders & Products Below */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="text-lg font-semibold mb-4">🧾 Recent Orders</h2>
          {orders.slice(0, 5).map((order, index) => (
            <div key={index} className="border-b py-2 text-sm text-gray-700">
              <div className="flex justify-between">
                <span>{order.address.firstName} ({order.paymentMethod})</span>
                <span className="font-medium">{currency}{order.amount}</span>
              </div>
              <p className="text-xs text-gray-500">Status: {order.status} | {new Date(order.date).toLocaleDateString()}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="text-lg font-semibold mb-4">📦 Product Overview</h2>
          {products.slice(0, 5).map((product, index) => (
            <div key={index} className="flex justify-between items-center py-2 border-b text-sm text-gray-700">
              <div className="flex items-center gap-2">
                <img src={product.image[0]} className="w-10 h-10 object-cover rounded-md" alt={product.name} />
                <p className="truncate max-w-[150px]">{product.name}</p>
              </div>
              <span className="text-green-600 font-medium">{currency}{product.price}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
