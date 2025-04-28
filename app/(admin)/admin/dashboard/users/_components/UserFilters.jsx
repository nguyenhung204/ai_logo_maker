"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter, ArrowUpDown } from "lucide-react";

export default function UserFilters({ 
  searchTerm, 
  onSearchChange, 
  statusFilter, 
  onStatusFilterChange,
  roleFilter,
  onRoleFilterChange,
  sortField,
  sortDirection,
  onSort
}) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users by name or email..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <Select value={statusFilter} onValueChange={onStatusFilterChange}>
            <SelectTrigger className="w-[130px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="locked">Locked</SelectItem>
            </SelectContent>
          </Select>

          <Select value={roleFilter} onValueChange={onRoleFilterChange}>
            <SelectTrigger className="w-[130px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="member">Member</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
            </SelectContent>
          </Select>
          
          <Select 
            value={sortDirection} 
            onValueChange={(direction) => {
              onSort(sortField);
            }}
          >
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="Order" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="asc">ASC</SelectItem>
              <SelectItem value="desc">DESC</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="text-xs text-muted-foreground">
        <span className="font-medium">Tip:</span> Click on column headers to sort, or select multiple users with checkboxes for bulk actions
      </div>
    </div>
  );
}