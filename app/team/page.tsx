"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ref, onValue } from "firebase/database";
import { db } from "@/lib/firebase";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";

export default function TeamPage() {
  const { tContent } = useLanguage();
  const router = useRouter();
  const [teamList, setTeamList] = useState<any[]>([]);
  const [teamContent, setTeamContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const teamRef = ref(db, "team");
    const contentRef = ref(db, "siteContent/team");
    
    let loaded = 0;
    const checkLoaded = () => {
      loaded++;
      if (loaded >= 2) setLoading(false);
    };

    const unsubTeam = onValue(teamRef, (snap) => {
      const val = snap.val();
      if (val) {
        const arr = Object.keys(val).map(k => ({ id: k, ...val[k] }))
          .sort((a, b) => (a.order || 0) - (b.order || 0));
        setTeamList(arr);
      }
      checkLoaded();
    }, () => checkLoaded());

    const unsubContent = onValue(contentRef, (snap) => {
      setTeamContent(snap.val());
      checkLoaded();
    }, () => checkLoaded());

    return () => {
      unsubTeam();
      unsubContent();
    };
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh] bg-[#FBF6EE] py-20">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#1F4A3D]"></div>
      </div>
    );
  }

  return (
    <div className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      
      {/* Banner Image */}
      <div className="w-full h-64 md:h-80 rounded-3xl overflow-hidden shadow-xs border border-[#1F4A3D]/10 relative bg-gray-100">
        <img 
          src={teamContent?.banner_image_url || "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200"} 
          alt="Onkur Team Banner" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Page Title */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <span className="text-[#C65D2E] font-semibold text-sm uppercase tracking-wider block">
          {tContent(teamContent?.title_bn || "আমাদের পরিষদ", teamContent?.title_en || "Our Team")}
        </span>
        <h1 className="text-4xl font-bold text-[#1F4A3D]">
          {tContent(teamContent?.heading_bn || "অঙ্কুর ফাউন্ডেশন পরিচালনা পর্ষদ", teamContent?.heading_en || "Board of Directors & Executives")}
        </h1>
        <p className="text-base text-[#2B2621] font-normal leading-relaxed">
          {tContent(
            teamContent?.intro_bn || "গ্রামীণ সুবিধাবঞ্চিত মানুষদের সাহায্য করতে এবং আর্থিক অন্তর্ভুক্তির সমাজ গড়ে তুলতে আমাদের সম্মানিত পর্ষদ কাজ করছেন।",
            teamContent?.intro_en || "Our dedicated board coordinates closely to bring hope and financial inclusion across rural regions."
          )}
        </p>
      </div>

      {/* Team Grid */}
      {teamList.length === 0 ? (
        <div className="text-center text-[#2B2621] font-normal py-12">
          {tContent("কোনো দলীয় সদস্য খুঁজে পাওয়া যায়নি।", "No team members found.")}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {teamList.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ y: -6 }}
              onClick={() => router.push(`/team/${member.id}`)}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[#1F4A3D]/5 h-full flex flex-col justify-between group cursor-pointer"
            >
              <div className="aspect-[4/5] bg-gray-100 overflow-hidden relative">
                {member.imageUrl ? (
                  <img
                    src={member.imageUrl}
                    alt={tContent(member.name_bn, member.name_en)}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center font-bold text-3xl bg-[#1F4A3D]/5 text-[#1F4A3D]">
                    {tContent(member.name_bn, member.name_en).charAt(0)}
                  </div>
                )}
                
                {/* Social hover overlays */}
                <div className="absolute inset-0 bg-[#1F4A3D]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                  {member.facebook && (
                    <a
                      href={member.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="bg-[#FBF6EE] text-[#1F4A3D] p-3 rounded-full hover:bg-[#C65D2E] hover:text-white transition-colors duration-200"
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
                      onClick={(e) => e.stopPropagation()}
                      className="bg-[#FBF6EE] text-[#1F4A3D] p-3 rounded-full hover:bg-[#C65D2E] hover:text-white transition-colors duration-200"
                      aria-label="LinkedIn Profile"
                    >
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                    </a>
                  )}
                </div>
              </div>

              <div className="p-6 text-center space-y-1">
                <h3 className="font-bold text-lg text-[#1F4A3D] group-hover:text-[#C65D2E] transition-colors">
                  {tContent(member.name_bn, member.name_en)}
                </h3>
                <p className="text-xs uppercase tracking-wider text-[#2B2621] font-semibold">
                  {tContent(member.role_bn, member.role_en)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      )}

    </div>
  );
}
