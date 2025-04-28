import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { RefreshCw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function RecentTransactions({ recentTransactions, isLoading }) {
  return (
    <Card className="md:col-span-2 lg:col-span-1 overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium">Recent Transactions</CardTitle>
          <Link href="/admin/dashboard/transactions" className="text-xs text-primary hover:underline">
            View all
          </Link>
        </div>
        <CardDescription>Latest credit purchase transactions</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        {isLoading ? (
          <div className="p-6 text-center">
            <RefreshCw className="h-6 w-6 animate-spin mx-auto text-muted-foreground" />
            <p className="text-sm text-muted-foreground mt-2">Loading transactions...</p>
          </div>
        ) : recentTransactions.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Package</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>
                    <div className="font-medium">{transaction.user}</div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(transaction.date).toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded bg-muted/20 flex items-center justify-center overflow-hidden">
                        <img 
                          src={transaction.packageImage} 
                          alt={transaction.package} 
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <Badge variant="outline">{transaction.package}</Badge>
                        <div className="text-xs text-muted-foreground mt-1">
                          {transaction.credits} credits
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    ${transaction.amount.toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            No transactions yet
          </div>
        )}
      </CardContent>
    </Card>
  );
}