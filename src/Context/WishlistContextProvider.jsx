import React, { createContext, useContext, useState } from 'react'
import { authContext } from './AuthContextProvider';
import axios from 'axios';
import toast from 'react-hot-toast';
import { cartContext } from './CartContextProvider';


export  let wishlistContext=createContext();
export default function WishlistContextProvider({children}) {
    let [wishlistItems, setWishlistItems] = useState([]);
    let [favFlag,setFavFlag]=useState({});
    let {token}=useContext(authContext);

    const [loading, setLoading] = useState(false);
     const updateFlag = (id, status) => {
        setFavFlag((prev) => ({ ...prev, [id]: status }));
  };

    async function getWishlist(){
      setLoading(true)
       await axios.get("https://ecommerce.routemisr.com/api/v1/wishlist",{
            headers:{
                token
            }
        }).then((res)=>{
            console.log(res);
            setWishlistItems(res.data.data)

            
        }).catch((error)=>{
            console.log(error);
            
        }).finally(()=>{
        setLoading(false)
    })

    }
      

    async function addToWishlist(id) {
  await axios.post("https://ecommerce.routemisr.com/api/v1/wishlist", 
    { productId: id }, 
    { headers: { token } }
  ).then((res)=>{
    console.log(res);
    setWishlistItems(res.data.data)
    updateFlag(id, true);
    
  }).catch((error)=>{
    console.log(error);
    
  })
}
async function removefromWishlist(id) {
  return  axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, 
    { headers: { token } }
  ).then((res)=>{
    console.log(res);
   setWishlistItems(items => items.filter(item => item.id !== id));

    updateFlag(id, false);
    return true
    
  }).catch((error)=>{
    console.log(error);
    return false
    
  })
}
 function toggleWishlist(id) {
    if (favFlag[id]) {
      removefromWishlist(id);
      toast.success('product removed from wishlist !');
    } else {
      addToWishlist(id);
      toast.success('product added to wishlist !');
    }
  }



  return <wishlistContext.Provider value={{favFlag,wishlistItems,loading,addToWishlist,getWishlist,removefromWishlist,toggleWishlist,setWishlistItems}}>
    {children}
  </wishlistContext.Provider>
}
