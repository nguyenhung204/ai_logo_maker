import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { RefreshCw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";

export default function RecentUsers({ recentUsers, isLoading }) {
  return (
    <Card className="md:col-span-1 overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium">Recent Users</CardTitle>
          <Link href="/admin/dashboard/users" className="text-xs text-primary hover:underline">
            View all
          </Link>
        </div>
        <CardDescription>Newly registered users</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        {isLoading ? (
          <div className="p-6 text-center">
            <RefreshCw className="h-6 w-6 animate-spin mx-auto text-muted-foreground" />
            <p className="text-sm text-muted-foreground mt-2">Loading users...</p>
          </div>
        ) : recentUsers.length > 0 ? (
          <div className="divide-y">
            {recentUsers.map((user) => (
              <div key={user.email} className="flex items-center gap-4 p-4">
                <Avatar className="h-10 w-10">
                  <AvatarFallback>{user.name?.substring(0, 2).toUpperCase() || "U"}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{user.name}</p>
                  <p className="text-sm text-muted-foreground truncate">{user.email}</p>
                </div>
                <div className="text-right">
                  <Badge variant="outline" className="mb-1">{user.credits} credits</Badge>
                  <p className="text-xs text-muted-foreground">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            No new users yet
          </div>
        )}
      </CardContent>
    </Card>
  );
}