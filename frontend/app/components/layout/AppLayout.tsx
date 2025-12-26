"use client";

import AppNavbar from "./Navbar";
import Footer from "./Footer";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <AppNavbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
