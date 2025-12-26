import { ReactNode } from "react";
import Sidebar from "@/app/components/layout/Sidebar";

export default function ProtectedLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <main className="flex-1 overflow-y-auto bg-gray-50 px-6 py-6">
        {children}
      </main>
    </div>
  );
}
