import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { WishListContext } from "../../Context/WishList.Context";
import Loading from "../../components/Loading/Loading";
import { cartContext } from "../../Context/Cart.Context";
import { Helmet } from "react-helmet";

export default function WishList() {
  const {
    removeProductWishlist,
    wishInfo,
    setWishInfo,
    addProductToWishlist,
    getProductWishlist,
  } = useContext(WishListContext);
  const { addProductToCart } = useContext(cartContext);
  useEffect(() => {
    getProductWishlist();
  }, []);
  return (
    <>
      <Helmet>
        <title>Wishlist</title>
        <meta name="description" content="see your favourite products" />
      </Helmet>
      {wishInfo === null ? (
        <Loading />
      ) : (
        <div className="container py-4 ">
          <div className="bg-slate-100 py-2 px-5">
            <h2 className="font-bold text-xl mb-4">Wishlist</h2>

            {wishInfo.length === 0 ? (
              <div className="flex justify-center items-center flex-col gap-4 py-12">
                <p className="text-slate-700 font-bold">
                  there are no items yet.
                </p>
                <Link
                  to="/"
                  className="bg-primary rounded-md text-white font-medium text-sm py-1 px-2"
                >
                  ADD YOUR FIRST PRODUCT TO Wishlist.
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-12 gap-4">
                {wishInfo.map((wishItem) => (
                  <>
                    <div className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-1">
                      <img
                        src={wishItem.imageCover}
                        className="w-full"
                        alt=""
                      />
                    </div>
                    <div className="col-span-12  sm:col-span-11 ">
                      <div className="flex justify-between items-center">
                        <div>
                          <h2 className="font-bold">{wishItem.title}</h2>
                          <h3 className="text-primary font-bold">
                            Price : {wishItem.price}
                          </h3>
                          <button
                            onClick={() => {
                              removeProductWishlist({ id: wishItem._id });
                            }}
                            className="btn-primary mt-1 px-3 bg-red-700 text-sm"
                          >
                            <i className="fa-solid fa-trash-can me-1"></i>
                            Remove
                          </button>
                        </div>
                        <div>
                          <button
                            onClick={() => {
                              addProductToCart({ id: wishItem._id });
                            }}
                            className="bg-primary font-bold rounded-md text-white px-2 py-1"
                          >
                            Add To Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
