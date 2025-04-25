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
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function Sidebar({ isOpen, onClose }) {
  const [openOrders, setOpenOrders] = useState(false);

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
            className="flex items-center gap-3 rounded-md bg-accent px-3 py-2 text-accent-foreground"
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
            href="#"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground hover:text-foreground"
          >
            <Users className="h-4 w-4" />
            <span>Users</span>
          </Link>

          <div className="relative">
            <button
              type="button"
              onClick={() => setOpenOrders(!openOrders)}
              className="w-full flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground hover:text-foreground"
            >
              <ShoppingCart className="h-4 w-4" />
              <span>Orders</span>
              {openOrders ? (
                <ChevronUp className="ml-auto h-4 w-4" />
              ) : (
                <ChevronDown className="ml-auto h-4 w-4" />
              )}
            </button>
            {openOrders && (
              <div className="pl-4 mt-1 space-y-1">
                <Link
                  href="#"
                  className="block px-3 py-2 text-sm text-muted-foreground hover:text-foreground"
                >
                  New Orders
                </Link>
                <Link
                  href="#"
                  className="block px-3 py-2 text-sm text-muted-foreground hover:text-foreground"
                >
                  Processing
                </Link>
                <Link
                  href="#"
                  className="block px-3 py-2 text-sm text-muted-foreground hover:text-foreground"
                >
                  Order History
                </Link>
              </div>
            )}
          </div>

          <Link
            href="#"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground hover:text-foreground"
          >
            <Package className="h-4 w-4" />
            <span>Products</span>
          </Link>

          <Link
            href="#"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground hover:text-foreground"
          >
            <FileText className="h-4 w-4" />
            <span>Reports</span>
          </Link>
        </nav>
      </div>
    </aside>
  );
}
