import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CreditCard, RefreshCw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

export default function CreditPackageGrid({ creditPackages, packageCounts, isLoading }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">Popular Credit Packages</CardTitle>
        <CardDescription>Most frequently purchased credit packages</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="p-6 text-center">
            <RefreshCw className="h-6 w-6 animate-spin mx-auto text-muted-foreground" />
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {creditPackages.map((pkg, index) => {
              const packageData = packageCounts.find(p => p.name === pkg.name) || { count: 0 };
              
              return (
                <div key={index} className="bg-muted/30 rounded-lg p-4 relative overflow-hidden flex flex-col items-center">
                  <div className="absolute top-0 right-0 h-16 w-16 opacity-10">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/50 to-primary/20 rounded-full transform -translate-x-1/2 -translate-y-1/2" />
                  </div>
                  
                  <div className="h-12 w-12 rounded-full bg-white shadow-md overflow-hidden mb-3">
                    <Image 
                      src={pkg.image} 
                      alt={pkg.name} 
                      width={48} 
                      height={48}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  
                  <h3 className="text-sm font-medium text-center">{pkg.name}</h3>
                  <div className="mt-2 flex items-center gap-1 text-sm">
                    <CreditCard className="h-3 w-3 text-muted-foreground" />
                    <span>{pkg.credits} credits</span>
                  </div>
                  <p className="mt-1 text-sm font-semibold">{pkg.price}</p>
                  {packageData.count > 0 && (
                    <Badge variant="outline" className="mt-2">
                      {packageData.count} purchases
                    </Badge>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}