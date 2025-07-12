import React, { useContext, useEffect, useState } from 'react'
import Style from "./ProductDetails.module.css"
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';
import { ClipLoader } from 'react-spinners';
import { wishlistContext } from '../../Context/WishlistContextProvider';
export default function ProductDetails() {
 let {id,category}= useParams();
 let [product,setProduct]=useState(null)
  let [Loading,setLoading]=useState(null)
  let [relatedProducts,setrelatedProducts]=useState(null)
  let { favFlag, toggleWishlist } = useContext(wishlistContext);


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
document.title="ProductDetails | My Shop";
  getSpecificProduct(id)
  getProducts(category)
 },[id])


 if(Loading){
    return <div className='flex justify-center h-screen items-center'><ClipLoader /></div>
  }
 

return (
  <div>
    <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-5 md:items-center p-4 bg-white dark:bg-gray-900 text-black dark:text-white rounded-md">
      <div className="image w-full">
        <img
          src={product?.imageCover}
          alt={product?.title}
          className="w-full h-auto object-contain rounded-md shadow-md"
        />
      </div>

      <div className="info space-y-3 ">
        <h2 className="text-xl font-bold">{product?.title}</h2>
        <h2 className="text-gray-600 dark:text-gray-300">{product?.description}</h2>
       <div className="flex justify-between items-center">
  <h2 className="text-sm font-medium text-green-700 dark:text-green-400">
    {product?.category.name}
  </h2>
  
  {product && (
  <span
    onClick={() => toggleWishlist(product._id)}
    className="text-2xl cursor-pointer"
  >
    <i
      className={`fa-solid fa-heart ${
        favFlag[product._id] ? "text-red-600" : "text-gray-400"
      }`}
    ></i>
  </span>
)}

</div>


        <div className="flex justify-between items-center">
          {product?.priceAfterDiscount ? (
            <div className="flex gap-2">
              <h3 className="text-red-600 line-through">{product?.price} EGP</h3>
              <h3 className="text-black dark:text-white">
                {product?.priceAfterDiscount} EGP
              </h3>
            </div>
          ) : (
            <h3 className="text-black dark:text-white">{product?.price} EGP</h3>
          )}

          <span className=" text-sm flex items-center gap-1">
            <i className="fa-solid fa-star text-yellow-400"></i>
            {product?.ratingsAverage}
          </span>
        </div>

        <button className="hover:bg-green-500 hover:text-white border border-green-500 bg-white dark:bg-gray-800 text-green-700 dark:text-green-400 py-2 px-4 rounded-md transition duration-200 w-full">
          Add To Cart
        </button>
      </div>
    </div>

    <h2 className="text-2xl font-bold dark:text-white py-6">Related Products</h2>

    <div className="parent gap-3 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
      {relatedProducts?.map((product) => (
        <div
          key={product._id}
          className="group relative rounded-md overflow-hidden shadow-md p-2 transition duration-300 hover:shadow-green-600 bg-white dark:bg-gray-800 text-black dark:text-white"
        >
          <Link to={`/productDetails/${product._id}/${product.category.name}`}>
            <img
              src={product.imageCover}
              alt={product.title}
              className="w-full h-48 object-cover rounded-md"
            />
            <h3 className="text-sm text-green-600 font-semibold pt-4">
              {product.category.name}
            </h3>
            <h2 className="text-md font-medium text-gray-800 dark:text-white">
              {product.title.split(" ", 2).join(" ")}
            </h2>

            <div className="flex items-center gap-1 text-yellow-400 text-sm mt-1">
              <i className="fa-solid fa-star"></i>
              <span className="text-gray-700 dark:text-gray-300">
                {product.ratingsAverage?.toFixed(1)}
              </span>
            </div>

            {/* السعر + القلب */}
            <div className="flex justify-between items-center mt-1">
              <div>
                {product.priceAfterDiscount ? (
                  <>
                    <h3 className="text-red-600 line-through">{product.price} EGP</h3>
                    <h3 className="text-black dark:text-white">
                      {product.priceAfterDiscount} EGP
                    </h3>
                  </>
                ) : (
                  <h3 className="text-black dark:text-white">{product.price} EGP</h3>
                )}
              </div>

              {/*  القلب */}
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  toggleWishlist(product._id);
                }}
                className="text-xl cursor-pointer"
              >
                <i
                  className={`fa-solid fa-heart ${
                    favFlag[product._id] ? "text-red-600" : "text-gray-400"
                  }`}
                ></i>
              </span>
            </div>

            {product.priceAfterDiscount && (
              <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-1 rounded-sm dark:bg-red-900 dark:text-red-300 absolute top-2 left-2">
                Sale
              </span>
            )}
          </Link>

          <button
            className="translate-y-[200%] group-hover:translate-y-0 transition-transform duration-300 
              hover:bg-green-500 hover:text-white border border-green-500 
              bg-white dark:bg-gray-900 text-green-700 dark:text-green-400 
              py-1.5 w-full mt-3 rounded-md text-sm"
          >
            Add To Cart
          </button>
        </div>
      ))}
    </div>
  </div>
);

}
