import React from 'react'
import { assets } from '../assets/assets'

const Navbar = ({ setToken }) => {
  return (
    <header className="flex items-center justify-between px-6 md:px-12 py-4 bg-white shadow-md sticky top-0 z-10">
      
      {/* Logo */}
      <div className="flex items-center gap-2">
        <img 
          src={assets.logo} 
          alt="Logo" 
          className="w-auto h-10 sm:h-12 md:h-14 object-contain transition-all duration-300 hover:scale-105"
        />
        <h1 className="text-xl font-semibold text-blue-600 hidden sm:block">Admin Panel</h1>
      </div>

      {/* Logout Button */}
      <button
        onClick={() => setToken('')}
        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 sm:px-6 sm:py-2.5 rounded-full text-sm shadow transition duration-200"
      >
        Logout
      </button>
    </header>
  )
}

export default Navbar
