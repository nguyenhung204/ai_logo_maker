"use client";
import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import { AlertCircle } from "lucide-react";
import {
  UserDetailContext,
  fetchUserFromDB,
  createSecureUserData,
} from "./(main)/_context/UserDetailContext";

const Provider = ({ children }) => {
  const { user, isLoaded: isUserLoaded, isSignedIn } = useUser();
  const [userDetail, setUserDetail] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isAccountLocked, setIsAccountLocked] = useState(false);

  // Kiểm tra người dùng đăng nhập chưa
  useEffect(() => {
    if (!isSignedIn) {
      setUserDetail(null);
      setIsAccountLocked(false);
    }
  }, [isSignedIn]);

  const refreshUserData = useCallback(async () => {
    if (!user) return;

    try {
      const email = user?.emailAddresses[0]?.emailAddress;
      const freshData = await fetchUserFromDB(email);

      if (freshData) {
        const secureUserData = createSecureUserData(freshData);
        setUserDetail(secureUserData);
        
        // Check if account is locked
        if (freshData.status === "locked") {
          setIsAccountLocked(true);
        } else {
          setIsAccountLocked(false);
        }
      }
    } catch (error) {
      console.error("Error refreshing user data:", error);
    }
  }, [user]);

  const CheckUserAuth = async () => {
    setIsLoading(true);
    try {
      const result = await axios.post("/api/users", {
        userName: user?.fullName,
        userEmail: user?.emailAddresses[0]?.emailAddress,
      });
      
      const secureUserData = createSecureUserData(result.data);
      setUserDetail(secureUserData);
      
      // Check if account is locked
      if (result.data.status === "locked") {
        setIsAccountLocked(true);
      }
    } catch (error) {
      console.error("Error checking user auth:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isUserLoaded) {
      if (user) {
        CheckUserAuth();
      } else {
        setIsLoading(false);
      }
    }
  }, [user, isUserLoaded]);

  useEffect(() => {
    if (!user) return;
    const initialRefreshTimeout = setTimeout(() => {
      refreshUserData();
    }, 1000);
    
    return () => {
      clearTimeout(initialRefreshTimeout);
    };
  }, [user, refreshUserData]);

  // Display notification for locked accounts
  useEffect(() => {
    if (isAccountLocked) {
      toast.error("Your account has been locked", {
        description: "Please contact support for assistance",
        icon: <AlertCircle className="h-5 w-5" />,
        duration: Infinity,
      });
    }
  }, [isAccountLocked]);

  const forceRefreshUserData = async () => {
    await refreshUserData();
  };

  // If account is locked, only show the account locked message
  if (isAccountLocked && !isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Account Locked</h1>
          <p className="text-gray-600 mb-6">
            Your account has been locked by an administrator. Please contact support for assistance.
          </p>
          <div className="border-t border-gray-200 pt-4 text-sm text-gray-500">
            If you believe this is an error, please email us at support@ailogocreator.com
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <UserDetailContext.Provider
        value={{
          userDetail,
          setUserDetail: () => {
            console.warn("Direct state modification is not allowed. Use API endpoints instead.");
          },
          isLoading,
          refreshUserData: forceRefreshUserData
        }}
      >
        {children}
      </UserDetailContext.Provider>
    </div>
  );
};

export default Provider;
