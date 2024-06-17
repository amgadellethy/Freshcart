import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import ImageGallery from "react-image-gallery";
import { cartContext } from "../../Context/Cart.Context";
import { Helmet } from "react-helmet";

export default function ProductDetails() {
  let { addProductToCart } = useContext(cartContext);

  const [productDetails, setProductDetails] = useState(null);
  let { id } = useParams();
  async function getProductDetails() {
    const options = {
      url: `https://ecommerce.routemisr.com/api/v1/products/${id}`,
      method: "GET",
    };
    let { data } = await axios.request(options);
    setProductDetails(data);
  }

  useEffect(() => {
    getProductDetails();
  }, []);

  const images = productDetails?.data.images.map((image) => {
    {
      return {
        original: image,
        thumbnail: image,
      };
    }
  });
  return (
    <>
        <Helmet>
        <title>Product Details</title>
        <meta name="description" content="see more details of product" />

    </Helmet>
      {productDetails ? (
        <section className="container pt-9">
          <div className="grid grid-cols-12 gap-5">
            <div className="col-span-3 ">
              <ImageGallery
                items={images}
                showFullscreenButton={false}
                showPlayButton={false}
                showBullets={false}
                showNav={false}
              />
            </div>
            <div className="col-span-9 ">
              <h2 className="text-xl font-bold ps-2">
                {productDetails.data.title}
              </h2>
              <h3 className="text-primary font-semibold  ">
                {productDetails.data.category.name}
              </h3>
              <p className="text-slate-400 mt-6">
                {productDetails.data.description}
              </p>
              <div className="flex justify-between items-center mt-4">
                <div className="font-bold">{productDetails.data.price} EGP</div>
                <div>
                  <i className="fa-solid fa-star text-yellow-500 me-1"></i>
                  <span className="font-bold">
                    {productDetails.data.ratingsAverage}
                  </span>
                </div>
              </div>
              <button
                onClick={() => {
                  addProductToCart({ id: productDetails.data.id });
                }}
                className="bg-primary w-full text-white rounded-md p-1 mt-3 font-bold text-sm"
              >
                ADD TO CART
              </button>
            </div>
          </div>
        </section>
      ) : (
        <Loading />
      )}
    </>
  );
}
