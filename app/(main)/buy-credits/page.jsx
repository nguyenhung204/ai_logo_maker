"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CreditPackages from "../_data/CreditPackages";
import Link from "next/link";
import { SignInButton, useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";

export default function BuyCreditsPage() {
  const { isSignedIn } = useUser();

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  };

  return (
    <div className="container mx-auto py-12 px-4 bg-gradient-to-b from-slate-50/50 to-slate-100 min-h-screen">
      {/* Header */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
        className="text-center mb-12"
      >
        <motion.h1
          variants={itemVariants}
          className="text-4xl font-bold tracking-tight mb-4 text-primary"
        >
          Buy Credits
        </motion.h1>
        <motion.p
          variants={itemVariants}
          className="text-slate-600 max-w-2xl mx-auto"
        >
          Choose a credit package that fits your needs. The more you buy, the
          more you save!
        </motion.p>
      </motion.div>

      {/* Grid Packages */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
      >
        {CreditPackages.map((pkg) => {
          const Icon = pkg.icon;
          return (
            <motion.div
              key={pkg.id}
              variants={itemVariants}
              whileHover={{ scale: 1.03 }}
              className="relative flex flex-col h-full transition-all duration-300 hover:shadow-xl overflow-hidden group"
            >
              <Card
                className={`relative flex flex-col h-full border ${
                  pkg.popular
                    ? "border-purple-400 border-2 shadow-lg shadow-purple-200"
                    : "border-transparent"
                }`}
              >
                {/* Background decoration */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${pkg.color} opacity-10 group-hover:opacity-20 transition-opacity`}
                ></div>

                {/* Decorative circles */}
                <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-gradient-to-br from-white/30 to-white/10 blur-sm"></div>
                <div className="absolute -left-6 -bottom-6 w-20 h-20 rounded-full bg-gradient-to-tr from-white/20 to-white/5 blur-sm"></div>

                <CardHeader className="text-center pb-2 relative z-10">
                  <div className={`h-6 mb-2 ${!pkg.popular && "invisible"}`}>
                    {pkg.popular && (
                      <div className="bg-gradient-to-r from-violet-600 to-purple-600 text-white text-sm font-medium py-1 px-4 rounded-full mx-auto animate-pulse">
                        Most Popular
                      </div>
                    )}
                  </div>
                  <CardTitle className="text-lg font-bold flex items-center justify-center gap-2">
                    <Icon
                      className={`h-5 w-5 ${
                        pkg.popular ? "text-purple-500" : ""
                      }`}
                    />
                    {pkg.name}
                  </CardTitle>
                </CardHeader>

                <CardContent className="flex-grow flex flex-col items-center justify-center text-center p-6 relative z-10">
                  <div className="mb-4 relative w-28 h-28 bg-white/80 rounded-full p-2 shadow-inner flex items-center justify-center transform group-hover:scale-105 transition-transform">
                    <Image
                      src={pkg.image || "/placeholder.svg"}
                      alt={`${pkg.name} image`}
                      fill
                      className="object-contain p-4"
                    />
                  </div>

                  <div className="mt-4 mb-4">
                    <span className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-700 to-slate-900">
                      {pkg.credits}
                    </span>
                    <span className="text-xl ml-2 text-slate-600">Credits</span>
                  </div>

                  <div className="text-2xl font-semibold text-slate-800">
                    {pkg.price}
                  </div>
                </CardContent>

                <CardFooter className="pt-2 pb-6 relative z-10">
                  {isSignedIn ? (
                    <Link
                      href={`/buy-credits/payment/?package=${pkg.id}`}
                      className="mx-auto w-fit"
                    >
                      <Button
                        className={`w-full text-lg py-6 border-none shadow-lg ${pkg.buttonColor} text-white transform transition-all duration-300 hover:translate-y-[-2px] hover:shadow-xl`}
                        size="lg"
                      >
                        Buy Now
                      </Button>
                    </Link>
                  ) : (
                    <SignInButton mode="modal">
                      <Button
                        className={`w-full text-lg py-6 border-none shadow-lg ${pkg.buttonColor} text-white transform transition-all duration-300 hover:translate-y-[-2px] hover:shadow-xl`}
                        size="lg"
                      >
                        Buy Now
                      </Button>
                    </SignInButton>
                  )}
                </CardFooter>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
