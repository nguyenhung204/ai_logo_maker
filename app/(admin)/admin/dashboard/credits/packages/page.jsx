"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Edit,
  Trash,
  Plus,
  Save,
  Percent,
  DollarSign,
  CreditCard,
  Package,
  Calendar,
  MoreHorizontal,
  Search,
  Filter,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

// Mock credit packages data
const mockCreditPackages = [
  {
    id: "1",
    name: "Basic Package",
    credits: 10,
    price: 4.99,
    isActive: true,
    type: "standard",
    description: "Perfect for beginners, get started with 10 credits",
    imagePath: "/buy-credits-logo-imgs/basic-package-logo.png",
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    name: "Standard Package",
    credits: 50,
    price: 19.99,
    isActive: true,
    type: "standard",
    description: "Most popular choice, 50 credits for your logo designs",
    imagePath: "/buy-credits-logo-imgs/standard-package-logo.png",
    createdAt: "2024-01-15",
  },
  {
    id: "3",
    name: "Professional Package",
    credits: 100,
    price: 34.99,
    isActive: true,
    type: "standard",
    description: "For professionals, 100 credits at a discounted price",
    imagePath: "/buy-credits-logo-imgs/professional-package-logo.png",
    createdAt: "2024-01-15",
  },
  {
    id: "4",
    name: "Advanced Package",
    credits: 200,
    price: 59.99,
    isActive: true,
    type: "standard",
    description: "Best value, ideal for businesses with 200 credits",
    imagePath: "/buy-credits-logo-imgs/advanced-package-logo.png",
    createdAt: "2024-01-15",
  },
  {
    id: "5",
    name: "Summer Sale Package",
    credits: 75,
    price: 24.99,
    isActive: false,
    type: "promotional",
    description: "Limited time summer offer, 75 credits at a special price",
    imagePath: "/buy-credits-logo-imgs/standard-package-logo.png",
    createdAt: "2024-03-10",
  },
];

// Mock promotions data
const mockPromotions = [
  {
    id: "1",
    code: "SUMMER25",
    discount: 25,
    discountType: "percentage",
    validFrom: "2025-06-01",
    validTo: "2025-08-31",
    isActive: true,
    minimumCredits: 50,
    description: "Summer promotion - 25% off on all packages",
  },
  {
    id: "2",
    code: "WELCOME10",
    discount: 10,
    discountType: "fixed",
    validFrom: "2025-01-01",
    validTo: "2025-12-31",
    isActive: true,
    minimumCredits: 0,
    description: "$10 off for new users",
  },
  {
    id: "3",
    code: "FLASHSALE",
    discount: 40,
    discountType: "percentage",
    validFrom: "2025-04-15",
    validTo: "2025-04-20",
    isActive: false,
    minimumCredits: 100,
    description: "Flash sale - 40% off on packages with 100+ credits",
  },
];

// Credit Package Form component
function CreditPackageForm({ initialData, onSubmit, onCancel, isEditing = false }) {
  const [formData, setFormData] = useState(
    initialData || {
      name: "",
      credits: 0,
      price: 0,
      isActive: true,
      type: "standard",
      description: "",
      imagePath: "/buy-credits-logo-imgs/basic-package-logo.png",
    }
  );

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Package Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            placeholder="e.g. Basic Package"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="credits">Number of Credits</Label>
            <Input
              id="credits"
              type="number"
              min="1"
              value={formData.credits}
              onChange={(e) => handleChange("credits", parseInt(e.target.value))}
              placeholder="e.g. 10"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="price">Price ($)</Label>
            <Input
              id="price"
              type="number"
              min="0.01"
              step="0.01"
              value={formData.price}
              onChange={(e) => handleChange("price", parseFloat(e.target.value))}
              placeholder="e.g. 4.99"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="type">Package Type</Label>
          <Select
            value={formData.type}
            onValueChange={(value) => handleChange("type", value)}
          >
            <SelectTrigger id="type">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="standard">Standard</SelectItem>
              <SelectItem value="promotional">Promotional</SelectItem>
              <SelectItem value="subscription">Subscription</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Input
            id="description"
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
            placeholder="Brief description of the package"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="imagePath">Image Path</Label>
          <Input
            id="imagePath"
            value={formData.imagePath}
            onChange={(e) => handleChange("imagePath", e.target.value)}
            placeholder="/path/to/image.png"
          />
        </div>

        <div className="flex items-center space-x-2 pt-2">
          <Switch
            id="isActive"
            checked={formData.isActive}
            onCheckedChange={(checked) => handleChange("isActive", checked)}
          />
          <Label htmlFor="isActive">Active Package</Label>
        </div>
      </div>

      <DialogFooter>
        <Button variant="outline" type="button" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          <Save className="h-4 w-4 mr-2" />
          {isEditing ? "Update Package" : "Create Package"}
        </Button>
      </DialogFooter>
    </form>
  );
}

// Promotion Form component
function PromotionForm({ initialData, onSubmit, onCancel, isEditing = false }) {
  const [formData, setFormData] = useState(
    initialData || {
      code: "",
      discount: 0,
      discountType: "percentage",
      validFrom: new Date().toISOString().split("T")[0],
      validTo: new Date(new Date().setMonth(new Date().getMonth() + 1))
        .toISOString()
        .split("T")[0],
      isActive: true,
      minimumCredits: 0,
      description: "",
    }
  );

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-4">
        <div className="space-y-2">
          <Label htmlFor="code">Promo Code</Label>
          <Input
            id="code"
            value={formData.code}
            onChange={(e) => handleChange("code", e.target.value.toUpperCase())}
            placeholder="e.g. SUMMER25"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="discount">Discount</Label>
            <Input
              id="discount"
              type="number"
              min="1"
              value={formData.discount}
              onChange={(e) => handleChange("discount", parseFloat(e.target.value))}
              placeholder="e.g. 25"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="discountType">Discount Type</Label>
            <Select
              value={formData.discountType}
              onValueChange={(value) => handleChange("discountType", value)}
            >
              <SelectTrigger id="discountType">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="percentage">Percentage (%)</SelectItem>
                <SelectItem value="fixed">Fixed Amount ($)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="validFrom">Valid From</Label>
            <Input
              id="validFrom"
              type="date"
              value={formData.validFrom}
              onChange={(e) => handleChange("validFrom", e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="validTo">Valid To</Label>
            <Input
              id="validTo"
              type="date"
              value={formData.validTo}
              onChange={(e) => handleChange("validTo", e.target.value)}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="minimumCredits">Minimum Credits Required</Label>
          <Input
            id="minimumCredits"
            type="number"
            min="0"
            value={formData.minimumCredits}
            onChange={(e) => handleChange("minimumCredits", parseInt(e.target.value))}
            placeholder="e.g. 50"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Input
            id="description"
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
            placeholder="Brief description of the promotion"
          />
        </div>

        <div className="flex items-center space-x-2 pt-2">
          <Switch
            id="isActive"
            checked={formData.isActive}
            onCheckedChange={(checked) => handleChange("isActive", checked)}
          />
          <Label htmlFor="isActive">Active Promotion</Label>
        </div>
      </div>

      <DialogFooter>
        <Button variant="outline" type="button" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          <Save className="h-4 w-4 mr-2" />
          {isEditing ? "Update Promotion" : "Create Promotion"}
        </Button>
      </DialogFooter>
    </form>
  );
}

export default function CreditPackagesPage() {
  const [activeTab, setActiveTab] = useState("packages");
  const [packages, setPackages] = useState([]);
  const [promotions, setPromotions] = useState([]);
  const [isPackageDialogOpen, setIsPackageDialogOpen] = useState(false);
  const [isPromotionDialogOpen, setIsPromotionDialogOpen] = useState(false);
  const [currentPackage, setCurrentPackage] = useState(null);
  const [currentPromotion, setCurrentPromotion] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [packageTypeFilter, setPackageTypeFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  // Fetch data
  useEffect(() => {
    // In a real implementation, this would be a fetch call to your backend
    setTimeout(() => {
      setPackages(mockCreditPackages);
      setPromotions(mockPromotions);
      setIsLoading(false);
    }, 600);
  }, []);

  // Filter packages based on search term and filters
  const filteredPackages = packages.filter((pkg) => {
    const matchesSearch =
      pkg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pkg.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesActiveState =
      activeFilter === "all" || 
      (activeFilter === "active" && pkg.isActive) || 
      (activeFilter === "inactive" && !pkg.isActive);
    
    const matchesType =
      packageTypeFilter === "all" || pkg.type === packageTypeFilter;

    return matchesSearch && matchesActiveState && matchesType;
  });

  // Filter promotions based on search term and filters
  const filteredPromotions = promotions.filter((promo) => {
    const matchesSearch =
      promo.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      promo.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesActiveState =
      activeFilter === "all" || 
      (activeFilter === "active" && promo.isActive) || 
      (activeFilter === "inactive" && !promo.isActive);

    return matchesSearch && matchesActiveState;
  });

  const handleCreatePackage = (packageData) => {
    const newPackage = {
      ...packageData,
      id: (packages.length + 1).toString(),
      createdAt: new Date().toISOString().split("T")[0],
    };
    setPackages([...packages, newPackage]);
    setIsPackageDialogOpen(false);
  };

  const handleUpdatePackage = (packageData) => {
    setPackages(
      packages.map((pkg) => (pkg.id === packageData.id ? packageData : pkg))
    );
    setIsPackageDialogOpen(false);
    setCurrentPackage(null);
    setIsEditing(false);
  };

  const handleDeletePackage = (id) => {
    setPackages(packages.filter((pkg) => pkg.id !== id));
  };

  const handleCreatePromotion = (promotionData) => {
    const newPromotion = {
      ...promotionData,
      id: (promotions.length + 1).toString(),
    };
    setPromotions([...promotions, newPromotion]);
    setIsPromotionDialogOpen(false);
  };

  const handleUpdatePromotion = (promotionData) => {
    setPromotions(
      promotions.map((promo) => (promo.id === promotionData.id ? promotionData : promo))
    );
    setIsPromotionDialogOpen(false);
    setCurrentPromotion(null);
    setIsEditing(false);
  };

  const handleDeletePromotion = (id) => {
    setPromotions(promotions.filter((promo) => promo.id !== id));
  };

  const openEditPackageDialog = (pkg) => {
    setCurrentPackage(pkg);
    setIsEditing(true);
    setIsPackageDialogOpen(true);
  };

  const openEditPromotionDialog = (promo) => {
    setCurrentPromotion(promo);
    setIsEditing(true);
    setIsPromotionDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Credits Package Management</h1>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="packages">
            <Package className="h-4 w-4 mr-2" />
            Credit Packages
          </TabsTrigger>
          <TabsTrigger value="promotions">
            <Percent className="h-4 w-4 mr-2" />
            Promotions
          </TabsTrigger>
        </TabsList>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={`Search ${activeTab === "packages" ? "packages" : "promotions"}...`}
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <Select value={activeFilter} onValueChange={setActiveFilter}>
              <SelectTrigger className="w-[130px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>

            {activeTab === "packages" && (
              <Select value={packageTypeFilter} onValueChange={setPackageTypeFilter}>
                <SelectTrigger className="w-[130px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="standard">Standard</SelectItem>
                  <SelectItem value="promotional">Promotional</SelectItem>
                  <SelectItem value="subscription">Subscription</SelectItem>
                </SelectContent>
              </Select>
            )}

            {activeTab === "packages" ? (
              <Dialog open={isPackageDialogOpen} onOpenChange={setIsPackageDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={() => {
                    setCurrentPackage(null);
                    setIsEditing(false);
                  }}>
                    <Plus className="h-4 w-4 mr-2" /> New Package
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[550px]">
                  <DialogHeader>
                    <DialogTitle>{isEditing ? "Edit Credit Package" : "Create New Credit Package"}</DialogTitle>
                    <DialogDescription>
                      {isEditing ? "Update the details of this credit package." : "Add a new credit package to your store."}
                    </DialogDescription>
                  </DialogHeader>
                  <CreditPackageForm
                    initialData={currentPackage}
                    onSubmit={isEditing ? handleUpdatePackage : handleCreatePackage}
                    onCancel={() => setIsPackageDialogOpen(false)}
                    isEditing={isEditing}
                  />
                </DialogContent>
              </Dialog>
            ) : (
              <Dialog open={isPromotionDialogOpen} onOpenChange={setIsPromotionDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={() => {
                    setCurrentPromotion(null);
                    setIsEditing(false);
                  }}>
                    <Plus className="h-4 w-4 mr-2" /> New Promotion
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[550px]">
                  <DialogHeader>
                    <DialogTitle>{isEditing ? "Edit Promotion" : "Create New Promotion"}</DialogTitle>
                    <DialogDescription>
                      {isEditing ? "Update the details of this promotion." : "Add a new promotion code to your store."}
                    </DialogDescription>
                  </DialogHeader>
                  <PromotionForm
                    initialData={currentPromotion}
                    onSubmit={isEditing ? handleUpdatePromotion : handleCreatePromotion}
                    onCancel={() => setIsPromotionDialogOpen(false)}
                    isEditing={isEditing}
                  />
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>

        <TabsContent value="packages" className="space-y-4">
          <Card>
            <CardContent className="p-0">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Credits</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isLoading ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-10 text-muted-foreground">
                          Loading credit packages...
                        </TableCell>
                      </TableRow>
                    ) : filteredPackages.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-10 text-muted-foreground">
                          No credit packages found matching your criteria.
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredPackages.map((pkg) => (
                        <TableRow key={pkg.id}>
                          <TableCell>
                            <div className="font-medium">{pkg.name}</div>
                            <div className="text-sm text-muted-foreground truncate max-w-[200px]">
                              {pkg.description}
                            </div>
                          </TableCell>
                          <TableCell>{pkg.credits}</TableCell>
                          <TableCell>${pkg.price.toFixed(2)}</TableCell>
                          <TableCell>
                            <div className="capitalize">{pkg.type}</div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <div
                                className={`mr-2 h-2 w-2 rounded-full ${
                                  pkg.isActive ? "bg-green-500" : "bg-yellow-500"
                                }`}
                              />
                              {pkg.isActive ? "Active" : "Inactive"}
                            </div>
                          </TableCell>
                          <TableCell>{pkg.createdAt}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => openEditPackageDialog(pkg)}
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
                                  <DropdownMenuItem
                                    onClick={() => handleDeletePackage(pkg.id)}
                                    className="text-destructive"
                                  >
                                    <Trash className="mr-2 h-4 w-4" />
                                    Delete Package
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
        </TabsContent>

        <TabsContent value="promotions" className="space-y-4">
          <Card>
            <CardContent className="p-0">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Code</TableHead>
                      <TableHead>Discount</TableHead>
                      <TableHead>Valid Period</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Min. Credits</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isLoading ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-10 text-muted-foreground">
                          Loading promotions...
                        </TableCell>
                      </TableRow>
                    ) : filteredPromotions.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-10 text-muted-foreground">
                          No promotions found matching your criteria.
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredPromotions.map((promo) => (
                        <TableRow key={promo.id}>
                          <TableCell>
                            <div className="font-medium">{promo.code}</div>
                            <div className="text-sm text-muted-foreground truncate max-w-[200px]">
                              {promo.description}
                            </div>
                          </TableCell>
                          <TableCell>
                            {promo.discountType === "percentage"
                              ? `${promo.discount}%`
                              : `$${promo.discount.toFixed(2)}`}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center text-sm">
                              <Calendar className="h-3.5 w-3.5 mr-1" />
                              {promo.validFrom} to {promo.validTo}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <div
                                className={`mr-2 h-2 w-2 rounded-full ${
                                  promo.isActive ? "bg-green-500" : "bg-yellow-500"
                                }`}
                              />
                              {promo.isActive ? "Active" : "Inactive"}
                            </div>
                          </TableCell>
                          <TableCell>
                            {promo.minimumCredits > 0
                              ? `${promo.minimumCredits} credits`
                              : "None"}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => openEditPromotionDialog(promo)}
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
                                  <DropdownMenuItem
                                    onClick={() => handleDeletePromotion(promo.id)}
                                    className="text-destructive"
                                  >
                                    <Trash className="mr-2 h-4 w-4" />
                                    Delete Promotion
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
        </TabsContent>
      </Tabs>
    </div>
  );
}