"use client";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import type { RootState } from "../../../store";

import {
  Card,
  CardBody,
  Button,
  Input,
  Textarea,
  Select,
  SelectItem,
} from "@heroui/react";

export default function CreateIssuePage() {
  const router = useRouter();
  const { isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    type: "",
    title: "",
    description: "",
    priority: "medium",
  });

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated]);

  const handleSubmit = async () => {
    if (!form.type || !form.title || !form.description) {
      setError("All fields are required");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("token");

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/issues`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(form),
        }
      );

      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.message || "Create issue failed");
      }

      router.push("/issues");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <Card className="w-full max-w-2xl">
        <CardBody className="p-8 space-y-5">
          <h1 className="text-2xl font-bold">
            Create Issue
          </h1>

          <Select
            label="Issue Type"
            isRequired
            selectedKeys={form.type ? [form.type] : []}
            onSelectionChange={(keys) =>
              setForm({
                ...form,
                type: Array.from(keys)[0] as string,
              })
            }
          >
            <SelectItem key="Cloud Security">
              Cloud Security
            </SelectItem>
            <SelectItem key="Red Team Assessment">
              Red Team Assessment
            </SelectItem>
            <SelectItem key="VAPT">
              VAPT
            </SelectItem>
          </Select>

          <Input
            label="Title"
            value={form.title}
            isRequired
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
          />

          <Textarea
            label="Description"
            value={form.description}
            isRequired
            onChange={(e) =>
              setForm({
                ...form,
                description: e.target.value,
              })
            }
          />

          <Select
            label="Priority"
            selectedKeys={[form.priority]}
            onSelectionChange={(keys) =>
              setForm({
                ...form,
                priority: Array.from(keys)[0] as string,
              })
            }
          >
            <SelectItem key="low">Low</SelectItem>
            <SelectItem key="medium">Medium</SelectItem>
            <SelectItem key="high">High</SelectItem>
          </Select>

          {error && (
            <p className="text-red-600 text-sm">
              {error}
            </p>
          )}

          <div className="flex gap-4 pt-4">
            <Button
              className="bg-emerald-600 text-white"
              isLoading={loading}
              onPress={handleSubmit}
            >
              Create Issue
            </Button>

            <Button
              variant="bordered"
              onPress={() => router.back()}
            >
              Cancel
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
