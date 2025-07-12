import React, { useContext, useEffect } from 'react';
import { ClipLoader } from 'react-spinners';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { cartContext } from '../../Context/CartContextProvider';
// import { Helmet } from 'react-helmet-async';

export default function Cart() {
  const {
    getCart,
    updateQuantityProduct,
    ClearCart,
    products,
    numOfCart,
    totalPrice,
    Loading,
    removeProduct,
  } = useContext(cartContext);

  useEffect(() => {
    document.title = "Cart | My Shop";

    getCart();
  }, []);

  async function removeItemFromCart(id) {
    let flag = await removeProduct(id);
    flag ? toast.success('Deleted!') : toast.error('Error!');
  }

  async function updateQuantity(id, count) {
    let flag = await updateQuantityProduct(id, count);
    flag ? toast.success('Updated!') : toast.error('Error!');
  }

  async function deleteCart() {
    let flag = await ClearCart();
    flag ? toast.success('Cart Deleted!') : toast.error('Error!');
  }

  if (Loading) {
    return (
      <div className="flex justify-center h-screen items-center">
        <ClipLoader color="#16a34a" />
      </div>
    );
  }

  return (
    <div className='pt-[42px]'>
    {/* <Helmet><title>Cart</title></Helmet> */}

      {products?.length > 0 ? (
        <>
          {/* Summary for md screens only */}
          <div className="hidden md:flex lg:hidden justify-between items-center bg-white rounded-md shadow p-4 mx-4 my-4 ">
            <div className="space-y-1">
              <p className="text-sm text-gray-700">🛒 Items: <strong>{numOfCart}</strong></p>
              <p className="text-sm text-gray-700">💰 Price: <strong>{totalPrice} EGP</strong></p>
            </div>
            <div className="flex gap-2">
              <Link
                to="/payment"
                className="bg-green-600 hover:bg-green-700 text-white text-sm px-3 py-1 rounded"
              >
                Checkout
              </Link>
              <button
                onClick={deleteCart}
                className="bg-red-600 hover:bg-red-700 text-white text-sm px-3 py-1 rounded"
              >
                Clear Your Cart
              </button>
            </div>
          </div>

          {/* Layout for md and lg Screens */}
          <div className="hidden md:flex flex-col lg:flex-row gap-6 px-4 mt-2">
            <div className="w-full lg:w-3/4 relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th className="px-16 py-3">Image</th>
                    <th className="px-6 py-3">Product</th>
                    <th className="px-6 py-3">Qty</th>
                    <th className="px-6 py-3">Price</th>
                    <th className="px-6 py-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.product._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="p-4">
                        <img src={product.product.imageCover} className="w-16 md:w-32" alt={product.product.title} />
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                        {product.product.title}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <button onClick={() => updateQuantity(product.product._id, product.count - 1)} className="h-6 w-6 border rounded-full flex items-center justify-center text-sm me-2">-</button>
                          <span>{product.count}</span>
                          <button onClick={() => updateQuantity(product.product._id, product.count + 1)} className="h-6 w-6 border rounded-full flex items-center justify-center text-sm ms-2">+</button>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                        {product.price} EGP
                      </td>
                      <td className="px-6 py-4">
                        <button onClick={() => removeItemFromCart(product.product._id)} className="text-red-600 dark:text-red-500 hover:underline">
                          <i className="fa-solid fa-trash"></i> Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Cart Summary for large screens */}
            <div className="hidden lg:flex w-1/4 bg-white rounded-lg shadow-md p-4 flex-col justify-between h-fit mt-4 lg:mt-0 dark:bg-gray-700 dark:text-white">
              <h3 className="text-xl font-semibold mb-4 text-gray-700 dark:text-white ">Cart Summary</h3>
              <p className="text-gray-700 mb-2 dark:text-white">🛒 Items: <strong>{numOfCart}</strong></p>
              <p className="text-gray-700 mb-4 dark:text-white">💰 Total: <strong>{totalPrice} EGP</strong></p>
              <Link to="/payment" className="text-white bg-green-600 hover:bg-green-700 font-medium rounded-md text-sm px-4 py-2 text-center mb-3">
                Checkout
              </Link>
              <button onClick={deleteCart} className="text-white bg-red-600 hover:bg-red-700 font-medium rounded-md text-sm px-4 py-2">
                Clear Your Cart
              </button>
            </div>
          </div>

          {/* Mobile View */}
          <div className="block md:hidden space-y-4 mt-6">
            <div className="flex flex-col items-center justify-center bg-white p-4 w-11/12 mx-auto rounded-md shadow dark:bg-gray-700 dark:text-white">
              <div className="flex justify-between w-full mb-3 text-sm text-gray-800 font-medium dark:text-white">
                <span>🛒 Products: <strong>{numOfCart}</strong></span>
                <span>💰 Total: <strong>{totalPrice} EGP</strong></span>
              </div>
              <div className="flex gap-3 w-full">
                <Link to="/payment" className="flex-1 text-center text-white bg-green-600 hover:bg-green-700 font-medium rounded-md text-sm px-2 py-2">
                  Checkout
                </Link>
                <button onClick={deleteCart} className="flex-1 text-center text-white bg-red-600 hover:bg-red-700 font-medium rounded-md text-sm px-2 py-2">
                  Clear Your Cart
                </button>
              </div>
            </div>

            {products.map((product) => (
              <div key={product.product._id} className="bg-white rounded-lg shadow p-4 flex flex-col gap-2 w-11/12 max-w-sm mx-auto dark:bg-gray-700 dark:text-white">
                <img src={product.product.imageCover} alt={product.product.title} className="w-full h-auto rounded-md dark:text-white" />
                <h3 className="text-lg font-semibold">{product.product.title}</h3>
                <p className="text-sm text-gray-600 dark:text-white">{product.price} EGP</p>
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <button onClick={() => updateQuantity(product.product._id, product.count - 1)} className="h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full flex items-center justify-center">-</button>
                    <span>{product.count}</span>
                    <button onClick={() => updateQuantity(product.product._id, product.count + 1)} className="h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full flex items-center justify-center">+</button>
                  </div>
                  <button onClick={() => removeItemFromCart(product.product._id)} className="text-red-500 text-sm flex items-center gap-1">
                    <i className="fa-solid fa-trash"></i> Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="h-[465px] flex items-center justify-center dark:text-white">
          Your Cart is Empty
        </div>
      )}
    </div>
  );
}
