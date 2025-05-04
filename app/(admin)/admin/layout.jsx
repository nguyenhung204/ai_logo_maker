"use client";

import { useEffect } from "react";
import { redirect, notFound } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { UserDetailContext } from "@/app/(main)/_context/UserDetailContext";
import { useContext } from "react";
import { AdminDataProvider } from "./_context/AdminDataContext";

export default function AdminLayout({ children }) {
  const { isSignedIn, isLoaded } = useUser();
  const { userDetail, isLoading } = useContext(UserDetailContext);

  useEffect(() => {
    if (!isLoaded || isLoading) return;
    if (!isSignedIn) {
      redirect("/");
    }
    if (userDetail && userDetail.role !== "admin") {
      notFound();
    }
  }, [isSignedIn, isLoaded, userDetail, isLoading]);
  
  if (!isLoaded || isLoading || !userDetail) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (userDetail.role !== "admin") {
    return null;
  }

  return (
    <AdminDataProvider>
      {children}
    </AdminDataProvider>
  );
}