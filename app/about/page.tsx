"use client";

import React, { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "@/lib/firebase";
import { useLanguage } from "@/context/LanguageContext";
import { CheckCircle2, ShieldCheck, Heart, Sparkles, Users, TrendingUp, Quote } from "lucide-react";

export default function AboutPage() {
  const { tContent, t } = useLanguage();
  const [aboutData, setAboutData] = useState<any>(null);
  const [homeData, setHomeData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const aboutRef = ref(db, "siteContent/about");
    const homeRef = ref(db, "siteContent/home");

    let loadedCount = 0;
    const checkLoaded = () => {
      loadedCount++;
      if (loadedCount >= 2) setLoading(false);
    };

    const unsubAbout = onValue(aboutRef, (snap) => {
      setAboutData(snap.val());
      checkLoaded();
    }, () => checkLoaded());

    const unsubHome = onValue(homeRef, (snap) => {
      setHomeData(snap.val());
      checkLoaded();
    }, () => checkLoaded());

    return () => {
      unsubAbout();
      unsubHome();
    };
  }, []);

  const defaultTimeline = [
    {
      year: "২০১৮",
      year_en: "2018",
      title_bn: "প্রতিষ্ঠা ও প্রথম যাত্রা",
      title_en: "Founding & Inception",
      desc_bn: "নরসিংদীর প্রত্যন্ত গ্রামে ১০ জন কর্মঠ নারীকে জামানতবিহীন ঋণ দেওয়ার মাধ্যমে অঙ্কুরের পথচলা শুরু হয়।",
      desc_en: "Onkur starts in Narsingdi by distributing microloans to 10 rural women without collateral."
    },
    {
      year: "২০২০",
      year_en: "2020",
      title_bn: "প্রথম প্রাতিষ্ঠানিক শাখা",
      title_en: "First Institutional Branch",
      desc_bn: "কার্যক্রম সম্প্রসারণে নরসিংদী সদরে প্রথম আনুষ্ঠানিক শাখা অফিস চালু ও ঋণ বীমা কভারেজ যুক্ত করা।",
      desc_en: "First formal branch opens in Narsingdi town, introducing borrower death/disability credit insurance."
    },
    {
      year: "২০২৩",
      year_en: "2023",
      title_bn: "১০টি জেলায় ঋণ কার্যক্রম",
      title_en: "Expansion to 10 Districts",
      desc_bn: "গ্রামীণ নারীদের স্বাবলম্বী করার সাফল্য বাস্তবায়নে ১০টি জেলায় শাখার বিস্তৃতি ও ১০ হাজার ঋণগ্রহীতা পার।",
      desc_en: "Branch network expands to 10 districts, serving over 10,000 active rural borrowers."
    },
    {
      year: "২০২৬",
      year_en: "2026",
      title_bn: "ডিজিটাল ট্র্যাকিং ও এমএফএস সংহতি",
      title_en: "Digital Tracking & MFS Integration",
      desc_bn: "মোবাইল ফিন্যান্সিয়াল সার্ভিস সংহতকরণের মাধ্যমে কিস্তি ও সঞ্চয় আদায়ের সহজীকরণ।",
      desc_en: "Integrates mobile financial services (MFS) for installment collection and flexible savings withdrawals."
    }
  ];

  const defaultApproachPoints = [
    {
      icon: "ShieldCheck",
      title_bn: "মাঠপর্যায়ে পুঙ্খানুপুঙ্খ যাচাই",
      title_en: "Thorough Ground Verification",
      desc_bn: "সহজ ঋণ ও সুদমুক্ত নীতি নিশ্চিত করতে আমাদের মাঠ কর্মকর্তারা সরেজমিনে আবেদনকারীর ঠিকানা ও ক্ষুদ্র ব্যবসার উপযোগিতা যাচাই করেন।",
      desc_en: "Field officers complete address and small-scale business feasibility assessments to ensure fair eligibility."
    },
    {
      icon: "Users",
      title_bn: "কমিউনিটি ও গ্রুপ সংহতি",
      title_en: "Community Group Committees",
      desc_bn: "আমরা ঋণ বিতরণে গ্রামীণ সমষ্টিগত নিশ্চয়তা ব্যবস্থার ওপর জোর দিই, যেখানে স্থানীয় সদস্যদের সমন্বয়ে কমিটি তদারকি নিশ্চিত করে।",
      desc_en: "Borrowers form small mutual support groups with localized community committees providing monitoring."
    },
    {
      icon: "TrendingUp",
      title_bn: "ধারাবাহিক তদারকি ও প্রবৃদ্ধি",
      title_en: "Ongoing Support & Monitoring",
      desc_bn: "শুধু ঋণ বিতরণ নয়, প্রতিটি ক্ষুদ্র ব্যবসার স্থায়ী প্রবৃদ্ধি নিশ্চিত করতে আমরা নিয়মিত পরামর্শ ও ব্যবসায়িক দিকনির্দেশনা দিই।",
      desc_en: "We offer business advice and weekly tracking to confirm sustainable progress and small enterprise growth."
    }
  ];

  const defaultMissionBullets = [
    { text_bn: "স্বচ্ছ ও ন্যায্য ক্ষুদ্রঋণ প্রদান", text_en: "Provide fair and transparent microloans" },
    { text_bn: "নারী ও গ্রামীণ পরিবারের ক্ষমতায়ন", text_en: "Empower women and rural families" },
    { text_bn: "কৃষক ও ক্ষুদ্র ব্যবসায়ীদের সহায়তা", text_en: "Support farmers and small businesses" },
    { text_bn: "আর্থিক সচেতনতা বৃদ্ধি", text_en: "Promote financial literacy" },
    { text_bn: "প্রতিটি সম্পদকে কমিউনিটির কল্যাণে পুনঃবিনিয়োগ", text_en: "Reinvest every resource into communities" }
  ];

  const defaultVisionBullets = [
    { text_bn: "সকলের জন্য আর্থিক অন্তর্ভুক্তির বাংলাদেশ", text_en: "A Bangladesh with financial inclusion for all" },
    { text_bn: "মর্যাদার সাথে স্বাবলম্বী সমাজ", text_en: "Communities thriving with dignity" },
    { text_bn: "সামাজিক পরিবর্তনে নারীদের নেতৃত্ব", text_en: "Women leading social transformation" },
    { text_bn: "উন্নত কৃষি ও গ্রামীণ উদ্যোগ", text_en: "Stronger agriculture and rural enterprises" },
    { text_bn: "টেকসই প্রবৃদ্ধির মাধ্যমে দারিদ্র্য বিমোচন", text_en: "Poverty reduced through sustainable growth" }
  ];

  const defaultValuesBullets = [
    { text_bn: "প্রতিটি কাজে সততা", text_en: "Integrity in every action" },
    { text_bn: "মানুষ ও নতুন ধারণার ক্ষমতায়ন", text_en: "Empowerment of people and ideas" },
    { text_bn: "সুবিধাবঞ্চিতদের জন্য সমতা ও অন্তর্ভুক্তি", text_en: "Inclusivity for the underserved" },
    { text_bn: "টেকসই সমাধান", text_en: "Sustainability in solutions" },
    { text_bn: "মর্যাদা ও শ্রদ্ধার সাথে সহমর্মিতা", text_en: "Compassion with dignity and respect" }
  ];

  const getApproachIcon = (iconName: string) => {
    switch (iconName) {
      case "ShieldCheck": return <ShieldCheck className="w-6 h-6 text-[#C65D2E]" />;
      case "Users": return <Users className="w-6 h-6 text-[#C65D2E]" />;
      case "TrendingUp": return <TrendingUp className="w-6 h-6 text-[#C65D2E]" />;
      default: return <ShieldCheck className="w-6 h-6 text-[#C65D2E]" />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh] bg-[#FBF6EE] py-20">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#1F4A3D]"></div>
      </div>
    );
  }

  return (
    <div className="py-16 md:py-24 space-y-24">
      
      {/* 1. Header Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
        <span className="text-[#C65D2E] font-semibold text-sm uppercase tracking-wider block mb-2">
          {tContent("আমাদের পরিচয়", "Who We Are")}
        </span>
        <h1 className="text-4xl md:text-5xl font-bold text-[#1F4A3D] mb-6">
          {tContent(aboutData?.heading_bn || "আমাদের পথচলা", aboutData?.heading_en || "Our Journey")}
        </h1>
        <p className="text-lg md:text-xl text-[#2B2621] leading-relaxed font-normal">
          {tContent(
            aboutData?.body_bn || "অঙ্কুর ফাউন্ডেশন গ্রামীণ অঞ্চলের দরিদ্র ও সুবিধাবঞ্চিত জনগোষ্ঠীর অর্থনৈতিক মুক্তির লক্ষ্যে কাজ করে চলেছে। আমরা বিশ্বাস করি, ক্ষুদ্র ঋণের সহায়তায় মানুষ তাদের সুপ্ত প্রতিভার বিকাশ ঘটিয়ে স্বাবলম্বী হতে পারে।",
            aboutData?.body_en || "Onkur Foundation operates with the goal of economic liberation for poor and underserved communities in rural areas. We believe that with small loans, people can unlock their potential and achieve self-reliance."
          )}
        </p>
      </section>

      {/* 2. Visual Narrative Grid - Mapped approach points */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-md border border-[#1F4A3D]/10 bg-gray-100">
            <img
              src={aboutData?.about_image_url || "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&q=80&w=800"}
              alt="Rural enterprise work"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-[#1F4A3D]">
              {tContent("আমাদের কাজের পদ্ধতি", "Our Operational Approach")}
            </h2>
            <p className="text-base text-[#2B2621] leading-relaxed font-normal">
              {tContent(
                aboutData?.approach_bn || "আমাদের পদ্ধতিটি সহজ: আমরা মাঠপর্যায়ে গিয়ে আবেদনকারীদের প্রয়োজনীয়তা মূল্যায়ন করি, জামানতবিহীন ঋণের সুবিধা দিই এবং ঋণগ্রহীতাদের অর্থনৈতিক উন্নয়ন তদারকি করি।",
                aboutData?.approach_en || "Our approach is simple: we assess applicants' needs directly on the ground, offer collateral-free loan options, and guide borrowers to ensure sustainable growth."
              )}
            </p>
            
            <div className="space-y-4 pt-2">
              {(aboutData?.approach_points || defaultApproachPoints).map((pt: any, idx: number) => (
                <div key={idx} className="flex gap-3.5 items-start p-4 rounded-xl hover:bg-[#1F4A3D]/5 transition-colors border border-[#1F4A3D]/5 bg-white">
                  <div className="bg-[#1F4A3D]/5 p-2.5 rounded-lg text-[#C65D2E] shrink-0 mt-0.5">
                    {getApproachIcon(pt.icon)}
                  </div>
                  <div>
                    <h4 className="font-bold text-[#1F4A3D] text-sm">
                      {tContent(pt.title_bn, pt.title_en)}
                    </h4>
                    <p className="text-xs text-[#2B2621] font-normal mt-0.5 leading-relaxed">
                      {tContent(pt.desc_bn, pt.desc_en)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* Leadership Message Block */}
      <section className="bg-[#FBF6EE]/30 py-16 border-y border-[#1F4A3D]/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden shrink-0 border-4 border-[#1F4A3D]/10 bg-gray-100 shadow-md">
              <img 
                src={aboutData?.chairman_image_url || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400"} 
                alt="Chairman Arfan Ali" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-4 relative text-center md:text-left">
              <Quote className="w-8 h-8 text-[#C65D2E]/20 absolute -top-4 -left-4 hidden md:block" />
              <p className="text-base sm:text-lg text-[#2B2621] font-normal leading-relaxed italic">
                "{tContent(
                  aboutData?.chairman_message_bn || "অঙ্কুর ফাউন্ডেশনের মূল উদ্দেশ্য হলো প্রতিটি প্রান্তিক ও সুবিধাবঞ্চিত পরিবারকে একটি মর্যাদাপূর্ণ জীবনের সুযোগ করে দেওয়া। আমরা কেবল মূলধন সরবরাহ করি না, বরং তাদের সুপ্ত সম্ভাবনার বিকাশ ঘটিয়ে টেকসই অর্থনৈতিক ক্ষমতায়ন নিশ্চিত করতে কাজ করি।",
                  aboutData?.chairman_message_en || "At Onkur, our primary goal is to ensure a life of dignity and self-reliance for every marginalized family. We don't just provide capital; we walk with our borrowers, helping them harness their inner potential."
                )}"
              </p>
              <div>
                <h4 className="font-bold text-[#1F4A3D] text-sm">
                  {tContent(aboutData?.chairman_name_bn || "আরফান আলী", aboutData?.chairman_name_en || "Arfan Ali")}
                </h4>
                <p className="text-xs text-[#2B2621] font-semibold tracking-wider uppercase">
                  {tContent(aboutData?.chairman_title_bn || "চেয়ারম্যান, অঙ্কুর ফাউন্ডেশন", aboutData?.chairman_title_en || "Chairman, Onkur Foundation")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* History timeline Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-[#C65D2E] font-semibold text-sm uppercase tracking-wider block">
            {tContent("ইতিহাস ও মাইলফলক", "Timeline & Milestones")}
          </span>
          <h2 className="text-3xl font-bold text-[#1F4A3D]">
            {tContent(aboutData?.history_title_bn || "আমাদের পথচলার ইতিহাস", aboutData?.history_title_en || "Our History & Achievements")}
          </h2>
        </div>

        <div className="relative border-l-2 border-[#1F4A3D]/10 pl-6 ml-4 space-y-10">
          {(aboutData?.timeline || defaultTimeline).map((milestone: any, idx: number) => (
            <div key={idx} className="relative space-y-1.5">
              {/* Timeline dot */}
              <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-[#C65D2E] border-4 border-white shadow-xs"></div>
              
              <div className="flex items-center gap-3">
                <span className="text-lg font-bold text-[#C65D2E]">
                  {tContent(milestone.year, milestone.year_en)}
                </span>
                <span className="h-px bg-[#1F4A3D]/10 w-8"></span>
                <h3 className="text-base font-bold text-[#1F4A3D]">
                  {tContent(milestone.title_bn, milestone.title_en)}
                </h3>
              </div>
              <p className="text-sm text-[#2B2621]/70 font-light leading-relaxed max-w-2xl">
                {tContent(milestone.desc_bn, milestone.desc_en)}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Deep Dive into Mission/Vision/Values */}
      <section className="bg-white py-16 border-y border-[#1F4A3D]/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Mission Panel */}
            <div className="bg-[#FBF6EE]/40 p-8 rounded-2xl border border-[#1F4A3D]/5 space-y-6">
              <h3 className="text-2xl font-bold text-[#1F4A3D] border-b border-[#1F4A3D]/10 pb-3">
                {tContent("আমাদের লক্ষ্য (Mission)", "Our Mission")}
              </h3>
              <ul className="space-y-3.5">
                {(homeData?.mission_bullets || defaultMissionBullets).map((bullet: any, idx: number) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#C65D2E] shrink-0 mt-0.5" />
                    <span className="text-sm font-normal text-[#2B2621]">
                      {tContent(bullet.text_bn, bullet.text_en)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Vision Panel */}
            <div className="bg-[#FBF6EE]/40 p-8 rounded-2xl border border-[#1F4A3D]/5 space-y-6">
              <h3 className="text-2xl font-bold text-[#1F4A3D] border-b border-[#1F4A3D]/10 pb-3">
                {tContent("আমাদের স্বপ্ন (Vision)", "Our Vision")}
              </h3>
              <ul className="space-y-3.5">
                {(homeData?.vision_bullets || defaultVisionBullets).map((bullet: any, idx: number) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#C9973B] shrink-0 mt-0.5" />
                    <span className="text-sm font-normal text-[#2B2621]">
                      {tContent(bullet.text_bn, bullet.text_en)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Values Panel */}
            <div className="bg-[#FBF6EE]/40 p-8 rounded-2xl border border-[#1F4A3D]/5 space-y-6">
              <h3 className="text-2xl font-bold text-[#1F4A3D] border-b border-[#1F4A3D]/10 pb-3">
                {tContent("মূল্যবোধ (Values)", "Our Values")}
              </h3>
              <ul className="space-y-3.5">
                {(homeData?.values_bullets || defaultValuesBullets).map((bullet: any, idx: number) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#1F4A3D] shrink-0 mt-0.5" />
                    <span className="text-sm font-normal text-[#2B2621]">
                      {tContent(bullet.text_bn, bullet.text_en)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
