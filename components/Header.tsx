"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, ChevronDown, Search, Sparkles } from "lucide-react";

export default function Header() {
  const pathname = usePathname();
  const { language, setLanguage, nav, settings, tContent } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

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
    <>
      <header className="fixed top-0 left-0 right-0 z-50 pt-3 sm:pt-4 px-3 sm:px-4 lg:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className={`relative flex items-center justify-between h-16 sm:h-[68px] rounded-2xl lg:rounded-full px-4 sm:px-6 transition-all duration-500 border ${
              isScrolled
                ? "bg-white/75 backdrop-blur-2xl backdrop-saturate-150 border-white/70 shadow-[0_8px_32px_rgba(0,0,0,0.08)]"
                : "bg-white/90 backdrop-blur-xl border-white/60 shadow-[0_4px_24px_rgba(0,0,0,0.06)]"
            }`}
          >
            {/* Subtle gradient sheen line at top */}
            <div className="absolute inset-x-6 top-0 h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-transparent pointer-events-none" />

            {/* Logo */}
            <Link
              href="/"
              className="flex items-center select-none shrink-0 group relative"
            >
              <div className="relative">
                <img
                  src="/logo.png"
                  alt="অঙ্কুর - Onkur Foundation"
                  className="h-10 sm:h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                />
                {/* Soft glow behind logo on hover */}
                <div className="absolute inset-0 bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav
              className="hidden lg:flex items-center gap-1 xl:gap-2 relative"
              onMouseLeave={() => setHoveredItem(null)}
            >
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                const isHovered = hoveredItem === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onMouseEnter={() => setHoveredItem(item.href)}
                    className="relative px-3.5 xl:px-4 py-2 text-[15px] font-semibold tracking-wide transition-colors duration-200 rounded-full group"
                  >
                    {/* Hover pill background */}
                    <AnimatePresence>
                      {isHovered && (
                        <motion.span
                          layoutId="nav-hover-pill"
                          className="absolute inset-0 bg-primary/10 rounded-full -z-0"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 30,
                          }}
                        />
                      )}
                    </AnimatePresence>

                    <span
                      className={`relative z-10 flex items-center gap-1.5 transition-colors duration-200 ${
                        isActive
                          ? "text-primary"
                          : isHovered
                            ? "text-primary"
                            : "text-secondary"
                      }`}
                    >
                      {tContent(item.labelBn, item.labelEn)}
                      {item.dropdown && (
                        <ChevronDown
                          className={`w-3.5 h-3.5 transition-transform duration-300 ${
                            isHovered ? "rotate-180" : ""
                          }`}
                          strokeWidth={2.5}
                        />
                      )}
                    </span>

                    {/* Active indicator dot */}
                    {isActive && (
                      <motion.span
                        layoutId="nav-active-dot"
                        className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(var(--primary-rgb,34,197,94),0.8)]"
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 30,
                        }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right side: phone, language switch, search */}
            <div className="hidden lg:flex items-center gap-3 xl:gap-4 shrink-0">
              {settings?.phone && (
                <a
                  href={`tel:${settings.phone}`}
                  className="group flex items-center gap-2 text-sm font-semibold tracking-wide text-secondary hover:text-primary transition-colors pl-3 pr-4 py-2 rounded-full hover:bg-primary/5"
                >
                  <span className="w-7 h-7 rounded-full bg-primary/10 group-hover:bg-primary/20 flex items-center justify-center transition-colors">
                    <Phone
                      className="w-3.5 h-3.5 text-primary"
                      strokeWidth={2.5}
                    />
                  </span>
                  <span className="hidden xl:inline">{settings.phone}</span>
                </a>
              )}

              {/* Modern Language Switch */}
              <div className="relative inline-flex items-center p-1 rounded-full bg-secondary/[0.06] border border-black/5 h-9">
                <button
                  onClick={() => setLanguage("en")}
                  className={`relative z-10 px-3.5 h-7 rounded-full text-xs font-bold tracking-wide transition-colors duration-200 ${
                    language === "en"
                      ? "text-white"
                      : "text-secondary/70 hover:text-secondary"
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => setLanguage("bn")}
                  className={`relative z-10 px-3.5 h-7 rounded-full text-xs font-bold tracking-wide transition-colors duration-200 ${
                    language === "bn"
                      ? "text-white"
                      : "text-secondary/70 hover:text-secondary"
                  }`}
                >
                  বাং
                </button>
                <motion.div
                  className="absolute top-1 bottom-1 rounded-full bg-gradient-to-r from-primary to-emerald-500 shadow-md shadow-primary/30"
                  initial={false}
                  animate={{
                    left: language === "en" ? 4 : "50%",
                    width: "calc(50% - 4px)",
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              </div>

              {/* CTA button */}
              <Link
                href="/contact"
                className="relative group overflow-hidden rounded-full bg-primary text-white text-sm font-semibold px-5 py-2.5 shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5"
              >
                <span className="relative z-10 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  {tContent("যোগ দিন", "Join Us")}
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-primary to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
            </div>

            {/* Mobile Actions */}
            <div className="flex lg:hidden items-center gap-2">
              {/* Compact language toggle */}
              <button
                onClick={() => setLanguage(language === "bn" ? "en" : "bn")}
                className="relative flex items-center bg-secondary/[0.06] border border-black/5 rounded-full h-9 p-1"
                aria-label="Toggle language"
              >
                <span
                  className={`px-3 h-7 rounded-full text-xs font-bold flex items-center transition-colors ${
                    language === "en"
                      ? "bg-gradient-to-r from-primary to-emerald-500 text-white shadow-sm"
                      : "text-secondary/70"
                  }`}
                >
                  EN
                </span>
                <span
                  className={`px-3 h-7 rounded-full text-xs font-bold flex items-center transition-colors ${
                    language === "bn"
                      ? "bg-gradient-to-r from-primary to-emerald-500 text-white shadow-sm"
                      : "text-secondary/70"
                  }`}
                >
                  বাং
                </span>
              </button>

              {/* Menu toggle with morph animation */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="relative w-10 h-10 rounded-full bg-secondary/[0.06] hover:bg-primary/10 flex items-center justify-center focus:outline-none transition-colors"
                aria-label="Toggle Menu"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {mobileMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="w-5 h-5 text-secondary" strokeWidth={2.5} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu
                        className="w-5 h-5 text-secondary"
                        strokeWidth={2.5}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Mobile Drawer — full screen overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
            />

            {/* Drawer */}
            <motion.div
              initial={{ y: "-100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "-100%", opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 left-0 right-0 z-50 lg:hidden bg-white rounded-b-3xl shadow-2xl pt-24 pb-8 px-5 max-h-[90vh] overflow-y-auto"
            >
              {/* Decorative gradient blob */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-400/10 rounded-full blur-3xl -z-10" />

              <nav className="space-y-1.5">
                {navItems.map((item, idx) => {
                  const isActive = pathname === item.href;
                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.04 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`group flex items-center justify-between px-4 py-3.5 rounded-2xl text-base font-semibold transition-all ${
                          isActive
                            ? "bg-gradient-to-r from-primary to-emerald-500 text-white shadow-lg shadow-primary/25"
                            : "text-secondary hover:bg-secondary/[0.05]"
                        }`}
                      >
                        <span>{tContent(item.labelBn, item.labelEn)}</span>
                        {item.dropdown ? (
                          <ChevronDown className="w-4 h-4" />
                        ) : (
                          <span
                            className={`text-xs transition-transform group-hover:translate-x-1 ${
                              isActive ? "text-white/70" : "text-secondary/30"
                            }`}
                          >
                            →
                          </span>
                        )}
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              {/* Contact CTA in drawer */}
              {settings?.phone && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mt-6 pt-5 border-t border-black/5"
                >
                  <a
                    href={`tel:${settings.phone}`}
                    className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl bg-secondary text-white font-semibold hover:bg-secondary/90 transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    {settings.phone}
                  </a>
                </motion.div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
