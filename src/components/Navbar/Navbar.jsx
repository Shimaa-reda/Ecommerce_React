import React, { useEffect, useState } from 'react'
import Style from "./Navbar.module.css"
import { Link, useNavigate } from 'react-router-dom'
import logo from "../../assets/logo.svg"
import { useContext } from 'react'
import { authContext } from '../../Context/AuthContextProvider'
import { cartContext } from '../../Context/CartContextProvider'
export default function Navbar() {
let { numOfCart,getCart } = useContext(cartContext);

  let navigate=useNavigate();

  let {token,setToken}=useContext(authContext);
      console.log(token)

  function logout(){
    setToken(null)

    // remove token from localstorage
    localStorage.removeItem("token")

    // navigate to login page
    navigate("/login")

  }
  useEffect(() => {
  if (token) {
    getCart();
  }
}, [token]);


  return <> 
  <nav className='bg-gray-300 py-4  w-full z-50 top-0 overflow-auto fixed left-0 shadow-md'>
    <div className="container sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-7xl  mx-auto flex items-center ">
        <Link to="/">
    <img src={logo} alt="logo " />
    
    </Link>
   {token?<ul className='flex gap-4 ms-4'>
      <li>
        <Link to="/">Home</Link>
      </li>
       <li>
        <Link to="/cart">Cart</Link>
      </li> <li>
        <Link to="/products">Products</Link>
      </li> <li>
        <Link to="/categories">Categories</Link>
      </li> <li>
        <Link to="/brands">Brands</Link>
      </li>
       <li>
       <Link to="/wishlist">Wishlist</Link>
      </li>
    </ul>:null}
    

    {/* <ul className='flex ms-auto gap-3'>
      <li>
        <i className='fab fa-facebook-f'></i>
      </li>
      <li>
        <i className='fab fa-tiktook'></i>
      </li><li>
        <i className='fab fa-twitter'></i>
      </li><li>
        <i className='fab fa-yahoo'></i>
      </li>
      <li>
        <i className='fab fa-github'></i>
      </li>
      {token?<li  onClick={()=>logout()}>Signout</li>: <div className='flex gap-2'>
        <Link to="/login">Login</Link>
      <Link to="/register">Register</Link></div>}
      

      

    </ul> */}

    <ul className='flex ms-auto gap-3 items-center'>
  <li className="relative">
    <Link to="/cart" className="flex items-center gap-1">
      <i className="fas fa-shopping-cart text-gray-700 text-xl"></i>
      { 
        <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
          {numOfCart}
        </span>
      }
    </Link>
  </li>

  {token ? (
    <li onClick={logout} className="cursor-pointer text-gray-700 hover:text-red-600">log out</li>
  ) : (
    <div className="flex gap-2">
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
    </div>
  )}
</ul>

    </div>
    
  </nav>
  </>
}
