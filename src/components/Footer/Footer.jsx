import React from "react";
import amazonPay from "../../assets/images/amazon-pay.png";
import americanExpress from "../../assets/images/American-Express-Color.png";
import masterCard from "../../assets/images/mastercard.webp";
import payPall from "../../assets/images/paypal.png";
import appleStore from "../../assets/images/get-apple-store.png";
import googlePlay from "../../assets/images/get-google-play.png";

export default function Footer() {
  return (
    <>
      <footer className="bg-slate-100 py-3 absolute bottom-0 left-0 right-0">
        <div className="container">
          <h2 className="text-center md:text-start  font-semibold mb-1">Get the FreshCart app</h2>
          <p className="text-center md:text-start text-slate-600 mb-2">
            We will send you a Link, open it your phone to download the app.
          </p>
          <div className="flex flex-col gap-3 px-5 md:flex-row">
            <input
              type="text"
              placeholder="Email..."
              className="form-control flex-grow ps-3"
            />
            <button type="submit" className="btn-primary">
              Share App Link
            </button>
          </div>

          <div className="flex flex-col md:flex-row gap-4 justify-between items-center py-3 mt-3">
            <div className="flex flex-col md:flex-row gap-3 items-center">
              <h6 className="text-slate-700 text-md">Payment Partner</h6>
              <img src={amazonPay} className="w-[45px]" alt="" />
              <img src={americanExpress} className="w-[45px]" alt="" />
              <img src={masterCard} className="w-[45px]" alt="" />
              <img src={payPall} className="w-[45px]" alt="" />
            </div>

            <div className="flex flex-col md:flex-row  gap-3  items-center">
              <h4 className="text-slate-700">Get Delivers With FreshCart</h4>
              <img src={appleStore} className="w-[80px]" alt="" />
              <img src={googlePlay} className="w-[80px]" alt="" />
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
