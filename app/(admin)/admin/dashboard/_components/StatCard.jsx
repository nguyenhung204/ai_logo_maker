import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp } from "lucide-react";
import Link from "next/link";

export default function StatCard({ title, value, icon: Icon, link, color }) {
  return (
    <Card className="hover:shadow-md transition-shadow duration-300">
      <CardContent className="p-6">
        <div className="flex items-center gap-4">
          <div className={`p-2 rounded-full bg-gradient-to-br ${color}`}>
            <Icon className="h-6 w-6 text-white" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <h3 className="text-2xl font-bold">{value}</h3>
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