"use client";

import React from "react";
import { format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import UserStatusBadge from "./UserStatusBadge";
import UserActions from "./UserActions";

export default function UserTable({ 
  users, 
  isLoading, 
  onEdit, 
  onStatusChange, 
  onCreditAdjust, 
  onDelete,
  selectedUsers = [],
  onToggleSelect
}) {
  if (isLoading) {
    return (
      <TableRow>
        <TableCell colSpan={8} className="text-center py-10 text-muted-foreground">
          Loading users...
        </TableCell>
      </TableRow>
    );
  }

  if (users.length === 0) {
    return (
      <TableRow>
        <TableCell colSpan={8} className="text-center py-10 text-muted-foreground">
          No users found matching your criteria.
        </TableCell>
      </TableRow>
    );
  }

  return (
    <>
      {users.map((user) => (
        <TableRow key={user.email} className={selectedUsers.includes(user.email) ? "bg-muted/50" : ""}>
          <TableCell className="w-[40px] pr-0">
            <Checkbox 
              checked={selectedUsers.includes(user.email)}
              onCheckedChange={() => onToggleSelect && onToggleSelect(user.email)}
            />
          </TableCell>
          <TableCell>
            <div className="flex items-center gap-3">
              <Avatar className="h-9 w-9">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name?.substring(0, 2).toUpperCase() || "U"}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">{user.name || "No Name"}</div>
                <div className="text-sm text-muted-foreground">{user.email}</div>
              </div>
            </div>
          </TableCell>
          <TableCell>
            <Badge
              variant={
                user.role === "admin"
                  ? "destructive"
                  : "secondary"
              }
            >
              {user.role || "member"}
            </Badge>
          </TableCell>
          <TableCell>
            <UserStatusBadge status={user.status} />
          </TableCell>
          <TableCell>
            {user.createdAt && typeof user.createdAt === 'object' && user.createdAt.toDate
              ? format(user.createdAt.toDate(), 'PPP')
              : "N/A"}
          </TableCell>
          <TableCell>
            {user.lastLogin && typeof user.lastLogin === 'object' && user.lastLogin.toDate
              ? format(user.lastLogin.toDate(), 'PPP')
              : "Never"}
          </TableCell>
          <TableCell>{user.credits || 0}</TableCell>
          <TableCell className="text-right">
            <UserActions 
              user={user}
              onEdit={onEdit}
              onStatusChange={onStatusChange}
              onCreditAdjust={onCreditAdjust}
              onDelete={onDelete}
            />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}