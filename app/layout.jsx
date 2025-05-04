import { Inter } from "next/font/google";
import "./globals.css";
import Provider from "./provider";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata = {
  title: "AI Logo Maker",
  description: "Generate stunning logos instantly with AI-powered design.",
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: { url: '/logo.png', sizes: '180x180' },
  },
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html>
        <head>
          <link rel="icon" href="/favicon.ico" sizes="any" />
        </head>
        <body className={`${inter.className}`}>
          <Provider>{children}</Provider>
        </body>
      </html>
    </ClerkProvider>
  );
}
