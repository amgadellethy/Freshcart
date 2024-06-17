import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Register from "./Pages/Resgister/Register";
import Layout from "./components/Layout/Layout";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./Pages/Login/Login";
import Notfound from "./Pages/Notfound/Notfound";
import { Toaster } from "react-hot-toast";
import Home from "./Pages/Home/Home";
import Category from "./Pages/Category/Category";
import ProtectRouter from "./components/ProtectRouter/ProtectRouter";
import UserProvider from "./Context/User.Context";
import ProductDetails from "./Pages/ProductDetails/ProductDetails";
import Cart from "./Pages/Cart/Cart";
import CartProvider from "./Context/Cart.Context";
import Checkout from "./Pages/Checkout/Checkout";
import AllOrders from "./Pages/AllOrders/AllOrders";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Brands from "./Pages/Brands/Brands";
import Products from "./Pages/Products/Products";
import WishList from "./Pages/WishList/WishList";
import WishListProvider from "./Context/WishList.Context";
import ForgetPassword from "./Pages/ForgetPassword/ForgetPassword";
import ResetPassword from "./Pages/ResetPassword/ResetPassword";
import ResetPage from "./Pages/ResetPage/ResetPage";

export default function App() {
  const myClient = new QueryClient();

  const routes = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectRouter>
          <Layout />
        </ProtectRouter>
      ),
      children: [
        {
          index: true,
          element: <Home />,
        },
        { path: "/Category", element: <Category /> },
        { path: "/brands", element: <Brands /> },
        { path: "/Product/:id", element: <ProductDetails /> },
        { path: "/Wishlist", element: <WishList /> },
        { path: "/Products", element: <Products /> },
        { path: "/Cart", element: <Cart /> },
        { path: "/allorders", element: <AllOrders /> },
        { path: "/Checkout", element: <Checkout /> },

        { path: "*", element: <Notfound /> },
        
      ],
    },
    {
      path: "/Auth",
      element: <Layout />,
      children: [
        { path: "Register", element: <Register /> },
        { path: "Login", element: <Login /> },
        { path: "ResetPassword", element: <ResetPassword /> },
        { path: "ForgetPassword", element: <ForgetPassword /> },
        { path: "resetPage", element: <ResetPage /> },
      ],
    },
  ]);
  return (
    <>
      <QueryClientProvider client={myClient}>
        <UserProvider>
          <CartProvider>
            <WishListProvider>
              <RouterProvider router={routes}></RouterProvider>
            </WishListProvider>
          </CartProvider>
        </UserProvider>

        <Toaster />
      </QueryClientProvider>
    </>
  );
}
