"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarIcon, X } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export default function TransactionFilters({
  searchTerm,
  onSearchChange,
  dateRangeFilter,
  onDateRangeFilterChange,
  isLoading
}) {
  const resetDateFilter = () => {
    onDateRangeFilterChange({ from: "", to: "" });
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center flex-wrap">
      <Input
        placeholder="Search transactions..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="sm:max-w-[250px] flex-1"
      />
      
      <div className="flex flex-wrap gap-2 items-center">
        <div className="flex flex-col sm:flex-row gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-[130px] justify-start text-left font-normal",
                  !dateRangeFilter.from && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateRangeFilter.from ? (
                  format(new Date(dateRangeFilter.from), "LLL dd, yyyy")
                ) : (
                  <span>From date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={dateRangeFilter.from ? new Date(dateRangeFilter.from) : undefined}
                onSelect={(date) => onDateRangeFilterChange({
                  ...dateRangeFilter,
                  from: date ? format(date, "yyyy-MM-dd") : ""
                })}
                initialFocus
              />
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-[130px] justify-start text-left font-normal",
                  !dateRangeFilter.to && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateRangeFilter.to ? (
                  format(new Date(dateRangeFilter.to), "LLL dd, yyyy")
                ) : (
                  <span>To date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={dateRangeFilter.to ? new Date(dateRangeFilter.to) : undefined}
                onSelect={(date) => onDateRangeFilterChange({
                  ...dateRangeFilter,
                  to: date ? format(date, "yyyy-MM-dd") : ""
                })}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {(dateRangeFilter.from || dateRangeFilter.to) && (
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={resetDateFilter}
            className="h-9 w-9"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}