import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Image as ImageIcon, Eye, Download, RefreshCw } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function RecentLogos({ recentLogos, isLoading, formatDate }) {
  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow duration-300">
      <CardHeader className="pb-2 border-b">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <ImageIcon className="h-5 w-5 text-primary" />
          <span>Recent Logos</span>
        </CardTitle>
        <CardDescription>Latest logos created by users</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        {isLoading ? (
          <div className="p-8 flex justify-center items-center">
            <RefreshCw className="h-8 w-8 animate-spin text-primary/60" />
          </div>
        ) : recentLogos.length > 0 ? (
          <div className="divide-y">
            {recentLogos.map((logo, index) => (
              <div key={index} className="p-4 hover:bg-muted/30 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="relative h-16 w-16 rounded-md overflow-hidden border bg-muted/20 flex-shrink-0">
                    {logo.previewUrl ? (
                      <Image
                        src={logo.previewUrl}
                        alt={logo.title || "Logo"}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 64px"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-muted">
                        <ImageIcon className="h-6 w-6 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium truncate text-sm" title={logo.title}>
                        {logo.title || "Untitled Logo"}
                      </h3>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 truncate" title={logo.desc}>
                      {logo.desc || "No description"}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-muted-foreground">
                        By {logo.userName}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {formatDate(logo.createdAt)}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end gap-2 mt-3">
                  {logo.previewUrl && (
                    <a 
                      href={logo.previewUrl}
                      download={logo.title && logo.title.length > 20 
                        ? logo.title.split(' ').slice(0, Math.min(3, logo.title.split(' ').length)).join('_') + '.png'
                        : `${logo.title}.png`}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
                    >
                      <Download className="h-3.5 w-3.5" />
                      <span>Download</span>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            <ImageIcon className="h-12 w-12 mx-auto mb-3 text-muted-foreground/50" />
            <p>No logos have been created yet</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
