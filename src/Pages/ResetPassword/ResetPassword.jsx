import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function resetPassword() {
  const navigate = useNavigate();

  let formik = useFormik({
    initialValues: {
      resetCode: "",
    },
    onSubmit: ResetPassword,
  });

  async function ResetPassword(values) {
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        method: "POST",
        data: values,
      };
      let { data } = await axios.request(options);
      console.log(data);
      navigate("/Auth/resetPage");
    } catch (error) {
      console.log(error.response.data.message);
      toast.error(error.response.data.message);
    }
  }
  return (
    <div className="container py-5">
      <h2 className="mb-3 font-bold ">
        Enter your E-mail to send you a verification code ..
      </h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="w-full">
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            name="resetCode"
            value={formik.values.resetCode}
            type="text"
            className="form-control ps-3 w-full py-1"
            placeholder="Enter your verification code ..."
          />
        </div>
        {formik.errors.resetCode && formik.touched.resetCode ? (
          <p className="text-red-500 my-2 font-semibold">
            {formik.errors.resetCode}
          </p>
        ) : (
          ""
        )}
        <button type="submit" className="btn-primary mt-5">
          Verify
        </button>
      </form>
    </div>
  );
}
