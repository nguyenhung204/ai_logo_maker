import { Host_Grotesk } from "next/font/google";
import "./globals.css";
import Provider from "./provider";
import { ClerkProvider } from "@clerk/nextjs";

const host_Grotesk = Host_Grotesk({
  subsets: ["latin"],
});

export const metadata = {
  title: "AI Logo Maker",
  description: "Generate stunning logos instantly with AI-powered design.",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html>
        <body className={`${host_Grotesk.className}`}>
          <Provider>{children}</Provider>
        </body>
      </html>
    </ClerkProvider>
  );
}
