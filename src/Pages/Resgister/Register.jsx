import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

export default function Register() {
  const [errorMsg, setErrorMsg] = useState(null);
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("name is required")
      .min(3, "minmum characters must be more than 3")
      .max(15, "maximum characters must be less than 15"),
    email: Yup.string().required("email is required").email("invalid email"),
    password: Yup.string()
      .required("password is required")
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
        "password must have a various characters"
      ),
    rePassword: Yup.string()
      .required("rePassword is required")
      .oneOf(
        [Yup.ref("password")],
        "password and re-password must be the same"
      ),
    phone: Yup.string()
      .required("phone is required")
      .matches(
        /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
        "invalid phone number"
      ),
  });

  async function confirmData(values) {
    let id;

    try {
      id = toast.loading("Waiting...");
      let { data } = await axios({
        method: "POST",
        url: `https://ecommerce.routemisr.com/api/v1/auth/signup`,
        data: values,
      });
      console.log(data);
      toast.dismiss(id);

      toast.success("User created successfully");
      setTimeout(() => {
        if (data.message === "success") {
          navigate("/Auth/Login");
        }
      }, 3000);
    } catch (error) {
      toast.dismiss(id);
      toast.error(error.response.data.message);
      setErrorMsg(error.response.data.message);
    }
  }

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema,

    onSubmit: confirmData,
  });

  return (
    <>
        <Helmet>
        <title>Registeration</title>
        <meta name="description" content="Become a member in our family" />

    </Helmet>
    <div className="pt-[40px] pb-[260px] container ">
      <h4 className="text-2xl text-primary mb-5 text-start mt-2 w-1/2 mx-auto">
        <i class="fa-solid fa-person"></i>
        <span className="ms-2">Register Now</span>
      </h4>

      <div>
        <form
          className="flex flex-col gap-4 items-center w-1/2 mx-auto"
          onSubmit={formik.handleSubmit}
        >
          <div className="w-full">
            <h6>name:</h6>
            <input
              type="text"
              className="form-control w-full ps-2 "
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.name && formik.touched.name ? (
              <p className="text-red-500 mt-2 font-semibold">
                * {formik.errors.name}
              </p>
            ) : (
              ""
            )}
          </div>
          <div className="w-full">
            <h6>Email:</h6>
            <input
              type="text"
              className="form-control w-full  ps-2 "
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.email && formik.touched.email ? (
              <p className="text-red-500 mt-2 font-semibold">
                * {formik.errors.email}
              </p>
            ) : (
              ""
            )}
            {errorMsg ? (
              <p className="text-red-500 mt-2 font-semibold">* {errorMsg}</p>
            ) : (
              ""
            )}
          </div>
          <div className="w-full">
            <h6>Password:</h6>
            <input
              type="password"
              className="form-control w-full  ps-2 "
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.password && formik.touched.password ? (
              <p className="text-red-500 mt-2 font-semibold">
                * {formik.errors.password}
              </p>
            ) : (
              ""
            )}
          </div>
          <div className="w-full">
            <h6>Repassword:</h6>
            <input
              type="password"
              className="form-control w-full  ps-2 "
              name="rePassword"
              value={formik.values.rePassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.rePassword && formik.touched.rePassword ? (
              <p className="text-red-500 mt-2 font-semibold">
                * {formik.errors.rePassword}
              </p>
            ) : (
              ""
            )}
          </div>
          <div className="w-full">
            <h6>Phone:</h6>
            <input
              type="tel"
              className="form-control w-full  ps-2 "
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.phone && formik.touched.phone ? (
              <p className="text-red-500 mt-2 font-semibold">
                * {formik.errors.phone}
              </p>
            ) : (
              ""
            )}
          </div>

          <button type="submit" className="btn-primary">
            Register
          </button>
        </form>
      </div>
    </div>
  </>);
}
