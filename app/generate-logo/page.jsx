"use client";
import React, { useContext, useEffect, useState } from "react";
import { UserDetailContext } from "../_context/UserDetailContext";

const GenerateLogo = () => {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);

  return <div>
    Generate
  </div>;
};

export default GenerateLogo;
