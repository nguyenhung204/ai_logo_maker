import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <div className="px-10 lg:px-32 xl:px-48 2xl:px-56 p-4 flex justify-between items-center shadow-sm">
      <Link href={"/"}>
        <Image src={"logo.svg"} width={180} height={180} alt="Logo" />
      </Link>
      <Button>Get Started</Button>
    </div>
  );
};

export default Header;
