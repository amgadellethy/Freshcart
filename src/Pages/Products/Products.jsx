import React, { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard/ProductCard";
import axios from "axios";
import Loading from "../../components/Loading/Loading";
import { useQuery } from "@tanstack/react-query";
import { useFormik } from "formik";
import { Helmet } from "react-helmet";

export default function Home() {
  const [productData, setProductData] = useState(null);
  async function getAllProducts() {
    const option = {
      method: "GET",
      url: `https://ecommerce.routemisr.com/api/v1/products`,
    };
    let { data } = await axios.request(option);
    setProductData(data.data);
    console.log(productData);
  }

  useEffect(() => {
    getAllProducts();
  }, []);

  let result = [];

  function searchProduct(value) {
    // setInput(value);
    // for (let i = 0; i < productData.length; i++) {
    //   if (productData[i].title.toLowerCase().includes(value)) {
    //      console.log(productData[i]);
    //   }

    // {
    result = productData.map((searchItem) => {
      if (searchItem.title.toLowerCase().includes(value)) {
        result.push(searchItem);
        console.log(result);

        setProductData(result);
        if (value.length === 0) {
          getAllProducts()
        }
      }
    });
    // console.log(result)
    // let result= productData.filter((searchitem) => {
    //   searchitem.title.toLowerCase().includes(value)
    // })
    // console.log(result)
  }

  return (
    <>
      <Helmet>
        <title>All Products</title>
        <meta name="description" content="see and select from all products" />
      </Helmet>
      {productData === null ? (
        <Loading />
      ) : (
        <>
          <div className="container mx-auto w-3/4 mt-5">
            <input
              onInput={(e) => {
                searchProduct(e.target.value);
              }}
              type="search"
              className="form-control w-full py-1 ps-3"
              placeholder="search...."
            />
          </div>
          <div className="grid grid-cols-12 container pt-[50px] pb-[60px] gap-3">
            {productData.map((product) => {
              return <ProductCard productInfo={product} />;
            })}
          </div>
        </>
      )}
    </>
  );
}
