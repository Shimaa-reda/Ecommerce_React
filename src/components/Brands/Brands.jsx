import React, { useEffect, useState } from 'react'
import Style from "./Brands.module.css"
import axios from 'axios';
import { ClipLoader } from 'react-spinners';
import { useQuery } from '@tanstack/react-query';
// import { Helmet } from 'react-helmet-async';
export default function Brands() {
   let [brands,setBrands]=useState(null)
   const [selectedBrand, setSelectedBrand] = useState(null);
   const [loading, setLoading] = useState(false);
   let [Loadingbrands,setLoadingbrands]=useState(null)
const [showModal, setShowModal] = useState(false);
async function AllBrands(){
  return await axios.get("https://ecommerce.routemisr.com/api/v1/brands")
} 
async function getSpecificBrand(brandId) {

    setLoadingbrands(true);
    setShowModal(false);

    setSelectedBrand(brandId);

  await axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${brandId}`).then((res)=>{
     setSelectedBrand(res.data.data);
  
  setShowModal(true);

  }).catch((error)=>{
      console.log(error);
      
    }).finally(()=>{
       setLoadingbrands(false); 
    })
  
}

let {data,isLoading,isError,error}=useQuery({
  queryKey:["Brands"],
  queryFn:AllBrands,
  // refetchInterval:3000
  // staleTime:10000
  // retry:3
  // retryDelay:3000
  // refetchIntervalInBackground:false
  // refetchOnWindowFocus:true
  // gcTime:3000
  select:(data)=>{
    return data.data.data     //بدل ما استخدم data.data.data اقدر دلوقتي استخدم data علي طول 
  },
  
  
  
})
// console.log(x);


  
    // async function getAllBrands(){
    //   setLoading(true)
    //   let {data}= await axios.get("https://ecommerce.routemisr.com/api/v1/brands")
    //   console.log(data.data);

    //   setBrands(data.data)
    //   setLoading(false)
      
  
    // }
     useEffect(() => {
    document.title = "brands | My Shop";
  }, []);


      if(isLoading||Loadingbrands){
    return <div className='flex justify-center h-screen items-center'><ClipLoader color="#16a34a"/></div>
  }
 

  

  return <>
  {/* <Helmet><title>Brands</title></Helmet> */}

  <div className="parent grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-6 p-8">
    {data?.map((brand)=><div className="border rounded-md shadow-md overflow-hidden text-center" 
                               onClick={() => getSpecificBrand(brand._id)} key={brand._id}>
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
    <div className="relative z-10 bg-white  p-6 rounded-lg shadow-lg w-[90%] max-w-md ">
      <button
        className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl"
        onClick={()=>setShowModal(false)}
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
        <button   onClick={()=>setShowModal(false)} type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Close</button>

      </div>
      
    </div>
  </div>
)}


  </>
}
