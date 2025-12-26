"use client";

import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
} from "@heroui/react";

import { logout } from "../../store/auth.store";
import type { RootState, AppDispatch } from "../../store";

export default function AppNavbar() {
  const dispatch = useDispatch<AppDispatch>();

  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Navbar
      as="nav"
      aria-label="Primary navigation"
      isBordered
      maxWidth="xl"
      className="bg-white"
    >
      {/* ================= BRAND ================= */}
      <NavbarBrand>
        <Link
          href="/"
          className="text-xl font-semibold text-gray-900 hover:text-emerald-600 transition"
        >
          ApniSec
        </Link>
      </NavbarBrand>

      {/* ================= AUTHENTICATED ================= */}
      {isAuthenticated ? (
        <NavbarContent justify="end" className="gap-4">
          <NavbarItem>
            <Link
              href="/dashboard"
              className="text-gray-700 font-medium hover:text-emerald-600"
            >
              Dashboard
            </Link>
          </NavbarItem>

          <NavbarItem>
            <Link
              href="/issues"
              className="text-gray-700 font-medium hover:text-emerald-600"
            >
              Issues
            </Link>
          </NavbarItem>

          {/* USER DROPDOWN */}
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                name={user?.name || "User"}
                size="sm"
                className="cursor-pointer bg-emerald-600 text-white"
              />
            </DropdownTrigger>

            <DropdownMenu
              aria-label="User menu"
              className="bg-white border border-gray-200 shadow-xl rounded-xl p-2 min-w-[160px]"
            >
              <DropdownItem
                key="account"
                className="text-gray-800 hover:bg-gray-100 rounded-md px-3 py-2"
              >
                <Link href="/profile">My Account</Link>
              </DropdownItem>

              <DropdownItem
                key="logout"
                color="danger"
                className="text-red-600 hover:bg-red-50 rounded-md px-3 py-2"
                onClick={handleLogout}
              >
                Logout
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      ) : (
        /* ================= GUEST ================= */
        <NavbarContent justify="end" className="gap-3">
          <NavbarItem>
            <Link href="/login">
              <Button variant="light" className="text-gray-700 font-medium">
                Login
              </Button>
            </Link>
          </NavbarItem>

          <NavbarItem>
            <Link href="/register">
              <Button className="bg-emerald-600 text-white font-medium hover:bg-emerald-500">
                Get Started
              </Button>
            </Link>
          </NavbarItem>
        </NavbarContent>
      )}
    </Navbar>
  );
}
