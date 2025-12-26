"use client";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import type { RootState } from "../../store";

import {
  Card,
  CardBody,
  Button,
  Chip,
  Spinner,
} from "@heroui/react";

interface Issue {
  _id: string;
  type: string;
  title: string;
  description: string;
  priority: string;
  status?: string;
  createdAt: string;
}

export default function IssuesPage() {
  const router = useRouter();
  const { isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/login");
      return;
    }

    fetchIssues();
  }, [isAuthenticated]);

  const fetchIssues = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("token");

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/issues`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.message || "Failed to fetch issues");
      }

      setIssues(json.data || []);
    } catch (err: any) {
      setError(err.message || "Failed to load issues");
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) return null;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="lg" color="success" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Security Issues</h1>

          <Button
            className="bg-emerald-600 text-white"
            onPress={() => router.push("/issues/create")}
          >
            + Create Issue
          </Button>
        </div>

        {error && (
          <div className="mb-6 text-red-600">
            {error}
          </div>
        )}

        {issues.length === 0 ? (
          <Card>
            <CardBody className="p-10 text-center text-gray-500">
              No issues found
            </CardBody>
          </Card>
        ) : (
          <div className="space-y-4">
            {issues.map((issue) => (
              <Card
                key={issue._id}
                isPressable
                onPress={() =>
                  router.push(`/issues/${issue._id}`)
                }
              >
                <CardBody className="p-6">
                  <div className="flex gap-2 mb-2">
                    <Chip size="sm">{issue.type}</Chip>
                    <Chip size="sm">{issue.priority}</Chip>
                    {issue.status && (
                      <Chip size="sm">{issue.status}</Chip>
                    )}
                  </div>

                  <h3 className="text-lg font-semibold">
                    {issue.title}
                  </h3>

                  <p className="text-sm text-gray-600 mt-1">
                    {issue.description}
                  </p>
                </CardBody>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
