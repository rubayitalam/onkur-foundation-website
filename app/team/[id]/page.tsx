"use client";

import React, { use, useEffect, useState } from "react";
import Link from "next/link";
import { ref, onValue } from "firebase/database";
import { db } from "@/lib/firebase";
import { useLanguage } from "@/context/LanguageContext";
import { ArrowLeft } from "lucide-react";

interface TeamMemberProfileProps {
  params: Promise<{ id: string }>;
}

const DEFAULT_BIOS: Record<string, { bio_bn: string; bio_en: string }> = {
  member1: {
    bio_bn: "আরফান আলী অঙ্কুর ফাউন্ডেশনের চেয়ারম্যান হিসেবে প্রতিষ্ঠানের সার্বিক দিকনির্দেশনা ও নীতিনির্ধারণে নেতৃত্ব দিচ্ছেন।",
    bio_en: "Arfan Ali leads Onkur Foundation's overall direction and policy-making as Chairman."
  },
  member2: {
    bio_bn: "মমতাজ আক্তার জাহান বোর্ড সদস্য হিসেবে প্রতিষ্ঠানের সামাজিক প্রভাব ও কমিউনিটি সম্পৃক্ততা নিয়ে কাজ করছেন।",
    bio_en: "Mamtaz Akhter Jahan works on the organization's social impact and community engagement as a Board Member."
  },
  member3: {
    bio_bn: "আকবর হোসেন বোর্ড সদস্য হিসেবে ঋণ কার্যক্রম পরিচালনা ও ঝুঁকি ব্যবস্থাপনা তদারকি করেন।",
    bio_en: "Akber Hossain oversees loan operations and risk management as a Board Member."
  },
  member4: {
    bio_bn: "সাজ্জাদুল হক বোর্ড সদস্য হিসেবে আর্থিক নিয়ন্ত্রণ ও প্রতিবেদন প্রক্রিয়া তদারকি করেন।",
    bio_en: "Sazzadul Haque oversees financial control and reporting processes as a Board Member."
  },
  member5: {
    bio_bn: "আব্দুল বাতেন বোর্ড সদস্য হিসেবে প্রতিষ্ঠানের সম্প্রসারণ ও নতুন শাখা পরিকল্পনায় ভূমিকা রাখেন।",
    bio_en: "Abdul Baten plays a role in the organization's expansion and new branch planning as a Board Member."
  }
};

export default function TeamMemberProfilePage({ params }: TeamMemberProfileProps) {
  const { id } = use(params);
  const { tContent } = useLanguage();
  const [member, setMember] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const memberRef = ref(db, `team/${id}`);
    const unsub = onValue(memberRef, (snap) => {
      const val = snap.val();
      console.log(`[TeamMemberProfilePage] Data fetched for team/${id}:`, {
        id,
        val,
        bio_bn: val?.bio_bn,
        bio_en: val?.bio_en
      });
      setMember(val);
      setLoading(false);
    }, (err) => {
      console.error(`[TeamMemberProfilePage] Error fetching team/${id}:`, err);
      setLoading(false);
    });
    return () => unsub();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh] bg-[#FBF6EE] py-20">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#1F4A3D]"></div>
      </div>
    );
  }

  if (!member) {
    return (
      <div className="py-20 text-center space-y-6">
        <h1 className="text-2xl font-bold text-[#1F4A3D]">
          {tContent("পর্ষদ সদস্য খুঁজে পাওয়া যায়নি", "Board Member Not Found")}
        </h1>
        <Link href="/team" className="inline-flex items-center gap-2 text-[#C65D2E] hover:underline">
          <ArrowLeft className="w-4 h-4" />
          <span>{tContent("তালিকায় ফিরে যান", "Back to Team")}</span>
        </Link>
      </div>
    );
  }

  const bioBn = member.bio_bn || DEFAULT_BIOS[id]?.bio_bn || "পর্ষদ সদস্যের পরিচিতি শীঘ্রই প্রকাশ করা হবে।";
  const bioEn = member.bio_en || DEFAULT_BIOS[id]?.bio_en || "Board member biography will be published soon.";

  console.log(`[TeamMemberProfilePage] Render time bio check for team/${id}:`, { bioBn, bioEn });

  return (
    <div className="py-16 md:py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      
      {/* Back Link */}
      <Link href="/team" className="inline-flex items-center gap-2 text-sm font-semibold text-[#1F4A3D] hover:text-[#C65D2E] transition-colors">
        <ArrowLeft className="w-4 h-4" />
        <span>{tContent("তালিকায় ফিরে যান", "Back to Team Grid")}</span>
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start bg-white p-8 sm:p-10 rounded-3xl border border-[#1F4A3D]/5 shadow-sm">
        
        {/* Left: Image Card */}
        <div className="md:col-span-5 space-y-4">
          <div className="aspect-[4/5] bg-gray-100 rounded-2xl overflow-hidden border border-[#1F4A3D]/10">
            {member.imageUrl ? (
              <img
                src={member.imageUrl}
                alt={tContent(member.name_bn, member.name_en)}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center font-bold text-5xl bg-[#1F4A3D]/5 text-[#1F4A3D]">
                {tContent(member.name_bn, member.name_en).charAt(0)}
              </div>
            )}
          </div>

          {/* Social links */}
          <div className="flex justify-center gap-4 pt-2">
            {member.facebook && (
              <a
                href={member.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#1F4A3D]/5 hover:bg-[#C65D2E] hover:text-white text-[#1F4A3D] p-3 rounded-full transition-all"
                aria-label="Facebook Profile"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
                </svg>
              </a>
            )}
            {member.linkedin && (
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#1F4A3D]/5 hover:bg-[#C65D2E] hover:text-white text-[#1F4A3D] p-3 rounded-full transition-all"
                aria-label="LinkedIn Profile"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            )}
          </div>
        </div>

        {/* Right: Info */}
        <div className="md:col-span-7 space-y-6">
          <div className="border-b border-[#1F4A3D]/10 pb-4 space-y-1">
            <h1 className="text-3xl font-extrabold text-[#1F4A3D]">
              {tContent(member.name_bn, member.name_en)}
            </h1>
            <p className="text-xs uppercase tracking-widest text-[#C65D2E] font-bold">
              {tContent(member.role_bn, member.role_en)}
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase text-[#1F4A3D] tracking-wider">
              {tContent("পরিচিতি ও জীবনবৃত্তান্ত", "Biography & Profile")}
            </h3>
            <p 
              className="text-base sm:text-lg text-[#2B2621] leading-relaxed font-medium whitespace-pre-wrap opacity-100"
              style={{ color: "#2B2621", opacity: 1 }}
            >
              {tContent(bioBn, bioEn)}
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}

