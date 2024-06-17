import axios from 'axios'
import { useFormik } from 'formik'
import React from 'react'
import { Helmet } from 'react-helmet';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import * as Yup from "yup";


export default function ForgetPassword() {

    const navigate = useNavigate()

    const validateEmail = Yup.object({
        email: Yup.string().required("email is required").email("Invalid Email")
    })






    let formik = useFormik({
        initialValues: {
            email : ""

        },
        validationSchema: validateEmail,
        onSubmit : forgetPassword
    })




    async function forgetPassword(values) {
        try {
            const options = {
                url: "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
                method: "POST",
                data:  values,
                   
                
            }
            let {data} = await axios.request(options)
            console.log(data)
            navigate("/Auth/ResetPassword")
        
       } catch (error) {
            console.log(error.response.data.message)
            toast.error(error.response.data.message)
       }
    }
    return (
        <>
              <Helmet>
        <title>Forget password</title>
        <meta name="description" content="Are your forget your password ?" />

    </Helmet>
      <div className="container py-5">
          <h2 className='mb-3 font-bold '>Enter your E-mail to send you a verification code ..</h2>
           <form onSubmit={formik.handleSubmit}>
              <div className='w-full'>
                  <input onBlur={formik.handleBlur} onChange={formik.handleChange} name="email" value={formik.values.email} type="email" className='form-control ps-3 w-full py-1' placeholder='Enter your Email ...' />
              </div>
              {formik.errors.email && formik.touched.email ?
                  <p className='text-red-500 my-2 font-semibold'>{formik.errors.email}</p> : ""
       
}
              <button type='submit' className='btn-primary mt-5'>Verify</button>
          </form>
            </div>
            </>
  )
}
