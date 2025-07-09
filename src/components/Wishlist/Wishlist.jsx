import React, { useContext, useEffect, useState } from 'react';
import { ClipLoader } from 'react-spinners';
import { wishlistContext } from '../../Context/WishlistContextProvider';
import { cartContext } from '../../Context/CartContextProvider';
import toast from 'react-hot-toast';


export default function Wishlist() {
  
  const { getWishlist, wishlistItems, removefromWishlist,loading } = useContext(wishlistContext);
  const { addToCart } = useContext(cartContext);

  useEffect(() => {
        document.title = "Wishlists | My Shop";

    getWishlist();
  }, []);

  async function removeItem(id) {
    const flag = await removefromWishlist(id);
    if (flag) {
      toast.success('Deleted from wishlist successfully!');
    } else {
      toast.error('Failed to remove from wishlist.');
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center h-screen items-center">
        <ClipLoader color="#16a34a" />
      </div>
    );
  }

  return (
   <>
   {/* <Helmet><title>Wishlists</title></Helmet> */}

  {wishlistItems?.length > 0 ? (
    <>
      {/* Large Screens Table (lg and above) */}
      <div className="hidden lg:block relative overflow-x-auto shadow-md sm:rounded-lg pt-20">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-16 py-3">Image</th>
              <th className="px-6 py-3">Product</th>
              <th className="px-6 py-3">Price</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {wishlistItems.map((item) => (
              <tr key={item.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td className="p-4">
                  <img
                    src={item.imageCover}
                    className="w-16 md:w-32 max-w-full max-h-full"
                    alt={item.title}
                  />
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                  {item.title}
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                  {item.price} EGP
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => addToCart(item.id)}
                      className="text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-4 py-2"
                    >
                      Add to Cart
                    </button>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-4 py-2"
                    >
                      Remove
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Medium Screens Table (md only) */}
      <div className="hidden md:flex lg:hidden flex-col gap-6 px-4 mt-4">
        <div className="w-full relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="px-6 py-3">Image</th>
                <th className="px-6 py-3">Product</th>
                <th className="px-6 py-3">Price</th>
                <th className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {wishlistItems.map((item) => (
                <tr key={item.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="p-2">
                    <img
                      src={item.imageCover}
                      className="w-20 max-w-full rounded"
                      alt={item.title}
                    />
                  </td>
                  <td className="px-4 py-4 font-semibold text-gray-900 dark:text-white">
                    {item.title}
                  </td>
                  <td className="px-4 py-4 font-semibold text-gray-900 dark:text-white">
                    {item.price} EGP
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => addToCart(item.id)}
                        className="text-white bg-green-600 hover:bg-green-700 font-medium rounded text-sm px-3 py-1"
                      >
                        Add
                      </button>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-white bg-red-600 hover:bg-red-700 font-medium rounded text-sm px-3 py-1"
                      >
                        Remove
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Cards (less than md) */}
      <div className="block md:hidden space-y-4 mt-4">
        {wishlistItems.map((item) => (
          <div key={item.id} className="bg-white rounded-lg p-4 shadow-md w-11/12 max-w-sm mx-auto">
            <img
              src={item.imageCover}
              alt={item.title}
              className="w-full h-[300px] object-cover rounded-md mb-3"
            />
            <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
            <p className="text-sm text-gray-600 mb-2">{item.price} EGP</p>
            <div className="flex gap-2">
              <button
                onClick={() => addToCart(item.id)}
                className="flex-1 text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-4 py-2"
              >
                Add to Cart
              </button>
              <button
                onClick={() => removeItem(item.id)}
                className="flex-1 text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-4 py-2"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  ) : (
    <div className="h-[465px] flex items-center justify-center">
      Your Wishlist is Empty
    </div>
  )}
</>

  );
}
