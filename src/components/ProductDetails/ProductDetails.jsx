import React, { useEffect, useState } from 'react'
import Style from "./ProductDetails.module.css"
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';
import { ClipLoader } from 'react-spinners';
export default function ProductDetails() {
 let {id,category}= useParams();
 let [product,setProduct]=useState(null)
  let [Loading,setLoading]=useState(null)
  let [relatedProducts,setrelatedProducts]=useState(null)

 async function getSpecificProduct(id){
  setLoading(true)
  let {data}=await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  setProduct(data.data)
  console.log(data.data);
  setLoading(false)

  
 }
 async function getProducts(category){
   
    let {data} =await axios.get("https://ecommerce.routemisr.com/api/v1/products")

    console.log(data.data);
    // let products=data.data;  //all products
    let newProducts=data.data.filter((product)=>{
        return product.category.name==category
    })
    setrelatedProducts(newProducts)
    console.log(newProducts);
    
  }
  // updating
 useEffect(()=>{
  getSpecificProduct(id)
  getProducts(category)
 },[id])


 if(Loading){
    return <div className='flex justify-center h-screen items-center'><ClipLoader /></div>
  }
 

  return (
    <div>
      <div className="grid grid-cols-[1fr_2fr] gap-3 items-center">
        <div className="image">
          <img src={product?.imageCover} alt={product?.title} />
        </div>
        <div className="info">
          <h2 className="mb-2">{product?.title}</h2>
          <h2 className="mb-2 text-gray-500">{product?.description}</h2>
          <h2 className="mb-2">{product?.category.name}</h2>
          <div className="flex justify-between">
            {product?.priceAfterDiscount ? (
              <div className="flex  gap-2">
                <h3 className="text-red-700 line-through">
                  {product?.price} EGP
                </h3>
                <h3 className="">{product?.priceAfterDiscount} EGP</h3>
              </div>
            ) : (
              <h3>{product?.price} EGP</h3>
            )}

            <span>
              <i className="fa-solid fa-star text-yellow-300"></i>
              {product?.ratingsAverage}
            </span>
          </div>
           <button className=" hover:bg-green-400 hover:text-white cursor-pointer duration-200  border border-green-400 py-1.5 w-full my-4 rounded-md">
          Add To Cart
        </button>
        </div>
       
      </div>
        <h2 className='text-2xl font-bold'>Related Products</h2>

      <div className="parent gap-3 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">

      {relatedProducts?.map((product)=> <div key={product._id} className='cursor-pointer group overflow-hidden shadow-xl p-2 relative'>
        <Link to={`/productDetails/${product._id}/${product.category.name}`}>
        <img src={product.imageCover} alt={product.title} />
        <h3 className='text-md text-green-500'>{product.category.name}</h3>
        <h2>{product.title.split(" ",2).join(" ")}</h2>
        <div className='flex justify-between'>
          {product.priceAfterDiscount?<>
           <h3 className='text-red-700 line-through'>{product.price} EGP</h3>
          <h3>{product.priceAfterDiscount} EGP</h3>
          </>:<h3>{product.price} EGP</h3>}
         

          <span><i class="fa-solid fa-star text-yellow-300"></i>{product.ratingsAverage}</span>

        </div>
        {product.priceAfterDiscount? 
        <span class="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-2 rounded-sm
         dark:bg-red-900 dark:text-red-300 absolute top-0">Sale</span> :null}
        </Link>

         <button className='translate-y-[200%] group-hover:translate-y-0 hover:bg-green-400 hover:text-white cursor-pointer duration-200  border border-green-400 py-1.5 w-full my-4 rounded-md'>Add To Cart</button>
        
        

      </div>)}

    </div>
    </div>

    
  );
}
