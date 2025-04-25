"use client";

import { Suspense } from "react";
import PaymentForm from "./_components/PaymentForm";

export default function PaymentPage() {
  return (
    <>
      <Suspense>
        <PaymentForm />
      </Suspense>
    </>
  );
}
