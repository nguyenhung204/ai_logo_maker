"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  BarChart,
  LineChart,
  PieChart,
  DollarSign,
  Users,
  Image,
  TrendingUp,
  Calendar,
  CreditCard,
  BarChart2,
  ChevronUp,
  ChevronDown,
  PieChart as PieChartIcon,
  RefreshCw,
} from "lucide-react";

// For chart illustration, we'd typically use a library like Recharts, Chart.js or ApexCharts
// For this example, we'll create simple visual components to represent charts

// Mock data for revenue
const mockRevenueData = {
  daily: [
    { date: "2025-04-22", amount: 150 },
    { date: "2025-04-23", amount: 220 },
    { date: "2025-04-24", amount: 180 },
    { date: "2025-04-25", amount: 320 },
    { date: "2025-04-26", amount: 210 },
    { date: "2025-04-27", amount: 190 },
    { date: "2025-04-28", amount: 280 },
  ],
  weekly: [
    { date: "Week 12", amount: 1250 },
    { date: "Week 13", amount: 1420 },
    { date: "Week 14", amount: 980 },
    { date: "Week 15", amount: 1120 },
    { date: "Week 16", amount: 1350 },
    { date: "Week 17", amount: 1540 },
  ],
  monthly: [
    { date: "Nov 2024", amount: 4500 },
    { date: "Dec 2024", amount: 5200 },
    { date: "Jan 2025", amount: 4800 },
    { date: "Feb 2025", amount: 5100 },
    { date: "Mar 2025", amount: 5700 },
    { date: "Apr 2025", amount: 6200 },
  ],
  yearly: [
    { date: "2020", amount: 35000 },
    { date: "2021", amount: 42000 },
    { date: "2022", amount: 48000 },
    { date: "2023", amount: 52000 },
    { date: "2024", amount: 65000 },
    { date: "2025", amount: 22000 }, // Partial year
  ],
};

// Mock data for logos created
const mockLogosData = {
  daily: [
    { date: "2025-04-22", count: 45 },
    { date: "2025-04-23", count: 52 },
    { date: "2025-04-24", count: 38 },
    { date: "2025-04-25", count: 64 },
    { date: "2025-04-26", count: 47 },
    { date: "2025-04-27", count: 42 },
    { date: "2025-04-28", count: 56 },
  ],
  weekly: [
    { date: "Week 12", count: 310 },
    { date: "Week 13", count: 345 },
    { date: "Week 14", count: 280 },
    { date: "Week 15", count: 325 },
    { date: "Week 16", count: 360 },
    { date: "Week 17", count: 415 },
  ],
  monthly: [
    { date: "Nov 2024", count: 1250 },
    { date: "Dec 2024", count: 1420 },
    { date: "Jan 2025", count: 1180 },
    { date: "Feb 2025", count: 1320 },
    { date: "Mar 2025", count: 1450 },
    { date: "Apr 2025", count: 1580 },
  ],
  yearly: [
    { date: "2020", count: 8500 },
    { date: "2021", count: 12400 },
    { date: "2022", count: 15600 },
    { date: "2023", count: 18200 },
    { date: "2024", count: 22500 },
    { date: "2025", count: 6400 }, // Partial year
  ],
};

// Mock data for user growth
const mockUserData = {
  daily: [
    { date: "2025-04-22", count: 12 },
    { date: "2025-04-23", count: 18 },
    { date: "2025-04-24", count: 15 },
    { date: "2025-04-25", count: 22 },
    { date: "2025-04-26", count: 14 },
    { date: "2025-04-27", count: 10 },
    { date: "2025-04-28", count: 16 },
  ],
  weekly: [
    { date: "Week 12", count: 85 },
    { date: "Week 13", count: 96 },
    { date: "Week 14", count: 78 },
    { date: "Week 15", count: 92 },
    { date: "Week 16", count: 104 },
    { date: "Week 17", count: 115 },
  ],
  monthly: [
    { date: "Nov 2024", count: 350 },
    { date: "Dec 2024", count: 420 },
    { date: "Jan 2025", count: 380 },
    { date: "Feb 2025", count: 410 },
    { date: "Mar 2025", count: 450 },
    { date: "Apr 2025", count: 480 },
  ],
  yearly: [
    { date: "2020", count: 2200 },
    { date: "2021", count: 3500 },
    { date: "2022", count: 4800 },
    { date: "2023", count: 6200 },
    { date: "2024", count: 7800 },
    { date: "2025", count: 2400 }, // Partial year
  ],
};

// Mock data for credits usage
const mockCreditsData = {
  daily: [
    { date: "2025-04-22", used: 220, purchased: 300 },
    { date: "2025-04-23", used: 280, purchased: 250 },
    { date: "2025-04-24", used: 190, purchased: 350 },
    { date: "2025-04-25", used: 320, purchased: 400 },
    { date: "2025-04-26", used: 240, purchased: 200 },
    { date: "2025-04-27", used: 210, purchased: 180 },
    { date: "2025-04-28", used: 270, purchased: 320 },
  ],
  weekly: [
    { date: "Week 12", used: 1550, purchased: 1800 },
    { date: "Week 13", used: 1720, purchased: 1650 },
    { date: "Week 14", used: 1400, purchased: 1850 },
    { date: "Week 15", used: 1620, purchased: 1700 },
    { date: "Week 16", used: 1820, purchased: 2000 },
    { date: "Week 17", used: 1950, purchased: 2100 },
  ],
  monthly: [
    { date: "Nov 2024", used: 6200, purchased: 7100 },
    { date: "Dec 2024", used: 7100, purchased: 7500 },
    { date: "Jan 2025", used: 5900, purchased: 6600 },
    { date: "Feb 2025", used: 6500, purchased: 7000 },
    { date: "Mar 2025", used: 7200, purchased: 7800 },
    { date: "Apr 2025", used: 7800, purchased: 8500 },
  ],
  yearly: [
    { date: "2020", used: 42000, purchased: 48000 },
    { date: "2021", used: 62000, purchased: 68000 },
    { date: "2022", used: 78000, purchased: 85000 },
    { date: "2023", used: 91000, purchased: 98000 },
    { date: "2024", used: 112000, purchased: 120000 },
    { date: "2025", used: 32000, purchased: 36000 }, // Partial year
  ],
};

// Mock data for conversion rates
const mockConversionData = {
  registrationToFirstLogo: 68, // 68% of registered users create at least one logo
  firstLogoToFirstPurchase: 42, // 42% of users who create a logo make a purchase
  returningCustomers: 58, // 58% of customers make more than one purchase
  averagePurchaseValue: 24.99, // Average purchase value in dollars
  logoCompletionRate: 87, // 87% of started logo creation processes are completed
};

// Simple mock component to display a bar chart
function SimpleBarChart({ data, dataKey = "amount", yAxisLabel }) {
  const maxValue = Math.max(...data.map(item => item[dataKey]));
  
  return (
    <div className="pt-4">
      <div className="flex justify-between items-center mb-2">
        <div className="text-sm text-muted-foreground">{yAxisLabel}</div>
        <div className="text-sm text-muted-foreground">{maxValue}</div>
      </div>
      <div className="flex items-end h-[200px] gap-2">
        {data.map((item, index) => (
          <div key={index} className="flex flex-col items-center flex-1">
            <div 
              className="w-full bg-primary/80 rounded-t" 
              style={{ 
                height: `${(item[dataKey] / maxValue) * 100}%`,
                minHeight: '4px'
              }}
            />
            <div className="text-xs text-muted-foreground mt-2 whitespace-nowrap overflow-hidden text-ellipsis w-full text-center">
              {item.date}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Simple mock component to display a line chart
function SimpleLineChart({ data, dataKey = "amount", yAxisLabel }) {
  const maxValue = Math.max(...data.map(item => item[dataKey]));
  
  return (
    <div className="pt-4">
      <div className="flex justify-between items-center mb-2">
        <div className="text-sm text-muted-foreground">{yAxisLabel}</div>
        <div className="text-sm text-muted-foreground">{maxValue}</div>
      </div>
      <div className="relative h-[200px] mt-2">
        <svg width="100%" height="100%" className="overflow-visible">
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
              <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
            </linearGradient>
          </defs>
          
          {/* Draw line */}
          <polyline
            points={data.map((item, index) => 
              `${(index / (data.length - 1)) * 100}%,${100 - ((item[dataKey] / maxValue) * 100)}%`
            ).join(' ')}
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {/* Fill area under line */}
          <polygon
            points={`
              0,100% 
              ${data.map((item, index) => 
                `${(index / (data.length - 1)) * 100}%,${100 - ((item[dataKey] / maxValue) * 100)}%`
              ).join(' ')} 
              100%,100%
            `}
            fill="url(#gradient)"
          />
          
          {/* Data points */}
          {data.map((item, index) => (
            <circle
              key={index}
              cx={`${(index / (data.length - 1)) * 100}%`}
              cy={`${100 - ((item[dataKey] / maxValue) * 100)}%`}
              r="4"
              fill="hsl(var(--primary))"
            />
          ))}
        </svg>
        
        {/* X-axis labels */}
        <div className="flex justify-between mt-4">
          {data.map((item, index) => (
            <div key={index} className="text-xs text-muted-foreground">
              {item.date}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Simple mock component to display multiple line chart
function MultiLineChart({ data, keys, yAxisLabel }) {
  const allValues = data.flatMap(item => keys.map(key => item[key]));
  const maxValue = Math.max(...allValues);
  const colors = ['hsl(var(--primary))', 'hsl(var(--destructive))'];
  
  return (
    <div className="pt-4">
      <div className="flex justify-between items-center mb-2">
        <div className="text-sm text-muted-foreground">{yAxisLabel}</div>
        <div className="text-sm text-muted-foreground">{maxValue}</div>
      </div>
      <div className="relative h-[200px] mt-2">
        <svg width="100%" height="100%" className="overflow-visible">
          {keys.map((key, keyIndex) => (
            <polyline
              key={key}
              points={data.map((item, index) => 
                `${(index / (data.length - 1)) * 100}%,${100 - ((item[key] / maxValue) * 100)}%`
              ).join(' ')}
              fill="none"
              stroke={colors[keyIndex % colors.length]}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ))}
          
          {/* Data points */}
          {keys.map((key, keyIndex) => (
            data.map((item, index) => (
              <circle
                key={`${key}-${index}`}
                cx={`${(index / (data.length - 1)) * 100}%`}
                cy={`${100 - ((item[key] / maxValue) * 100)}%`}
                r="3"
                fill={colors[keyIndex % colors.length]}
              />
            ))
          ))}
        </svg>
        
        {/* X-axis labels */}
        <div className="flex justify-between mt-4">
          {data.map((item, index) => (
            <div key={index} className="text-xs text-muted-foreground">
              {item.date}
            </div>
          ))}
        </div>
      </div>
      <div className="flex gap-4 mt-4 justify-center">
        {keys.map((key, index) => (
          <div key={key} className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: colors[index % colors.length] }} 
            />
            <span className="text-sm capitalize">{key}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Simple mock component to display a pie chart
function SimplePieChart({ data }) {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  let cumulativePercent = 0;
  
  return (
    <div className="flex justify-center pt-4">
      <div className="relative w-48 h-48">
        <svg width="100%" height="100%" viewBox="0 0 100 100">
          {data.map((item, index) => {
            const percent = (item.value / total) * 100;
            const startAngle = (cumulativePercent / 100) * 360;
            const endAngle = ((cumulativePercent + percent) / 100) * 360;
            
            // Calculate x,y coordinates on the circle
            const startX = 50 + 50 * Math.cos((startAngle - 90) * (Math.PI / 180));
            const startY = 50 + 50 * Math.sin((startAngle - 90) * (Math.PI / 180));
            const endX = 50 + 50 * Math.cos((endAngle - 90) * (Math.PI / 180));
            const endY = 50 + 50 * Math.sin((endAngle - 90) * (Math.PI / 180));
            
            // Create the path for the slice
            const largeArcFlag = percent > 50 ? 1 : 0;
            const pathData = [
              `M 50 50`,
              `L ${startX} ${startY}`,
              `A 50 50 0 ${largeArcFlag} 1 ${endX} ${endY}`,
              'Z'
            ].join(' ');
            
            // Update cumulative percent for next slice
            cumulativePercent += percent;
            
            return (
              <path 
                key={index} 
                d={pathData} 
                fill={item.color} 
                stroke="hsl(var(--background))" 
                strokeWidth="1"
              />
            );
          })}
        </svg>
      </div>
      <div className="flex flex-col justify-center gap-2 ml-4">
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
            <span className="text-sm">
              {item.name} - {Math.round((item.value / total) * 100)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function StatisticsPage() {
  const [timeRange, setTimeRange] = useState("daily");
  const [revenueTab, setRevenueTab] = useState("revenue");
  const [isLoading, setIsLoading] = useState(true);

  // Fetch data from backend (mocked with setTimeout)
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 600);
  }, []);

  // Get relevant data based on selected time range
  const getDataByTimeRange = (dataSet) => {
    return dataSet[timeRange] || [];
  };

  // Generate overview metrics
  const getOverviewMetrics = () => {
    const currentRevenue = mockRevenueData[timeRange].slice(-1)[0]?.amount || 0;
    const previousRevenue = mockRevenueData[timeRange].slice(-2, -1)[0]?.amount || 0;
    const revenueChange = previousRevenue ? ((currentRevenue - previousRevenue) / previousRevenue) * 100 : 0;
    
    const currentLogos = mockLogosData[timeRange].slice(-1)[0]?.count || 0;
    const previousLogos = mockLogosData[timeRange].slice(-2, -1)[0]?.count || 0;
    const logosChange = previousLogos ? ((currentLogos - previousLogos) / previousLogos) * 100 : 0;
    
    const currentUsers = mockUserData[timeRange].slice(-1)[0]?.count || 0;
    const previousUsers = mockUserData[timeRange].slice(-2, -1)[0]?.count || 0;
    const usersChange = previousUsers ? ((currentUsers - previousUsers) / previousUsers) * 100 : 0;
    
    const currentCredits = mockCreditsData[timeRange].slice(-1)[0]?.purchased || 0;
    const previousCredits = mockCreditsData[timeRange].slice(-2, -1)[0]?.purchased || 0;
    const creditsChange = previousCredits ? ((currentCredits - previousCredits) / previousCredits) * 100 : 0;
    
    return [
      {
        title: "Revenue",
        value: `$${currentRevenue}`,
        icon: DollarSign,
        change: revenueChange,
      },
      {
        title: "Logos Created",
        value: currentLogos,
        icon: Image,
        change: logosChange,
      },
      {
        title: "New Users",
        value: currentUsers,
        icon: Users,
        change: usersChange,
      },
      {
        title: "Credits Purchased",
        value: currentCredits,
        icon: CreditCard,
        change: creditsChange,
      },
    ];
  };

  // Get mock package distribution data for the pie chart
  const getPackageDistribution = () => [
    { name: "Basic", value: 35, color: "#818CF8" },
    { name: "Standard", value: 40, color: "#60A5FA" },
    { name: "Professional", value: 15, color: "#34D399" },
    { name: "Advanced", value: 10, color: "#A78BFA" },
  ];

  // Get mock logo types distribution data for the pie chart
  const getLogoTypesDistribution = () => [
    { name: "Abstract", value: 30, color: "#F472B6" },
    { name: "Typography", value: 25, color: "#38BDF8" },
    { name: "Illustrated", value: 20, color: "#4ADE80" },
    { name: "Minimalist", value: 15, color: "#FB923C" },
    { name: "Vintage", value: 5, color: "#A78BFA" },
    { name: "Playful", value: 3, color: "#FACC15" },
    { name: "Professional", value: 2, color: "#94A3B8" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold tracking-tight">Analytics & Reporting</h1>
        <div className="flex items-center gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {isLoading ? (
          Array(4).fill(0).map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="h-20 flex items-center justify-center">
                  <div className="animate-pulse bg-muted h-12 w-full rounded" />
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          getOverviewMetrics().map((metric, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <metric.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{metric.title}</p>
                    <h3 className="text-2xl font-bold">{metric.value}</h3>
                    <div className="flex items-center mt-1">
                      {metric.change > 0 ? (
                        <ChevronUp className="h-4 w-4 text-green-500" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-red-500" />
                      )}
                      <span 
                        className={`text-xs font-medium ${
                          metric.change > 0 ? "text-green-500" : "text-red-500"
                        }`}
                      >
                        {Math.abs(metric.change).toFixed(1)}%
                      </span>
                      <span className="text-xs text-muted-foreground ml-1">
                        vs previous {timeRange.slice(0, -2)}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Main Tabs for Analytics Sections */}
      <Tabs defaultValue="revenue" className="space-y-4">
        <TabsList>
          <TabsTrigger value="revenue">
            <DollarSign className="h-4 w-4 mr-2" />
            Revenue
          </TabsTrigger>
          <TabsTrigger value="usage">
            <BarChart className="h-4 w-4 mr-2" />
            Usage
          </TabsTrigger>
          <TabsTrigger value="users">
            <Users className="h-4 w-4 mr-2" />
            Users
          </TabsTrigger>
          <TabsTrigger value="conversion">
            <TrendingUp className="h-4 w-4 mr-2" />
            Conversion
          </TabsTrigger>
        </TabsList>

        {/* Revenue Tab Content */}
        <TabsContent value="revenue" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader className="pb-0">
                <CardTitle className="text-base font-medium">Revenue Over Time</CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="h-[240px] flex items-center justify-center">
                    <div className="animate-pulse bg-muted h-[200px] w-full rounded" />
                  </div>
                ) : (
                  <SimpleBarChart 
                    data={getDataByTimeRange(mockRevenueData)} 
                    dataKey="amount"
                    yAxisLabel="Revenue ($)"
                  />
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-0">
                <CardTitle className="text-base font-medium">Revenue by Package</CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="h-[240px] flex items-center justify-center">
                    <div className="animate-pulse bg-muted h-[200px] w-full rounded" />
                  </div>
                ) : (
                  <SimplePieChart data={getPackageDistribution()} />
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Usage Tab Content */}
        <TabsContent value="usage" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader className="pb-0">
                <CardTitle className="text-base font-medium">Logos Created</CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="h-[240px] flex items-center justify-center">
                    <div className="animate-pulse bg-muted h-[200px] w-full rounded" />
                  </div>
                ) : (
                  <SimpleLineChart 
                    data={getDataByTimeRange(mockLogosData)} 
                    dataKey="count"
                    yAxisLabel="Logos"
                  />
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-0">
                <CardTitle className="text-base font-medium">Credits Usage</CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="h-[240px] flex items-center justify-center">
                    <div className="animate-pulse bg-muted h-[200px] w-full rounded" />
                  </div>
                ) : (
                  <MultiLineChart 
                    data={getDataByTimeRange(mockCreditsData)} 
                    keys={["used", "purchased"]}
                    yAxisLabel="Credits"
                  />
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-0">
                <CardTitle className="text-base font-medium">Logo Types Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="h-[240px] flex items-center justify-center">
                    <div className="animate-pulse bg-muted h-[200px] w-full rounded" />
                  </div>
                ) : (
                  <SimplePieChart data={getLogoTypesDistribution()} />
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Users Tab Content */}
        <TabsContent value="users" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader className="pb-0">
                <CardTitle className="text-base font-medium">New User Registrations</CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="h-[240px] flex items-center justify-center">
                    <div className="animate-pulse bg-muted h-[200px] w-full rounded" />
                  </div>
                ) : (
                  <SimpleBarChart 
                    data={getDataByTimeRange(mockUserData)} 
                    dataKey="count"
                    yAxisLabel="Users"
                  />
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-0">
                <CardTitle className="text-base font-medium">User Activity</CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="h-[240px] flex items-center justify-center">
                    <div className="animate-pulse bg-muted h-[200px] w-full rounded" />
                  </div>
                ) : (
                  <div className="h-[240px] flex flex-col justify-center">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2 p-4 bg-muted/30 rounded-lg">
                        <p className="text-sm font-medium text-muted-foreground">Active Users</p>
                        <p className="text-3xl font-bold">2,841</p>
                        <div className="flex items-center text-xs">
                          <ChevronUp className="h-3 w-3 text-green-500 mr-1" />
                          <span className="text-green-500">+12.5%</span>
                          <span className="text-muted-foreground ml-1">this {timeRange.slice(0, -2)}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2 p-4 bg-muted/30 rounded-lg">
                        <p className="text-sm font-medium text-muted-foreground">Avg. Session</p>
                        <p className="text-3xl font-bold">8m 42s</p>
                        <div className="flex items-center text-xs">
                          <ChevronUp className="h-3 w-3 text-green-500 mr-1" />
                          <span className="text-green-500">+3.2%</span>
                          <span className="text-muted-foreground ml-1">this {timeRange.slice(0, -2)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Conversion Tab Content */}
        <TabsContent value="conversion" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Registration to First Logo</p>
                  <div className="flex items-baseline gap-2">
                    <p className="text-3xl font-bold">{mockConversionData.registrationToFirstLogo}%</p>
                    <p className="text-sm text-muted-foreground">conversion rate</p>
                  </div>
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full" 
                      style={{ width: `${mockConversionData.registrationToFirstLogo}%` }} 
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">First Logo to First Purchase</p>
                  <div className="flex items-baseline gap-2">
                    <p className="text-3xl font-bold">{mockConversionData.firstLogoToFirstPurchase}%</p>
                    <p className="text-sm text-muted-foreground">conversion rate</p>
                  </div>
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full" 
                      style={{ width: `${mockConversionData.firstLogoToFirstPurchase}%` }} 
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Returning Customers</p>
                  <div className="flex items-baseline gap-2">
                    <p className="text-3xl font-bold">{mockConversionData.returningCustomers}%</p>
                    <p className="text-sm text-muted-foreground">repeat rate</p>
                  </div>
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full" 
                      style={{ width: `${mockConversionData.returningCustomers}%` }} 
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Average Purchase Value</p>
                  <div className="flex items-baseline gap-2">
                    <p className="text-3xl font-bold">${mockConversionData.averagePurchaseValue}</p>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <span className="inline-flex items-center text-green-500">
                      <ChevronUp className="h-3 w-3 mr-1" />
                      8.3%
                    </span>
                    <span className="ml-1">from last {timeRange}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Logo Completion Rate</p>
                  <div className="flex items-baseline gap-2">
                    <p className="text-3xl font-bold">{mockConversionData.logoCompletionRate}%</p>
                    <p className="text-sm text-muted-foreground">completion rate</p>
                  </div>
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full" 
                      style={{ width: `${mockConversionData.logoCompletionRate}%` }} 
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}