import React from 'react'
import { assets } from '../assets/assets'
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="bg-black text-gray-400 px-4 md:px-12 py-1">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8 md:gap-4">

        {/* Logo & Socials */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <img src={assets.logo} alt="Hamad Furniture Logo" className="w-24" />
          <div className="flex gap-3">
            {[FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn].map((Icon, i) => (
              <a key={i} href="#" className="p-2 border border-gray-600 rounded-full hover:text-white hover:border-white transition">
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>

        {/* Links */}
        

        {/* Contact Info */}
        <div className="text-sm text-center md:text-middle space-y-1">
                    <p className="hover:text-white transition">main Office</p>
          <p className="hover:text-white transition">+251-11-123-4567</p>
          <p className="hover:text-white transition">contact@hamadfurniture.com</p>
          <p className="hover:text-white transition">Bole, Addis Ababa</p>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="text-center text-xs text-gray-500 mt-6 border-t border-gray-700 pt-4">
        © 2024 Hamad Furniture. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
