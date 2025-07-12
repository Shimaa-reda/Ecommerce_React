import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from "../../assets/logo.svg";
import { authContext } from '../../Context/AuthContextProvider';
import { cartContext } from '../../Context/CartContextProvider';
import { themeContext } from '../../Context/ThemeContextProvider'; // ⬅️ استدعاء الثيم كونتكست

export default function Navbar() {
  const { numOfCart, getCart } = useContext(cartContext);
  const { token, setToken } = useContext(authContext);
  const { isDarkMode, setIsDarkMode } = useContext(themeContext); // ⬅️ استخدامه
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  function logout() {
    setToken(null);
    localStorage.removeItem("token");
    navigate("/login");
  }

  useEffect(() => {
    if (token) getCart();
  }, [token]);

  return (
    <nav className='bg-gray-50 dark:bg-gray-900 text-black dark:text-white py-6 w-full z-50 fixed top-0 left-0 shadow-md'>
      <div className="container px-2 sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-7xl mx-auto flex items-center justify-between">

        {/* Logo */}
       <Link
  to="/"
  className="dark:text-gray-50 flex items-center gap-2 text-2xl font-bold whitespace-nowrap"
>
  <i className="fas fa-shopping-cart text-green-700 dark:text-white text-xl"></i>
  <span>Fresh Cart</span>
</Link>


        {/* Toggle button */}
        <button
          className="block lg:hidden text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          <i className={`fas ${isOpen ? 'fa-times' : 'fa-bars'}`}></i>
        </button>

        {/* Nav Links */}
        <div className={`w-full lg:flex lg:items-center lg:justify-center lg:static absolute top-full left-0 bg-gray-50 dark:bg-gray-900 px-4 py-2 lg:p-0 transition-all duration-300 ease-in-out ${isOpen ? 'block' : 'hidden'}`}>
          {token && (
            <ul className='flex flex-col lg:flex-row gap-4 lg:gap-6 mt-2 lg:mt-0 justify-center w-full lg:text-center'>
              <li><Link to="/" className="hover:text-green-600">Home</Link></li>
              <li><Link to="/cart" className="hover:text-green-600">Cart</Link></li>
              <li><Link to="/products" className="hover:text-green-600">Products</Link></li>
              <li><Link to="/categories" className="hover:text-green-600">Categories</Link></li>
              <li><Link to="/brands" className="hover:text-green-600">Brands</Link></li>
              <li><Link to="/wishlist" className="hover:text-green-600">Wishlist</Link></li>
            </ul>
          )}

          {/* Auth & Cart & Theme */}
          <ul className="flex flex-col lg:flex-row gap-3 items-center text-left mt-4 lg:mt-0 lg:ms-auto">
            {/* 🌙 Theme Toggle */}
            <li>
              <button
                onClick={() => setIsDarkMode(prev => !prev)}
                className="text-xl px-2 hover:text-green-600"
                title="Toggle Theme"
              >
                <i className={`fas ${isDarkMode ? 'fa-sun' : 'fa-moon'}`}></i>
              </button>
            </li>

            {/* 🛒 Cart */}
            {token && (
              <li className="relative">
                <Link to="/cart" className="flex items-center gap-1">
                  <i className="fas fa-shopping-cart text-gray-700 dark:text-white text-xl"></i>
                  <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                    {numOfCart}
                  </span>
                </Link>
              </li>
            )}

            {/* 🔐 Auth Links */}
            {token ? (
              <li onClick={logout} className="cursor-pointer text-gray-700 dark:text-white hover:text-red-600">
                Logout
              </li>
            ) : (
              <div className="flex flex-col lg:flex-row gap-2">
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
              </div>
            )}
          </ul>
        </div>

      </div>
    </nav>
  );
}
