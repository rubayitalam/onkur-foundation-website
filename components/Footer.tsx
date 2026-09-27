"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { Mail, MapPin, Phone, ArrowUpRight } from "lucide-react";

export default function Footer() {
  const pathname = usePathname();

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const { footerContent, settings, tContent } = useLanguage();

  return (
    <footer className="relative overflow-hidden border-t border-secondary/10 bg-white">
      {/* Decorative background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -right-32 top-20 h-96 w-96 rounded-full bg-secondary/5 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* =========================
            CTA / BRAND AREA
        ========================== */}
        <div className="py-8 sm:py-10 lg:py-12">
          <div className="relative overflow-hidden rounded-3xl bg-secondary px-5 py-7 shadow-[0_20px_60px_rgba(0,0,0,0.08)] sm:px-8 sm:py-9 lg:px-10">
            {/* CTA decorative circles */}
            <div className="pointer-events-none absolute -right-16 -top-20 h-48 w-48 rounded-full bg-primary/20 blur-2xl" />
            <div className="pointer-events-none absolute -bottom-24 left-1/3 h-52 w-52 rounded-full bg-white/5 blur-2xl" />

            <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              {/* Logo + message */}
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-5">
                <Link
                  href="/"
                  className="group flex h-14 w-fit shrink-0 items-center rounded-2xl bg-white px-4 shadow-sm transition-transform duration-300 hover:-translate-y-1"
                >
                  <img
                    src="/logo.png"
                    alt="অঙ্কুর - Onkur Foundation"
                    className="h-9 w-auto object-contain"
                  />
                </Link>

                <div>
                  <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-white/50">
                    {tContent("অঙ্কুর ফাউন্ডেশন", "Onkur Foundation")}
                  </p>

                  <h2 className="text-xl font-bold leading-tight text-white sm:text-2xl">
                    {tContent(
                      "আপনার স্বপ্নকে এগিয়ে নিতে আমরা পাশে আছি।",
                      "Helping you move your dreams forward.",
                    )}
                  </h2>
                </div>
              </div>

              {/* CTA */}
              <Link
                href="/contact"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-black/10 transition-all duration-300 hover:-translate-y-0.5 hover:opacity-90 sm:w-fit"
              >
                {tContent("আবেদন করুন", "Apply Now")}

                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* =========================
            MAIN FOOTER
        ========================== */}
        <div className="grid gap-10 pb-10 pt-2 md:grid-cols-2 lg:grid-cols-[1.15fr_0.8fr_1fr] lg:gap-16 lg:pb-12">
          {/* Brand / About */}
          <div>
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-secondary/10 bg-white shadow-sm">
                <img
                  src="/logo.png"
                  alt="Onkur Foundation"
                  className="max-h-7 w-auto object-contain"
                />
              </div>

              <div>
                <h3 className="text-base font-bold text-secondary">
                  {tContent("অঙ্কুর ফাউন্ডেশন", "Onkur Foundation")}
                </h3>

                <p className="text-xs text-secondary/50">
                  {tContent(
                    "আর্থিক অগ্রগতির বিশ্বস্ত সঙ্গী",
                    "A trusted partner for financial growth",
                  )}
                </p>
              </div>
            </div>

            <p className="max-w-md text-sm leading-7 text-secondary/65">
              {tContent(
                "সহজ শর্তে ক্ষুদ্র ঋণের মাধ্যমে ব্যক্তি ও পরিবারের আর্থিক অগ্রগতিতে সহায়তা করছি।",
                "Supporting individuals and families through accessible microfinance and meaningful financial opportunities.",
              )}
            </p>

            {/* Social */}
            {settings?.facebookUrl && (
              <div className="mt-6">
                <a
                  href={settings.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="group flex h-10 w-10 items-center justify-center rounded-full border border-secondary/10 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:bg-primary"
                >
                  <svg
                    className="h-4 w-4 fill-secondary transition-colors group-hover:fill-white"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
                  </svg>
                </a>
              </div>
            )}
          </div>

          {/* Quick Links */}
          <div>
            <div className="mb-5">
              <span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
                {tContent("নেভিগেশন", "Navigation")}
              </span>

              <h3 className="text-base font-bold text-secondary">
                {tContent("দ্রুত লিংক", "Quick Links")}
              </h3>
            </div>

            <ul className="grid grid-cols-2 gap-x-5 gap-y-3">
              {(footerContent?.quickLinks || []).map(
                (link: any, index: number) => (
                  <li key={index}>
                    <Link
                      href={link.url}
                      className="group inline-flex items-center gap-1.5 text-sm text-secondary/65 transition-colors duration-200 hover:text-primary"
                    >
                      <span className="h-1 w-1 rounded-full bg-secondary/20 transition-colors group-hover:bg-primary" />

                      {tContent(link.label_bn, link.label_en)}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <div className="mb-5">
              <span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
                {tContent("যোগাযোগ", "Contact")}
              </span>

              <h3 className="text-base font-bold text-secondary">
                {tContent("যোগাযোগ করুন", "Get In Touch")}
              </h3>
            </div>

            <ul className="space-y-4">
              {/* Address */}
              <li className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                  <MapPin className="h-4 w-4 text-primary" />
                </div>

                <span className="pt-1 text-sm leading-6 text-secondary/65">
                  {tContent(settings?.address_bn, settings?.address_en)}
                </span>
              </li>

              {/* Phone */}
              {settings?.phone && (
                <li className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                    <Phone className="h-4 w-4 text-primary" />
                  </div>

                  <a
                    href={`tel:${settings.phone}`}
                    className="text-sm text-secondary/65 transition-colors hover:text-primary"
                  >
                    {settings.phone}
                  </a>
                </li>
              )}

              {/* Email */}
              {settings?.email && (
                <li className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                    <Mail className="h-4 w-4 text-primary" />
                  </div>

                  <a
                    href={`mailto:${settings.email}`}
                    className="break-all text-sm text-secondary/65 transition-colors hover:text-primary"
                  >
                    {settings.email}
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* =========================
            BOTTOM BAR
        ========================== */}
        <div className="border-t border-secondary/10 py-5">
          <div className="flex flex-col gap-3 text-center text-xs text-secondary/50 sm:flex-row sm:items-center sm:justify-between sm:text-left">
            <p>
              {tContent(
                footerContent?.copyrightText_bn ||
                  "© ২০২৬ অঙ্কুর ফাউন্ডেশন। সর্বস্বত্ব সংরক্ষিত।",
                footerContent?.copyrightText_en ||
                  "© 2026 Onkur Foundation. All Rights Reserved.",
              )}
            </p>

            <Link
              href="/admin"
              className="font-medium transition-colors hover:text-primary hover:underline"
            >
              {tContent("প্রশাসক লগইন", "Admin Login")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
