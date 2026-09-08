"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  ref,
  onValue,
  query,
  orderByChild,
  limitToLast,
} from "firebase/database";
import { db } from "@/lib/firebase";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import {
  Sprout,
  Store,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
  Award,
  Calendar,
  Users,
  MapPin,
  ShieldCheck,
  Coins,
  PiggyBank,
  HeartHandshake,
  Building2,
  CalendarDays
} from "lucide-react";
import StatCounter from "@/components/StatCounter";
import TestimonialCarousel from "@/components/TestimonialCarousel";

export default function HomePage() {
  const { language, tContent, t } = useLanguage();
  const [homeData, setHomeData] = useState<any>(null);
  const [stats, setStats] = useState<any>(null);
  const [team, setTeam] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Active tab state for Mission/Vision/Values
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
            .slice(0, 3); // Previews top 3
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
            .slice(0, 2); // Previews recent 2
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
      text_bn: "নারী ও গ্রামীণ পরিবারের ক্ষমতায়ন",
      text_en: "Empower women and rural families",
    },
    {
      text_bn: "কৃষক ও ক্ষুদ্র ব্যবসায়ীদের সহায়তা",
      text_en: "Support farmers and small businesses",
    },
    { text_bn: "আর্থিক সচেতনতা বৃদ্ধি", text_en: "Promote financial literacy" },
    {
      text_bn: "প্রতিটি সম্পদকে কমিউনিটির কল্যাণে পুনঃবিনিয়োগ",
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
      text_bn: "মানুষ ও নতুন ধারণার ক্ষমতায়ন",
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
      <div className="flex items-center justify-center min-screen bg-white py-32">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-secondary"></div>
      </div>
    );
  }

  // Icons mapper for services
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Sprout":
        return <Sprout className="w-8 h-8 text-primary" />;
      case "Store":
        return <Store className="w-8 h-8 text-primary" />;
      case "TrendingUp":
        return <TrendingUp className="w-8 h-8 text-primary" />;
      default:
        return <Sprout className="w-8 h-8 text-primary" />;
    }
  };

  const getWhyIcon = (iconName: string) => {
    switch (iconName) {
      case "ShieldCheck":
        return <ShieldCheck className="w-8 h-8 text-secondary" />;
      case "Coins":
        return <Coins className="w-8 h-8 text-secondary" />;
      case "PiggyBank":
        return <PiggyBank className="w-8 h-8 text-secondary" />;
      case "HeartHandshake":
        return <HeartHandshake className="w-8 h-8 text-secondary" />;
      default:
        return <ShieldCheck className="w-8 h-8 text-secondary" />;
    }
  };

  const defaultWhyCards = [
    {
      icon: "ShieldCheck",
      title_bn: "স্বচ্ছ নীতিমালা",
      title_en: "Transparent Policies",
      desc_bn:
        "কোনো গোপন চার্জ বা অতিরিক্ত ফি নেই। আবেদনের সময় সকল শর্তাবলি স্পষ্টভাবে বুঝিয়ে দেওয়া হয়।",
      desc_en:
        "No hidden fees or extra charges. All terms are clearly explained during application.",
    },
    {
      icon: "Coins",
      title_bn: "জামানতবিহীন ঋণ",
      title_en: "Collateral-Free Loans",
      desc_bn:
        "সুবিধাবঞ্চিত ও প্রান্তিক ঋণগ্রহীতাদের জন্য কোনো প্রকার জামানত বা স্থাবর সম্পত্তি ছাড়াই ঋণের সুযোগ।",
      desc_en:
        "Collateral-free microloans designed specifically for underserved rural borrowers without assets.",
    },
    {
      icon: "PiggyBank",
      title_bn: "সঞ্চয়ী হিসাব (৬% লভ্যাংশ)",
      title_en: "Savings Program (6% Interest)",
      desc_bn:
        "সহজ সঞ্চয় অভ্যাস গড়ে তোলার জন্য বার্ষিক ৬% লভ্যাংশ সহ নমনীয় সঞ্চয় কর্মসূচি।",
      desc_en:
        "Flexible savings scheme yielding 6% annual interest to encourage consistent financial habits.",
    },
    {
      icon: "HeartHandshake",
      title_bn: "ঋণ বীমা সুবিধা",
      title_en: "Borrower Credit Insurance",
      desc_bn:
        "ঋণগ্রহীতার মৃত্যু বা শারীরিক অক্ষমতায় পরিবারকে ঋণের বোঝা থেকে মুক্তি দিতে বিশেষ বীমা কভারেজ।",
      desc_en:
        "Special credit insurance covering outstanding debt in the event of borrower death or disability.",
    },
  ];

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
      title_bn: "মাঠপর্যায়ে যাচাই",
      title_en: "On-Ground Verification",
      desc_bn:
        "আমাদের মাঠ কর্মকর্তা আপনার ঠিকানা ও কাজের জায়গা পরিদর্শনের মাধ্যমে সাধারণ যাচাই সম্পন্ন করবেন।",
      desc_en:
        "Our field officer visits your home or workplace to perform basic verification.",
    },
    {
      step_num: 3,
      title_bn: "ঋণ বিতরণ",
      title_en: "Disbursement",
      desc_bn:
        "অনুমোদনের পর সরাসরি ব্রাঞ্চ থেকে অথবা মোবাইল ফাইন্যান্সিয়াল সার্ভিসের মাধ্যমে ঋণ বিতরণ।",
      desc_en:
        "Funds disbursed directly from our branch office or through Mobile Financial Services.",
    },
  ];

  return (
    <div className="space-y-24 pb-20">
      {/* 1. Hero Section */}
      <section className="relative bg-secondary text-white py-24 md:py-50 overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src={
              homeData?.hero_image_url ||
              "https://i.postimg.cc/g0DQ0M84/98293656829.png"
            }
            alt="Rural Bangladesh farming community"
            className="w-full h-full object-cover"
          />
          {/* Dark gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70"></div>
          {/* Extra vignette toward the center for stronger contrast behind text */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0.55),_transparent_70%)]"></div>
        </div>

        {/* Abstract accent blobs (kept subtle, on top of overlay) */}
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/30 rounded-full blur-3xl"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/20 rounded-full blur-3xl"></div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col items-center text-center space-y-6">
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]"
            >
              {tContent(homeData?.hero_title_bn, homeData?.hero_title_en)}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-white/90 leading-relaxed font-normal max-w-2xl drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]"
            >
              {tContent(homeData?.hero_subtitle_bn, homeData?.hero_subtitle_en)}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="pt-6 flex flex-wrap justify-center gap-4"
            >
              <Link
                href="/contact"
                className="bg-primary hover:opacity-90 text-white px-8 py-3.5 rounded-md font-medium transition-all shadow-lg flex items-center gap-2 group"
              >
                <span>{t("common.applyNow")}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/about"
                className="border border-white/40 hover:border-white hover:bg-white/10 text-white px-8 py-3.5 rounded-md font-medium transition-all backdrop-blur-sm"
              >
                {tContent("আমাদের সম্পর্কে জানুন", "Learn More About Us")}
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. What We Do Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider block">
            {tContent("কার্যক্রম", "What We Do")}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-secondary">
            {tContent(
              "আর্থিক সাহায্য যা জীবন বদলায়",
              "Financial Support that Transforms Lives",
            )}
          </h2>
          <p className="text-base text-text font-normal">
            {tContent(
              "আমাদের তৈরি বিশেষ ঋণ সুবিধাগুলো সুবিধাবঞ্চিত গ্রামীণ জনগোষ্ঠীর প্রয়োজন অনুযায়ী সাজানো হয়েছে।",
              "Our microloan designs target specific needs of rural populations to foster economic growth.",
            )}
          </p>
        </div>

        <div
          className={`grid grid-cols-1 gap-8 ${(homeData?.services || []).length === 2
            ? "md:grid-cols-2 max-w-5xl mx-auto"
            : "md:grid-cols-3"
            }`}
        >
          {(homeData?.services || []).map((service: any, index: number) => (
            <motion.div
              key={index}
              whileHover={{ y: -8 }}
              className="bg-white p-8 rounded-2xl shadow-sm border border-secondary/5 flex flex-col justify-between group transition-all"
            >
              <div className="space-y-6">
                <div className="bg-white/5 p-4 rounded-xl inline-block group-hover:bg-white transition-colors">
                  <div className="group-hover:text-white transition-colors">
                    {getIcon(service.icon)}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-secondary">
                  {tContent(service.title_bn, service.title_en)}
                </h3>
                <p className="text-sm leading-relaxed text-text font-normal">
                  {tContent(service.desc_bn, service.desc_en)}
                </p>
              </div>
              <div className="pt-6">
                <Link
                  href="/contact"
                  className="inline-flex items-center text-sm font-semibold text-primary hover:text-secondary transition-colors gap-1 group/link"
                >
                  <span>{t("common.applyNow")}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. Breaking Barriers Section */}
      <section className="bg-white py-20 border-y border-secondary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Col (Text Content) */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-primary font-semibold text-sm uppercase tracking-wider block">
                {tContent("আমাদের লক্ষ্য", "Our Core Mission")}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-secondary">
                {tContent(
                  !homeData?.mission_heading_bn ||
                    homeData.mission_heading_bn ===
                    "আর্থিক সেবার মাধ্যমে বাধা দূর করা" ||
                    homeData.mission_heading_bn ===
                    "অর্থায়নের মাধ্যমে বাধা ভাঙা"
                    ? "ডিজিটাল পদ্ধতিতে ক্ষুদ্র আর্থিক সেবার মাধ্যমে দারিদ্রমুক্ত সুখী সমৃদ্ধ বৈষম্যহীন ন্যায়ভিত্তিক সমাজ প্রতিষ্ঠা"
                    : homeData.mission_heading_bn,
                  !homeData?.mission_heading_en ||
                    homeData.mission_heading_en ===
                    "Breaking Barriers with Access to Finance"
                    ? "Establishing a poverty-free, happy, prosperous, and just society without discrimination through digital microfinance services."
                    : homeData.mission_heading_en,
                )}
              </h2>
              <p className="text-base text-secondary leading-relaxed font-normal">
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
                  className="inline-flex items-center bg-white hover:bg-gray-100 text-white px-6 py-3 rounded-md text-sm font-medium transition-colors gap-2"
                >
                  <span>
                    {tContent("বিস্তারিত পড়ুন", "Read Full Narrative")}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right Col (Visual Panel) */}
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

      {/* Why Choose Us Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider block">
            {tContent("অনন্য বৈশিষ্ট্য", "Why Choose Us")}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-secondary">
            {tContent(
              homeData?.why_title_bn || "কেন অঙ্কুর ফাউন্ডেশন?",
              homeData?.why_title_en || "Why Choose Onkur Foundation?",
            )}
          </h2>
          <p className="text-base text-text font-normal">
            {tContent(
              "আমাদের সহজ ও মানবকল্যাণমুখী নীতিমালা গ্রামীণ সুবিধাবঞ্চিত পরিবারের জীবনে মর্যাদাপূর্ণ আর্থিক সচ্ছলতা নিশ্চিত করে।",
              "Our simple and borrower-first credit terms help guarantee dignified livelihoods for rural families.",
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {(homeData?.why_cards || defaultWhyCards).map(
            (card: any, idx: number) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                whileHover={{ y: -6 }}
                className="bg-white p-6 rounded-2xl border border-secondary/5 shadow-xs flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="bg-white/5 p-3 rounded-lg inline-block ">
                    {getWhyIcon(card.icon)}
                  </div>
                  <h3 className="text-lg font-bold text-secondary">
                    {tContent(card.title_bn, card.title_en)}
                  </h3>
                  <p className="text-xs text-text font-normal leading-relaxed">
                    {tContent(card.desc_bn, card.desc_en)}
                  </p>
                </div>
              </motion.div>
            ),
          )}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-white py-20 border-y border-secondary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
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
            <p className="text-base text-text font-normal">
              {tContent(
                "কোনো জটিল ঝামেলা ছাড়াই দ্রুততম উপায়ে গ্রামীণ প্রান্তিক জনগোষ্ঠীর মাঝে ঋণ বিতরণ করা হয়।",
                "Designed to get microloans to rural applicants efficiently, without complex bureaucratic barriers.",
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connecting line between steps (desktop only) */}
            <div className="hidden md:block absolute top-9 left-[16.5%] right-[16.5%] h-px bg-secondary/15"></div>

            {(homeData?.process_steps || defaultSteps)
              .filter(
                (step: any) =>
                  !(
                    step.title_en?.includes("Committee Approval") ||
                    step.title_bn?.includes("কমিটি অনুমোদন")
                  ),
              )
              .map((step: any, idx: number) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="relative bg-white p-8 rounded-2xl border border-secondary/10 shadow-sm hover:shadow-md hover:border-secondary/20 transition-all duration-300 space-y-4"
                >
                  <div className="relative z-10 w-10 h-10 bg-secondary text-white rounded-full flex items-center justify-center text-sm font-bold shadow-sm">
                    {idx + 1}
                  </div>
                  <h3 className="text-lg font-bold text-secondary">
                    {tContent(step.title_bn, step.title_en)}
                  </h3>
                  <p className="text-xs text-text/70 font-normal leading-relaxed">
                    {tContent(step.desc_bn, step.desc_en)}
                  </p>
                  <div className="absolute bottom-0 left-8 right-8 h-0.5 bg-secondary/10 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform"></div>
                </motion.div>
              ))}
          </div>
        </div>
      </section>

      {/* 4. Guided by Purpose Section (Mission/Vision/Values tabs) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

        {/* Tab Controls */}
        <div className="flex justify-center border-b border-secondary/10 max-w-md mx-auto mb-10 p-1 bg-white/5 rounded-full">
          {(["mission", "vision", "values"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2.5 px-4 rounded-full text-sm font-semibold uppercase tracking-wider transition-all duration-200 ${activeTab === tab
                ? "bg-primary text-white shadow-sm"
                : "text-secondary hover:text-secondary"
                }`}
            >
              {tab === "mission" && tContent("লক্ষ্য", "Mission")}
              {tab === "vision" && tContent("স্বপ্ন", "Vision")}
              {tab === "values" && tContent("মূল্যবোধ", "Values")}
            </button>
          ))}
        </div>

        {/* Tab Content Panels */}
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

      {/* 5. Impact Stats Section */}
      <section className="relative bg-white text-text py-16 md:py-20 overflow-hidden">
        {/* Subtle background accent */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, color-mix(in srgb, var(--color-primary) 4%, transparent) 0%, transparent 60%)",
          }}
        ></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-4">
            {[
              {
                value: tContent("৳৩ কোটি+", "৳3 Crore+"),
                isStatic: true,
                icon: Coins,
                labelBn: "বিতরণকৃত অর্থ",
                labelEn: "Amount Distributed",
              },
              {
                value: stats?.peopleServed || 3000,
                suffix: "+",
                icon: Users,
                labelBn: "উপকারভোগী সংখ্যা",
                labelEn: "People Served",
              },
              {
                value: stats?.districtsCovered || 2,
                suffix: "",
                icon: MapPin,
                labelBn: "আওতাধীন জেলাসমূহ",
                labelEn: "Districts Covered",
              },
              {
                value: stats?.activeBranches || 2,
                suffix: "",
                icon: Building2,
                labelBn: "সক্রিয় শাখা",
                labelEn: "Active Branches",
              },
              {
                value: stats?.yearsActive || 1,
                suffix: "+",
                icon: CalendarDays,
                labelBn: "সক্রিয় বছর",
                labelEn: "Years Active",
              },
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="relative flex flex-col items-center text-center gap-3 px-2 py-4 group"
                >
                  {/* Vertical divider between columns (desktop only, skip first) */}
                  {index !== 0 && (
                    <div className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 h-16 w-px bg-secondary/10"></div>
                  )}

                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-primary/10 flex items-center justify-center transition-colors duration-300 group-hover:bg-primary/20">
                    <Icon className="w-6 h-6 md:w-7 md:h-7 text-primary" />
                  </div>

                  <p className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-primary tracking-tight whitespace-nowrap">
                    {stat.isStatic ? (
                      stat.value
                    ) : (
                      <StatCounter value={stat.value as number} suffix={stat.suffix} />
                    )}
                  </p>

                  <p className="text-xs md:text-sm text-text/70 uppercase tracking-widest font-medium">
                    {tContent(stat.labelBn, stat.labelEn)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      {/* 6. Executive Team Preview Section */}
      {team.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                  <p className="text-sm text-text font-normal">
                    {tContent(member.role_bn, member.role_en)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* 7. Testimonials Carousel Section */}
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

      {/* 8. Blog Preview Section */}
      {blogPosts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-primary font-semibold text-sm uppercase tracking-wider block mb-2">
                {tContent("ব্লগ ও খবর", "Latest News")}
              </span>
              <h2 className="text-3xl font-bold text-secondary">
                {tContent("আমাদের মাঠপর্যায়ের আপডেট", "Updates from the Ground")}
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-0">
            {/* Featured post (first item) */}
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
                <span className="text-xs text-text/60 font-medium mb-2">
                  {new Date(blogPosts[0].publishedAt).toLocaleDateString(
                    language === "bn" ? "bn-BD" : "en-US",
                    { year: "numeric", month: "short", day: "numeric" },
                  )}
                </span>
                <h3 className="text-2xl md:text-3xl font-bold text-secondary group-hover:text-primary transition-colors leading-snug mb-3">
                  {tContent(blogPosts[0].title_bn, blogPosts[0].title_en)}
                </h3>
                <p className="text-sm text-text/70 font-normal line-clamp-2">
                  {tContent(blogPosts[0].excerpt_bn, blogPosts[0].excerpt_en)}
                </p>
              </Link>
            )}

            {/* Vertical divider (desktop only) */}
            <div className="hidden lg:block absolute"></div>

            {/* Grid of remaining posts */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-8 lg:pl-10 lg:border-l lg:border-secondary/10">
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
                  <p className="text-xs text-text/70 font-normal line-clamp-2">
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
