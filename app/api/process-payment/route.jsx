import { db } from "@/config/FirebaseConfig";
import { doc, getDoc, setDoc, updateDoc, collection } from "firebase/firestore";
import { NextResponse } from "next/server";
import { Timestamp } from "firebase/firestore";

export async function POST(req) {
  const { userEmail, packageDetails } = await req.json();

  try {
    const userRef = doc(db, "users", userEmail);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
      });
    }

    const userData = userSnap.data();
    const newCredits = Number(userData.credits) + packageDetails.credits;

    await updateDoc(userRef, { credits: newCredits });

    const transactionRef = doc(
      collection(db, "users", userEmail, "transactions"),
      Date.now().toString()
    );

    await setDoc(transactionRef, {
      price: packageDetails.price,
      credits: packageDetails.credits,
      package: packageDetails.name,
      date: Timestamp.now(),
      status: "Completed",
    });

    const updatedUserSnap = await getDoc(userRef);

    return NextResponse.json(updatedUserSnap.data(), { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
