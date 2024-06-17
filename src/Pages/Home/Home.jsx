import React, { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard/ProductCard";
import axios from "axios";
import Loading from "../../components/Loading/Loading";
import CategorySlider from "../../components/CategorySlider/CategorySlider";
import HomeSlider from "../../components/HomeSlider/HomeSlider";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";

export default function Home() {
  async function getAllProducts() {
    const option = {
      method: "GET",
      url: `https://ecommerce.routemisr.com/api/v1/products`,
    };
    return await axios.request(option);

    // console.log(data.data)
  }

  const {data , isError , isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });
    
    
    if (isLoading) {
        return <Loading/>
    }

  return (
    <>
        <Helmet>
        <title>Home</title>
        <meta name="description" content="various products in our site see and select" />

    </Helmet>
      <HomeSlider />
      <CategorySlider />
         
        <div className="grid grid-cols-12 container pt-[50px] pb-[60px] gap-3">
          {data.data.data.map((product) => {
            return <ProductCard productInfo={product} />;
          })}
        </div>
      
        
      
    </>
  );
}
