"use client";

// TODO: CRITICAL - Replace localStorage authentication with proper JWT/session-based auth
// TODO: CRITICAL - Remove hardcoded admin credentials
// TODO: Implement proper password hashing (bcrypt/argon2)
// TODO: Add server-side authentication API routes
// TODO: Implement CSRF protection
// TODO: Add rate limiting on login attempts
// TODO: Add "Forgot Password" functionality
// TODO: Implement email verification for new users
// TODO: Add OAuth login (Google, Facebook, etc.)
// TODO: Add proper error handling and user feedback
// TODO: Implement session timeout
// TODO: Add remember me functionality with secure tokens

import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

export default function AuthPage() {
  const [mode, setMode] = useState<"login" | "register">("register");
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // TEMPORARY: Hardcoded admin credentials - MUST BE REPLACED
    const ADMIN_EMAIL = "admin@woodmaps.com";
    const ADMIN_PASSWORD = "admin123";

    if (mode === "login") {
      if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        // Admin login
        localStorage.setItem("adminAuth", "true");
        localStorage.setItem("adminEmail", email);
        window.location.href = "/admin/dashboard";
      } else {
        // Regular user login (you can add your logic here)
        setError("Invalid credentials. For admin access, use admin@woodmaps.com / admin123");
      }
    } else {
      // Registration logic
      alert("Registration functionality coming soon!");
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* LEFT — CHOCOLATE */}
      <div className="relative hidden lg:flex flex-col justify-between p-14 bg-[#2b1a12] text-[#f7f1e8]">
        {/* optional texture */}
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/images/about-hero.jpg"
            alt=""
            fill
            className="object-cover"
          />
        </div>

        <h2 className="relative z-10 font-serif text-2xl">WoodMaps</h2>

        <div className="relative z-10 max-w-md">
          <h1 className="font-serif text-5xl leading-tight mb-6">
            Crafted With <br /> Passion & Precision
          </h1>

          <p className="text-[#f7f1e8]/80 text-lg">
            Bring warmth, travel, and storytelling into your home with
            handcrafted wooden maps designed to last generations.
          </p>
        </div>

        <Link
          href="/"
          className="relative z-10 w-fit px-5 py-2 border border-[#f7f1e8]/30 rounded-full hover:bg-[#3a2418] transition"
        >
          ← Back to website
        </Link>
      </div>

      {/* RIGHT — CREAM */}
      <div className="flex items-center justify-center bg-[#f7f1e8] px-6">
        <div className="w-full max-w-md">
          {/* CARD */}
          <div
            className="
            bg-[#efe6d8]
            p-8
            rounded-2xl
            shadow-sm
            min-h-[520px]
          "
          >
            {/* PREMIUM SWITCH */}
            <div className="mb-8">
              <div className="relative grid grid-cols-2 bg-[#e7dccb] rounded-xl p-1">
                {/* sliding pill */}
                <div
                  className={`
                    absolute top-1 bottom-1 w-1/2 rounded-lg
                    bg-[#f7f1e8]
                    shadow-sm
                    transition-all duration-300
                    ${mode === "login" ? "left-1" : "left-1/2 -translate-x-1"}
                  `}
                />

                <button
                  onClick={() => setMode("login")}
                  className={`relative z-10 py-2 text-sm font-medium ${
                    mode === "login" ? "text-[#2b1a12]" : "text-[#5a3726]/70"
                  }`}
                >
                  Log In
                </button>

                <button
                  onClick={() => setMode("register")}
                  className={`relative z-10 py-2 text-sm font-medium ${
                    mode === "register" ? "text-[#2b1a12]" : "text-[#5a3726]/70"
                  }`}
                >
                  Create Account
                </button>
              </div>
            </div>

            {/* TITLE */}
            <h1 className="font-serif text-3xl text-[#2b1a12] mb-2">
              {mode === "login" ? "Welcome back" : "Create an account"}
            </h1>

            <p className="text-[#5a3726]/70 mb-6">
              {mode === "login"
                ? "Log in to continue your journey."
                : "Join our community and start exploring."}
            </p>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded text-sm">
                  {error}
                </div>
              )}
              
              {mode === "register" && (
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    placeholder="First name"
                    className="bg-[#f7f1e8] border-[#e2d6c6] h-11"
                  />
                  <Input
                    placeholder="Last name"
                    className="bg-[#f7f1e8] border-[#e2d6c6] h-11"
                  />
                </div>
              )}

              <Input
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-[#f7f1e8] border-[#e2d6c6] h-11"
                required
              />

              {/* PASSWORD */}
              <div className="relative">
                <Input
                  type={show ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-[#f7f1e8] border-[#e2d6c6] h-11 pr-10"
                  required
                />

                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5a3726]"
                >
                  {show ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {mode === "register" && (
                <div className="flex items-center gap-2 text-sm text-[#5a3726]">
                  <Checkbox />I agree to the Terms & Conditions
                </div>
              )}

              {/* BUTTON */}
              <Button
                type="submit"
                className="
                w-full
                h-11
                bg-[#5a3726]
                hover:bg-[#3a2418]
                text-white
              "
              >
                {mode === "login" ? "Log In" : "Create Account"}
              </Button>

              {mode === "login" && (
                <div className="bg-blue-50 border border-blue-200 rounded px-3 py-2 text-xs text-blue-800">
                  <p className="font-semibold">Admin Access:</p>
                  <p>Email: admin@woodmaps.com | Password: admin123</p>
                </div>
              )}

              {/* Divider */}
              <div className="flex items-center gap-3 py-3">
                <div className="flex-1 h-px bg-[#d6c6b4]" />
                <span className="text-sm text-[#5a3726]/70">
                  Or continue with
                </span>
                <div className="flex-1 h-px bg-[#d6c6b4]" />
              </div>

              {/* SOCIAL */}
              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  className="border-[#d6c6b4] text-[#2b1a12]"
                >
                  Google
                </Button>

                <Button
                  variant="outline"
                  className="border-[#d6c6b4] text-[#2b1a12]"
                >
                  Apple
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
