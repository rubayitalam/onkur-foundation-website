"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Sprout,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  HeartHandshake,
  Store,
  Wheat,
  Building2,
  Users,
  Coins,
  CalendarDays,
  Percent,
  Banknote,
} from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

/* ---------- Content (add `bn` to any entry to localise it) ---------- */
type T = { en: string; bn?: string };
const tx = (en: string, bn?: string): T => ({ en, bn });

type Stat = {
  icon: React.ComponentType<{ className?: string }>;
  label: T;
  value: T;
  note?: T;
  note1?: T;
};

type Product = {
  icon: React.ComponentType<{ className?: string }>;
  title: T;
  tagline: T;
  stats: Stat[];
  eligibilityTitle: T;
  eligibility: [T, T][];
};

const audiences = [
  {
    icon: HeartHandshake,
    title: tx("Women Entrepreneurs", "নারী উদ্যোক্তা"),
    desc: tx(
      "Supporting women with access to finance and opportunities to strengthen their economic participation.",
      "অর্থ, সুযোগ ও আর্থিক অংশগ্রহণের মাধ্যমে নারীদের অর্থনৈতিক ক্ষমতায়নকে শক্তিশালী করার জন্য সহায়তা।",
    ),
  },
  {
    icon: Store,
    title: tx("Microentrepreneurs", "ক্ষুদ্র উদ্যোক্তা"),
    desc: tx(
      "Helping small entrepreneurs invest, grow their businesses and create sustainable livelihoods.",
      "ক্ষুদ্র উদ্যোক্তাদের বিনিয়োগ, ব্যবসা সম্প্রসারণ ও টেকসই জীবিকায় উন্নতি করতে সহায়তা করা।",
    ),
  },
  {
    icon: Wheat,
    title: tx("Smallholder Farmers", "কৃষক পরিবার"),
    desc: tx(
      "Providing financial solutions that respond to the realities of agricultural livelihoods.",
      "কৃষি জীবিকার বাস্তবতা অনুযায়ী উপযোগী আর্থিক সমাধান প্রদান করা।",
    ),
  },
  {
    icon: Building2,
    title: tx("Small & Growing Businesses", "ক্ষুদ্র ও প্রবৃদ্ধিশীল ব্যবসা"),
    desc: tx(
      "Helping enterprises access the working capital and investment finance they need to grow.",
      "বিকাশমান ব্যবসাগুলিকে কার্যকরী মূলধন ও বিনিয়োগের সহায়তা দিয়ে তাদের বৃদ্ধিতে সহায়তা করা।",
    ),
  },
  {
    icon: Users,
    title: tx("Underserved Communities", "সুবিধাবঞ্চিত সম্প্রদায়"),
    desc: tx(
      "Extending financial services to communities with limited access to formal financial institutions.",
      "আনুষ্ঠানিক আর্থিক প্রতিষ্ঠানের নাগালের বাইরে থাকা সম্প্রদায়ের কাছে সুলভ আর্থিক সেবা পৌঁছে দেওয়া।",
    ),
  },
];

const loans: Product[] = [
  {
    icon: Sprout,
    title: tx("Small Loan for Women", "নারীর জন্য ক্ষুদ্র ঋণ"),
    tagline: tx(
      "Exclusively for women engaged in income-generating activities",
      "আয়-উৎপাদনমূলক কাজের সাথে যুক্ত নারীদের জন্য বিশেষ",
    ),
    stats: [
      {
        icon: Banknote,
        label: tx("Loan Range", "ঋণের পরিমাণ"),
        value: tx("BDT 10,000–100,000", "১০,০০০–১,০০,০০০ টাকা"),
        note: tx(
          "Not more than Tk 50,000 in the first phase",
          "প্রথম পর্যায়ে সর্বোচ্চ ৫০,০০০ টাকা",
        ),
      },
      {
        icon: CalendarDays,
        label: tx("Tenure", "মেয়াদ"),
        value: tx("1 year (46 weeks)", "১ বছর (৪৬ সপ্তাহ)"),
        note: tx("Weekly instalments", "সাপ্তাহিক কিস্তি"),
      },
      {
        icon: Percent,
        label: tx("Service Charge", "সেবা চার্জ"),
        value: tx("22% annually", "বার্ষিক ২২%"),
        note: tx("Declining balance basis", "হ্রাসমান ব্যালেন্স ভিত্তিতে"),
      },
      {
        icon: Coins,
        label: tx("Other Fee", "অন্যান্য ফি"),
        value: tx("BDT 25", "২৫ টাকা"),
        note1: tx(
          "Admission Fee: BDT 10 (non-refundable; applicable to new and returning members);",
          "ভর্তি ফি: ১০ টাকা (ফিরিয়ে দেওয়া হয় না; নতুন ও ফেরত আসা সদস্যদের জন্য প্রযোজ্য);",
        ),
        note: tx("Pass book and Form Fee: BDT 15", "পাসবই ও ফর্ম ফি: ১৫ টাকা"),
      },
    ],
    eligibilityTitle: tx("Eligibility Criteria", "যোগ্যতার শর্তাবলী"),
    eligibility: [
      [
        tx("Age", "বয়স"),
        tx(
          "18–60 years (physically and mentally fit)",
          "১৮–৬০ বছর (শারীরিক ও মানসিকভাবে সক্ষম)",
        ),
      ],
      [
        tx("Residence", "বাসস্থান"),
        tx(
          "Permanent resident within the branch’s/VDB’s operating area",
          "শাখা/ভিবিডি পরিচালিত এলাকার স্থায়ী বাসিন্দা হতে হবে",
        ),
      ],
      [
        tx("Tenant Borrowers", "ভাড়াটিয়া ঋণগ্রহীতা"),
        tx(
          "Proof of at least 3 years residence in the same area and a local guarantor required",
          "একই এলাকায় কমপক্ষে ৩ বছর বসবাসের প্রমাণ ও স্থানীয় জামিনদারের প্রয়োজন",
        ),
      ],
    ],
  },
  {
    icon: TrendingUp,
    title: tx("Enterprise Loan", "এন্টারপ্রাইজ ঋণ"),
    tagline: tx(
      "For men or women — entrepreneurship development or any kind of business expansion",
      "পুরুষ বা নারী — উদ্যোক্তা উন্নয়ন বা যেকোনো ব্যবসা সম্প্রসারণের জন্য",
    ),
    stats: [
      {
        icon: Banknote,
        label: tx("Loan Range", "ঋণের পরিমাণ"),
        value: tx("BDT 50,000–1,500,000", "৫০,০০০–১৫,০০,০০০ টাকা"),
        note: tx(
          "BDT 200,000 in the first phase, based on business size, need and field verification",
          "প্রথম পর্যায়ে ব্যবসার আকার, প্রয়োজন ও মাঠপর্যায়ের যাচাই অনুযায়ী সর্বোচ্চ ২,০০,০০০ টাকা",
        ),
      },
      {
        icon: CalendarDays,
        label: tx("Tenure", "মেয়াদ"),
        value: tx("1 year", "১ বছর"),
        note: tx("Weekly or monthly repayments", "সাপ্তাহিক বা মাসিক কিস্তি"),
      },
      {
        icon: Percent,
        label: tx("Service Charge", "সেবা চার্জ"),
        value: tx("22% annually", "বার্ষিক ২২%"),
        note: tx("Declining balance basis", "হ্রাসমান ব্যালেন্স ভিত্তিতে"),
      },
      {
        icon: Coins,
        label: tx("Other Fee", "অন্যান্য ফি"),
        value: tx("BDT 25", "২৫ টাকা"),
        note1: tx(
          "Admission Fee: BDT 10 (non-refundable; applicable to new and returning members);",
          "ভর্তি ফি: ১০ টাকা (ফিরিয়ে দেওয়া হয় না; নতুন ও ফেরত আসা সদস্যদের জন্য প্রযোজ্য);",
        ),
        note: tx("Pass book and Form Fee: BDT 15", "পাসবই ও ফর্ম ফি: ১৫ টাকা"),
      },
    ],
    eligibilityTitle: tx("Eligibility Criteria", "যোগ্যতার শর্তাবলী"),
    eligibility: [
      [
        tx("Age", "বয়স"),
        tx(
          "18–60 years (physically and mentally fit)",
          "১৮–৬০ বছর (শারীরিক ও মানসিকভাবে সক্ষম)",
        ),
      ],
      [
        tx("Residence", "বাসস্থান"),
        tx(
          "Must permanently reside within the branch’s service area",
          "শাখার সেবা এলাকার স্থায়ী বাসিন্দা হতে হবে",
        ),
      ],
      [
        tx("Business Requirement", "ব্যবসার প্রয়োজন"),
        tx(
          "Applicant must have a visible and legitimate business",
          "আবেদনকারীর দৃশ্যমান ও বৈধ ব্যবসা থাকতে হবে",
        ),
      ],
      [
        tx("Tenant Borrowers", "ভাড়াটিয়া ঋণগ্রহীতা"),
        tx(
          "Proof of at least 3 years residence in the same area and a local guarantor required",
          "একই এলাকায় কমপক্ষে ৩ বছর বসবাসের প্রমাণ ও স্থানীয় জামিনদারের প্রয়োজন",
        ),
      ],
    ],
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
};

function SectionHead({
  eyebrow,
  title,
  desc,
  L,
}: {
  eyebrow: T;
  title: T;
  desc?: T;
  L: (x: T) => string;
}) {
  return (
    <div>
      <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
        {L(eyebrow) && (
          <span className="text-secondary font-semibold text-3xl md:text-4xl uppercase tracking-wider block">
            {L(eyebrow)}
          </span>
        )}
        <h2 className="text-2xl md:text-3xl font-extrabold text-primary">
          {L(title)}
        </h2>
      </div>
      {desc && (
        <p className="text-base sm:text-lg text-text leading-relaxed mb-12 font-normal">
          {L(desc)}
        </p>
      )}
    </div>
  );
}

/* Shared card used by Loans, Savings and Insurance */
function ProductCard({
  product,
  index,
  L,
  applyLabel,
}: {
  product: Product;
  index: number;
  L: (x: T) => string;
  applyLabel: string;
}) {
  return (
    <motion.div
      {...fadeUp}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative overflow-hidden bg-white rounded-3xl border border-secondary/10 shadow-sm hover:shadow-md transition-shadow flex flex-col"
    >
      {/* Card header */}
      <div className="relative p-8 md:p-10 pb-6 space-y-3">
        <div className="absolute top-0 right-0 w-28 h-28 bg-primary/5 rounded-bl-full flex items-center justify-center pl-4 pb-4">
          <product.icon className="w-9 h-9 text-primary" />
        </div>
        <h3 className="text-2xl font-bold text-secondary pr-24">
          {L(product.title)}
        </h3>
        <p className="text-sm font-semibold text-primary pr-16">
          {L(product.tagline)}
        </p>
      </div>

      {/* Stat tiles */}
      <div className="px-8 md:px-10 grid grid-cols-1 sm:grid-cols-2 gap-3">
        {product.stats.map((s, j) => (
          <div
            key={j}
            className="rounded-2xl bg-primary/5 border border-primary/10 p-4 space-y-1"
          >
            <div className="flex items-center gap-2 text-secondary">
              <s.icon className="w-4 h-4 text-primary" />
              <span className="text-xs font-bold uppercase tracking-wider">
                {L(s.label)}
              </span>
            </div>
            <p className="text-base font-bold text-secondary">{L(s.value)}</p>
            {s.note1 && (
              <p className="text-xs text-text font-normal leading-snug">
                {L(s.note1)}
              </p>
            )}
            {s.note && (
              <p className="text-xs text-text font-normal leading-snug">
                {L(s.note)}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Eligibility / Key features */}
      <div className="p-8 md:p-10 pt-8 flex-1 space-y-4">
        <h4 className="text-xs font-bold text-secondary uppercase tracking-wider">
          {L(product.eligibilityTitle)}
        </h4>
        <ul className="space-y-3">
          {product.eligibility.map(([k, v], j) => (
            <li key={j} className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <p className="text-sm text-text font-normal leading-relaxed">
                <span className="font-semibold text-secondary">{L(k)}: </span>
                {L(v)}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <div className="px-8 md:px-10 pb-8 md:pb-10">
        <Link
          href="/contact"
          className="inline-flex items-center bg-primary hover:opacity-90 text-white px-5 py-3 rounded-lg text-sm font-semibold transition-opacity gap-2 cursor-pointer shadow-xs"
        >
          <span>{applyLabel}</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </motion.div>
  );
}

export default function ServicesPage() {
  const { tContent, t } = useLanguage();
  const L = (x: T) => tContent(x.bn ?? x.en, x.en);
  const applyLabel = t("common.applyNow");

  return (
    <div className="py-16 md:py-24 space-y-24">
      {/* 1. Who We Serve */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHead
          eyebrow={tx("")}
          title={tx(
            "Our clients are at the center of everything we do",
            "আমাদের প্রতিটি উদ্যোগের কেন্দ্রবিন্দুতে রয়েছে গ্রাহক",
          )}
          L={L}
          desc={tx(
            "We serve people and enterprises that need accessible financial services to build livelihoods, manage financial needs and pursue new opportunities.",
            "আমরা এমন মানুষ ও প্রতিষ্ঠানকে সেবা দেই, যাদের জীবিকা নির্মাণ, আর্থিক চাহিদা মেটানো ও নতুন সুযোগের অনুসন্ধানের জন্য সহজলভ্য আর্থিক পরিষেবা দরকার।",
          )}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6">
          {audiences.map((a, i) => (
            <motion.div
              key={i}
              {...fadeUp}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={`group relative overflow-hidden bg-white rounded-3xl p-6 border border-secondary/10 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all lg:col-span-2 ${i >= 3 ? "lg:col-span-3" : ""
                }`}
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-bl-full group-hover:bg-primary/10 transition-colors" />
              <div className="relative w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-5">
                <a.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="relative text-lg font-bold text-secondary mb-2">
                {L(a.title)}
              </h3>
              <p className="relative text-sm text-text leading-relaxed font-normal">
                {L(a.desc)}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 2. Loans */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHead
          eyebrow={tx("Our Products", "আমাদের পণ্যসমূহ")}
          title={tx("Loans", "ঋণ")}
          L={L}
          desc={tx(
            "Accessible financing that helps low-income households and microentrepreneurs, especially women, strengthen livelihoods, manage financial needs and invest in their future.",
            "সহজলভ্য অর্থায়ন, বিশেষ করে নারী ও ক্ষুদ্র উদ্যোক্তাদের জীবনযাত্রাকে শক্তিশালী করে, আর্থিক চাহিদা সামাল দিতে ও ভবিষ্যতের জন্য বিনিয়োগ করতে সহায়তা করে।",
          )}
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {loans.map((loan, i) => (
            <ProductCard
              key={i}
              product={loan}
              index={i}
              L={L}
              applyLabel={applyLabel}
            />
          ))}
        </div>
      </section>

      {/* 3. Savings */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHead
          eyebrow={tx("")}
          title={tx("Savings", "সঞ্চয়")}
          L={L}
          desc={tx(
            "Mandatory savings programs associated with loans as per MRA. Members can save up to BDT 30 weekly or BDT 100 monthly. Any savings beyond 10% of the outstanding loan can be withdrawn in round figures. An annual interest rate of 6% is paid on the savings balance.",
            "এমআরএ অনুযায়ী ঋণের সাথে বাধ্যতামূলক সঞ্চয় কর্মসূচি চালু আছে। সদস্যরা সপ্তাহে সর্বোচ্চ ৩০ টাকা বা মাসে ১০০ টাকা পর্যন্ত সঞ্চয় করতে পারে। বকেয়া ঋণের ১০% ছাড়িয়ে থাকা যে কোনো সঞ্চয় গোলাকার পরিমাণে তুলে নেওয়া যায়। সঞ্চিত ব্যালেন্সের ওপর বার্ষিক ৬% সুদ প্রদান করা হয়।",
          )}
        />
      </section>

      {/* 4. Insurance */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHead
          eyebrow={tx("")}
          title={tx("Insurance", "বীমা")}
          L={L}
          desc={tx(
            "Onkur Foundation offers life insurance bundled with loans to the beneficiary and the guarantor, thus providing affordable protection against unexpected financial shocks, helping families safeguard their livelihoods and build greater financial resilience. Each borrower pays a premium of 0.5% (or BDT 5 per thousand) of the principal loan received. In case of death or proven permanent disability of a regular borrower, the remaining loan is waived and BDT 10,000 is provided to the nominee for funeral expenses.",
            "অঙ্কুর ফাউন্ডেশন ঋণের সঙ্গে সুবিধাভোগী ও জামিনদারের জন্য জীবন বীমা ব্যবস্থা প্রদান করে, যা অপ্রত্যাশিত আর্থিক ধাক্কা থেকে সাশ্রয়ী মূল্যে সুরক্ষা দেয় ও পরিবারকে জীবিকা রক্ষা ও বৃহত্তর আর্থিক স্থিতিশীলতা গড়তে সহায়তা করে। প্রতিটি ঋণগ্রহীতা প্রাপ্ত মূল ঋণের ০.৫% (অথবা প্রতি হাজারে ৫ টাকা) প্রিমিয়াম প্রদান করে। নিয়মিত ঋণগ্রহীতার মৃত্যু বা স্থায়ী অক্ষমতার ক্ষেত্রে অবশিষ্ট ঋণ মওকুফ করা হয় এবং শেষকৃত্যে সহায়তার জন্য নোমিনিকে ১০,০০০ টাকা প্রদান করা হয়।",
          )}
        />
      </section>
    </div>
  );
}
