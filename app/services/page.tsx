"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Sprout,
  TrendingUp,
  PiggyBank,
  ShieldCheck,
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
  FileText,
} from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { div } from "framer-motion/client";

/* ---------- Content (add `bn` to any entry to localise it) ---------- */
type T = { en: string; bn?: string };
const tx = (en: string, bn?: string): T => ({ en, bn });

const audiences = [
  {
    icon: HeartHandshake,
    title: tx("Women Entrepreneurs"),
    desc: tx(
      "Supporting women with access to finance and opportunities to strengthen their economic participation.",
    ),
  },
  {
    icon: Store,
    title: tx("Microentrepreneurs"),
    desc: tx(
      "Helping small entrepreneurs invest, grow their businesses and create sustainable livelihoods.",
    ),
  },
  {
    icon: Wheat,
    title: tx("Smallholder Farmers"),
    desc: tx(
      "Providing financial solutions that respond to the realities of agricultural livelihoods.",
    ),
  },
  {
    icon: Building2,
    title: tx("Small & Growing Businesses"),
    desc: tx(
      "Helping enterprises access the working capital and investment finance they need to grow.",
    ),
  },
  {
    icon: Users,
    title: tx("Underserved Communities"),
    desc: tx(
      "Extending financial services to communities with limited access to formal financial institutions.",
    ),
  },
];

const loans = [
  {
    icon: Sprout,
    title: tx("Small Loan for Women"),
    tagline: tx(
      "Exclusively for women engaged in income-generating activities",
    ),
    stats: [
      {
        icon: Banknote,
        label: tx("Loan Range"),
        value: tx("BDT 10,000–100,000"),
        note: tx("Not more than Tk 50,000 in the first phase"),
      },
      {
        icon: CalendarDays,
        label: tx("Tenure"),
        value: tx("1 year (46 weeks)"),
        note: tx("Weekly instalments"),
      },
      {
        icon: Percent,
        label: tx("Service Charge"),
        value: tx("22% annually"),
        note: tx("Declining balance basis"),
      },
      {
        icon: Coins,
        label: tx("Admission Fee"),
        value: tx("BDT 10"),
        note: tx("Non-refundable; new and returning members"),
      },
    ],
    eligibilityTitle: tx("Eligibility Criteria"),
    eligibility: [
      ["Age", "18–60 years"],
      [
        "Residence",
        "Permanent resident within the branch’s/VDB’s operating area",
      ],
      ["Group Structure", "Committee-based (Samity) lending model"],
      ["Committee Size", "10–30 members"],
      [
        "Committee Leadership",
        "Chairperson, Secretary and Cashier elected from among members",
      ],
    ],
  },
  {
    icon: TrendingUp,
    title: tx("Enterprise Loan"),
    tagline: tx(
      "For men or women — entrepreneurship development or any kind of business expansion",
    ),
    stats: [
      {
        icon: Banknote,
        label: tx("Loan Range"),
        value: tx("BDT 50,000–1,500,000"),
        note: tx(
          "BDT 200,000 in the first phase, based on business size, need and field verification",
        ),
      },
      {
        icon: CalendarDays,
        label: tx("Tenure"),
        value: tx("1 year"),
        note: tx("Weekly or monthly repayments"),
      },
      {
        icon: Percent,
        label: tx("Service Charge"),
        value: tx("22% annually"),
        note: tx("Declining balance basis"),
      },
      {
        icon: Coins,
        label: tx("Admission Fee"),
        value: tx("BDT 10"),
        note: tx("Non-refundable; new and returning members"),
      },
      {
        icon: FileText,
        label: tx("Documentation"),
        value: tx("BDT 50,000 or above"),
        note: tx("Non-judicial stamp declaration and two guarantors"),
      },
    ],
    eligibilityTitle: tx(" Eligibility Criteria"),
    eligibility: [
      [
        "Business Requirement",
        "Applicant must have a visible and legitimate business or project",
      ],
      [
        "Financing Model",
        "Committee-based or individual (entrepreneur-based) lending",
      ],
      ["Proprietor Age", "18–60 years and physically and mentally fit"],
      ["Residence", "Must permanently reside within the branch’s service area"],
      [
        "Tenant Borrowers",
        "Proof of at least 3 years’ residence in the same area",
      ],
    ],
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
};

export default function ServicesPage() {
  const { tContent, t } = useLanguage();
  const L = (x: T) => tContent(x.bn ?? x.en, x.en);

  const SectionHead = ({
    eyebrow,
    title,
    desc,
  }: {
    eyebrow: T;
    title: T;
    desc?: T;
  }) => (
    <div>
      <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
        <span className="text-secondary font-semibold text-3xl md:text-4xl uppercase tracking-wider block">
          {L(eyebrow)}
        </span>
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

  return (
    <div className="py-16 md:py-24 space-y-24">
      {/* 1. Who We Serve */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHead
          eyebrow={tx("")}
          title={tx("Our clients are at the center of everything we do")}
          desc={tx(
            "We serve people and enterprises that need accessible financial services to build livelihoods, manage financial needs and pursue new opportunities.",
          )}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6">
          {audiences.map((a, i) => (
            <motion.div
              key={i}
              {...fadeUp}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={`group relative overflow-hidden bg-white rounded-3xl p-6 border border-secondary/10 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all lg:col-span-2 ${
                i >= 3 ? "lg:col-span-3" : ""
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
          eyebrow={tx("Our Products")}
          title={tx("Loans")}
          desc={tx(
            "Accessible financing that helps low-income households and microentrepreneurs, especially women, strengthen livelihoods, manage financial needs and invest in their future.",
          )}
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {loans.map((loan, i) => (
            <motion.div
              key={i}
              {...fadeUp}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative overflow-hidden bg-white rounded-3xl border border-secondary/10 shadow-sm hover:shadow-md transition-shadow flex flex-col"
            >
              {/* Card header */}
              <div className="relative p-8 md:p-10 pb-6 space-y-3">
                <div className="absolute top-0 right-0 w-28 h-28 bg-primary/5 rounded-bl-full flex items-center justify-center pl-4 pb-4">
                  <loan.icon className="w-9 h-9 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-secondary pr-24">
                  {L(loan.title)}
                </h3>
                <p className="text-sm font-semibold text-primary pr-16">
                  {L(loan.tagline)}
                </p>
              </div>

              {/* Stat tiles */}
              <div className="px-8 md:px-10 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {loan.stats.map((s, j) => (
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
                    <p className="text-base font-bold text-secondary">
                      {L(s.value)}
                    </p>
                    <p className="text-xs text-text font-normal leading-snug">
                      {L(s.note)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Eligibility */}
              <div className="p-8 md:p-10 pt-8 flex-1 space-y-4">
                <h4 className="text-xs font-bold text-secondary uppercase tracking-wider">
                  {L(loan.eligibilityTitle)}
                </h4>
                <ul className="space-y-3">
                  {loan.eligibility.map(([k, v], j) => (
                    <li key={j} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <p className="text-sm text-text font-normal leading-relaxed">
                        <span className="font-semibold text-secondary">
                          {k}:{" "}
                        </span>
                        {v}
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
                  <span>{t("common.applyNow")}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. Savings & Insurance */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Savings */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden bg-white rounded-3xl p-8 md:p-10 border border-secondary/10 shadow-sm hover:shadow-md transition-shadow space-y-6"
          >
            <div className="absolute top-0 right-0 w-28 h-28 bg-primary/5 rounded-bl-full flex items-center justify-center pl-4 pb-4">
              <PiggyBank className="w-9 h-9 text-primary" />
            </div>
            <div className="space-y-3 pr-20">
              <span className="text-primary font-semibold text-sm uppercase tracking-wider block">
                {L(tx("Our Products"))}
              </span>
              <h3 className="text-2xl font-bold text-secondary">
                {L(tx("Savings"))}
              </h3>
            </div>
            <p className="text-sm text-text leading-relaxed font-normal">
              {L(
                tx(
                  "Mandatory savings programs associated with loans as per MRA.",
                ),
              )}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                ["BDT 30", "Max weekly savings"],
                ["BDT 100", "Max monthly savings"],
                ["6%", "Annual interest on balance"],
              ].map(([v, l], i) => (
                <div
                  key={i}
                  className="rounded-2xl bg-primary/5 border border-primary/10 p-4 text-center"
                >
                  <p className="text-xl font-extrabold text-secondary">{v}</p>
                  <p className="text-xs text-text font-normal mt-1">{l}</p>
                </div>
              ))}
            </div>
            <div className="flex items-start gap-3 pt-2 border-t border-secondary/10">
              <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-3" />
              <p className="text-sm text-text font-normal leading-relaxed pt-3">
                {L(
                  tx(
                    "Any savings beyond 10% of the outstanding loan can be withdrawn in round figures.",
                  ),
                )}
              </p>
            </div>
          </motion.div>

          {/* Insurance */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative overflow-hidden bg-white rounded-3xl p-8 md:p-10 border border-secondary/10 shadow-sm hover:shadow-md transition-shadow space-y-6"
          >
            <div className="absolute top-0 right-0 w-28 h-28 bg-primary/5 rounded-bl-full flex items-center justify-center pl-4 pb-4">
              <ShieldCheck className="w-9 h-9 text-primary" />
            </div>
            <div className="space-y-3 pr-20">
              <span className="text-primary font-semibold text-sm uppercase tracking-wider block">
                {L(tx("Our Products"))}
              </span>
              <h3 className="text-2xl font-bold text-secondary">
                {L(tx("Insurance"))}
              </h3>
            </div>
            <p className="text-sm text-text leading-relaxed font-normal">
              {L(
                tx(
                  "Onkur Foundation offers life insurance bundled with the loan to the beneficiary and the guarantor, providing affordable protection against unexpected financial shocks and helping families safeguard their livelihoods and build greater financial resilience.",
                ),
              )}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="rounded-2xl bg-primary/5 border border-primary/10 p-4">
                <p className="text-xl font-extrabold text-secondary">0.6%</p>
                <p className="text-xs text-text font-normal mt-1">
                  Premium on principal loan (BDT 5 per thousand)
                </p>
              </div>
              <div className="rounded-2xl bg-primary/5 border border-primary/10 p-4">
                <p className="text-xl font-extrabold text-secondary">
                  BDT 10,000
                </p>
                <p className="text-xs text-text font-normal mt-1">
                  Paid to nominee for funeral expenses
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 pt-4 border-t border-secondary/10">
              <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <p className="text-sm text-text font-normal leading-relaxed">
                {L(
                  tx(
                    "In case of death or proven permanent disability of a regular borrower, the remaining loan is waived.",
                  ),
                )}
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
