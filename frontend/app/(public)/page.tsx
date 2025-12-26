"use client";

import { useSelector } from "react-redux";
import type { RootState } from "../store";
import Link from "next/link";
import { Button, Card, CardBody } from "@heroui/react";
import AppLayout from "../components/layout/AppLayout";

export default function HomePage() {
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );

  return (
    <AppLayout>
      {isAuthenticated ? (
        /* ================= LOGGED IN ================= */
        <section className="py-28 text-center">
          <h1 className="text-4xl font-bold text-gray-900">
            Welcome,{" "}
            <span className="text-emerald-600">{user?.name}</span>
          </h1>

          <p className="mt-4 text-gray-600">
            You are logged in. Manage your security from the dashboard.
          </p>

          <div className="mt-8 flex justify-center gap-4">
            <Link href="/dashboard">
              <Button color="primary" size="lg">
                Dashboard
              </Button>
            </Link>

            <Link href="/issues">
              <Button variant="bordered" size="lg">
                Issues
              </Button>
            </Link>
          </div>
        </section>
      ) : (
        /* ================= GUEST ================= */
        <section className="py-28 text-center">
          <h1 className="text-4xl font-bold text-gray-900">
            Secure your infrastructure with{" "}
            <span className="text-blue-600">ApniSec</span>
          </h1>

          <p className="mt-4 text-gray-600">
            Cloud Security, Red Team & VAPT in one platform.
          </p>

          <div className="mt-8 flex justify-center gap-4">
            <Link href="/register">
              <Button color="primary" size="lg">
                Get Started
              </Button>
            </Link>

            <Link href="/login">
              <Button variant="bordered" size="lg">
                Login
              </Button>
            </Link>
          </div>
        </section>
      )}
    </AppLayout>
  );
}
