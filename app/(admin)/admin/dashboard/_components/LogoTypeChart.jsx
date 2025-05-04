import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Sparkles,
  ImageIcon,
  Palette,
  Zap,
  LineChart,
  RefreshCw,
  TrendingUp,
} from "lucide-react";
import { useState, useEffect } from "react";

export default function LogoTypeChart({ logoTypes, isLoading }) {
  const [animationComplete, setAnimationComplete] = useState(false);

  // Trigger animation after component mounts
  useEffect(() => {
    if (!isLoading && logoTypes.length > 0) {
      const timer = setTimeout(() => setAnimationComplete(true), 300);
      return () => clearTimeout(timer);
    }
  }, [isLoading, logoTypes]);

  useEffect(() => {
    setAnimationComplete(false);
    if (!isLoading && logoTypes.length > 0) {
      const timer = setTimeout(() => setAnimationComplete(true), 300);
      return () => clearTimeout(timer);
    }
  }, [logoTypes]);

  const getIconForType = (name, index) => {
    const lowercaseName = name.toLowerCase();
    
    if (lowercaseName.includes('modern')) return <TrendingUp className="h-5 w-5 text-primary" />;
    if (lowercaseName.includes('minimal')) return <ImageIcon className="h-5 w-5 text-primary" />;
    if (lowercaseName.includes('abstract')) return <Palette className="h-5 w-5 text-primary" />;
    if (lowercaseName.includes('tech')) return <Zap className="h-5 w-5 text-primary" />;
    
    if (index === 0) return <Sparkles className="h-5 w-5 text-primary" />;
    if (index === 1) return <ImageIcon className="h-5 w-5 text-primary" />;
    if (index === 2) return <Palette className="h-5 w-5 text-primary" />;
    if (index === 3) return <Zap className="h-5 w-5 text-primary" />;
    return <LineChart className="h-5 w-5 text-primary" />;
  };
  
  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow duration-300">
      <CardHeader className="pb-2 border-b">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Palette className="h-5 w-5 text-primary" />
          <span>Popular Logo Types</span>
        </CardTitle>
        <CardDescription>
          Top {Math.min(5, logoTypes.length)} most commonly created logo styles
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        {isLoading ? (
          <div className="p-8 flex justify-center items-center">
            <RefreshCw className="h-8 w-8 animate-spin text-primary/60" />
          </div>
        ) : logoTypes.length > 0 ? (
          <div className="space-y-5 mt-2">
            {logoTypes.slice(0, 5).map((item, index) => (
              <div key={index} className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4 shadow-sm">
                  {getIconForType(item.name, index)}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between mb-1.5">
                    <span className="text-sm font-medium">{item.name}</span>
                    <span className="text-sm font-semibold text-primary">
                      {item.count}
                    </span>
                  </div>
                  <div className="w-full bg-muted h-2.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-primary rounded-full transition-all duration-1000 ease-out ${
                        animationComplete ? "" : "w-0"
                      }`}
                      style={{
                        width: animationComplete ? `${(item.count / logoTypes[0].count) * 100}%` : '0%',
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            <ImageIcon className="h-12 w-12 mx-auto mb-3 text-muted-foreground/50" />
            <p>No logo type data available yet</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
