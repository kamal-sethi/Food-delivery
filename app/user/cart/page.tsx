"use client";

import { ArrowLeft, Minus, Plus, ShoppingBasket, Trash2 } from "lucide-react";
import Link from "next/link";
import React from "react";
import { AnimatePresence, motion } from "motion/react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import Image from "next/image";
import {
  decreaseQuantity,
  deleteItem,
  increaseQuantity,
} from "@/app/redux/cartSlice";
// import { Router } from "next/router";
// import { useRouter } from "next/router";
import { useRouter } from "next/navigation";
const CartPage = () => {
  const { cartData, subTotal, finalTotal, deliveryFee } = useSelector(
    (state: RootState) => state.cart,
  );
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  return (
    <div className="w-[95%] sm:w-[90%] md:w-[80%] max-w-7xl mx-auto mt-8 ">
      {/* Back Link */}
      <div className="mb-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-green-700 hover:text-green-800 font-medium transition-all w-fit"
        >
          <ArrowLeft size={25} />
          <span className="hidden sm:inline">Back to Home</span>
        </Link>
      </div>

      {/* Page Title */}
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-700 text-center mb-12"
      >
        Your Shopping Cart
      </motion.h2>

      {/* Empty Cart */}
      {cartData.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-center py-20 bg-white rounded-2xl shadow-md"
        >
          <ShoppingBasket className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 text-lg mb-6">
            Your Cart is empty. Add some groceries to continue shopping!
          </p>
          <Link
            href="/"
            className="bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition-all inline-block font-medium"
          >
            Continue Shopping
          </Link>
        </motion.div>
      ) : (
        /* Flex Container: Products LEFT, Order Summary RIGHT */
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start mt-10">
          {/* Products Section - LEFT SIDE (scrollable) */}
          <div className="w-full md:w-[65%] flex flex-col gap-2 ">
            <AnimatePresence>
              {cartData.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex flex-col sm:flex-row items-center bg-white rounded-2xl shadow-md p-5 hover:shadow-xl transition-all duration-300 border border-gray-100"
                >
                  {/* Product Image */}
                  <div className=" w-28 h-28 sm:w-24 sm:h-24 md:w-28 md:h-28 flex-shrink-0 rounded-xl overflow-hidden bg-gray-50">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={112}
                      height={112}
                      className="object-contain p-3 transition-transform duration-300 hover:scale-105"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="mt-4 sm:mt-0 sm:ml-4 flex-1 text-center sm:text-left">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-800 line-clamp-1">
                      {item.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500">
                      {item.unit}
                    </p>
                    <p className="text-green-700 font-bold mt-1 text-sm sm:text-base">
                      ₹{Number(item.price) * item.quantity}
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center justify-center sm:justify-end gap-3 mt-3 sm:mt-0 bg-gray-50 px-3 py-2 rounded-full">
                    <button
                      className="bg-white p-1.5 cursor-pointer  rounded-full hover:bg-green-100 transition-all border border-gray-200"
                      onClick={() => dispatch(decreaseQuantity(item._id))}
                    >
                      <Minus size={14} className="text-green-700" />
                    </button>
                    <span className="font-semibold text-gray-800 w-6 text-center">
                      {item.quantity}
                    </span>
                    <button
                      className="bg-white p-1.5 cursor-pointer  rounded-full hover:bg-green-100 transition-all border border-gray-200"
                      onClick={() => dispatch(increaseQuantity(item._id))}
                    >
                      <Plus size={14} className="text-green-700" />
                    </button>
                  </div>

                  {/* Delete */}
                  <button
                    className="sm:ml-4 mt-3 sm:mt-0 cursor-pointer text-red-500 hover:text-red-700 transition-all"
                    onClick={() => dispatch(deleteItem(item._id))}
                  >
                    <Trash2 size={18} />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Order Summary Section - RIGHT SIDE (fixed/sticky) */}
          <div className="w-full md:w-[35%]">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 sticky top-6"
            >
              <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">
                Order Summary
              </h2>

              <div className="space-y-3 text-gray-700 text-sm sm:text-base">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-green-700 font-semibold">
                    ₹{subTotal}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span className="text-green-700 font-semibold">
                    ₹{deliveryFee}
                  </span>
                </div>
                <hr className="my-3" />
                <div className="flex justify-between font-bold text-lg">
                  <span>Final Total</span>
                  <span className="text-green-700 font-semibold">
                    ₹{finalTotal}
                  </span>
                </div>
              </div>

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push("/user/checkout")}
                className="w-full mt-6 cursor-pointer bg-green-600 text-white py-3 rounded-full hover:bg-green-700 transition-all font-semibold text-sm sm:text-base"
              >
                Proceed to Checkout
              </motion.button>
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
