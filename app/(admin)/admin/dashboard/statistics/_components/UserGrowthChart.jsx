"use client";

import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { format, parseISO } from "date-fns";

export default function UserGrowthChart({ data, period, isLoading }) {
  // Format x-axis ticks based on the period
  const formatXAxis = (dateStr) => {
    if (!dateStr) return "";
    
    // Handle different date formats based on period
    if (dateStr.includes("-W")) {
      // Week format (YYYY-WW)
      const [year, week] = dateStr.split("-W");
      return `W${week}`;
    } else if (dateStr.match(/\d{4}-\d{2}-\d{1}$/)) {
      // Bi-weekly format (YYYY-MM-B)
      const parts = dateStr.split("-");
      return `${parts[1]}-${parts[2]}`;
    } else if (dateStr.match(/\d{4}-\d{2}$/)) {
      // Month format (YYYY-MM)
      const date = parseISO(`${dateStr}-01`);
      return format(date, "MMM");
    } else {
      // Default format (YYYY-MM-DD)
      const date = parseISO(dateStr);
      return format(date, period === "7days" ? "EEE" : "MM/dd");
    }
  };

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      // Format the date for the tooltip
      let formattedDate = label;
      
      if (label.match(/\d{4}-\d{2}-\d{2}$/)) {
        formattedDate = format(parseISO(label), 'PP');
      } else if (label.match(/\d{4}-\d{2}$/)) {
        formattedDate = format(parseISO(`${label}-01`), 'MMMM yyyy');
      } else if (label.includes("-W")) {
        const [year, week] = label.split("-W");
        formattedDate = `Week ${week}, ${year}`;
      } else if (label.match(/\d{4}-\d{2}-\d{1}$/)) {
        const parts = label.split("-");
        const isFirstHalf = parts[2] === "1";
        formattedDate = `${isFirstHalf ? "First" : "Second"} half of ${format(parseISO(`${parts[0]}-${parts[1]}-01`), 'MMMM yyyy')}`;
      }
      
      return (
        <div className="custom-tooltip bg-background p-3 border rounded-md shadow-md">
          <p className="label font-medium">{formattedDate}</p>
          <p className="value text-primary">
            Users: {payload[0].value}
          </p>
        </div>
      );
    }
    
    return null;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[300px]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
          <XAxis
            dataKey="date"
            tickFormatter={formatXAxis}
            tick={{ fontSize: 12 }}
            interval={period === "7days" ? 0 : "preserveStartEnd"}
          />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="users"
            stroke="#10b981"
            fill="#10b981"
            fillOpacity={0.2}
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}