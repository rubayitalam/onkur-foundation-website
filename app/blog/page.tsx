"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ref, onValue } from "firebase/database";
import { db } from "@/lib/firebase";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import { Calendar, Users, ArrowRight } from "lucide-react";

export default function BlogListingPage() {
  const { language, tContent, t } = useLanguage();
  const [posts, setPosts] = useState<any[]>([]);
  const [blogContent, setBlogContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const blogRef = ref(db, "blog");
    const contentRef = ref(db, "siteContent/blog");

    let loaded = 0;
    const checkLoaded = () => {
      loaded++;
      if (loaded >= 2) setLoading(false);
    };

    const unsubBlog = onValue(blogRef, (snap) => {
      const val = snap.val();
      if (val) {
        const arr = Object.keys(val).map(k => ({ id: k, ...val[k] }))
          .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
        setPosts(arr);
      } else {
        setPosts([]);
      }
      checkLoaded();
    }, () => checkLoaded());

    const unsubContent = onValue(contentRef, (snap) => {
      setBlogContent(snap.val());
      checkLoaded();
    }, () => checkLoaded());

    return () => {
      unsubBlog();
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
          src={blogContent?.banner_image_url || "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=1200"} 
          alt="Onkur Blog Banner" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Title */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <span className="text-[#C65D2E] font-semibold text-sm uppercase tracking-wider block">
          {tContent(blogContent?.title_bn || "ব্লগ ও খবর", blogContent?.title_en || "Onkur Blog")}
        </span>
        <h1 className="text-4xl font-bold text-[#1F4A3D]">
          {tContent(blogContent?.heading_bn || "মাঠপর্যায়ের প্রতিবেদন ও সর্বশেষ খবর", blogContent?.heading_en || "Updates & Success Stories from the Ground")}
        </h1>
        <p className="text-base text-[#2B2621] font-normal leading-relaxed">
          {tContent(
            blogContent?.intro_bn || "গ্রামীণ সুবিধাবঞ্চিত পরিবারগুলোর পরিবর্তন এবং আমাদের মাঠকর্মীদের কাজের সরাসরি প্রতিবেদন পড়ুন এখানে।",
            blogContent?.intro_en || "Read firsthand reports on social upliftment, microfinance advances, and village milestones."
          )}
        </p>
      </div>

      {/* Grid */}
      {posts.length === 0 ? (
        <div className="text-center text-[#2B2621] font-normal py-12">
          {tContent("কোনো ব্লগ পোস্ট খুঁজে পাওয়া যায়নি।", "No blog posts found.")}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ y: -6 }}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[#1F4A3D]/5 flex flex-col justify-between group"
            >
              <div>
                <div className="aspect-video bg-gray-100 relative overflow-hidden">
                  {post.category && (
                    <span className="absolute top-3 left-3 bg-[#1F4A3D] text-[#FBF6EE] text-[9px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider shadow-sm z-10">
                      {post.category}
                    </span>
                  )}
                  {post.coverImageUrl ? (
                    <img
                      src={post.coverImageUrl}
                      alt={tContent(post.title_bn, post.title_en)}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-103"
                    />
                  ) : (
                    <div className="w-full h-full bg-[#1F4A3D]/5 flex items-center justify-center font-bold text-xl text-[#1F4A3D]">
                      Blog Cover
                    </div>
                  )}
                </div>

                <div className="p-6 space-y-4">
                  {/* Meta */}
                  <div className="flex items-center text-xs text-[#2B2621] font-normal gap-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#C9973B]" />
                      {new Date(post.publishedAt).toLocaleDateString(language === "bn" ? "bn-BD" : "en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                    {post.author && (
                      <span className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-[#C9973B]" />
                        {post.author}
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-[#1F4A3D] group-hover:text-[#C65D2E] transition-colors line-clamp-2">
                    {tContent(post.title_bn, post.title_en)}
                  </h3>
                  <p className="text-sm text-[#2B2621] leading-relaxed font-normal line-clamp-3">
                    {tContent(post.excerpt_bn, post.excerpt_en)}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center text-sm font-semibold text-[#C65D2E] hover:text-[#1F4A3D] transition-colors gap-1"
                >
                  <span>{t("common.readMore")}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      )}

    </div>
  );
}
