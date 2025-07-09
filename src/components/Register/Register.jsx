import React, { createContext, useEffect, useState } from 'react'
import Style from "./Register.module.css"
import { useFormik } from 'formik'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
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
      setToken(res.data.token)
       // save token in localStorage
      localStorage.setItem("token",res.data.token)
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
    <div className="h-[calc(100vh-80px)] flex justify-center items-center"> 
      
      
      <form
        action=""
        onSubmit={formikRegister.handleSubmit}
        className="w-full max-w-md bg-white shadow-lg rounded-lg p-8"
      >
        <h1 className="my-5 text-2xl"> Register Now!</h1>
        {errorMsg?<div
        class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 text-center"
        role="alert"
      >
       {errorMsg}
      </div>:null}
        <div>
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            name
          </label>
          <input
            name="name"
            value={formikRegister.values.name}
            onChange={formikRegister.handleChange}
            onBlur={formikRegister.handleBlur}
            type="text"
            id="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="John"
            required
          />
        </div>
        {formikRegister.errors.name && formikRegister.touched.name?<div
        class="p-4 my-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 text-center"
        role="alert"
      >
       {formikRegister.errors.name}
      </div>:null}

        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            email
          </label>
          <input
            name="email"
            value={formikRegister.values.email}
            onChange={formikRegister.handleChange}
            onBlur={formikRegister.handleBlur}
            type="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="John@gmail.com"
            required
          />
        </div>
         {formikRegister.errors.email && formikRegister.touched.email?<div
        class="p-4 my-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 text-center"
        role="alert"
      >
       {formikRegister.errors.email}
      </div>:null}

        <div>
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            password
          </label>
          <input
            name="password"
            value={formikRegister.values.password}
            onChange={formikRegister.handleChange}
            onBlur={formikRegister.handleBlur}
            type="password"
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="your password"
            required
          />
        </div>
         {formikRegister.errors.password && formikRegister.touched.password?<div
        class="p-4 my-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 text-center"
        role="alert"
      >
       {formikRegister.errors.password}
      </div>:null}

        <div>
          <label
            htmlFor="rePassword"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            rePassword
          </label>
          <input
            name="rePassword"
            value={formikRegister.values.rePassword}
            onChange={formikRegister.handleChange}
            onBlur={formikRegister.handleBlur}
            type="password"
            id="rePassword"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="repassword"
            required
          />
        </div>
         {formikRegister.errors.rePassword && formikRegister.touched.rePassword?<div
        class="p-4 my-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 text-center"
        role="alert"
      >
       {formikRegister.errors.rePassword}
      </div>:null}
        <div>
          <label
            htmlFor="phone"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            phone
          </label>
          <input
            name="phone"
            value={formikRegister.values.phone}
            onChange={formikRegister.handleChange}
            onBlur={formikRegister.handleBlur}
            type="tel"
            id="phone"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="phone number"
            required
          />
        </div>


         {formikRegister.errors.phone && formikRegister.touched.phone?<div
        class="p-4 my-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 text-center"
        role="alert"
      >
       {formikRegister.errors.phone}
      </div>:null}
        <button
          disabled={loading?true:false}
          type="submit"
          className="my-6 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          {loading?<i className="fa-solid fa-circle-notch"></i>:"Register"}
        </button>
      </form>
    </div>
  );
}
