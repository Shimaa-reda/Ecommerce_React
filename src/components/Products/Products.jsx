import React, { useEffect, useState } from 'react'
import Style from "./Products.module.css"
import DisplayProducts from '../DisplayProducts/DisplayProducts'
// import { Helmet } from 'react-helmet-async'
export default function Products() {
  useEffect(() => {
    document.title = "Products | My Shop";
  }, []);

 
  return <>
    {/* <Helmet><title>Products</title></Helmet> */}

    <div className="pt-10 bg-white dark:bg-gray-900 min-h-screen">
  <DisplayProducts />
</div>
  </>
}
