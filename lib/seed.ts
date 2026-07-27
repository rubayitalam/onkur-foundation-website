import { ref, set } from "firebase/database";
import { db } from "./firebase";

export async function runClientSeed() {
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
    districtsCovered: 12
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
      ]
    },
    about: {
      heading_bn: "আমাদের পথচলা",
      heading_en: "Our Journey",
      body_bn: "অঙ্কুর ফাউন্ডেশন গ্রামীণ অঞ্চলের দরিদ্র ও সুবিধাবঞ্চিত জনগোষ্ঠীর অর্থনৈতিক মুক্তির লক্ষ্যে কাজ করে চলেছে। আমরা বিশ্বাস করি, ক্ষুদ্র ঋণের সহায়তায় মানুষ তাদের সুপ্ত প্রতিভার বিকাশ ঘটিয়ে স্বাবলম্বী হতে পারে।",
      body_en: "Onkur Foundation operates with the goal of economic liberation for poor and underserved communities in rural areas. We believe that with small loans, people can unlock their potential and achieve self-reliance.",
      approach_bn: "আমাদের পদ্ধতিটি সহজ: আমরা মাঠপর্যায়ে গিয়ে আবেদনকারীদের প্রয়োজনীয়তা মূল্যায়ন করি, জামানতবিহীন ঋণের সুবিধা দিই এবং ঋণগ্রহীতাদের অর্থনৈতিক উন্নয়ন তদারকি করি।",
      approach_en: "Our approach is simple: we assess applicants' needs directly on the ground, offer collateral-free loan options, and guide borrowers to ensure sustainable growth."
    },
    nav: {
      home_bn: "হোম", home_en: "Home",
      about_bn: "আমাদের সম্পর্কে", about_en: "About Us",
      team_bn: "আমাদের দল", team_en: "Team",
      blog_bn: "ব্লগ", blog_en: "Blog",
      faq_bn: "সাধারণ জিজ্ঞাসা", faq_en: "FAQ",
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
        { label_bn: "সাধারণ জিজ্ঞাসা", label_en: "FAQ", url: "/faq" },
        { label_bn: "যোগাযোগ", label_en: "Contact", url: "/contact" }
      ],
      copyrightText_bn: "© ২০২৬ অঙ্কুর ফাউন্ডেশন। সর্বস্বত্ব সংরক্ষিত।",
      copyrightText_en: "© 2026 Onkur Foundation. All Rights Reserved."
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
}
