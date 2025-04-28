"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    const timer = countdown > 0 && setInterval(() => setCountdown(countdown - 1), 1000);
    if (countdown === 0) {
      router.push("/");
    }
    return () => clearInterval(timer);
  }, [countdown, router]);

  return (
    <div className="relative min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4">
      {/* Main content */}
      <div className="relative z-10 max-w-xl w-full text-center bg-slate-800/80 p-8 rounded-lg border border-slate-700 shadow-lg">
        <h1 className="text-8xl font-bold text-slate-200 mb-4">404</h1>

        <h2 className="text-2xl font-semibold text-slate-300 mb-4">
          Page not found
        </h2>
        
        <p className="text-slate-400 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <div className="mb-8">
          <p className="text-slate-400 mb-2">
            Redirecting in <span className="font-medium text-slate-200">{countdown}</span> seconds
          </p>
          <div className="w-full bg-slate-700 rounded-full h-1.5">
            <div 
              className="bg-slate-400 h-1.5 rounded-full transition-all duration-1000 ease-linear" 
              style={{ width: `${(countdown / 3) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => router.back()}
            variant="outline"
            className="border-slate-600 text-slate-300 hover:bg-slate-700"
          >
            Go Back
          </Button>
          <Link href="/">
            <Button className="bg-slate-700 hover:bg-slate-600 text-slate-200">
              Return to Homepage
            </Button>
          </Link>
        </div>
      </div>

      <div className="absolute bottom-4 text-xs text-slate-500">
        AI Logo Generator © {new Date().getFullYear()}
      </div>
    </div>
  );
}