"use client";

import React, { use, useEffect, useState } from "react";
import Link from "next/link";
import { ref, onValue } from "firebase/database";
import { db } from "@/lib/firebase";
import { useLanguage } from "@/context/LanguageContext";
import { Calendar, Users, ArrowLeft, Tag } from "lucide-react";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

const DEFAULT_POSTS: Record<string, any> = {
  "how-microloans-changing-rural-lives": {
    id: "b1",
    slug: "how-microloans-changing-rural-lives",
    title_bn: "কীভাবে ক্ষুদ্রঋণ গ্রামীণ জীবন বদলে দেয়",
    title_en: "How Microloans Are Changing Rural Lives",
    excerpt_bn: "বাংলাদেশের প্রত্যন্ত অঞ্চলে ছোট ঋণ কীভাবে বড় পরিবর্তন আনছে তার একটি ঝলক।",
    excerpt_en: "A glimpse into how small loans are creating big changes in remote areas of Bangladesh.",
    content_bn: "বাংলাদেশের গ্রামীণ এলাকায় আর্থিক সেবার অভাব দীর্ঘদিনের একটি চ্যালেঞ্জ। অঙ্কুর ফাউন্ডেশন এই ব্যবধান কমাতে কাজ করে যাচ্ছে। আমাদের ক্ষুদ্র (জাগরণ) ঋণ প্রোগ্রামের মাধ্যমে হাজারো নারী স্বনির্ভর হয়ে উঠেছেন। জামানতবিহীন স্বল্প সুদের এই ঋণ পরিবারগুলোকে নিজস্ব ব্যবসা শুরু ও প্রসারে সহায়তা করছে।",
    content_en: "Lack of financial services in rural Bangladesh has long been a challenge. Onkur Foundation is working to bridge this gap. Through our Khudro (Jagoron) loan program, thousands of women have become self-reliant. These collateral-free microloans allow families to launch and expand small enterprises with dignity.",
    category: "Impact",
    author: "Onkur Foundation",
    publishedAt: "2026-07-01T10:00:00Z",
    coverImageUrl: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&q=80&w=800"
  },
  "building-habit-of-saving": {
    id: "b2",
    slug: "building-habit-of-saving",
    title_bn: "সঞ্চয়ের অভ্যাস গড়ে তোলা: আমাদের সদস্যদের গল্প",
    title_en: "Building the Habit of Saving: Our Members' Stories",
    excerpt_bn: "সাপ্তাহিক সঞ্চয় কীভাবে আমাদের সদস্যদের আর্থিক সুরক্ষা দিচ্ছে তার গল্প।",
    excerpt_en: "Stories of how weekly savings are giving our members financial security.",
    content_bn: "ঋণের পাশাপাশি সঞ্চয়ও অঙ্কুর ফাউন্ডেশনের একটি গুরুত্বপূর্ণ অংশ। আমাদের সদস্যরা সাপ্তাহিক সঞ্চয় জমা রেখে বার্ষিক ৬% সুদ পান, যা তাদের ভবিষ্যতের জন্য একটি সুরক্ষা বলয় তৈরি করে। নিয়মিত সঞ্চয় অনুশীলনের মাধ্যমে সদস্যরা জরুরি আর্থিক প্রয়োজন মেটাতে ও পরিবারের জন্য তহবিল তৈরি করতে পারছেন।",
    content_en: "Alongside loans, savings are an essential cornerstone at Onkur Foundation. Our members deposit weekly savings and earn 6% annual interest, creating a financial safety net for their future. Through consistent savings, members build resilience against unexpected emergencies.",
    category: "Financial Literacy",
    author: "Onkur Foundation",
    publishedAt: "2026-06-15T10:00:00Z",
    coverImageUrl: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&q=80&w=800"
  },
  "rahela-begum-success": {
    id: "post1",
    slug: "rahela-begum-success",
    title_bn: "ক্ষুদ্রঋণে সফল রাহেলা বেগমের গল্প",
    title_en: "Rahela Begum's Microfinance Success",
    excerpt_bn: "অঙ্কুরের জামানতবিহীন ঋণ নিয়ে কীভাবে সেলাই মেশিন কিনে স্বাবলম্বী হলেন রাহেলা বেগম, পড়ুন তার মুখেই।",
    excerpt_en: "How Rahela Begum bought a sewing machine and became self-reliant with Onkur's microloan. Read her story.",
    content_bn: "রাহেলা বেগম নরসিংদীর এক নিভৃত গ্রামে বাস করেন। অভাবের সংসারে তিনি অঙ্কুর ফাউন্ডেশনের সহজ কিস্তি ঋণ নিয়ে একটি সেলাই মেশিন কেনেন। আজ তিনি স্বাবলম্বী এবং তার সন্তানের লেখাপড়া চালাতে পারছেন।",
    content_en: "Rahela Begum lives in a remote village in Narsingdi. Facing financial hardship, she took a flexible microloan from Onkur Foundation to buy a sewing machine. Today, she is self-reliant and funds her children's education.",
    category: "Success Story",
    author: "Onkur Team",
    publishedAt: "2026-07-01T10:00:00Z",
    coverImageUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800"
  },
  "digital-mfs-integration": {
    id: "post2",
    slug: "digital-mfs-integration",
    title_bn: "ডিজিটাল ঋণ সেবা ও এমএফএস সংহতি",
    title_en: "Digital Credit & MFS Integration",
    excerpt_bn: "মোবাইল ফিন্যান্সিয়াল সার্ভিস ব্যবহারের মাধ্যমে অঙ্কুরের কিস্তি পরিশোধ এখন আরও সহজ।",
    excerpt_en: "Repaying Onkur loan installments is now easier than ever with Mobile Financial Services integration.",
    content_bn: "প্রযুক্তির আধুনিকায়নে অঙ্কুর ফাউন্ডেশন এখন ঋণ বিতরণ ও আদায়ের কাজে বিকাশ এবং নগদ মোবাইল ওয়ালেট সংহত করেছে। মাঠপর্যায়ের গ্রাহকদের সুবিধার্থে এটি একটি বিপ্লবী পদক্ষেপ।",
    content_en: "With technological advancement, Onkur Foundation has integrated bKash and Nagad mobile wallets for loan disbursements and collections, a milestone step for rural borrowers.",
    category: "News",
    author: "IT Dept",
    publishedAt: "2026-07-20T12:00:00Z",
    coverImageUrl: "https://images.unsplash.com/photo-1563013544-824ae1d704d3?auto=format&fit=crop&q=80&w=800"
  }
};

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = use(params);
  const { language, tContent } = useLanguage();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const blogRef = ref(db, "blog");
    const unsub = onValue(blogRef, (snap) => {
      const val = snap.val();
      const decodedSlug = decodeURIComponent(slug);
      
      console.log(`[BlogPostPage] DB Snapshot value for blog:`, val);
      console.log(`[BlogPostPage] Looking for slug="${slug}" decoded="${decodedSlug}"`);

      let rawFound: any = null;
      if (val) {
        const postsArray = Object.keys(val).map(k => ({ id: k, ...val[k] }));
        rawFound = postsArray.find(p => 
          p.slug === slug || 
          p.slug === decodedSlug || 
          p.id === slug || 
          p.id === decodedSlug
        );
      }

      // Lookup default template for fallback fields
      const defaultPost = DEFAULT_POSTS[slug] || DEFAULT_POSTS[decodedSlug] || Object.values(DEFAULT_POSTS).find(p => p.slug === slug || p.slug === decodedSlug || p.id === slug);

      if (rawFound || defaultPost) {
        const merged = {
          id: rawFound?.id || defaultPost?.id || slug,
          slug: rawFound?.slug || defaultPost?.slug || slug,
          title_bn: rawFound?.title_bn || defaultPost?.title_bn || "শিরোনাম",
          title_en: rawFound?.title_en || defaultPost?.title_en || "Blog Title",
          excerpt_bn: rawFound?.excerpt_bn || defaultPost?.excerpt_bn || "",
          excerpt_en: rawFound?.excerpt_en || defaultPost?.excerpt_en || "",
          content_bn: rawFound?.content_bn || rawFound?.excerpt_bn || defaultPost?.content_bn || "বিস্তারিত পোস্ট তথ্য শীঘ্রই যোগ করা হবে।",
          content_en: rawFound?.content_en || rawFound?.excerpt_en || defaultPost?.content_en || "Full article content will be published shortly.",
          category: rawFound?.category || defaultPost?.category || "Impact",
          author: rawFound?.author || defaultPost?.author || "Onkur Foundation",
          publishedAt: rawFound?.publishedAt || defaultPost?.publishedAt || new Date().toISOString(),
          coverImageUrl: rawFound?.coverImageUrl || defaultPost?.coverImageUrl || "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&q=80&w=800"
        };

        console.log(`[BlogPostPage] Final Merged Post Object:`, merged);
        setPost(merged);
      } else {
        setPost(null);
      }

      setLoading(false);
    }, (err) => {
      console.error("[BlogPostPage] Database error:", err);
      const decodedSlug = decodeURIComponent(slug);
      const defaultPost = DEFAULT_POSTS[slug] || DEFAULT_POSTS[decodedSlug];
      setPost(defaultPost || null);
      setLoading(false);
    });

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

  const publishedDateString = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString(language === "bn" ? "bn-BD" : "en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  return (
    <article className="py-16 md:py-24 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Back Link */}
      <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-semibold text-[#1F4A3D] hover:text-[#C65D2E] transition-colors">
        <ArrowLeft className="w-4 h-4" />
        <span>{tContent("ব্লগে ফিরে যান", "Back to Blog Listing")}</span>
      </Link>

      {/* Header */}
      <header className="space-y-4">
        {post.category && (
          <span className="inline-block bg-[#1F4A3D] text-[#FBF6EE] text-xs font-bold px-3.5 py-1 rounded-md uppercase tracking-wider shadow-xs">
            {post.category}
          </span>
        )}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1F4A3D] leading-tight">
          {tContent(post.title_bn, post.title_en)}
        </h1>
        
        <div className="flex items-center text-xs sm:text-sm text-[#2B2621] font-medium gap-4 border-b border-[#1F4A3D]/10 pb-6 flex-wrap">
          {publishedDateString && (
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-[#C9973B]" />
              {publishedDateString}
            </span>
          )}
          {post.author && (
            <span className="flex items-center gap-1.5">
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
      <div className="pt-6 border-t border-[#1F4A3D]/10">
        <p 
          className="text-base sm:text-lg text-[#2B2621] leading-relaxed font-medium whitespace-pre-wrap opacity-100"
          style={{ color: "#2B2621", opacity: 1 }}
        >
          {tContent(post.content_bn, post.content_en)}
        </p>
      </div>

    </article>
  );
}


