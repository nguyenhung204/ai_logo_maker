"use client";

import React from "react";

export default function UserStatusBadge({ status }) {
  return (
    <div className="flex items-center">
      <div
        className={`mr-2 h-2 w-2 rounded-full ${
          status === "active"
            ? "bg-green-500"
            : status === "locked"
            ? "bg-red-500"
            : "bg-yellow-500"
        }`}
      />
      {status || "active"}
    </div>
  );
}