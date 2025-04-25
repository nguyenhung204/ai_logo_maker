"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { UserDetailContext } from "./(main)/_context/UserDetailContext";

const Provider = ({ children }) => {
  const { user, isLoaded: isUserLoaded } = useUser();
  const [userDetail, setUserDetail] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isUserLoaded) {
      if (user) {
        CheckUserAuth();
      } else {
        setIsLoading(false);
      }
    }
  }, [user, isUserLoaded]);

  const CheckUserAuth = async () => {
    setIsLoading(true);
    try {
      const result = await axios.post("/api/users", {
        userName: user?.fullName,
        userEmail: user?.emailAddresses[0]?.emailAddress,
      });
      setUserDetail(result.data);
    } catch (error) {
      console.error("Error checking user auth:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <UserDetailContext.Provider
        value={{ userDetail, setUserDetail, isLoading }}
      >
        {children}
      </UserDetailContext.Provider>
    </div>
  );
};

export default Provider;
