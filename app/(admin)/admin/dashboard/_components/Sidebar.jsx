"use client";

import Link from "next/link";
import {
  Users,
  ShoppingCart,
  Package,
  X,
  Home,
  ChevronDown,
  ChevronUp,
  LayoutDashboard,
  FileText,
  CreditCard,
  Image,
  Settings,
  BarChart2,
  Globe,
  Cpu
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

export function Sidebar({ isOpen, onClose }) {
  const [openOrders, setOpenOrders] = useState(false);
  const [openCredits, setOpenCredits] = useState(false);
  const [openContent, setOpenContent] = useState(false);
  const pathname = usePathname();

  const isActive = (path) => pathname === path;

  return (
    <aside
      className={`${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } fixed inset-y-0 z-50 flex w-64 flex-col border-r bg-muted/40 transition-transform duration-300 ease-in-out md:relative md:translate-x-0`}
    >
      {/* Header */}
      <div className="flex h-14 items-center border-b px-4">
        <Link
          href="/admin/dashboard"
          className="flex items-center gap-2 font-semibold"
        >
          <LayoutDashboard className="h-5 w-5" />
          <span>Admin Portal</span>
        </Link>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute right-2 md:hidden"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid gap-1 px-2">
          <Link
            href="/admin/dashboard"
            className={`flex items-center gap-3 rounded-md px-3 py-2 ${
              isActive("/admin/dashboard") 
                ? "bg-accent text-accent-foreground" 
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Home className="h-4 w-4" />
            <span>Overview</span>
          </Link>

          <div className="py-2">
            <div className="px-3 text-xs font-medium text-muted-foreground">
              Management
            </div>
          </div>

          <Link
            href="/admin/dashboard/users"
            className={`flex items-center gap-3 rounded-md px-3 py-2 ${
              isActive("/admin/dashboard/users") 
                ? "bg-accent text-accent-foreground" 
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Users className="h-4 w-4" />
            <span>User Management</span>
          </Link>

          <div className="relative">
            <button
              type="button"
              onClick={() => setOpenCredits(!openCredits)}
              className="w-full flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground hover:text-foreground"
            >
              <CreditCard className="h-4 w-4" />
              <span>Credits Management</span>
              {openCredits ? (
                <ChevronUp className="ml-auto h-4 w-4" />
              ) : (
                <ChevronDown className="ml-auto h-4 w-4" />
              )}
            </button>
            {openCredits && (
              <div className="pl-4 mt-1 space-y-1">
                <Link
                  href="/admin/dashboard/credits/packages"
                  className={`block px-3 py-2 text-sm ${
                    isActive("/admin/dashboard/credits/packages") 
                      ? "text-foreground font-medium" 
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Credit Packages
                </Link>
                <Link
                  href="/admin/dashboard/credits/promotions"
                  className={`block px-3 py-2 text-sm ${
                    isActive("/admin/dashboard/credits/promotions") 
                      ? "text-foreground font-medium" 
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Promotions
                </Link>
              </div>
            )}
          </div>

          <Link
            href="/admin/dashboard/logos"
            className={`flex items-center gap-3 rounded-md px-3 py-2 ${
              isActive("/admin/dashboard/logos") 
                ? "bg-accent text-accent-foreground" 
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Image className="h-4 w-4" />
            <span>Logo Management</span>
          </Link>
          
          <Link
            href="/admin/dashboard/transactions"
            className={`flex items-center gap-3 rounded-md px-3 py-2 ${
              isActive("/admin/dashboard/transactions") 
                ? "bg-accent text-accent-foreground" 
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <ShoppingCart className="h-4 w-4" />
            <span>Transactions</span>
          </Link>

          <Link
            href="/admin/dashboard/statistics"
            className={`flex items-center gap-3 rounded-md px-3 py-2 ${
              isActive("/admin/dashboard/statistics") 
                ? "bg-accent text-accent-foreground" 
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <BarChart2 className="h-4 w-4" />
            <span>Statistics</span>
          </Link>
          
          <div className="relative">
            <button
              type="button"
              onClick={() => setOpenContent(!openContent)}
              className="w-full flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground hover:text-foreground"
            >
              <Globe className="h-4 w-4" />
              <span>Website Content</span>
              {openContent ? (
                <ChevronUp className="ml-auto h-4 w-4" />
              ) : (
                <ChevronDown className="ml-auto h-4 w-4" />
              )}
            </button>
            {openContent && (
              <div className="pl-4 mt-1 space-y-1">
                <Link
                  href="/admin/dashboard/content/pages"
                  className={`block px-3 py-2 text-sm ${
                    isActive("/admin/dashboard/content/pages") 
                      ? "text-foreground font-medium" 
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Page Content
                </Link>
                <Link
                  href="/admin/dashboard/content/testimonials"
                  className={`block px-3 py-2 text-sm ${
                    isActive("/admin/dashboard/content/testimonials") 
                      ? "text-foreground font-medium" 
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Testimonials
                </Link>
              </div>
            )}
          </div>
          
          <Link
            href="/admin/dashboard/ai-model"
            className={`flex items-center gap-3 rounded-md px-3 py-2 ${
              isActive("/admin/dashboard/ai-model") 
                ? "bg-accent text-accent-foreground" 
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Cpu className="h-4 w-4" />
            <span>AI Model Settings</span>
          </Link>
        </nav>
      </div>
    </aside>
  );
}
