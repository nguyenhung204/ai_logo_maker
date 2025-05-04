import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RefreshCw, DollarSign, CreditCard, Package } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function RecentTransactions({ recentTransactions, isLoading }) {
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount);
  };
  

  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow duration-300">
      <CardHeader className="pb-2 border-b">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <DollarSign className="h-5 w-5 text-primary" />
          <span>Recent Transactions</span>
        </CardTitle>
        <CardDescription>Latest credit purchases</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        {isLoading ? (
          <div className="p-8 flex justify-center items-center">
            <RefreshCw className="h-8 w-8 animate-spin text-primary/60" />
          </div>
        ) : recentTransactions.length > 0 ? (
          <div className="divide-y">
            {recentTransactions.map((transaction, index) => (
              <div key={index} className="p-4 hover:bg-muted/30 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="relative h-12 w-12 rounded-md overflow-hidden border bg-muted/20 flex-shrink-0">
                    {transaction.packageImage ? (
                      <Image
                        src={transaction.packageImage}
                        alt={transaction.package || "Package"}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 48px"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-muted">
                        <Package className="h-5 w-5 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-sm" title={transaction.package}>
                          {transaction.package || "Standard Package"}
                        </h3>
                        <p className="text-xs text-muted-foreground truncate">
                          by {transaction.user || 'Unknown User'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-3.5 w-3.5" />
                        <span>{formatAmount(transaction.amount || 0)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <CreditCard className="h-3.5 w-3.5" />
                        <span>{transaction.credits || 0} credits</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-3 flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">
                    {formatDate(transaction.date)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            <DollarSign className="h-12 w-12 mx-auto mb-3 text-muted-foreground/50" />
            <p>No transactions have been made yet</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}