import axios from "axios";
import React, { useEffect, useState } from "react";
import Loading from "../Loading/Loading";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Link } from "react-router-dom";
import {  useQuery } from "@tanstack/react-query";

export default function CategorySlider() {
  async function getAllCategory() {
    let options = {
      url: `https://ecommerce.routemisr.com/api/v1/categories`,
      method: "GET",
    };
    return await axios.request(options);
  }

  const { data, isLoading, isError } = useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategory,
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <>
        <section className="container pt-3">
          <h2 className="font-semibold text-lg mb-3">
            Shop Popular Categories
          </h2>

          <Swiper
            slidesPerView={1}
            loop={true}
            autoplay={true}
            breakpoints={{
              0: {
                slidesPerView: 1,
                spaceBetween: 0,
              },
              300: {
                slidesPerView: 2,
                spaceBetween: 0,
              },
              600: {
                slidesPerView: 3,
                spaceBetween: 0,
              },
              728: {
                slidesPerView: 4,
                spaceBetween: 0,
              },
              960: {
                slidesPerView: 5,
                spaceBetween: 0,
              },
              1200: {
                slidesPerView: 6,
                spaceBetween: 0,
              },
            }}
          >
            {data.data.data.map((category) => (
              <SwiperSlide key={category._id}>
                <div
                 
                  
                >
                  <img
                    src={category.image}
                    className="w-full h-72 object-cover"
                    alt=""
                  />
                  <h6 className="font-normal">{category.name}</h6>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>
      </>
    </>
  );
}
