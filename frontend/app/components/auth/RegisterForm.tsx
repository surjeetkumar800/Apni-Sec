"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Eye, EyeOff, ShieldPlus } from "lucide-react";
import { Input, Button, Card, CardBody } from "@heroui/react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

import { register } from "../../store/auth.store";
import type { RootState, AppDispatch } from "../../store";

type Errors = {
  name?: string;
  email?: string;
  password?: string;
};

export default function RegisterForm() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const { loading, token, error } = useSelector(
    (state: RootState) => state.auth
  );

  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<Errors>({});

  /* ================= VALIDATION ================= */

  const validate = (): boolean => {
    const newErrors: Errors = {};

    if (!form.name.trim()) {
      newErrors.name = "Full name is required";
    } else if (form.name.trim().length < 3) {
      newErrors.name = "Name must be at least 3 characters";
    }

    if (!form.email) {
      newErrors.email = "Email address is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(form.email)
    ) {
      newErrors.email = "Enter a valid email address";
    }

    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 8) {
      newErrors.password = "Minimum 8 characters required";
    } else if (!/[A-Z]/.test(form.password)) {
      newErrors.password = "Include at least one uppercase letter";
    } else if (!/[0-9]/.test(form.password)) {
      newErrors.password = "Include at least one number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* ================= FIELD CHANGE ================= */

  const handleChange = (
    field: keyof Errors,
    value: string
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  /* ================= SUBMIT ================= */

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({}); // clear old errors

    if (!validate()) return;

    dispatch(register(form));
  };

  /* ================= REDIRECT ================= */

  useEffect(() => {
    if (token) {
      router.push("/dashboard");
    }
  }, [token, router]);

  /* ================= BACKEND ERROR MAP ================= */

  useEffect(() => {
    if (error?.toLowerCase().includes("email")) {
      setErrors((prev) => ({
        ...prev,
        email: error,
      }));
    }
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-950 to-emerald-950 px-4">
      <Card className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-2xl shadow-[0_0_60px_rgba(16,185,129,0.15)]">
        <CardBody className="p-8">
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-400/10">
              <ShieldPlus className="h-6 w-6 text-emerald-400" />
            </div>

            <h1 className="text-2xl font-bold text-white">
              Create your ApniSec account
            </h1>
            <p className="mt-2 text-sm text-gray-400">
              Secure your infrastructure in minutes
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <Input
                label="Full name"
                placeholder="John Doe"
                value={form.name}
                onChange={(e) =>
                  handleChange("name", e.target.value)
                }
                isInvalid={!!errors.name}
                classNames={{
                  inputWrapper:
                    "bg-gray-950 border border-gray-700 hover:border-emerald-400 focus-within:border-emerald-400",
                  label: "text-gray-400",
                  input: "text-white placeholder:text-gray-500",
                }}
              />
              {errors.name && (
                <p className="mt-1 text-xs text-red-400">
                  {errors.name}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <Input
                type="email"
                label="Email address"
                placeholder="name@company.com"
                value={form.email}
                onChange={(e) =>
                  handleChange("email", e.target.value)
                }
                isInvalid={!!errors.email}
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
                placeholder="Minimum 8 characters"
                value={form.password}
                onChange={(e) =>
                  handleChange("password", e.target.value)
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
                isInvalid={!!errors.password}
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

            {/* Submit */}
            <Button
              type="submit"
              isLoading={loading}
              size="lg"
              className="w-full bg-emerald-400 text-black font-semibold hover:bg-emerald-300"
            >
              Create Account
            </Button>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center text-sm text-gray-400">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-emerald-400 hover:underline"
            >
              Sign in
            </Link>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
