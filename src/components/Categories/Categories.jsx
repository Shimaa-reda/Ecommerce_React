import React, { useEffect, useState } from 'react'
import Style from "./Categories.module.css"
import axios from 'axios'
export default function Categories() {

   let [categories,setCategories]=useState(null)
   const [selectedCategory, setSelectedCategory] = useState(null);
  const [subCategories, setSubCategories] = useState([]);

  async function getAllCategories(){
    let {data}= await axios.get("https://ecommerce.routemisr.com/api/v1/categories")
    console.log(data.data);
    setCategories(data.data)
    

  }
  async function GetAllSubCategoriesOnCategory(category){
    setSelectedCategory(category);
   console.log("Selected Category ID:", category._id);

   await  axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${category._id}/subcategories`)
    .then((res)=>{
        console.log(res);
        setSubCategories(res.data.data);
        
        
    }).catch((error)=>{
      console.log(error);
      
    })

  }
  useEffect(()=>{
    getAllCategories()
  },[])
  return <>
  <div className="parent grid sm:grid-cols-2 md:grid-cols-3  gap-6 p-8">
    {categories?.map((category)=><div className="border rounded-md shadow-md overflow-hidden text-center" onClick={()=>GetAllSubCategoriesOnCategory(category)}>
    <img src={category.image} alt="Music" className="w-full h-80 object-cover " />
    <div className="py-4 text-green-800 font-semibold text-xl">{category.name}</div>
  </div>)}
  
 
</div>

 {/* Subcategory Section */}
      {selectedCategory ? (
        <div className="mt-10 bg-gray-100 p-6 rounded shadow-md my-5">
          <h2 className="text-center text-2xl font-semibold mb-4">SubCategories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            {/* Image */}
            <div className="text-center">
              <img src={selectedCategory.image} alt={selectedCategory.name} className="inline-block h-64 object-cover rounded" />
            </div>

            {/* Subcategory Names */}
            <div>
              <h3 className="text-xl font-bold mb-2">{selectedCategory.name}</h3>
              <p className="mb-2 text-gray-600">SubCategories:</p>
              <div className="flex flex-wrap gap-2">
                {subCategories.map((sub) => (
                  <span key={sub._id} className="bg-gray-300 text-gray-800 px-3 py-1 rounded-md text-sm">
                    {sub.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      ):null}

  </>
}
