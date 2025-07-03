import React, { useContext, useEffect, useState } from 'react'
import Style from "./Cart.module.css"
import CartContextProvider, { cartContext } from '../../Context/CartContextProvider'
import { ClipLoader } from 'react-spinners';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { wishlistContext } from '../../Context/WishlistContextProvider';
export default function Cart() {

  let {getCart,updateQuantityProduct,ClearCart,products,numOfCart,totalPrice,Loading,removeProduct}=useContext(cartContext);
  

  // mounting get cart
  useEffect(()=>{
    getCart()
  },[])

  // if(Loading){
  //   return <div className='h-screen flex justify-center items-center'>
  //      <i className="fas fa-spinner fa-spin"></i>
  //    </div>
  // }

  async function removeItemFromCart(id){
    let flag= await removeProduct(id);
      if(flag){
    
    toast.success('Deleted created!');
   }
   else{
   
    toast.error('This is an error!');
   }
  }
  async function updateQuantity(id,count){
   let flag= await updateQuantityProduct(id,count);
   if(flag){
    
    toast.success('Updated Successfully !');
   }
   else{
   
    toast.error('This is an error!');
   }
  }

  async function deletCart(){
   let flag= await ClearCart();
   if(flag){
    
    toast.success('Cart Deleted  !');
   }
   else{
   
    toast.error('This is an error!');
   }
  }

   if(Loading){
    return <div className='flex justify-center h-screen items-center'><ClipLoader /></div>
  }
  return <>
  <div className="text-center my-6 flex justify-between">
    <div className="info">
      <h2>numOfProducts in your cart:{numOfCart}</h2>
    <h2>totalCartPrice:{totalPrice}</h2>
    </div>
    
    <button onClick={()=>deletCart()} type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Delete Cart</button>

    {/* <p>{products}</p> */}


  </div>

 {products?.length>0? <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" className="px-16 py-3">
          <span className="sr-only">Image</span>
        </th>
        <th scope="col" className="px-6 py-3">
          Product
        </th>
        <th scope="col" className="px-6 py-3">
          Qty
        </th>
        <th scope="col" className="px-6 py-3">
          Price
        </th>
        <th scope="col" className="px-6 py-3">
          Action
        </th>
      </tr>
    </thead>
    <tbody>
     {products?.map((product)=> <tr key={product.product._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
        <td className="p-4">
          <img src={product.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt="Apple Watch" />
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
          {product.product.title}
        </td>
        <td className="px-6 py-4">
          <div className="flex items-center">
            <button onClick={()=>{updateQuantity(product.product._id,product.count-1)}} className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
              <span className="sr-only">Quantity button</span>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
              </svg>
            </button>
            <div>
              <input type="number" id="first_product" className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={product.count} required />
            </div>
            <button onClick={()=>{updateQuantity(product.product._id,product.count+1)}} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
              <span className="sr-only">Quantity button</span>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
              </svg>
            </button>
          </div>
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
         {product.price} EGP
        </td>
        <td className="px-6 py-4">
          <span onClick={()=>{removeItemFromCart(product.product._id)}} href="#" className="cursor-pointer font-medium text-red-600 dark:text-red-500 hover:underline">Remove</span>
        </td>
      </tr>)}
     
    </tbody>
  </table>
<div className="my-5 ms-3">
  <Link
    to="/payment"
    className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
  >
    Payment
  </Link>
</div>



</div>




:<div className='h-[465px] flex items-center justify-center'>Your Cart is Empty</div>}
  
  
  </>
}
