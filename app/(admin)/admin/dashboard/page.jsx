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
  getCountFromServer,
} from "firebase/firestore";

// Import components
import StatCard from "./_components/StatCard";
import LogoTypeChart from "./_components/LogoTypeChart";
import CreditPackageGrid from "./_components/CreditPackageGrid";
import RecentLogos from "./_components/RecentLogos";
import RecentUsers from "./_components/RecentUsers";
import RecentTransactions from "./_components/RecentTransactions";

import {
  Users,
  CreditCard,
  Image as ImageIcon,
  DollarSign,
  RefreshCw,
} from "lucide-react";

import { useAdminData, CACHE_KEYS } from "../_context/AdminDataContext";
import { Button } from "@/components/ui/button";

export default function AdminDashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [recentLogos, setRecentLogos] = useState([]);
  const [recentUsers, setRecentUsers] = useState([]);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [statistics, setStatistics] = useState({
    revenue: 0,
    logosCreated: 0,
    newUsers: 0,
    creditsPurchased: 0,
  });
  const [logoTypes, setLogoTypes] = useState([]);
  const [packageCounts, setPackageCounts] = useState([]);
  
  const { cachedData, isCacheValid, updateCachedData } = useAdminData();

  const creditPackages = [
    {
      name: "Basic Package",
      credits: 5,
      price: "$1.99",
      image: "/buy-credits-logo-imgs/basic-package-logo.png",
    },
    {
      name: "Standard Package",
      credits: 20,
      price: "$6.99",
      image: "/buy-credits-logo-imgs/standard-package-logo.png",
    },
    {
      name: "Professional Package",
      credits: 50,
      price: "$15.99",
      image: "/buy-credits-logo-imgs/professional-package-logo.png",
    },
    {
      name: "Advanced Package",
      credits: 100,
      price: "$29.99",
      image: "/buy-credits-logo-imgs/advanced-package-logo.png",
    },
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      // Force refresh all data by not using cache
      const users = await fetchRecentUsers(true);
      const logos = await fetchRecentLogos(true);
      await fetchRecentTransactions(true);
      await fetchStatistics();
      await fetchPackageDistribution(true);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchRecentLogos = async (forceRefresh = false) => {
    // Sử dụng cache nếu có giá trị và không cần cập nhật
    if (!forceRefresh && isCacheValid(CACHE_KEYS.RECENT_LOGOS)) {
      const cachedLogos = cachedData[CACHE_KEYS.RECENT_LOGOS];
      setRecentLogos(cachedLogos.recentLogos);
      setLogoTypes(cachedLogos.logoTypes);
      return cachedLogos.allLogos;
    }

    try {
      const usersSnapshot = await getDocs(collection(db, "users"));
      const logos = [];

      for (const userDoc of usersSnapshot.docs) {
        const userEmail = userDoc.id;
        const userData = userDoc.data();

        try {
          const logosQuery = query(collection(db, "users", userEmail, "logos"));
          const logosSnapshot = await getDocs(logosQuery);

          logosSnapshot.forEach((doc) => {
            const logoData = doc.data();
            const timestampFromId = new Date(parseInt(doc.id));
            logos.push({
              id: doc.id,
              title: logoData.title || "Untitled Logo",
              previewUrl: logoData.image,
              createdAt: isNaN(timestampFromId)
                ? logoData.createdAt?.toDate?.()
                  ? logoData.createdAt.toDate().toISOString()
                  : new Date().toISOString()
                : timestampFromId.toISOString(),
              userName: userData.name || "Unknown User",
              userEmail: userEmail,
              logoType: logoData.title?.split(" ")[0] || "Custom Design",
              desc: logoData.desc || "",
            });
          });
        } catch (error) {
          console.error(`Error fetching logos for user ${userEmail}:`, error);
        }
      }

      logos.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      const recentLogosList = logos.slice(0, 4);
      setRecentLogos(recentLogosList);
      
      // Analyze logo types
      const logoTypesData = analyzeLogoTypes(logos);
      setLogoTypes(logoTypesData);
      
      // Cache the data
      updateCachedData(CACHE_KEYS.RECENT_LOGOS, {
        recentLogos: recentLogosList,
        logoTypes: logoTypesData,
        allLogos: logos
      });

      return logos;
    } catch (error) {
      console.error("Error fetching logos:", error);
      setRecentLogos([]);
      return [];
    }
  };

  const analyzeLogoTypes = (logos) => {
    const logoTypeCount = {};

    logos.forEach((logo) => {
      const logoType = logo.logoType || "Other";
      logoTypeCount[logoType] = (logoTypeCount[logoType] || 0) + 1;
    });

    const logoTypesArray = Object.entries(logoTypeCount)
      .map(([name, count]) => ({
        name,
        count,
      }))
      .sort((a, b) => b.count - a.count);

    return logoTypesArray;
  };

  const fetchRecentUsers = async (forceRefresh = false) => {
    // Check if we have valid cached data and don't need to refresh
    if (!forceRefresh && isCacheValid(CACHE_KEYS.RECENT_USERS)) {
      setRecentUsers(cachedData[CACHE_KEYS.RECENT_USERS]);
      return cachedData[CACHE_KEYS.RECENT_USERS];
    }
    
    const usersQuery = query(
      collection(db, "users"),
      orderBy("createdAt", "desc"),
      limit(4)
    );

    const usersSnapshot = await getDocs(usersQuery);
    const users = [];

    usersSnapshot.forEach((doc) => {
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
        totalLogos: userData.totalLogos || 0,
      });
    });

    setRecentUsers(users);
    
    // Cache the data
    updateCachedData(CACHE_KEYS.RECENT_USERS, users);
    
    return users;
  };

  const fetchRecentTransactions = async (forceRefresh = false) => {
    // Check if we have valid cached data and don't need to refresh
    if (!forceRefresh && isCacheValid(CACHE_KEYS.RECENT_TRANSACTIONS)) {
      setRecentTransactions(cachedData[CACHE_KEYS.RECENT_TRANSACTIONS]);
      return;
    }
  
    try {
      const transactions = [];
      const usersSnapshot = await getDocs(collection(db, "users"));

      for (const userDoc of usersSnapshot.docs) {
        const userEmail = userDoc.id;
        const userData = userDoc.data();

        try {
          const transactionsQuery = query(
            collection(db, "users", userEmail, "transactions"),
            orderBy("date", "desc"),
            limit(5)
          );

          const transactionsSnapshot = await getDocs(transactionsQuery);

          transactionsSnapshot.forEach((doc) => {
            const transactionData = doc.data();

            // Simply get the package image based on the package name
            let packageImage =
              "/buy-credits-logo-imgs/standard-package-logo.png"; // Default image

            // Match package name with the corresponding image
            if (transactionData.package === "Basic Package") {
              packageImage = "/buy-credits-logo-imgs/basic-package-logo.png";
            } else if (transactionData.package === "Standard Package") {
              packageImage = "/buy-credits-logo-imgs/standard-package-logo.png";
            } else if (transactionData.package === "Professional Package") {
              packageImage =
                "/buy-credits-logo-imgs/professional-package-logo.png";
            } else if (transactionData.package === "Advanced Package") {
              packageImage = "/buy-credits-logo-imgs/advanced-package-logo.png";
            }

            const price = transactionData.price || "0.00";
            const priceNumeric =
              typeof price === "string"
                ? parseFloat(price.replace(/[^0-9.]/g, ""))
                : typeof price === "number"
                ? price
                : 0;

            // Use document ID as timestamp if needed
            const timestampFromId = new Date(parseInt(doc.id));

            transactions.push({
              id: doc.id,
              user: userData.name || "Unknown User",
              userEmail: userEmail,
              amount: priceNumeric,
              credits: transactionData.credits || 0,
              package: transactionData.package || "Standard Package",
              packageImage: packageImage,
              date: transactionData.date?.toDate?.()
                ? transactionData.date.toDate().toISOString()
                : isNaN(timestampFromId)
                ? new Date().toISOString()
                : timestampFromId.toISOString(),
              status: transactionData.status || "completed",
            });
          });
        } catch (error) {
          console.error(
            `Error fetching transactions for user ${userEmail}:`,
            error
          );
        }
      }

      // Sort all transactions by date (newest first)
      transactions.sort((a, b) => new Date(b.date) - new Date(a.date));
      const recentTransactionsList = transactions.slice(0, 4);
      setRecentTransactions(recentTransactionsList);
      
      // Cache the data
      updateCachedData(CACHE_KEYS.RECENT_TRANSACTIONS, recentTransactionsList);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      setRecentTransactions([]);
    }
  };

  const fetchStatistics = async () => {
    try {
      // Lấy tổng số lượng thay vì phụ thuộc vào khoảng thời gian
      const totalStats = await getTotalStats();
      
      const newStats = {
        revenue: totalStats.revenue,
        logosCreated: totalStats.logosCreated,
        newUsers: totalStats.newUsers,
        creditsPurchased: totalStats.creditsPurchased,
      };
      
      setStatistics(newStats);
      
      // Cache the data
      updateCachedData(CACHE_KEYS.STATISTICS, newStats);
    } catch (error) {
      console.error("Error fetching statistics:", error);
    }
  };

  const getTotalStats = async () => {
    let revenue = 0;
    let logosCreated = 0;
    let newUsers = 0;
    let creditsPurchased = 0;

    try {
      // Lấy tổng số người dùng
      const usersSnapshot = await getCountFromServer(collection(db, "users"));
      newUsers = usersSnapshot.data().count;
      
      // Lấy dữ liệu từ subcollection "transactions" của từng user
      const allUsersSnapshot = await getDocs(collection(db, "users"));
      
      // Tính tổng doanh thu và credits đã bán từ transactions của mỗi user
      for (const userDoc of allUsersSnapshot.docs) {
        const userEmail = userDoc.id;
        
        // Đếm số logo đã tạo cho user này
        try {
          const logosSnapshot = await getCountFromServer(collection(db, "users", userEmail, "logos"));
          logosCreated += logosSnapshot.data().count;
        } catch (error) {
          console.error(`Error counting logos for user ${userEmail}:`, error);
        }
        
        // Tính tổng doanh thu và credits từ các transactions của user này
        try {
          const transactionsSnapshot = await getDocs(collection(db, "users", userEmail, "transactions"));
          
          transactionsSnapshot.forEach((doc) => {
            const transactionData = doc.data();
            
            // Tính doanh thu
            const price = transactionData.price || 0;
            const priceNumeric =
              typeof price === "string"
                ? parseFloat(price.replace(/[^0-9.]/g, ""))
                : typeof price === "number"
                ? price
                : 0;
                
            revenue += priceNumeric;
            
            // Tính tổng credits
            creditsPurchased += transactionData.credits || 0;
          });
        } catch (error) {
          console.error(`Error fetching transactions for user ${userEmail}:`, error);
        }
      }

      return { revenue, logosCreated, newUsers, creditsPurchased };
    } catch (error) {
      console.error("Error getting total stats:", error);
      return { revenue: 0, logosCreated: 0, newUsers: 0, creditsPurchased: 0 };
    }
  };

  const fetchPackageDistribution = async (forceRefresh = false) => {
    // Check if we have valid cached data and don't need to refresh
    if (!forceRefresh && isCacheValid(CACHE_KEYS.PACKAGE_COUNTS)) {
      setPackageCounts(cachedData[CACHE_KEYS.PACKAGE_COUNTS]);
      return;
    }
  
    const packageCount = {};

    const transactionsQuery = query(collection(db, "transactions"), limit(100));

    const transactionsSnapshot = await getDocs(transactionsQuery);

    transactionsSnapshot.forEach((doc) => {
      const transactionData = doc.data();
      let packageName = transactionData.packageName;

      if (!packageName) {
        const matchingPackage = creditPackages.find(
          (pkg) => pkg.credits === transactionData.credits
        );
        packageName = matchingPackage ? matchingPackage.name : "Other";
      }

      packageCount[packageName] = (packageCount[packageName] || 0) + 1;
    });

    const packageCountArray = Object.entries(packageCount)
      .map(([name, count]) => ({
        name,
        count,
      }))
      .sort((a, b) => b.count - a.count);

    setPackageCounts(packageCountArray);
    
    // Cache the package data
    updateCachedData(CACHE_KEYS.PACKAGE_COUNTS, packageCountArray);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatCards = () => {
    return [
      {
        title: "Total Revenue",
        value: `$${statistics.revenue.toLocaleString("en-US", {
          maximumFractionDigits: 2,
        })}`,
        icon: DollarSign,
        link: "/admin/dashboard/statistics",
        color: "from-blue-500 to-indigo-500",
      },
      {
        title: "Logos Created",
        value: statistics.logosCreated,
        icon: ImageIcon,
        link: "/admin/dashboard/logos",
        color: "from-pink-500 to-rose-500",
      },
      {
        title: "Total Users",
        value: statistics.newUsers,
        icon: Users,
        link: "/admin/dashboard/users",
        color: "from-green-500 to-emerald-500",
      },
      {
        title: "Credits Sold",
        value: statistics.creditsPurchased.toLocaleString("en-US"),
        icon: CreditCard,
        link: "/admin/dashboard/credits/packages",
        color: "from-orange-500 to-amber-500",
      },
    ];
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          Dashboard Overview
        </h1>
        <Button
          onClick={fetchData}
          disabled={isLoading}
          className="flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {getStatCards().map((card, index) => (
          <StatCard
            key={index}
            title={card.title}
            value={card.value}
            icon={card.icon}
            link={card.link}
            color={card.color}
          />
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 mt-8">
        <LogoTypeChart logoTypes={logoTypes} isLoading={isLoading} />

        <CreditPackageGrid
          creditPackages={creditPackages}
          packageCounts={packageCounts}
          isLoading={isLoading}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
        <RecentLogos
          recentLogos={recentLogos}
          isLoading={isLoading}
          formatDate={formatDate}
        />

        <RecentUsers recentUsers={recentUsers} isLoading={isLoading} />

        <RecentTransactions
          recentTransactions={recentTransactions}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
