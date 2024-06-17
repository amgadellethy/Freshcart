import axios from "axios";
import React, { useEffect, useState } from "react";
import Loading from "../../components/Loading/Loading";
import { Helmet } from "react-helmet";

export default function Brands() {
  const [brands, setBrands] = useState(null);
  const [showModal, setShowModal] = useState(false)
  const [specificBrand , setSpecificBrand] = useState(null)
  async function getAllBrands() {
    const options = {
      url: "https://ecommerce.routemisr.com/api/v1/brands",
      method: "GET",
    };

    let { data } = await axios.request(options);
    console.log(data);
    setBrands(data);
  }
  useEffect(() => {
    getAllBrands();
  }, []);

  async function getSpecificBrands({ id }) {
    const options = {
      url: `https://ecommerce.routemisr.com/api/v1/brands/${id}`,
      method: "GET",
    };

    let { data } = await axios.request(options);
    setSpecificBrand(data.data);
    setShowModal(true)
  }

  return (
    <>
        <Helmet>
        <title>Brands</title>
        <meta name="description" content="various brands in our site" />

    </Helmet>
      {brands === null ? (
        <Loading />
      ) : (
          <>
        <div className="container grid grid-cols-12 pt-8 gap-6">
          {brands.data.map((brandItem) => (
            <div
              onClick={() => {
                getSpecificBrands({ id: brandItem._id });
                
              }}
              className="cursor-pointer col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 border border-slate-200 shadow-md rounded-md overflow-hidden hover:shadow-primary transition-all duration-300"
            >
              <img src={brandItem.image} className="w-full" alt="" />
              <h2 className="text-center p-7 font-semibold">
                {brandItem.name}
              </h2>
            </div>
          ))}
            </div>
            




            {showModal === true ? <div onClick={()=>{setShowModal(false)}} className="modal min-h-screen z-[999] fixed left-0 right-0 top-0 bottom-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center">
              <div className="md:w-[500px] md:h-[300px]  w-[300px] h-[300px] rounded-lg bg-white shadow-md flex flex-col justify-between gap-5">
                <div onClick={()=>{setShowModal(false)}} className="text-end pb-4 border-b-2 px-4  border-slate-300 cursor-pointer text-lg pt-2"><i className="fa-solid fa-x"></i></div>
                <div className="flex justify-between  items-center px-8 ">
                  <div>
                    <h2 className="text-[40px] text-primary font-extrabold">{specificBrand.name}</h2>
                    <h6>{specificBrand.slug }</h6>
                  </div>
                  <div>
                    <h2 className="text-[50px] font-extrabold ">{specificBrand.name}</h2>
                  </div>
                </div>
                <div className="border-t-2 border-slate-300 pb-2 ">
                                  <button onClick={()=>{setShowModal(false)}} className=" mt-4 me-4 p-1   rounded-lg bg-gray-700 text-white font-semibold block ms-auto">close</button>

                </div>

              </div>


            </div> : ""}
          
          </>
      )}
     
    </>
  );
}
