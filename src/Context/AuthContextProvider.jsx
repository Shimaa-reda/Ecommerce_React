import axios from 'axios';
import React, { createContext, useEffect } from 'react'
import { useState } from 'react';
// creat contect
export let authContext=createContext();
export default function AuthContextProvider({children}) {
  //  console.log(children);
   
    // shared data
    const [token,setToken]=useState(localStorage.getItem("token"));
    const [idUser,setidUser]=useState(localStorage.getItem("id"));

    async function decodeToken(token){
      await axios.get("https://ecommerce.routemisr.com/api/v1/auth/verifyToken",{
        headers:{
          token
        }
      }).then((res)=>{
        console.log("id using Api verify token",res.decoded.id);
        setidUser(res.decoded.id)
        
      }).catch((error)=>{
        console.log(error);
        
      })
    }

    // mounting
    // useEffect(()=>{
    //     if(localStorage.getItem("token")){
    //         setToken(localStorage.getItem("token"))
    //     }
    // },[])
  return <authContext.Provider value={{token,setToken,idUser,setidUser,decodeToken}}>
    {/* children */}
    {children}
  </authContext.Provider>
}
