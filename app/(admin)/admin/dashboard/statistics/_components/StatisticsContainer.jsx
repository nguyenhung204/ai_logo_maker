"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  collection, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  Timestamp, 
  getCountFromServer
} from "firebase/firestore";
import { db } from "@/config/FirebaseConfig";
import { toast } from "sonner";
import { RefreshCw, Users, ImageIcon, DollarSign, CreditCard } from "lucide-react";

import RevenueChart from "./RevenueChart";
import UserGrowthChart from "./UserGrowthChart";
import LogoProductionChart from "./LogoProductionChart";
import TopPackagesChart from "./TopPackagesChart";
import StatisticsFilters from "./StatisticsFilters";

export default function StatisticsContainer() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState("30days");
  const [statistics, setStatistics] = useState({
    totalRevenue: 0,
    totalUsers: 0,
    totalLogos: 0,
    totalCredits: 0
  });
  const [revenueData, setRevenueData] = useState([]);
  const [userGrowthData, setUserGrowthData] = useState([]);
  const [logoProductionData, setLogoProductionData] = useState([]);
  const [packagePopularity, setPackagePopularity] = useState([]);

  useEffect(() => {
    fetchStatistics();
  }, [selectedPeriod]);

  const fetchStatistics = async () => {
    try {
      setIsLoading(true);
      
      // Get date ranges based on selected period
      const { startDate, endDate } = getDateRangeForPeriod(selectedPeriod);
      
      // Fetch overall statistics
      const stats = await fetchOverallStatistics(startDate, endDate);
      setStatistics(stats);
      
      // Fetch chart data
      const revenue = await fetchRevenueData(startDate, endDate);
      setRevenueData(revenue);
      
      const userGrowth = await fetchUserGrowthData(startDate, endDate);
      setUserGrowthData(userGrowth);
      
      const logoProduction = await fetchLogoProductionData(startDate, endDate);
      setLogoProductionData(logoProduction);
      
      const packageStats = await fetchPackageData(startDate, endDate);
      setPackagePopularity(packageStats);
      
    } catch (error) {
      console.error("Error fetching statistics:", error);
      toast.error("Failed to load statistics data");
    } finally {
      setIsLoading(false);
    }
  };

  const getDateRangeForPeriod = (period) => {
    const endDate = new Date();
    let startDate = new Date();
    
    switch (period) {
      case "7days":
        startDate.setDate(endDate.getDate() - 7);
        break;
      case "30days":
        startDate.setDate(endDate.getDate() - 30);
        break;
      case "90days":
        startDate.setDate(endDate.getDate() - 90);
        break;
      case "6months":
        startDate.setMonth(endDate.getMonth() - 6);
        break;
      case "1year":
        startDate.setFullYear(endDate.getFullYear() - 1);
        break;
      case "all":
        startDate = new Date(2020, 0, 1); // Set to a date far in the past
        break;
      default:
        startDate.setDate(endDate.getDate() - 30);
    }
    
    return {
      startDate,
      endDate
    };
  };

  const fetchOverallStatistics = async (startDate, endDate) => {
    // Initialize stats object
    const stats = {
      totalRevenue: 0,
      totalUsers: 0,
      totalLogos: 0,
      totalCredits: 0
    };
    
    try {
      // Get users based on selected period
      let usersQuery;
      
      if (selectedPeriod === "all") {
        // If "all time" is selected, get all users
        usersQuery = query(collection(db, "users"));
        const usersSnapshot = await getCountFromServer(usersQuery);
        stats.totalUsers = usersSnapshot.data().count;
      } else {
        // For specific periods, filter users by creation date
        const startTimestamp = Timestamp.fromDate(startDate);
        const endTimestamp = Timestamp.fromDate(endDate);
        
        // Get all users
        usersQuery = query(
          collection(db, "users"),
          where("createdAt", ">=", startTimestamp),
          where("createdAt", "<=", endTimestamp)
        );
        
        const usersDocsInRange = await getDocs(usersQuery);
        stats.totalUsers = usersDocsInRange.size;
      }
      
      // Get all users for logo and transaction calculations
      const allUsersSnapshot = await getDocs(collection(db, "users"));
      
      // Loop through all users to get aggregated data
      for (const userDoc of allUsersSnapshot.docs) {
        const userEmail = userDoc.id;
        
        // Count logos for this user
        try {
          // Get all logos to filter by ID timestamp
          const logosSnapshot = await getDocs(collection(db, "users", userEmail, "logos"));
          
          logosSnapshot.forEach((doc) => {
            // Try to extract timestamp from logo ID (assuming ID format with timestamp)
            try {
              const timestamp = Number(doc.id.split('_')[0]);
              if (!isNaN(timestamp)) {
                const logoDate = new Date(timestamp);
                
                // Only count if within date range
                if (logoDate >= startDate && logoDate <= endDate) {
                  stats.totalLogos += 1;
                }
              } else {
                // As a fallback, try to use createdAt field
                const logoData = doc.data();
                if (logoData.createdAt && logoData.createdAt.toDate) {
                  const logoDate = logoData.createdAt.toDate();
                  if (logoDate >= startDate && logoDate <= endDate) {
                    stats.totalLogos += 1;
                  }
                }
              }
            } catch (error) {
              console.error("Error processing logo timestamp:", error);
            }
          });
        } catch (error) {
          console.error(`Error counting logos for user ${userEmail}:`, error);
        }
        
        // Calculate revenue and credits from transactions
        try {
          let transactionsQuery;
          const startTimestamp = Timestamp.fromDate(startDate);
          const endTimestamp = Timestamp.fromDate(endDate);
          
          transactionsQuery = query(
            collection(db, "users", userEmail, "transactions"),
            where("date", ">=", startTimestamp),
            where("date", "<=", endTimestamp)
          );
          
          const transactionsSnapshot = await getDocs(transactionsQuery);
          
          transactionsSnapshot.forEach((doc) => {
            const transactionData = doc.data();
            
            // Add credits
            stats.totalCredits += transactionData.credits || 0;
            
            // Add to revenue
            const price = transactionData.price || 0;
            const priceNumeric =
              typeof price === "string"
                ? parseFloat(price.replace(/[^0-9.]/g, ""))
                : typeof price === "number"
                ? price
                : 0;
                
            stats.totalRevenue += priceNumeric;
          });
        } catch (error) {
          console.error(`Error processing transactions for user ${userEmail}:`, error);
        }
      }
      
      return stats;
    } catch (error) {
      console.error("Error fetching overall statistics:", error);
      return stats;
    }
  };

  const fetchRevenueData = async (startDate, endDate) => {
    try {
      const usersSnapshot = await getDocs(collection(db, "users"));
      const startTimestamp = Timestamp.fromDate(startDate);
      const endTimestamp = Timestamp.fromDate(endDate);
      
      // Create data points based on selected period
      const dataPoints = generateDatePoints(startDate, endDate);
      
      // Aggregate revenue data
      for (const userDoc of usersSnapshot.docs) {
        const userEmail = userDoc.id;
        
        const transactionsQuery = query(
          collection(db, "users", userEmail, "transactions"),
          where("date", ">=", startTimestamp),
          where("date", "<=", endTimestamp)
        );
        
        const transactionsSnapshot = await getDocs(transactionsQuery);
        
        transactionsSnapshot.forEach((doc) => {
          const transactionData = doc.data();
          
          // Get date from transaction
          const transactionDate = transactionData.date?.toDate?.() 
            ? transactionData.date.toDate() 
            : new Date();
            
          // Calculate the price
          const price = transactionData.price || 0;
          const priceNumeric =
            typeof price === "string"
              ? parseFloat(price.replace(/[^0-9.]/g, ""))
              : typeof price === "number"
              ? price
              : 0;
              
          // Find the corresponding data point and add revenue
          const dateString = formatDateKey(transactionDate, selectedPeriod);
          const dataPointIndex = dataPoints.findIndex(point => point.date === dateString);
          
          if (dataPointIndex !== -1) {
            dataPoints[dataPointIndex].revenue += priceNumeric;
          }
        });
      }
      
      return dataPoints;
    } catch (error) {
      console.error("Error fetching revenue data:", error);
      return [];
    }
  };

  const fetchUserGrowthData = async (startDate, endDate) => {
    try {
      // Create data points based on selected period
      const dataPoints = generateDatePoints(startDate, endDate);
      
      // Get all users ordered by creation date
      const usersQuery = query(
        collection(db, "users"),
        orderBy("createdAt", "asc")
      );
      
      const usersSnapshot = await getDocs(usersQuery);
      let cumulativeUsers = 0;
      
      usersSnapshot.forEach((doc) => {
        const userData = doc.data();
        if (!userData.createdAt) return;
        
        const userCreationDate = userData.createdAt.toDate();
        
        // Only process users created after the start date
        if (userCreationDate >= startDate && userCreationDate <= endDate) {
          cumulativeUsers++;
          
          // Find the corresponding data point and update user count
          const dateString = formatDateKey(userCreationDate, selectedPeriod);
          
          for (let i = 0; i < dataPoints.length; i++) {
            const dateKey = dataPoints[i].date;
            if (compareDates(dateString, dateKey, selectedPeriod) <= 0) {
              dataPoints[i].users = Math.max(dataPoints[i].users, cumulativeUsers);
            }
          }
        } else if (userCreationDate < startDate) {
          // Count users created before the start date
          cumulativeUsers++;
        }
      });
      
      // Ensure all data points have at least the initial user count
      for (let i = 0; i < dataPoints.length; i++) {
        if (i > 0) {
          dataPoints[i].users = Math.max(dataPoints[i].users, dataPoints[i-1].users);
        }
      }
      
      return dataPoints;
    } catch (error) {
      console.error("Error fetching user growth data:", error);
      return [];
    }
  };

  const fetchLogoProductionData = async (startDate, endDate) => {
    try {
      // Create data points based on selected period
      const dataPoints = generateDatePoints(startDate, endDate);
      
      const usersSnapshot = await getDocs(collection(db, "users"));
      
      // Aggregate logo creation data
      for (const userDoc of usersSnapshot.docs) {
        const userEmail = userDoc.id;
        
        // Get all logos instead of filtering by date (since we'll use document ID)
        const logosQuery = query(
          collection(db, "users", userEmail, "logos")
        );
        
        const logosSnapshot = await getDocs(logosQuery);
        
        logosSnapshot.forEach((doc) => {
          let logoDate;
          
          try {
            const timestamp = Number(doc.id.split('_')[0]);
            if (!isNaN(timestamp)) {
              logoDate = new Date(timestamp);
              
              // Only process if logo date is within the selected range
              if (logoDate >= startDate && logoDate <= endDate) {
                // Find the corresponding data point and increment logo count
                const dateString = formatDateKey(logoDate, selectedPeriod);
                const dataPointIndex = dataPoints.findIndex(point => point.date === dateString);
                
                if (dataPointIndex !== -1) {
                  dataPoints[dataPointIndex].logos++;
                }
              }
            }
          } catch (error) {
            console.error("Error parsing logo date from ID:", error);
          }
        });
      }
      
      return dataPoints;
    } catch (error) {
      console.error("Error fetching logo production data:", error);
      return [];
    }
  };

  const fetchPackageData = async (startDate, endDate) => {
    try {
      const startTimestamp = Timestamp.fromDate(startDate);
      const endTimestamp = Timestamp.fromDate(endDate);
      const usersSnapshot = await getDocs(collection(db, "users"));
      
      // Initialize package counter
      const packageCounts = {};
      
      // Aggregate package data
      for (const userDoc of usersSnapshot.docs) {
        const userEmail = userDoc.id;
        
        const transactionsQuery = query(
          collection(db, "users", userEmail, "transactions"),
          where("date", ">=", startTimestamp),
          where("date", "<=", endTimestamp)
        );
        
        const transactionsSnapshot = await getDocs(transactionsQuery);
        
        transactionsSnapshot.forEach((doc) => {
          const transactionData = doc.data();
          let packageName = transactionData.package;
          
          // Determine package name from credits if package name is not available
          if (!packageName) {
            const credits = transactionData.credits || 0;
            if (credits === 5) packageName = "Basic Package";
            else if (credits === 20) packageName = "Standard Package";
            else if (credits === 50) packageName = "Professional Package";
            else if (credits === 120) packageName = "Advanced Package";
            else packageName = "Other";
          }
          
          // Count occurrences
          packageCounts[packageName] = (packageCounts[packageName] || 0) + 1;
        });
      }
      
      // Convert to array for chart
      const packageData = Object.entries(packageCounts).map(([name, count]) => ({
        name,
        value: count
      })).sort((a, b) => b.value - a.value);
      
      return packageData;
    } catch (error) {
      console.error("Error fetching package data:", error);
      return [];
    }
  };

  // Helper function to generate date points based on selected period
  const generateDatePoints = (startDate, endDate) => {
    const dataPoints = [];
    const currentDate = new Date(startDate);
    
    while (currentDate <= endDate) {
      dataPoints.push({
        date: formatDateKey(currentDate, selectedPeriod),
        revenue: 0,
        users: 0,
        logos: 0
      });
      
      // Increment based on period
      switch (selectedPeriod) {
        case "7days":
        case "30days":
          currentDate.setDate(currentDate.getDate() + 1);
          break;
        case "90days":
          currentDate.setDate(currentDate.getDate() + 7);
          break;
        case "6months":
          currentDate.setDate(currentDate.getDate() + 14);
          break;
        case "1year":
          currentDate.setMonth(currentDate.getMonth() + 1);
          break;
        case "all":
          currentDate.setMonth(currentDate.getMonth() + 3);
          break;
        default:
          currentDate.setDate(currentDate.getDate() + 1);
      }
    }
    
    return dataPoints;
  };

  // Helper function to format dates based on the selected period
  const formatDateKey = (date, period) => {
    switch (period) {
      case "7days":
      case "30days":
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
      case "90days":
        const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
        const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
        const weekNum = Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
        return `${date.getFullYear()}-W${String(weekNum).padStart(2, '0')}`;
      case "6months":
        const biWeek = date.getDate() <= 15 ? 1 : 2;
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${biWeek}`;
      case "1year":
      case "all":
        // Month format (YYYY-MM)
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      default:
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    }
  };

  const compareDates = (dateA, dateB, period) => {
    return dateA.localeCompare(dateB);
  };

  // Format currency for display
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  // Handle period change
  const handlePeriodChange = (newPeriod) => {
    setSelectedPeriod(newPeriod);
  };

  // Handle refresh
  const handleRefresh = () => {
    fetchStatistics();
    toast.success("Statistics data refreshed");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Statistics Dashboard</h1>
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            onClick={handleRefresh}
            disabled={isLoading}
            className="flex items-center gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>
      </div>

      <StatisticsFilters
        selectedPeriod={selectedPeriod}
        onPeriodChange={handlePeriodChange}
        isLoading={isLoading}
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(statistics.totalRevenue)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statistics.totalUsers.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Logos Generated</CardTitle>
            <ImageIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statistics.totalLogos.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Credits Sold</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statistics.totalCredits.toLocaleString()}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Revenue Over Time</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <RevenueChart data={revenueData} period={selectedPeriod} isLoading={isLoading} />
          </CardContent>
        </Card>
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>User Growth</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <UserGrowthChart data={userGrowthData} period={selectedPeriod} isLoading={isLoading} />
          </CardContent>
        </Card>
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Logo Production</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <LogoProductionChart data={logoProductionData} period={selectedPeriod} isLoading={isLoading} />
          </CardContent>
        </Card>
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Popular Packages</CardTitle>
          </CardHeader>
          <CardContent>
            <TopPackagesChart data={packagePopularity} isLoading={isLoading} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}