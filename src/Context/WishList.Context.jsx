import React, { createContext, useContext, useState } from "react";
import { UserContext } from "./User.Context";
import axios from "axios";
import toast from "react-hot-toast";
export const WishListContext = createContext(null);
export default function WishListProvider({ children }) {
    const { token } = useContext(UserContext);
    const [wishInfo , setWishInfo] = useState(null)

  async function addProductToWishlist({ id }) {
  try {
    const options = {
        url: "https://ecommerce.routemisr.com/api/v1/wishlist",
        method: "POST",
        headers: {
          token,
        },
        data: {
          productId: id,
        },
      };
      let { data } = await axios.request(options);
      console.log(data);
      toast.success("product added successfully to wishlist")
      
  } catch (error) {
      console.log(error)
    
  }
    }













  async function getProductWishlist() {
  try {
    const options = {
        url: "https://ecommerce.routemisr.com/api/v1/wishlist",
        method: "GET",
        headers: {
          token,
        },  
      };
      let { data } = await axios.request(options);
      console.log(data.data);
      setWishInfo(data.data)
  } catch (error) {
      console.log(error)
    
  }
  }
  













  async function removeProductWishlist({id}) {

  try {
    const options = {
        url: `https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
        method: "DELETE",
        headers: {
          token,
        },  
      };
      let { data } = await axios.request(options);
      console.log(data.data);
    toast.success("product removed successfully");
    getProductWishlist()

  } catch (error) {
      console.log(error)
    
  }
    }
    











  return (
    <WishListContext.Provider value={{removeProductWishlist,setWishInfo, wishInfo ,addProductToWishlist , getProductWishlist}}>
      {children}
    </WishListContext.Provider>
  );
}
