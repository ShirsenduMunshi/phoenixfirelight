import { ClientThemeProvider } from "@/components/ClientThemeProvider";

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
        </main>
    </ClientThemeProvider>
  );
}
  