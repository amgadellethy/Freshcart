import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import { Helmet } from "react-helmet";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";


export default function ResetPage() {
const navigate = useNavigate();


    const validationSchema = Yup.object({
  
        email: Yup.string().required("email is required").email("invalid email"),
        newPassword: Yup.string()
          .required("password is required")
          .matches(
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
            "password must have a various characters"
          ),
       
      });
    

    let formik = useFormik({
      initialValues: {
            email: "",
          newPassword : ""
          
        },
        validationSchema,
      onSubmit: ResetNewPassword,
    });
  
    async function ResetNewPassword(values) {
      try {
        const options = {
          url: "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
          method: "PUT",
          data: values,
        };
        let { data } = await axios.request(options);
        console.log(data);
        navigate("/Auth/Login");
      } catch (error) {
        console.log(error.response.data.message);
        toast.error(error.response.data.message);
      }
    }
  return <>
        <Helmet>
        <title>Reset Your Password</title>
        <meta name="description" content="reset your password" />

    </Helmet>
         <div className="container py-5">
      <h2 className="mb-3 font-bold ">
        Reset your Account Password 
      </h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="w-full">
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            name="email"
            value={formik.values.email}
            type="text"
            className="form-control ps-3 w-full py-1"
            placeholder="Enter your E-mail ..."
          />
              </div>
        <div className="w-full mt-4">
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            name="newPassword"
            value={formik.values.newPassword}
            type="password"
            className="form-control ps-3 w-full py-1"
            placeholder="Enter your New Password ..."
          />
              </div>
              
       
        <button type="submit" className="btn-primary mt-5">
          Reset Password
        </button>
      </form>
    </div>
    </>
}
