import React, { useEffect, useState } from 'react'
import Slider from 'react-slick';
import axios from 'axios';

export default function CategoriesSlider() {
  const [categories, setCategories] = useState(null);

  async function getCategories() {
    let { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/categories");
    setCategories(data.data);
  }

  useEffect(() => {
    getCategories();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024, // medium screens
        settings: {
          slidesToShow: 4,
        }
      },
      {
        breakpoint: 640, // small screens
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  return (
    <div className="my-10">
      <Slider {...settings}>
        {categories?.map((category) => (
          <div key={category._id} className="px-2 text-center">
            <img
              src={category.image}
              alt={category.name}
              className='w-full h-[200px] object-cover rounded'
            />
            
            <p className="mt-2 text-xl font-medium block dark:text-white ">{category.name}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
}
