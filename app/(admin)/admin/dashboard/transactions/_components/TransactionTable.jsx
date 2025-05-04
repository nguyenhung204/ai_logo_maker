"use client";

import React from "react";
import { format } from "date-fns";
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Eye } from "lucide-react";

export default function TransactionTable({
  transactions,
  isLoading,
  onView,
  formatCurrency
}) {
  
  if (isLoading) {
    return (
      <TableRow>
        <TableCell colSpan={7} className="text-center py-10 text-muted-foreground">
          Loading transactions...
        </TableCell>
      </TableRow>
    );
  }

  if (transactions.length === 0) {
    return (
      <TableRow>
        <TableCell colSpan={7} className="text-center py-10 text-muted-foreground">
          No transactions found matching your criteria.
        </TableCell>
      </TableRow>
    );
  }

  return (
    <>
      {transactions.map((transaction) => (
        <TableRow key={transaction.id}>
          <TableCell className="w-[80px]">
            <div className="relative w-[60px] h-[60px] bg-accent rounded-md overflow-hidden">
              {transaction.packageImage && (
                <Image
                  src={transaction.packageImage}
                  alt={transaction.package || "Package image"}
                  fill
                  className="object-cover"
                />
              )}
            </div>
          </TableCell>
          <TableCell>
            <div>
              <div className="font-medium">{transaction.user}</div>
              <div className="text-sm text-muted-foreground">{transaction.userEmail}</div>
            </div>
          </TableCell>
          <TableCell className="font-medium">
            {formatCurrency(transaction.amount)}
          </TableCell>
          <TableCell>{transaction.credits}</TableCell>
          <TableCell>
            {transaction.date && format(new Date(transaction.date), 'PP')}
          </TableCell>
          <TableCell className="text-right">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onView(transaction)}
            >
              <Eye className="h-4 w-4 mr-1" />
              View
            </Button>
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}