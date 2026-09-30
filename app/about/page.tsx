"use client";

import React, { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "@/lib/firebase";
import { useLanguage } from "@/context/LanguageContext";
import {
  CheckCircle2,
  ShieldCheck,
  Heart,
  Sparkles,
  Users,
  TrendingUp,
  Target,
  Eye,
  Compass,
  Lightbulb,
  Zap,
  Leaf,
} from "lucide-react";

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

    const unsubAbout = onValue(
      aboutRef,
      (snap) => {
        setAboutData(snap.val());
        checkLoaded();
      },
      () => checkLoaded(),
    );

    const unsubHome = onValue(
      homeRef,
      (snap) => {
        setHomeData(snap.val());
        checkLoaded();
      },
      () => checkLoaded(),
    );

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
      desc_bn:
        "নরসিংদীর প্রত্যন্ত গ্রামে ১০ জন কর্মঠ নারীকে জামানতবিহীন ঋণ দেওয়ার মাধ্যমে অঙ্কুরের পথচলা শুরু হয়।",
      desc_en:
        "Onkur starts in Narsingdi by distributing microloans to 10 rural women without collateral.",
    },
    {
      year: "২০২০",
      year_en: "2020",
      title_bn: "প্রথম প্রাতিষ্ঠানিক শাখা",
      title_en: "First Institutional Branch",
      desc_bn:
        "কার্যক্রম সম্প্রসারণে নরসিংদী সদরে প্রথম আনুষ্ঠানিক শাখা অফিস চালু ও ঋণ বীমা কভারেজ যুক্ত করা।",
      desc_en:
        "First formal branch opens in Narsingdi town, introducing borrower death/disability credit insurance.",
    },
    {
      year: "২০২৩",
      year_en: "2023",
      title_bn: "১০টি জেলায় ঋণ কার্যক্রম",
      title_en: "Expansion to 10 Districts",
      desc_bn:
        "গ্রামীণ নারীদের স্বাবলম্বী করার সাফল্য বাস্তবায়নে ১০টি জেলায় শাখার বিস্তৃতি ও ১০ হাজার ঋণগ্রহীতা পার।",
      desc_en:
        "Branch network expands to 10 districts, serving over 10,000 active rural borrowers.",
    },
    {
      year: "২০২৬",
      year_en: "2026",
      title_bn: "ডিজিটাল ট্র্যাকিং ও এমএফএস সংহতি",
      title_en: "Digital Tracking & MFS Integration",
      desc_bn:
        "মোবাইল ফিন্যান্সিয়াল সার্ভিস সংহতকরণের মাধ্যমে কিস্তি ও সঞ্চয় আদায়ের সহজীকরণ।",
      desc_en:
        "Integrates mobile financial services (MFS) for installment collection and flexible savings withdrawals.",
    },
  ];

  const defaultApproachPoints = [
    {
      icon: "ShieldCheck",
      title_bn: "মাঠপর্যায়ে পুঙ্খানুপুঙ্খ যাচাই",
      title_en: "Thorough Ground Verification",
      desc_bn:
        "সহজ ঋণ ও সুদমুক্ত নীতি নিশ্চিত করতে আমাদের মাঠ কর্মকর্তারা সরেজমিনে আবেদনকারীর ঠিকানা ও ক্ষুদ্র ব্যবসার উপযোগিতা যাচাই করেন।",
      desc_en:
        "Field officers complete address and small-scale business feasibility assessments to ensure fair eligibility.",
    },
    {
      icon: "Users",
      title_bn: "ডিজিটাল সদস্য অনবোর্ডিং ও ঋণ প্রদান",
      title_en: "Digital Member Onboarding and Loan Origination",
      desc_bn:
        "ভিবিডি ও ঋণ কর্মকর্তারা যোগ্য সদস্যকে ডিজিটালভাবে অনবোর্ডিং করতে সহায়তা করেন।",
      desc_en:
        "VDB/Loan officers facilitate onboarding the eligible member to onboard member digitally.",
    },
    {
      icon: "Users",
      title_bn: "কমিউনিটি ও গ্রুপ সংহতি",
      title_en: "Community Group Committees",
      desc_bn:
        "আমরা ঋণ বিতরণে গ্রামীণ সমষ্টিগত নিশ্চয়তা ব্যবস্থার ওপর জোর দিই, যেখানে স্থানীয় সদস্যদের সমন্বয়ে কমিটি তদারকি নিশ্চিত করে।",
      desc_en:
        "Borrowers form small mutual support groups with localized community committees providing monitoring.",
    },
    {
      icon: "TrendingUp",
      title_bn: "ধারাবাহিক তদারকি ও প্রবৃদ্ধি",
      title_en: "Ongoing Support & Monitoring",
      desc_bn:
        "শুধু ঋণ বিতরণ নয়, প্রতিটি ক্ষুদ্র ব্যবসার স্থায়ী প্রবৃদ্ধি নিশ্চিত করতে আমরা নিয়মিত পরামর্শ ও ব্যবসায়িক দিকনির্দেশনা দিই।",
      desc_en:
        "We offer business advice and weekly tracking to confirm sustainable progress and small enterprise growth.",
    },
  ];

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

  const valuesBullets = [
    {
      icon: ShieldCheck,
      title_en: "Integrity",
      title_bn: "সততা",
      text_en:
        "We act with honesty, transparency and accountability in everything we do.",
      text_bn:
        "আমরা আমাদের প্রতিটি কাজে সততা, স্বচ্ছতা ও জবাবদিহিতার সাথে কাজ করি।",
    },
    {
      icon: Users,
      title_en: "Inclusion",
      title_bn: "অন্তর্ভুক্তি",
      text_en:
        "We work to ensure that financial services reach people and communities who are underserved or excluded.",
      text_bn:
        "আমরা নিশ্চিত করার চেষ্টা করি যেন আর্থিক সেবা সুবিধাবঞ্চিত বা বাদপড়া মানুষ ও সম্প্রদায়ের কাছে পৌঁছায়।",
    },
    {
      icon: Heart,
      title_en: "Customer-Centricity",
      title_bn: "গ্রাহক-কেন্দ্রিকতা",
      text_en:
        "We listen to our clients and design services around their needs, aspirations and circumstances.",
      text_bn:
        "আমরা আমাদের গ্রাহকদের কথা শুনি এবং তাদের প্রয়োজন, আকাঙ্ক্ষা ও পরিস্থিতি বিবেচনায় নিয়ে সেবা ডিজাইন করি।",
    },
    {
      icon: Lightbulb,
      title_en: "Innovation",
      title_bn: "উদ্ভাবন",
      text_en:
        "We continuously explore new ideas, technologies and approaches to make financial services more accessible and effective.",
      text_bn:
        "আমরা আর্থিক সেবাকে আরও সহজলভ্য ও কার্যকর করতে ক্রমাগত নতুন ধারণা, প্রযুক্তি ও পদ্ধতি খুঁজে বের করি।",
    },
    {
      icon: Zap,
      title_en: "Empowerment",
      title_bn: "ক্ষমতায়ন",
      text_en:
        "We believe finance should enable people to make informed choices, build livelihoods and create opportunities.",
      text_bn:
        "আমরা বিশ্বাস করি, অর্থায়ন মানুষকে সচেতন সিদ্ধান্ত নিতে, জীবিকা গড়তে ও সুযোগ তৈরি করতে সক্ষম করা উচিত।",
    },
    {
      icon: Leaf,
      title_en: "Sustainability",
      title_bn: "স্থায়িত্ব",
      text_en:
        "We pursue long-term value for our clients, our institution and the communities we serve.",
      text_bn:
        "আমরা আমাদের গ্রাহক, প্রতিষ্ঠান ও সেবাপ্রাপ্ত সম্প্রদায়ের জন্য দীর্ঘমেয়াদী মূল্য তৈরির চেষ্টা করি।",
    },
  ];

  const getApproachIcon = (iconName: string) => {
    switch (iconName) {
      case "ShieldCheck":
        return <ShieldCheck className="w-6 h-6 text-primary" />;
      case "Users":
        return <Users className="w-6 h-6 text-primary" />;
      case "TrendingUp":
        return <TrendingUp className="w-6 h-6 text-primary" />;
      default:
        return <ShieldCheck className="w-6 h-6 text-primary" />;
    }
  };

  const approachPoints = aboutData?.approach_points
    ? aboutData.approach_points.some(
      (point: any) =>
        point.title_en === "Digital Member Onboarding and Loan Origination",
    )
      ? aboutData.approach_points
      : [
        ...aboutData.approach_points.slice(0, 1),
        defaultApproachPoints[1],
        ...aboutData.approach_points.slice(1),
      ]
    : defaultApproachPoints;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh] bg-white py-20">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-secondary/10"></div>
      </div>
    );
  }

  return (
    <div className="py-16 md:py-24 space-y-24">
      {/* 1. Header Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
        <h1 className="text-3xl md:text-4xl  font-bold text-secondary mb-6">
          {tContent(
            aboutData?.heading_bn ||
              "দায়িত্বশীল অর্থায়ন, ডিজিটাল উদ্ভাবন এবং টেকসই জীবিকার মাধ্যমে একটি অধিকতর অন্তর্ভুক্তিমূলক ভবিষ্যৎ গড়ে তোলা।",
            aboutData?.heading_en || "Our Journey",
          )}
        </h1>
        <div className="space-y-6 text-base md:text-lg text-gray-700 leading-relaxed font-normal text-left">
          <p>
            {tContent(
              "অঙ্কুর ফাউন্ডেশন একটি ক্ষুদ্রঋণ প্রদানকারী প্রতিষ্ঠান, যা বাংলাদেশের সুবিধাবঞ্চিত জনগোষ্ঠীর কাছে দায়িত্বশীল আর্থিক সেবার সুযোগ সম্প্রসারণে প্রতিশ্রুতিবদ্ধ। আমরা প্রথাগত ক্ষুদ্রঋণ কার্যক্রম থেকে সরে এসে এমন একটি ডিজিটাল, গ্রাহক-কেন্দ্রিক ও অন্তর্ভুক্তিমূলক আর্থিক সেবা মডেলের দিকে এগিয়ে যাচ্ছি, যা আমাদের গ্রাহকদের পরিবর্তনশীল চাহিদা পূরণে সক্ষম।আর্থিক সেবাকে আরও সহজলভ্য, সুবিধাজনক ও অন্তর্ভুক্তিমূলক করে তুলতে আমরা কমিউনিটি-ভিত্তিক ক্ষুদ্রঋণের ব্যাপক নেটওয়ার্ক ও পারস্পরিক সম্পর্কের সাথে ডিজিটাল প্রযুক্তির অপার সম্ভাবনাকে কাজে লাগাই।আমরা বিশ্বাস করি, সঠিক আর্থিক সেবার সুযোগ কেবল পুঁজি জোগানোর মধ্যেই সীমাবদ্ধ নয়—এটি মানুষকে প্রতিকূলতা কাটিয়ে ওঠার সক্ষমতা অর্জন, ব্যবসা সম্প্রসারণ ও কর্মসংস্থান সৃষ্টিতে সহায়তা করার পাশাপাশি তাদের পরিবার ও সমাজের সামগ্রিক জীবনযাত্রার মান উন্নয়নেও ভূমিকা রাখতে পারে।",
              <>
                Onkur Foundation is a microfinance institution committed to
                expand access to responsible financial services for underserved
                communities across Bangladesh. We are evolving from traditional
                microfinance toward a{" "}
                <strong className="font-bold text-secondary">
                  digital, customer-centric and inclusive financial services
                  model
                </strong>
                , designed to respond to the changing needs of our clients.
              </>,
            )}
          </p>

          <p>
            {tContent(
              "আর্থিক সেবাকে আরও সহজলভ্য, সুবিধাজনক ও অন্তর্ভুক্তিমূলক করে তুলতে আমরা কমিউনিটি-ভিত্তিক ক্ষুদ্রঋণের নেটওয়ার্কের সাথে ডিজিটাল প্রযুক্তির সম্ভাবনাকে কাজে লাগাচ্ছি।",
              "We combine the reach and relationships of community-based microfinance with the possibilities of digital technology to make financial services more accessible, convenient and inclusive.",
            )}
          </p>

          <p>
            {tContent(
              "আমরা বিশ্বাস করি, সঠিক আর্থিক সেবার সুযোগ কেবল পুঁজি জোগানোর মধ্যেই সীমাবদ্ধ নয়—এটি মানুষকে প্রতিকূলতা কাটিয়ে ওঠার সক্ষমতা অর্জন ও উন্নত জীবন গঠনে সহায়তা করে।",
              "We believe that access to the right financial services can do more than provide capital- it can help individuals build resilience, grow enterprises, create employment and improve the well-being of their families and communities.",
            )}
          </p>
        </div>
      </section>

      {/* Leadership Message Block */}
      <section className="bg-white py-16 border-y border-secondary/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden shrink-0 border-4 border-secondary/10 bg-gray-100 shadow-md">
              <img
                src={
                  aboutData?.chairman_image_url ||
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiW8MJGMyO7QRpm5nG4m3TZDys85f49orluIIZBMnhal0Yi0L2oHvVwYJf&s=10"
                }
                alt="Chairman Arfan Ali"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-4 text-center md:text-left">
              <p
                className="text-base sm:text-lg text-text font-medium leading-relaxed opacity-100"
                style={{ color: "#2B2621", opacity: 1 }}
              >
                {tContent(
                  aboutData?.chairman_message_bn ||
                  "অঙ্কুর ফাউন্ডেশনের মূল উদ্দেশ্য হলো প্রতিটি প্রান্তিক ও সুবিধাবঞ্চিত পরিবারকে একটি মর্যাদাপূর্ণ জীবনের সুযোগ করে দেওয়া। আমরা কেবল মূলধন সরবরাহ করি না, বরং তাদের সুপ্ত সম্ভাবনার বিকাশ ঘটিয়ে টেকসই অর্থনৈতিক ক্ষমতায়ন নিশ্চিত করতে কাজ করি।",
                  aboutData?.chairman_message_en ||
                  "At Onkur, our primary goal is to ensure a life of dignity and self-reliance for every marginalized family. We don't just provide capital; we walk with our borrowers, helping them harness their inner potential.",
                )}
              </p>
              <div>
                <h4 className="font-bold text-secondary text-sm sm:text-secondary">
                  {tContent(
                    aboutData?.chairman_name_bn || "আরফান আলী",
                    aboutData?.chairman_name_en || "Arfan Ali",
                  )}
                </h4>
                <p className="text-xs text-text font-semibold tracking-wider uppercase opacity-100">
                  {tContent(
                    aboutData?.chairman_title_bn ||
                    "চেয়ারম্যান, অঙ্কুর ফাউন্ডেশন",
                    aboutData?.chairman_title_en ||
                    "Chairman, Onkur Foundation",
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Deep Dive into Mission/Vision/Values */}
      <section className="py-20 text-left  ">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* 1. Mission */}
          <div className="space-y-3 pb-12 border-b border-secondary/10">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-secondary">
              {tContent("আমাদের লক্ষ্য", "Our Mission")}
            </h2>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed font-normal">
              {tContent(
                "দায়িত্বশীল ও উদ্ভাবনী আর্থিক সেবার প্রসার ঘটানো, যেখানে মানব-কেন্দ্রিক ক্ষুদ্রঋণকে ডিজিটাল সমাধানের সাথে সমন্বিত করে ব্যক্তি, উদ্যোক্তা ও সম্প্রদায়কে টেকসই জীবিকা গড়তে সক্ষম করা হয়।",
                "To expand access to responsible and innovative financial services by combining human-centered microfinance with digital solutions that empower individuals, entrepreneurs and communities to create sustainable livelihoods.",
              )}
            </p>
          </div>

          {/* 2. Vision */}
          <div className="space-y-3 pb-12 border-b border-secondary/10">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-secondary">
              {tContent("আমাদের স্বপ্ন", "Our Vision")}
            </h2>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed font-normal">
              {tContent(
                "একটি আর্থিকভাবে অন্তর্ভুক্তিমূলক বাংলাদেশ, যেখানে প্রত্যেকের একটি উন্নত ও স্থিতিস্থাপক ভবিষ্যৎ গড়ার সুযোগ থাকবে।",
                "A financially inclusive Bangladesh where everyone has the opportunity to build a better and more resilient future.",
              )}
            </p>
          </div>

          {/* 3. Values */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-secondary">
                {tContent("মূল্যবোধ", "Our Values")}
              </h2>
              <p className="text-xs font-semibold uppercase tracking-wider text-secondary/60 mt-1">
                {tContent("যা আমাদের পথ দেখায়", "What Guides Us")}
              </p>
            </div>

            <div className="space-y-6">
              {valuesBullets.map((bullet, idx: number) => {
                return (
                  <div key={idx} className="space-y-1">
                    <h4 className="text-base font-bold text-secondary">
                      {tContent(bullet.title_bn, bullet.title_en)}
                    </h4>
                    <p className="text-sm md:text-base leading-relaxed font-normal">
                      <span className="text-gray-900">
                        {tContent(bullet.text_bn, bullet.text_en)}
                      </span>
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* History timeline Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-3xl font-bold text-secondary">
            {tContent(
              aboutData?.history_title_bn || "আমাদের পথচলার ইতিহাস",
              aboutData?.history_title_en || "Our History & Achievements",
            )}
          </h2>
        </div>

        <div className="relative border-l-2 border-secondary/10 pl-6 ml-4 space-y-10">
          {(aboutData?.timeline || defaultTimeline).map(
            (milestone: any, idx: number) => (
              <div key={idx} className="relative space-y-1.5">
                {/* Timeline dot */}
                <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-primary border-4 border-white shadow-xs"></div>

                <div className="flex items-center gap-3">
                  <span className="text-lg font-bold text-primary">
                    {tContent(milestone.year, milestone.year_en)}
                  </span>
                  <span className="h-px bg-white/10 w-8"></span>
                  <h3 className="text-base font-bold text-secondary">
                    {tContent(milestone.title_bn, milestone.title_en)}
                  </h3>
                </div>
                <p className="text-sm text-text font-light leading-relaxed max-w-2xl">
                  {tContent(milestone.desc_bn, milestone.desc_en)}
                </p>
              </div>
            ),
          )}
        </div>
      </section>

      {/* 2. Visual Narrative Grid - Mapped approach points */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-secondary text-center py-10">
          {tContent("আমাদের কাজের পদ্ধতি", "Our Operational Approach")}
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-md border border-secondary/10 bg-gray-100">
            <img
              src={
                aboutData?.about_image_url ||
                "https://i.postimg.cc/T1R4vnpB/67585644119.png"
              }
              alt="Rural enterprise work"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-6">
            <p className="text-base text-text leading-relaxed font-normal">
              {tContent(
                aboutData?.approach_bn ||
                "আমাদের পদ্ধতিটি সহজ: আমরা মাঠপর্যায়ে গিয়ে আবেদনকারীদের প্রয়োজনীয়তা মূল্যায়ন করি, জামানতবিহীন ঋণের সুবিধা দিই এবং ঋণগ্রহীতাদের অর্থনৈতিক উন্নয়ন তদারকি করি।",
                aboutData?.approach_en ||
                "Our approach is simple: we assess applicants' needs directly on the ground, offer collateral-free loan options, and guide borrowers to ensure sustainable growth.",
              )}
            </p>

            <div className="space-y-4 pt-2">
              {approachPoints.map((pt: any, idx: number) => (
                <div
                  key={idx}
                  className="flex gap-3.5 items-start p-4 rounded-xl hover:bg-secondary/5 transition-colors border border-secondary/10 bg-white"
                >
                  <div className="bg-white/5 p-2.5 rounded-lg text-primary shrink-0 mt-0.5">
                    {getApproachIcon(pt.icon)}
                  </div>
                  <div>
                    <h4 className="font-bold text-secondary text-sm">
                      {tContent(pt.title_bn, pt.title_en)}
                    </h4>
                    <p className="text-xs text-text font-normal mt-0.5 leading-relaxed">
                      {tContent(pt.desc_bn, pt.desc_en)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
