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
        { title: "✂️ Remove BG", href: "/tools/remove-bg" },
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
        <div className="flex justify-center py-2">
          <UserButton afterSignOutUrl="/" />
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
            <Image
              src="/logo.png"
              alt="Logo"
              width={128}
              height={128}
              priority
            />
          </Link>
        </div>

        {/* Center nav */}
        <nav className="hidden w-2/4 md:block">
          <ul className="flex justify-center space-x-8 items-center">
            {navItems.map((item) =>
              item.children ? (
                <li key={item.title}>
                  <ToolsDropdown items={item.children} label={item.title} />
                </li>
              ) : (
                <li key={item.href}>
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
              )
            )}
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

              <nav className="flex flex-col gap-4 pt-8">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-lg font-medium"
                    onClick={() => setOpen(false)}
                  >
                    {item.title}
                  </Link>
                ))}
                <div className="mt-4 flex flex-col gap-2">
                  {renderMobileAuth()}
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
