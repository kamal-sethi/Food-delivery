"use client";
import { openSync } from "fs";
import {
  Cross,
  LogOut,
  Package,
  Search,
  SearchIcon,
  ShoppingCartIcon,
  User,
} from "lucide-react";
import mongoose from "mongoose";
import { AnimatePresence, MotionConfig } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { signOut } from "next-auth/react";
// import { RootState } from "@reduxjs/toolkit/query";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

interface IUser {
  _id?: mongoose.Types.ObjectId;
  name: string;
  email: string;
  password?: string;
  mobile?: string;
  role: "user" | "deliveryBoy" | "admin";
  image?: String;
}

const Nav = ({ user }: { user: IUser }) => {
  const { cartData } = useSelector((state: RootState) => state.cart);
  const [open, setOpen] = useState(false);
  const profileDropDown = useRef<HTMLDivElement>(null);
  const [searchBarOpen, setSearchBarOpen] = useState(false);
  const handleClickOutside = (e: MouseEvent) => {
    if (
      profileDropDown.current &&
      !profileDropDown.current.contains(e.target as Node)
    ) {
      setOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <div
      className="w-[95%] fixed top-4 left-1/2 -translate-x-1/2 bg-linear-to-r from-green-500
    to-green-700 rounded-2xl shadow-lg shadow-back/30 flex justify-between items-center h-20 px-4 
    md:px-8 z-50"
    >
      <Link
        className="text-white font-extrabold text-2xl sm:text-3xl tracking-wide hover:scale-105 transition-transform"
        href={"/"}
      >
        SnapCart
      </Link>
      <form className="hidden md:flex items-center bg-white rounded-full px-4 py-2 w-1/2 max-w-lg shadow-md">
        <Search className="text-gray-500 w-5 h-5 mr-2" />
        <input
          type="text"
          placeholder="Search groceries..."
          className="w-full outline-none text-gray-700 placeholder-gray-400"
        />
      </form>
      <div className="flex items-center gap-3 md:gap-6 relative">
        <div
          className="bg-white rounded-full w-11 h-11 flex items-center justify-center shadow-md
        hover:scale-105 transition md:hidden"
          onClick={() => setSearchBarOpen((prev) => !prev)}
        >
          <SearchIcon className="w-5 h-5 text-gray-500 cursor-pointer" />
        </div>
        <Link
          href={""}
          className="relative bg-white rounded-full w-11 h-11 flex items-center
          justify-center shadow-md hover:scale-105 transition"
        >
          <ShoppingCartIcon className="text-green-600 w-6 h-6" />
          <span
            className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex
          items-center justify-center rounded-full font-semibold shadow  "
          >
            {cartData.length}
          </span>
        </Link>
        <div className="relative" ref={profileDropDown}>
          <div
            className="bg-white rounded-full w-11 h-11 flex items-center justify-center 
        overflow-hidden cursor-pointer shadow-md  hover:scale-105 transition-transform"
            onClick={() => setOpen((prev) => !prev)}
          >
            {user.image ? (
              <Image
                src={user.image}
                alt="user"
                fill
                className="object-cover rounded-full"
              />
            ) : (
              <User />
            )}
          </div>
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                className="absolute right-0  mt-3 w-56 bg-white rounded-2xl shadow-xl border border-gray-200 p-3 z-[999]"
              >
                <div className="flex items-center relative gap-3 px-3 py-2 border-b border-gray-100">
                  <div className="w-10 relative h-10 rounded-full bg-green-100 flex items-center justify-center overflow-hidden">
                    {user.image ? (
                      <Image
                        src={user.image}
                        alt="user"
                        fill
                        className="object-cover rounded-full"
                      />
                    ) : (
                      <User />
                    )}
                  </div>
                  <div>
                    <div className="text-gray-800 font-seminold">
                      {user.name}
                    </div>
                    <div className="text-xs text-gray-500 capitalize">
                      {user.role}
                    </div>
                  </div>
                </div>

                <Link
                  href={""}
                  onClick={() => setOpen((prev) => !prev)}
                  className=" flex  items-center cursor-pointer gap-2 px-3 py-3 hover:bg-green-50 rounded-lg text-gray-700 font-medium"
                >
                  <Package className="w-5 h-5 text-green-600" />
                  My Orders
                </Link>
                <button
                  onClick={() => {
                    setOpen((prev) => !prev);
                    signOut({ callbackUrl: "/login" });
                  }}
                  className="flex items-center gap-2 justify-center px-3 py-3 cursor-pointer text-left hover:bg-red-50 rounded-lg text-gray-700 font-medium"
                >
                  <LogOut className="w-5 h-5 text-red-500" />
                  Logout
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {searchBarOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                className="fixed top-24 left-1/2 -translate-x-1 w-[90%] bg-white
                rounded-full shadow-lg z-40 flex items-center px-4 py-2"
              >
                <Search className="w-5 h-5 text-gray-500 mr-2 " />
                <form className="grow">
                  <input
                    className="w-full outline-none text-gray-700"
                    type="text"
                  />
                </form>
                <button>
                  <Cross className="w-5 h-5 text-gray-500" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Nav;
2;
