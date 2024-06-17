import React from "react";
import img1 from "../../assets/images/slider-image-3.jpeg";
import img2 from "../../assets/images/slider-image-2.jpeg";
import img3 from "../../assets/images/slider-image-1.jpeg";
import "swiper/element/css/autoplay"

export default function HomeSlider() {
  return (
    <>
      <div className="container grid grid-cols-12 py-6">
        <div className="col-span-8   h-full" style={{ height: "100%" }}>
          <swiper-container style={{height : "100%"}} loop="true" autoplay={true}>
            <swiper-slide style={{height : "100%"}}><img src={img1} className="w-full h-full object-cover " alt="" /></swiper-slide>
            <swiper-slide style={{height : "100%"}}><img src={img2} className="w-full h-full object-cover " alt="" /></swiper-slide>
            <swiper-slide style={{height : "100%"}}><img src={img3} className="w-full h-full object-cover " alt="" /></swiper-slide>
          
          </swiper-container>
          
        </div>
        <div className="col-span-4 bg-lime-600" style={{height:"100%"}}>
          <div className="h-1/2">
            <img src={img2} className="w-full h-full object-cover inline-block" alt="" />
          </div>

          <div className="h-1/2">
            <img src={img3} className="w-full h-full object-cover inline-block " alt="" />
          </div>
        </div>
      </div>
    </>
  );
}
