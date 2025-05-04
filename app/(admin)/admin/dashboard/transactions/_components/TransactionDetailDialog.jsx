"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { format } from "date-fns";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";

export default function TransactionDetailDialog({
  transaction,
  isOpen,
  onClose,
  formatCurrency,
}) {
  if (!transaction) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Transaction Details</DialogTitle>
          <DialogDescription>
            Details for transaction ID: {transaction.id}
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-4">
          <div className="relative w-[80px] h-[80px] bg-accent rounded-md overflow-hidden">
            {transaction.packageImage && (
              <Image
                src={transaction.packageImage}
                alt={transaction.package || "Package image"}
                fill
                className="object-cover"
              />
            )}
          </div>
          
          <div>
            <h3 className="font-semibold text-lg">{transaction.package}</h3>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold">
                {formatCurrency(transaction.amount)}
              </span>
              <span className="text-muted-foreground">
                for {transaction.credits} credits
              </span>
            </div>
          </div>
        </div>
        
        <Separator className="my-4" />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-1">Customer</h4>
            <p className="font-medium">{transaction.user}</p>
            <p className="text-sm text-muted-foreground">{transaction.userEmail}</p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-1">Date</h4>
            <p className="font-medium">
              {transaction.date && format(new Date(transaction.date), 'PPP')}
            </p>
            <p className="text-sm text-muted-foreground">
              {transaction.date && format(new Date(transaction.date), 'p')}
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-1">Payment Method</h4>
            <p className="font-medium">{transaction.paymentMethod}</p>
          </div>
          
          {transaction.paymentId && (
            <div className="col-span-2">
              <h4 className="text-sm font-medium text-muted-foreground mb-1">Payment ID</h4>
              <p className="text-sm font-mono bg-muted p-2 rounded-md">{transaction.paymentId}</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}