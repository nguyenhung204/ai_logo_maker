import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Sparkles, ImageIcon, Palette, Zap, LineChart, RefreshCw } from "lucide-react";

export default function LogoTypeChart({ logoTypes, isLoading }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">Popular Logo Types</CardTitle>
        <CardDescription>Top 5 most commonly created logo styles</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="p-6 text-center">
            <RefreshCw className="h-6 w-6 animate-spin mx-auto text-muted-foreground" />
          </div>
        ) : logoTypes.length > 0 ? (
          <div className="space-y-4">
            {logoTypes.slice(0, 5).map((item, index) => (
              <div key={index} className="flex items-center">
                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                  {index === 0 && <Sparkles className="h-5 w-5 text-primary" />}
                  {index === 1 && <ImageIcon className="h-5 w-5 text-primary" />}
                  {index === 2 && <Palette className="h-5 w-5 text-primary" />}
                  {index === 3 && <Zap className="h-5 w-5 text-primary" />}
                  {index === 4 && <LineChart className="h-5 w-5 text-primary" />}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">{item.name}</span>
                    <span className="text-sm text-muted-foreground">{item.count}</span>
                  </div>
                  <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary" 
                      style={{ width: `${(item.count / logoTypes[0].count) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            No logo type data available yet
          </div>
        )}
      </CardContent>
    </Card>
  );
}