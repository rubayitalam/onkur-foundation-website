"use client";

import React, { use, useEffect, useState } from "react";
import Link from "next/link";
import { ref, onValue } from "firebase/database";
import { db } from "@/lib/firebase";
import { useLanguage } from "@/context/LanguageContext";
import { Calendar, Users, ArrowLeft } from "lucide-react";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = use(params);
  const { language, tContent } = useLanguage();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const blogRef = ref(db, "blog");
    const unsub = onValue(blogRef, (snap) => {
      const val = snap.val();
      if (val) {
        const postsArray = Object.keys(val).map(k => ({ id: k, ...val[k] }));
        const found = postsArray.find(p => p.slug === slug);
        setPost(found || null);
      }
      setLoading(false);
    }, () => setLoading(false));

    return () => unsub();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh] bg-[#FBF6EE] py-20">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#1F4A3D]"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="py-20 text-center space-y-6">
        <h1 className="text-2xl font-bold text-[#1F4A3D]">
          {tContent("ব্লগ পোস্টটি খুঁজে পাওয়া যায়নি", "Blog Post Not Found")}
        </h1>
        <Link href="/blog" className="inline-flex items-center gap-2 text-[#C65D2E] hover:underline">
          <ArrowLeft className="w-4 h-4" />
          <span>{tContent("ব্লগে ফিরে যান", "Back to Blog")}</span>
        </Link>
      </div>
    );
  }

  return (
    <article className="py-16 md:py-24 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Back Link */}
      <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-semibold text-[#1F4A3D] hover:text-[#C65D2E] transition-colors">
        <ArrowLeft className="w-4 h-4" />
        <span>{tContent("ব্লগে ফিরে যান", "Back to Blog Listing")}</span>
      </Link>

      {/* Header */}
      <header className="space-y-4">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1F4A3D] leading-tight">
          {tContent(post.title_bn, post.title_en)}
        </h1>
        
        <div className="flex items-center text-xs text-[#2B2621] font-normal gap-4 border-b border-[#1F4A3D]/10 pb-6">
          <span className="flex items-center gap-1">
            <Calendar className="w-4 h-4 text-[#C9973B]" />
            {new Date(post.publishedAt).toLocaleDateString(language === "bn" ? "bn-BD" : "en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
          {post.author && (
            <span className="flex items-center gap-1">
              <Users className="w-4 h-4 text-[#C9973B]" />
              {post.author}
            </span>
          )}
        </div>
      </header>

      {/* Cover Image */}
      {post.coverImageUrl && (
        <div className="aspect-video w-full rounded-3xl overflow-hidden shadow-sm border border-[#1F4A3D]/5 bg-gray-50">
          <img
            src={post.coverImageUrl}
            alt={tContent(post.title_bn, post.title_en)}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Body Content */}
      <section className="text-base sm:text-lg text-[#2B2621] leading-relaxed font-normal whitespace-pre-wrap space-y-6 pt-4">
        {tContent(post.content_bn, post.content_en)}
      </section>

    </article>
  );
}
