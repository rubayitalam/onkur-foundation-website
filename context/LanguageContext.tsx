"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "@/lib/firebase";
import bn from "../locales/bn.json";
import en from "../locales/en.json";

type Language = "bn" | "en";

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  tContent: <T>(bnVal: T, enVal: T) => T;
  nav: any;
  settings: any;
  footerContent: any;
  dbLoading: boolean;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

const dictionaries = { bn, en };

const defaultNav = {
  home_bn: "হোম", home_en: "Home",
  about_bn: "আমাদের সম্পর্কে", about_en: "About Us",
  services_bn: "সেবাসমূহ", services_en: "Services",
  team_bn: "আমাদের দল", team_en: "Team",
  blog_bn: "ব্লগ", blog_en: "Blog",
  career_bn: "ক্যারিয়ার", career_en: "Careers",
  faq_bn: "সাধারণ জিজ্ঞাসা", faq_en: "FAQ",
  contact_bn: "যোগাযোগ", contact_en: "Contact"
};

const defaultSettings = {
  phone: "+8802226617258",
  email: "info@onkur.net",
  address_bn: "নাভানা সিলভানিয়া (৫ম তলা), হোল্ডিং নং- কা-৬/এ, নদ্দা, গুলশান, ঢাকা, বাংলাদেশ",
  address_en: "Navana Sylvania (4th Floor), Holding No- Ka-6/A, Nodda, Gulshan, Dhaka, Bangladesh",
  facebookUrl: "https://www.facebook.com/share/18Z1c45wGT/"
};

const defaultFooter = {
  tagline_bn: "অঙ্কুর – আশা জাগানো, জীবন গড়া। ক্ষুদ্র ঋণ, বড় পরিবর্তন।",
  tagline_en: "Onkur – Growing Hope, Empowering Lives. Small Loans. Big Change.",
  quickLinks: [
    { label_bn: "হোম", label_en: "Home", url: "/" },
    { label_bn: "আমাদের সম্পর্কে", label_en: "About Us", url: "/about" },
    { label_bn: "সেবাসমূহ", label_en: "Services", url: "/services" },
    { label_bn: "আমাদের দল", label_en: "Team", url: "/team" },
    { label_bn: "ব্লগ", label_en: "Blog", url: "/blog" },
    { label_bn: "ক্যারিয়ার", label_en: "Careers", url: "/career" },
    { label_bn: "যোগাযোগ", label_en: "Contact", url: "/contact" }
  ],
  copyrightText_bn: "© ২০২৬ অঙ্কুর ফাউন্ডেশন। সর্বস্বত্ব সংরক্ষিত।",
  copyrightText_en: "© 2026 Onkur Foundation. All Rights Reserved."
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>("bn");
  const [mounted, setMounted] = useState(false);
  const [nav, setNav] = useState<any>(defaultNav);
  const [settings, setSettings] = useState<any>(defaultSettings);
  const [footerContent, setFooterContent] = useState<any>(defaultFooter);
  const [dbLoading, setDbLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("onkur_lang") as Language;
    if (saved === "bn" || saved === "en") {
      setLanguageState(saved);
    } else {
      localStorage.setItem("onkur_lang", "bn");
    }
    setMounted(true);

    // Fetch dynamic configs from RTDB
    const navRef = ref(db, "siteContent/nav");
    const settingsRef = ref(db, "settings");
    const footerRef = ref(db, "siteContent/footer");

    let loadedCount = 0;
    const checkLoaded = () => {
      loadedCount++;
      if (loadedCount >= 3) {
        setDbLoading(false);
      }
    };

    const unsubNav = onValue(navRef, (snapshot) => {
      const val = snapshot.val();
      if (val) setNav(val);
      checkLoaded();
    }, () => checkLoaded());

    const unsubSettings = onValue(settingsRef, (snapshot) => {
      const val = snapshot.val();
      if (val) setSettings(val);
      checkLoaded();
    }, () => checkLoaded());

    const unsubFooter = onValue(footerRef, (snapshot) => {
      const val = snapshot.val();
      if (val) setFooterContent(val);
      checkLoaded();
    }, () => checkLoaded());

    return () => {
      unsubNav();
      unsubSettings();
      unsubFooter();
    };
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("onkur_lang", lang);
  };

  const t = (key: string): string => {
    const keys = key.split(".");
    let current: any = dictionaries[language];
    for (const k of keys) {
      if (current && typeof current === "object" && k in current) {
        current = current[k];
      } else {
        return key;
      }
    }
    return typeof current === "string" ? current : key;
  };

  const tContent = <T,>(bnVal: T, enVal: T): T => {
    return language === "bn" ? bnVal : enVal;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, tContent, nav, settings, footerContent, dbLoading }}>
      <div
        className={mounted ? (language === "bn" ? "font-bengali" : "font-english") : "font-bengali"}
        style={{ visibility: mounted ? "visible" : "hidden" }}
      >
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
