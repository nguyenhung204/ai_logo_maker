"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { db } from "@/config/FirebaseConfig";
import { 
  collection, 
  getDocs, 
  query,
  orderBy,
  doc
} from "firebase/firestore";
import { toast } from "sonner";
import { Download, RefreshCw, ChevronLeft, ChevronRight } from "lucide-react";

import TransactionFilters from "./TransactionFilters";
import TransactionTable from "./TransactionTable";
import TransactionDetailDialog from "./TransactionDetailDialog";

// Items per page
const ITEMS_PER_PAGE = 10;

export default function TransactionManagementContainer() {
  const [transactions, setTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateRangeFilter, setDateRangeFilter] = useState({ from: "", to: "" });
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [sortField, setSortField] = useState("date");
  const [sortDirection, setSortDirection] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [exportLoading, setExportLoading] = useState(false);

  // Fetch transactions data from Firestore
  const fetchTransactions = async () => {
    try {
      setIsLoading(true);
      const usersSnapshot = await getDocs(collection(db, "users"));
      const transactionsData = [];

      for (const userDoc of usersSnapshot.docs) {
        const userEmail = userDoc.id;
        const userData = userDoc.data();

        try {
          const transactionsQuery = query(
            collection(db, "users", userEmail, "transactions"),
            orderBy("date", "desc")
          );
          const transactionsSnapshot = await getDocs(transactionsQuery);

          transactionsSnapshot.forEach((doc) => {
            const transactionData = doc.data();
            
            // Get package image based on package name or credits
            let packageImage = "/buy-credits-logo-imgs/standard-package-logo.png"; // Default
            if (transactionData.package === "Basic Package" || transactionData.credits === 5) {
              packageImage = "/buy-credits-logo-imgs/basic-package-logo.png";
            } else if (transactionData.package === "Standard Package" || transactionData.credits === 20) {
              packageImage = "/buy-credits-logo-imgs/standard-package-logo.png";
            } else if (transactionData.package === "Professional Package" || transactionData.credits === 50) {
              packageImage = "/buy-credits-logo-imgs/professional-package-logo.png";
            } else if (transactionData.package === "Advanced Package" || transactionData.credits === 120) {
              packageImage = "/buy-credits-logo-imgs/advanced-package-logo.png";
            }
            
            // Extract numeric price
            const price = transactionData.price || "0.00";
            const priceNumeric =
              typeof price === "string"
                ? parseFloat(price.replace(/[^0-9.]/g, ""))
                : typeof price === "number"
                ? price
                : 0;
                
            // Handle date
            const date = transactionData.date?.toDate?.()
              ? transactionData.date.toDate().toISOString()
              : new Date().toISOString();
                
            transactionsData.push({
              id: doc.id,
              user: userData.name || "Unknown User",
              userEmail,
              amount: priceNumeric,
              credits: transactionData.credits || 0,
              package: transactionData.package || "Standard Package",
              packageImage,
              date,
              paymentMethod: transactionData.paymentMethod || "Credit Card",
              paymentId: transactionData.paymentId || "",
            });
          });
        } catch (error) {
          console.error(`Error fetching transactions for user ${userEmail}:`, error);
        }
      }

      setTransactions(transactionsData);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      toast.error("Failed to load transaction data");
    } finally {
      setIsLoading(false);
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchTransactions();
  }, []);

  // Refresh transaction data
  const refreshTransactionData = async () => {
    setIsRefreshing(true);
    await fetchTransactions();
    setIsRefreshing(false);
    toast.success("Transaction data refreshed");
  };

  // Handle sorting
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection(field === "date" ? "desc" : "asc");
    }
  };

  // Sort transactions
  const sortTransactions = (transactionsToSort) => {
    return [...transactionsToSort].sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];
      
      // Handle special case for dates
      if (sortField === "date") {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }
      
      // Handle numeric fields
      if (sortField === "amount" || sortField === "credits") {
        aValue = Number(aValue);
        bValue = Number(bValue);
      }
      
      // String comparison
      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortDirection === "asc" 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      
      // Number/Date comparison
      return sortDirection === "asc" 
        ? aValue - bValue 
        : bValue - aValue;
    });
  };

  // Filter transactions based on search term and date range
  const filteredTransactions = transactions.filter((transaction) => {
    // Search term filter
    const matchesSearch =
      (transaction.user?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (transaction.userEmail?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (transaction.package?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (transaction.id?.toLowerCase() || "").includes(searchTerm.toLowerCase());

    // Date range filter
    let matchesDateRange = true;
    if (dateRangeFilter.from) {
      const fromDate = new Date(dateRangeFilter.from);
      const transactionDate = new Date(transaction.date);
      matchesDateRange = matchesDateRange && transactionDate >= fromDate;
    }
    
    if (dateRangeFilter.to) {
      const toDate = new Date(dateRangeFilter.to);
      toDate.setHours(23, 59, 59, 999); // End of the day
      const transactionDate = new Date(transaction.date);
      matchesDateRange = matchesDateRange && transactionDate <= toDate;
    }

    return matchesSearch && matchesDateRange;
  });

  // Apply sorting to filtered transactions
  const sortedTransactions = sortTransactions(filteredTransactions);
  
  // Paginate transactions
  const totalPages = Math.ceil(sortedTransactions.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedTransactions = sortedTransactions.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Function to view transaction details
  const handleViewTransaction = (transaction) => {
    setSelectedTransaction(transaction);
    setIsDetailOpen(true);
  };

  // Function to close transaction details
  const handleCloseDetails = () => {
    setIsDetailOpen(false);
    setTimeout(() => setSelectedTransaction(null), 300);
  };

  // Export transactions to CSV
  const handleExportTransactions = () => {
    try {
      setExportLoading(true);
      
      // Prepare CSV content
      const headers = [
        "ID", "User", "Email", "Amount", "Credits", 
        "Package", "Date", "Payment Method"
      ];
      
      const csvContent = [
        headers.join(","),
        ...filteredTransactions.map(transaction => [
          `"${transaction.id}"`,
          `"${transaction.user || ''}"`,
          `"${transaction.userEmail || ''}"`, 
          transaction.amount.toFixed(2),
          transaction.credits || 0,
          `"${transaction.package || ''}"`,
          transaction.date ? new Date(transaction.date).toISOString() : "",
          `"${transaction.paymentMethod || ''}"`,
        ].join(","))
      ].join("\n");
      
      // Create downloadable file
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `transactions-export-${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast.success("Transactions exported successfully");
    } catch (error) {
      console.error("Error exporting transactions:", error);
      toast.error("Failed to export transactions");
    } finally {
      setExportLoading(false);
    }
  };

  // Function to format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Transaction Management</h1>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleExportTransactions}
            disabled={isLoading || exportLoading}
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button
            size="sm"
            onClick={refreshTransactionData}
            disabled={isLoading || isRefreshing}
            className="flex items-center gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          <TransactionFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            dateRangeFilter={dateRangeFilter}
            onDateRangeFilterChange={setDateRangeFilter}
            isLoading={isLoading}
          />

          <div className="mt-6 rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px]">Package</TableHead>
                  <TableHead 
                    className="cursor-pointer"
                    onClick={() => handleSort("user")}
                  >
                    User {sortField === "user" && (sortDirection === "asc" ? "↑" : "↓")}
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer"
                    onClick={() => handleSort("amount")}
                  >
                    Amount {sortField === "amount" && (sortDirection === "asc" ? "↑" : "↓")}
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer"
                    onClick={() => handleSort("credits")}
                  >
                    Credits {sortField === "credits" && (sortDirection === "asc" ? "↑" : "↓")}
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer"
                    onClick={() => handleSort("date")}
                  >
                    Date {sortField === "date" && (sortDirection === "asc" ? "↑" : "↓")}
                  </TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TransactionTable
                  transactions={paginatedTransactions}
                  isLoading={isLoading}
                  onView={handleViewTransaction}
                  formatCurrency={formatCurrency}
                />
              </TableBody>
            </Table>

            {totalPages > 1 && (
              <div className="flex items-center justify-end space-x-2 py-4 px-6 border-t">
                <div className="text-sm text-muted-foreground">
                  Page {currentPage} of {totalPages}
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <TransactionDetailDialog
        transaction={selectedTransaction}
        isOpen={isDetailOpen}
        onClose={handleCloseDetails}
        formatCurrency={formatCurrency}
      />
    </div>
  );
}