"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, ShieldCheck } from "lucide-react";
import { Input, Button, Card, CardBody } from "@heroui/react";

import { login } from "../../store/auth.store";
import type { RootState, AppDispatch } from "../../store";

export default function LoginForm() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  // ✅ YAHI MAIN FIX HAI
  const { loading, isAuthenticated, error } = useSelector(
    (state: RootState) => state.auth
  );

  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  /* ================= VALIDATION ================= */

  const validate = () => {
    const newErrors: typeof errors = {};

    if (!form.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* ================= SUBMIT ================= */

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setSuccessMessage("");

    if (!validate()) return;

    dispatch(login(form));
  };

  /* ================= AUTH SUCCESS HANDLER ================= */
  // 🔥 YE SABSE IMPORTANT PART HAI

  useEffect(() => {
    if (isAuthenticated) {
      setSuccessMessage("Login successful. Redirecting...");

      const timer = setTimeout(() => {
        router.replace("/dashboard");
      }, 800);

      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-950 to-emerald-950 px-4">
      <Card className="w-full max-w-md bg-gray-900 border border-gray-800 shadow-[0_0_60px_rgba(16,185,129,0.15)] rounded-2xl">
        <CardBody className="p-8">
          {/* ================= HEADER ================= */}
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-400/10">
              <ShieldCheck className="h-6 w-6 text-emerald-400" />
            </div>

            <h1 className="text-2xl font-bold text-white">
              Sign in to ApniSec
            </h1>
            <p className="mt-2 text-sm text-gray-400">
              Secure access to your security dashboard
            </p>
          </div>

          {/* ================= ERROR ================= */}
          {error && (
            <p className="mb-4 text-sm text-red-400 text-center">
              {error}
            </p>
          )}

          {/* ================= SUCCESS ================= */}
          {successMessage && (
            <p className="mb-4 text-sm text-emerald-400 text-center">
              {successMessage}
            </p>
          )}

          {/* ================= FORM ================= */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <Input
                type="email"
                label="Email address"
                placeholder="name@company.com"
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
                classNames={{
                  inputWrapper:
                    "bg-gray-950 border border-gray-700 hover:border-emerald-400 focus-within:border-emerald-400",
                  label: "text-gray-400",
                  input: "text-white placeholder:text-gray-500",
                }}
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-400">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <Input
                type={showPassword ? "text" : "password"}
                label="Password"
                placeholder="••••••••"
                value={form.password}
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
                endContent={
                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    className="text-gray-400 hover:text-emerald-400"
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                }
                classNames={{
                  inputWrapper:
                    "bg-gray-950 border border-gray-700 hover:border-emerald-400 focus-within:border-emerald-400",
                  label: "text-gray-400",
                  input: "text-white placeholder:text-gray-500",
                }}
              />
              {errors.password && (
                <p className="mt-1 text-xs text-red-400">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Button */}
            <Button
              type="submit"
              isLoading={loading}
              size="lg"
              className="w-full bg-emerald-400 text-black font-semibold hover:bg-emerald-300"
            >
              {loading ? "Signing you in..." : "Sign In"}
            </Button>
          </form>

          {/* ================= FOOTER ================= */}
          <div className="mt-8 flex items-center justify-between text-sm text-gray-400">
            <span>New to ApniSec?</span>
            <Link
              href="/register"
              className="text-emerald-400 hover:underline"
            >
              Create account
            </Link>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
