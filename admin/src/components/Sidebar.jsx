import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'

const Sidebar = () => {
  return (
    <div className="w-full md:w-[18%] min-h-screen bg-white text-gray-700 shadow-lg flex flex-col border-r">
      
      {/* Logo or App Name */}
    

      {/* Navigation */}
      <nav className="flex flex-col gap-2 mt-6 px-4 text-sm font-medium">
        <SidebarLink to="/dashboard" icon={assets.dashboard_icon} label="Dashboard" />
        <SidebarLink to="/add" icon={assets.add_icon} label="Add Items" />
        <SidebarLink to="/list" icon={assets.order_icon} label="List Items" />
        <SidebarLink to="/orders" icon={assets.order_icon} label="Orders" />
      </nav>

      {/* Footer */}
      <div className="mt-auto p-4 text-xs text-gray-400 border-t border-gray-200">
        © 2025 malik dev. All rights reserved.
      </div>
    </div>
  )
}

const SidebarLink = ({ to, icon, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group
        ${isActive
          ? 'bg-blue-600 text-white font-semibold shadow'
          : 'hover:bg-blue-50 hover:text-blue-700 text-gray-700'}`
    }
  >
    <img className="w-5 h-5 group-hover:scale-110 transition-transform" src={icon} alt={label} />
    <span className="hidden md:block">{label}</span>
  </NavLink>
)

export default Sidebar
