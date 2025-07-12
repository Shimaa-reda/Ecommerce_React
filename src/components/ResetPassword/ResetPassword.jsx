import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { jwtDecode } from "jwt-decode";
import * as Yup from "yup";

export default function ResetPassword() {
  const [step, setStep] = useState(1);
  const [errorMsg, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Step 1: Send Email
  async function forgotPassword(values) {
    setLoading(true);
    setErrorMessage(null);
    return await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", values)
      .then((res) => {
        console.log(res);
        setStep(2);
      })
      .catch((error) => {
        console.log(error.response?.data?.message);
        setErrorMessage(error.response?.data?.message || "Something went wrong");
      }).finally(() => setLoading(false));;
  }

  // Step 2: verify code
  async function verifyResetCode(values) {
    setLoading(true);
    setErrorMessage(null);
    return await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode", {
        resetCode: values.resetCode.trim(),
      })
      .then((res) => {
        console.log(res);
        setStep(3);
      })
      .catch((error) => {
        console.log(error.response?.data?.message);
        setErrorMessage(error.response?.data?.message || "Invalid reset code");
      }).finally(() => setLoading(false));;
  }

  // Step 3: Reset Password
  async function resetPassword(values) {
    setLoading(true);
    setErrorMessage(null);
    return await axios
      .put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword", {
        email: formikEmail.values.email,
        newPassword: values.newPassword,
      })
      .then((res) => {
        console.log(res);
        const token = res.data.token;
        const decoded = jwtDecode(token);
        localStorage.setItem("token", token);
        localStorage.setItem("id", decoded.id);

        alert("Password reset successfully. You're now logged in.");
        navigate("/login");
      })
      .catch((error) => {
        console.log(error.response?.data?.message);
        setErrorMessage(error.response?.data?.message || "Error resetting password");
      }).finally(() => setLoading(false));;
  }

  // formiks

  const formikEmail = useFormik({
    initialValues: { email: "" },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Email is required"),
    }),
    onSubmit: forgotPassword,
  });

  const formikCode = useFormik({
    initialValues: { resetCode: "" },
    validationSchema: Yup.object({
      resetCode: Yup.string().required("Reset code is required"),
    }),
    onSubmit: verifyResetCode,
  });

  const formikReset = useFormik({
    initialValues: { newPassword: "" },
    validationSchema: Yup.object({
      newPassword: Yup.string()
        .matches(/^\w{6,15}$/, "Password must be 6–15 characters")
        .required("Password is required"),
    }),
    onSubmit: resetPassword,
  });

    useEffect(() => {
    document.title = "ResetPassword | My Shop";

   
  }, []);

return (
  <div className="h-[calc(100vh-80px)] flex justify-center items-center overflow-hidden bg-gray-50 dark:bg-gray-900 px-4">
    <div className="w-full max-w-md bg-white dark:bg-gray-900 shadow-lg rounded-lg p-8 border border-gray-200 dark:border-gray-700">

      {step === 1 && (
        <form onSubmit={formikEmail.handleSubmit}>
          <h1 className="my-5 text-2xl text-center font-bold text-green-700">Reset Password</h1>

          {errorMsg && (
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 text-center">
              {errorMsg}
            </div>
          )}

          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Email
          </label>
          <input
            name="email"
            value={formikEmail.values.email}
            onChange={formikEmail.handleChange}
            onBlur={formikEmail.handleBlur}
            type="email"
            id="email"
            className="bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="John@gmail.com"
            required
          />
          {formikEmail.errors.email && formikEmail.touched.email && (
            <div className="p-2 my-2 text-xs text-red-700 bg-red-100 rounded text-center">
              {formikEmail.errors.email}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}

            className="mt-4 w-full text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
           
            {loading ? <i className="fa-solid fa-spinner fa-spin"></i> : "Send Code"} 

          </button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={formikCode.handleSubmit}>
          <h1 className="my-5 text-2xl text-center font-bold text-green-700">Enter Reset Code</h1>

          {errorMsg && (
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 text-center">
              {errorMsg}
            </div>
          )}

          <label htmlFor="resetCode" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Reset Code
          </label>
          <input
            name="resetCode"
            value={formikCode.values.resetCode}
            onChange={formikCode.handleChange}
            onBlur={formikCode.handleBlur}
            type="text"
            id="resetCode"
            className="bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Enter the code"
            required
          />
          {formikCode.errors.resetCode && formikCode.touched.resetCode && (
            <div className="p-2 my-2 text-xs text-red-700 bg-red-100 rounded text-center">
              {formikCode.errors.resetCode}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-4 w-full text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            {loading ? <i className="fa-solid fa-spinner fa-spin"></i> : "Verify Code"} 
          </button>
        </form>
      )}

      {step === 3 && (
        <form onSubmit={formikReset.handleSubmit}>
          <h1 className="my-5 text-2xl text-center font-bold text-green-700">Set New Password</h1>

          {errorMsg && (
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 text-center">
              {errorMsg}
            </div>
          )}

          <label htmlFor="newPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            New Password
          </label>
          <input
            name="newPassword"
            value={formikReset.values.newPassword}
            onChange={formikReset.handleChange}
            onBlur={formikReset.handleBlur}
            type="password"
            id="newPassword"
            className="bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Enter new password"
            required
          />
          {formikReset.errors.newPassword && formikReset.touched.newPassword && (
            <div className="p-2 my-2 text-xs text-red-700 bg-red-100 rounded text-center">
              {formikReset.errors.newPassword}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-4 w-full text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            {loading ? <i className="fa-solid fa-spinner fa-spin"></i> : "Reset Password"} 
          </button>
        </form>
      )}

    </div>
  </div>
);



}
