"use client";

import { useState, useEffect } from "react";
import { db } from "@/config/FirebaseConfig";
import { 
  collection, 
  getDocs, 
  query, 
  orderBy, 
  limit, 
  where, 
  Timestamp, 
  getCountFromServer
} from "firebase/firestore";

// Import components
import StatCard from "./_components/StatCard";
import LogoTypeChart from "./_components/LogoTypeChart";
import CreditPackageGrid from "./_components/CreditPackageGrid";
import RecentLogos from "./_components/RecentLogos";
import RecentUsers from "./_components/RecentUsers";
import RecentTransactions from "./_components/RecentTransactions";
import TimeRangeSelector from "./_components/TimeRangeSelector";

// Import icons
import {
  BarChart,
  Users,
  CreditCard,
  Image as ImageIcon,
  DollarSign
} from "lucide-react";

export default function AdminDashboard() {
  const [timeRange, setTimeRange] = useState("week");
  const [isLoading, setIsLoading] = useState(true);
  const [recentLogos, setRecentLogos] = useState([]);
  const [recentUsers, setRecentUsers] = useState([]);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [statistics, setStatistics] = useState({
    revenue: 0,
    previousRevenue: 0,
    logosCreated: 0,
    previousLogos: 0,
    newUsers: 0,
    previousUsers: 0,
    creditsPurchased: 0,
    previousCredits: 0
  });
  const [logoTypes, setLogoTypes] = useState([]);
  const [packageCounts, setPackageCounts] = useState([]);
  
  const creditPackages = [
    { name: "Basic Package", credits: 20, price: "$4.99", image: "/buy-credits-logo-imgs/basic-package-logo.png" },
    { name: "Standard Package", credits: 50, price: "$9.99", image: "/buy-credits-logo-imgs/standard-package-logo.png" },
    { name: "Professional Package", credits: 100, price: "$29.99", image: "/buy-credits-logo-imgs/professional-package-logo.png" },
    { name: "Advanced Package", credits: 200, price: "$59.99", image: "/buy-credits-logo-imgs/advanced-package-logo.png" }
  ];
  
  useEffect(() => {
    fetchData();
  }, [timeRange]);
  
  const fetchData = async () => {
    setIsLoading(true);
    
    try {
      const { startDate, previousStartDate } = getDateRange(timeRange);
      
      await fetchRecentUsers();
      await fetchRecentLogos();
      await fetchRecentTransactions();
      await fetchStatistics(startDate, previousStartDate);
      await fetchPackageDistribution();
      
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const getDateRange = (range) => {
    const now = new Date();
    let startDate, previousStartDate;
    
    switch(range) {
      case "month":
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        previousStartDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        break;
      case "year":
        startDate = new Date(now.getFullYear(), 0, 1);
        previousStartDate = new Date(now.getFullYear() - 1, 0, 1);
        break;
      default:
        const day = now.getDay();
        startDate = new Date(now);
        startDate.setDate(now.getDate() - day);
        previousStartDate = new Date(startDate);
        previousStartDate.setDate(startDate.getDate() - 7);
    }
    
    return { 
      startDate: Timestamp.fromDate(startDate),
      previousStartDate: Timestamp.fromDate(previousStartDate)
    };
  };
  
  const fetchRecentLogos = async () => {
    try {
      const usersSnapshot = await getDocs(collection(db, "users"));
      const logos = [];
      
      const logosPromises = usersSnapshot.docs.map(async (userDoc) => {
        const userEmail = userDoc.id;
        const userData = userDoc.data();
        
        const logosQuery = query(
          collection(db, "users", userEmail, "logos"),
          orderBy("createdAt", "desc"),
          limit(3)
        );
        
        const logosSnapshot = await getDocs(logosQuery);
        
        logosSnapshot.forEach(doc => {
          const logoData = doc.data();
          logos.push({
            id: doc.id,
            title: logoData.title || "Untitled Logo",
            previewUrl: logoData.image || "/design_1.png",
            createdAt: logoData.createdAt?.toDate?.() 
              ? logoData.createdAt.toDate().toISOString() 
              : new Date().toISOString(),
            userName: userData.name || "Unknown User",
            userEmail: userEmail,
            status: logoData.status || "completed",
            logoType: logoData.logoDesign?.title || "Custom Design",
            desc: logoData.desc || ""
          });
        });
      });
      
      await Promise.all(logosPromises);
      
      logos.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setRecentLogos(logos.slice(0, 4));
      
      analyzeLogoTypes(logos);
      
      return logos;
    } catch (error) {
      console.error("Error fetching logos:", error);
      setRecentLogos([]);
      return [];
    }
  };
  
  const analyzeLogoTypes = (logos) => {
    const logoTypeCount = {};
    
    logos.forEach(logo => {
      const logoType = logo.logoType || "Other";
      logoTypeCount[logoType] = (logoTypeCount[logoType] || 0) + 1;
    });
    
    const logoTypesArray = Object.entries(logoTypeCount).map(([name, count]) => ({
      name,
      count
    })).sort((a, b) => b.count - a.count);
    
    setLogoTypes(logoTypesArray);
  };
  
  const fetchRecentUsers = async () => {
    const usersQuery = query(
      collection(db, "users"),
      orderBy("createdAt", "desc"),
      limit(4)
    );
    
    const usersSnapshot = await getDocs(usersQuery);
    const users = [];
    
    usersSnapshot.forEach(doc => {
      const userData = doc.data();
      users.push({
        email: doc.id,
        name: userData.name || "Unknown User",
        role: userData.role || "member",
        status: userData.status || "active",
        credits: userData.credits || 0,
        createdAt: userData.createdAt?.toDate?.() 
          ? userData.createdAt.toDate().toISOString() 
          : new Date().toISOString(),
        lastLogin: userData.lastLogin?.toDate?.() 
          ? userData.lastLogin.toDate().toISOString() 
          : null,
        totalLogos: userData.totalLogos || 0
      });
    });
    
    setRecentUsers(users);
    return users;
  };
  
  const fetchRecentTransactions = async () => {
    const transactionsQuery = query(
      collection(db, "transactions"),
      orderBy("createdAt", "desc"),
      limit(4)
    );
    
    const transactionsSnapshot = await getDocs(transactionsQuery);
    const transactions = [];
    
    for (const doc of transactionsSnapshot.docs) {
      const transactionData = doc.data();
      const packageInfo = creditPackages.find(pkg => 
        pkg.credits === transactionData.credits || 
        pkg.name === transactionData.packageName
      ) || creditPackages[0];
      
      transactions.push({
        id: doc.id,
        user: transactionData.userName || "Unknown User",
        userEmail: transactionData.userEmail || "",
        amount: transactionData.amount || 0,
        credits: transactionData.credits || 0,
        package: transactionData.packageName || packageInfo.name,
        packageImage: packageInfo.image,
        date: transactionData.createdAt?.toDate?.() 
          ? transactionData.createdAt.toDate().toISOString() 
          : new Date().toISOString(),
        status: transactionData.status || "completed"
      });
    }
    
    setRecentTransactions(transactions);
  };
  
  const fetchStatistics = async (startDate, previousStartDate) => {
    const currentStats = await getPeriodStats(startDate);
    const previousStats = await getPeriodStats(previousStartDate, startDate);
    
    setStatistics({
      revenue: currentStats.revenue,
      previousRevenue: previousStats.revenue,
      logosCreated: currentStats.logosCreated,
      previousLogos: previousStats.logosCreated,
      newUsers: currentStats.newUsers,
      previousUsers: previousStats.newUsers,
      creditsPurchased: currentStats.creditsPurchased,
      previousCredits: previousStats.creditsPurchased
    });
  };
  
  const getPeriodStats = async (startDate, endDate = null) => {
    let revenue = 0;
    let logosCreated = 0;
    let newUsers = 0;
    let creditsPurchased = 0;
    
    try {
      const transactionsQuery = endDate 
        ? query(
            collection(db, "transactions"),
            where("createdAt", ">=", startDate),
            where("createdAt", "<", endDate)
          )
        : query(
            collection(db, "transactions"),
            where("createdAt", ">=", startDate)
          );
      
      const transactionsSnapshot = await getDocs(transactionsQuery);
      
      transactionsSnapshot.forEach(doc => {
        const data = doc.data();
        revenue += data.amount || 0;
        creditsPurchased += data.credits || 0;
      });
      
      const usersQuery = endDate
        ? query(
            collection(db, "users"),
            where("createdAt", ">=", startDate),
            where("createdAt", "<", endDate)
          )
        : query(
            collection(db, "users"),
            where("createdAt", ">=", startDate)
          );
      
      const usersSnapshot = await getCountFromServer(usersQuery);
      newUsers = usersSnapshot.data().count;
      
      const allUsersSnapshot = await getDocs(collection(db, "users"));
      
      const logoCountPromises = allUsersSnapshot.docs.map(async (userDoc) => {
        const userEmail = userDoc.id;
        
        const logosQuery = endDate
          ? query(
              collection(db, "users", userEmail, "logos"),
              where("createdAt", ">=", startDate),
              where("createdAt", "<", endDate)
            )
          : query(
              collection(db, "users", userEmail, "logos"),
              where("createdAt", ">=", startDate)
            );
        
        const logosSnapshot = await getCountFromServer(logosQuery);
        return logosSnapshot.data().count;
      });
      
      const logoCounts = await Promise.all(logoCountPromises);
      logosCreated = logoCounts.reduce((total, count) => total + count, 0);
      
      return { revenue, logosCreated, newUsers, creditsPurchased };
    } catch (error) {
      console.error("Error getting period stats:", error);
      return { revenue: 0, logosCreated: 0, newUsers: 0, creditsPurchased: 0 };
    }
  };
  
  const fetchPackageDistribution = async () => {
    const packageCount = {};
    
    const transactionsQuery = query(
      collection(db, "transactions"),
      limit(100)
    );
    
    const transactionsSnapshot = await getDocs(transactionsQuery);
    
    transactionsSnapshot.forEach(doc => {
      const transactionData = doc.data();
      let packageName = transactionData.packageName;
      
      if (!packageName) {
        const matchingPackage = creditPackages.find(pkg => 
          pkg.credits === transactionData.credits
        );
        packageName = matchingPackage ? matchingPackage.name : "Other";
      }
      
      packageCount[packageName] = (packageCount[packageName] || 0) + 1;
    });
    
    const packageCountArray = Object.entries(packageCount).map(([name, count]) => ({
      name,
      count
    })).sort((a, b) => b.count - a.count);
    
    setPackageCounts(packageCountArray);
  };
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  const getTimeRangePeriod = () => {
    switch(timeRange) {
      case "month":
        return "this month";
      case "year":
        return "this year";
      default:
        return "this week";
    }
  };
  
  const getStatCards = () => {
    const revenueChange = statistics.previousRevenue 
      ? ((statistics.revenue - statistics.previousRevenue) / statistics.previousRevenue) * 100 
      : 0;
      
    const logosChange = statistics.previousLogos 
      ? ((statistics.logosCreated - statistics.previousLogos) / statistics.previousLogos) * 100 
      : 0;
      
    const usersChange = statistics.previousUsers 
      ? ((statistics.newUsers - statistics.previousUsers) / statistics.previousUsers) * 100 
      : 0;
      
    const creditsChange = statistics.previousCredits 
      ? ((statistics.creditsPurchased - statistics.previousCredits) / statistics.previousCredits) * 100 
      : 0;
    
    return [
      {
        title: "Total Revenue",
        value: `$${statistics.revenue.toLocaleString('en-US', { maximumFractionDigits: 2 })}`,
        icon: DollarSign,
        change: revenueChange.toFixed(1),
        link: "/admin/dashboard/statistics",
        color: "from-blue-500 to-indigo-500"
      },
      {
        title: "Logos Created",
        value: statistics.logosCreated,
        icon: ImageIcon,
        change: logosChange.toFixed(1),
        link: "/admin/dashboard/logos",
        color: "from-pink-500 to-rose-500"
      },
      {
        title: "New Users",
        value: statistics.newUsers,
        icon: Users,
        change: usersChange.toFixed(1),
        link: "/admin/dashboard/users",
        color: "from-green-500 to-emerald-500"
      },
      {
        title: "Credits Sold",
        value: statistics.creditsPurchased.toLocaleString('en-US'),
        icon: CreditCard,
        change: creditsChange.toFixed(1),
        link: "/admin/dashboard/credits/packages",
        color: "from-orange-500 to-amber-500"
      },
    ];
  };
  
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard Overview</h1>
        <TimeRangeSelector 
          timeRange={timeRange}
          setTimeRange={setTimeRange}
          isLoading={isLoading}
          onRefresh={fetchData}
        />
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {getStatCards().map((card, index) => (
          <StatCard 
            key={index}
            title={card.title}
            value={card.value}
            icon={card.icon}
            change={card.change}
            link={card.link}
            color={card.color}
            timeRange={timeRange}
          />
        ))}
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 mt-8">
        <LogoTypeChart 
          logoTypes={logoTypes} 
          isLoading={isLoading} 
        />
        
        <CreditPackageGrid 
          creditPackages={creditPackages}
          packageCounts={packageCounts}
          isLoading={isLoading}
        />
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-8">
        <RecentLogos 
          recentLogos={recentLogos} 
          isLoading={isLoading} 
          formatDate={formatDate} 
        />
        
        <RecentUsers 
          recentUsers={recentUsers}
          isLoading={isLoading}
        />
        
        <RecentTransactions 
          recentTransactions={recentTransactions}
          isLoading={isLoading}
        />
      </div>
    </>
  );
}
