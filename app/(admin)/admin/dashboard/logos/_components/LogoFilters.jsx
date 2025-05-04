"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

export default function LogoFilters({
  searchTerm,
  onSearchChange,
  selectedLogos = [],
  onDeleteSelected,
  isLoading
}) {

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
      <Input
        placeholder="Search logos..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="sm:max-w-[250px] flex-1"
      />

      {selectedLogos.length > 0 && (
        <Button 
          variant="destructive" 
          size="sm" 
          onClick={onDeleteSelected}
          disabled={isLoading}
          className="flex items-center gap-1 whitespace-nowrap"
        >
          <Trash className="h-4 w-4" />
          Delete {selectedLogos.length} Selected
        </Button>
      )}
    </div>
  );
}