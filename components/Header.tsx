"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Sparkles } from "lucide-react";

export default function Header() {
  const pathname = usePathname();
  const { language, setLanguage, nav, settings, tContent } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

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

  // Your exact nav items
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
      <header
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.06)]`}
      >
        <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14">
          {/* ============ OUTER ROW: Left column (Logo, full-height, vertically centered) + Right column (CTA row stacked on Nav row) ============ */}
          <div
            className={`flex items-stretch transition-all duration-300 ${
              isScrolled
                ? "min-h-12 sm:min-h-14 lg:min-h-16"
                : "min-h-14 sm:min-h-16 lg:min-h-[72px]"
            }`}
          >
            {/* Left column: Logo — vertically centered across the FULL header height (both rows) */}
            <div className="flex items-center shrink-0 pr-6 xl:pr-10">
              <Link
                href="/"
                className="flex items-center select-none group relative"
              >
                <div className="relative flex items-center">
                  <img
                    src="/logo.png"
                    alt="অঙ্কুর - Onkur Foundation"
                    className={`w-auto object-contain transition-all duration-300 group-hover:scale-105 ${
                      isScrolled ? "h-8 sm:h-9 lg:h-10" : "h-12 sm:h-15 lg:h-17"
                    }`}
                  />
                  <div className="absolute inset-0 bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                </div>
              </Link>
            </div>

            {/* Right column: everything else stacked — CTA row on top, Nav row below */}
            <div className="flex flex-col flex-1 min-w-0">
              {/* Right column - Row 1: Phone / Language / CTA button (stays visible on scroll) */}
              <div
                className={`hidden lg:flex items-center justify-end gap-3 xl:gap-4 transition-all duration-300 ${
                  isScrolled
                    ? "h-12 sm:h-14 lg:h-16"
                    : "h-14 sm:h-16 lg:h-[72px]"
                }`}
              >
                {settings?.phone && (
                  <a
                    href={`tel:${settings.phone}`}
                    className="group flex items-center gap-1.5 text-xs xl:text-sm font-semibold tracking-wide text-secondary hover:text-primary transition-colors px-3 py-1.5 rounded-full hover:bg-primary/5"
                  >
                    <span className="w-6 h-6 rounded-full bg-primary/10 group-hover:bg-primary/20 flex items-center justify-center transition-colors">
                      <Phone
                        className="w-3 h-3 text-primary"
                        strokeWidth={2.5}
                      />
                    </span>
                    <span>{settings.phone}</span>
                  </a>
                )}

                {/* Language Switch Pill */}
                <div className="relative inline-flex items-center p-1 rounded-full bg-secondary/[0.06] border border-black/5 h-8">
                  <button
                    onClick={() => setLanguage("en")}
                    className={`relative z-10 px-3 h-6 rounded-full text-xs font-bold tracking-wide transition-colors duration-200 ${
                      language === "en"
                        ? "text-white"
                        : "text-secondary/70 hover:text-secondary"
                    }`}
                  >
                    EN
                  </button>
                  <button
                    onClick={() => setLanguage("bn")}
                    className={`relative z-10 px-3 h-6 rounded-full text-xs font-bold tracking-wide transition-colors duration-200 ${
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

                {/* CTA Button */}
                <Link
                  href="/contact"
                  className="relative group overflow-hidden rounded-full bg-primary text-white text-xs xl:text-sm font-semibold px-4 py-2 shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5"
                >
                  <span className="relative z-10 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    {tContent("যোগ দিন", "Join Us")}
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-primary to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
              </div>

              {/* Mobile actions (shown only below lg, sits in the right column's row-1 slot) */}
              <div className="flex lg:hidden items-center justify-end gap-2 h-14 sm:h-16">
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
                        <X
                          className="w-5 h-5 text-secondary"
                          strokeWidth={2.5}
                        />
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

              {/* Right column - Row 2: Nav links (collapses and hides on scroll) */}
              <div
                className={`hidden lg:block overflow-hidden transition-all duration-300 ease-in-out border-t border-black/5 ${
                  isScrolled
                    ? "max-h-0 opacity-0 py-0 border-transparent"
                    : "max-h-12 opacity-100 py-2"
                }`}
              >
                <nav
                  className="flex items-center justify-end gap-5 xl:gap-7"
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
                        className="relative py-1 group"
                      >
                        <span
                          className={`flex items-center gap-1 text-sm font-medium tracking-wide transition-colors duration-200 ${
                            isActive
                              ? "text-primary font-semibold"
                              : isHovered
                                ? "text-primary"
                                : "text-secondary"
                          }`}
                        >
                          {tContent(item.labelBn, item.labelEn)}
                          <span className="text-sm font-light text-secondary/50 group-hover:text-primary transition-colors">
                            +
                          </span>
                        </span>

                        {isActive && (
                          <motion.span
                            layoutId="nav-active-underline"
                            className="absolute left-0 right-0 -bottom-1 h-[2px] bg-primary rounded-full"
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
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Dynamic spacer matching header height states */}
      <div
        className={`transition-all duration-300 ${
          isScrolled
            ? "h-12 sm:h-14 lg:h-16"
            : "h-[88px] sm:h-[100px] lg:h-[112px]"
        }`}
      />

      {/* ================= Mobile Drawer ================= */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
            />

            <motion.div
              initial={{ y: "-100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "-100%", opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 left-0 right-0 z-50 lg:hidden bg-white shadow-2xl pt-24 pb-8 px-5 max-h-[90vh] overflow-y-auto"
            >
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
                            ? "bg-primary text-white shadow-lg shadow-primary/25"
                            : "text-secondary hover:bg-secondary/[0.05]"
                        }`}
                      >
                        <span>{tContent(item.labelBn, item.labelEn)}</span>
                        <span className="text-xl font-light">+</span>
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

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
