"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useLanguage } from "@/context/LanguageContext";
import { Lock, Mail, Loader2 } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const { tContent } = useLanguage();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("/admin/dashboard");
      } else {
        setCheckingAuth(false);
      }
    });
    return () => unsub();
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/admin/dashboard");
    } catch (err: any) {
      setError(err.message || "Invalid credentials. Please try again.");
      setLoading(false);
    }
  };

  if (checkingAuth) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#FBF6EE]">
        <Loader2 className="w-8 h-8 text-[#1F4A3D] animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-[#FBF6EE] px-4 py-16">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-[#1F4A3D]/5 shadow-lg space-y-6">
        
        <div className="text-center space-y-2">
          <div className="bg-[#1F4A3D]/5 text-[#C65D2E] p-4 rounded-full inline-block">
            <Lock className="w-8 h-8 text-[#C65D2E]" />
          </div>
          <h1 className="text-2xl font-bold text-[#1F4A3D]">
            {tContent("অঙ্কুর অ্যাডমিন প্যানেল", "Onkur Admin Portal")}
          </h1>
          <p className="text-xs text-[#2B2621] font-normal uppercase tracking-wider">
            {tContent("অনুমোদিত ব্যক্তিদের জন্য লগইন", "Authorized Personnel Only")}
          </p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 text-sm p-4 rounded-md border border-red-100 font-light">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold uppercase text-[#2B2621] block">
              {tContent("ইমেইল ঠিকানা", "Email Address")}
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-[#2B2621]">
                <Mail className="w-4 h-4" />
              </span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@onkur.net"
                className="w-full pl-10 pr-4 py-3 bg-[#FBF6EE]/40 border border-[#1F4A3D]/10 rounded-lg focus:outline-none focus:border-[#C65D2E] text-sm"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold uppercase text-[#2B2621] block">
              {tContent("পাসওয়ার্ড", "Password")}
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-[#2B2621]">
                <Lock className="w-4 h-4" />
              </span>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 bg-[#FBF6EE]/40 border border-[#1F4A3D]/10 rounded-lg focus:outline-none focus:border-[#C65D2E] text-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#1F4A3D] hover:bg-[#15342b] text-white py-3.5 rounded-lg text-sm font-semibold tracking-wide shadow-sm transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>{tContent("লগইন করা হচ্ছে...", "Logging in...")}</span>
              </>
            ) : (
              <span>{tContent("লগইন করুন", "Login")}</span>
            )}
          </button>
        </form>

        <div className="text-center pt-2">
          <Link href="/" className="text-xs text-[#C65D2E] hover:underline font-light">
            {tContent("মূল ওয়েবসাইটে ফিরে যান", "Back to Home Page")}
          </Link>
        </div>

      </div>
    </div>
  );
}
