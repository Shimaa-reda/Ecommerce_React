import React, { useEffect, useState } from 'react'
import Style from "./Layout.module.css"
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'

export default function Layout() {

  return (
    <div>
      <Navbar/>
     <div className="container sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-7xl mx-auto mt-20 ">
        <Outlet/>

     </div>
      {/* <Footer/> */}
    </div>
  )
}
