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
import { Checkbox } from "@/components/ui/checkbox";
import { db } from "@/config/FirebaseConfig";
import { 
  collection, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc, 
  Timestamp,
  writeBatch
} from "firebase/firestore";
import { toast } from "sonner";
import { Download, RefreshCw, ChevronLeft, ChevronRight } from "lucide-react";

import UserFilters from "./UserFilters";
import UserTable from "./UserTable";
import UserDetailPanel from "./UserDetailPanel";

// Items per page
const ITEMS_PER_PAGE = 10;

export default function UserManagementContainer() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [roleFilter, setRoleFilter] = useState("all");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [sortField, setSortField] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [exportLoading, setExportLoading] = useState(false);
  const sheetCloseRef = useRef(null);

  // Fetch users data from Firestore
  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const usersCollectionRef = collection(db, "users");
      const usersSnapshot = await getDocs(usersCollectionRef);
      
      const usersData = await Promise.all(
        usersSnapshot.docs.map(async (userDoc) => {
          const userData = userDoc.data();
          
          // Count logos for this user
          let totalLogos = 0;
          try {
            const logosRef = collection(db, "users", userDoc.id, "logos");
            const logosSnapshot = await getDocs(logosRef);
            totalLogos = logosSnapshot.size;
          } catch (error) {
            console.error(`Error counting logos for user ${userDoc.id}:`, error);
          }
          
          return {
            ...userData,
            email: userDoc.id,
            id: userDoc.id,
            totalLogos,
            status: userData.status || "active",
            // Make sure we have a date object for these fields
            createdAt: userData.createdAt || Timestamp.now(),
            lastLogin: userData.lastLogin || null
          };
        })
      );
      
      setUsers(usersData);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to load users data");
    } finally {
      setIsLoading(false);
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchUsers();
  }, []);

  // Refresh user data
  const refreshUserData = async () => {
    setIsRefreshing(true);
    await fetchUsers();
    setSelectedUsers([]);
    setIsRefreshing(false);
    toast.success("User data refreshed");
  };

  // Handle sorting
  const handleSort = (field) => {
    if (sortField === field) {
      // Toggle direction if clicking the same field
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      // New field, default to ascending
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Sort users based on current sort field and direction
  const sortUsers = (users) => {
    return [...users].sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];
      
      // Handle dates
      if (sortField === "createdAt" || sortField === "lastLogin") {
        aValue = aValue ? (typeof aValue.toDate === "function" ? aValue.toDate() : aValue) : new Date(0);
        bValue = bValue ? (typeof bValue.toDate === "function" ? bValue.toDate() : bValue) : new Date(0);
      }
      
      // Handle nulls
      if (aValue === null || aValue === undefined) return 1;
      if (bValue === null || bValue === undefined) return -1;
      
      // String comparison
      if (typeof aValue === "string") {
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

  // Filter users based on search term and filters
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      (user.name?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (user.email?.toLowerCase() || "").includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "all" || user.status === statusFilter;
    const matchesRole = roleFilter === "all" || user.role === roleFilter;

    return matchesSearch && matchesStatus && matchesRole;
  });

  // Apply sorting to filtered users
  const sortedUsers = sortUsers(filteredUsers);
  
  // Paginate users
  const totalPages = Math.ceil(sortedUsers.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedUsers = sortedUsers.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Toggle all users selection on current page
  const toggleSelectAll = () => {
    if (selectedUsers.length === paginatedUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(paginatedUsers.map(user => user.email));
    }
  };

  // Toggle single user selection
  const toggleSelectUser = (email) => {
    setSelectedUsers(prevSelected => 
      prevSelected.includes(email)
        ? prevSelected.filter(e => e !== email)
        : [...prevSelected, email]
    );
  };

  const handleSaveUser = async (updatedUser) => {
    try {
      const userRef = doc(db, "users", updatedUser.email);

      const userData = { ...updatedUser };
      delete userData.id;
      delete userData.totalLogos;
      
      await updateDoc(userRef, userData);
      setUsers(users.map((user) => 
        user.email === updatedUser.email ? {...user, ...updatedUser} : user
      ));
      setSheetOpen(false);
      
      return true;
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  };

  // Function to handle status changes
  const handleStatusChange = async (email, newStatus) => {
    try {
      // Check if the user is an admin before changing status to "locked"
      if (newStatus === "locked") {
        const userToUpdate = users.find(user => user.email === email);
        if (userToUpdate && userToUpdate.role === "admin") {
          toast.error("Cannot lock an admin account");
          return;
        }
      }
      
      const userRef = doc(db, "users", email);
      await updateDoc(userRef, { status: newStatus });
      setUsers(users.map((user) => 
        user.email === email ? {...user, status: newStatus} : user
      ));
      
      toast.success(`User status updated to ${newStatus}`);
    } catch (error) {
      console.error("Error updating user status:", error);
      toast.error("Failed to update user status");
    }
  };

  // Function to handle role changes
  const handleRoleChange = async (email, newRole) => {
    try {
      const userRef = doc(db, "users", email);
      await updateDoc(userRef, { role: newRole });
      setUsers(users.map((user) => 
        user.email === email ? {...user, role: newRole} : user
      ));
      
      toast.success(`User role updated to ${newRole}`);
    } catch (error) {
      console.error("Error updating user role:", error);
      toast.error("Failed to update user role");
    }
  };

  // Bulk role change
  const handleBulkRoleChange = async (newRole) => {
    if (selectedUsers.length === 0) {
      toast.error("No users selected");
      return;
    }

    try {
      setIsLoading(true);
      
      // Use batch for better performance
      const batch = writeBatch(db);
      
      selectedUsers.forEach(email => {
        const userRef = doc(db, "users", email);
        batch.update(userRef, { role: newRole });
      });
      
      await batch.commit();
      
      // Update local state
      setUsers(users.map(user => 
        selectedUsers.includes(user.email) 
          ? {...user, role: newRole}
          : user
      ));
      
      setSelectedUsers([]);
      toast.success(`${selectedUsers.length} users updated to ${newRole} role`);
    } catch (error) {
      console.error("Error in bulk role update:", error);
      toast.error("Failed to update users");
    } finally {
      setIsLoading(false);
    }
  };

  // Function to handle user edit
  const handleEditUser = (user) => {
    setSelectedUser(user);
    setSheetOpen(true);
  };

  // Function to handle credit adjustment
  const handleAdjustCredits = async (email) => {
    try {
      const user = users.find(u => u.email === email);
      if (user) {
        setSelectedUser(user);
        setSheetOpen(true);
        
        setTimeout(() => {
          const creditsTab = document.querySelector('[value="credits"]');
          if (creditsTab) creditsTab.click();
        }, 100);
      }
    } catch (error) {
      console.error("Error adjusting credits:", error);
      toast.error("Failed to open credit adjustment panel");
    }
  };

  // Function to delete user
  const handleDeleteUser = async (email) => {
    try {
      setIsLoading(true);
      
      // Delete the user document
      await deleteDoc(doc(db, "users", email));
      
      // Update local state
      setUsers(users.filter(user => user.email !== email));
      
      // Clear from selected if present
      if (selectedUsers.includes(email)) {
        setSelectedUsers(selectedUsers.filter(e => e !== email));
      }
      
      // Close the sheet
      setSheetOpen(false);
      
      toast.success("User deleted successfully");
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user");
    } finally {
      setIsLoading(false);
    }
  };

  // Bulk status change
  const handleBulkStatusChange = async (newStatus) => {
    if (selectedUsers.length === 0) {
      toast.error("No users selected");
      return;
    }

    try {
      setIsLoading(true);
      
      // Use batch for better performance
      const batch = writeBatch(db);
      
      selectedUsers.forEach(email => {
        const userRef = doc(db, "users", email);
        batch.update(userRef, { status: newStatus });
      });
      
      await batch.commit();
      
      // Update local state
      setUsers(users.map(user => 
        selectedUsers.includes(user.email) 
          ? {...user, status: newStatus}
          : user
      ));
      
      setSelectedUsers([]);
      toast.success(`${selectedUsers.length} users updated to ${newStatus}`);
    } catch (error) {
      console.error("Error in bulk status update:", error);
      toast.error("Failed to update users");
    } finally {
      setIsLoading(false);
    }
  };

  // Bulk delete users
  const handleBulkDelete = async () => {
    if (selectedUsers.length === 0) {
      toast.error("No users selected");
      return;
    }

    try {
      setIsLoading(true);
      
      // Use batch for better performance
      const batch = writeBatch(db);
      
      selectedUsers.forEach(email => {
        const userRef = doc(db, "users", email);
        batch.delete(userRef);
      });
      
      await batch.commit();
      
      // Update local state
      setUsers(users.filter(user => !selectedUsers.includes(user.email)));
      
      setSelectedUsers([]);
      toast.success(`${selectedUsers.length} users deleted successfully`);
    } catch (error) {
      console.error("Error in bulk delete:", error);
      toast.error("Failed to delete users");
    } finally {
      setIsLoading(false);
    }
  };

  // Export users to CSV
  const handleExportUsers = () => {
    try {
      setExportLoading(true);
      
      // Prepare CSV content
      const headers = [
        "Email", "Name", "Role", "Status", "Credits", 
        "Created At", "Last Login", "Total Logos"
      ];
      
      const csvContent = [
        headers.join(","),
        ...filteredUsers.map(user => [
          `"${user.email}"`,
          `"${user.name || ''}"`, 
          user.role || "member",
          user.status || "active",
          user.credits || 0,
          user.createdAt && typeof user.createdAt.toDate === 'function' 
            ? user.createdAt.toDate().toISOString()
            : "",
          user.lastLogin && typeof user.lastLogin.toDate === 'function'
            ? user.lastLogin.toDate().toISOString()
            : "",
          user.totalLogos || 0
        ].join(","))
      ].join("\n");
      
      // Create downloadable file
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `users-export-${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast.success("Users exported successfully");
    } catch (error) {
      console.error("Error exporting users:", error);
      toast.error("Failed to export users");
    } finally {
      setExportLoading(false);
    }
  };

  // Function to close the sheet and reset selected user
  const handleSheetClose = () => {
    setSheetOpen(false);
    setSelectedUser(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">User Management</h1>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={refreshUserData}
            disabled={isRefreshing}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
            {isRefreshing ? "Refreshing..." : "Refresh"}
          </Button>
          <Button
            variant="outline"
            onClick={handleExportUsers}
            disabled={exportLoading || filteredUsers.length === 0}
          >
            <Download className="h-4 w-4 mr-2" />
            Export Users
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          <UserFilters 
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            statusFilter={statusFilter}
            onStatusFilterChange={setStatusFilter}
            roleFilter={roleFilter}
            onRoleFilterChange={setRoleFilter}
            sortField={sortField}
            sortDirection={sortDirection}
            onSort={handleSort}
          />

          {selectedUsers.length > 0 && (
            <div className="flex items-center gap-2 py-2 mb-4 bg-muted/30 px-4 rounded-md">
              <p className="text-sm font-medium">
                {selectedUsers.length} users selected
              </p>
              <div className="ml-auto flex gap-2">
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => handleBulkStatusChange("active")}
                >
                  Activate
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => handleBulkStatusChange("locked")}
                >
                  Lock
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => handleBulkRoleChange("admin")}
                >
                  Make Admin
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => handleBulkRoleChange("member")}
                >
                  Make Member
                </Button>
                <Button 
                  size="sm" 
                  variant="destructive"
                  onClick={handleBulkDelete}
                >
                  Delete
                </Button>
              </div>
            </div>
          )}

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[40px]">
                    <Checkbox 
                      checked={paginatedUsers.length > 0 && selectedUsers.length === paginatedUsers.length}
                      onCheckedChange={toggleSelectAll}
                    />
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer"
                    onClick={() => handleSort("name")}
                  >
                    User {sortField === "name" && (sortDirection === "asc" ? "↑" : "↓")}
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer"
                    onClick={() => handleSort("role")}
                  >
                    Role {sortField === "role" && (sortDirection === "asc" ? "↑" : "↓")}
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer"
                    onClick={() => handleSort("status")}
                  >
                    Status {sortField === "status" && (sortDirection === "asc" ? "↑" : "↓")}
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer"
                    onClick={() => handleSort("createdAt")}
                  >
                    Created {sortField === "createdAt" && (sortDirection === "asc" ? "↑" : "↓")}
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer"
                    onClick={() => handleSort("lastLogin")}
                  >
                    Last Login {sortField === "lastLogin" && (sortDirection === "asc" ? "↑" : "↓")}
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer"
                    onClick={() => handleSort("credits")}
                  >
                    Credits {sortField === "credits" && (sortDirection === "asc" ? "↑" : "↓")}
                  </TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <UserTable 
                  users={paginatedUsers}
                  isLoading={isLoading}
                  onEdit={handleEditUser}
                  onStatusChange={handleStatusChange}
                  onRoleChange={handleRoleChange}
                  onCreditAdjust={handleAdjustCredits}
                  onDelete={handleDeleteUser}
                  selectedUsers={selectedUsers}
                  onToggleSelect={toggleSelectUser}
                />
              </TableBody>
            </Table>
          </div>
          
          {/* Pagination controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-4">
              <div className="text-sm text-muted-foreground">
                Showing {startIndex + 1} to {Math.min(startIndex + ITEMS_PER_PAGE, sortedUsers.length)} of {sortedUsers.length} users
              </div>
              <div className="flex items-center gap-1">
                <Button 
                  variant="outline" 
                  size="icon"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-sm mx-2">
                  Page {currentPage} of {totalPages}
                </span>
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
        </CardContent>
      </Card>

      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent className="sm:max-w-md overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Edit User</SheetTitle>
            <SheetDescription>
              Make changes to the user profile and settings.
            </SheetDescription>
          </SheetHeader>
          {selectedUser && (
            <UserDetailPanel
              user={selectedUser}
              onSave={handleSaveUser}
              onClose={handleSheetClose}
              onDeleteUser={handleDeleteUser}
            />
          )}
          <SheetClose ref={sheetCloseRef} className="hidden" />
        </SheetContent>
      </Sheet>
    </div>
  );
}