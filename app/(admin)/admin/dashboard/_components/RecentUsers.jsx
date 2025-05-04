import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { RefreshCw, Users, Clock, CreditCard } from "lucide-react";
import Link from "next/link";

export default function RecentUsers({ recentUsers, isLoading }) {
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getUserInitials = (name) => {
    if (!name || name === "Unknown User") return "U";
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Generate a color based on the user's name
  const getAvatarColor = (name) => {
    const colors = [
      "bg-blue-500", "bg-green-500", "bg-purple-500",
      "bg-pink-500", "bg-yellow-500", "bg-red-500",
      "bg-indigo-500", "bg-teal-500", "bg-orange-500",
    ];

    if (!name || name === "Unknown User") return "bg-gray-500";
    const hash = name.split("").reduce((acc, char) => {
      return char.charCodeAt(0) + acc;
    }, 0);

    return colors[hash % colors.length];
  };

  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow duration-300">
      <CardHeader className="pb-2 border-b">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          <span>Recent Users</span>
        </CardTitle>
        <CardDescription>Latest registered users</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        {isLoading ? (
          <div className="p-8 flex justify-center items-center">
            <RefreshCw className="h-8 w-8 animate-spin text-primary/60" />
          </div>
        ) : recentUsers.length > 0 ? (
          <div className="divide-y">
            {recentUsers.map((user, index) => (
              <div key={index} className="p-4 hover:bg-muted/30 transition-colors">
                <div className="flex items-center gap-3">
                  <Avatar className={`h-10 w-10 ${getAvatarColor(user.name)}`}>
                    <AvatarFallback className="text-xs font-medium text-black">
                      {getUserInitials(user.name)}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium text-sm" title={user.name}>
                          {user.name || "Unknown User"}
                        </h3>
                        <p className="text-xs text-muted-foreground truncate">
                          {user.email}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        <span>Joined {formatDate(user.createdAt)}</span>
                      </div>

                      <div className="flex items-center gap-1">
                        <CreditCard className="h-3.5 w-3.5" />
                        <span>{user.credits || 0} credits</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-3 flex justify-end">
                  <Link
                    href={`/admin/users/${encodeURIComponent(user.email)}`}
                    className="text-xs text-primary hover:underline"
                  >
                    View profile
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            <Users className="h-12 w-12 mx-auto mb-3 text-muted-foreground/50" />
            <p>No users registered yet</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}