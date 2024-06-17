import { createContext, useContext, useState } from "react";
import { UserContext } from "./User.Context";
import axios from "axios";
import toast from "react-hot-toast";

export const cartContext = createContext(null);

export default function CartProvider({ children }) {
  const [cartInfo, setCartInfo] = useState(null);
  const { token } = useContext(UserContext);

  async function addProductToCart({ id }) {
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/cart",
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
      toast.success("product added successfully");
      setCartInfo(data)
    } catch (error) {
      console.log(error);
    }
  }
  async function getProductCart() {
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/cart",
        method: "GET",
        headers: {
          token,
        },
      };
      let { data } = await axios.request(options);
      console.log(data);
    
        setCartInfo(data);
      
    } catch (error) {
      console.log(error);
      if (error.response.data.message.includes("No cart")) {
        setCartInfo([])
      }
    }
  }
  async function RemoveProductFromCart({ id }) {
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        method: "DELETE",
        headers: {
          token,
        },
      };
      let { data } = await axios.request(options);
      console.log(data);
      toast.success("product removed successfully");

     
      if (data.numOfCartItems === 0) {
          setCartInfo([])
      } else {
        setCartInfo(data)
        }
      
    } catch (error) {
      console.log(error);
    }
  }

  async function updateCartQuantity({id , count}) {
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        method: "PUT",
        headers : {
          token,
        },
        data: {
          count,
        }
      }
      let { data } = await axios.request(options);
      console.log(data)
      setCartInfo(data)
  
    } catch (error) {
      console.log(error)
    }

   
  }

  async function clearCart() {
   try {
    const options = {
      url: "https://ecommerce.routemisr.com/api/v1/cart",
      method: "DELETE",
      headers: {
        token,
      }
    }

    let { data } = await axios.request(options);
     console.log(data)
     if (data.message === "success") {
       setCartInfo([])
     }
   } catch (error) {
     console.log(error)
    
   }
  }






  return (
    <cartContext.Provider
      value={{
        addProductToCart,
        getProductCart,
        cartInfo,
        setCartInfo,
        RemoveProductFromCart,
        updateCartQuantity,
        clearCart
      }}
    >
      {children}
    </cartContext.Provider>
  );
}
