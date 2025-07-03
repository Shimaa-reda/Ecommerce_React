import React, { useContext, useEffect, useRef, useState } from 'react'
import Style from "./DisplayProducts.module.css"
import axios from 'axios'
import { data, Link } from 'react-router-dom'
import { ClipLoader } from 'react-spinners'
import CartContextProvider, { cartContext } from '../../Context/CartContextProvider'
import toast from 'react-hot-toast'
import { wishlistContext } from '../../Context/WishlistContextProvider'
export default function DisplayProducts() {
  let {addToCart}=useContext(cartContext);;
  let {favFlag, toggleWishlist}=useContext(wishlistContext)
  


  let [products,setProducts]=useState(null)
  let [Loading,setLoading]=useState(null)
  let inputRef=useRef()
  const [filteredProducts, setFilteredProducts] = useState([]);

  async function addTOCartProduct(id){
   let flag=addToCart(id);
   if(flag){
    // alert("success");
    toast.success('Successfully created!');
   }
   else{
    // alert("error")
    toast.error('This is an error!');
   }
  }
  



  async function getProducts(){
    setLoading(true);
    let {data} =await axios.get("https://ecommerce.routemisr.com/api/v1/products")

    console.log(data.data);
    // let products=data.data;  //all products
    setProducts(data.data)
     setFilteredProducts(data.data);  //show all initially
    setLoading(false);


  }
  function searchProducts() {
  const value = inputRef.current.value.toLowerCase();

  if (value === '') {
    // Show all products if input is empty
    setFilteredProducts(products);
  } else {
    const filtered = products.filter(product =>
      product.title.toLowerCase().includes(value)
    );
    setFilteredProducts(filtered);
  }
}



  useEffect(()=>{
    getProducts();
  },[])

  if(Loading){
    return <div className='flex justify-center h-screen items-center'><ClipLoader /></div>
  }

  return <>
 <div className=''>
  
  
  <input
    type="text"
    placeholder="Search by product name"
    className="border border-gray-300 rounded-md px-4 py-2 w-2/3 mx-auto block my-20"
    ref={inputRef}
    onInput={searchProducts}
  />

 
</div>


    <div className="parent gap-3 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">

     {filteredProducts?.map((product) => (
  <div
    key={product._id}
    className="group relative rounded-md overflow-hidden shadow-md p-3 transition duration-300 hover:shadow-green-600"
  >
    {/* Product Link */}
    <Link to={`/productDetails/${product._id}/${product.category.name}`}>
      <img
        src={product.imageCover}
        alt={product.title}
        className="w-full h-48 object-contain mb-2"
      />

      <h3 className="text-sm text-green-600 font-semibold">
        {product.category.name}
      </h3>

      {/* Title & Heart Row */}
      <div className="flex justify-between items-center mb-1">
        <h2 className="text-md font-medium">
          {product.title.split(" ", 2).join(" ")}
        </h2>

        {/* Wishlist Heart */}
        <span
         
          className="cursor-pointer text-xl"
          onClick={async(e)=>{
            e.preventDefault();
          await toggleWishlist(product._id);
          }}
        >
         <i  className={`fa-heart ${
    favFlag[product._id] ? "fa-solid text-red-500" : "fa-regular text-red-400"
  }`}
 
/>

        </span>
      </div>

      {/* Price Section */}
      <div className="flex justify-between items-center text-sm">
        {product.priceAfterDiscount ? (
          <>
            <h3 className="text-red-600 line-through">{product.price} EGP</h3>
            <h3 className="text-black">{product.priceAfterDiscount} EGP</h3>
          </>
        ) : (
          <h3 className="text-black">{product.price} EGP</h3>
        )}

        <span className="text-yellow-400">
          <i className="fa-solid fa-star"></i> {product.ratingsAverage}
        </span>
      </div>

      {/* Sale Badge */}
      {product.priceAfterDiscount && (
        <span className="absolute top-2 left-2 bg-red-100 text-red-700 text-xs font-medium px-2 py-0.5 rounded">
          Sale
        </span>
      )}
    </Link>

    {/* Add to Cart Button */}
    <button
      onClick={() => addTOCartProduct(product._id)}
      className="translate-y-[200%] group-hover:translate-y-0 transition-transform duration-300 hover:bg-green-500 hover:text-white border border-green-500 py-1.5 w-full mt-3 rounded-md text-sm"
    >
      Add To Cart
    </button>
  </div>
))}



    </div>
  
  </>
}
