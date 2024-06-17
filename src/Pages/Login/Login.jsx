import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { UserContext } from "../../Context/User.Context";
import { Helmet } from "react-helmet";

export default function Login() {
  const [errorMsg, setErrorMsg] = useState(null)
  const navigate = useNavigate();
  const {token , setToken} = useContext(UserContext)




  
      
    


    
  

  const validationSchema = Yup.object({
  
    email: Yup.string().required("email is required").email("invalid email"),
    password: Yup.string()
      .required("password is required")
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
        "password must have a various characters"
      ),
   
  });




  async function confirmDataLogin(values) {
    let id;
 
      
    try {
       id = toast.loading("Waiting...")
    let { data } = await axios({
      method: "POST",
      url: `https://ecommerce.routemisr.com/api/v1/auth/signin`,
      data: values
    })
    console.log(data)
    toast.dismiss(id);
     
      toast.success("User logged in successfully")
      setTimeout(() => {
        if (data.message === "success") {
          localStorage.setItem("token" , data.token)
          setToken(data.token)

          navigate("/")

  }
     } , 3000)
      
    
    } catch (error) {
      toast.dismiss(id)
      toast.error(error.response.data.message);
      setErrorMsg(error.response.data.message);
      
      

   }
      
  }




  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,

    onSubmit: confirmDataLogin,
  });

  return (
    <>
        <Helmet>
        <title>Login</title>
        <meta name="description" content="Get in our site to see more and more" />

    </Helmet>
    <div className="pt-[40px] pb-[260px] container ">
      <h4 className="text-2xl text-primary mb-5 text-start mt-2 w-1/2 mx-auto">
        <i class="fa-solid fa-person"></i>
        <span className="ms-2">Login Now</span>
      </h4>

      <div>
        <form
          className="flex flex-col gap-4 items-center w-1/2 mx-auto"
          onSubmit={formik.handleSubmit}
        >
         
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
              <p className="text-red-500 mt-2 font-semibold">
                * {errorMsg}
              </p>
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
         
          

          <button type="submit" className="btn-primary">
            Login Now
          </button>
          <Link to="/Auth/ForgetPassword" className="text-md font-semibold text-red-500"> 
            Forget Your Password ?
          </Link>
        </form>
      </div>
    </div>
  </>);
}
