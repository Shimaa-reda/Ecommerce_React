import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { wishlistContext } from '../../Context/WishlistContextProvider';
import toast from 'react-hot-toast';
import { cartContext } from '../../Context/CartContextProvider';

export default function Wishlist() {
  
  const [loading, setLoading] = useState(false);
  let {getWishlist,wishlistItems ,removefromWishlist,setWishlistItems}=useContext(wishlistContext)
    let {addToCart}=useContext(cartContext)


async function removeItem(id){
    let flag = await removefromWishlist(id);
      if(flag ){
    
    toast.success('Deleted from wishlist Successfully!');
   

   }
   else{
   
    toast.error('This is an error!');
   }
  }

  useEffect(() => {
    getWishlist();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center h-screen items-center">
        <ClipLoader />
      </div>
    );
  }

  return <>
  
{wishlistItems?.length>0?<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
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
          Price
        </th>
        <th scope="col" className="px-6 py-3">
          Action
        </th>
      </tr>
    </thead>
    <tbody>
      {wishlistItems?.map((item)=>(<tr key={item.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
        <td className="p-4">
          <img src={item.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt="Apple Watch" />
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
          {item.title}
        </td>
        
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
         {item.price} EGP
        </td>
        <td className="px-6 py-4">
  <div className="flex items-center gap-2">
    <button onClick={()=>addToCart(item.id)} type="button" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Add To Cart</button>


    <button onClick={()=>removeItem(item.id)} type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Remove</button>

  </div>
</td>

      </tr>))}
      
      
    </tbody>
  </table>
</div>:<div>Your WishList is Empty</div>}



  </>
  
}
