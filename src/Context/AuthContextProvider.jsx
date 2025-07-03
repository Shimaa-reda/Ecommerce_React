import React, { createContext, useEffect } from 'react'
import { useState } from 'react';
// creat contect
export let authContext=createContext();
export default function AuthContextProvider({children}) {
  //  console.log(children);
   
    // shared data
    const [token,setToken]=useState(localStorage.getItem("token"));
    const [idUser,setidUser]=useState(localStorage.getItem("id"));

    // mounting
    // useEffect(()=>{
    //     if(localStorage.getItem("token")){
    //         setToken(localStorage.getItem("token"))
    //     }
    // },[])
  return <authContext.Provider value={{token,setToken,idUser,setidUser}}>
    {/* children */}
    {children}
  </authContext.Provider>
}
