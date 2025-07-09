import React, { useEffect, useState } from 'react'
import Style from "./Categories.module.css"
import axios from 'axios'
import useFetchApi from '../../Hooks/useFetchApi';
import { ClipLoader } from 'react-spinners';
// import { Helmet } from 'react-helmet-async';
export default function Categories() {

   let [categories,setCategories]=useState(null)
   const [selectedCategory, setSelectedCategory] = useState(null);
  const [subCategories, setSubCategories] = useState([]);
  const [loadingSub, setLoadingSub] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // async function getAllCategories(){
  //   let {data}= await axios.get("https://ecommerce.routemisr.com/api/v1/categories")
  //   console.log(data.data);
  //   setCategories(data.data)
    

  // }
  // use custon hook to test
  let { data, loading }=useFetchApi("categories");
  console.log(data);
  
  
  async function GetAllSubCategoriesOnCategory(category){
     setLoadingSub(true);
    setShowModal(false);

    setSelectedCategory(category);
   console.log("Selected Category ID:", category._id);

   await  axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${category._id}/subcategories`)
    .then((res)=>{
        console.log(res);
        setSubCategories(res.data.data);
        setShowModal(true);
        
        
    }).catch((error)=>{
      console.log(error);
      
    }).finally(()=>{
       setLoadingSub(false); 
    })

  }
 
  // useEffect(()=>{
  //   getAllCategories()
  // },[])
    useEffect(() => {
    document.title = "Categories | My Shop";
  }, []);

  return<>
  {/* <Helmet><title>Categories</title></Helmet> */}

      {/* 🔄 Loading Spinner at top */}
    {(loading || loadingSub) && (
  <div className="flex justify-center h-screen items-center">
    <ClipLoader color="#16a34a" />
  </div>
)}


      {/* Categories Grid */}
      <div className="parent grid sm:grid-cols-2 md:grid-cols-3 gap-6 p-8">
        {data?.data.map((category) => (
          <div
            key={category._id}
            className="border rounded-md shadow-md overflow-hidden text-center cursor-pointer transition duration-300 hover:shadow-green-400 hover:shadow-lg"
            onClick={() => GetAllSubCategoriesOnCategory(category)}
          >
            <img src={category.image} alt={category.name} className="w-full h-80 object-cover" />
            <div className="py-4 text-green-800 font-semibold text-xl dark:text-white">{category.name}</div>
          </div>
        ))}
      </div>

      {/* 🔲 Modal for SubCategories */}
      {showModal && selectedCategory && (
  <div className="fixed inset-0 flex items-center justify-center z-50">
    {/* Background Overlay */}
    <div className="absolute inset-0 bg-black opacity-50 dark:bg-white dark:opacity-50"></div>

    {/* Modal Content */}
    <div className="relative z-10 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-[90%] max-w-2xl">
      <button
        onClick={() => setShowModal(false)}
        className="absolute top-2 right-3 text-gray-600 hover:text-red-500 text-xl font-bold"
      >
        ×
      </button>

      <div className="info flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Left: Image */}
        <div className="text-center">
          <img src={selectedCategory.image} alt={selectedCategory.name} className="h-64 object-cover rounded" />
        </div>

        {/* Right: Subcategories */}
        <div className="w-full">
          <h2 className="text-2xl font-bold text-green-700 mb-2">{selectedCategory.name}</h2>
          <p className="text-gray-700 mb-2 dark:text-white">SubCategories:</p>
          <div className="flex flex-wrap gap-2">
            {subCategories.map((sub) => (
              <span key={sub._id} className="bg-gray-200 text-gray-800 px-3 py-1 rounded-md text-sm">
                {sub.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-6 flex justify-end">
        <button
          onClick={() => setShowModal(false)}
          className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5"
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}

    </>
}
