import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ClientThemeProvider } from "@/components/ClientThemeProvider";
import Footer  from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Phoenix Firelight | From Ashes To Stories",
  description: "Phoenix Firelight - From Ashes To Stories. A Next.js blog app with full C.U.R.D functionality. Share your stories, create new ones, and rise from the ashes.",
  keywords: "Next.js, React, TailwindCSS, CRUD, Blog, Phoenix Firelight",
  cons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ClientThemeProvider>
          <header className="sticky top-0 z-50 backdrop-blur bg-background/50 shadow-md">
            <Navbar />
          </header>
          <main>
            {children}
          </main>
          <Footer />
        </ClientThemeProvider>
      </body>
    </html>
  );
}
