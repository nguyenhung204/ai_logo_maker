"use client";

import React from "react";
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function CreditHistoryList({ creditHistory = [] }) {
  if (creditHistory.length === 0) {
    return (
      <div className="bg-muted/40 p-4 rounded-md text-center text-sm text-muted-foreground">
        No credit history availablee
      </div>
    );
  }

  return (
    <div className="max-h-[200px] overflow-y-auto border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Type</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {creditHistory.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{format(new Date(item.timestamp.toDate()), 'PPP')}</TableCell>
              <TableCell className={item.amount > 0 ? "text-green-500" : "text-red-500"}>
                {item.amount > 0 ? `+${item.amount}` : item.amount}
              </TableCell>
              <TableCell>{item.type}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}