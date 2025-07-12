import React, { useContext, useEffect, useRef, useState } from 'react'
import Style from "./DisplayProducts.module.css"
import axios from 'axios'
import { data, Link, useNavigate } from 'react-router-dom'
import { ClipLoader } from 'react-spinners'
import CartContextProvider, { cartContext } from '../../Context/CartContextProvider'
import toast from 'react-hot-toast'
import { wishlistContext } from '../../Context/WishlistContextProvider'
import { authContext } from '../../Context/AuthContextProvider'

export default function DisplayProducts() {
  let { addToCart } = useContext(cartContext)
  let { favFlag, toggleWishlist } = useContext(wishlistContext)
  let [products, setProducts] = useState(null)
  let [Loading, setLoading] = useState(null)
  let inputRef = useRef("")
  const [filteredProducts, setFilteredProducts] = useState([]);
  let navigate = useNavigate();
let {token}=useContext(authContext);
  async function addTOCartProduct(id) {
    if (!token) {
     toast.error("You must login first to add products.", {
      duration: 2000, 
    });
   setTimeout(() => {
      navigate("/login");
    }, 2000);
    return; }

    let flag = addToCart(id)
    if (flag) {
      toast.success('Successfully created!')
    } else {
      toast.error('This is an error!')
    }
  }

  async function getProducts() {
    setLoading(true)
    let { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/products")
    setProducts(data.data)
    setFilteredProducts(data.data)
    setLoading(false)
  }

  function searchProducts() {
    const value = inputRef.current.value.toLowerCase();
    if (value === '') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product =>
        product.title.toLowerCase().includes(value)
      );
      setFilteredProducts(filtered);
    }
  }

  useEffect(() => {
    getProducts();
  }, [])

  if (Loading) {
    return <div className='flex justify-center h-screen items-center'><ClipLoader color="#16a34a" /></div>
  }

  return (
    <>
      <div className="mb-5">
        <input
          type="text"
          placeholder="Search by product name"
          className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white rounded-md px-4 py-2 w-2/3 mx-auto block"
          ref={inputRef}
          onInput={searchProducts}
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {filteredProducts?.map((product) => (
  <div
    key={product._id}
    className="group relative rounded-md overflow-hidden shadow-md p-3 transition duration-300 hover:shadow-green-600 bg-white dark:bg-gray-800 text-black dark:text-white"
  >
    {/* ✅ كل الكارت داخل الـ Link ما عدا القلب */}
    <Link to={`/productDetails/${product._id}/${product.category.name}`}>
      <img
        src={product.imageCover}
        alt={product.title}
        className="w-full h-48 object-cover rounded-md"
      />
      <h3 className="text-sm text-green-600 font-semibold pt-4">
        {product.category.name}
      </h3>
      <div className="flex justify-between items-center mt-1">
  <h2 className="text-md font-medium text-gray-800 dark:text-white">
    {product.title.split(" ", 2).join(" ")}
  </h2>

  {/* ⭐ Rating */}
  <div className="flex items-center gap-1 text-yellow-400 text-sm">
    <i className="fa-solid fa-star"></i>
    <span className="text-gray-700 dark:text-gray-300">
      {product.ratingsAverage?.toFixed(1)}
    </span>
  </div>
</div>

    </Link>

    {/* 💰 السعر + القلب */}
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

      {/* ❤️ القلب */}
      <span
        onClick={(e) => {
          // e.stopPropagation();
           if (!token) {
     toast.error("You must login first to add product in wishlist.", {
      duration: 2000, 
    });
   setTimeout(() => {
      navigate("/login");
    }, 2000);
    return; }
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

    {/* 🛒 زر Add to Cart */}
    <button
      onClick={() => addTOCartProduct(product._id)}
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
    </>
  );
}
