import React, { useEffect, useState } from 'react'
import Style from "./Home.module.css"
import DisplayProducts from '../DisplayProducts/DisplayProducts'
import CategoriesSlider from '../CategoriesSlider/CategoriesSlider'
import MainSlider from '../MainSlider/MainSlider'
export default function Home() {

  return (
    <div>
      <MainSlider/>
      <CategoriesSlider />
      <DisplayProducts/>
    </div>
  )
}
