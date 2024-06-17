import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { cartContext } from "../../Context/Cart.Context";
import Loading from "../../components/Loading/Loading";
import { Helmet } from "react-helmet";

export default function Cart() {
  const {
    getProductCart,
    cartInfo,
    RemoveProductFromCart,
    updateCartQuantity,
    clearCart,
  } = useContext(cartContext);

  // useEffect(() => {
  //   getProductCart();
  // }, []);
  // console.log(cartInfo);
  return (
    <>
        <Helmet>
        <title>Cart</title>
        <meta name="description" content="cart contains your selected products" />

    </Helmet>
      {cartInfo === null ? (
        <Loading />
      ) : (
        <section className="container rounded-md bg-slate-100 mb-[290px] md:mb-6 p-4 mt-7">
          <h2 className="font-bold text-xl">
            Shop Cart
            <i class="fa-solid fa-cart-shopping ms-2"></i>
          </h2>
          {cartInfo.length === 0 || cartInfo.numOfCartItems === 0 ? (
            <div className="flex justify-center items-center flex-col gap-4 py-12">
              <p className="text-slate-700 font-bold">
                there are no items yet.
              </p>
              <Link
                to="/"
                className="bg-primary rounded-md text-white font-medium text-sm py-1 px-2"
              >
                ADD YOUR FIRST PRODUCT TO CART.
              </Link>
            </div>
          ) : (
            <>
              {cartInfo.data.products.map((productItem) => (
                <div className="grid grid-cols-12 gap-6 mt-6 ">
                  <div className="col-span-5 md:col-span-1 ">
                    <img
                      src={productItem.product.imageCover}
                      className="w-full"
                      alt=""
                    />
                  </div>
                  <div className="col-span-6 md:col-span-11  flex flex-col md:flex-row justify-between items-center">
                    <div>
                      <h2 className="font-semibold md:text-lg text-xs">
                        {productItem.product.title}
                      </h2>
                      <h2 className="text-primary ">
                        price : <span>{productItem.price}</span>
                      </h2>
                      <button
                        onClick={() => {
                          RemoveProductFromCart({ id: productItem.product.id });
                        }}
                        className="btn-primary mt-1 px-3 bg-red-700 text-sm"
                      >
                        <i className="fa-solid fa-trash-can me-1"></i>
                        Remove
                      </button>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          updateCartQuantity({
                            id: productItem.product.id,
                            count: productItem.count + 1,
                          });
                        }}
                        className="btn-primary px-3 text-white text-sm "
                      >
                        <i className="fa-solid fa-plus"></i>
                      </button>
                      <span className="font-bold">{productItem.count}</span>
                      <button
                        onClick={() => {
                          updateCartQuantity({
                            id: productItem.product.id,
                            count: productItem.count - 1,
                          });
                        }}
                        className="btn-primary px-3 text-white text-sm "
                      >
                        <i class="fa-solid fa-minus"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <button
                onClick={() => {
                  clearCart();
                }}
                className="btn-primary text-sm bg-red-700 block mx-auto md:ms-auto mt-4"
              >
                Clear Cart
              </button>
              <Link to="/Checkout" className="btn-primary block w-fit mx-auto md:ms-auto mt-4 text-white text-sm">Next Step</Link>
            </>
          )}
        </section>
      )}
    </>
  );
}
