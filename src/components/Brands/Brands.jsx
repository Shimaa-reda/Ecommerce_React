import React, { useEffect, useState } from 'react'
import Style from "./Brands.module.css"
import axios from 'axios';
export default function Brands() {
   let [brands,setBrands]=useState(null)
   const [selectedBrand, setSelectedBrand] = useState(null);
const [showModal, setShowModal] = useState(false);
function openModal(brand) {
  setSelectedBrand(brand);
  setShowModal(true);
}

function closeModal() {
  setShowModal(false);
  setSelectedBrand(null);
}

  
    async function getAllBrands(){
      let {data}= await axios.get("https://ecommerce.routemisr.com/api/v1/brands")
      console.log(data.data);
      setBrands(data.data)
      
  
    }
    useEffect(()=>{
      getAllBrands()
    },[])
  

  return <>
  <div className="parent grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-6 p-8">
    {brands?.map((brand)=><div className="border rounded-md shadow-md overflow-hidden text-center" 
                               onClick={() => openModal(brand)} key={brand._id}>
    <img src={brand.image} alt="Music" className="w-full  " />
    <div className="py-4 text-green-800 font-semibold text-xl">{brand.name}</div>
  </div>)}
  
 
</div>
{/* modal */}
{showModal && selectedBrand && (
  <div className="fixed inset-0 flex items-center justify-center z-50 ">
    {/* Background Overlay */}
    <div className="absolute inset-0 bg-black opacity-50"></div>

    {/* Modal Content */}
    <div className="relative z-10 bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md ">
      <button
        className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl"
        onClick={()=>closeModal()}
      >
        &times;
      </button>
      <div className="info flex justify-between items-center">
        <div className="text">
          <h2 className="text-2xl font-bold text-green-700 mb-4">{selectedBrand.name}</h2>
      <p className="text-gray-700">{selectedBrand.slug}</p>

        </div>
        <div className="img">
          <img src={selectedBrand.image} alt="" />
        </div>
      </div>
      <div className="footer flex justify-end ">
        <button   onClick={()=>closeModal()} type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Close</button>

      </div>
      
    </div>
  </div>
)}


  </>
}
