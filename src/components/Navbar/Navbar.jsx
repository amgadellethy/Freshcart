import React, { useContext, useEffect, useState } from "react";
import imgLogo from "../../assets/images/freshcart-logo.svg";
import { Link, NavLink } from "react-router-dom";
import { UserContext } from "../../Context/User.Context";
import { cartContext } from "../../Context/Cart.Context";

export default function Navbar() {
  const { token, logOut } = useContext(UserContext);
  const { getProductCart, cartInfo } = useContext(cartContext);
  const [hide, setHide] = useState("hidden")
  



  useEffect(() => {
    getProductCart();
  }, []);
  return (
    <>
      <nav className="bg-slate-100 p-1  fixed top-0 left-0 right-0 z-50">
        <div className="container flex items-center gap-7 md:justify-between">
          <h2>
            <img src={imgLogo} className="w-full" alt="" />
          </h2>





          





          {token ? (
            <>
              <div className="md:hidden cursor-pointer mx-auto"  onClick={() => {
                {hide === "hidden" ? setHide("flex") : setHide("hidden")}
              }}>
              <i className="fa-solid fa-bars text-2xl"></i>
              </div>
            <ul className={`md:flex  md:flex-row md:justify-center md:bg-transparent    md:gap-4 md:items-center md:text-slate-600 md:text-[15px] md:font-medium md:static  ${hide}  flex-col gap-4 absolute bg-white text-slate-600 py-2 top-[100%] left-0 right-0 text-center `} >
              <li>
                <NavLink
                  className={({ isActive }) => {
                    return `relative before:absolute before:h-[2px] before:left-0 before:-bottom-1 hover:before:w-full hover:font-bold before:transition-all before-duration-500 before:bg-primary ${
                      isActive ? "font-bold before:w-full" : "before:w-0"
                    }`;
                  }}
                  to="/"
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) => {
                    return `relative before:absolute before:h-[2px] before:left-0 before:-bottom-1 hover:before:w-full hover:font-bold before:transition-all before:duration-500 before:bg-primary ${
                      isActive ? "font-bold before:w-full" : "before:w-0"
                    }`;
                  }}
                  to="/cart"
                >
                  Cart
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) => {
                    return `relative before:absolute before:h-[2px] before:left-0 before:-bottom-1 hover:before:w-full hover:font-bold before:transition-all before:duration-500 before:bg-primary ${
                      isActive ? "font-bold before:w-full" : "before:w-0"
                    }`;
                  }}
                  to="/products"
                >
                  Products
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) => {
                    return `relative before:absolute before:h-[2px] before:left-0 before:-bottom-1 hover:before:w-full hover:font-bold before:transition-all before:duration-500 before:bg-primary ${
                      isActive ? "font-bold before:w-full" : "before:w-0"
                    }`;
                  }}
                  to="/Category"
                >
                  Categories
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) => {
                    return `relative before:absolute before:h-[2px] before:left-0 before:-bottom-1 hover:before:w-full hover:font-bold before:transition-all before:duration-500 before:bg-primary ${
                      isActive ? "font-bold before:w-full" : "before:w-0"
                    }`;
                  }}
                  to="/brands"
                >
                  Brands
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) => {
                    return `relative before:absolute before:h-[2px] before:left-0 before:-bottom-1 hover:before:w-full hover:font-bold before:transition-all before:duration-500 before:bg-primary ${
                      isActive ? "font-bold before:w-full" : "before:w-0"
                    }`;
                  }}
                  to="/allorders"
                >
                  Orders
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) => {
                    return `relative before:absolute before:h-[2px] before:left-0 before:-bottom-1 hover:before:w-full hover:font-bold before:transition-all before:duration-500 before:bg-primary ${
                      isActive ? "font-bold before:w-full" : "before:w-0"
                    }`;
                  }}
                  to="/Wishlist"
                >
                  Wishlist
                </NavLink>
              </li>
              </ul>
            </>
          ) : (
            ""
          )}

        {token ? <>  <Link to="/Cart" className="md:ms-auto md:relative md:block hidden">
            <i className="fa-solid fa-cart-shopping"></i>
            {cartInfo === null ? (
              <span className="bg-primary rounded-full w-[17px] h-[17px] flex justify-center items-center  text-sm text-white font-bold absolute top-0 right-0 translate-x-1/2 -translate-y-1/2">
                <i class="fa-solid fa-spinner fa-spin"></i>
              </span>
            ) : (
              <span className="bg-primary rounded-full w-[17px] h-[17px] flex justify-center items-center  text-sm text-white font-bold absolute top-0 right-0 translate-x-1/2 -translate-y-1/2">
                {cartInfo.numOfCartItems || 0} 
              </span>
            )}
          </Link>
            

           <ul className="md:flex md:gap-5 md:items-center ms-auto hidden">
            <li>
              <a href="https://www.instagram.com">
                <i className="fa-brands fa-instagram"></i>
              </a>
            </li>
            <li>
              <a href="https://www.facebook.com">
                <i className="fa-brands fa-facebook"></i>
              </a>
            </li>
            <li>
              <a href="https://www.tiktok.com">
                <i className="fa-brands fa-tiktok"></i>
              </a>
            </li>
            <li>
              <a href="https://www.twitter.com">
                <i className="fa-brands fa-twitter"></i>
              </a>
            </li>
            <li>
              <a href="https://www.Linkedin.com">
                <i className="fa-brands fa-linkedin"></i>
              </a>
            </li>
            <li>
              <a href="https://www.youtube.com">
                <i className="fa-brands fa-youtube"></i>
              </a>
            </li>
          </ul>
          </>
            : ""}
         

          <ul className="flex gap-4 items-center text-slate-600 text-[15px] font-medium ms-auto">
            {!token ? (
              <>
                <li>
                  <NavLink
                    className={({ isActive }) => {
                      return `relative before:absolute before:h-[2px] before:left-0 before:-bottom-1 hover:before:w-full hover:font-bold before:transition-all before:duration-500 before:bg-primary ${
                        isActive ? "font-bold before:w-full" : "before:w-0"
                      }`;
                    }}
                    to="/Auth/Login"
                  >
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) => {
                      return `relative before:absolute before:h-[2px] before:left-0 before:-bottom-1 hover:before:w-full hover:font-bold before:transition-all before:duration-500 before:bg-primary ${
                        isActive ? "font-bold before:w-full" : "before:w-0"
                      }`;
                    }}
                    to="/Auth/Register"
                  >
                    Register
                  </NavLink>
                </li>
              </>
            ) : (
              <li>
                <span className="text-xl cursor-pointer" onClick={logOut}>
                  <i class="fa-solid fa-right-to-bracket"></i>
                </span>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
}
