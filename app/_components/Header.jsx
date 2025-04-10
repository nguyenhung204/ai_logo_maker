"use client";

import { Button } from "@/components/ui/button";
import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header = () => {
  const { user } = useUser();

  return (
    <div className="px-10 lg:px-32 xl:px-48 2xl:px-56 p-4 flex justify-between items-center shadow-sm">
      <Link href={"/"}>
        <Image src={"logo.svg"} width={180} height={180} alt="Logo" />
      </Link>
      <div className="flex gap-3 items-center">
        <Button className="min-w-[100px]">Get Started</Button>
        {!user && (
          <>
            <SignInButton mode="modal">
              <Button variant="signin" className="min-w-[100px]">
                Sign In
              </Button>
            </SignInButton>
            <SignUpButton>Sign Up</SignUpButton>
          </>
        )}

        {user && (
          <>
            <Button variant="outline" mode="modal">
              Dashboard
            </Button>
            <UserButton />
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
