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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Trash,
  Download,
  CalendarIcon,
  Image,
  User,
  Tags,
  PanelLeft,
  BadgeInfo,
  Share2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

// Mock data for logos
const mockLogos = [
  {
    id: "logo-001",
    title: "Tech Startup Logo",
    previewUrl: "/design_1.png",
    createdAt: "2025-04-25T10:30:00Z",
    userId: "1",
    userName: "John Smith",
    userAvatar: "https://i.pravatar.cc/150?img=1",
    isApproved: true,
    logoType: "abstract",
    colors: ["#3B82F6", "#10B981", "#6366F1"],
    prompt: "Create a modern tech startup logo with blue and green colors",
    description: "A logo for a technology company focused on AI and automation",
    status: "completed",
    tags: ["tech", "modern", "startup"],
  },
  {
    id: "logo-002",
    title: "Organic Food Brand",
    previewUrl: "/design_2.png",
    createdAt: "2025-04-22T14:15:00Z",
    userId: "2",
    userName: "Emily Chen",
    userAvatar: "https://i.pravatar.cc/150?img=5",
    isApproved: true,
    logoType: "illustrated",
    colors: ["#84CC16", "#65A30D", "#FBBF24"],
    prompt: "Design an organic food logo with natural colors and leaf elements",
    description: "A logo for a sustainable organic food company",
    status: "completed",
    tags: ["food", "organic", "eco-friendly"],
  },
  {
    id: "logo-003",
    title: "Fitness Club Brand",
    previewUrl: "/design_3.png",
    createdAt: "2025-04-20T09:45:00Z",
    userId: "3",
    userName: "Michael Johnson",
    userAvatar: "https://i.pravatar.cc/150?img=3",
    isApproved: false,
    logoType: "typography",
    colors: ["#DC2626", "#000000", "#FFFFFF"],
    prompt: "Create a bold fitness club logo with dynamic elements",
    description: "A logo for a high-intensity fitness training center",
    status: "pending",
    tags: ["fitness", "sports", "gym"],
  },
  {
    id: "logo-004",
    title: "Coffee Shop Logo",
    previewUrl: "/design_4.png",
    createdAt: "2025-04-18T16:20:00Z",
    userId: "4",
    userName: "Sarah Williams",
    userAvatar: "https://i.pravatar.cc/150?img=4",
    isApproved: true,
    logoType: "vintage",
    colors: ["#78350F", "#D97706", "#FCD34D"],
    prompt: "Design a vintage coffee shop logo with warm colors",
    description: "A logo for an artisanal coffee roastery and café",
    status: "completed",
    tags: ["coffee", "vintage", "cafe"],
  },
  {
    id: "logo-005",
    title: "Digital Agency Logo",
    previewUrl: "/design_5.png",
    createdAt: "2025-04-15T11:10:00Z",
    userId: "5",
    userName: "David Brown",
    userAvatar: "https://i.pravatar.cc/150?img=7",
    isApproved: true,
    logoType: "minimalist",
    colors: ["#6D28D9", "#000000", "#FFFFFF"],
    prompt: "Create a minimalist digital agency logo with a modern feel",
    description: "A logo for a creative digital marketing agency",
    status: "completed",
    tags: ["digital", "agency", "minimalist"],
  },
  {
    id: "logo-006",
    title: "Pet Care Service",
    previewUrl: "/design_6.png",
    createdAt: "2025-04-10T13:40:00Z",
    userId: "2",
    userName: "Emily Chen",
    userAvatar: "https://i.pravatar.cc/150?img=5",
    isApproved: true,
    logoType: "playful",
    colors: ["#0EA5E9", "#F472B6", "#FBBF24"],
    prompt: "Design a playful pet care logo with friendly colors",
    description: "A logo for a professional pet sitting and dog walking service",
    status: "completed",
    tags: ["pets", "playful", "care"],
  },
  {
    id: "logo-007",
    title: "Real Estate Agency",
    previewUrl: "/design_7.png",
    createdAt: "2025-04-05T10:05:00Z",
    userId: "1",
    userName: "John Smith",
    userAvatar: "https://i.pravatar.cc/150?img=1",
    isApproved: false,
    logoType: "professional",
    colors: ["#0F172A", "#334155", "#94A3B8"],
    prompt: "Create a professional real estate logo that conveys trust",
    description: "A logo for a luxury real estate agency",
    status: "rejected",
    tags: ["real estate", "professional", "luxury"],
  },
];

// Logo Detail Panel
function LogoDetailPanel({ logo, onClose }) {
  return (
    <div className="space-y-6 py-2">
      <div className="flex items-center gap-4">
        <div className="h-20 w-20 rounded-md bg-muted/20 flex items-center justify-center overflow-hidden">
          <img
            src={logo.previewUrl}
            alt={logo.title}
            className="object-contain w-full h-full"
          />
        </div>
        <div>
          <h3 className="text-xl font-semibold">{logo.title}</h3>
          <p className="text-muted-foreground">Created on {new Date(logo.createdAt).toLocaleDateString()}</p>
        </div>
      </div>

      <Tabs defaultValue="details">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="details">Logo Details</TabsTrigger>
          <TabsTrigger value="prompt">Prompt & Settings</TabsTrigger>
          <TabsTrigger value="user">User Info</TabsTrigger>
        </TabsList>
        
        <TabsContent value="details" className="space-y-4 pt-4">
          <div className="grid gap-2">
            <h4 className="font-medium">Description</h4>
            <p className="text-sm text-muted-foreground">{logo.description}</p>
          </div>
          
          <div className="grid gap-2">
            <h4 className="font-medium">Logo Type</h4>
            <div className="flex items-center">
              <Badge variant="outline" className="capitalize">
                {logo.logoType}
              </Badge>
            </div>
          </div>
          
          <div className="grid gap-2">
            <h4 className="font-medium">Status</h4>
            <div className="flex items-center">
              <div
                className={`mr-2 h-2 w-2 rounded-full ${
                  logo.status === "completed"
                    ? "bg-green-500"
                    : logo.status === "pending"
                    ? "bg-yellow-500"
                    : "bg-red-500"
                }`}
              />
              <span className="capitalize">{logo.status}</span>
            </div>
          </div>
          
          <div className="grid gap-2">
            <h4 className="font-medium">Colors</h4>
            <div className="flex gap-2">
              {logo.colors.map((color, index) => (
                <div
                  key={index}
                  className="h-6 w-6 rounded-full border"
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
            </div>
          </div>
          
          <div className="grid gap-2">
            <h4 className="font-medium">Tags</h4>
            <div className="flex flex-wrap gap-1">
              {logo.tags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="capitalize">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="prompt" className="space-y-4 pt-4">
          <div className="grid gap-2">
            <h4 className="font-medium">Prompt Used</h4>
            <div className="p-3 bg-muted/50 rounded-md text-sm">
              {logo.prompt}
            </div>
          </div>
          
          <div className="grid gap-2">
            <h4 className="font-medium">Creation Settings</h4>
            <div className="bg-muted/50 rounded-md p-3">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="font-medium">Logo Type:</div>
                <div className="capitalize">{logo.logoType}</div>
                
                <div className="font-medium">Color Scheme:</div>
                <div>
                  {logo.colors.map((color) => color).join(", ")}
                </div>
                
                <div className="font-medium">Generated on:</div>
                <div>{new Date(logo.createdAt).toLocaleString()}</div>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="user" className="space-y-4 pt-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={logo.userAvatar} alt={logo.userName} />
              <AvatarFallback>{logo.userName.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">{logo.userName}</div>
              <div className="text-sm text-muted-foreground">User ID: {logo.userId}</div>
            </div>
          </div>
          
          <div className="pt-2 flex justify-between">
            <Button variant="outline" size="sm">
              <User className="h-4 w-4 mr-2" />
              View User Profile
            </Button>
            
            <Button variant="outline" size="sm">
              <Eye className="h-4 w-4 mr-2" />
              View User's Logos
            </Button>
          </div>
        </TabsContent>
      </Tabs>

      <SheetFooter>
        <div className="flex gap-2 w-full">
          <Button variant="outline" className="flex-1">
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
          <Button variant="outline" className="flex-1">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
          <Button variant="destructive" className="flex-1">
            <Trash className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </div>
      </SheetFooter>
    </div>
  );
}

export default function LogosPage() {
  const [logos, setLogos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [selectedLogo, setSelectedLogo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [date, setDate] = useState(undefined);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [currentViewLogo, setCurrentViewLogo] = useState(null);

  // Fetch logos data
  useEffect(() => {
    // In a real implementation, this would be a fetch call to your backend
    setTimeout(() => {
      setLogos(mockLogos);
      setIsLoading(false);
    }, 600);
  }, []);

  // Filter logos based on search term, filters, and date
  const filteredLogos = logos.filter((logo) => {
    const matchesSearch =
      logo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      logo.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      logo.prompt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      logo.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      logo.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus = statusFilter === "all" || logo.status === statusFilter;
    const matchesType = typeFilter === "all" || logo.logoType === typeFilter;
    
    // Date filter
    const matchesDate = !date || new Date(logo.createdAt).toDateString() === date.toDateString();

    return matchesSearch && matchesStatus && matchesType && matchesDate;
  });

  const openViewer = (logo) => {
    setCurrentViewLogo(logo);
    setIsViewerOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Generated Logos Management</h1>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by title, user, prompt, or tag..."
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
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>

              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[130px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Logo Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="abstract">Abstract</SelectItem>
                  <SelectItem value="typography">Typography</SelectItem>
                  <SelectItem value="illustrated">Illustrated</SelectItem>
                  <SelectItem value="minimalist">Minimalist</SelectItem>
                  <SelectItem value="vintage">Vintage</SelectItem>
                  <SelectItem value="playful">Playful</SelectItem>
                  <SelectItem value="professional">Professional</SelectItem>
                </SelectContent>
              </Select>

              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-[130px] justify-start">
                    <CalendarIcon className="h-4 w-4 mr-2" />
                    {date ? format(date, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              {date && (
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setDate(undefined)}
                  title="Clear date filter"
                >
                  <Trash className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Logo</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Created By</TableHead>
                  <TableHead>Created On</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-10 text-muted-foreground">
                      Loading logos...
                    </TableCell>
                  </TableRow>
                ) : filteredLogos.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-10 text-muted-foreground">
                      No logos found matching your criteria.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredLogos.map((logo) => (
                    <TableRow key={logo.id}>
                      <TableCell>
                        <div 
                          className="h-10 w-10 rounded bg-muted/20 flex items-center justify-center overflow-hidden cursor-pointer"
                          onClick={() => openViewer(logo)}
                        >
                          <img
                            src={logo.previewUrl}
                            alt={logo.title}
                            className="object-contain w-full h-full"
                          />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{logo.title}</div>
                        <div className="text-sm text-muted-foreground truncate max-w-[200px]">
                          {logo.description}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={logo.userAvatar} alt={logo.userName} />
                            <AvatarFallback>{logo.userName.substring(0, 2).toUpperCase()}</AvatarFallback>
                          </Avatar>
                          <span>{logo.userName}</span>
                        </div>
                      </TableCell>
                      <TableCell>{new Date(logo.createdAt).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize">
                          {logo.logoType}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <div
                            className={`mr-2 h-2 w-2 rounded-full ${
                              logo.status === "completed"
                                ? "bg-green-500"
                                : logo.status === "pending"
                                ? "bg-yellow-500"
                                : "bg-red-500"
                            }`}
                          />
                          <span className="capitalize">{logo.status}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Sheet>
                            <SheetTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setSelectedLogo(logo)}
                              >
                                <BadgeInfo className="h-4 w-4" />
                              </Button>
                            </SheetTrigger>
                            <SheetContent className="sm:max-w-md overflow-y-auto">
                              <SheetHeader>
                                <SheetTitle>Logo Details</SheetTitle>
                                <SheetDescription>
                                  Detailed information about this logo.
                                </SheetDescription>
                              </SheetHeader>
                              {selectedLogo && (
                                <LogoDetailPanel
                                  logo={selectedLogo}
                                  onClose={() => setSelectedLogo(null)}
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
                              <DropdownMenuItem onClick={() => openViewer(logo)}>
                                <Eye className="mr-2 h-4 w-4" />
                                View Logo
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Download className="mr-2 h-4 w-4" />
                                Download
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-destructive">
                                <Trash className="mr-2 h-4 w-4" />
                                Delete Logo
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

      {/* Logo Viewer Dialog */}
      <Dialog open={isViewerOpen} onOpenChange={setIsViewerOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{currentViewLogo?.title}</DialogTitle>
            <DialogDescription>
              Created by {currentViewLogo?.userName} on {currentViewLogo && new Date(currentViewLogo.createdAt).toLocaleDateString()}
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center py-4">
            <div className="max-w-full max-h-[400px] overflow-hidden rounded-md border">
              {currentViewLogo && (
                <img
                  src={currentViewLogo.previewUrl}
                  alt={currentViewLogo.title}
                  className="object-contain w-full h-full"
                />
              )}
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsViewerOpen(false)}>
              Close
            </Button>
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}