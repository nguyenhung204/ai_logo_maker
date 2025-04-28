"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuPortal,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { 
  MoreHorizontal, 
  Edit, 
  CreditCard, 
  CheckCircle, 
  Trash,
  AlertCircle,
  ShieldCheck,
  User,
  Award
} from "lucide-react";

export default function UserActions({ 
  user, 
  onEdit, 
  onStatusChange, 
  onCreditAdjust, 
  onDelete,
  onRoleChange 
}) {
  // Function to handle role change
  const handleRoleChange = (newRole) => {
    if (typeof onRoleChange === 'function') {
      onRoleChange(user.email, newRole);
    } else {
      // Fallback to editing the user if onRoleChange isn't provided
      const updatedUser = { ...user, role: newRole };
      onEdit(updatedUser);
    }
  };

  return (
    <div className="flex justify-end gap-2">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onEdit(user)}
      >
        <Edit className="h-4 w-4" />
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          
          <DropdownMenuItem onClick={() => onCreditAdjust(user.email)}>
            <CreditCard className="mr-2 h-4 w-4" />
            Adjust Credits
          </DropdownMenuItem>
          
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <ShieldCheck className="mr-2 h-4 w-4" />
              Change Role
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem 
                  onClick={() => handleRoleChange("admin")}
                  disabled={user.role === "admin"}
                >
                  <ShieldCheck className="mr-2 h-4 w-4 text-destructive" />
                  Admin
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => handleRoleChange("member")}
                  disabled={user.role === "member" || !user.role}
                >
                  <User className="mr-2 h-4 w-4" />
                  Member
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          
          <DropdownMenuItem 
            onClick={() => onStatusChange(
              user.email, 
              user.status === "locked" 
                ? "active" 
                : user.status === "active"
                ? "locked"
                : "active"
            )}
          >
            <CheckCircle className="mr-2 h-4 w-4" />
            {user.status === "locked"
              ? "Unlock Account"
              : user.status === "active"
              ? "Deactivate Account"
              : "Activate Account"}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <Dialog>
            <DialogTrigger asChild>
              <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-destructive">
                <Trash className="mr-2 h-4 w-4" />
                Delete User
              </DropdownMenuItem>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete this user account? This action cannot be undone.
                </DialogDescription>
              </DialogHeader>
              <div className="flex items-center gap-2 py-3">
                <AlertCircle className="h-5 w-5 text-destructive" />
                <p className="text-sm font-medium">All user data will be permanently removed</p>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button 
                  variant="destructive" 
                  onClick={() => onDelete(user.email)}
                >
                  Delete User
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}