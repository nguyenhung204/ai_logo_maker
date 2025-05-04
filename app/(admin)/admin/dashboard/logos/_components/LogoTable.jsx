"use client";

import React from "react";
import { format } from "date-fns";
import { TableCell, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import LogoActions from "./LogoActions";

export default function LogoTable({
  logos,
  isLoading,
  onView,
  onDelete,
  selectedLogos = [],
  onToggleSelect
}) {
  if (isLoading) {
    return (
      <TableRow>
        <TableCell colSpan={7} className="text-center py-10 text-muted-foreground">
          Loading logos...
        </TableCell>
      </TableRow>
    );
  }

  if (logos.length === 0) {
    return (
      <TableRow>
        <TableCell colSpan={7} className="text-center py-10 text-muted-foreground">
          No logos found matching your criteria.
        </TableCell>
      </TableRow>
    );
  }

  return (
    <>
      {logos.map((logo) => {
        const compositeId = `${logo.userEmail}_${logo.id}`;
        return (
          <TableRow key={compositeId} className={selectedLogos.includes(compositeId) ? "bg-muted/50" : ""}>
            <TableCell className="w-[40px] pr-0">
              <Checkbox 
                checked={selectedLogos.includes(compositeId)}
                onCheckedChange={() => onToggleSelect && onToggleSelect(logo.userEmail, logo.id)}
              />
            </TableCell>
            <TableCell>
              <div className="relative w-[60px] h-[60px] bg-accent rounded-md overflow-hidden">
                {logo.previewUrl && (
                  <Image
                    src={logo.previewUrl}
                    alt={logo.title || "Logo image"}
                    fill
                    className="object-cover"
                  />
                )}
              </div>
            </TableCell>
            <TableCell className="font-medium max-w-[200px]">
              <div className="truncate" title={logo.title}>{logo.title}</div>
            </TableCell>
            <TableCell className="max-w-[180px]">
              <div className="truncate" title={logo.logoType || "Unknown"}>{logo.logoType || "Unknown"}</div>
            </TableCell>
            <TableCell>
              <div>
                <div className="font-medium truncate max-w-[150px]" title={logo.userName || "Unknown"}>
                  {logo.userName || "Unknown"}
                </div>
                <div className="text-sm text-muted-foreground truncate max-w-[150px]" title={logo.userEmail}>
                  {logo.userEmail}
                </div>
              </div>
            </TableCell>
            <TableCell>
              {logo.createdAt && format(new Date(logo.createdAt), 'PP')}
            </TableCell>
            <TableCell className="text-right">
              <LogoActions
                logo={logo}
                onView={() => onView(logo)}
                onDelete={() => onDelete(logo.userEmail, logo.id)}
              />
            </TableCell>
          </TableRow>
        );
      })}
    </>
  );
}