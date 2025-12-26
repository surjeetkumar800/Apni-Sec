"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../store";
import Link from "next/link";

import { Card, CardBody, Button } from "@heroui/react";
import { fetchDashboardStats } from "../../store/dashboard/dashboardSlice";
import { useProtectedRoute } from "../../hooks/useProtectedRoute";

export default function DashboardPage() {
  const dispatch = useDispatch<AppDispatch>();

  // ✅ TOKEN-BASED PROTECTION
  const { token } = useProtectedRoute();

  const { user } = useSelector((state: RootState) => state.auth);
  const { stats, loading, error } = useSelector(
    (state: RootState) => state.dashboard
  );

  useEffect(() => {
    if (token) {
      dispatch(fetchDashboardStats());
    }
  }, [token, dispatch]);

  if (!token) return null;

  return (
    <div className="min-h-screen bg-slate-100 px-6 py-10">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <section className="mb-12">
          <h1 className="text-3xl font-semibold text-slate-900">
            Security Dashboard
          </h1>
          <p className="mt-2 text-slate-600">
            Welcome back,{" "}
            <span className="font-medium text-slate-900">{user?.name}</span>.
            Here’s an overview of your security status.
          </p>
        </section>

        {/* STATS */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatCard
            title="Total Issues"
            value={loading ? "…" : stats?.totalIssues ?? "--"}
            tone="default"
          />

          <StatCard
            title="Open Vulnerabilities"
            value={loading ? "…" : stats?.openVulnerabilities ?? "--"}
            tone="danger"
          />

          <StatCard
            title="Resolved Issues"
            value={loading ? "…" : stats?.resolved ?? "--"}
            tone="success"
          />
        </section>

        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

        {/* GET STARTED */}
        <section className="mt-16">
          <h2 className="text-xl font-semibold text-slate-900">Get Started</h2>
          <p className="mt-1 text-sm text-slate-500">
            Manage and monitor your security workflow
          </p>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <ActionCard
              title="Report a Security Issue"
              description="Submit a new vulnerability or security finding."
              buttonText="Report Issue"
              href="/issues/create"
              primary
            />

            <ActionCard
              title="Security Findings"
              description="View and track all reported vulnerabilities."
              buttonText="View Findings"
              href="/issues"
            />

            <ActionCard
              title="Account Settings"
              description="Manage your profile and preferences."
              buttonText="Go to Profile"
              href="/profile"
            />
          </div>
        </section>
      </div>
    </div>
  );
}

/* ===== COMPONENTS ===== */

function StatCard({
  title,
  value,
  tone,
}: {
  title: string;
  value: string | number;
  tone: "default" | "danger" | "success";
}) {
  const colors = {
    default: "text-slate-900",
    danger: "text-red-600",
    success: "text-emerald-600",
  };

  return (
    <Card className="rounded-2xl border border-slate-200">
      <CardBody className="p-6">
        <p className="text-sm text-slate-500">{title}</p>
        <p className={`mt-3 text-3xl font-bold ${colors[tone]}`}>{value}</p>
      </CardBody>
    </Card>
  );
}

function ActionCard({
  title,
  description,
  buttonText,
  href,
  primary,
}: {
  title: string;
  description: string;
  buttonText: string;
  href: string;
  primary?: boolean;
}) {
  return (
    <Card className="rounded-2xl border border-slate-200 hover:shadow-lg transition">
      <CardBody className="p-8 flex flex-col justify-between h-full">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
          <p className="mt-2 text-sm text-slate-600">{description}</p>
        </div>

        <Link href={href}>
          <Button
            size="sm"
            className={primary ? "mt-6 bg-emerald-600 text-white" : "mt-6"}
            variant={primary ? "solid" : "bordered"}
          >
            {buttonText}
          </Button>
        </Link>
      </CardBody>
    </Card>
  );
}
