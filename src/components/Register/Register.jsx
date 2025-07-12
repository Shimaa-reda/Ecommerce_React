import React, { createContext, useEffect, useState } from 'react'
import Style from "./Register.module.css"
import { useFormik } from 'formik'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import * as YUP from "yup"
import { useContext } from 'react';
import { authContext } from '../../Context/AuthContextProvider';
export default function Register() {
  let [errorMsg,setErrorMessage]=useState(null);
  let [loading,setLoading]=useState(false);
  let {setToken}=useContext(authContext)

    useEffect(() => {

    document.title = "Register | My Shop";
  }, []);

  let navigate=useNavigate();
   function handleRegister(values){
    setLoading(true);
    console.log(values);
    // call api 
     axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup",values)
     .then((res)=>{
      console.log(res);
      // token
      // setToken(res.data.token)
       // save token in localStorage
      // localStorage.setItem("token",res.data.token)
      // navigate to home (because token returned in signup then go to home , if token not returned go to login to get token)
      navigate("/login")
      
     }).catch((error)=>{
      console.log(error.response);

      console.log(error.response.data.message);
      setErrorMessage(error.response.data.message);

      
     }).finally(()=>{
      setLoading(false)
     })
  
    
    
  }
  let schema=YUP.object().shape({
    name:YUP.string().min(3,"name must minimum 3 letters").max(10,"name must max 10 letters").required("name is required"),
    email:YUP.string().email("email is in-valid").required("email is required"),
    password:YUP.string().matches(/^\w{6,15}$/,"password must min 6 and max 15 letter").required("password is required"),
    rePassword:YUP.string().oneOf([YUP.ref("password")],"repassword not match password").required("repassword is required"),
    phone:YUP.string().matches(/^01[1205][0-9]{8}/,"phone must be egyptian number")


  })
  // function validation(values){
  //   // console.log("validation done");
  //   let errors={}
  //   if(values.name==""){
  //     errors.name="name is required"

  //   }
  //   else if(!/^[a-zA-Z]{3,6}/.test(values.name)){
  //     errors.name="name min 3 to 6 letters"
  //   }

  //   if(values.phone==""){
  //     errors.phone="phone is required"

  //   }
  //   else if(!/^01[125][0-9]{8}/.test(values.phone)){
  //     errors.phone="phone must be egyptian number"
  //   }

  //   return errors

    

  // }
  let formikRegister=useFormik({
    initialValues:{
      
      name:"",
      email:"",
      password:"",
      rePassword:"",
      phone:""
    },
    // validate:validation,
    onSubmit:handleRegister,
    validationSchema:schema

  })

  

  return (
  <div className="h-[calc(100vh-80px)] flex justify-center items-center  dark:bg-gray-900 px-4">
    <form
      onSubmit={formikRegister.handleSubmit}
      className="w-full max-w-md bg-white dark:bg-gray-900 shadow-lg rounded-lg p-8 border border-gray-200 dark:border-gray-700"
    >
      <h1 className="my-5 text-2xl text-center font-bold text-green-700 dark:text-green-400">Register Now!</h1>

      {errorMsg && (
        <div className="p-4 mb-4 text-sm text-red-800 bg-red-50 dark:bg-red-100 dark:text-red-700 rounded-lg text-center">
          {errorMsg}
        </div>
      )}

      {/* Name */}
      <div>
        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Name
        </label>
        <input
          name="name"
          value={formikRegister.values.name}
          onChange={formikRegister.handleChange}
          onBlur={formikRegister.handleBlur}
          type="text"
          id="name"
          className="bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="John"
          required
        />
        {formikRegister.errors.name && formikRegister.touched.name && (
          <div className="p-4 my-4 text-sm text-red-800 bg-red-50 dark:bg-red-100 dark:text-red-700 rounded-lg text-center">
            {formikRegister.errors.name}
          </div>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Email
        </label>
        <input
          name="email"
          value={formikRegister.values.email}
          onChange={formikRegister.handleChange}
          onBlur={formikRegister.handleBlur}
          type="email"
          id="email"
          className="bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="John@gmail.com"
          required
        />
        {formikRegister.errors.email && formikRegister.touched.email && (
          <div className="p-4 my-4 text-sm text-red-800 bg-red-50 dark:bg-red-100 dark:text-red-700 rounded-lg text-center">
            {formikRegister.errors.email}
          </div>
        )}
      </div>

      {/* Password */}
      <div>
        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Password
        </label>
        <input
          name="password"
          value={formikRegister.values.password}
          onChange={formikRegister.handleChange}
          onBlur={formikRegister.handleBlur}
          type="password"
          id="password"
          className="bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Your password"
          required
        />
        {formikRegister.errors.password && formikRegister.touched.password && (
          <div className="p-4 my-4 text-sm text-red-800 bg-red-50 dark:bg-red-100 dark:text-red-700 rounded-lg text-center">
            {formikRegister.errors.password}
          </div>
        )}
      </div>

      {/* rePassword */}
      <div>
        <label htmlFor="rePassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Confirm Password
        </label>
        <input
          name="rePassword"
          value={formikRegister.values.rePassword}
          onChange={formikRegister.handleChange}
          onBlur={formikRegister.handleBlur}
          type="password"
          id="rePassword"
          className="bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Repeat password"
          required
        />
        {formikRegister.errors.rePassword && formikRegister.touched.rePassword && (
          <div className="p-4 my-4 text-sm text-red-800 bg-red-50 dark:bg-red-100 dark:text-red-700 rounded-lg text-center">
            {formikRegister.errors.rePassword}
          </div>
        )}
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Phone
        </label>
        <input
          name="phone"
          value={formikRegister.values.phone}
          onChange={formikRegister.handleChange}
          onBlur={formikRegister.handleBlur}
          type="tel"
          id="phone"
          className="bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Phone number"
          required
        />
        {formikRegister.errors.phone && formikRegister.touched.phone && (
          <div className="p-4 my-4 text-sm text-red-800 bg-red-50 dark:bg-red-100 dark:text-red-700 rounded-lg text-center">
            {formikRegister.errors.phone}
          </div>
        )}
      </div>

      {/* Submit Button */}
      <button
        disabled={loading}
        type="submit"
        className="my-6 w-full focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
      >
        {loading ? <i className="fa-solid fa-circle-notch fa-spin"></i> : "Register"}
      </button>
      <div className="text-center mt-2 text-sm text-gray-700 dark:text-gray-300">
      If you have an account,{" "}
      <Link to="/register" className="text-green-700 dark:text-green-400 hover:underline font-medium">
        Login
      </Link>
    </div>
    </form>
  </div>
);

}
