import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { cartContext } from "../../Context/Cart.Context";
import { WishListContext } from "../../Context/WishList.Context";

export default function ProductCard({ productInfo }) {
  const [heartColor , setHeartColor] = useState("white")
  let { images, title, price, ratingsAverage, category, id } = productInfo;
  const { addProductToCart } = useContext(cartContext);
  const {addProductToWishlist} = useContext(WishListContext)
  return (
    <>
      <div className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-2  shadow-lg rounded-md overflow-hidden">
        <div className="relative">
          <img src={images[0]} className="w-100" alt="" />
          <div className="layer absolute  top-0 left-0 w-full h-full bg-black opacity-0 hover:opacity-50 transition-opacity duration-300   flex justify-center items-center gap-2">
            <div onClick={() => {
              addProductToWishlist({ id })
              setHeartColor("red-500")
              
            }} className={`w-[30px] h-[30px] rounded-full  hover:scale-110 hover:rotate-6 transition-transform dur bg-primary text-${heartColor} flex justify-center items-center cursor-pointer`}>
              <i className="fa-solid fa-heart"></i>
            </div>
            <div
              onClick={() => {
                addProductToCart({ id });
              }}
              className="w-[30px] h-[30px] rounded-full hover:scale-110 hover:rotate-6 transition-transform dur bg-primary text-white flex justify-center items-center cursor-pointer"
            >
              <i className="fa-solid fa-cart-shopping"></i>
            </div>
            <Link
              to={`/Product/${id}`}
              className=" w-[30px] h-[30px] rounded-full hover:scale-110 hover:rotate-6 transition-transform dur bg-primary text-white flex justify-center items-center cursor-pointer"
            >
              <i className="fa-solid fa-eye"></i>
            </Link>
          </div>
        </div>
        <div className="p-2">
          <h3 className="text-primary text-sm  font-medium">{category.name}</h3>
          <h2 className="text-sm ps-1 font-semibold line-clamp-2">{title}</h2>
          <div className="flex justify-between items-center mt-2  ps-1">
            <h5 className="text-sm">{price} EGP</h5>
            <div className="flex gap-1 items-center text-sm ">
              <i class="fa-solid fa-star text-yellow-500"></i>
              <span>{ratingsAverage}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
