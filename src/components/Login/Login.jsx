import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import * as YUP from "yup";
import { authContext } from "../../Context/AuthContextProvider";
import { jwtDecode } from "jwt-decode";

export default function Login() {
  let [errorMsg, setErrorMessage] = useState(null);
  let [loading, setLoading] = useState(false);
  let { setToken, setidUser, idUser } = useContext(authContext);

  let navigate = useNavigate();

    useEffect(() => {
    document.title = "Login | My Shop";
  }, []);


  function handleRegister(values) {
    setLoading(true);
    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
      .then((res) => {
        setToken(res.data.token);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("id", idUser);
        navigate("/");
      })
      .catch((error) => {
        setErrorMessage(error.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  let schema = YUP.object().shape({
    email: YUP.string()
      .email("email is in-valid")
      .required("email is required"),
    password: YUP.string()
      .matches(/^\w{6,15}$/, "password must min 6 and max 15 letter")
      .required("password is required"),
  });

  let formikLogin = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: handleRegister,
    validationSchema: schema,
  });

  return (
    <div className="h-[calc(100vh-80px)] flex justify-center items-center overflow-hidden">
      <form
        onSubmit={formikLogin.handleSubmit}
        className="w-full max-w-md bg-white shadow-lg rounded-lg p-8"
      >
        <h1 className="my-5 text-2xl text-center font-bold text-green-700">Login Now!</h1>

        {errorMsg && (
          <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 text-center" role="alert">
            {errorMsg}
          </div>
        )}

        <div>
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
            Email
          </label>
          <input
            name="email"
            value={formikLogin.values.email}
            onChange={formikLogin.handleChange}
            onBlur={formikLogin.handleBlur}
            type="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="John@gmail.com"
            required
          />
          {formikLogin.errors.email && formikLogin.touched.email && (
            <div className="p-2 my-2 text-xs text-red-700 bg-red-100 rounded text-center">
              {formikLogin.errors.email}
            </div>
          )}
        </div>

        <div className="mt-4">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
            Password
          </label>
          <input
            name="password"
            value={formikLogin.values.password}
            onChange={formikLogin.handleChange}
            onBlur={formikLogin.handleBlur}
            type="password"
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Your password"
            required
          />
          {formikLogin.errors.password && formikLogin.touched.password && (
            <div className="p-2 my-2 text-xs text-red-700 bg-red-100 rounded text-center">
              {formikLogin.errors.password}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between mt-6">
          <button
            disabled={loading}
            type="submit"
            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            {loading ? <i className="fa-solid fa-circle-notch fa-spin"></i> : "Login"}
          </button>

          <Link to="/reset-password" className=" hover:underline text-sm font-medium">
            Forgot your password?
          </Link>
        </div>
      </form>
    </div>
  );
}
