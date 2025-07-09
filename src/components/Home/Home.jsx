import React, { useEffect, useState } from 'react'
import Style from "./Home.module.css"
import DisplayProducts from '../DisplayProducts/DisplayProducts'
import CategoriesSlider from '../CategoriesSlider/CategoriesSlider'
import MainSlider from '../MainSlider/MainSlider'
// import { Helmet } from 'react-helmet-async'

export default function Home() {

  useEffect(() => {
    document.title = "Home | My Shop";
  }, []);

  return (
    <div>
       {/* <Helmet>
        <title>Home</title>
      </Helmet> */}
      <MainSlider/>
      <CategoriesSlider />
      <DisplayProducts/>
    </div>
  )
}
