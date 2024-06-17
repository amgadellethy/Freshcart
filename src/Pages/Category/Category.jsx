import axios from "axios";
import React, { useEffect, useState } from "react";
import Loading from "../../components/Loading/Loading";
import { Helmet } from "react-helmet";

export default function Category() {
  const [cat, setCat] = useState(null);
  const [specificCat, setSpecificCat] = useState(null);
  const [categoryName , setCategoryName ] = useState(null)

  async function getAllCategories() {
    const options = {
      url: "https://ecommerce.routemisr.com/api/v1/categories",
      method: "GET",
    };
    let { data } = await axios.request(options);
    console.log(data);
    setCat(data);
  }
  useEffect(() => {
    getAllCategories();
  }, []);

  async function getSubCategories({ id }) {
    const options = {
      url: `https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`,
      method: "GET",
    };
    let { data } = await axios.request(options);
    console.log(data);
    setSpecificCat(data);
  }









  async function getSpecificCategory({ id }) {
    const options = {
      url: `https://ecommerce.routemisr.com/api/v1/categories/${id}`,
      method: "GET",
    };
    let { data } = await axios.request(options);
    console.log("##############################333")
    console.log(data);
    setCategoryName(data)
    
  }


  return (
    <>
        <Helmet>
        <title>Categories</title>
        <meta name="description" content="Various categories in our site" />

    </Helmet>
      {cat === null ? (
        <Loading />
      ) : (
        <div className="container grid grid-cols-12 pt-7 gap-4 mb-[50px] ">
          {cat.data.map((catItem) => (
            <div
              onClick={() => {
                getSubCategories({ id: catItem._id });
                getSpecificCategory({ id: catItem._id });
              }}
              className="col-span-12  sm:col-span-12 md:col-span-6 lg:col-span-4  shadow-lg rounded-md overflow-hidden hover:shadow-lg hover:shadow-primary transition-all duration-300 "
            >
              <img
                src={catItem.image}
                className="w-full h-[300px] object-cover"
                alt=""
              />
              <h2 className="p-5 text-xl font-bold text-primary text-center">
                {catItem.name}
              </h2>
            </div>
          ))}
        </div>
      )}


      {specificCat === null ? (
        ""
      ) : (
        <div className="container md:mb-8 mb-[250px]">
          <h2 className="text-[40px] text-center text-primary font-bold my-6">
            {categoryName.data.name} subcategories
          </h2>
          <div className="flex gap-5  flex-wrap justify-center">
            {specificCat.data.map((subcategoryItem) => (
              <h2 className="text-black font-bold text-[26px] text-center py-4 w-[30%]  border border-gray-300 rounded-lg hover:shadow-md hover:shadow-primary transition-all duration-300">
                {subcategoryItem.name}
              </h2>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
