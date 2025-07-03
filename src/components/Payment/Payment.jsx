import React, { useContext, useEffect, useState } from 'react'
import Style from "./Payment.module.css"
import { useFormik } from 'formik'
import { authContext } from '../../Context/AuthContextProvider';
import { cartContext } from '../../Context/CartContextProvider';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export default function Payment() {

  let Navigate=useNavigate()

  let {token}=useContext(authContext);
  let {cartId}=useContext(cartContext)
   let [cashFlag,setCashFlag]=useState(false);
 

  function cashOrder(values){
   
    console.log(values);

    axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,values,{
      headers:{
        token
      }
    }).then((res)=>{
      console.log(res);
      Navigate("/allorders")
      
    }).catch((error)=>{
      console.log(error);
      
    })
    

  }
  function onlinePayment(values){
    axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173`,values,{
      headers:{
        token
      }
    }).then((res)=>{
      window.open(res.data.session.url,"_self")
    }).catch((error)=>{
      console.log(error);
      
    })
  }
  function paymentOrder(values){
     let shippingAddress={
      shippingAddress:values
    }

    if(cashFlag){
      cashOrder(shippingAddress)
    }
    else{
      onlinePayment(shippingAddress)
    }

  }

  let paymentForm=useFormik({
    initialValues:{
       details: "",
        phone: "",
        city: ""

    },
    onSubmit:paymentOrder
  })

  return <>
  <form onSubmit={paymentForm.handleSubmit} class="w-1/2 my-5 mx-auto">
  <div class="relative z-0 w-full mb-5 group">
      <input type="text" 
      name='details'
      value={paymentForm.values.details}
      onChange={paymentForm.handleChange}
      
      id="floating_details" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "  />
      <label for="floating_details" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Details</label>
  </div>
  <div class="relative z-0 w-full mb-5 group">
      <input type="tel" 
      name='phone'
      value={paymentForm.values.phone}
      onChange={paymentForm.handleChange}
      
      id="floating_phone" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "  />
      <label for="floating_phone" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone</label>
  </div>
  <div class="relative z-0 w-full mb-5 group">
      <input type="text" 
      name='city'
      value={paymentForm.values.city}
      onChange={paymentForm.handleChange}
      
      id="floating_city" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "  />
      <label for="floating_city" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">City</label>
  </div>

  <button onClick={()=>setCashFlag(true)} type="submit" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Cash</button>
  <button onClick={()=>setCashFlag(false)} type="submit" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Online</button>


  </form>
  
  </>
}
