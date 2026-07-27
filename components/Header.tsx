"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";

export default function Header() {
  const pathname = usePathname();
  const { language, setLanguage, nav, settings, tContent } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { href: "/", labelBn: nav?.home_bn || "হোম", labelEn: nav?.home_en || "Home" },
    { href: "/about", labelBn: nav?.about_bn || "আমাদের সম্পর্কে", labelEn: nav?.about_en || "About Us" },
    { href: "/services", labelBn: nav?.services_bn || "সেবাসমূহ", labelEn: nav?.services_en || "Services" },
    { href: "/team", labelBn: nav?.team_bn || "আমাদের দল", labelEn: nav?.team_en || "Team" },
    { href: "/blog", labelBn: nav?.blog_bn || "ব্লগ", labelEn: nav?.blog_en || "Blog" },
    { href: "/career", labelBn: nav?.career_bn || "ক্যারিয়ার", labelEn: nav?.career_en || "Careers" },
    { href: "/contact", labelBn: nav?.contact_bn || "যোগাযোগ", labelEn: nav?.contact_en || "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#1F4A3D]/95 backdrop-blur-md text-[#FBF6EE] border-b border-[#FBF6EE]/10 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo / Org Name */}
          <Link href="/" className="flex flex-col select-none shrink-0 pr-4">
            <span className="text-2xl font-bold tracking-tight text-[#C9973B]">অঙ্কুর</span>
            <span className="text-xs uppercase tracking-widest text-[#FBF6EE] font-semibold">Onkur Foundation</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-4 xl:space-x-8">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative text-sm font-medium tracking-wide transition-colors duration-200 hover:text-[#C9973B] ${
                    isActive ? "text-[#C9973B]" : "text-[#FBF6EE]"
                  }`}
                >
                  {tContent(item.labelBn, item.labelEn)}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#C9973B]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Top Bar Right: Phone and Language Toggle */}
          <div className="hidden lg:flex items-center space-x-4 xl:space-x-6">
            {settings?.phone && (
              <a
                href={`tel:${settings.phone}`}
                className="flex items-center text-xs font-semibold tracking-wider text-[#FBF6EE] hover:text-[#C9973B] transition-colors shrink-0"
              >
                <Phone className="w-3.5 h-3.5 mr-1.5 text-[#C9973B]" />
                {settings.phone}
              </a>
            )}

            {/* Premium i18n Sliding Switch */}
            <div className="relative inline-flex items-center bg-[#15342b] p-1 rounded-full cursor-pointer w-24 h-9 shrink-0">
              <div
                onClick={() => setLanguage("bn")}
                className="flex-1 text-center text-xs font-bold z-10 select-none text-white transition-opacity duration-200"
              >
                বাং
              </div>
              <div
                onClick={() => setLanguage("en")}
                className="flex-1 text-center text-xs font-bold z-10 select-none text-white transition-opacity duration-200"
              >
                EN
              </div>
              <motion.div
                className="absolute top-1 left-1 bottom-1 w-[44px] bg-[#C65D2E] rounded-full"
                animate={{
                  x: language === "bn" ? 0 : 44,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              />
            </div>
          </div>

          {/* Mobile Menu Action & Language Toggle */}
          <div className="flex lg:hidden items-center space-x-4">
            {/* Simple Small Lang Switcher */}
            <button
              onClick={() => setLanguage(language === "bn" ? "en" : "bn")}
              className="bg-[#15342b] hover:bg-[#C65D2E] text-[#FBF6EE] font-bold px-3 py-1 rounded-full text-xs transition-colors duration-200"
            >
              {language === "bn" ? "EN" : "বাং"}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-[#FBF6EE] focus:outline-none"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#1F4A3D] border-t border-[#FBF6EE]/10 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-3">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-3 py-2.5 rounded-md text-base font-medium transition-colors ${
                      isActive
                        ? "bg-[#C65D2E] text-white"
                        : "text-[#FBF6EE] hover:bg-[#15342b] hover:text-[#C9973B]"
                    }`}
                  >
                    {tContent(item.labelBn, item.labelEn)}
                  </Link>
                );
              })}
              {settings?.phone && (
                <div className="pt-4 border-t border-[#FBF6EE]/10 px-3 flex items-center text-sm font-semibold tracking-wider text-[#FBF6EE]">
                  <Phone className="w-4 h-4 mr-2 text-[#C9973B]" />
                  <a href={`tel:${settings.phone}`}>{settings.phone}</a>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
