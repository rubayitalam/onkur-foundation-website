"use client";

import React, { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "@/lib/firebase";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import { 
  Sprout, 
  TrendingUp, 
  Coins, 
  HeartHandshake, 
  ShieldCheck, 
  PiggyBank, 
  FileText, 
  CheckCircle2, 
  ArrowRight,
  Sparkles,
  Percent,
  CalendarDays
} from "lucide-react";
import Link from "next/link";

export default function ServicesPage() {
  const { tContent } = useLanguage();
  const [servicesData, setServicesData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Fallbacks for seeding transition
  const defaultServices = {
    heading_bn: "আমাদের সেবাসমূহ",
    heading_en: "Our Services",
    intro_bn: "অঙ্কুর ফাউন্ডেশন মাইক্রোক্রেডিট রেগুলেটরি অথরিটি (MRA)-র নির্দেশনা অনুসরণ করে দুই ধরনের ঋণ প্রোডাক্ট পরিচালনা করে। নিচে প্রতিটি প্রোডাক্টের বিস্তারিত শর্তাবলি দেওয়া হলো।",
    intro_en: "Onkur Foundation operates two loan products under the guidance of the Microcredit Regulatory Authority (MRA). Full terms for each product are detailed below.",
    items: [
      {
        title_bn: "ক্ষুদ্র (জাগরণ) ঋণ",
        title_en: "Khudro (Jagoron) Loan",
        short_desc_bn: "সমিতি-ভিত্তিক সাপ্তাহিক ঋণ, একচেটিয়াভাবে আয়বর্ধক কাজে নিয়োজিত নারীদের জন্য।",
        short_desc_en: "A committee-based weekly loan program exclusively for women engaged in income-generating work.",
        full_desc_bn: "ক্ষুদ্র (জাগরণ) ঋণ হলো অঙ্কুর ফাউন্ডেশনের মূল ক্ষুদ্রঋণ কর্মসূচি, যা সমিতি-ভিত্তিক পদ্ধতিতে পরিচালিত হয়। এই ঋণ শুধুমাত্র আয়বর্ধক কাজে নিয়োজিত নারীদের জন্য প্রযোজ্য। সদস্যপদের জন্য বয়স ১৮-৬০ বছরের মধ্যে হতে হবে এবং শারীরিক ও মানসিকভাবে সুস্থ থাকতে হবে, এবং শাখার কর্ম এলাকায় স্থায়ীভাবে বসবাস করতে হবে। ভর্তি ফি ১০ টাকা (অফেরতযোগ্য, শুধুমাত্র নতুন ও ফেরত আসা সদস্যদের জন্য)। প্রতিটি সমিতিতে ন্যূনতম ১০ জন এবং সর্বোচ্চ ৩০ জন সদস্য থাকে, যেখানে ১ জন সভানেত্রী, ১ জন সেক্রেটারি ও ১ জন ক্যাশিয়ার নির্বাচিত হন।",
        full_desc_en: "The Khudro (Jagoron) Loan is Onkur Foundation's core microcredit program, operated through a committee-based (samity) system. It is available exclusively to women engaged in income-generating activities. Members must be between 18-60 years old, physically and mentally fit, and permanently reside within the branch's operating area. The admission fee is BDT 10 (non-refundable, applicable to new and returning members only). Each committee has a minimum of 10 and a maximum of 30 members, with one chairperson, one secretary, and one cashier elected from among the members.",
        loan_range_bn: "প্রথম দফা ২০,০০০ - ৫০,০০০ টাকা। সর্বোচ্চ সিলিং ১,০০,০০০ টাকা (সরেজমিনে যাচাই ও সদস্যের সক্ষমতার ভিত্তিতে)। ঋণের পরিমাণ হাজারে রাউন্ড ফিগারে হবে।",
        loan_range_en: "First phase BDT 20,000 - 50,000. Maximum ceiling BDT 100,000 (based on field verification and member capacity). Loan amounts are rounded to the nearest thousand.",
        tenure_bn: "১ বছর (৪৬ সপ্তাহ)। সাপ্তাহিক কিস্তি প্রতি হাজারে ২৫ টাকা। ক্রমহ্রাসমান সার্ভিস চার্জ হার বার্ষিক ২২%।",
        tenure_en: "1 year (46 weeks). Weekly installment BDT 25 per thousand. Declining service charge rate of 22% annually.",
        icon: "Sprout",
        image_url: ""
      },
      {
        title_bn: "ক্ষুদ্র ব্যবসা ও উদ্যোক্তা (অগ্রসর) ঋণ",
        title_en: "Small Business & Entrepreneur (Progoshor) Loan",
        short_desc_bn: "নারী ও পুরুষ উভয়ের জন্য উন্মুক্ত, ব্যবসা সম্প্রসারণ ও উদ্যোক্তা উন্নয়নের জন্য ডিজাইন করা ঋণ।",
        short_desc_en: "Open to both men and women, designed for business expansion and entrepreneurship development.",
        full_desc_bn: "ক্ষুদ্র ব্যবসা ও উদ্যোক্তা (অগ্রসর) ঋণ আয়বর্ধক কাজে নিয়োজিত নারী ও পুরুষ উভয়ের জন্য উন্মুক্ত। এই প্রোডাক্টে সমিতি-ভিত্তিক অথবা এককভাবে (উদ্যোক্তা-ভিত্তিক) ঋণ নেওয়া যায়, এবং সাপ্তাহিক বা মাসিক কিস্তিতে পরিশোধ করা যায়। আবেদনকারীর অবশ্যই দৃশ্যমান ও বৈধ ব্যবসা বা প্রকল্প থাকতে হবে। ৫০,০০০ টাকা বা তদূর্ধ্ব ঋণ বিতরণের ক্ষেত্রে অতিরিক্ত ডকুমেন্টেশন (নন-জুডিশিয়াল স্ট্যাম্পে অঙ্গীকারনামা, দুইজন জামিনদার) প্রয়োজন হয়।",
        full_desc_en: "The Small Business & Entrepreneur (Progoshor) Loan is open to both men and women engaged in income-generating activities. This product can be taken on a committee basis or individually (entrepreneur-based), with weekly or monthly repayment options. Applicants must have a visible and legitimate business or project. Loans of BDT 50,000 or above require additional documentation (a non-judicial stamp declaration and two guarantors).",
        loan_range_bn: "প্রথম দফা ৫০,০০০ - ২,০০,০০০ টাকা। সর্বোচ্চ সিলিং ১৫,০০,০০০ টাকা (সরেজমিনে যাচাই ও সদস্যের সক্ষমতার ভিত্তিতে)। প্রথম দফা ১,০০,০০০ টাকার বেশি ঋণ বৃদ্ধির ক্ষেত্রে প্রধান কার্যালয়ের পূর্বানুমোদন প্রয়োজন।",
        loan_range_en: "First phase BDT 50,000 - 200,000. Maximum ceiling BDT 1,500,000 (based on field verification and member capacity). Increases beyond BDT 100,000 in subsequent phases require head office pre-approval.",
        tenure_bn: "১ বছর। সাপ্তাহিক কিস্তি প্রতি হাজারে ২৫ টাকা অথবা মাসিক প্রতি হাজারে ৯৫ টাকা। ক্রমহ্রাসমান সার্ভিস চার্জ হার বার্ষিক ২২%।",
        tenure_en: "1 year. Weekly installment BDT 25 per thousand, or monthly BDT 95 per thousand. Declining service charge rate of 22% annually.",
        icon: "TrendingUp",
        image_url: ""
      }
    ],
    shared_benefits_heading_bn: "উভয় ঋণ প্রোডাক্টের সাথে অন্তর্ভুক্ত সুবিধা",
    shared_benefits_heading_en: "Benefits Included with Both Loan Products",
    shared_benefits: [
      {
        title_bn: "সঞ্চয়ী হিসাব",
        title_en: "Savings Account",
        desc_bn: "সাপ্তাহিক সর্বোচ্চ ৩০ টাকা বা মাসিক ১০০ টাকা পর্যন্ত সঞ্চয় জমা রাখা যায়। ঋণ থাকাকালীন মূল ঋণের ১০% এর অতিরিক্ত সঞ্চয় রাউন্ড ফিগারে উত্তোলনযোগ্য। সঞ্চয় স্থিতির উপর বার্ষিক ৬% হারে সুদ প্রদান করা হয়।",
        desc_en: "Members can save up to BDT 30 weekly or BDT 100 monthly. Any savings beyond 10% of the outstanding loan can be withdrawn in round figures. An annual interest rate of 6% is paid on the savings balance."
      },
      {
        title_bn: "ঋণ বীমা ও সুবিধাদি",
        title_en: "Loan Insurance & Benefits",
        desc_bn: "প্রতি ঋণগ্রহীতাকে গৃহীত (আসল) ঋণের ০.৫% বা হাজারে ৫ টাকা প্রিমিয়াম জমা দিতে হয়। নিয়মিত ঋণগ্রহীতার মৃত্যু বা প্রমাণিত স্থায়ী অক্ষমতার ক্ষেত্রে অবশিষ্ট ঋণ মওকুফ করা হয় এবং নমিনিকে দাফন-কাফন বাবদ ১০,০০০ টাকা প্রদান করা হয়।",
        desc_en: "Each borrower pays a premium of 0.5% (or BDT 5 per thousand) of the principal loan received. In case of death or proven permanent disability of a regular borrower, the remaining loan is waived and BDT 10,000 is provided to the nominee for funeral expenses."
      },
      {
        title_bn: "জামানতবিহীন ঋণ",
        title_en: "Collateral-Free",
        desc_bn: "কোনো জামানত বা স্থাবর সম্পত্তি ছাড়াই ঋণ প্রদান করা হয়। শুধুমাত্র একজন জামিনদার (১৮-৬০ বছর বয়সী, শারীরিক ও মানসিকভাবে সুস্থ) প্রয়োজন হয়।",
        desc_en: "Loans are provided without any collateral or immovable property. Only one guarantor (aged 18-60, physically and mentally fit) is required."
      },
      {
        title_bn: "অগ্রিম কিস্তি সুবিধা",
        title_en: "Advance Installment Facility",
        desc_bn: "মেয়াদ পূর্তির পূর্বে সর্বশেষ ৫টি কিস্তি পর্যন্ত অগ্রিম পরিশোধ করা যায়, যার উপর সার্ভিস চার্জ মওকুফ পাওয়া যায়।",
        desc_en: "Borrowers can pay up to the last 5 installments in advance before maturity, with the corresponding service charge waived."
      }
    ],
    eligibility_heading_bn: "সাধারণ যোগ্যতা ও প্রয়োজনীয় কাগজপত্র",
    eligibility_heading_en: "General Eligibility & Required Documents",
    eligibility_points_bn: [
      "বয়স ১৮-৬০ বছরের মধ্যে হতে হবে এবং শারীরিক ও মানসিকভাবে সুস্থ হতে হবে",
      "শাখার কর্ম এলাকায় স্থায়ীভাবে বসবাস করতে হবে",
      "সদস্যের ভোটার আইডি কার্ড থাকতে হবে এবং ফটোকপি জমা দিতে হবে",
      "জামিনদারের সাম্প্রতিক সময়ের ৩ কপি রঙিন জয়েন্ট পাসপোর্ট সাইজ ছবি জমা দিতে হবে",
      "মিউচুয়াল ট্রাস্ট ব্যাংকে সঞ্চয়ী হিসাব থাকতে হবে",
      "ভাড়াটিয়া ঋণগ্রহীতার ক্ষেত্রে একই এলাকায় কমপক্ষে ৩ বছর বসবাসের প্রমাণ থাকতে হবে"
    ],
    eligibility_points_en: [
      "Must be between 18-60 years old and physically/mentally fit",
      "Must permanently reside within the branch's working area",
      "Must have a Voter ID card and submit a photocopy",
      "Guarantor must submit 3 recent color joint passport-size photos",
      "Must have a savings account at Mutual Trust Bank",
      "Tenant borrowers must show proof of at least 3 years' residence in the same area"
    ]
  };

  useEffect(() => {
    const servicesRef = ref(db, "siteContent/services");
    const unsub = onValue(servicesRef, (snapshot) => {
      if (snapshot.exists()) {
        setServicesData(snapshot.val());
      } else {
        setServicesData(defaultServices);
      }
      setLoading(false);
    }, () => {
      setServicesData(defaultServices);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  const getProductIcon = (iconName: string) => {
    switch (iconName) {
      case "Sprout":
        return <Sprout className="w-8 h-8 text-[#C65D2E]" />;
      case "TrendingUp":
        return <TrendingUp className="w-8 h-8 text-[#C65D2E]" />;
      default:
        return <Sprout className="w-8 h-8 text-[#C65D2E]" />;
    }
  };

  const getBenefitIcon = (idx: number) => {
    switch (idx) {
      case 0:
        return <PiggyBank className="w-6 h-6 text-[#1F4A3D]" />;
      case 1:
        return <HeartHandshake className="w-6 h-6 text-[#1F4A3D]" />;
      case 2:
        return <ShieldCheck className="w-6 h-6 text-[#1F4A3D]" />;
      case 3:
        return <Coins className="w-6 h-6 text-[#1F4A3D]" />;
      default:
        return <ShieldCheck className="w-6 h-6 text-[#1F4A3D]" />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh] bg-[#FBF6EE] py-20">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#1F4A3D]"></div>
      </div>
    );
  }

  const content = servicesData || defaultServices;

  return (
    <div className="py-16 md:py-24 space-y-24">
      
      {/* 1. Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl space-y-4">
        <span className="text-[#C65D2E] font-semibold text-sm uppercase tracking-wider block">
          {tContent("আমাদের ঋণ কর্মসূচি", "Loan Programs")}
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#1F4A3D]">
          {tContent(content.heading_bn, content.heading_en)}
        </h1>
        <p className="text-base sm:text-lg text-[#2B2621] leading-relaxed font-normal">
          {tContent(content.intro_bn, content.intro_en)}
        </p>
      </section>

      {/* 2. Detailed Loan Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {(content.items || []).map((product: any, idx: number) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white rounded-3xl p-8 md:p-10 border border-[#1F4A3D]/5 shadow-sm space-y-6 flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#1F4A3D]/5 rounded-bl-full flex items-center justify-center transition-colors group-hover:bg-[#C65D2E]/10">
                {getProductIcon(product.icon)}
              </div>
              
              <div className="space-y-4 pr-12">
                <h3 className="text-2xl font-bold text-[#1F4A3D]">
                  {tContent(product.title_bn, product.title_en)}
                </h3>
                <p className="text-sm font-semibold text-[#C9973B]">
                  {tContent(product.short_desc_bn, product.short_desc_en)}
                </p>
                <p className="text-sm text-[#2B2621] leading-relaxed font-normal">
                  {tContent(product.full_desc_bn, product.full_desc_en)}
                </p>
              </div>

              <div className="pt-6 border-t border-[#1F4A3D]/10 space-y-4 mt-6">
                <div className="flex items-start gap-3">
                  <div className="bg-[#1F4A3D]/5 p-2 rounded-lg text-[#1F4A3D] shrink-0 mt-0.5">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#1F4A3D] uppercase tracking-wider">
                      {tContent("ঋণ সীমা ও পরিধি", "Loan Range & Limit")}
                    </h4>
                    <p className="text-sm text-[#2B2621] font-normal mt-0.5">
                      {tContent(product.loan_range_bn, product.loan_range_en)}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-[#1F4A3D]/5 p-2 rounded-lg text-[#1F4A3D] shrink-0 mt-0.5">
                    <CalendarDays className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#1F4A3D] uppercase tracking-wider">
                      {tContent("মেয়াদ ও পরিশোধ পদ্ধতি", "Tenure & Repayment")}
                    </h4>
                    <p className="text-sm text-[#2B2621] font-normal mt-0.5">
                      {tContent(product.tenure_bn, product.tenure_en)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <Link
                  href="/contact"
                  className="inline-flex items-center bg-[#1F4A3D] hover:bg-[#15342b] text-white px-5 py-3 rounded-lg text-sm font-semibold transition-colors gap-2"
                >
                  <span>{tContent("ঋণের আবেদন করুন", "Apply for Loan")}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. Shared Benefits Grid */}
      <section className="bg-[#FBF6EE]/30 py-20 border-y border-[#1F4A3D]/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl font-bold text-[#1F4A3D]">
              {tContent(content.shared_benefits_heading_bn, content.shared_benefits_heading_en)}
            </h2>
            <p className="text-sm text-[#2B2621] font-normal">
              {tContent("অঙ্কুরের প্রতিটি ঋণের সাথে আমরা প্রান্তিক মানুষের আর্থ-সামাজিক নিরাপত্তা ও স্বস্তি নিশ্চিত করি।", "With every Onkur loan, we ensure the socio-economic security and comfort of rural borrowers.")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {(content.shared_benefits || []).map((benefit: any, idx: number) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="bg-white p-6 rounded-2xl border border-[#1F4A3D]/5 shadow-xs space-y-4 flex flex-col justify-start hover:shadow-sm transition-shadow"
              >
                <div className="bg-[#1F4A3D]/5 p-3 rounded-xl w-fit">
                  {getBenefitIcon(idx)}
                </div>
                <h4 className="font-bold text-slate-900 text-base">
                  {tContent(benefit.title_bn, benefit.title_en)}
                </h4>
                <p className="text-xs text-slate-700 leading-relaxed font-normal flex-grow">
                  {tContent(benefit.desc_bn, benefit.desc_en)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Eligibility Checklist */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 md:p-12 border border-[#1F4A3D]/5 shadow-sm space-y-8">
          <div className="space-y-3 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-[#C65D2E]">
              <FileText className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-wider">{tContent("ঋণ গ্রহণের নির্দেশিকা", "Guidelines")}</span>
            </div>
            <h2 className="text-3xl font-extrabold text-[#1F4A3D]">
              {tContent(content.eligibility_heading_bn, content.eligibility_heading_en)}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 pt-2">
            {tContent(content.eligibility_points_bn, content.eligibility_points_en)?.map((point: string, idx: number) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="flex items-start gap-3.5"
              >
                <CheckCircle2 className="w-5 h-5 text-[#C65D2E] shrink-0 mt-0.5" />
                <span className="text-[#2B2621] text-sm font-normal leading-relaxed">
                  {point}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
