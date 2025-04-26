"use client";
import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { UserDetailContext, fetchUserFromDB, createSecureUserData } from "./(main)/_context/UserDetailContext";

const Provider = ({ children }) => {
  const { user, isLoaded: isUserLoaded } = useUser();
  const [userDetail, setUserDetail] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const refreshUserData = useCallback(async () => {
    if (!user) return;
    
    try {
      const email = user?.emailAddresses[0]?.emailAddress;
      const freshData = await fetchUserFromDB(email);
      
      if (freshData) {
        // Tạo phiên bản bảo mật của dữ liệu
        const secureUserData = createSecureUserData(freshData);
        setUserDetail(secureUserData);
      }
    } catch (error) {
      console.error("Error refreshing user data:", error);
    }
  }, [user]);

  // Kiểm tra và đăng ký người dùng
  const CheckUserAuth = async () => {
    setIsLoading(true);
    try {
      const result = await axios.post("/api/users", {
        userName: user?.fullName,
        userEmail: user?.emailAddresses[0]?.emailAddress,
      });
      
      // Tạo phiên bản bảo mật của dữ liệu
      const secureUserData = createSecureUserData(result.data);
      setUserDetail(secureUserData);
    } catch (error) {
      console.error("Error checking user auth:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Khởi tạo dữ liệu người dùng khi đăng nhập
  useEffect(() => {
    if (isUserLoaded) {
      if (user) {
        CheckUserAuth();
      } else {
        setIsLoading(false);
      }
    }
  }, [user, isUserLoaded]);

  // Thiết lập cơ chế refresh định kỳ để đồng bộ dữ liệu
  useEffect(() => {
    if (!user) return;
    
    // Refresh ngay lập tức sau khi đăng nhập
    const initialRefreshTimeout = setTimeout(() => {
      refreshUserData();
    }, 1000);
    

    return () => {
      clearTimeout(initialRefreshTimeout);
    };
  }, [user, refreshUserData]);

  // Hàm ghi đè đặc biệt để các component có thể gọi khi cần cập nhật dữ liệu
  const forceRefreshUserData = async () => {
    await refreshUserData();
  };

  return (
    <div>
      <UserDetailContext.Provider
        value={{ 
          userDetail, 
          setUserDetail: () => {
            console.warn("Direct state modification is not allowed. Use API endpoints instead.");
            // Không cho phép sửa đổi trực tiếp bằng devtools, chỉ cho phép thông qua API
          },
          isLoading,
          refreshUserData: forceRefreshUserData // Cung cấp hàm refresh cho components
        }}
      >
        {children}
      </UserDetailContext.Provider>
    </div>
  );
};

export default Provider;
