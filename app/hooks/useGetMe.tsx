"use client";
import axios from "axios";
import React, { useEffect } from "react";
import { AppDispatch } from "../redux/store";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";
const useGetMe = () => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await axios.get("/api/me");
        dispatch(setUserData(result.data));
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, []);
};

export default useGetMe;
