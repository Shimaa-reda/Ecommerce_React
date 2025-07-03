import React, { useEffect, useState } from 'react'
import Style from "./MainSlider.module.css"
import Slider from 'react-slick'
import img1 from "../../assets/grocery-banner-2.jpeg"
import img2 from "../../assets/grocery-banner.png"
import img3 from "../../assets/slider-2.jpeg"
import img4 from "../../assets/slider-image-1.jpeg"

export default function MainSlider() {
var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    
  };
  return (
    <div className=' grid grid-cols-[2fr_1fr]'>

      <Slider {...settings} className='overflow-hidden '>
      <div>
        <img src={img4} className='w-full h-[400px]' alt="" />
        
      </div>
       <div>
        <img src={img3} className='w-full h-[400px]' alt="" />
        
      </div>
      
    </Slider>
    <div>
      <img src={img1} className='w-100 h-[200px]'  alt="" />
      <img src={img2} className='w-100 h-[200px]'  alt="" />

    </div>

    </div>
  )
}
