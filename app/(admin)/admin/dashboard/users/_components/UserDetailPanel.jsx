"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  SheetClose,
  SheetFooter,
} from "@/components/ui/sheet";
import { format } from "date-fns";
import { toast } from "sonner";
import { db } from "@/config/FirebaseConfig";
import { 
  collection, 
  doc, 
  getDocs, 
  updateDoc, 
  addDoc,
  query,
  orderBy,
  limit,
  Timestamp 
} from "firebase/firestore";
import { 
  Ban, 
  Save, 
  Award, 
  Trash, 
  Plus, 
  AlertCircle 
} from "lucide-react";
import CreditHistoryList from "./CreditHistoryList";

export default function UserDetailPanel({ user, onSave, onClose, onDeleteUser }) {
  const [userData, setUserData] = useState(user);
  const [creditAmount, setCreditAmount] = useState("");
  const [creditHistory, setCreditHistory] = useState([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchCreditHistory = async () => {
      try {
        setIsLoadingHistory(true);
        const creditHistoryRef = collection(db, "users", user.email, "creditHistory");
        const creditHistorySnapshot = await getDocs(query(
          creditHistoryRef, 
          orderBy("timestamp", "desc"),
          limit(20)
        ));
        
        const history = creditHistorySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        setCreditHistory(history);
      } catch (error) {
        console.error("Error fetching credit history:", error);
      } finally {
        setIsLoadingHistory(false);
      }
    };

    fetchCreditHistory();
  }, [user.email]);

  const handleChange = (field, value) => {
    setUserData({ ...userData, [field]: value });
  };

  const handleSubmit = async () => {
    try {
      setIsSaving(true);
      await onSave(userData);
      toast.success("User information updated successfully");
      onClose();
    } catch (error) {
      console.error("Error saving user data:", error);
      toast.error("Failed to update user information");
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddCredits = async () => {
    if (!creditAmount || Number(creditAmount) <= 0) {
      toast.error("Please enter a valid credit amount");
      return;
    }

    try {
      setIsSaving(true);
      const amount = Number(creditAmount);
      
      // Update user's credits
      const newCredits = userData.credits + amount;
      const userRef = doc(db, "users", userData.email);
      await updateDoc(userRef, { credits: newCredits });
      
      // Add to credit history
      const creditHistoryRef = collection(db, "users", userData.email, "creditHistory");
      await addDoc(creditHistoryRef, {
        amount: amount,
        type: "Admin Adjustment",
        timestamp: Timestamp.now()
      });
      
      // Update local state
      setUserData({ ...userData, credits: newCredits });
      setCreditAmount("");
      
      // Refresh credit history
      const updatedHistorySnapshot = await getDocs(query(
        creditHistoryRef, 
        orderBy("timestamp", "desc"),
        limit(20)
      ));
      
      const updatedHistory = updatedHistorySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      setCreditHistory(updatedHistory);
      
      toast.success(`Added ${amount} credits to ${userData.name}'s account`);
    } catch (error) {
      console.error("Error adding credits:", error);
      toast.error("Failed to add credits");
    } finally {
      setIsSaving(false);
    }
  };

  const handleLockUnlockAccount = async () => {
    try {
      setIsSaving(true);
      const newStatus = userData.status === "locked" ? "active" : "locked";
      await updateDoc(doc(db, "users", userData.email), { status: newStatus });
      setUserData({ ...userData, status: newStatus });
      toast.success(`User account ${newStatus === "locked" ? "locked" : "unlocked"} successfully`);
    } catch (error) {
      console.error("Error updating user status:", error);
      toast.error("Failed to update user status");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6 py-2">
      <div className="flex items-center gap-4">
        <Avatar className="h-20 w-20">
          <AvatarImage src={userData.avatar} alt={userData.name} />
          <AvatarFallback>{userData.name?.substring(0, 2).toUpperCase() || "U"}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="text-xl font-semibold">{userData.name}</h3>
          <p className="text-muted-foreground">Email: {userData.email}</p>
        </div>
      </div>

      <Tabs defaultValue="details">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="details">User Details</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="credits">Credits</TabsTrigger>
        </TabsList>
        
        <TabsContent value="details" className="space-y-4 pt-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Full Name</Label>
            <Input 
              id="name" 
              value={userData.name || ""} 
              onChange={(e) => handleChange("name", e.target.value)} 
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              value={userData.email || ""}
              disabled
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="role">Role</Label>
            <Select 
              value={userData.role || "member"} 
              onValueChange={(value) => handleChange("role", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="member">Member</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center gap-2">
            <Label 
              htmlFor="status" 
              className="flex items-center gap-2 cursor-pointer"
            >
              <Checkbox 
                id="status" 
                checked={userData.status === "active"} 
                onCheckedChange={(checked) => 
                  handleChange("status", checked ? "active" : "inactive")
                } 
              />
              <span>Active Account</span>
            </Label>
          </div>
          
          <div className="pt-2">
            {userData.createdAt && (
              <p className="text-sm text-muted-foreground">
                Created: {typeof userData.createdAt === 'object' && userData.createdAt.toDate 
                  ? format(userData.createdAt.toDate(), 'PPP') 
                  : userData.createdAt}
              </p>
            )}
            {userData.lastLogin && (
              <p className="text-sm text-muted-foreground">
                Last Login: {typeof userData.lastLogin === 'object' && userData.lastLogin.toDate 
                  ? format(userData.lastLogin.toDate(), 'PPP') 
                  : userData.lastLogin}
              </p>
            )}
            <p className="text-sm text-muted-foreground">
              Total Logos: {userData.totalLogos || 0}
            </p>
          </div>
        </TabsContent>
        
        <TabsContent value="security" className="space-y-4 pt-4">
          <div className="grid gap-4">
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={handleLockUnlockAccount}
            >
              <Ban className="mr-2 h-4 w-4" /> 
              {userData.status === "locked" ? "Unlock Account" : "Lock Account"}
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="destructive" className="w-full justify-start">
                  <Trash className="mr-2 h-4 w-4" /> 
                  Delete Account
                </Button>
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
                    onClick={() => onDeleteUser(userData.email)}
                  >
                    Delete User
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </TabsContent>
        
        <TabsContent value="credits" className="space-y-4 pt-4">
          <div className="flex justify-between items-center pb-2 border-b">
            <h3 className="font-medium">Current Credits</h3>
            <span className="text-lg font-bold">{userData.credits || 0}</span>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="add-credits">Add Credits</Label>
            <div className="flex space-x-2">
              <Input 
                id="add-credits" 
                type="number" 
                min="0"
                placeholder="Enter amount"
                value={creditAmount}
                onChange={(e) => setCreditAmount(e.target.value)}
              />
              <Button 
                variant="outline"
                onClick={handleAddCredits}
                disabled={isSaving}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add
              </Button>
            </div>
          </div>
          
          <div className="space-y-2 pt-4">
            <h4 className="font-medium">Credit History</h4>
            {isLoadingHistory ? (
              <div className="bg-muted/40 p-4 rounded-md text-center text-sm text-muted-foreground">
                Loading credit history...
              </div>
            ) : (
              <CreditHistoryList creditHistory={creditHistory} />
            )}
          </div>
        </TabsContent>
      </Tabs>

      <SheetFooter>
        <SheetClose asChild>
          <Button variant="outline">Cancel</Button>
        </SheetClose>
        <Button 
          onClick={handleSubmit}
          disabled={isSaving}
        >
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </SheetFooter>
    </div>
  );
}