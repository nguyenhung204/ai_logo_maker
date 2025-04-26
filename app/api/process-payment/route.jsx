import { db } from "@/config/FirebaseConfig";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { userEmail, packageCredits } = await req.json();
  try {
    const docRef = doc(db, "users", userEmail);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      console.log(data);

      const newCredits = Number(data.credits) + packageCredits;
      const docRef = doc(db, "users", userEmail);
      await updateDoc(docRef, {
        credits: newCredits,
      });

      const newDocSnap = await getDoc(docRef);
      return NextResponse.json(newDocSnap.data(), { status: 200 });
    }
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
