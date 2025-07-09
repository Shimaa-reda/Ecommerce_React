import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import img4 from "../../assets/bag.jpg";
import img3 from "../../assets/bag2.jpg";
import img1 from "../../assets/bags.jpg";
import img2 from "../../assets/gitar.jpg";

export default function MainSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-3 pt-30 mb-15 items-center px-4">
      {/* Left side slider (2 columns on md) */}
      <div className="md:col-span-2 w-full">
        <Slider {...settings} className="overflow-visible mb-8">
          <div>
            <img src={img4} className="w-full h-[400px] object-contain " alt="slide1" />
          </div>
          <div>
            <img src={img3} className="w-full h-[400px] object-contain" alt="slide2" />
          </div>
        </Slider>
      </div>

      {/* Right side stacked images */}
      <div className="flex flex-col">
        <img src={img1} className="w-full h-[200px] object-cover" alt="side1" />
        <img src={img2} className="w-full h-[200px] object-cover" alt="side2" />
      </div>
    </div>
  );
}
