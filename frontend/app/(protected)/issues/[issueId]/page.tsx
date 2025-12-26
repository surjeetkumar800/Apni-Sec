"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import type { RootState } from "../../../store";

import {
  Card,
  CardBody,
  Button,
  Spinner,
  Chip,
} from "@heroui/react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

/* ================= TYPES ================= */

interface RawIssue {
  _id: string;
  title?: string;
  description?: string;
  severity?: string;
  status?: string;
  isResolved?: boolean;
  createdAt?: string;
}

interface Issue {
  id: string;
  title: string;
  description: string;
  severity: "low" | "medium" | "high";
  status: "open" | "resolved";
  createdAt: string;
}

/* ================= PAGE ================= */

export default function IssueDetailPage() {
  const router = useRouter();
  const params = useParams();
  const issueId = params.issueId as string;

  const { token, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

  const [issue, setIssue] = useState<Issue | null>(null);
  const [loading, setLoading] = useState(true);
  const [resolving, setResolving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /* ================= AUTH GUARD ================= */
  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, router]);

  /* ================= FETCH ISSUE ================= */
  useEffect(() => {
    const fetchIssue = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`${API_URL}/issues/${issueId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const json = await res.json();

        if (!res.ok || !json.success) {
          throw new Error(json.message || "Failed to load issue");
        }

        const data: RawIssue = json.data;

        // ✅ Normalize backend response
        const normalizedIssue: Issue = {
          id: data._id,
          title: data.title ?? "Untitled Issue",
          description: data.description ?? "No description provided",
          severity:
            (data.severity as "low" | "medium" | "high") ?? "medium",
          status:
            data.status === "resolved" || data.isResolved
              ? "resolved"
              : "open",
          createdAt: data.createdAt ?? new Date().toISOString(),
        };

        setIssue(normalizedIssue);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (token && issueId) {
      fetchIssue();
    }
  }, [issueId, token]);

  /* ================= RESOLVE ISSUE ================= */
  const handleResolve = async () => {
    try {
      setResolving(true);
      setError(null);

      const res = await fetch(
        `${API_URL}/issues/${issueId}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: "resolved" }),
        }
      );

      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.message || "Failed to resolve issue");
      }

      // ✅ Optimistic UI update
      setIssue((prev) =>
        prev ? { ...prev, status: "resolved" } : prev
      );
    } catch (err: any) {
      alert(err.message);
    } finally {
      setResolving(false);
    }
  };

  /* ================= UI STATES ================= */

  if (!isAuthenticated) return null;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!issue) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        {error || "Issue not found"}
      </div>
    );
  }

  /* ================= UI ================= */

  return (
    <div className="min-h-screen bg-slate-100 px-6 py-10">
      <div className="max-w-3xl mx-auto">
        <Card className="rounded-2xl shadow-sm">
          <CardBody className="p-8">
            {/* HEADER */}
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-2xl font-semibold text-slate-900">
                  {issue.title}
                </h1>
                <p className="mt-2 text-sm text-slate-500">
                  Created on{" "}
                  {new Date(issue.createdAt).toLocaleDateString()}
                </p>
              </div>

              <Chip
                variant="flat"
                color={
                  issue.status === "resolved"
                    ? "success"
                    : "warning"
                }
              >
                {issue.status.toUpperCase()}
              </Chip>
            </div>

            {/* DESCRIPTION */}
            <div className="mb-6">
              <p className="text-slate-700 leading-relaxed">
                {issue.description}
              </p>
            </div>

            {/* META */}
            <div className="mb-8 flex gap-6 text-sm">
              <div>
                <span className="text-slate-500">Severity:</span>
                <span className="ml-2 font-medium text-slate-900">
                  {issue.severity.toUpperCase()}
                </span>
              </div>
            </div>

            {/* ACTION */}
            {issue.status === "open" && (
              <div className="flex justify-end">
                <Button
                  isLoading={resolving}
                  onPress={handleResolve}
                  className="bg-emerald-600 text-white"
                >
                  Mark as Resolved
                </Button>
              </div>
            )}
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
