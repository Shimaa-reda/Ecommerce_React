import axios from 'axios';
import React, { createContext, useContext, useState } from 'react'
import { authContext } from './AuthContextProvider';
import { data } from 'react-router-dom';




export let cartContext=createContext();

export default function CartContextProvider({children}) {

 let {token}=useContext(authContext);
let [products,setProducts]=useState(null)
let [cartId,setcartId]=useState(null)

let [numOfCart,setNumOfCart]=useState(null)
let [totalPrice,setTotalPrice]=useState(null)
let [Loading,setLoading]=useState(false)






  async function addToCart(id){
    console.log("hello addtocart");
    return axios.post("https://ecommerce.routemisr.com/api/v1/cart",{productId:id},{
        headers:{
            token

        }
        
    }).then((res)=>{
        // console.log(res)
        setNumOfCart(res.data.numOfCartItems); // update numodCart

    
    
        
        return true;
    }).catch((error)=>{
        // console.log(error)
        return false;
        
    })
    

    }

  function getCart(){
        setLoading(true)

    axios.get("https://ecommerce.routemisr.com/api/v1/cart",{
        headers:{
            token
        }
    }).then((res)=>{
        console.log(res)
        setProducts(res.data.data.products)
        setNumOfCart(res.data.numOfCartItems)
        setTotalPrice(res.data.data.totalCartPrice)
        setcartId(res.data.cartId)

        

    }).catch((error)=>{
        console.log(error)

    }).finally(()=>{
        setLoading(false)
    })
  }

  async function removeProduct(id){
   return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{
        headers:{
            token
        }
    }).then((res)=>{
        console.log(res);
        setProducts(res.data.data.products)
        setNumOfCart(res.data.numOfCartItems)
        setTotalPrice(res.data.data.totalCartPrice)

        return true
        
    }).catch((error)=>{
        console.log(error)
        return false
    })
  }
  async function updateQuantityProduct(id,count){
    return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{count},{
        headers:{
            token
        }
    }).then((res)=>{
          console.log(res);
        setProducts(res.data.data.products)
        
        setTotalPrice(res.data.data.totalCartPrice)
        return true


    }).catch((error)=>{
         console.log(error)
        return false
    })
  }
  async function ClearCart(){
    return await axios.delete('https://ecommerce.routemisr.com/api/v1/cart',{
        headers:{
            token
        }
    }).then((res)=>{
         console.log(res);
        setProducts([])
        setNumOfCart(0)
        setTotalPrice(0)
        return true
    }).catch((error)=>{
         console.log(error)
         return false
       
    })
  }
  return <cartContext.Provider value={{addToCart,updateQuantityProduct,getCart,ClearCart,cartId,products,numOfCart,totalPrice,Loading,removeProduct}}>
    {children}

  </cartContext.Provider>
}
