import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { UserContext } from "../../Context/User.Context";
import axios from "axios";
import { cartContext } from "../../Context/Cart.Context";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Checkout() {
  const { token } = useContext(UserContext);
  const { cartInfo, setCartInfo } = useContext(cartContext);
  const [payType, setPayType] = useState(null);

  async function createCashOrder({ id }) {
    const options = {
      url: `https://ecommerce.routemisr.com/api/v1/orders/${cartInfo.data._id}`,
      method: "POST",
      headers: {
        token,
      },
      data: {
        shippingAddress: {
          details: "",
          phone: "",
          city: "",
        },
      },
    };

    let { data } = await axios.request(options);
    console.log(data);
    setCartInfo([]);
  }
  async function createOnlineOrder({ id }) {
    const options = {
      url: `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartInfo.data._id}?url=http://localhost:5173`,
      method: "POST",
      headers: {
        token,
      },
      data: {
        shippingAddress: {
          details: "",
          phone: "",
          city: "",
        },
      },
    };

    let { data } = await axios.request(options);
    console.log(data);
    toast.loading("redirecting to payment gateway");
    setTimeout(() => {
      window.location.href = data.session.url;
    }, 3000);
  }

  const formik = useFormik({
    initialValues: {
      shippingAddress: {
        details: "",
        phone: "",
        city: "",
      },
    },
    onSubmit: (values) => {
      if (payType === "cash") {
        createCashOrder(values);
      } else {
        createOnlineOrder(values);
      }
    },
  });

  return (
    <>
        <Helmet>
        <title>Checkout</title>
        <meta name="description" content="selected your payment Method" />

    </Helmet>
      <div className="container">
        <h2 className="my-4 text-xl font-bold">Shipping Address</h2>
        <form onSubmit={formik.handleSubmit}>
          <input
            name="shippingAddress.city"
            value={formik.values.shippingAddress.city}
            onChange={formik.handleChange}
            type="text"
            placeholder="City..."
            className="ps-2 form-control w-full mb-3"
          />
          <input
            name="shippingAddress.phone"
            value={formik.values.shippingAddress.phone}
            onChange={formik.handleChange}
            type="tel"
            placeholder="Phone..."
            className="ps-2 form-control w-full mb-3"
          />
          <textarea
            name="shippingAddress.details"
            value={formik.values.shippingAddress.details}
            onChange={formik.handleChange}
            placeholder="Details...."
            className="ps-2 form-control w-full"
          ></textarea>
          <button
            type="submit"
            onClick={() => {
              setPayType("cash");
            }}
            className="btn-primary bg-blue-500  text-sm px-1 me-2 mt-2 "
          >
            CASH ORDER
          </button>
          <button
            onClick={() => {
              setPayType("online");
            }}
            type="submit"
            className="btn-primary text-sm px-1 mt-2 "
          >
            ONLINE PAYMENT
          </button>
        </form>
      </div>
    </>
  );
}
