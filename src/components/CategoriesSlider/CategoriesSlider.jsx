import React, { useEffect, useState } from 'react'
import Style from "./CategoriesSlider.module.css"
import Slider from 'react-slick';
import axios from 'axios';
export default function CategoriesSlider() {
  let[categories,setCategories]=useState(null);
  async function getCategories(){
    let {data}=await axios.get("https://ecommerce.routemisr.com/api/v1/categories")
    console.log(data.data);
    
    setCategories(data.data)
  }
  useEffect(()=>{
    getCategories()
  },[])
var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplay:true,
    autoplaySpeed:1000
  };
  return (
    <div>
       <Slider {...settings} className='my-10'>
        {categories?.map((category)=><div key={category._id}>
            <img src={category.image} alt={category.name} className='w-100 h-[200px] object-cover' />
        </div>)}
      
     
    </Slider>
    </div>
  )
}
