"use client";

import { useState, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import { UserDetailContext } from "../_context/UserDetailContext";
import ToolsDropdown from "./ToolsDropdown";

export default function Header() {
  const { user } = useUser();
  const { userDetail } = useContext(UserDetailContext);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { title: "Home", href: "/" },
    { title: "Logo Maker", href: "/create" },
    { title: "Buy Credits", href: "/buy-credits" },
    {
      title: "Tools",
      children: [
        { title: "🖌️ Edit Image", href: "/tools/edit" },
        { title: "🎨 Extract Colors", href: "/tools/extract-color" },
      ],
    },
    { title: "About", href: "/about" },
  ];

  const renderDesktopAuth = () => {
    if (!user) {
      return (
        <>
          <SignInButton mode="modal" className="hidden md:inline-flex">
            <Button variant="outline">Sign In</Button>
          </SignInButton>
          <SignUpButton className="hidden md:inline-flex">
            <Button>Sign Up</Button>
          </SignUpButton>
        </>
      );
    }

    return (
      <>
        <Link href="/dashboard">
          <Button variant="outline" className="hidden md:inline-flex">
            Dashboard
          </Button>
        </Link>
        {userDetail?.role === "admin" && (
          <Link href="/admin/dashboard">
            <Button variant="outline" className="hidden md:inline-flex">
              Manage
            </Button>
          </Link>
        )}
        <UserButton />
      </>
    );
  };

  const renderMobileAuth = () => {
    if (!user) {
      return (
        <>
          <SignInButton mode="modal">
            <Button variant="outline" className="w-full">
              Sign In
            </Button>
          </SignInButton>
          <SignUpButton>
            <Button className="w-full">Sign Up</Button>
          </SignUpButton>
        </>
      );
    }

    return (
      <>
        <Link href="/dashboard">
          <Button variant="outline" className="w-full">
            Dashboard
          </Button>
        </Link>
        {userDetail?.role === "admin" && (
          <Link href="/admin/dashboard">
            <Button variant="outline" className="w-full">
              Manage
            </Button>
          </Link>
        )}

        <div className="flex justify-evenly py-2">
          <UserButton afterSignOutUrl="/" />

          <div className="flex items-center gap-2 bg-yellow-300 px-3 py-1.5 rounded-full shadow-md w-fit">
            <Image
              src="/coin.png"
              alt="coin"
              width={20}
              height={20}
              className="w-5 h-5 object-contain"
            />
            <h2 className="font-bold text-white text-sm">
              {userDetail?.credits}
            </h2>
          </div>
        </div>
      </>
    );
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="flex justify-between h-16 items-center px-4 md:px-6">
        {/* Logo - Left */}
        <div className="flex w-1/4 items-center">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.png" alt="Logo" width={72} height={72} priority />
          </Link>
        </div>

        {/* Center nav */}
        <nav className="hidden w-2/4 md:block">
          <ul className="flex justify-center space-x-8 items-center">
            {navItems.map((item) => {
              const key = `${item.title}-${item.href || "group"}`;
              return item.children ? (
                <li key={key}>
                  <ToolsDropdown items={item.children} label={item.title} />
                </li>
              ) : (
                <li key={key}>
                  <Link
                    href={item.href}
                    className={`text-sm font-medium transition-colors hover:text-primary ${
                      pathname === item.href
                        ? "text-primary font-semibold"
                        : "text-muted-foreground"
                    }`}
                  >
                    {item.title}
                  </Link>
                </li>
              );
            })}

            {userDetail && (
              <div className="flex items-center gap-2 bg-yellow-300 px-3 py-1.5 rounded-full shadow-md">
                <Image
                  src="/coin.png"
                  alt="coin"
                  width={20}
                  height={20}
                  className="w-5 h-5 object-contain"
                />
                <h2 className="font-bold text-white text-sm">
                  {userDetail?.credits}
                </h2>
              </div>
            )}

            <div></div>
          </ul>
        </nav>

        <div className="ml-auto flex w-1/4 items-center justify-end gap-3">
          {renderDesktopAuth()}

          {/* Mobile Menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>

            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              </SheetHeader>

              <nav className="flex flex-col gap-6 pt-8">
                {navItems.map((item) => {
                  const key = `${item.title}-${item.href || "group"}`;

                  if (item.children) {
                    return (
                      <div key={key} className="flex flex-col gap-2">
                        <span className="font-semibold text-gray-800 text-base">
                          {item.title}
                        </span>
                        <div className="flex flex-col gap-1 pl-3 border-l-2 border-gray-200">
                          {item.children.map((child) => (
                            <Link
                              key={`${child.title}-${child.href}`}
                              href={child.href}
                              className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                              onClick={() => setOpen(false)}
                            >
                              {child.title}
                            </Link>
                          ))}
                        </div>
                      </div>
                    );
                  }

                  return (
                    <Link
                      key={key}
                      href={item.href}
                      className="text-base font-semibold text-gray-800 hover:text-primary transition-colors"
                      onClick={() => setOpen(false)}
                    >
                      {item.title}
                    </Link>
                  );
                })}
              </nav>

              <hr className="my-4" />

              <div className="mt-4 flex flex-col gap-2">
                {renderMobileAuth()}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
