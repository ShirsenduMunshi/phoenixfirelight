import { Geist, Geist_Mono } from "next/font/google";
import { ClientThemeProvider } from "@/components/ClientThemeProvider";
import DashboardSidebar from "@/components/DashboardSidebar";
// import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Phoenix Firelight | Dashboard",
  description: "Phoenix Firelight admin dashboard. Manage your blog posts, users, and settings.",
  keywords: "Next.js, React, TailwindCSS, CRUD, Blog, Phoenix Firelight",
  cons: {
    icon: "/favicon.ico",
  },
};

export default function DashboardLayout({ children }) {
  return (
    <ClientThemeProvider>
        <main>
          {children}
        </main>{/* ml-72 flex-1 p-6 bg-gray-100 */}
    </ClientThemeProvider>
  );
}
  