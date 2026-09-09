"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Search, ChevronDown } from "lucide-react";

export default function Header() {
  const pathname = usePathname();
  const { language, setLanguage, nav, settings, tContent } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Set `dropdown: true` on any item that should show a chevron (e.g. has sub-links)
  const navItems = [
    {
      href: "/",
      labelBn: nav?.home_bn || "হোম",
      labelEn: nav?.home_en || "Home",
    },
    {
      href: "/about",
      labelBn: nav?.about_bn || "আমাদের সম্পর্কে",
      labelEn: nav?.about_en || "About Us",
    },
    {
      href: "/services",
      labelBn: nav?.services_bn || "সেবাসমূহ",
      labelEn: nav?.services_en || "Services",
      dropdown: true,
    },
    {
      href: "/team",
      labelBn: nav?.team_bn || "আমাদের দল",
      labelEn: nav?.team_en || "Team",
    },
    {
      href: "/blog",
      labelBn: nav?.blog_bn || "ব্লগ",
      labelEn: nav?.blog_en || "Blog",
    },
    {
      href: "/career",
      labelBn: nav?.career_bn || "ক্যারিয়ার",
      labelEn: nav?.career_en || "Careers",
    },
    {
      href: "/contact",
      labelBn: nav?.contact_bn || "যোগাযোগ",
      labelEn: nav?.contact_en || "Contact",
    },
  ];

  return (
    <header className="fixed top-4 left-0 right-0 z-50 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div
          className={`flex items-center justify-between h-16 sm:h-[72px] rounded-full px-4 sm:px-6 border transition-all duration-300 ${
            isScrolled
              ? "bg-white/70 backdrop-blur-2xl backdrop-saturate-150 border-white/60 shadow-lg shadow-black/10"
              : "bg-white/95 backdrop-blur-md border-black/5 shadow-lg shadow-black/10"
          }`}
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center select-none shrink-0 group"
          >
            <img
              src="/logo.png"
              alt="অঙ্কুর - Onkur Foundation"
              className="h-10 sm:h-11 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-7 xl:gap-9">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-1.5 text-base font-semibold tracking-wide transition-colors duration-200 ${isScrolled ? "text-secondary hover:text-primary" : "hover:text-primary"} ${
                    isActive
                      ? "text-primary"
                      : isScrolled
                        ? "text-secondary"
                        : "text-secondary"
                  }`}
                >
                  {tContent(item.labelBn, item.labelEn)}
                  {item.dropdown && (
                    <ChevronDown className="w-3.5 h-3.5" strokeWidth={2.5} />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right side: search, phone, language pill */}
          <div className="hidden lg:flex items-center gap-5 xl:gap-6 shrink-0">
            {settings?.phone && (
              <a
                href={`tel:${settings.phone}`}
                className={`flex items-center text-sm font-semibold tracking-wider transition-colors ${
                  isScrolled
                    ? "text-secondary hover:text-primary"
                    : "text-secondary hover:text-primary"
                }`}
              >
                <Phone className="w-3.5 h-3.5 mr-1.5" />
                {settings.phone}
              </a>
            )}

            {/* Pill language switch (Nagad-style) */}
            <div className="relative inline-flex items-center bg-white/15 p-1 rounded-full h-10">
              <button
                onClick={() => setLanguage("en")}
                className={`relative z-10 px-4 h-8 rounded-full text-sm font-bold transition-colors duration-200 ${
                  language === "en" ? "text-white" : "text-secondary"
                }`}
              >
                English
              </button>
              <button
                onClick={() => setLanguage("bn")}
                className={`relative z-10 px-4 h-8 rounded-full text-sm font-bold transition-colors duration-200 ${
                  language === "bn" ? "text-white" : "text-secondary"
                }`}
              >
                বাংলা
              </button>
              <motion.div
                className="absolute top-1 bottom-1 rounded-full bg-primary"
                initial={false}
                animate={{
                  left: language === "en" ? 4 : "50%",
                  width: "calc(50% - 4px)",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              />
            </div>
          </div>

          {/* Mobile Menu Action & Language Toggle */}
          <div className="flex lg:hidden items-center space-x-3">
            <button
              onClick={() => setLanguage(language === "bn" ? "en" : "bn")}
              className="bg-[#F1F1F1] hover:bg-primary hover:text-white text-secondary font-bold px-3 py-1.5 rounded-full text-xs transition-colors duration-200"
            >
              {language === "bn" ? "EN" : "বাং"}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="focus:outline-none text-secondary"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Drawer Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className={`lg:hidden rounded-3xl backdrop-blur-xl shadow-lg mt-2 overflow-hidden border ${
                isScrolled
                  ? "bg-white/70 backdrop-blur-2xl backdrop-saturate-150 border-white/60 shadow-black/10"
                  : "bg-white/95 shadow-black/10 border-black/5"
              }`}
            >
              <div className="px-4 pt-3 pb-5 space-y-2">
                {navItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-base font-medium transition-colors ${
                        isActive
                          ? "bg-primary text-white"
                          : "text-secondary hover:bg-[#F1F1F1]"
                      }`}
                    >
                      {tContent(item.labelBn, item.labelEn)}
                      {item.dropdown && <ChevronDown className="w-4 h-4" />}
                    </Link>
                  );
                })}
                {settings?.phone && (
                  <div className="pt-3 border-t border-black/10 px-3 flex items-center text-sm font-semibold tracking-wider text-secondary">
                    <Phone className="w-4 h-4 mr-2 text-primary" />
                    <a href={`tel:${settings.phone}`}>{settings.phone}</a>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
