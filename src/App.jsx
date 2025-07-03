import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Home from './components/Home/Home'
import Products from './components/Products/Products'
import Cart from './components/Cart/Cart'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import Brands from './components/Brands/Brands'
import Categories from './components/Categories/Categories'
import NotFoundPage from './components/NotFoundPage/NotFoundPage'
import AuthContextProvider from './Context/AuthContextProvider'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import ProductDetails from './components/ProductDetails/ProductDetails'
import CartContextProvider from './Context/CartContextProvider'
import { Toaster } from 'react-hot-toast'
import Payment from './components/Payment/Payment'
import AllOrders from './components/AllOrders/AllOrders'
import Wishlist from './components/Wishlist/Wishlist'
import WishlistContextProvider from './Context/WishlistContextProvider'






export default function App() {
  const router=createBrowserRouter([
    {path:"",element:<Layout/>,children:[
      {path:"",element:<Home/>},
      {path:"products",element:<ProtectedRoute><Products/></ProtectedRoute> },
      {path:"payment",element:<ProtectedRoute><Payment/></ProtectedRoute> },
      {path:"allorders",element:<ProtectedRoute><AllOrders/></ProtectedRoute> },
      {path:"wishlist",element:<ProtectedRoute><Wishlist/></ProtectedRoute> },

      


      {path:"productDetails/:id/:category",element:<ProtectedRoute><ProductDetails/></ProtectedRoute> },
      {path:"cart",element:<ProtectedRoute><Cart/></ProtectedRoute>},
      {path:"brands",element:<ProtectedRoute><Brands/></ProtectedRoute>},
      {path:"categories",element:<ProtectedRoute><Categories/></ProtectedRoute>},
      {path:"login",element:<Login/>},
      {path:"register",element:<Register/>},
      {path:"*",element:<NotFoundPage/>},

    ]}
  ])
  return <>
 
  <AuthContextProvider>
  <CartContextProvider>
    <WishlistContextProvider>
      <RouterProvider router={router} />
      <Toaster />
    </WishlistContextProvider>
  </CartContextProvider>
</AuthContextProvider>


 

   
  
  </>
}
