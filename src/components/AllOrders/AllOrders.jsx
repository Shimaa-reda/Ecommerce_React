import React, { useContext, useEffect, useState } from 'react'
import Style from "./AllOrders.module.css"
import { authContext } from '../../Context/AuthContextProvider'
import axios from 'axios';
export default function AllOrders() {
let {idUser}=useContext(authContext)
console.log(idUser);

async function getUserOrder(){
  let {data}=await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${idUser}`)
  console.log(data);
  
}
useEffect(()=>{
getUserOrder()
},[])

  return (
    <div>
      <h2>AllOrders</h2>
    </div>
  )
}
