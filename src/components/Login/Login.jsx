import React, { useContext, useEffect, useState } from 'react'
import Style from "./Login.module.css"
import { useFormik } from 'formik'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import * as YUP from "yup"
import { authContext } from '../../Context/AuthContextProvider';
import { jwtDecode } from 'jwt-decode';
export default function Login() {
  let [errorMsg,setErrorMessage]=useState(null);
  let [loading,setLoading]=useState(false);
  let {setToken,setidUser}=useContext(authContext);

  
  let navigate=useNavigate();
   function handleRegister(values){
    setLoading(true);
    console.log(values);
    // call api 
     axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin",values).then((res)=>{
      console.log(res);
      // token
      setToken(res.data.token)
      // save token in localStorage
      localStorage.setItem("token",res.data.token)
      let {id}=jwtDecode(res.data.token)
      localStorage.setItem("id",id)

      setidUser(id);
      // console.log(res.data.token)
      // navigate to home (because token returned in signup then go to home , if token not returned go to login to get token)
      navigate("/")
      
     }).catch((error)=>{
      console.log(error.response.data.message);
      setErrorMessage(error.response.data.message);

      
     }).finally(()=>{
      setLoading(false)
     })
  
    
    
  }
  let schema=YUP.object().shape({
    email:YUP.string().email("email is in-valid").required("email is required"),
    password:YUP.string().matches(/^\w{6,15}$/,"password must min 6 and max 15 letter").required("password is required"),
    


  })

  let formikLogin=useFormik({
    initialValues:{
      
     
      email:"",
      password:"",
     
    },
    // validate:validation,
    onSubmit:handleRegister,
    validationSchema:schema

  })

  

  return (
    <div>
      {errorMsg?<div
        class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 text-center"
        role="alert"
      >
       {errorMsg}
      </div>:null}
      
      <form
        action=""
        onSubmit={formikLogin.handleSubmit}
        className="w-1/2 mx-auto"
      >
        <h1 className="my-5 text-2xl"> Login Now!</h1>
       

        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            email
          </label>
          <input
            name="email"
            value={formikLogin.values.email}
            onChange={formikLogin.handleChange}
            onBlur={formikLogin.handleBlur}
            type="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="John@gmail.com"
            required
          />
        </div>
         {formikLogin.errors.email && formikLogin.touched.email?<div
        class="p-4 my-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 text-center"
        role="alert"
      >
       {formikLogin.errors.email}
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
            value={formikLogin.values.password}
            onChange={formikLogin.handleChange}
            onBlur={formikLogin.handleBlur}
            type="password"
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="your password"
            required
          />
        </div>
         {formikLogin.errors.password && formikLogin.touched.password?<div
        class="p-4 my-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 text-center"
        role="alert"
      >
       {formikLogin.errors.password}
      </div>:null}

      
      
        <button
          disabled={loading?true:false}
          type="submit"
          className="my-6 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          {loading?<i className="fa-solid fa-circle-notch"></i>:"Login"}
        </button>
      </form>
    </div>
  );
}
