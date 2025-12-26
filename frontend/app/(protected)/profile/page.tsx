"use client";

import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import type { RootState } from "../../store";
import { Card, CardBody, Button, Input, Spinner, Avatar } from "@heroui/react";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  isActive: boolean;
  createdAt: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function ProfilePage() {
  const router = useRouter();
  const { isAuthenticated, token } = useSelector(
    (state: RootState) => state.auth
  );

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  /* ================= AUTH GUARD ================= */
  useEffect(() => {
    if (!isAuthenticated || !token) {
      router.replace("/login");
      return;
    }
    fetchProfile();
  }, [isAuthenticated, token]);

  /* ================= FETCH PROFILE ================= */
  const fetchProfile = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(`${API_URL}/users/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.message || "Failed to load profile");
      }

      setProfile(json.data);

      setFormData({
        name: json.data.name,
        email: json.data.email,
      });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [token]);

  /* ================= UPDATE PROFILE ================= */
  const handleUpdate = async () => {
    try {
      if (!formData.name.trim() || !formData.email.trim()) {
        setError("Name and email are required");
        return;
      }

      setUpdating(true);
      setError(null);
      setSuccess(null);

      const res = await fetch(`${API_URL}/users/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.message || "Update failed");
      }

      setProfile((prev) => (prev ? { ...prev, ...json.data } : prev));
      setSuccess("Profile updated successfully");
      setIsEditing(false);

      setTimeout(() => setSuccess(null), 2500);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setUpdating(false);
    }
  };

  /* ================= UI STATES ================= */

  if (!isAuthenticated) return null;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="lg" color="success" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  /* ================= UI ================= */

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <Card className="rounded-2xl shadow-sm">
          <CardBody className="p-8">
            {/* ================= HEADER ================= */}
            <div className="flex items-center gap-6 border-b pb-6 mb-6">
              <Avatar
                name={profile.name}
                className="w-24 h-24 text-2xl bg-emerald-600 text-white"
              />
              <div className="flex-1">
                <h2 className="text-2xl font-semibold text-slate-900">
                  {profile.name}
                </h2>
                <p className="text-slate-600 mt-1">{profile.email}</p>

                <p className="text-xs text-slate-400 mt-2">
                  Member since{" "}
                  {new Date(profile.createdAt).toLocaleDateString()}
                </p>
              </div>

              {!isEditing && (
                <Button
                  size="sm"
                  onPress={() => setIsEditing(true)}
                  className="bg-slate-900 text-white"
                >
                  Edit Profile
                </Button>
              )}
            </div>

            {/* ================= ALERTS ================= */}
            {error && (
              <div className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-red-600 text-sm">
                {error}
              </div>
            )}

            {success && (
              <div className="mb-4 rounded-lg bg-emerald-50 px-4 py-3 text-emerald-600 text-sm">
                {success}
              </div>
            )}

            {/* ================= FORM ================= */}
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Full Name
                </label>
                <Input
                  value={formData.name}
                  isDisabled={!isEditing}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  variant="bordered"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Email Address
                </label>
                <Input
                  type="email"
                  value={formData.email}
                  isDisabled={!isEditing}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  variant="bordered"
                />
              </div>
            </div>

            {/* ================= ACTIONS ================= */}
            {isEditing && (
              <div className="flex justify-end gap-3 mt-8">
                <Button
                  variant="bordered"
                  onPress={() => {
                    setIsEditing(false);
                    setFormData({
                      name: profile.name,
                      email: profile.email,
                    });
                  }}
                >
                  Cancel
                </Button>

                <Button
                  isLoading={updating}
                  onPress={handleUpdate}
                  className="bg-emerald-600 text-white"
                >
                  Save Changes
                </Button>
              </div>
            )}
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
