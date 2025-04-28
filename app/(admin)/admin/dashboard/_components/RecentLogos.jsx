import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Clock, RefreshCw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function RecentLogos({ recentLogos, isLoading, formatDate = (date) => date }) {
  return (
    <Card className="md:col-span-1 overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium">Recent Logos</CardTitle>
          <Link href="/admin/dashboard/logos" className="text-xs text-primary hover:underline">
            View all
          </Link>
        </div>
        <CardDescription>Latest logos created by users</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        {isLoading ? (
          <div className="p-6 text-center">
            <RefreshCw className="h-6 w-6 animate-spin mx-auto text-muted-foreground" />
            <p className="text-sm text-muted-foreground mt-2">Loading logos...</p>
          </div>
        ) : recentLogos.length > 0 ? (
          <div className="divide-y">
            {recentLogos.map((logo) => (
              <div key={logo.id} className="flex items-center gap-4 p-4">
                <div className="h-12 w-12 rounded bg-muted/20 flex items-center justify-center overflow-hidden">
                  <img
                    src={logo.previewUrl}
                    alt={logo.title}
                    className="object-contain w-full h-full"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{logo.title}</p>
                  <div className="flex items-center text-sm text-muted-foreground gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{formatDate(logo.createdAt)}</span>
                  </div>
                </div>
                <Badge variant={logo.status === "completed" ? "default" : "outline"} className="capitalize">
                  {logo.status === "completed" ? "Completed" : "Processing"}
                </Badge>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            No logos have been created yet
          </div>
        )}
      </CardContent>
    </Card>
  );
}