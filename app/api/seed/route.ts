import { NextResponse } from "next/server";
import { ref, set } from "firebase/database";
import { db, auth } from "@/lib/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

export async function GET() {
  const email = "admin@onkur.net";
  const password = "onkuradmin123";

  try {
    // Attempt to register seed admin user if not already in system
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (createError: any) {
      if (createError.code !== "auth/email-already-in-use") {
        throw createError;
      }
    }

    // Authenticate to satisfy firebase RTDB ".write": "auth != null" rule
    await signInWithEmailAndPassword(auth, email, password);
    
    // Seed settings
    await set(ref(db, "settings"), {
      phone: "+8802226617258",
      email: "info@onkur.net",
      address_bn: "নাভানা সিলভানিয়া (৫ম তলা), হোল্ডিং নং- কা-৬/এ, নদ্দা, গুলশান, ঢাকা, বাংলাদেশ",
      address_en: "Navana Sylvania (4th Floor), Holding No- Ka-6/A, Nodda, Gulshan, Dhaka, Bangladesh",
      facebookUrl: "https://www.facebook.com/share/18Z1c45wGT/"
    });

    // Seed stats
    await set(ref(db, "stats"), {
      amountDistributed: 40456,
      peopleServed: 140456,
      yearsActive: 8,
      districtsCovered: 12,
      activeBranches: 14
    });

    // Seed siteContent
    await set(ref(db, "siteContent"), {
      home: {
        hero_title_bn: "অঙ্কুর – আশা জাগানো, জীবন গড়া।",
        hero_title_en: "Onkur – Growing Hope, Empowering Lives",
        hero_subtitle_bn: "ক্ষুদ্র ঋণ। বড় পরিবর্তন। গ্রামীণ প্রান্তিক জনগোষ্ঠীর অর্থনৈতিক ক্ষমতায়নের জন্য সুদমুক্ত ও সহজ ঋণ সুবিধা।",
        hero_subtitle_en: "Small Loans. Big Change. Empowering rural communities with inclusive microfinance services.",
        services: [
          {
            title_bn: "গ্রামীণ ক্ষুদ্রঋণ",
            title_en: "Rural Microloans",
            desc_bn: "স্বল্প সুদে বা সুদমুক্ত সহজ কিস্তিতে ঋণ, যা গ্রামীণ পরিবারগুলোকে ছোট ব্যবসা শুরু করতে, উপকরণ কিনতে বা কৃষিতে বিনিয়োগে সাহায্য করে।",
            desc_en: "Affordable, interest-free or low-interest loans that help rural families start small businesses, buy tools, or invest in farming.",
            icon: "Sprout"
          },
          {
            title_bn: "মাইক্রোক্রেডিট ঋণ",
            title_en: "Microcredit Loan",
            desc_bn: "ছোট দোকানদার বা উদ্যোক্তাদের জন্য জামানতবিহীন সহজ কিস্তিতে ঋণ সুবিধা যা দিয়ে তারা ব্যবসা বাড়াতে পারেন।",
            desc_en: "Designed for small shopkeepers or micro-entrepreneurs who want to start with limited capital, offering quick support without collateral.",
            icon: "Store"
          },
          {
            title_bn: "এসএমই ঋণ",
            title_en: "SME Loan",
            desc_bn: "মাঝারি আকারের ব্যবসার সম্প্রসারণ, পণ্য ক্রয় বা নতুন উদ্যোগ চালুর জন্য তৈরি ঋণ সুবিধা।",
            desc_en: "Tailored for medium-sized businesses to help with expansion, product purchase, or launching new ventures.",
            icon: "TrendingUp"
          }
        ],
        mission_heading_bn: "আর্থিক সেবার মাধ্যমে বাধা দূর করা",
        mission_heading_en: "Breaking Barriers with Access to Finance",
        mission_body_bn: "অঙ্কুর ফাউন্ডেশনে আমরা বিশ্বাস করি যে, প্রকৃত ক্ষমতায়ন তখনই শুরু হয় যখন আর্থিক সুযোগগুলো তাদের কাছে পৌঁছায় যাদের এটি সবচেয়ে বেশি প্রয়োজন। দীর্ঘ সময় ধরে গ্রামীণ এবং প্রান্তিক জনগোষ্ঠী আনুষ্ঠানিক আর্থিক ব্যবস্থার বাইরে থেকে গেছে, যা তাদের বৃদ্ধি, বিনিয়োগ এবং ভবিষ্যত সুরক্ষিত করার ক্ষমতাকে সীমিত করেছে। আমরা অর্থায়নে প্রবেশাধিকার সহজ, অন্তর্ভুক্তিমূলক এবং প্রভাবশালী করার মাধ্যমে এই বাধাগুলি ভেঙে দিতে প্রতিশ্রুতিবদ্ধ। আমাদের উদ্যোগের মাধ্যমে আমরা সুবিধাবঞ্চিত ব্যক্তি এবং সম্প্রদায়কে আর্থিক পরিষেবার সাথে সংযুক্ত করি যা শিক্ষা, উদ্যোক্তা, স্বাস্থ্যসেবা এবং টেকসই জীবিকার পথ উন্মুক্ত করে।",
        mission_body_en: "At Onkur Foundation, we believe that true empowerment begins when financial opportunities reach those who need them most. For too long, rural and marginalized communities have been left outside the formal financial system, limiting their ability to grow, invest, and secure their future. We are committed to breaking these barriers by making access to finance simple, inclusive, and impactful. Through our initiatives, we connect underserved individuals and communities with financial services that open doors to education, entrepreneurship, healthcare, and sustainable livelihoods.",
        mission_bullets: [
          { text_bn: "স্বচ্ছ ও ন্যায্য ক্ষুদ্রঋণ প্রদান", text_en: "Provide fair and transparent microloans" },
          { text_bn: "নারী ও গ্রামীণ পরিবারের ক্ষমতায়ন", text_en: "Empower women and rural families" },
          { text_bn: "কৃষক ও ক্ষুদ্র ব্যবসায়ীদের সহায়তা", text_en: "Support farmers and small businesses" },
          { text_bn: "আর্থিক সচেতনতা বৃদ্ধি", text_en: "Promote financial literacy" },
          { text_bn: "প্রতিটি সম্পদকে কমিউনিটির কল্যাণে পুনঃবিনিয়োগ", text_en: "Reinvest every resource into communities" }
        ],
        vision_bullets: [
          { text_bn: "সকলের জন্য আর্থিক অন্তর্ভুক্তির বাংলাদেশ", text_en: "A Bangladesh with financial inclusion for all" },
          { text_bn: "মর্যাদার সাথে স্বাবলম্বী সমাজ", text_en: "Communities thriving with dignity" },
          { text_bn: "সামাজিক পরিবর্তনে নারীদের নেতৃত্ব", text_en: "Women leading social transformation" },
          { text_bn: "উন্নত কৃষি ও গ্রামীণ উদ্যোগ", text_en: "Stronger agriculture and rural enterprises" },
          { text_bn: "টেকসই প্রবৃদ্ধির মাধ্যমে দারিদ্র্য বিমোচন", text_en: "Poverty reduced through sustainable growth" }
        ],
        values_bullets: [
          { text_bn: "প্রতিটি কাজে সততা", text_en: "Integrity in every action" },
          { text_bn: "মানুষ ও নতুন ধারণার ক্ষমতায়ন", text_en: "Empowerment of people and ideas" },
          { text_bn: "সুবিধাবঞ্চিতদের জন্য সমতা ও অন্তর্ভুক্তি", text_en: "Inclusivity for the underserved" },
          { text_bn: "টেকসই সমাধান", text_en: "Sustainability in solutions" },
          { text_bn: "মর্যাদা ও শ্রদ্ধার সাথে সহমর্মিতা", text_en: "Compassion with dignity and respect" }
        ],
        why_title_bn: "কেন অঙ্কুর ফাউন্ডেশন?",
        why_title_en: "Why Choose Onkur Foundation?",
        why_cards: [
          {
            icon: "ShieldCheck",
            title_bn: "স্বচ্ছ নীতিমালা",
            title_en: "Transparent Policies",
            desc_bn: "কোনো গোপন চার্জ বা অতিরিক্ত ফি নেই। আবেদনের সময় সকল শর্তাবলি স্পষ্টভাবে বুঝিয়ে দেওয়া হয়।",
            desc_en: "No hidden fees or extra charges. All terms are clearly explained during application."
          },
          {
            icon: "Coins",
            title_bn: "জামানতবিহীন ঋণ",
            title_en: "Collateral-Free Loans",
            desc_bn: "সুবিধাবঞ্চিত ও প্রান্তিক ঋণগ্রহীতাদের জন্য কোনো প্রকার জামানত বা স্থাবর সম্পত্তি ছাড়াই ঋণের সুযোগ।",
            desc_en: "Collateral-free microloans designed specifically for underserved rural borrowers without assets."
          },
          {
            icon: "PiggyBank",
            title_bn: "সঞ্চয়ী হিসাব (৬% লভ্যাংশ)",
            title_en: "Savings Program (6% Interest)",
            desc_bn: "সহজ সঞ্চয় অভ্যাস গড়ে তোলার জন্য বার্ষিক ৬% লভ্যাংশ সহ নমনীয় সঞ্চয় কর্মসূচি।",
            desc_en: "Flexible savings scheme yielding 6% annual interest to encourage consistent financial habits."
          },
          {
            icon: "HeartHandshake",
            title_bn: "ঋণ বীমা সুবিধা",
            title_en: "Borrower Credit Insurance",
            desc_bn: "ঋণগ্রহীতার মৃত্যু বা শারীরিক অক্ষমতায় পরিবারকে ঋণের বোঝা থেকে মুক্তি দিতে বিশেষ বীমা কভারেজ।",
            desc_en: "Special credit insurance covering outstanding debt in the event of borrower death or disability."
          }
        ],
        process_title_bn: "৪টি সহজ ধাপে ঋণ সুবিধা",
        process_title_en: "Apply in 4 Simple Steps",
        process_steps: [
          {
            step_num: 1,
            title_bn: "সহজ আবেদন",
            title_en: "Easy Application",
            desc_bn: "আপনার নিকটস্থ অঙ্কুর ব্রাঞ্চে অথবা মাঠ কর্মকর্তার মাধ্যমে সহজ ফর্ম পূরণ করে আবেদন করুন।",
            desc_en: "Fill out a simple application form at your local Onkur branch or through a field officer."
          },
          {
            step_num: 2,
            title_bn: "মাঠপর্যায়ে যাচাই",
            title_en: "On-Ground Verification",
            desc_bn: "আমাদের মাঠ কর্মকর্তা আপনার ঠিকানা ও কাজের জায়গা পরিদর্শনের মাধ্যমে সাধারণ যাচাই সম্পন্ন করবেন।",
            desc_en: "Our field officer visits your home or workplace to perform basic verification."
          },
          {
            step_num: 3,
            title_bn: "কমিটি অনুমোদন",
            title_en: "Committee Approval",
            desc_bn: "স্থানীয় ঋণ কমিটির মাধ্যমে আবেদন যাচাই ও যৌক্তিকতা নিশ্চিত করে দ্রুত অনুমোদন প্রদান।",
            desc_en: "Quick credit approval processed by our localized community loan committee."
          },
          {
            step_num: 4,
            title_bn: "ঋণ বিতরণ",
            title_en: "Disbursement",
            desc_bn: "অনুমোদনের পর সরাসরি ব্রাঞ্চ থেকে অথবা মোবাইল ফাইন্যান্সিয়াল সার্ভিসের মাধ্যমে ঋণ বিতরণ।",
            desc_en: "Funds disbursed directly from our branch office or through Mobile Financial Services."
          }
        ]
      },
      about: {
        heading_bn: "আমাদের পথচলা",
        heading_en: "Our Journey",
        body_bn: "অঙ্কুর ফাউন্ডেশন গ্রামীণ অঞ্চলের দরিদ্র ও সুবিধাবঞ্চিত জনগোষ্ঠীর অর্থনৈতিক মুক্তির লক্ষ্যে কাজ করে চলেছে। আমরা বিশ্বাস করি, ক্ষুদ্র ঋণের সহায়তায় মানুষ তাদের সুপ্ত প্রতিভার বিকাশ ঘটিয়ে স্বাবলম্বী হতে পারে।",
        body_en: "Onkur Foundation operates with the goal of economic liberation for poor and underserved communities in rural areas. We believe that with small loans, people can unlock their potential and achieve self-reliance.",
        approach_bn: "আমাদের পদ্ধতিটি সহজ: আমরা মাঠপর্যায়ে গিয়ে আবেদনকারীদের প্রয়োজনীয়তা মূল্যায়ন করি, জামানতবিহীন ঋণের সুবিধা দিই এবং ঋণগ্রহীতাদের অর্থনৈতিক উন্নয়ন তদারকি করি।",
        approach_en: "Our approach is simple: we assess applicants' needs directly on the ground, offer collateral-free loan options, and guide borrowers to ensure sustainable growth.",
        chairman_name_bn: "আরফান আলী",
        chairman_name_en: "Arfan Ali",
        chairman_title_bn: "চেয়ারম্যান, অঙ্কুর ফাউন্ডেশন",
        chairman_title_en: "Chairman, Onkur Foundation",
        chairman_message_bn: "অঙ্কুর ফাউন্ডেশনের মূল উদ্দেশ্য হলো প্রতিটি প্রান্তিক ও সুবিধাবঞ্চিত পরিবারকে একটি মর্যাদাপূর্ণ জীবনের সুযোগ করে দেওয়া। আমরা কেবল মূলধন সরবরাহ করি না, বরং তাদের সুপ্ত সম্ভাবনার বিকাশ ঘটিয়ে টেকসই অর্থনৈতিক ক্ষমতায়ন নিশ্চিত করতে কাজ করি।",
        chairman_message_en: "At Onkur, our primary goal is to ensure a life of dignity and self-reliance for every marginalized family. We don't just provide capital; we walk with our borrowers, helping them harness their inner potential.",
        approach_points: [
          {
            icon: "ShieldCheck",
            title_bn: "মাঠপর্যায়ে পুঙ্খানুপুঙ্খ যাচাই",
            title_en: "Thorough Ground Verification",
            desc_bn: "সহজ ঋণ ও সুদমুক্ত নীতি নিশ্চিত করতে আমাদের মাঠ কর্মকর্তারা সরেজমিনে আবেদনকারীর ঠিকানা ও ক্ষুদ্র ব্যবসার উপযোগিতা যাচাই করেন।",
            desc_en: "Field officers complete address and small-scale business feasibility assessments to ensure fair eligibility."
          },
          {
            icon: "Users",
            title_bn: "কমিউনিটি ও গ্রুপ সংহতি",
            title_en: "Community Group Committees",
            desc_bn: "আমরা ঋণ বিতরণে গ্রামীণ সমষ্টিগত নিশ্চয়তা ব্যবস্থার ওপর জোর দিই, যেখানে স্থানীয় সদস্যদের সমন্বয়ে committee তদারকি নিশ্চিত করে।",
            desc_en: "Borrowers form small mutual support groups with localized community committees providing monitoring."
          },
          {
            icon: "TrendingUp",
            title_bn: "ধারাবাহিক তদারকি ও প্রবৃদ্ধি",
            title_en: "Ongoing Support & Monitoring",
            desc_bn: "শুধু ঋণ বিতরণ নয়, প্রতিটি ক্ষুদ্র ব্যবসার স্থায়ী প্রবৃদ্ধি নিশ্চিত করতে আমরা নিয়মিত পরামর্শ ও ব্যবসায়িক দিকনির্দেশনা দিই।",
            desc_en: "We offer business advice and weekly tracking to confirm sustainable progress and small enterprise growth."
          }
        ],
        timeline: [
          {
            year: "২০১৮",
            year_en: "2018",
            title_bn: "প্রতিষ্ঠা ও প্রথম যাত্রা",
            title_en: "Founding & Inception",
            desc_bn: "নরসিংদীর প্রত্যন্ত গ্রামে ১০ জন কর্মঠ নারীকে জামানতবিহীন ঋণ দেওয়ার মাধ্যমে অঙ্কুরের পথচলা শুরু হয়।",
            desc_en: "Onkur starts in Narsingdi by distributing microloans to 10 rural women without collateral."
          },
          {
            year: "২০২০",
            year_en: "2020",
            title_bn: "প্রথম প্রাতিষ্ঠানিক শাখা",
            title_en: "First Institutional Branch",
            desc_bn: "কার্যক্রম সম্প্রসারণে নরসিংদী সদরে প্রথম আনুষ্ঠানিক শাখা অফিস চালু ও ঋণ বীমা কভারেজ যুক্ত করা।",
            desc_en: "First formal branch opens in Narsingdi town, introducing borrower death/disability credit insurance."
          },
          {
            year: "২০২৩",
            year_en: "2023",
            title_bn: "১০টি জেলায় ঋণ কার্যক্রম",
            title_en: "Expansion to 10 Districts",
            desc_bn: "গ্রামীণ নারীদের স্বাবলম্বী করার সাফল্য বাস্তবায়নে ১০টি জেলায় শাখার বিস্তৃতি ও ১০ হাজার ঋণগ্রহীতা পার।",
            desc_en: "Branch network expands to 10 districts, serving over 10,000 active rural borrowers."
          },
          {
            year: "২০২৬",
            year_en: "2026",
            title_bn: "ডিজিটাল ট্র্যাকিং ও এমএফএস সংহতি",
            title_en: "Digital Tracking & MFS Integration",
            desc_bn: "মোবাইল ফিন্যান্সিয়াল সার্ভিস সংহতকরণের মাধ্যমে কিস্তি ও সঞ্চয় আদায়ের সহজীকরণ।",
            desc_en: "Integrates mobile financial services (MFS) for installment collection and flexible savings withdrawals."
          }
        ]
      },
      nav: {
        home_bn: "হোম", home_en: "Home",
        about_bn: "আমাদের সম্পর্কে", about_en: "About Us",
        team_bn: "আমাদের দল", team_en: "Team",
        blog_bn: "ব্লগ", blog_en: "Blog",
        career_bn: "ক্যারিয়ার", career_en: "Career",
        contact_bn: "যোগাযোগ", contact_en: "Contact"
      },
      footer: {
        tagline_bn: "অঙ্কুর – আশা জাগানো, জীবন গড়া। ক্ষুদ্র ঋণ, বড় পরিবর্তন।",
        tagline_en: "Onkur – Growing Hope, Empowering Lives. Small Loans. Big Change.",
        quickLinks: [
          { label_bn: "হোম", label_en: "Home", url: "/" },
          { label_bn: "আমাদের সম্পর্কে", label_en: "About Us", url: "/about" },
          { label_bn: "আমাদের দল", label_en: "Team", url: "/team" },
          { label_bn: "ব্লগ", label_en: "Blog", url: "/blog" },
          { label_bn: "ক্যারিয়ার", label_en: "Career", url: "/career" },
          { label_bn: "যোগাযোগ", label_en: "Contact", url: "/contact" }
        ],
        copyrightText_bn: "© ২০২৬ অঙ্কুর ফাউন্ডেশন। সর্বস্বত্ব সংরক্ষিত।",
        copyrightText_en: "© 2026 Onkur Foundation. All Rights Reserved."
      },
      team: {
        title_bn: "আমাদের পরিষদ",
        title_en: "Our Team",
        heading_bn: "অঙ্কুর ফাউন্ডেশন পরিচালনা পর্ষদ",
        heading_en: "Board of Directors & Executives",
        intro_bn: "গ্রামীণ সুবিধাবঞ্চিত মানুষদের সাহায্য করতে এবং আর্থিক অন্তর্ভুক্তির সমাজ গড়ে তুলতে আমাদের সম্মানিত পর্ষদ কাজ করছেন।",
        intro_en: "Our dedicated board coordinates closely to bring hope and financial inclusion across rural regions."
      },
      blog: {
        title_bn: "ব্লগ ও খবর",
        title_en: "Onkur Blog",
        heading_bn: "মাঠপর্যায়ের প্রতিবেদন ও সর্বশেষ খবর",
        heading_en: "Updates & Success Stories from the Ground",
        intro_bn: "গ্রামীণ সুবিধাবঞ্চিত পরিবারগুলোর পরিবর্তন এবং আমাদের মাঠকর্মীদের কাজের সরাসরি প্রতিবেদন পড়ুন এখানে।",
        intro_en: "Read firsthand reports on social upliftment, microfinance advances, and village milestones."
      },
      contact: {
        heading_bn: "আমাদের সাথে যোগাযোগ করুন",
        heading_en: "Get In Touch",
        body_bn: "যেকোনো অনুসন্ধান, ঋণের আবেদন বা সহযোগিতার জন্য আমাদের সাথে সরাসরি যোগাযোগ করুন অথবা নিচের ফর্মটি পূরণ করুন।",
        body_en: "Reach out to us for any questions or to apply for a loan.",
        hours_bn: "রবি-বৃহস্পতি, সকাল ৯টা - বিকাল ৫টা",
        hours_en: "Sun-Thu, 9 AM - 5 PM",
        departments: [
          {
            name_bn: "সাধারণ জিজ্ঞাসা",
            name_en: "General Inquiries",
            phone: "+8802226617258",
            email: "info@onkur.net"
          },
          {
            name_bn: "ঋণ আবেদন ও মাঠসেবা",
            name_en: "Loan & Field Operations",
            phone: "+8801711000000",
            email: "loans@onkur.net"
          }
        ]
      }
    });

    // Seed team members
    const team = {
      member1: {
        name_bn: "আরফান আলী",
        name_en: "Arfan Ali",
        role_bn: "চেয়ারম্যান",
        role_en: "Chairman",
        imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
        order: 1,
        facebook: "https://facebook.com",
        linkedin: "https://linkedin.com"
      },
      member2: {
        name_bn: "মমতাজ আখতার জাহান",
        name_en: "Mamtaz Akhter Jahan",
        role_bn: "সদস্য",
        role_en: "Member",
        imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400",
        order: 2,
        facebook: "https://facebook.com",
        linkedin: "https://linkedin.com"
      },
      member3: {
        name_bn: "আকবর হোসেন",
        name_en: "Akber Hossain",
        role_bn: "সদস্য",
        role_en: "Member",
        imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400",
        order: 3,
        facebook: "https://facebook.com",
        linkedin: "https://linkedin.com"
      },
      member4: {
        name_bn: "সাজ্জাদুল হক",
        name_en: "Sazzadul Haque",
        role_bn: "সদস্য",
        role_en: "Member",
        imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400",
        order: 4,
        facebook: "https://facebook.com",
        linkedin: "https://linkedin.com"
      },
      member5: {
        name_bn: "আব্দুল বাতেন",
        name_en: "Abdul Baten",
        role_bn: "সদস্য",
        role_en: "Member",
        imageUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400",
        order: 5,
        facebook: "https://facebook.com",
        linkedin: "https://linkedin.com"
      }
    };
    await set(ref(db, "team"), team);

    // Seed FAQs
    await set(ref(db, "faq/faq1"), {
      question_bn: "ক্ষুদ্র ঋণের জন্য আবেদনের যোগ্যতা কী?",
      question_en: "What are the eligibility criteria for a microloan?",
      answer_bn: "আমাদের মাঠ কর্মকর্তারা স্থানীয় কমিউনিটিতে যাচাই প্রক্রিয়া চালুর পর ঋণ দিয়ে থাকেন। আবেদনকারীর অবশ্যই একটি স্থায়ী ঠিকানা এবং ক্ষুদ্র আয়ের উৎস থাকতে হবে।",
      answer_en: "Our field officers verify applications on the ground. Applicants must have a permanent address and a small source of income to qualify.",
      order: 1
    });

    await set(ref(db, "faq/faq2"), {
      question_bn: "জামানতের প্রয়োজন আছে কি?",
      question_en: "Is any collateral required?",
      answer_bn: "না, অঙ্কুর ফাউন্ডেশন কোনো ধরণের জামানত ছাড়াই সহজ ও সুদমুক্ত ঋণ সুবিধা প্রদান করে থাকে।",
      answer_en: "No, Onkur Foundation provides simple and low-interest loans without requiring any form of collateral.",
      order: 2
    });

    // Seed Testimonials
    await set(ref(db, "testimonials/t1"), {
      name_bn: "রাহেলা বেগম",
      name_en: "Rahela Begum",
      location_bn: "নরসিংদী",
      location_en: "Narsingdi",
      quote_bn: "অঙ্কুরের গ্রামীণ ঋণ নিয়ে আমি নিজের সেলাই মেশিন কিনেছি। আজ আমি স্বাবলম্বী এবং আমার পরিবার সুখে আছে।",
      quote_en: "Taking a rural loan from Onkur allowed me to buy my own sewing machine. Today, I am self-reliant and my family is doing well.",
      imageUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400",
      order: 1
    });

    // Seed sample Job vacancies
    await set(ref(db, "jobs/job1"), {
      title_bn: "মাঠ কর্মকর্তা",
      title_en: "Field Officer",
      department_bn: "মাঠপর্যায়ের কার্যক্রম",
      department_en: "Field Operations",
      location_bn: "নরসিংদী শাখা",
      location_en: "Narsingdi Branch",
      type_bn: "পূর্ণকালীন",
      type_en: "Full-time",
      deadline: "2026-09-30",
      description_bn: "গ্রামীণ ঋণগ্রহীতাদের সাথে যোগাযোগ রক্ষা করা, ঋণ বিতরণ যাচাই ও সঞ্চয় আদায়ে সহায়তা করা।",
      description_en: "Responsible for field operations, evaluating borrower addresses, distributing funds, and collecting savings installments.",
      requirements_bn: "এইচএসসি বা সমমানের পাস। মোটরসাইকেল চালানো এবং নিজস্ব লাইসেন্স থাকা আবশ্যক।",
      requirements_en: "HSC or equivalent. Ability to ride a motorcycle and possession of a valid driving license is mandatory.",
      isActive: true,
      postedAt: new Date().toISOString()
    });

    await set(ref(db, "jobs/job2"), {
      title_bn: "আইটি সহকারী (ইন্টার্নশিপ)",
      title_en: "IT Assistant (Internship)",
      department_bn: "তথ্য প্রযুক্তি বিভাগ",
      department_en: "Technology",
      location_bn: "ঢাকা কেন্দ্রীয় কার্যালয়",
      location_en: "Dhaka Central Office",
      type_bn: "ইন্টার্নশিপ",
      type_en: "Internship",
      deadline: "2026-10-15",
      description_bn: "কেন্দ্রীয় ডেটাবেস রক্ষণাবেক্ষণ, সিস্টেম ট্র্যাকিং ও এমএফএস সংহতি কার্যক্রমে সহায়তা করা।",
      description_en: "Support local database systems, branch digital tracking, and Mobile Financial Service (MFS) integrations.",
      requirements_bn: "কম্পিউটার বিজ্ঞান বা সমমানের বিষয়ে স্নাতক অধ্যয়নরত বা সম্পন্ন। বেসিক ডেটাবেস জ্ঞান থাকা আবশ্যক।",
      requirements_en: "Pursuing or completed a diploma/degree in Computer Science or equivalent field. Basic database knowledge is preferred.",
      isActive: true,
      postedAt: new Date().toISOString()
    });

    // Sign out to clean up session
    await signOut(auth);

    return NextResponse.json({ success: true, message: "Database seeded successfully!" });
  } catch (error: any) {
    // Attempt to clean up session even in case of error
    try {
      await signOut(auth);
    } catch (e) {}
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
