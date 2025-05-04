"use client";

import React from "react";
import Image from "next/image";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Download,
  Trash,
  Clock,
  User,
  Type,
  FileText
} from "lucide-react";

export default function LogoDetailPanel({ logo, onClose, onDeleteLogo }) {
  // Function to download the logo
  const handleDownload = () => {
    if (!logo.previewUrl) return;
    
    const link = document.createElement('a');
    link.href = logo.previewUrl;
    
    // Limit title length for download filename
    let downloadName = logo.title || "logo";
    
    // If title is too long, use only the first 2-3 words
    if (logo.title && logo.title.length > 20) {
      const words = logo.title.split(' ');
      // Take first 2-3 words if available
      downloadName = words.slice(0, Math.min(3, words.length)).join('_');
    }
    
    link.download = downloadName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 py-4">
      <div className="flex flex-col items-center">
        <div className="relative w-full aspect-square max-w-[300px] bg-accent rounded-md overflow-hidden mb-4">
          {logo.previewUrl ? (
            <Image
              src={logo.previewUrl}
              alt={logo.title || "Logo image"}
              fill
              className="object-contain"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
              No Image Available
            </div>
          )}
        </div>
        <h3 className="text-xl font-semibold break-words max-w-[280px] text-center" title={logo.title}>
          {logo.title && logo.title.length > 50 ? `${logo.title.substring(0, 50)}...` : logo.title}
        </h3>
      </div>

      <Separator />

      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Type className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">Desc:</span>
          <span className="text-sm truncate max-w-[200px]" title={logo.logoType || "Unknown"}>
            {logo.logoType || "Unknown"}
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <User className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">Created By:</span>
          <span className="text-sm">{logo.userName || "Unknown User"}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">Created At:</span>
          <span className="text-sm">
            {logo.createdAt ? format(new Date(logo.createdAt), 'PPp') : 'Unknown'}
          </span>
        </div>
      </div>

      <Separator />

      <div className="flex flex-col sm:flex-row gap-2">
        <Button 
          variant="outline"
          className="flex-1 flex items-center gap-2"
          onClick={handleDownload}
        >
          <Download className="h-4 w-4" />
          Download
        </Button>
        <Button 
          variant="destructive"
          className="flex-1 flex items-center gap-2"
          onClick={onDeleteLogo}
        >
          <Trash className="h-4 w-4" />
          Delete
        </Button>
      </div>
    </div>
  );
}