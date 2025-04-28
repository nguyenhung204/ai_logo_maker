import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

export default function TimeRangeSelector({ timeRange, setTimeRange, isLoading, onRefresh }) {
  return (
    <div className="flex items-center gap-2">
      <Button 
        variant={timeRange === "week" ? "default" : "outline"} 
        size="sm"
        onClick={() => setTimeRange("week")}
      >
        This Week
      </Button>
      <Button 
        variant={timeRange === "month" ? "default" : "outline"} 
        size="sm"
        onClick={() => setTimeRange("month")}
      >
        This Month
      </Button>
      <Button 
        variant={timeRange === "year" ? "default" : "outline"} 
        size="sm"
        onClick={() => setTimeRange("year")}
      >
        This Year
      </Button>
      <Button 
        variant="outline" 
        size="icon"
        className="ml-2"
        disabled={isLoading}
        onClick={onRefresh}
      >
        <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
      </Button>
    </div>
  );
}