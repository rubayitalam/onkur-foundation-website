"use client";

import React, { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "@/lib/firebase";
import { useLanguage } from "@/context/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function FAQPage() {
  const { tContent } = useLanguage();
  const [faqs, setFaqs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    const faqRef = ref(db, "faq");
    const unsub = onValue(faqRef, (snap) => {
      const val = snap.val();
      if (val) {
        const arr = Object.keys(val).map(k => ({ id: k, ...val[k] }))
          .sort((a, b) => (a.order || 0) - (b.order || 0));
        setFaqs(arr);
      }
      setLoading(false);
    }, () => setLoading(false));

    return () => unsub();
  }, []);

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh] bg-[#FBF6EE] py-20">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#1F4A3D]"></div>
      </div>
    );
  }

  return (
    <div className="py-16 md:py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      
      {/* Header */}
      <div className="text-center space-y-4">
        <span className="text-[#C65D2E] font-semibold text-sm uppercase tracking-wider block">
          {tContent("জিজ্ঞাসা", "FAQs")}
        </span>
        <h1 className="text-4xl font-bold text-[#1F4A3D]">
          {tContent("সাধারণ জিজ্ঞাসা ও উত্তর", "Frequently Asked Questions")}
        </h1>
        <p className="text-base text-[#2B2621] font-normal max-w-xl mx-auto">
          {tContent(
            "অঙ্কুর ফাউন্ডেশনের ঋণ কার্যক্রম, সুদের হার এবং নিয়মকানুন সম্পর্কে সাধারণ প্রশ্নের উত্তরসমূহ এখানে পাবেন।",
            "Find quick answers regarding application cycles, no-collateral policies, and documentation."
          )}
        </p>
      </div>

      {/* Accordions */}
      {faqs.length === 0 ? (
        <div className="text-center text-[#2B2621] font-normal py-12">
          {tContent("কোনো প্রশ্ন পাওয়া যায়নি।", "No questions loaded yet.")}
        </div>
      ) : (
        <div className="space-y-4">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-white rounded-2xl border border-[#1F4A3D]/5 overflow-hidden shadow-sm transition-shadow duration-200 hover:shadow-md"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between font-semibold text-[#1F4A3D] text-base sm:text-lg focus:outline-none"
                >
                  <span>{tContent(faq.question_bn, faq.question_en)}</span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-[#C65D2E] shrink-0 ml-4" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-[#2B2621] shrink-0 ml-4" />
                  )}
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 text-sm sm:text-base text-[#2B2621] font-normal leading-relaxed border-t border-[#1F4A3D]/5 pt-4">
                        {tContent(faq.answer_bn, faq.answer_en)}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
