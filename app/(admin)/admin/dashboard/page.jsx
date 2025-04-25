"use client";

import { Button } from "@/components/ui/button";
export default function AdminDashboard() {
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Overview</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            This Week
          </Button>
          <Button variant="outline" size="sm">
            This Month
          </Button>
          <Button variant="outline" size="sm">
            This Year
          </Button>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Cards như cũ */}
      </div>

      {/* Recent Orders table như cũ */}
    </>
  );
}
