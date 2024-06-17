import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Context/User.Context";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import Loading from "../../components/Loading/Loading";
import { Helmet } from "react-helmet";

export default function AllOrders() {
  const [orders, setOrders] = useState(null);
  let { token } = useContext(UserContext);
  let { id } = jwtDecode(token);
  async function getUserOrders() {
    const options = {
      url: `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`,
      method: "GET",
    };
    let { data } = await axios.request(options);
    console.log(data);
    setOrders(data);
  }

  useEffect(() => {
    getUserOrders();
  }, []);
  return (
 <>
      <Helmet>
        <title>All Orders</title>
        <meta name="description" content="Orders of User" />

    </Helmet>
   
      {orders === null ? (
        <Loading />
      ) : (
        orders.map((order) => (
          <div className="order container border border-gray-300 p-4 mt-5 rounded-md">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-gray-400 ">Order ID</h2>
                        <h3 className="font-semibold ">#{order.id}</h3>
                        <h3 className="text-primary mt-2 font-bold">Total Price: {order.totalOrderPrice }</h3>
              </div>
              <div>
                {order.isPaid === true ? (
                  <span className="btn-primary font-cairo rounded-lg inline-block me-2 bg-lime-500">
                    تم الدفع{" "}
                  </span>
                ) : (
                  <span className="btn-primary font-cairo rounded-lg inline-block me-2 bg-blue-500">
                    غير مدفوع
                  </span>
                )}
               {order.isDelivered === true ?  <span className="btn-primary font-cairo rounded-lg inline-block  bg-lime-500">
                  تم التوصيل
                </span> :  <span className="btn-primary font-cairo rounded-lg inline-block  bg-red-500">
                  قيد التوصيل
                </span> }
              </div>
            </div>

            <div className="grid grid-cols-12 gap-4 ">
                    {order.cartItems.map((orderItem) =>  <div className="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-2 border rounded border-gray-300 p-2 mt-2">
                <img
                  src={orderItem.product.imageCover}
                  className="w-full h-32 object-contain"
                />
                <h2 className="font-bold">{orderItem.product.title}</h2>
                <h3 className="font-regular">{orderItem.price} L.E</h3>
              </div>
                 
             )}
            </div>
          </div>
        ))
      )}
    </>
  );
}
