"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import {
  LayoutDashboard,
  AlertTriangle,
  User,
  PlusCircle,
  LogOut,
} from "lucide-react";

import { logout } from "@/app/store/auth.store";

const menu = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Issues",
    href: "/issues",
    icon: AlertTriangle,
  },
  {
    label: "Create Issue",
    href: "/issues/create",
    icon: PlusCircle,
  },
  {
    label: "Profile",
    href: "/profile",
    icon: User,
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();

  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === "/dashboard";
    }
    return pathname.startsWith(href);
  };

  const handleLogout = () => {
    dispatch(logout());
    router.replace("/login");
  };

  return (
    <aside className="w-64 h-screen bg-gray-900 text-white flex flex-col">
      {/* ===== LOGO ===== */}
      <Link
        href="/dashboard"
        className="px-6 py-5 text-xl font-bold border-b border-gray-800 hover:bg-gray-800 transition"
      >
        ApniSec
      </Link>

      {/* ===== MENU ===== */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {menu.map((item) => {
          const active = isActive(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition
                ${
                  active
                    ? "bg-emerald-600 text-white shadow"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* ===== LOGOUT ===== */}
      <div className="px-3 py-4 border-t border-gray-800">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm
            text-gray-300 hover:bg-red-600 hover:text-white transition"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>

      {/* ===== FOOTER ===== */}
      <div className="px-4 py-3 text-xs text-gray-400 border-t border-gray-800">
        © 2025 ApniSec
      </div>
    </aside>
  );
}
