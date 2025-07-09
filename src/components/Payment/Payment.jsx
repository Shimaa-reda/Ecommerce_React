import React, { useContext, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { authContext } from '../../Context/AuthContextProvider';
import { cartContext } from '../../Context/CartContextProvider';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import * as YUP from 'yup';

export default function Payment() {
  const navigate = useNavigate();

  const { token } = useContext(authContext);
  const { cartId } = useContext(cartContext);
  const [cashFlag, setCashFlag] = useState(false);

  const schema = YUP.object().shape({
    details: YUP.string()
      .min(3, 'Details must be at least 3 characters')
      .required('Details are required'),
    phone: YUP.string()
      .matches(/^01[0125][0-9]{8}$/, 'Phone must be a valid Egyptian number')
      .required('Phone is required'),
    city: YUP.string()
      .min(2, 'City must be at least 2 characters')
      .required('City is required'),
  });

  function cashOrder(values) {
    axios
      .post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`, values, {
        headers: {
          token,
        },
      })
      .then(() => {
        navigate('/allorders');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function onlinePayment(values) {
    axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173`,
        values,
        {
          headers: {
            token,
          },
        }
      )
      .then((res) => {
        window.open(res.data.session.url, '_self');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function paymentOrder(values) {
    const shippingAddress = {
      shippingAddress: values,
    };

    if (cashFlag) {
      cashOrder(shippingAddress);
    } else {
      onlinePayment(shippingAddress);
    }
  }

  const paymentForm = useFormik({
    initialValues: {
      details: '',
      phone: '',
      city: '',
    },
    validationSchema: schema,
    onSubmit: paymentOrder,
  });

  return (
    <div className="h-[calc(100vh-80px)] flex justify-center items-center overflow-hidden">
      <form
        onSubmit={paymentForm.handleSubmit}
        className="w-full max-w-md bg-white shadow-lg rounded-lg p-8"
      >
        <h1 className="my-5 text-2xl text-center font-bold text-green-700">Payment</h1>

        {/* Details */}
        <div className="mb-4">
          <label htmlFor="details" className="block mb-2 text-sm font-medium text-gray-900">
            Details
          </label>
          <input
            type="text"
            name="details"
            id="details"
            value={paymentForm.values.details}
            onChange={paymentForm.handleChange}
            onBlur={paymentForm.handleBlur}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
            placeholder="Your Address Details"
          />
          {paymentForm.touched.details && paymentForm.errors.details && (
            <div className="p-2 my-2 text-xs text-red-700 bg-red-100 rounded text-center">
              {paymentForm.errors.details}
            </div>
          )}
        </div>

        {/* Phone */}
        <div className="mb-4">
          <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900">
            Phone
          </label>
          <input
            type="tel"
            name="phone"
            id="phone"
            value={paymentForm.values.phone}
            onChange={paymentForm.handleChange}
            onBlur={paymentForm.handleBlur}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
            placeholder="Phone Number"
          />
          {paymentForm.touched.phone && paymentForm.errors.phone && (
            <div className="p-2 my-2 text-xs text-red-700 bg-red-100 rounded text-center">
              {paymentForm.errors.phone}
            </div>
          )}
        </div>

        {/* City */}
        <div className="mb-4">
          <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900">
            City
          </label>
          <input
            type="text"
            name="city"
            id="city"
            value={paymentForm.values.city}
            onChange={paymentForm.handleChange}
            onBlur={paymentForm.handleBlur}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
            placeholder="Your City"
          />
          {paymentForm.touched.city && paymentForm.errors.city && (
            <div className="p-2 my-2 text-xs text-red-700 bg-red-100 rounded text-center">
              {paymentForm.errors.city}
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-6">
          <button
            onClick={() => setCashFlag(true)}
            type="submit"
            className="w-[48%] text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2.5"
          >
            Cash
          </button>
          <button
            onClick={() => setCashFlag(false)}
            type="submit"
            className="w-[48%] text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2.5"
          >
            Online
          </button>
        </div>
      </form>
    </div>
  );
}
