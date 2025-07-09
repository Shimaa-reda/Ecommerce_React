import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { jwtDecode } from "jwt-decode";
import * as Yup from "yup";

export default function ResetPassword() {
  const [step, setStep] = useState(1);
  const [errorMsg, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  // Step 1: Send Email
  async function forgotPassword(values) {
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
      });
  }

  // Step 2: verify code
  async function verifyResetCode(values) {
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
      });
  }

  // Step 3: Reset Password
  async function resetPassword(values) {
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
      });
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

  return (
    <div className="w-1/2 mx-auto my-10">
      {step === 1 && (
        <form onSubmit={formikEmail.handleSubmit}>
          <h2 className="text-xl mb-4">📧 Please Enter Your Email</h2>
          <input
            type="email"
            name="email"
            className="w-full mb-3 p-2 border rounded"
            placeholder="Enter your email"
            value={formikEmail.values.email}
            onChange={formikEmail.handleChange}
            onBlur={formikEmail.handleBlur}
          />
          {formikEmail.touched.email && formikEmail.errors.email && (
            <div className="p-3 mb-2 text-sm text-red-700 bg-red-100 rounded text-center">
              {formikEmail.errors.email}
            </div>
          )}
          {errorMsg && (
            <div className="p-3 mb-2 text-sm text-red-700 bg-red-100 rounded text-center">
              {errorMsg}
            </div>
          )}
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
            Send Code
          </button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={formikCode.handleSubmit}>
          <h2 className="text-xl mb-4">📨 Enter Reset Code</h2>
          <input
            type="text"
            name="resetCode"
            className="w-full mb-3 p-2 border rounded"
            placeholder="Enter code sent to email"
            value={formikCode.values.resetCode}
            onChange={formikCode.handleChange}
            onBlur={formikCode.handleBlur}
          />
          {formikCode.touched.resetCode && formikCode.errors.resetCode && (
            <div className="p-3 mb-2 text-sm text-red-700 bg-red-100 rounded text-center">
              {formikCode.errors.resetCode}
            </div>
          )}
          {errorMsg && (
            <div className="p-3 mb-2 text-sm text-red-700 bg-red-100 rounded text-center">
              {errorMsg}
            </div>
          )}
          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
            Verify Code
          </button>
        </form>
      )}

      {step === 3 && (
        <form onSubmit={formikReset.handleSubmit}>
          <h2 className="text-xl mb-4">🔒 Set New Password</h2>
          <input
            type="password"
            name="newPassword"
            className="w-full mb-3 p-2 border rounded"
            placeholder="Enter new password"
            value={formikReset.values.newPassword}
            onChange={formikReset.handleChange}
            onBlur={formikReset.handleBlur}
          />
          {formikReset.touched.newPassword && formikReset.errors.newPassword && (
            <div className="p-3 mb-2 text-sm text-red-700 bg-red-100 rounded text-center">
              {formikReset.errors.newPassword}
            </div>
          )}
          {errorMsg && (
            <div className="p-3 mb-2 text-sm text-red-700 bg-red-100 rounded text-center">
              {errorMsg}
            </div>
          )}
          <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded">
            Reset Password
          </button>
        </form>
      )}
    </div>
  );
}
