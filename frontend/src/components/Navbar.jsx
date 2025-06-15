import React, { useContext, useState, useEffect } from 'react';
import { assets } from '../assets/assets';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const {
    setShowSearch,
    getCartCount,
    token,
    setToken,
    setCartItems
  } = useContext(ShopContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    setToken('');
    setCartItems({});
    setVisible(false);
    setProfileOpen(false);
    navigate('/login');
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.mobile-sidebar') && visible) {
        setVisible(false);
      }
      if (!e.target.closest('.profile-dropdown') && profileOpen) {
        setProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [visible, profileOpen]);

  // Navigation items data
  const navItems = [
    { path: '/', label: 'HOME' },
    { path: '/collection', label: 'COLLECTION' },
    { path: '/about', label: 'ABOUT' },
    { path: '/contact', label: 'CONTACT' },
    ...(token ? [{ path: '/orders', label: 'ORDERS' }] : [])
  ];

  return (
    <header className="bg-white sticky top-0 z-50 shadow-md py-4 px-6 sm:px-10 flex items-center justify-between w-full">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2">
        <img
          src={assets.logo}
          alt="Hamad Furniture Logo"
          className="h-10 sm:h-12 transition-transform duration-300 hover:scale-105"
        />
        <span className="text-lg sm:text-xl font-semibold text-blue-600 hidden sm:inline">
          Hamad Furniture
        </span>
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden sm:block">
        <ul className="flex gap-6 text-sm font-medium text-gray-700">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `transition-all duration-200 hover:text-blue-600 ${
                    isActive
                      ? 'text-blue-600 font-semibold border-b-2 border-blue-600 pb-1'
                      : ''
                  }`
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Icons Section */}
      <div className="flex items-center gap-5 sm:gap-6">
        {/* Search Icon */}
        <button
          aria-label="Search"
          onClick={() => {
            setShowSearch(true);
            navigate('/collection');
          }}
          className="p-1 hover:scale-110 transition"
        >
          <img src={assets.search_icon} className="w-5" alt="" />
        </button>

        {/* Profile Dropdown */}
        <div className="relative profile-dropdown">
          <button
            aria-label="Profile"
            onClick={() => (token ? setProfileOpen(!profileOpen) : navigate('/login'))}
            className="p-1 hover:scale-110 transition"
          >
            <img src={assets.profile_icon} className="w-5" alt="" />
          </button>
          
          {token && profileOpen && (
            <div className="absolute right-0 mt-2 bg-white border shadow-md rounded-md py-2 w-48 z-50 text-sm">
             <button
  onClick={() => {
    navigate('/profile');
    setProfileOpen(false);
  }}
  className="block w-full text-left px-4 py-2 hover:bg-gray-100 hover:text-blue-600"
>
  My Profile
</button>
              <button
                onClick={() => {
                  navigate('/orders');
                  setProfileOpen(false);
                }}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 hover:text-blue-600"
              >
                My Orders
              </button>
              <button
                onClick={logout}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500 hover:text-red-600"
              >
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Cart Icon with Counter */}
        <Link to="/cart" className="relative p-1 hover:scale-110 transition">
          <img src={assets.cart_icon} className="w-5" alt="Cart" />
          {getCartCount() > 0 && (
            <span className="absolute -bottom-1 -right-2 bg-blue-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {getCartCount()}
            </span>
          )}
        </Link>

        {/* Mobile Menu Button */}
        <button
          aria-label="Menu"
          onClick={() => setVisible(true)}
          className="p-1 sm:hidden hover:scale-110 transition"
        >
          <img src={assets.menu_icon} className="w-6" alt="" />
        </button>
      </div>

      {/* Mobile Sidebar */}
      <aside
        className={`fixed top-0 right-0 h-full bg-white shadow-lg z-40 transition-all duration-300 ease-in-out ${
          visible ? 'w-3/4 sm:w-1/2' : 'w-0'
        } overflow-x-hidden mobile-sidebar`}
        aria-hidden={!visible}
      >
        <div className="flex flex-col p-6 gap-4 text-gray-700 h-full">
          {/* Close Button */}
          <button
            onClick={() => setVisible(false)}
            className="flex items-center gap-2 self-start mb-4"
          >
            <img className="w-4 rotate-180" src={assets.dropdown_icon} alt="" />
            <span>Close</span>
          </button>

          {/* Mobile Navigation */}
          <nav>
            <ul className="space-y-4">
              {navItems.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    onClick={() => setVisible(false)}
                    className={({ isActive }) =>
                      `block py-3 px-2 border-b ${
                        isActive ? 'text-blue-600 font-medium' : ''
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
              {token && (
                <li>
                  <button
                    onClick={logout}
                    className="block w-full text-left py-3 px-2 border-b text-red-500 hover:text-red-600"
                  >
                    LOGOUT
                  </button>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </aside>
    </header>
  );
};

export default Navbar;