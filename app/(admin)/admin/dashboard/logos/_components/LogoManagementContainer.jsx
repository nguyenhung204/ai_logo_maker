"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { db } from "@/config/FirebaseConfig";
import { 
  collection, 
  getDocs, 
  doc, 
  deleteDoc, 
  writeBatch,
  query,
  orderBy,
  limit
} from "firebase/firestore";
import { toast } from "sonner";
import { Download, RefreshCw, ChevronLeft, ChevronRight } from "lucide-react";

import LogoFilters from "./LogoFilters";
import LogoTable from "./LogoTable";
import LogoDetailPanel from "./LogoDetailPanel";
import { Checkbox } from "@/components/ui/checkbox";

// Items per page
const ITEMS_PER_PAGE = 12;

export default function LogoManagementContainer() {
  const [logos, setLogos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLogo, setSelectedLogo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [sortField, setSortField] = useState("createdAt");
  const [sortDirection, setSortDirection] = useState("desc");
  const [selectedLogos, setSelectedLogos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [exportLoading, setExportLoading] = useState(false);
  const sheetCloseRef = useRef(null);

  // Fetch logos data from Firestore
  const fetchLogos = async () => {
    try {
      setIsLoading(true);
      const usersSnapshot = await getDocs(collection(db, "users"));
      const logosData = [];

      for (const userDoc of usersSnapshot.docs) {
        const userEmail = userDoc.id;
        const userData = userDoc.data();

        try {
          const logosQuery = query(
            collection(db, "users", userEmail, "logos"),
          );
          const logosSnapshot = await getDocs(logosQuery);

          logosSnapshot.forEach((doc) => {
            const logoData = doc.data();
            // Extract timestamp from document ID (assuming ID contains timestamp)
            let createdAtTimestamp;
            try {
              // Try to get timestamp from ID (e.g., if ID format is "timestamp_xxx")
              const timestamp = Number(doc.id.split('_')[0]);
              createdAtTimestamp = !isNaN(timestamp) ? 
                new Date(timestamp).toISOString() : 
                new Date().toISOString();
            } catch (error) {
              // Fallback to current date if ID can't be parsed
              createdAtTimestamp = new Date().toISOString();
            }
            
            logosData.push({
              id: doc.id,
              title: logoData.title || "Untitled Logo",
              image: logoData.image,
              previewUrl: logoData.image,
              createdAt: createdAtTimestamp,
              userName: userData.name || "Unknown User",
              userEmail: userEmail,
              logoType: logoData.title?.split(" ")[0] || "Custom",
              desc: logoData.desc || "",
            });
          });
        } catch (error) {
          console.error(`Error fetching logos for user ${userEmail}:`, error);
        }
      }

      setLogos(logosData);
    } catch (error) {
      console.error("Error fetching logos:", error);
      toast.error("Failed to load logos data");
    } finally {
      setIsLoading(false);
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchLogos();
  }, []);

  // Refresh logo data
  const refreshLogoData = async () => {
    setIsRefreshing(true);
    await fetchLogos();
    setSelectedLogos([]);
    setIsRefreshing(false);
    toast.success("Logo data refreshed");
  };

  // Handle sorting
  const handleSort = (field) => {
    if (sortField === field) {
      // Toggle direction if clicking the same field
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      // New field, default to descending for dates, ascending for other fields
      setSortField(field);
      setSortDirection(field === "createdAt" ? "desc" : "asc");
    }
  };

  // Sort logos
  const sortLogos = (logosToSort) => {
    return [...logosToSort].sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];
      
      // Handle special case for dates
      if (sortField === "createdAt") {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
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

  // Search for logos with search term
  const filteredLogos = logos.filter(logo => {
    // Filter by search term
    const matchesSearch = !searchTerm ||
      logo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      logo.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      logo.userEmail.toLowerCase().includes(searchTerm.toLowerCase());
      
    return matchesSearch;
  });

  // Sort and paginate
  const sortedLogos = sortLogos(filteredLogos);
  const totalPages = Math.ceil(sortedLogos.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedLogos = sortedLogos.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Toggle all logos selection on current page
  const toggleSelectAll = () => {
    if (selectedLogos.length === paginatedLogos.length) {
      setSelectedLogos([]);
    } else {
      const idsToSelect = paginatedLogos.map(logo => `${logo.userEmail}_${logo.id}`);
      setSelectedLogos(idsToSelect);
    }
  };

  // Toggle single logo selection
  const toggleSelectLogo = (userEmail, logoId) => {
    const compositeId = `${userEmail}_${logoId}`;
    setSelectedLogos(prevSelected => 
      prevSelected.includes(compositeId)
        ? prevSelected.filter(id => id !== compositeId)
        : [...prevSelected, compositeId]
    );
  };

  // Function to handle logo view
  const handleViewLogo = (logo) => {
    setSelectedLogo(logo);
    setSheetOpen(true);
  };

  const handleSheetClose = () => {
    setSheetOpen(false);
    setTimeout(() => {
      setSelectedLogo(null);
    }, 300);
  };

  const handleDeleteLogo = async (userEmail, logoId) => {
    try {
      setIsLoading(true);
      
      // Delete the logo document
      await deleteDoc(doc(db, "users", userEmail, "logos", logoId));
      
      // Update local state
      setLogos(logos.filter(logo => !(logo.userEmail === userEmail && logo.id === logoId)));
      
      // Clear from selected if present
      const compositeId = `${userEmail}_${logoId}`;
      if (selectedLogos.includes(compositeId)) {
        setSelectedLogos(selectedLogos.filter(id => id !== compositeId));
      }
      
      // Close the sheet
      setSheetOpen(false);
      
      toast.success("Logo deleted successfully");
    } catch (error) {
      console.error("Error deleting logo:", error);
      toast.error("Failed to delete logo");
    } finally {
      setIsLoading(false);
    }
  };

  // Bulk delete logos
  const handleBulkDelete = async () => {
    if (selectedLogos.length === 0) {
      toast.error("No logos selected");
      return;
    }

    try {
      setIsLoading(true);
      
      // Use batch for better performance
      const batch = writeBatch(db);
      
      // Parse composite IDs and prepare batch operations
      for (const compositeId of selectedLogos) {
        const [userEmail, logoId] = compositeId.split('_');
        const logoRef = doc(db, "users", userEmail, "logos", logoId);
        batch.delete(logoRef);
      }
      
      // Commit batch
      await batch.commit();
      
      // Update local state
      setLogos(logos.filter(logo => {
        const compositeId = `${logo.userEmail}_${logo.id}`;
        return !selectedLogos.includes(compositeId);
      }));
      
      setSelectedLogos([]);
      toast.success(`${selectedLogos.length} logos deleted successfully`);
    } catch (error) {
      console.error("Error in bulk delete:", error);
      toast.error("Failed to delete logos");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Logo Management</h1>
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            onClick={refreshLogoData}
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
          <LogoFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedLogos={selectedLogos}
            onDeleteSelected={handleBulkDelete}
            isLoading={isLoading}
          />

          <div className="mt-6 rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[40px]">
                    <Checkbox
                      checked={selectedLogos.length === paginatedLogos.length && paginatedLogos.length > 0}
                      onCheckedChange={toggleSelectAll}
                      disabled={isLoading || paginatedLogos.length === 0}
                    />
                  </TableHead>
                  <TableHead className="w-[80px]">Preview</TableHead>
                  <TableHead 
                    className="cursor-pointer"
                    onClick={() => handleSort("title")}
                  >
                    Title {sortField === "title" && (sortDirection === "asc" ? "↑" : "↓")}
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer"
                    onClick={() => handleSort("logoType")}
                  >
                    Description {sortField === "logoType" && (sortDirection === "asc" ? "↑" : "↓")}
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer"
                    onClick={() => handleSort("userName")}
                  >
                    Created By {sortField === "userName" && (sortDirection === "asc" ? "↑" : "↓")}
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer"
                    onClick={() => handleSort("createdAt")}
                  >
                    Created At {sortField === "createdAt" && (sortDirection === "asc" ? "↑" : "↓")}
                  </TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <LogoTable
                  logos={paginatedLogos}
                  isLoading={isLoading}
                  onView={handleViewLogo}
                  onDelete={handleDeleteLogo}
                  selectedLogos={selectedLogos}
                  onToggleSelect={toggleSelectLogo}
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

      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent className="sm:max-w-md overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Logo Details</SheetTitle>
            <SheetDescription>
              View logo details and manage this logo.
            </SheetDescription>
          </SheetHeader>
          {selectedLogo && (
            <LogoDetailPanel
              logo={selectedLogo}
              onClose={handleSheetClose}
              onDeleteLogo={() => handleDeleteLogo(selectedLogo.userEmail, selectedLogo.id)}
            />
          )}
          <SheetClose ref={sheetCloseRef} className="hidden" />
        </SheetContent>
      </Sheet>
    </div>
  );
}