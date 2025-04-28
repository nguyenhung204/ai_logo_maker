import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronUp, ChevronDown, TrendingUp } from "lucide-react";
import Link from "next/link";

export default function StatCard({ title, value, icon: Icon, change, link, color, timeRange }) {
  const isPositive = parseFloat(change) > 0;
  
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center gap-4">
          <div className={`p-2 rounded-full bg-gradient-to-br ${color}`}>
            <Icon className="h-6 w-6 text-white" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <h3 className="text-2xl font-bold">{value}</h3>
            <div className="flex items-center mt-1">
              {isPositive ? (
                <ChevronUp className="h-4 w-4 text-green-500" />
              ) : (
                <ChevronDown className="h-4 w-4 text-red-500" />
              )}
              <span 
                className={`text-xs font-medium ${
                  isPositive ? "text-green-500" : "text-red-500"
                }`}
              >
                {Math.abs(parseFloat(change))}%
              </span>
              <span className="text-xs text-muted-foreground ml-1">
                compared to {timeRange === "week" ? "last week" : timeRange === "month" ? "last month" : "last year"}
              </span>
            </div>
          </div>
        </div>
        <div className="mt-4 pt-3 border-t">
          <Link 
            href={link}
            className="text-xs text-primary hover:underline flex items-center"
          >
            <span>View details</span>
            <TrendingUp className="ml-1 h-3 w-3" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}