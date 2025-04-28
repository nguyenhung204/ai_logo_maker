"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import {
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Trash,
  Save,
  Ban,
  CheckCircle,
  Award,
  Plus,
  CreditCard,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for users
const mockUsers = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@example.com",
    role: "user",
    status: "active",
    createdAt: "2024-02-15",
    lastLogin: "2025-04-27",
    totalLogos: 12,
    credits: 35,
    avatar: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: "2",
    name: "Emily Chen",
    email: "emily.chen@example.com",
    role: "premium",
    status: "active",
    createdAt: "2024-03-10",
    lastLogin: "2025-04-28",
    totalLogos: 47,
    credits: 120,
    avatar: "https://i.pravatar.cc/150?img=5",
  },
  {
    id: "3",
    name: "Michael Johnson",
    email: "michael.j@example.com",
    role: "user",
    status: "inactive",
    createdAt: "2024-01-22",
    lastLogin: "2025-03-15",
    totalLogos: 3,
    credits: 0,
    avatar: "https://i.pravatar.cc/150?img=3",
  },
  {
    id: "4",
    name: "Sarah Williams",
    email: "sarah.w@example.com",
    role: "admin",
    status: "active",
    createdAt: "2023-12-05",
    lastLogin: "2025-04-26",
    totalLogos: 28,
    credits: 200,
    avatar: "https://i.pravatar.cc/150?img=4",
  },
  {
    id: "5",
    name: "David Brown",
    email: "david.brown@example.com",
    role: "user",
    status: "locked",
    createdAt: "2024-04-01",
    lastLogin: "2025-04-10",
    totalLogos: 6,
    credits: 5,
    avatar: "https://i.pravatar.cc/150?img=7",
  },
];

// Component for user detail/edit panel
function UserDetailPanel({ user, onSave, onClose }) {
  const [userData, setUserData] = useState(user);

  const handleChange = (field, value) => {
    setUserData({ ...userData, [field]: value });
  };

  const handleSubmit = () => {
    onSave(userData);
    onClose();
  };

  return (
    <div className="space-y-6 py-2">
      <div className="flex items-center gap-4">
        <Avatar className="h-20 w-20">
          <AvatarImage src={userData.avatar} alt={userData.name} />
          <AvatarFallback>{userData.name.substring(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="text-xl font-semibold">{userData.name}</h3>
          <p className="text-muted-foreground">User ID: {userData.id}</p>
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
              value={userData.name} 
              onChange={(e) => handleChange("name", e.target.value)} 
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              value={userData.email} 
              onChange={(e) => handleChange("email", e.target.value)} 
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="role">Role</Label>
            <Select 
              value={userData.role} 
              onValueChange={(value) => handleChange("role", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="user">User</SelectItem>
                <SelectItem value="premium">Premium</SelectItem>
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
            <p className="text-sm text-muted-foreground">
              Created: {userData.createdAt}
            </p>
            <p className="text-sm text-muted-foreground">
              Last Login: {userData.lastLogin}
            </p>
            <p className="text-sm text-muted-foreground">
              Total Logos: {userData.totalLogos}
            </p>
          </div>
        </TabsContent>
        
        <TabsContent value="security" className="space-y-4 pt-4">
          <div className="grid gap-4">
            <Button variant="outline" className="w-full justify-start">
              <Ban className="mr-2 h-4 w-4" /> 
              {userData.status === "locked" ? "Unlock Account" : "Lock Account"}
            </Button>
            
            <Button variant="outline" className="w-full justify-start">
              <Award className="mr-2 h-4 w-4" /> 
              Add Special Permissions
            </Button>
            
            <Button variant="destructive" className="w-full justify-start">
              <Trash className="mr-2 h-4 w-4" /> 
              Delete Account
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="credits" className="space-y-4 pt-4">
          <div className="flex justify-between items-center pb-2 border-b">
            <h3 className="font-medium">Current Credits</h3>
            <span className="text-lg font-bold">{userData.credits}</span>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="add-credits">Add Credits</Label>
            <div className="flex space-x-2">
              <Input 
                id="add-credits" 
                type="number" 
                min="0"
                placeholder="Enter amount" 
              />
              <Button variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Add
              </Button>
            </div>
          </div>
          
          <div className="space-y-2 pt-4">
            <h4 className="font-medium">Credit History</h4>
            <div className="bg-muted/40 p-2 rounded-md text-center text-sm text-muted-foreground">
              Credit history will be displayed here
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <SheetFooter>
        <SheetClose asChild>
          <Button variant="outline">Cancel</Button>
        </SheetClose>
        <Button onClick={handleSubmit}>
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </SheetFooter>
    </div>
  );
}

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [roleFilter, setRoleFilter] = useState("all");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch users data (mock implementation)
  useEffect(() => {
    // In a real implementation, this would be a fetch call to your backend
    setTimeout(() => {
      setUsers(mockUsers);
      setIsLoading(false);
    }, 600);
  }, []);

  // Filter users based on search term and filters
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "all" || user.status === statusFilter;
    const matchesRole = roleFilter === "all" || user.role === roleFilter;

    return matchesSearch && matchesStatus && matchesRole;
  });

  // Handle saving user details
  const handleSaveUser = (updatedUser) => {
    setUsers(users.map((user) => (user.id === updatedUser.id ? updatedUser : user)));
    // In a real implementation, this would include an API call to update the user
  };

  // Function to handle credit adjustment
  const handleAdjustCredits = (userId, amount) => {
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, credits: user.credits + amount } : user
      )
    );
    // In a real implementation, this would include an API call
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">User Management</h1>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add New User
        </Button>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[130px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="locked">Locked</SelectItem>
                </SelectContent>
              </Select>

              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-[130px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="user">User</SelectItem>
                  <SelectItem value="premium">Premium</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Last Login</TableHead>
                  <TableHead>Credits</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-10 text-muted-foreground">
                      Loading users...
                    </TableCell>
                  </TableRow>
                ) : filteredUsers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-10 text-muted-foreground">
                      No users found matching your criteria.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-9 w-9">
                            <AvatarImage src={user.avatar} alt={user.name} />
                            <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{user.name}</div>
                            <div className="text-sm text-muted-foreground">{user.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            user.role === "admin"
                              ? "destructive"
                              : user.role === "premium"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <div
                            className={`mr-2 h-2 w-2 rounded-full ${
                              user.status === "active"
                                ? "bg-green-500"
                                : user.status === "locked"
                                ? "bg-red-500"
                                : "bg-yellow-500"
                            }`}
                          />
                          {user.status}
                        </div>
                      </TableCell>
                      <TableCell>{user.createdAt}</TableCell>
                      <TableCell>{user.lastLogin}</TableCell>
                      <TableCell>{user.credits}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Sheet>
                            <SheetTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setSelectedUser(user)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                            </SheetTrigger>
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
                                  onClose={() => setSelectedUser(null)}
                                />
                              )}
                            </SheetContent>
                          </Sheet>

                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                <CreditCard className="mr-2 h-4 w-4" />
                                Adjust Credits
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <CheckCircle className="mr-2 h-4 w-4" />
                                {user.status === "locked"
                                  ? "Unlock Account"
                                  : user.status === "active"
                                  ? "Deactivate Account"
                                  : "Activate Account"}
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-destructive">
                                <Trash className="mr-2 h-4 w-4" />
                                Delete User
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}