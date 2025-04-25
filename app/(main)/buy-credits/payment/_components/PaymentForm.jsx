"use client";

import { useState } from "react";
import { CreditCard, Calendar, Lock, User, ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CreditPackages from "../../../_data/CreditPackages";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import TransferSuccessModal from "./TransferSuccessModal";

export default function PaymentForm() {
  // Làm nút back
  const router = useRouter();

  // Trích xuất đường link search params để lấy package details
  const searchParams = useSearchParams();
  const packageId = searchParams.get("package");
  const selectedPackage = CreditPackages.find((pkg) => pkg.id === packageId);
  if (!selectedPackage) return;

  // Mấy cái liên quan đến form làm cho có =]]
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: "",
    cardName: "",
    expiryMonth: "",
    expiryYear: "",
    cvc: "",
  });

  // Handle sự kiện nhập trên form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const hasEmpty = Object.values(formData).some((v) => v === "");
    if (hasEmpty) {
      alert("Please fill in all fields");

      
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setShowSuccess(true);
      setFormData({
        cardNumber: "",
        cardName: "",
        expiryMonth: "",
        expiryYear: "",
        cvc: "",
      });
      setIsSubmitting(false);
    }, 2000);
  };

  // Sự kiện hiển thị modal
  const [showSuccess, setShowSuccess] = useState(false);

  return (
    <div className="w-fit md:w-2/3 lg:w-2/5 mx-auto">
      <Button
        variant="ghost"
        onClick={() => router.back()}
        className="mb-4 flex items-center gap-2 text-primary "
      >
        <ArrowLeft className="h-4 w-4" />
        <span className="text-sm font-medium">Back</span>
      </Button>
      <Card>
        <CardHeader>
          <CardTitle>Payment</CardTitle>
          <CardDescription>Complete your purchase</CardDescription>
        </CardHeader>
        <CardContent>
          <div
            className={`mb-6 p-4 bg-purple-50 border border-purple-200 rounded-lg bg-gradient-to-br ${selectedPackage.color}`}
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className=" text-lg text-white font-extrabold">
                Package Details
              </h3>
              {selectedPackage.popular && (
                <span className="bg-purple-500 text-white text-xs px-2 py-1 rounded">
                  Most Popular
                </span>
              )}
            </div>
            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="text-white">Package:</span>
                <span className="font-medium text-white">
                  {selectedPackage.name}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-white">Credits:</span>
                <span className="font-medium text-white">
                  {selectedPackage.credits} Credits
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-white">Price:</span>
                <span className="font-bold text-lg text-white">
                  {selectedPackage.price}
                </span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="relative">
                <Input
                  name="cardNumber"
                  placeholder="Card Number"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  className="pl-10"
                />
                <CreditCard className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
              </div>

              <div className="relative">
                <Input
                  name="cardName"
                  placeholder="Cardholder Name"
                  value={formData.cardName}
                  onChange={handleChange}
                  className="pl-10"
                />
                <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <Select
                  value={formData.expiryMonth}
                  onValueChange={(val) =>
                    handleSelectChange("expiryMonth", val)
                  }
                >
                  <SelectTrigger>
                    <div className="flex items-center">
                      <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                      <SelectValue placeholder="MM" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 12 }, (_, i) => {
                      const m = (i + 1).toString().padStart(2, "0");
                      return (
                        <SelectItem key={m} value={m}>
                          {m}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>

                <Select
                  value={formData.expiryYear}
                  onValueChange={(val) => handleSelectChange("expiryYear", val)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="YY" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 10 }, (_, i) => {
                      const y = (new Date().getFullYear() + i).toString();
                      return (
                        <SelectItem key={y} value={y}>
                          {y}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>

                <div className="relative">
                  <Input
                    name="cvc"
                    placeholder="CVC"
                    value={formData.cvc}
                    onChange={handleChange}
                    className="pl-10"
                  />
                  <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Processing..." : `Confirm Payment`}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col space-y-4">
          <div className="w-full flex justify-between">
            <span className="text-muted-foreground">Total:</span>
            <span className="font-medium">
              {selectedPackage.price.toLocaleString()}
            </span>
          </div>
          <div className="text-xs text-muted-foreground">
            Your payment information is secure and encrypted.
          </div>
        </CardFooter>
      </Card>

      <TransferSuccessModal
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
      />
    </div>
  );
}
