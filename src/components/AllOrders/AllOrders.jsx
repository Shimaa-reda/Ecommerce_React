import React, { useContext, useEffect, useState } from 'react'
import Style from "./AllOrders.module.css"
import { authContext } from '../../Context/AuthContextProvider'
import axios from 'axios';
export default function AllOrders() {
let {idUser}=useContext(authContext)
let [orders,setOrders]=useState(null)
console.log(idUser);

async function getUserOrder(){
  let {data}=await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${idUser}`)
  console.log(data);
  setOrders(data)
  
}
// useEffect(()=>{
// getUserOrder()
// },[])
useEffect(() => {
    if (idUser) {
      getUserOrder()
    }
  }, [idUser])

return (
  <div className="p-4">
    <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">All Orders</h2>

    {orders && orders.length > 0 ? (
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-800 dark:text-gray-400">
            <tr>
              
              {/* <th className="px-6 py-3 bg-gray-50 dark:bg-gray-800">Total Price</th> */}
              <th className="px-6 py-3">Payment Method</th>
              <th className="px-6 py-3 bg-gray-50 dark:bg-gray-800">Product</th>
              <th className="px-6 py-3">Quantity</th>
              <th className="px-6 py-3 bg-gray-50 dark:bg-gray-800">Price</th>
              <th className="px-6 py-3">Image</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order =>
              order.cartItems.map(item => (
                <tr key={item._id} className="border-b border-gray-200 dark:border-gray-700">
                 
                  {/* <td className="px-6 py-4">${order.totalOrderPrice}</td> */}
                  <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">{order.paymentMethodType}</td>
                  <td className="px-6 py-4">{item.product.title}</td>
                  <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">{item.count}</td>
                  <td className="px-6 py-4">${item.price}</td>
                  <td className="px-6 py-4">
                    <img
                      src={item.product.imageCover}
                      alt={item.product.title}
                      className="w-12 h-12 object-cover rounded border"
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    ) : (
      <p className="text-gray-600 italic">No orders found.</p>
    )}
  </div>
);



}
