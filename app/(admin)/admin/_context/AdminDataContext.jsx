"use client";

import { createContext, useContext, useState, useCallback } from 'react';

const AdminDataContext = createContext({
  cachedData: {},
  setCachedData: () => {},
  isCacheValid: () => false,
  invalidateCache: () => {},
  updateCachedData: () => {},
});

export const CACHE_KEYS = {
  RECENT_LOGOS: 'recentLogos',
  RECENT_USERS: 'recentUsers',
  RECENT_TRANSACTIONS: 'recentTransactions',
  STATISTICS: 'statistics',
  LOGO_TYPES: 'logoTypes',
  PACKAGE_COUNTS: 'packageCounts',
};

const CACHE_EXPIRATION_TIME = 5 * 60 * 1000; // 5 minutes

export function AdminDataProvider({ children }) {
  const [cachedData, setCachedData] = useState({});
  const [cacheTimestamps, setCacheTimestamps] = useState({});

  const isCacheValid = useCallback((key, timeRangeParam = null) => {
    if (!cachedData[key] || !cacheTimestamps[key]) return false;

    // For data dependent on timeRange, we need to check if the cached data matches the current timeRange
    if (timeRangeParam && cachedData[key].timeRange !== timeRangeParam) {
      return false;
    }

    const now = Date.now();
    return now - cacheTimestamps[key] < CACHE_EXPIRATION_TIME;
  }, [cachedData, cacheTimestamps]);

  const updateCachedData = useCallback((key, data, timeRangeParam = null) => {
    setCachedData(prev => ({
      ...prev,
      [key]: timeRangeParam ? { ...data, timeRange: timeRangeParam } : data
    }));
    
    setCacheTimestamps(prev => ({
      ...prev,
      [key]: Date.now()
    }));
  }, []);

  const invalidateCache = useCallback((key = null) => {
    if (key) {
      setCachedData(prev => {
        const newCache = { ...prev };
        delete newCache[key];
        return newCache;
      });
      setCacheTimestamps(prev => {
        const newTimestamps = { ...prev };
        delete newTimestamps[key];
        return newTimestamps;
      });
    } else {
      // Invalidate all cache
      setCachedData({});
      setCacheTimestamps({});
    }
  }, []);

  return (
    <AdminDataContext.Provider value={{
      cachedData,
      setCachedData,
      isCacheValid,
      invalidateCache,
      updateCachedData
    }}>
      {children}
    </AdminDataContext.Provider>
  );
}

export function useAdminData() {
  return useContext(AdminDataContext);
}