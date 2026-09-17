"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ref, onValue } from "firebase/database";
import { db } from "@/lib/firebase";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import hero2 from "../public/hero2.png";
import {
  Sprout,
  Store,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Coins,
  PiggyBank,
  HeartHandshake,
} from "lucide-react";
import StatCounter from "@/components/StatCounter";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import PhotoMarquee from "@/components/PhotoMarquee";

export default function HomePage() {
  const { language, tContent, t } = useLanguage();
  const [homeData, setHomeData] = useState<any>(null);
  const [stats, setStats] = useState<any>(null);
  const [team, setTeam] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [activeWhy, setActiveWhy] = useState(0);

  const [activeTab, setActiveTab] = useState<"mission" | "vision" | "values">(
    "mission",
  );

  useEffect(() => {
    const homeRef = ref(db, "siteContent/home");
    const statsRef = ref(db, "stats");
    const teamRef = ref(db, "team");
    const testRef = ref(db, "testimonials");
    const blogRef = ref(db, "blog");

    let loaded = 0;
    const checkAllLoaded = () => {
      loaded++;
      if (loaded >= 5) setLoading(false);
    };

    const unsubHome = onValue(
      homeRef,
      (snap) => {
        setHomeData(snap.val());
        checkAllLoaded();
      },
      () => checkAllLoaded(),
    );

    const unsubStats = onValue(
      statsRef,
      (snap) => {
        setStats(snap.val());
        checkAllLoaded();
      },
      () => checkAllLoaded(),
    );

    const unsubTeam = onValue(
      teamRef,
      (snap) => {
        const val = snap.val();
        if (val) {
          const arr = Object.keys(val)
            .map((k) => ({ id: k, ...val[k] }))
            .sort((a, b) => (a.order || 0) - (b.order || 0))
            .slice(0, 3);
          setTeam(arr);
        }
        checkAllLoaded();
      },
      () => checkAllLoaded(),
    );

    const unsubTest = onValue(
      testRef,
      (snap) => {
        const val = snap.val();
        if (val) {
          const arr = Object.keys(val)
            .map((k) => ({ id: k, ...val[k] }))
            .sort((a, b) => (a.order || 0) - (b.order || 0));
          setTestimonials(arr);
        }
        checkAllLoaded();
      },
      () => checkAllLoaded(),
    );

    const unsubBlog = onValue(
      blogRef,
      (snap) => {
        const val = snap.val();
        if (val) {
          const arr = Object.keys(val)
            .map((k) => ({ id: k, ...val[k] }))
            .sort(
              (a, b) =>
                new Date(b.publishedAt).getTime() -
                new Date(a.publishedAt).getTime(),
            )
            .slice(0, 2);
          setBlogPosts(arr);
        }
        checkAllLoaded();
      },
      () => checkAllLoaded(),
    );

    return () => {
      unsubHome();
      unsubStats();
      unsubTeam();
      unsubTest();
      unsubBlog();
    };
  }, []);

  const defaultMissionBullets = [
    {
      text_bn: "স্বচ্ছ ও ন্যায্য ক্ষুদ্রঋণ প্রদান",
      text_en: "Provide fair and transparent microloans",
    },
    {
      text_bn: "নারী ও গ্রামীণ পরিবারের ক্ষমতায়ন",
      text_en: "Empower women and rural families",
    },
    {
      text_bn: "কৃষক ও ক্ষুদ্র ব্যবসায়ীদের সহায়তা",
      text_en: "Support farmers and small businesses",
    },
    { text_bn: "আর্থিক সচেতনতা বৃদ্ধি", text_en: "Promote financial literacy" },
    {
      text_bn: "প্রতিটি সম্পদকে কমিউনিটির কল্যাণে পুনঃবিনিয়োগ",
      text_en: "Reinvest every resource into communities",
    },
  ];

  const defaultVisionBullets = [
    {
      text_bn: "সকলের জন্য আর্থিক অন্তর্ভুক্তির বাংলাদেশ",
      text_en: "A Bangladesh with financial inclusion for all",
    },
    {
      text_bn: "মর্যাদার সাথে স্বাবলম্বী সমাজ",
      text_en: "Communities thriving with dignity",
    },
    {
      text_bn: "সামাজিক পরিবর্তনে নারীদের নেতৃত্ব",
      text_en: "Women leading social transformation",
    },
    {
      text_bn: "উন্নত কৃষি ও গ্রামীণ উদ্যোগ",
      text_en: "Stronger agriculture and rural enterprises",
    },
    {
      text_bn: "টেকসই প্রবৃদ্ধির মাধ্যমে দারিদ্র্য বিমোচন",
      text_en: "Poverty reduced through sustainable growth",
    },
  ];

  const defaultValuesBullets = [
    { text_bn: "প্রতিটি কাজে সততা", text_en: "Integrity in every action" },
    {
      text_bn: "মানুষ ও নতুন ধারণার ক্ষমতায়ন",
      text_en: "Empowerment of people and ideas",
    },
    {
      text_bn: "সুবিধাবঞ্চিতদের জন্য সমতা ও অন্তর্ভুক্তি",
      text_en: "Inclusivity for the underserved",
    },
    { text_bn: "টেকসই সমাধান", text_en: "Sustainability in solutions" },
    {
      text_bn: "মর্যাদা ও শ্রদ্ধার সাথে সহমর্মিতা",
      text_en: "Compassion with dignity and respect",
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] bg-white py-32">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-secondary" />
      </div>
    );
  }

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Store":
        return <Store className="w-8 h-8 text-primary" />;
      case "TrendingUp":
        return <TrendingUp className="w-8 h-8 text-primary" />;
      case "Sprout":
      default:
        return <Sprout className="w-8 h-8 text-primary" />;
    }
  };

  const getWhyIcon = (iconName: string) => {
    switch (iconName) {
      case "Coins":
        return <Coins className="w-8 h-8 text-primary" />;
      case "PiggyBank":
        return <PiggyBank className="w-8 h-8 text-primary" />;
      case "HeartHandshake":
        return <HeartHandshake className="w-8 h-8 text-primary" />;
      case "ShieldCheck":
      default:
        return <ShieldCheck className="w-8 h-8 text-primary" />;
    }
  };

  const defaultWhyCards = [
    {
      icon: "ShieldCheck",
      title_bn: "স্বচ্ছ নীতিমালা",
      title_en: "Transparent Policies",
      desc_bn:
        "কোনো গোপন চার্জ বা অতিরিক্ত ফি নেই। আবেদনের সময় সকল শর্তাবলি স্পষ্টভাবে বুঝিয়ে দেওয়া হয়।",
      desc_en:
        "No hidden fees or extra charges. All terms are clearly explained during application.",
    },
    {
      icon: "Coins",
      title_bn: "জামানতবিহীন ঋণ",
      title_en: "Collateral-Free Loans",
      desc_bn:
        "সুবিধাবঞ্চিত ও প্রান্তিক ঋণগ্রহীতাদের জন্য কোনো প্রকার জামানত বা স্থাবর সম্পত্তি ছাড়াই ঋণের সুযোগ।",
      desc_en:
        "Collateral-free microloans designed specifically for underserved rural borrowers without assets.",
    },
    {
      icon: "PiggyBank",
      title_bn: "সঞ্চয়ী হিসাব (৬% লভ্যাংশ)",
      title_en: "Savings Program (6% Interest)",
      desc_bn:
        "সহজ সঞ্চয় অভ্যাস গড়ে তোলার জন্য বার্ষিক ৬% লভ্যাংশ সহ নমনীয় সঞ্চয় কর্মসূচি।",
      desc_en:
        "Flexible savings scheme yielding 6% annual interest to encourage consistent financial habits.",
    },
    {
      icon: "HeartHandshake",
      title_bn: "ঋণ বীমা সুবিধা",
      title_en: "Borrower Credit Insurance",
      desc_bn:
        "ঋণগ্রহীতার মৃত্যু বা শারীরিক অক্ষমতায় পরিবারকে ঋণের বোঝা থেকে মুক্তি দিতে বিশেষ বীমা কভারেজ।",
      desc_en:
        "Special credit insurance covering outstanding debt in the event of borrower death or disability.",
    },
  ];

  const whyCards = homeData?.why_cards || defaultWhyCards;

  const defaultSteps = [
    {
      step_num: 1,
      title_bn: "সহজ আবেদন",
      title_en: "Easy Application",
      desc_bn:
        "আপনার নিকটস্থ অঙ্কুর ব্রাঞ্চে অথবা মাঠ কর্মকর্তার মাধ্যমে সহজ ফর্ম পূরণ করে আবেদন করুন।",
      desc_en:
        "Fill out a simple application form at your local Onkur branch or through a field officer.",
    },
    {
      step_num: 2,
      title_bn: "মাঠপর্যায়ে যাচাই",
      title_en: "On-Ground Verification",
      desc_bn:
        "আমাদের মাঠ কর্মকর্তা আপনার ঠিকানা ও কাজের জায়গা পরিদর্শনের মাধ্যমে সাধারণ যাচাই সম্পন্ন করবেন।",
      desc_en:
        "Our field officer visits your home or workplace to perform basic verification.",
    },
    {
      step_num: 3,
      title_bn: "ঋণ বিতরণ",
      title_en: "Disbursement",
      desc_bn:
        "অনুমোদনের পর সরাসরি ব্রাঞ্চ থেকে অথবা মোবাইল ফাইন্যান্সিয়াল সার্ভিসের মাধ্যমে ঋণ বিতরণ।",
      desc_en:
        "Funds disbursed directly from our branch office or through Mobile Financial Services.",
    },
  ];

  return (
    <div className="pb-20">
      {/* 1. Hero Section */}
      <section className="relative min-h-[90vh] md:min-h-screen flex items-center bg-secondary text-white overflow-hidden">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <img
            src={hero2.src}
            alt="Rural Bangladesh farming community"
            className="w-full h-full object-cover"
          />
        </motion.div>

        <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-black/60 to-black/80" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0.5),_transparent_75%)]" />

        <div
          className="absolute inset-0 opacity-15 mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />

        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.25, 0.4, 0.25] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-32 -left-32 w-96 h-96 bg-primary/40 rounded-full blur-3xl pointer-events-none"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.3, 0.15] }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute -top-32 -right-32 w-96 h-96 bg-primary/30 rounded-full blur-3xl pointer-events-none"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 flex flex-col items-start text-left space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/40 bg-primary/10 backdrop-blur-sm"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                </span>
                <span className="text-xs sm:text-sm font-medium tracking-wide text-green-200 uppercase">
                  {tContent("গ্রামীণ উন্নয়ন", "Rural Development")}
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight drop-shadow-md"
              >
                <span className="bg-gradient-to-r from-white via-green-50 to-green-200 bg-clip-text text-transparent">
                  {tContent(homeData?.hero_title_bn, homeData?.hero_title_en)}
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="text-base sm:text-lg md:text-xl text-white/85 leading-relaxed font-light max-w-2xl drop-shadow-sm"
              >
                {tContent(
                  homeData?.hero_subtitle_bn,
                  homeData?.hero_subtitle_en,
                )}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex flex-wrap items-center gap-4 pt-2"
              >
                <Link
                  href="/contact"
                  className="group relative overflow-hidden bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-xl font-semibold transition-all shadow-lg hover:-translate-y-0.5 flex items-center gap-2"
                >
                  <span className="relative z-10">{t("common.applyNow")}</span>
                  <ArrowRight className="relative z-10 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/25 to-transparent" />
                </Link>

                <Link
                  href="/about"
                  className="group border border-white/30 hover:border-white/70 hover:bg-white/10 text-white px-8 py-4 rounded-xl font-semibold transition-all backdrop-blur-md flex items-center gap-2"
                >
                  <span>
                    {tContent("আমাদের সম্পর্কে জানুন", "Learn More About Us")}
                  </span>
                  <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. What We Do Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none -z-10">
          <div
            className="absolute inset-0 w-full h-full opacity-20"
            style={{
              backgroundImage: "url('/leaf-1.jpg')",
              backgroundRepeat: "repeat",
              backgroundSize: "420px",
            }}
          />
          <div className="absolute inset-0 bg-white/40" />
          <div className="absolute top-20 -left-32 w-96 h-96 bg-[#003C40]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 -right-32 w-96 h-96 bg-[#0A5C61]/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center max-w-2xl mx-auto mb-16 space-y-4"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#003C40]/10 text-[#003C40] font-semibold text-xs uppercase tracking-[0.2em]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#003C40] animate-pulse" />
              {tContent("কার্যক্রম", "What We Do")}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-secondary leading-tight">
              {tContent(
                "আর্থিক সাহায্য যা জীবন বদলায়",
                "Financial Support that Transforms Lives",
              )}
            </h2>
            <p className="text-base md:text-lg text-secondary/80 font-normal leading-relaxed">
              {tContent(
                "আমাদের তৈরি বিশেষ ঋণ সুবিধাগুলো সুবিধাবঞ্চিত গ্রামীণ জনগোষ্ঠীর প্রয়োজন অনুযায়ী সাজানো হয়েছে।",
                "Our microloan designs target specific needs of rural populations to foster economic growth.",
              )}
            </p>
          </motion.div>

          <PhotoMarquee />

          <div
            className={`grid grid-cols-1 gap-6 lg:gap-8 mt-20 ${
              (homeData?.services || []).length === 2
                ? "md:grid-cols-2 max-w-5xl mx-auto"
                : "md:grid-cols-3"
            }`}
          >
            {(homeData?.services || []).map((service: any, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.12,
                  ease: "easeOut",
                }}
                whileHover={{ y: -8 }}
                className="group relative p-8 rounded-3xl bg-white border border-[#003C40]/10 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col justify-between overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#003C40]/0 to-[#0A5C61]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className="relative space-y-6">
                  {index < 2 ? (
                    <div className="aspect-[16/10] w-full overflow-hidden rounded-2xl bg-gray-100">
                      <img
                        src={`/img${index + 1}.png`}
                        alt={tContent(service.title_bn, service.title_en)}
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      />
                    </div>
                  ) : (
                    <div className="p-4 rounded-2xl inline-flex items-center justify-center transition-all duration-500 bg-[#003C40]/10 group-hover:bg-[#003C40] group-hover:scale-105">
                      <div className="text-[#003C40] group-hover:text-white transition-colors duration-500">
                        {getIcon(service.icon)}
                      </div>
                    </div>
                  )}

                  <h3 className="text-xl font-bold text-[#003C40] group-hover:text-[#0A5C61] transition-colors duration-300">
                    {tContent(service.title_bn, service.title_en)}
                  </h3>
                  <p className="text-sm leading-relaxed text-secondary/80 font-normal">
                    {tContent(service.desc_bn, service.desc_en)}
                  </p>
                </div>

                <div className="relative pt-6">
                  <Link
                    href="/contact"
                    className="inline-flex items-center text-sm font-semibold text-[#003C40] hover:text-[#0A5C61] transition-colors gap-1.5 group/link"
                  >
                    <span>{t("common.applyNow")}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1.5 transition-transform duration-300" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Breaking Barriers Section */}
      <section className="py-20 border-y border-secondary/5 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-primary font-semibold text-sm uppercase tracking-wider block">
                {tContent("আমাদের লক্ষ্য", "Our Core Mission")}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-secondary leading-snug">
                {tContent(
                  !homeData?.mission_heading_bn ||
                    homeData.mission_heading_bn ===
                      "আর্থিক সেবার মাধ্যমে বাধা দূর করা" ||
                    homeData.mission_heading_bn ===
                      "অর্থায়নের মাধ্যমে বাধা ভাঙা"
                    ? "ডিজিটাল পদ্ধতিতে ক্ষুদ্র আর্থিক সেবার মাধ্যমে দারিদ্রমুক্ত সুখী সমৃদ্ধ বৈষম্যহীন ন্যায়ভিত্তিক সমাজ প্রতিষ্ঠা"
                    : homeData.mission_heading_bn,
                  !homeData?.mission_heading_en ||
                    homeData.mission_heading_en ===
                      "Breaking Barriers with Access to Finance"
                    ? "Establishing a poverty-free, happy, prosperous, and just society without discrimination through digital microfinance services."
                    : homeData.mission_heading_en,
                )}
              </h2>
              <p className="text-base text-secondary/80 leading-relaxed font-normal">
                {tContent(
                  homeData?.mission_body_bn ||
                    "অঙ্কুর ফাউন্ডেশনে আমরা বিশ্বাস করি যে, প্রকৃত ক্ষমতায়ন তখনই শুরু হয় যখন আর্থিক সুযোগগুলো তাদের কাছে পৌঁছায় যাদের এটি সবচেয়ে বেশি প্রয়োজন। দীর্ঘ সময় ধরে গ্রামীণ এবং প্রান্তিক জনগোষ্ঠী আনুষ্ঠানিক আর্থিক ব্যবস্থার বাইরে থেকে গেছে, যা তাদের বৃদ্ধি, বিনিয়োগ এবং ভবিষ্যত সুরক্ষিত করার ক্ষমতাকে সীমিত করেছে। আমরা অর্থায়নে প্রবেশাধিকার সহজ, অন্তর্ভুক্তিমূলক এবং প্রভাবশালী করার মাধ্যমে এই বাধাগুলি ভেঙে দিতে প্রতিশ্রুতিবদ্ধ। আমাদের উদ্যোগের মাধ্যমে আমরা সুবিধাবঞ্চিত ব্যক্তি এবং সম্প্রদায়কে আর্থিক পরিষেবার সাথে সংযুক্ত করি যা শিক্ষা, উদ্যোক্তা, স্বাস্থ্যসেবা এবং টেকসই জীবিকার পথ উন্মুক্ত করে।",
                  homeData?.mission_body_en ||
                    "At Onkur Foundation, we believe that true empowerment begins when financial opportunities reach those who need them most. For too long, rural and marginalized communities have been left outside the formal financial system, limiting their ability to grow, invest, and secure their future. We are committed to breaking these barriers by making access to finance simple, inclusive, and impactful. Through our initiatives, we connect underserved individuals and communities with financial services that open doors to education, entrepreneurship, healthcare, and sustainable livelihoods.",
                )}
              </p>
              <div className="pt-4">
                <Link
                  href="/about"
                  className="inline-flex items-center bg-primary hover:bg-green-600 text-white px-6 py-3 rounded-md text-sm font-medium transition-colors gap-2 shadow-sm"
                >
                  <span>
                    {tContent("বিস্তারিত পড়ুন", "Read Full Narrative")}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-lg border border-secondary/10">
                <img
                  src={
                    homeData?.mission_image_url ||
                    "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=600"
                  }
                  alt="Rural Bangladesh farming community"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-primary text-white px-6 py-4 rounded-2xl shadow-md hidden sm:block">
                <p className="text-2xl font-bold">100%</p>
                <p className="text-xs font-light uppercase tracking-wider">
                  {tContent("স্বচ্ছতা ও নিষ্ঠা", "Transparency & Trust")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Why Choose Us Section */}
      <section className="relative overflow-hidden w-full py-16 md:py-24">
        {/* পুরো সেকশন জুড়ে ব্যাকগ্রাউন্ড প্যাটার্ন */}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* ---------------- বাম পাশ: টেক্সট + ট্যাব ---------------- */}
            <div className="space-y-5">
              <span className="text-primary font-semibold text-sm uppercase tracking-wider block">
                {tContent("অনন্য বৈশিষ্ট্য", "Why Choose Us")}
              </span>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-secondary">
                {tContent(
                  homeData?.why_title_bn || "কেন অঙ্কুর ফাউন্ডেশন?",
                  homeData?.why_title_en || "Why Choose Onkur Foundation?",
                )}
              </h2>

              <p className="text-base text-gray-600 font-normal max-w-xl leading-relaxed">
                {tContent(
                  "আমাদের সহজ ও মানবকল্যাণমুখী নীতিমালা গ্রামীণ সুবিধাবঞ্চিত পরিবারের জীবনে মর্যাদাপূর্ণ আর্থিক সচ্ছলতা নিশ্চিত করে।",
                  "Our simple and borrower-first credit terms help guarantee dignified livelihoods for rural families.",
                )}
              </p>

              {/* ছোট ডিভাইডার */}
              <span className="block w-12 h-[3px] bg-secondary rounded-full" />

              {/* ট্যাব / পিল বাটন */}
              <div className="flex flex-wrap gap-3 pt-2">
                {whyCards.map((card: any, idx: number) => {
                  const isActive = idx === activeWhy;

                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveWhy(idx)}
                      aria-pressed={isActive}
                      className={`rounded-full px-6 py-3 text-sm md:text-base font-semibold transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                        isActive
                          ? "bg-primary text-white border border-primary"
                          : "bg-primary text-black border border-secondary/15 hover:border-primary/50 hover:text-primary"
                      }`}
                    >
                      {tContent(
                        card.title_bn || card.title,
                        card.title_en || card.title,
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ---------------- ডান পাশ: Stacked Cards ---------------- */}
            <div className="relative h-[420px] sm:h-[480px] lg:h-[540px] w-full">
              {whyCards.map((card: any, idx: number) => {
                const total = whyCards.length;

                // সক্রিয় কার্ড থেকে দূরত্ব (0 = সামনে)
                const pos = (idx - activeWhy + total) % total;
                const isActive = pos === 0;

                return (
                  <motion.button
                    key={idx}
                    type="button"
                    onClick={() => setActiveWhy(idx)}
                    aria-label={tContent(
                      card.title_bn || card.title,
                      card.title_en || card.title,
                    )}
                    tabIndex={isActive ? 0 : -1}
                    initial={false}
                    animate={{
                      x: `${pos * 26}%`,
                      y: pos * 16,
                      scale: 1 - pos * 0.07,
                      opacity: pos > 2 ? 0 : 1,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 220,
                      damping: 28,
                    }}
                    style={{
                      zIndex: total - pos,
                      clipPath:
                        "polygon(56px 0, 100% 0, 100% calc(100% - 56px), calc(100% - 56px) 100%, 0 100%, 0 56px)",
                    }}
                    className="group absolute left-0 top-0 h-full w-[74%] overflow-hidden rounded-2xl bg-secondary text-left shadow-xl"
                  >
                    {/* Card Image */}
                    <img
                      src={card.image || hero2.src}
                      alt={
                        card.title_en ||
                        card.title_bn ||
                        card.title ||
                        "Why Choose Us"
                      }
                      className="absolute inset-0 h-full w-full object-cover"
                      onError={(e) => {
                        // যদি card.image broken হয়, hero2 fallback হবে
                        if (e.currentTarget.src !== hero2.src) {
                          e.currentTarget.src = hero2.src;
                        }
                      }}
                    />

                    {/* পড়ার সুবিধার জন্য ওভারলে */}
                    <span className="absolute inset-0 bg-gradient-to-t from-secondary/85 via-secondary/25 to-transparent" />

                    {/* উপরে ডানে অ্যারো */}
                    <span className="absolute top-6 right-6 flex h-12 w-12 items-center justify-center rounded-full border border-white/60 text-white transition-colors duration-300 group-hover:bg-primary group-hover:border-primary">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <line x1="7" y1="17" x2="17" y2="7" />
                        <polyline points="9 7 17 7 17 15" />
                      </svg>
                    </span>

                    {/* আইকন */}
                    <span className="absolute top-6 left-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/30 bg-white/10 backdrop-blur-sm [&>svg]:text-white">
                      {getWhyIcon(card.icon)}
                    </span>

                    {/* নিচের কনটেন্ট */}
                    <div className="absolute bottom-0 left-0 right-0 p-7 md:p-9">
                      <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-wide text-white">
                        {tContent(
                          card.title_bn || card.title,
                          card.title_en || card.title,
                        )}
                      </h3>

                      {isActive && (
                        <>
                          <span className="mt-3 mb-3 block h-px w-10 bg-white/40" />

                          <p className="max-w-md text-sm md:text-base font-normal leading-relaxed text-white/85">
                            {tContent(
                              card.desc_bn ||
                                card.description_bn ||
                                card.desc ||
                                card.details_bn,
                              card.desc_en ||
                                card.description_en ||
                                card.desc ||
                                card.details_en,
                            )}
                          </p>
                        </>
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 5. How It Works Section */}
      <section className="py-20 border-y border-secondary/5 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-6 space-y-4">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider block">
              {tContent("ঋণ প্রক্রিয়া", "How It Works")}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-secondary">
              {tContent(
                !homeData?.process_title_bn ||
                  homeData.process_title_bn === "৪টি সহজ ধাপে ঋণ সুবিধা"
                  ? "৩টি সহজ ধাপে ঋণ সুবিধা"
                  : homeData.process_title_bn,
                !homeData?.process_title_en ||
                  homeData.process_title_en === "Apply in 4 Simple Steps"
                  ? "Apply in 3 Simple Steps"
                  : homeData.process_title_en,
              )}
            </h2>
            <p className="text-base text-gray-700 font-normal">
              {tContent(
                "কোনো জটিল ঝামেলা ছাড়াই দ্রুততম উপায়ে গ্রামীণ প্রান্তিক জনগোষ্ঠীর মাঝে ঋণ বিতরণ করা হয়।",
                "Designed to get microloans to rural applicants efficiently, without complex bureaucratic barriers.",
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {(homeData?.process_steps || defaultSteps)
              .filter(
                (step: any) =>
                  !(
                    step.title_en?.includes("Committee Approval") ||
                    step.title_bn?.includes("কমিটি অনুমোদন")
                  ),
              )
              .map((step: any, idx: number) => {
                const stepImages = [
                  "/step1.jpeg",
                  "/step2.jpeg",
                  "/step3.jpeg",
                ];
                const stepImage = stepImages[idx % stepImages.length];

                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="flex flex-col items-center"
                  >
                    <div className="relative w-40 h-52 md:w-44 md:h-56 bg-white rounded-[2rem] shadow-md border border-secondary/10 flex items-center justify-center z-10 -mb-10">
                      <div className="absolute top-3 w-8 h-1 rounded-full bg-secondary/20" />
                      <img
                        src={stepImage}
                        alt={tContent(step.title_bn, step.title_en)}
                        className="h-full w-full rounded-[2rem] object-cover py-2.5"
                      />
                    </div>

                    <div className="bg-gradient-to-r from-orange-50/60 via-[#FBF6EE] to-green-50/60 rounded-2xl border border-secondary/10 shadow-sm hover:shadow-md transition-all duration-300 pt-14 pb-8 px-6 text-center space-y-2 w-full">
                      <p className="text-primary font-extrabold">
                        Step {idx + 1}
                      </p>
                      <p className="text-secondary font-bold text-base leading-snug">
                        {tContent(step.title_bn, step.title_en)}
                      </p>
                      {(step.desc_bn || step.desc_en) && (
                        <p className="text-sm text-gray-600 font-normal leading-relaxed">
                          {tContent(step.desc_bn, step.desc_en)}
                        </p>
                      )}
                    </div>
                  </motion.div>
                );
              })}
          </div>
        </div>
      </section>

      {/* 6. Guided by Purpose Section */}
      <section className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 bg-[radial-gradient(circle_at_center,_rgba(220,252,231,0.45)_0%,_transparent_65%)]">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider block mb-2">
            {tContent("মূল দর্শন", "Guided by Purpose")}
          </span>
          <h2 className="text-3xl font-bold text-secondary">
            {tContent(
              "আমাদের লক্ষ্য, স্বপ্ন ও মূল্যবোধ",
              "Mission, Vision & Core Values",
            )}
          </h2>
        </div>

        <div className="flex justify-center border border-secondary/10 max-w-md mx-auto mb-10 p-1 bg-secondary/5 rounded-full">
          {(["mission", "vision", "values"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2.5 px-4 rounded-full text-sm font-semibold uppercase tracking-wider transition-all duration-200 ${
                activeTab === tab
                  ? "bg-primary text-white shadow-sm"
                  : "text-secondary hover:text-primary"
              }`}
            >
              {tab === "mission" && tContent("লক্ষ্য", "Mission")}
              {tab === "vision" && tContent("স্বপ্ন", "Vision")}
              {tab === "values" && tContent("মূল্যবোধ", "Values")}
            </button>
          ))}
        </div>

        <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-secondary/5 min-h-[300px]">
          <ul className="space-y-4">
            {activeTab === "mission" &&
              (homeData?.mission_bullets || defaultMissionBullets).map(
                (bullet: any, idx: number) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                    className="flex items-start gap-4"
                  >
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-secondary text-base font-medium">
                      {tContent(bullet.text_bn, bullet.text_en)}
                    </span>
                  </motion.li>
                ),
              )}

            {activeTab === "vision" &&
              (homeData?.vision_bullets || defaultVisionBullets).map(
                (bullet: any, idx: number) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                    className="flex items-start gap-4"
                  >
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-secondary text-base font-medium">
                      {tContent(bullet.text_bn, bullet.text_en)}
                    </span>
                  </motion.li>
                ),
              )}

            {activeTab === "values" &&
              (homeData?.values_bullets || defaultValuesBullets).map(
                (bullet: any, idx: number) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                    className="flex items-start gap-4"
                  >
                    <CheckCircle2 className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                    <span className="text-secondary text-base font-medium">
                      {tContent(bullet.text_bn, bullet.text_en)}
                    </span>
                  </motion.li>
                ),
              )}
          </ul>
        </div>
      </section>

      {/* 7. Impact Stats Section */}
      <section className="relative bg-gradient-to-br from-green-950 via-green-900 to-green-800 text-white py-16 md:py-24 overflow-hidden">
        <motion.div
          className="absolute -right-20 -top-32 w-80 h-80 bg-white/10 rotate-45 rounded-[2rem] pointer-events-none"
          animate={{ y: [0, -18, 0], x: [0, 10, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -right-10 top-1/2 -translate-y-1/2 w-40 h-48 bg-white/5 rotate-35 rounded-[4rem] pointer-events-none"
          animate={{ y: [0, 14, 0], x: [0, -8, 0] }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        />
        <motion.div
          className="absolute -left-24 -bottom-24 w-80 h-80 bg-white/10 rotate-45 rounded-[2rem] pointer-events-none"
          animate={{ y: [0, 18, 0], x: [0, -10, 0] }}
          transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -left-10 top-1/3 -translate-y-1/2 w-40 h-48 bg-white/5 rotate-45 rounded-[4rem] pointer-events-none"
          animate={{ y: [0, -14, 0], x: [0, 8, 0] }}
          transition={{
            duration: 6.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.3,
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.h2
            className="text-center text-2xl md:text-6xl font-bold mb-12 md:mb-16 bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(90deg, #ffffff 0%, #ffffff 35%, color-mix(in srgb, var(--color-secondary) 60%, white 40%) 50%, #ffffff 65%, #ffffff 100%)",
              backgroundSize: "200% 100%",
              WebkitBackgroundClip: "text",
            }}
            animate={{ backgroundPosition: ["200% 0%", "-100% 0%"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          >
            {tContent(
              homeData?.stats_title_bn || "আমাদের সাফল্যের যাত্রা",
              homeData?.stats_title_en || "Journey of our Success",
            )}
          </motion.h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-10 gap-x-4">
            {[
              {
                value: tContent("৳ ৩ কোটি +", "৳ 3 Crore +"),
                isStatic: true,
                labelBn: "বিতরণকৃত অর্থ",
                labelEn: "Amount Distributed",
              },
              {
                value: stats?.peopleServed || 3000,
                suffix: " +",
                labelBn: "উপকারভোগী সংখ্যা",
                labelEn: "People Served",
              },
              {
                value: stats?.districtsCovered || 2,
                suffix: "",
                labelBn: "আওতাধীন জেলাসমূহ",
                labelEn: "Districts Covered",
              },
              {
                value: stats?.activeBranches || 2,
                suffix: "",
                labelBn: "সক্রিয় শাখা",
                labelEn: "Active Branches",
              },
              {
                value: stats?.yearsActive || 1,
                suffix: " +",
                labelBn: "সক্রিয় বছর",
                labelEn: "Years Active",
              },
            ].map((stat, index) => (
              <div
                key={index}
                className="relative flex flex-col items-center text-center gap-2 px-2"
              >
                {index !== 0 && (
                  <div className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 h-14 w-px bg-white/15" />
                )}

                <p className="text-xl md:text-4xl font-extrabold tracking-tight whitespace-nowrap">
                  {stat.isStatic ? (
                    stat.value
                  ) : (
                    <StatCounter
                      value={stat.value as number}
                      suffix={stat.suffix}
                    />
                  )}
                </p>

                <p className="text-xs md:text-sm text-white/70 leading-snug max-w-[140px]">
                  {tContent(stat.labelBn, stat.labelEn)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Executive Team Preview Section */}
      {team.length > 0 && (
        <section className="max-w-7xl my-16 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-primary font-semibold text-sm uppercase tracking-wider block mb-2">
                {tContent("আমাদের নেতৃত্ব", "Executive Team")}
              </span>
              <h2 className="text-3xl font-bold text-secondary">
                {tContent(
                  "ফাউন্ডেশনের চালিকাশক্তি",
                  "Guided by Visionary Leaders",
                )}
              </h2>
            </div>
            <Link
              href="/team"
              className="inline-flex items-center text-sm font-bold text-primary hover:text-secondary transition-colors gap-1 self-start md:self-auto"
            >
              <span>{tContent("সব সদস্য দেখুন", "View All Members")}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member) => (
              <motion.div
                key={member.id}
                whileHover={{ y: -6 }}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-secondary/5"
              >
                <div className="aspect-[4/5] bg-gray-100 relative">
                  <img
                    src={member.imageUrl}
                    alt={tContent(member.name_bn, member.name_en)}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <div className="p-6 text-center space-y-1">
                  <h3 className="text-lg font-bold text-secondary">
                    {tContent(member.name_bn, member.name_en)}
                  </h3>
                  <p className="text-sm text-gray-700 font-normal">
                    {tContent(member.role_bn, member.role_en)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* 9. Testimonials Carousel Section */}
      {testimonials.length > 0 && (
        <section className="bg-white py-16 border-y border-secondary/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-primary font-semibold text-sm uppercase tracking-wider block mb-2">
                {tContent("সফলতার গল্প", "Success Stories")}
              </span>
              <h2 className="text-3xl font-bold text-secondary">
                {tContent(
                  "আমাদের সুবিধাভোগীদের মতামত",
                  "What Our Borrowers Say",
                )}
              </h2>
            </div>
            <TestimonialCarousel testimonials={testimonials} />
          </div>
        </section>
      )}

      {/* 10. Blog Preview Section */}
      {blogPosts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 my-16 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-primary font-semibold text-sm uppercase tracking-wider block mb-2">
                {tContent("ব্লগ ও খবর", "Latest News")}
              </span>
              <h2 className="text-3xl font-bold text-secondary">
                {tContent(
                  "আমাদের মাঠপর্যায়ের আপডেট",
                  "Updates from the Ground",
                )}
              </h2>
            </div>
            <Link
              href="/blog"
              className="inline-flex items-center text-sm font-bold text-primary hover:text-secondary transition-colors gap-1 self-start md:self-auto"
            >
              <span>{tContent("সব ব্লগ পড়ুন", "Read All Posts")}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {blogPosts[0] && (
              <Link
                href={`/blog/${blogPosts[0].slug}`}
                className="group flex flex-col lg:pr-10"
              >
                <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 mb-6">
                  <img
                    src={blogPosts[0].coverImageUrl}
                    alt={tContent(blogPosts[0].title_bn, blogPosts[0].title_en)}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <span className="text-xs text-gray-700 font-medium mb-2">
                  {new Date(blogPosts[0].publishedAt).toLocaleDateString(
                    language === "bn" ? "bn-BD" : "en-US",
                    { year: "numeric", month: "short", day: "numeric" },
                  )}
                </span>
                <h3 className="text-2xl md:text-3xl font-bold text-secondary group-hover:text-primary transition-colors leading-snug mb-3">
                  {tContent(blogPosts[0].title_bn, blogPosts[0].title_en)}
                </h3>
                <p className="text-sm text-gray-700 font-normal line-clamp-2">
                  {tContent(blogPosts[0].excerpt_bn, blogPosts[0].excerpt_en)}
                </p>
              </Link>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:pl-10 lg:border-l lg:border-secondary/10">
              {blogPosts.slice(1, 5).map((post) => (
                <Link
                  href={`/blog/${post.slug}`}
                  key={post.id}
                  className="group flex flex-col"
                >
                  <div className="aspect-video rounded-xl overflow-hidden bg-gray-100 mb-4">
                    <img
                      src={post.coverImageUrl}
                      alt={tContent(post.title_bn, post.title_en)}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="text-base font-bold text-secondary group-hover:text-primary transition-colors leading-snug line-clamp-2 mb-2">
                    {tContent(post.title_bn, post.title_en)}
                  </h3>
                  <p className="text-xs text-gray-700 font-normal line-clamp-2">
                    {tContent(post.excerpt_bn, post.excerpt_en)}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
