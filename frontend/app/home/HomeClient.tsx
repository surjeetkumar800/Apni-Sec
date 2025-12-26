"use client";

import Link from "next/link";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import AppLayout from "../components/layout/AppLayout";
import { Button, Card, CardBody } from "@heroui/react";

export default function HomeClient() {
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );

  return (
    <AppLayout>
      {/* ================= LOGGED IN VIEW ================= */}
      {isAuthenticated ? (
        <>
          {/* HERO */}
          <section className="py-32 text-center bg-gray-50">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              Welcome back,{" "}
              <span className="text-emerald-600">{user?.name}</span>
            </h1>

            <p className="mt-4 text-gray-600 max-w-xl mx-auto">
              Monitor vulnerabilities, manage security issues, and track risks
              from your ApniSec dashboard.
            </p>

            <div className="mt-8 flex justify-center gap-4">
              <Link href="/dashboard">
                <Button color="primary" size="lg">
                  Go to Dashboard
                </Button>
              </Link>

              <Link href="/issues">
                <Button variant="bordered" size="lg">
                  View Issues
                </Button>
              </Link>
            </div>
          </section>

          {/* QUICK ACTIONS */}
          <section className="mx-auto max-w-7xl px-6 py-20 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardBody>
                <h3 className="font-semibold text-lg">Create Issue</h3>
                <p className="mt-2 text-gray-600 text-sm">
                  Log new Cloud Security, Red Team, or VAPT issues.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody>
                <h3 className="font-semibold text-lg">Track Progress</h3>
                <p className="mt-2 text-gray-600 text-sm">
                  Monitor remediation status and risk levels.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody>
                <h3 className="font-semibold text-lg">Account Settings</h3>
                <p className="mt-2 text-gray-600 text-sm">
                  Manage profile and access preferences.
                </p>
              </CardBody>
            </Card>
          </section>
        </>
      ) : (
        <>
          {/* ================= GUEST VIEW ================= */}
          <section className="relative bg-gray-950 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.18),transparent_60%)]" />

            <div className="relative mx-auto max-w-7xl px-6 py-32 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              {/* LEFT */}
              <div>
                <h1 className="text-4xl md:text-6xl font-bold leading-tight text-white">
                  Protect your systems <br />
                  <span className="text-emerald-400">
                    before attackers do
                  </span>
                </h1>

                <p className="mt-6 text-lg text-gray-300 max-w-xl">
                  ApniSec helps security teams manage Cloud Security, Red Team
                  Assessments, and VAPT from one secure platform.
                </p>

                <div className="mt-10 flex flex-wrap gap-5">
                  <Link href="/register">
                    <Button
                      size="lg"
                      className="bg-emerald-400 text-black font-semibold px-10 hover:bg-emerald-300"
                    >
                      Get Started
                    </Button>
                  </Link>

                  <Link href="/login">
                    <Button
                      size="lg"
                      variant="bordered"
                      className="border-gray-600 text-white px-10 hover:border-emerald-400 hover:text-emerald-400"
                    >
                      Sign In
                    </Button>
                  </Link>
                </div>
              </div>

              {/* RIGHT */}
              <Card className="bg-gray-900 border border-gray-800 shadow-2xl">
                <CardBody className="p-10">
                  <h3 className="text-xl font-semibold text-white">
                    Why teams choose ApniSec
                  </h3>

                  <ul className="mt-6 space-y-4 text-gray-300 text-sm">
                    <li>✔ Centralized vulnerability management</li>
                    <li>✔ Cloud security & posture visibility</li>
                    <li>✔ Red Team attack simulations</li>
                    <li>✔ Secure authentication & access control</li>
                  </ul>
                </CardBody>
              </Card>
            </div>
          </section>
        </>
      )}
    </AppLayout>
  );
}
