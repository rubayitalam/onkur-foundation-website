"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { ref, onValue, set, push, remove } from "firebase/database";
import { auth, db } from "@/lib/firebase";
import { useLanguage } from "@/context/LanguageContext";
import {
  Home, Info, Users, MessageSquare, BookOpen, HelpCircle, Settings,
  LogOut, Plus, Trash2, Edit, Save, CheckCircle, BarChart2, Loader2,
  Briefcase, Mail, Phone, Clock, ArrowRight, ShieldAlert, List, Calendar, Link2
} from "lucide-react";

const defaultWhyCards = [
  { icon: "ShieldCheck", title_bn: "স্বচ্ছ নীতিমালা", title_en: "Transparent Policies", desc_bn: "কোনো গোপন চার্জ নেই।", desc_en: "No hidden charges." },
  { icon: "Coins", title_bn: "জামানতবিহীন ঋণ", title_en: "Collateral-Free Loans", desc_bn: "স্থাবর সম্পত্তি ছাড়া ঋণের সুযোগ।", desc_en: "Collateral-free microloans." },
  { icon: "PiggyBank", title_bn: "সঞ্চয়ী হিসাব (৬% লভ্যাংশ)", title_en: "Savings Program (6% Interest)", desc_bn: "বার্ষিক ৬% লভ্যাংশ সহ সঞ্চয়।", desc_en: "Savings with 6% annual interest." },
  { icon: "HeartHandshake", title_bn: "ঋণ বীমা সুবিধা", title_en: "Borrower Credit Insurance", desc_bn: "বীমা কভারেজ সুবিধা।", desc_en: "Credit insurance coverage." }
];

const defaultSteps = [
  { step_num: 1, title_bn: "সহজ আবেদন", title_en: "Easy Application", desc_bn: "সহজ ফর্ম পূরণ করে আবেদন করুন।", desc_en: "Fill out a simple application." },
  { step_num: 2, title_bn: "মাঠপর্যায়ে যাচাই", title_en: "On-Ground Verification", desc_bn: "মাঠ কর্মকর্তা দ্বারা যাচাই।", desc_en: "Verification by field officer." },
  { step_num: 3, title_bn: "কমিটি অনুমোদন", title_en: "Committee Approval", desc_bn: "ঋণ কমিটির অনুমোদন।", desc_en: "Approval by localized committee." },
  { step_num: 4, title_bn: "ঋণ বিতরণ", title_en: "Disbursement", desc_bn: "সরাসরি অথবা এমএফএস-এ বিতরণ।", desc_en: "Disbursed directly or via MFS." }
];

const defaultApproachPoints = [
  { icon: "ShieldCheck", title_bn: "মাঠপর্যায়ে পুঙ্খানুপুঙ্খ যাচাই", title_en: "Thorough Ground Verification", desc_bn: "মাঠ কর্মকর্তা দ্বারা সরেজমিনে যাচাই।", desc_en: "Verification by field officers." },
  { icon: "Users", title_bn: "কমিউনিটি ও গ্রুপ সংহতি", title_en: "Community Group Committees", desc_bn: "স্থানীয় ঋণ কমিটির তদারকি।", desc_en: "Monitored by community groups." },
  { icon: "TrendingUp", title_bn: "ধারাবাহিক তদারকি ও প্রবৃদ্ধি", title_en: "Ongoing Support & Monitoring", desc_bn: "নিয়মিত পরামর্শ ও ব্যবসায়িক দিকনির্দেশনা।", desc_en: "Weekly tracking and business advice." }
];

const defaultServices = {
  heading_bn: "আমাদের সেবাসমূহ",
  heading_en: "Our Services",
  intro_bn: "অঙ্কুর ফাউন্ডেশন মাইক্রোক্রেডিট রেগুলেটরি অথরিটি (MRA)-র নির্দেশনা অনুসরণ করে দুই ধরনের ঋণ প্রোডাক্ট পরিচালনা করে। নিচে প্রতিটি প্রোডাক্টের বিস্তারিত শর্তাবলি দেওয়া হলো।",
  intro_en: "Onkur Foundation operates two loan products under the guidance of the Microcredit Regulatory Authority (MRA). Full terms for each product are detailed below.",
  items: [
    {
      title_bn: "ক্ষুদ্র (জাগরণ) ঋণ",
      title_en: "Khudro (Jagoron) Loan",
      short_desc_bn: "সমিতি-ভিত্তিক সাপ্তাহিক ঋণ, একচেটিয়াভাবে আয়বর্ধক কাজে নিয়োজিত নারীদের জন্য।",
      short_desc_en: "A committee-based weekly loan program exclusively for women engaged in income-generating work.",
      full_desc_bn: "ক্ষুদ্র (জাগরণ) ঋণ হলো অঙ্কুর ফাউন্ডেশনের মূল ক্ষুদ্রঋণ কর্মসূচি, যা সমিতি-ভিত্তিক পদ্ধতিতে পরিচালিত হয়। এই ঋণ শুধুমাত্র আয়বর্ধক কাজে নিয়োজিত নারীদের জন্য প্রযোজ্য। সদস্যপদের জন্য বয়স ১৮-৬০ বছরের মধ্যে হতে হবে এবং শারীরিক ও মানসিকভাবে সুস্থ থাকতে হবে, এবং শাখার কর্ম এলাকায় স্থায়ীভাবে বসবাস করতে হবে। ভর্তি ফি ১০ টাকা (অফেরতযোগ্য, শুধুমাত্র নতুন ও ফেরত আসা সদস্যদের জন্য)। প্রতিটি সমিতিতে ন্যূনতম ১০ জন এবং সর্বোচ্চ ৩০ জন সদস্য থাকে, যাঁর মধ্যে ১ জন সভানেত্রী, ১ জন সেক্রেটারি ও ১ জন ক্যাশিয়ার নির্বাচিত হন।",
      full_desc_en: "The Khudro (Jagoron) Loan is Onkur Foundation's core microcredit program, operated through a committee-based (samity) system. It is available exclusively to women engaged in income-generating activities. Members must be between 18-60 years old, physically and mentally fit, and permanently reside within the branch's operating area. The admission fee is BDT 10 (non-refundable, applicable to new and returning members only). Each committee has a minimum of 10 and a maximum of 30 members, with one chairperson, one secretary, and one cashier elected from among the members.",
      loan_range_bn: "প্রথম দফা ২০,০০০ - ৫০,০০০ টাকা। সর্বোচ্চ সিলিং ১,০০,০০০ টাকা (সরেজমিনে যাচাই ও সদস্যের সক্ষমতার ভিত্তিতে)। ঋণের পরিমাণ হাজারে রাউন্ড ফিগারে হবে।",
      loan_range_en: "First phase BDT 20,000 - 50,000. Maximum ceiling BDT 100,000 (based on field verification and member capacity). Loan amounts are rounded to the nearest thousand.",
      tenure_bn: "১ বছর (৪৬ সপ্তাহ)। সাপ্তাহিক কিস্তি প্রতি হাজারে ২৫ টাকা। ক্রমহ্রাসমান সার্ভিস চার্জ হার বার্ষিক ২২%।",
      tenure_en: "1 year (46 weeks). Weekly installment BDT 25 per thousand. Declining service charge rate of 22% annually.",
      icon: "Sprout",
      image_url: ""
    },
    {
      title_bn: "ক্ষুদ্র ব্যবসা ও উদ্যোক্তা (অগ্রসর) ঋণ",
      title_en: "Small Business & Entrepreneur (Progoshor) Loan",
      short_desc_bn: "নারী ও পুরুষ উভয়ের জন্য উন্মুক্ত, ব্যবসা সম্প্রসারণ ও উদ্যোক্তা উন্নয়নের জন্য ডিজাইন করা ঋণ।",
      short_desc_en: "Open to both men and women, designed for business expansion and entrepreneurship development.",
      full_desc_bn: "ক্ষুদ্র ব্যবসা ও উদ্যোক্তা (অগ্রসর) ঋণ আয়বর্ধক কাজে নিয়োজিত নারী ও পুরুষ উভয়ের জন্য উন্মুক্ত। এই প্রোডাক্টে সমিতি-ভিত্তিক অথবা এককভাবে (উদ্যোক্তা-ভিত্তিক) ঋণ নেওয়া যায়, এবং সাপ্তাহিক বা মাসিক কিস্তিতে পরিশোধ করা যায়। আবেদনকারীর অবশ্যই দৃশ্যমান ও বৈধ ব্যবসা বা প্রকল্প থাকতে হবে। ৫০,০০০ টাকা বা তদূর্ধ্ব ঋণ বিতরণের ক্ষেত্রে অতিরিক্ত ডকুমেন্টেশন (নন-জুডিশিয়াল স্ট্যাম্পে অঙ্গীকারনামা, দুইজন জামিনদার) প্রয়োজন হয়।",
      full_desc_en: "The Small Business & Entrepreneur (Progoshor) Loan is open to both men and women engaged in income-generating activities. This product can be taken on a committee basis or individually (entrepreneur-based), with weekly or monthly repayment options. Applicants must have a visible and legitimate business or project. Loans of BDT 50,000 or above require additional documentation (a non-judicial stamp declaration and two guarantors).",
      loan_range_bn: "প্রথম দফা ৫০,০০০ - ২,০০,০০০ টাকা। সর্বোচ্চ সিলিং ১৫,০০,০০০ টাকা (সরেজমিনে যাচাই ও সদস্যের সক্ষমতার ভিত্তিতে)। প্রথম দফা ১,০০,০০০ টাকার বেশি ঋণ বৃদ্ধির ক্ষেত্রে প্রধান কার্যালয়ের পূর্বানুমোদন প্রয়োজন।",
      loan_range_en: "First phase BDT 50,000 - 200,000. Maximum ceiling BDT 1,500,000 (based on field verification and member capacity). Increases beyond BDT 100,000 in subsequent phases require head office pre-approval.",
      tenure_bn: "১ বছর। সাপ্তাহিক কিস্তি প্রতি হাজারে ২৫ টাকা অথবা মাসিক প্রতি হাজারে ৯৫ টাকা। ক্রমহ্রাসমান সার্ভিস চার্জ হার বার্ষিক ২২%।",
      tenure_en: "1 year. Weekly installment BDT 25 per thousand, or monthly BDT 95 per thousand. Declining service charge rate of 22% annually.",
      icon: "TrendingUp",
      image_url: ""
    }
  ],
  shared_benefits_heading_bn: "উভয় ঋণ প্রোডাক্টের সাথে অন্তর্ভুক্ত সুবিধা",
  shared_benefits_heading_en: "Benefits Included with Both Loan Products",
  shared_benefits: [
    {
      title_bn: "সঞ্চয়ী হিসাব",
      title_en: "Savings Account",
      desc_bn: "সাপ্তাহিক সর্বোচ্চ ৩০ টাকা বা মাসিক ১০০ টাকা পর্যন্ত সঞ্চয় জমা রাখা যায়। ঋণ থাকাকালীন মূল ঋণের ১০% এর অতিরিক্ত সঞ্চয় রাউন্ড ফিগারে উত্তোলনযোগ্য। সঞ্চয় স্থিতির উপর বার্ষিক ৬% হারে সুদ প্রদান করা হয়।",
      desc_en: "Members can save up to BDT 30 weekly or BDT 100 monthly. Any savings beyond 10% of the outstanding loan can be withdrawn in round figures. An annual interest rate of 6% is paid on the savings balance."
    },
    {
      title_bn: "ঋণ বীমা ও সুবিধাদি",
      title_en: "Loan Insurance & Benefits",
      desc_bn: "প্রতি ঋণগ্রহীতাকে গৃহীত (আসল) ঋণের ০.৫% বা হাজারে ৫ টাকা প্রিমিয়াম জমা দিতে হয়। নিয়মিত ঋণগ্রহীতার মৃত্যু বা প্রমাণিত স্থায়ী অক্ষমতার ক্ষেত্রে অবশিষ্ট ঋণ মওকুফ করা হয় এবং নমিনিকে দাফন-কাফন বাবদ ১০,০০০ টাকা প্রদান করা হয়।",
      desc_en: "Each borrower pays a premium of 0.5% (or BDT 5 per thousand) of the principal loan received. In case of death or proven permanent disability of a regular borrower, the remaining loan is waived and BDT 10,000 is provided to the nominee for funeral expenses."
    },
    {
      title_bn: "জামানতবিহীন ঋণ",
      title_en: "Collateral-Free",
      desc_bn: "কোনো জামানত বা স্থাবর সম্পত্তি ছাড়াই ঋণ প্রদান করা হয়। শুধুমাত্র একজন জামিনদার (১৮-৬০ বছর বয়সী, শারীরিক ও মানসিকভাবে সুস্থ) প্রয়োজন হয়।",
      desc_en: "Loans are provided without any collateral or immovable property. Only one guarantor (aged 18-60, physically and mentally fit) is required."
    },
    {
      title_bn: "অগ্রিম কিস্তি সুবিধা",
      title_en: "Advance Installment Facility",
      desc_bn: "মেয়াদ পূর্তির পূর্বে সর্বশেষ ৫টি কিস্তি পর্যন্ত অগ্রিম পরিশোধ করা যায়, যার উপর সার্ভিস চার্জ মওকুফ পাওয়া যায়।",
      desc_en: "Borrowers can pay up to the last 5 installments in advance before maturity, with the corresponding service charge waived."
    }
  ],
  eligibility_heading_bn: "সাধারণ যোগ্যতা ও প্রয়োজনীয় কাগজপত্র",
  eligibility_heading_en: "General Eligibility & Required Documents",
  eligibility_points_bn: [
    "বয়স ১৮-৬০ বছরের মধ্যে হতে হবে এবং শারীরিক ও মানসিকভাবে সুস্থ হতে হবে",
    "শাখার কর্ম এলাকায় স্থায়ীভাবে বসবাস করতে হবে",
    "সদস্যের ভোটার আইডি কার্ড থাকতে হবে এবং ফটোকপি জমা দিতে হবে",
    "জামিনদারের সাম্প্রতিক সময়ের ৩ কপি রঙিন জয়েন্ট পাসপোর্ট সাইজ ছবি জমা দিতে হবে",
    "মিউচুয়াল ট্রাস্ট ব্যাংকে সঞ্চয়ী হিসাব থাকতে হবে",
    "ভাড়াটিয়া ঋণগ্রহীতার ক্ষেত্রে একই এলাকায় কমপক্ষে ৩ বছর বসবাসের প্রমাণ থাকতে হবে"
  ],
  eligibility_points_en: [
    "Must be between 18-60 years old and physically/mentally fit",
    "Must permanently reside within the branch's working area",
    "Must have a Voter ID card and submit a photocopy",
    "Guarantor must submit 3 recent color joint passport-size photos",
    "Must have a savings account at Mutual Trust Bank",
    "Tenant borrowers must show proof of at least 3 years' residence in the same area"
  ]
};

type Section = "home" | "about" | "services" | "team" | "blog" | "career" | "contact" | "settings";

export default function AdminDashboardPage() {
  const router = useRouter();
  const { tContent } = useLanguage();
  
  // Auth state
  const [user, setUser] = useState<any>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  // Active section state
  const [activeSection, setActiveSection] = useState<Section>("home");

  // Loaders & Toast
  const [dbLoading, setDbLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [loadError, setLoadError] = useState("");

  // Firebase DB states
  const [homeData, setHomeData] = useState<any>({});
  const [aboutData, setAboutData] = useState<any>({});
  const [teamContent, setTeamContent] = useState<any>({});
  const [blogContent, setBlogContent] = useState<any>({});
  const [contactContent, setContactContent] = useState<any>({});
  const [careerContent, setCareerContent] = useState<any>({});
  const [servicesData, setServicesData] = useState<any>({});
  const [eligibilityPoints, setEligibilityPoints] = useState<any>({ bn: "", en: "" });
  const [settingsData, setSettingsData] = useState<any>({});
  const [statsData, setStatsData] = useState<any>({});
  
  // Roster lists
  const [teamList, setTeamList] = useState<any[]>([]);
  const [testimonialsList, setTestimonialsList] = useState<any[]>([]);
  const [blogList, setBlogList] = useState<any[]>([]);
  const [faqList, setFaqList] = useState<any[]>([]);
  const [jobsList, setJobsList] = useState<any[]>([]);
  const [applicationsList, setApplicationsList] = useState<any[]>([]);

  // Sub-items adding/editing forms states
  const [activeTeamMember, setActiveTeamMember] = useState<any>({ id: "", name_bn: "", name_en: "", role_bn: "", role_en: "", imageUrl: "", order: 1, facebook: "", linkedin: "", bio_bn: "", bio_en: "" });
  const [activeTestimonial, setActiveTestimonial] = useState<any>({ id: "", name_bn: "", name_en: "", location_bn: "", location_en: "", quote_bn: "", quote_en: "", imageUrl: "", order: 1 });
  const [activeBlog, setActiveBlog] = useState<any>({ id: "", title_bn: "", title_en: "", excerpt_bn: "", excerpt_en: "", content_bn: "", content_en: "", coverImageUrl: "", slug: "", publishedAt: "", author: "", category: "News" });
  const [activeFaq, setActiveFaq] = useState<any>({ id: "", question_bn: "", question_en: "", answer_bn: "", answer_en: "", order: 1 });
  const [activeJob, setActiveJob] = useState<any>({ id: "", title_bn: "", title_en: "", department_bn: "", department_en: "", location_bn: "", location_en: "", type_bn: "", type_en: "Full-time", deadline: "", description_bn: "", description_en: "", requirements_bn: "", requirements_en: "", isActive: true });

  // Repeatable inputs states for complex pages
  const [homeBullets, setHomeBullets] = useState({ mission_bn: "", mission_en: "", vision_bn: "", vision_en: "", values_bn: "", values_en: "" });
  const [whyCards, setWhyCards] = useState<any[]>([]);
  const [processSteps, setProcessSteps] = useState<any[]>([]);
  const [timelineItems, setTimelineItems] = useState<any[]>([]);
  const [approachPoints, setApproachPoints] = useState<any[]>([]);
  const [contactDepts, setContactDepts] = useState<any[]>([]);

  // Career Sub-tab controller
  const [careerSubTab, setCareerSubTab] = useState<"postings" | "applications">("postings");
  const [viewingApp, setViewingApp] = useState<any | null>(null);

  // 5 seconds loading timeout handler for dashboard access resilience
  useEffect(() => {
    const timer = setTimeout(() => {
      if (checkingAuth || dbLoading) {
        setLoadError("Database loading is taking longer than expected. You can force access if authenticated.");
      }
    }, 5000);
    return () => clearTimeout(timer);
  }, [checkingAuth, dbLoading]);

  // Auth State Listener
  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, (usr) => {
      if (!usr) {
        router.push("/admin");
      } else {
        setUser(usr);
        setCheckingAuth(false);
      }
    });
    return () => unsubAuth();
  }, [router]);

  // Database Subscriptions
  useEffect(() => {
    if (checkingAuth) return;

    const homeRef = ref(db, "siteContent/home");
    const aboutRef = ref(db, "siteContent/about");
    const teamContentRef = ref(db, "siteContent/team");
    const blogContentRef = ref(db, "siteContent/blog");
    const contactRef = ref(db, "siteContent/contact");
    const settingsRef = ref(db, "settings");
    const statsRef = ref(db, "stats");
    const teamRef = ref(db, "team");
    const testRef = ref(db, "testimonials");
    const blogRef = ref(db, "blog");
    const faqRef = ref(db, "faq");
    const jobsRef = ref(db, "jobs");
    const appsRef = ref(db, "jobApplications");
    const careerContentRef = ref(db, "siteContent/career");
    const servicesContentRef = ref(db, "siteContent/services");

    let itemsLoaded = 0;
    const markLoaded = () => {
      itemsLoaded++;
      if (itemsLoaded >= 15) setDbLoading(false);
    };

    const unsubHome = onValue(homeRef, (snap) => {
      const data = snap.val() || {};
      setHomeData(data);
      setHomeBullets({
        mission_bn: (data.mission_bullets || []).map((b: any) => b.text_bn).join("\n"),
        mission_en: (data.mission_bullets || []).map((b: any) => b.text_en).join("\n"),
        vision_bn: (data.vision_bullets || []).map((b: any) => b.text_bn).join("\n"),
        vision_en: (data.vision_bullets || []).map((b: any) => b.text_en).join("\n"),
        values_bn: (data.values_bullets || []).map((b: any) => b.text_bn).join("\n"),
        values_en: (data.values_bullets || []).map((b: any) => b.text_en).join("\n")
      });
      setWhyCards(data.why_cards || []);
      setProcessSteps(data.process_steps || []);
      markLoaded();
    }, () => markLoaded());

    const unsubAbout = onValue(aboutRef, (snap) => {
      const data = snap.val() || {};
      setAboutData(data);
      setTimelineItems(data.timeline || []);
      setApproachPoints(data.approach_points || []);
      markLoaded();
    }, () => markLoaded());

    const unsubTeamContent = onValue(teamContentRef, (snap) => {
      setTeamContent(snap.val() || {});
      markLoaded();
    }, () => markLoaded());

    const unsubBlogContent = onValue(blogContentRef, (snap) => {
      setBlogContent(snap.val() || {});
      markLoaded();
    }, () => markLoaded());

    const unsubContact = onValue(contactRef, (snap) => {
      const data = snap.val() || {};
      setContactContent(data);
      setContactDepts(data.departments || []);
      markLoaded();
    }, () => markLoaded());

    const unsubSettings = onValue(settingsRef, (snap) => {
      setSettingsData(snap.val() || {});
      markLoaded();
    }, () => markLoaded());

    const unsubStats = onValue(statsRef, (snap) => {
      setStatsData(snap.val() || {});
      markLoaded();
    }, () => markLoaded());

    const unsubTeam = onValue(teamRef, (snap) => {
      const val = snap.val() || {};
      setTeamList(Object.keys(val).map(k => ({ id: k, ...val[k] })).sort((a, b) => (a.order || 0) - (b.order || 0)));
      markLoaded();
    }, () => markLoaded());

    const unsubTest = onValue(testRef, (snap) => {
      const val = snap.val() || {};
      setTestimonialsList(Object.keys(val).map(k => ({ id: k, ...val[k] })).sort((a, b) => (a.order || 0) - (b.order || 0)));
      markLoaded();
    }, () => markLoaded());

    const unsubBlog = onValue(blogRef, (snap) => {
      const val = snap.val() || {};
      setBlogList(Object.keys(val).map(k => ({ id: k, ...val[k] })).sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()));
      markLoaded();
    }, () => markLoaded());

    const unsubFaq = onValue(faqRef, (snap) => {
      const val = snap.val() || {};
      setFaqList(Object.keys(val).map(k => ({ id: k, ...val[k] })).sort((a, b) => (a.order || 0) - (b.order || 0)));
      markLoaded();
    }, () => markLoaded());

    const unsubJobs = onValue(jobsRef, (snap) => {
      const val = snap.val() || {};
      setJobsList(Object.keys(val).map(k => ({ id: k, ...val[k] })).sort((a, b) => new Date(b.postedAt || 0).getTime() - new Date(a.postedAt || 0).getTime()));
      markLoaded();
    }, () => markLoaded());

    const unsubApps = onValue(appsRef, (snap) => {
      const val = snap.val() || {};
      setApplicationsList(Object.keys(val).map(k => ({ id: k, ...val[k] })).sort((a, b) => new Date(b.submittedAt || 0).getTime() - new Date(a.submittedAt || 0).getTime()));
      markLoaded();
    }, () => markLoaded());

    const unsubCareer = onValue(careerContentRef, (snap) => {
      setCareerContent(snap.val() || {});
      markLoaded();
    }, () => markLoaded());

    const unsubServices = onValue(servicesContentRef, (snap) => {
      const data = snap.val();
      const servicesVal = (data && data.heading_bn) ? data : defaultServices;
      setServicesData(servicesVal);
      setEligibilityPoints({
        bn: (servicesVal.eligibility_points_bn || []).join("\n"),
        en: (servicesVal.eligibility_points_en || []).join("\n")
      });
      markLoaded();
    }, () => markLoaded());

    return () => {
      unsubHome();
      unsubAbout();
      unsubTeamContent();
      unsubBlogContent();
      unsubContact();
      unsubSettings();
      unsubStats();
      unsubTeam();
      unsubTest();
      unsubBlog();
      unsubFaq();
      unsubJobs();
      unsubApps();
      unsubCareer();
      unsubServices();
    };
  }, [checkingAuth]);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/admin");
  };

  // 1. Save Home Settings
  const saveHome = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const mission_bullets = homeBullets.mission_bn.split("\n").filter(l => l.trim()).map((l, i) => ({
        text_bn: l,
        text_en: homeBullets.mission_en.split("\n")[i] || l
      }));
      const vision_bullets = homeBullets.vision_bn.split("\n").filter(l => l.trim()).map((l, i) => ({
        text_bn: l,
        text_en: homeBullets.vision_en.split("\n")[i] || l
      }));
      const values_bullets = homeBullets.values_bn.split("\n").filter(l => l.trim()).map((l, i) => ({
        text_bn: l,
        text_en: homeBullets.values_en.split("\n")[i] || l
      }));

      const payload = {
        ...homeData,
        mission_bullets,
        vision_bullets,
        values_bullets,
        why_cards: whyCards,
        process_steps: processSteps
      };

      await set(ref(db, "siteContent/home"), payload);
      triggerToast("Home page updated!");
    } catch (err: any) {
      alert("Error: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  // 2. Save About Settings
  const saveAbout = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        ...aboutData,
        timeline: timelineItems,
        approach_points: approachPoints
      };
      await set(ref(db, "siteContent/about"), payload);
      triggerToast("About page updated!");
    } catch (err: any) {
      alert("Error: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  // 3. Save Team Landing Settings
  const saveTeamLanding = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await set(ref(db, "siteContent/team"), teamContent);
      triggerToast("Team headings updated!");
    } catch (err: any) {
      alert("Error: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  // 4. Save Blog Landing Settings
  const saveBlogLanding = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await set(ref(db, "siteContent/blog"), blogContent);
      triggerToast("Blog headings updated!");
    } catch (err: any) {
      alert("Error: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  // 5. Save Contact Landing Settings
  const saveContactLanding = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        ...contactContent,
        departments: contactDepts.filter(d => d.name_bn || d.name_en)
      };
      await set(ref(db, "siteContent/contact"), payload);
      triggerToast("Contact details updated!");
    } catch (err: any) {
      alert("Error: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  // Save Career Page Content (Banner)
  const saveCareerContent = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await set(ref(db, "siteContent/career"), careerContent);
      triggerToast("Career page banner updated!");
    } catch (err: any) {
      alert("Error: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  // Save Services Page Content
  const saveServices = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        ...servicesData,
        eligibility_points_bn: (eligibilityPoints.bn || "").split("\n").map((line: string) => line.trim()).filter(Boolean),
        eligibility_points_en: (eligibilityPoints.en || "").split("\n").map((line: string) => line.trim()).filter(Boolean)
      };
      await set(ref(db, "siteContent/services"), payload);
      triggerToast("Services page details updated!");
    } catch (err: any) {
      alert("Error: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  // 6. Save Site Settings & Stats
  const saveSettingsAndStats = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await set(ref(db, "settings"), settingsData);
      
      const statsPayload = {
        amountDistributed: Number(statsData.amountDistributed) || 0,
        peopleServed: Number(statsData.peopleServed) || 0,
        districtsCovered: Number(statsData.districtsCovered) || 0,
        activeBranches: Number(statsData.activeBranches) || 0,
        yearsActive: Number(statsData.yearsActive) || 0
      };
      await set(ref(db, "stats"), statsPayload);

      triggerToast("Settings & stats updated!");
    } catch (err: any) {
      alert("Error: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  // 7. Team member CRUD
  const saveTeamMember = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      let id = activeTeamMember.id;
      if (!id) {
        const teamRef = ref(db, "team");
        const newRef = push(teamRef);
        id = newRef.key || "";
      }
      const payload = { ...activeTeamMember };
      delete payload.id;
      payload.order = Number(payload.order) || 1;
      await set(ref(db, `team/${id}`), payload);
      triggerToast("Team member saved!");
      setActiveTeamMember({ id: "", name_bn: "", name_en: "", role_bn: "", role_en: "", imageUrl: "", order: 1, facebook: "", linkedin: "", bio_bn: "", bio_en: "" });
    } catch (err: any) {
      alert("Error: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  const deleteTeamMember = async (id: string) => {
    if (confirm("Are you sure?")) {
      await remove(ref(db, `team/${id}`));
      triggerToast("Member removed!");
    }
  };

  // 8. Testimonials CRUD
  const saveTestimonial = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      let id = activeTestimonial.id;
      if (!id) {
        const testRef = ref(db, "testimonials");
        const newRef = push(testRef);
        id = newRef.key || "";
      }
      const payload = { ...activeTestimonial };
      delete payload.id;
      payload.order = Number(payload.order) || 1;
      await set(ref(db, `testimonials/${id}`), payload);
      triggerToast("Testimonial saved!");
      setActiveTestimonial({ id: "", name_bn: "", name_en: "", location_bn: "", location_en: "", quote_bn: "", quote_en: "", imageUrl: "", order: 1 });
    } catch (err: any) {
      alert("Error: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  const deleteTestimonial = async (id: string) => {
    if (confirm("Are you sure?")) {
      await remove(ref(db, `testimonials/${id}`));
      triggerToast("Testimonial deleted!");
    }
  };

  // 9. Blog posts CRUD
  const saveBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      let id = activeBlog.id;
      if (!id) {
        const blogRef = ref(db, "blog");
        const newRef = push(blogRef);
        id = newRef.key || "";
      }
      const payload = { ...activeBlog };
      delete payload.id;
      await set(ref(db, `blog/${id}`), payload);
      triggerToast("Blog post saved!");
      setActiveBlog({ id: "", title_bn: "", title_en: "", excerpt_bn: "", excerpt_en: "", content_bn: "", content_en: "", coverImageUrl: "", slug: "", publishedAt: "", author: "", category: "News" });
    } catch (err: any) {
      alert("Error: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  const deleteBlog = async (id: string) => {
    if (confirm("Are you sure?")) {
      await remove(ref(db, `blog/${id}`));
      triggerToast("Blog post deleted!");
    }
  };

  // 10. FAQ CRUD
  const saveFaq = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      let id = activeFaq.id;
      if (!id) {
        const faqRef = ref(db, "faq");
        const newRef = push(faqRef);
        id = newRef.key || "";
      }
      const payload = { ...activeFaq };
      delete payload.id;
      payload.order = Number(payload.order) || 1;
      await set(ref(db, `faq/${id}`), payload);
      triggerToast("FAQ saved!");
      setActiveFaq({ id: "", question_bn: "", question_en: "", answer_bn: "", answer_en: "", order: 1 });
    } catch (err: any) {
      alert("Error: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  const deleteFaq = async (id: string) => {
    if (confirm("Are you sure?")) {
      await remove(ref(db, `faq/${id}`));
      triggerToast("FAQ deleted!");
    }
  };

  // 11. Jobs CRUD
  const saveJob = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      let id = activeJob.id;
      if (!id) {
        const jobsRef = ref(db, "jobs");
        const newRef = push(jobsRef);
        id = newRef.key || "";
      }
      const payload = { 
        ...activeJob, 
        postedAt: activeJob.postedAt || new Date().toISOString() 
      };
      delete payload.id;
      await set(ref(db, `jobs/${id}`), payload);
      triggerToast("Job posting saved!");
      setActiveJob({ id: "", title_bn: "", title_en: "", department_bn: "", department_en: "", location_bn: "", location_en: "", type_bn: "", type_en: "Full-time", deadline: "", description_bn: "", description_en: "", requirements_bn: "", requirements_en: "", isActive: true });
    } catch (err: any) {
      alert("Error: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  const deleteJob = async (id: string) => {
    if (confirm("Are you sure you want to delete this job posting?")) {
      await remove(ref(db, `jobs/${id}`));
      triggerToast("Job posting deleted!");
    }
  };

  // Seeding tool helper
  const handleSeedDefaultContent = async () => {
    if (confirm("Are you sure you want to seed default data? This overwrites site content nodes.")) {
      try {
        setSaving(true);
        const res = await fetch("/api/seed");
        const data = await res.json();
        if (data.success) {
          alert("Seeding complete!");
        } else {
          alert("Seeding failed: " + data.error);
        }
      } catch (e: any) {
        alert("Request error: " + e.message);
      } finally {
        setSaving(false);
      }
    }
  };

  if (checkingAuth || dbLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#FBF6EE] p-6 text-center space-y-4">
        {loadError ? (
          <div className="max-w-md bg-white p-8 rounded-3xl border border-[#1F4A3D]/10 shadow-lg space-y-4">
            <p className="text-sm text-red-600 font-semibold">{loadError}</p>
            <p className="text-xs text-[#2B2621]/60 font-light leading-relaxed">
              If this is the first deployment, database nodes might be completely unseeded. You can force access to trigger seeding.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  setCheckingAuth(false);
                  setDbLoading(false);
                }}
                className="bg-[#1F4A3D] hover:bg-[#15342b] text-white px-6 py-3 rounded-lg text-xs font-semibold shadow-sm hover:shadow-md transition-all cursor-pointer"
              >
                Force Access Dashboard
              </button>
            </div>
          </div>
        ) : (
          <>
            <Loader2 className="w-8 h-8 text-[#1F4A3D] animate-spin" />
            <p className="text-xs tracking-wider text-[#2B2621]/60">LOADING SECURE DASHBOARD...</p>
          </>
        )}
      </div>
    );
  }

  // Sidebar Configuration exactly as requested
  const sidebarItems = [
    { id: "home", label: "🏠 Home Page", path: "/" },
    { id: "about", label: "ℹ️ About Us Page", path: "/about" },
    { id: "services", label: "📋 Services Page", path: "/services" },
    { id: "team", label: "👥 Team Page", path: "/team" },
    { id: "blog", label: "📰 Blog Posts", path: "/blog" },
    { id: "career", label: "💼 Careers Page", path: "/career" },
    { id: "contact", label: "📞 Contact Page", path: "/contact" },
    { id: "settings", label: "⚙️ Site Settings & Stats", path: "" }
  ];

  return (
    <div className="min-h-screen bg-[#FBF6EE]/30 flex flex-col md:flex-row">
      
      {/* Toast Notice */}
      {toastMessage && (
        <div className="fixed top-24 right-8 bg-[#1F4A3D] text-[#FBF6EE] px-6 py-4 rounded-xl shadow-lg border border-[#C9973B]/20 flex items-center gap-2.5 z-50 animate-bounce">
          <CheckCircle className="w-5 h-5 text-[#C9973B]" />
          <span className="text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Left Sidebar */}
      <aside className="w-full md:w-72 bg-[#1F4A3D] text-[#FBF6EE] shrink-0 flex flex-col justify-between p-6 border-r border-[#FBF6EE]/10">
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-[#C9973B]">অঙ্কুর কন্ট্রোল</h2>
            <p className="text-[10px] tracking-widest text-[#FBF6EE]/60 uppercase font-bold mt-1">Admin Dashboard Panel</p>
          </div>

          <nav className="space-y-1">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id as Section)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                  activeSection === item.id
                    ? "bg-[#C65D2E] text-white shadow-md"
                    : "hover:bg-white/5 text-[#FBF6EE]/80"
                }`}
              >
                <span>{item.label}</span>
                {item.path && (
                  <a 
                    href={item.path} 
                    target="_blank" 
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()} 
                    className="text-[10px] bg-white/10 hover:bg-white/20 text-[#FBF6EE] px-2 py-0.5 rounded-md transition-all ml-2"
                  >
                    View Live
                  </a>
                )}
              </button>
            ))}
          </nav>
        </div>

        <div className="pt-6 border-t border-white/10 flex items-center justify-between">
          <div className="space-y-0.5">
            <p className="text-xs font-semibold text-white truncate max-w-[120px]">{user?.email}</p>
            <p className="text-[9px] text-[#FBF6EE]/60">Authorized Session</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1 text-xs text-[#C9973B] hover:text-[#C65D2E] font-bold cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Workspace */}
      <main className="flex-1 p-6 md:p-10 max-h-screen overflow-y-auto">
        <div className="max-w-5xl mx-auto space-y-8">
          
          <div className="flex justify-between items-center border-b border-[#1F4A3D]/10 pb-4">
            <div>
              <h1 className="text-3xl font-extrabold text-[#1F4A3D] capitalize">
                {activeSection === "settings" ? "Site Settings & Stats" : activeSection + " Page Editor"}
              </h1>
              <p className="text-xs text-[#2B2621]/60 font-light mt-1">Configure bilingual settings and database components in real-time.</p>
            </div>
            {sidebarItems.find(i => i.id === activeSection)?.path && (
              <a
                href={sidebarItems.find(i => i.id === activeSection)?.path}
                target="_blank"
                rel="noreferrer"
                className="bg-[#1F4A3D] hover:bg-[#15342b] text-white px-4 py-2.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm"
              >
                <span>View Live Page →</span>
              </a>
            )}
          </div>

          {/* 1. HOME SECTION */}
          {activeSection === "home" && (
            <div className="space-y-12">
              <form onSubmit={saveHome} className="space-y-8">
                
                {/* Visual Sub-header: Hero Section */}
                <div className="space-y-4">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[#C65D2E] border-b border-[#1F4A3D]/10 pb-2">
                    Hero Section
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-[#2B2621]/80">Hero Title (Bangla)</label>
                      <input
                        type="text" required
                        value={homeData.hero_title_bn || ""}
                        onChange={(e) => setHomeData({ ...homeData, hero_title_bn: e.target.value })}
                        className="w-full px-4 py-3 bg-white border border-[#1F4A3D]/10 rounded-lg text-sm"
                      />
                      <p className="text-[10px] text-gray-500 mt-0.5">হোমপেজের ওপরে বড় ব্যানার শিরোনাম হিসেবে প্রদর্শিত হবে।</p>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-[#2B2621]/80">Hero Title (English)</label>
                      <input
                        type="text" required
                        value={homeData.hero_title_en || ""}
                        onChange={(e) => setHomeData({ ...homeData, hero_title_en: e.target.value })}
                        className="w-full px-4 py-3 bg-white border border-[#1F4A3D]/10 rounded-lg text-sm"
                      />
                      <p className="text-[10px] text-gray-500 mt-0.5">Appears as the large heading in the hero banner of the homepage.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-[#2B2621]/80">Hero Subtitle (Bangla)</label>
                      <textarea
                        rows={2} required
                        value={homeData.hero_subtitle_bn || ""}
                        onChange={(e) => setHomeData({ ...homeData, hero_subtitle_bn: e.target.value })}
                        className="w-full px-4 py-3 bg-white border border-[#1F4A3D]/10 rounded-lg text-sm"
                      />
                      <p className="text-[10px] text-gray-500 mt-0.5">হোমপেজ ব্যানারের শিরোনামের ঠিক নিচে প্রদর্শিত প্যারগ্রাফ।</p>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-[#2B2621]/80">Hero Subtitle (English)</label>
                      <textarea
                        rows={2} required
                        value={homeData.hero_subtitle_en || ""}
                        onChange={(e) => setHomeData({ ...homeData, hero_subtitle_en: e.target.value })}
                        className="w-full px-4 py-3 bg-white border border-[#1F4A3D]/10 rounded-lg text-sm"
                      />
                      <p className="text-[10px] text-gray-500 mt-0.5">Appears underneath the main title text in the hero banner.</p>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#2B2621]/80">Hero Image URL</label>
                    <input
                      type="url" required
                      value={homeData.hero_image_url || ""}
                      onChange={(e) => setHomeData({ ...homeData, hero_image_url: e.target.value })}
                      className="w-full px-4 py-3 bg-white border border-[#1F4A3D]/10 rounded-lg text-sm"
                    />
                    <p className="text-[10px] text-gray-500 mt-0.5">Appears as the side picture in the hero banner section of the homepage.</p>
                  </div>
                </div>

                {/* Visual Sub-header: Why Choose Us Section */}
                <div className="space-y-4">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[#C65D2E] border-b border-[#1F4A3D]/10 pb-2">
                    Why Choose Us Section
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-[#2B2621]/80">Section Title (Bangla)</label>
                      <input
                        type="text" required
                        value={homeData.why_title_bn || ""}
                        onChange={(e) => setHomeData({ ...homeData, why_title_bn: e.target.value })}
                        className="w-full px-4 py-3 bg-white border border-[#1F4A3D]/10 rounded-lg text-sm"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-[#2B2621]/80">Section Title (English)</label>
                      <input
                        type="text" required
                        value={homeData.why_title_en || ""}
                        onChange={(e) => setHomeData({ ...homeData, why_title_en: e.target.value })}
                        className="w-full px-4 py-3 bg-white border border-[#1F4A3D]/10 rounded-lg text-sm"
                      />
                    </div>
                  </div>

                  {/* Why Choose Us Cards Editor */}
                  <div className="space-y-4 pt-2">
                    <label className="text-xs font-semibold text-[#2B2621]/80 block">Why Choose Us Cards (Fixed 4 Cards)</label>
                    <div className="grid grid-cols-1 gap-6">
                      {(whyCards.length > 0 ? whyCards : defaultWhyCards).map((card, idx) => (
                        <div key={idx} className="p-4 bg-white rounded-xl border border-[#1F4A3D]/10 space-y-3">
                          <p className="text-xs font-bold text-[#1F4A3D]">Card #{idx + 1}</p>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <input
                              type="text" required
                              placeholder="Title (Bangla)"
                              value={card.title_bn}
                              onChange={(e) => {
                                const copy = [...whyCards];
                                copy[idx] = { ...copy[idx], title_bn: e.target.value };
                                setWhyCards(copy);
                              }}
                              className="px-3 py-2 border border-gray-200 rounded-lg text-xs"
                            />
                            <input
                              type="text" required
                              placeholder="Title (English)"
                              value={card.title_en}
                              onChange={(e) => {
                                const copy = [...whyCards];
                                copy[idx] = { ...copy[idx], title_en: e.target.value };
                                setWhyCards(copy);
                              }}
                              className="px-3 py-2 border border-gray-200 rounded-lg text-xs"
                            />
                            <select
                              value={card.icon}
                              onChange={(e) => {
                                const copy = [...whyCards];
                                copy[idx] = { ...copy[idx], icon: e.target.value };
                                setWhyCards(copy);
                              }}
                              className="px-3 py-2 border border-gray-200 rounded-lg text-xs"
                            >
                              <option value="ShieldCheck">ShieldCheck (Transparency)</option>
                              <option value="Coins">Coins (Collateral-Free)</option>
                              <option value="PiggyBank">PiggyBank (Savings)</option>
                              <option value="HeartHandshake">HeartHandshake (Credit Insurance)</option>
                            </select>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <textarea
                              rows={2} required
                              placeholder="Description (Bangla)"
                              value={card.desc_bn}
                              onChange={(e) => {
                                const copy = [...whyCards];
                                copy[idx] = { ...copy[idx], desc_bn: e.target.value };
                                setWhyCards(copy);
                              }}
                              className="px-3 py-2 border border-gray-200 rounded-lg text-xs w-full"
                            />
                            <textarea
                              rows={2} required
                              placeholder="Description (English)"
                              value={card.desc_en}
                              onChange={(e) => {
                                const copy = [...whyCards];
                                copy[idx] = { ...copy[idx], desc_en: e.target.value };
                                setWhyCards(copy);
                              }}
                              className="px-3 py-2 border border-gray-200 rounded-lg text-xs w-full"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Visual Sub-header: How It Works Process */}
                <div className="space-y-4">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[#C65D2E] border-b border-[#1F4A3D]/10 pb-2">
                    How It Works Process Section
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-[#2B2621]/80">Process Section Title (Bangla)</label>
                      <input
                        type="text" required
                        value={homeData.process_title_bn || ""}
                        onChange={(e) => setHomeData({ ...homeData, process_title_bn: e.target.value })}
                        className="w-full px-4 py-3 bg-white border border-[#1F4A3D]/10 rounded-lg text-sm"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-[#2B2621]/80">Process Section Title (English)</label>
                      <input
                        type="text" required
                        value={homeData.process_title_en || ""}
                        onChange={(e) => setHomeData({ ...homeData, process_title_en: e.target.value })}
                        className="w-full px-4 py-3 bg-white border border-[#1F4A3D]/10 rounded-lg text-sm"
                      />
                    </div>
                  </div>

                  {/* Repeatable steps cards */}
                  <div className="space-y-4 pt-2">
                    <label className="text-xs font-semibold text-[#2B2621]/80 block">Workflow Steps (Fixed 4 Steps)</label>
                    <div className="grid grid-cols-1 gap-6">
                      {(processSteps.length > 0 ? processSteps : defaultSteps).map((step, idx) => (
                        <div key={idx} className="p-4 bg-white rounded-xl border border-[#1F4A3D]/10 space-y-3">
                          <p className="text-xs font-bold text-[#1F4A3D]">Step #{idx + 1}</p>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <input
                              type="text" required
                              placeholder="Step Title (Bangla)"
                              value={step.title_bn}
                              onChange={(e) => {
                                const copy = [...processSteps];
                                copy[idx] = { ...copy[idx], title_bn: e.target.value };
                                setProcessSteps(copy);
                              }}
                              className="px-3 py-2 border border-gray-200 rounded-lg text-xs"
                            />
                            <input
                              type="text" required
                              placeholder="Step Title (English)"
                              value={step.title_en}
                              onChange={(e) => {
                                const copy = [...processSteps];
                                copy[idx] = { ...copy[idx], title_en: e.target.value };
                                setProcessSteps(copy);
                              }}
                              className="px-3 py-2 border border-gray-200 rounded-lg text-xs"
                            />
                            <input
                              type="number" required
                              placeholder="Number"
                              value={step.step_num || (idx + 1)}
                              onChange={(e) => {
                                const copy = [...processSteps];
                                copy[idx] = { ...copy[idx], step_num: Number(e.target.value) };
                                setProcessSteps(copy);
                              }}
                              className="px-3 py-2 border border-gray-200 rounded-lg text-xs"
                            />
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <textarea
                              rows={2} required
                              placeholder="Step Description (Bangla)"
                              value={step.desc_bn}
                              onChange={(e) => {
                                const copy = [...processSteps];
                                copy[idx] = { ...copy[idx], desc_bn: e.target.value };
                                setProcessSteps(copy);
                              }}
                              className="px-3 py-2 border border-gray-200 rounded-lg text-xs w-full"
                            />
                            <textarea
                              rows={2} required
                              placeholder="Step Description (English)"
                              value={step.desc_en}
                              onChange={(e) => {
                                const copy = [...processSteps];
                                copy[idx] = { ...copy[idx], desc_en: e.target.value };
                                setProcessSteps(copy);
                              }}
                              className="px-3 py-2 border border-gray-200 rounded-lg text-xs w-full"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Visual Sub-header: Mission / Vision / Values Tabs */}
                <div className="space-y-4">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[#C65D2E] border-b border-[#1F4A3D]/10 pb-2">
                    Mission / Vision / Values Bullets
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-[#2B2621]/80">Mission Bullets (Bangla)</label>
                      <textarea
                        rows={6}
                        value={homeBullets.mission_bn}
                        onChange={(e) => setHomeBullets({ ...homeBullets, mission_bn: e.target.value })}
                        className="w-full px-4 py-3 bg-white border border-[#1F4A3D]/10 rounded-lg text-xs font-mono"
                      />
                      <p className="text-[10px] text-gray-500 mt-0.5">প্রতি লাইনে ১টি করে বুলেট পয়েন্ট লিখুন (বাংলা)।</p>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-[#2B2621]/80">Vision Bullets (Bangla)</label>
                      <textarea
                        rows={6}
                        value={homeBullets.vision_bn}
                        onChange={(e) => setHomeBullets({ ...homeBullets, vision_bn: e.target.value })}
                        className="w-full px-4 py-3 bg-white border border-[#1F4A3D]/10 rounded-lg text-xs font-mono"
                      />
                      <p className="text-[10px] text-gray-500 mt-0.5">প্রতি লাইনে ১টি করে স্বপ্ন বুলেট পয়েন্ট (বাংলা)।</p>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-[#2B2621]/80">Values Bullets (Bangla)</label>
                      <textarea
                        rows={6}
                        value={homeBullets.values_bn}
                        onChange={(e) => setHomeBullets({ ...homeBullets, values_bn: e.target.value })}
                        className="w-full px-4 py-3 bg-white border border-[#1F4A3D]/10 rounded-lg text-xs font-mono"
                      />
                      <p className="text-[10px] text-gray-500 mt-0.5">প্রতি লাইনে ১টি করে মূল্যবোধ বুলেট (বাংলা)।</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-[#2B2621]/80">Mission Bullets (English)</label>
                      <textarea
                        rows={6}
                        value={homeBullets.mission_en}
                        onChange={(e) => setHomeBullets({ ...homeBullets, mission_en: e.target.value })}
                        className="w-full px-4 py-3 bg-white border border-[#1F4A3D]/10 rounded-lg text-xs font-mono"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-[#2B2621]/80">Vision Bullets (English)</label>
                      <textarea
                        rows={6}
                        value={homeBullets.vision_en}
                        onChange={(e) => setHomeBullets({ ...homeBullets, vision_en: e.target.value })}
                        className="w-full px-4 py-3 bg-white border border-[#1F4A3D]/10 rounded-lg text-xs font-mono"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-[#2B2621]/80">Values Bullets (English)</label>
                      <textarea
                        rows={6}
                        value={homeBullets.values_en}
                        onChange={(e) => setHomeBullets({ ...homeBullets, values_en: e.target.value })}
                        className="w-full px-4 py-3 bg-white border border-[#1F4A3D]/10 rounded-lg text-xs font-mono"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#2B2621]/80">Mission/Vision/Values Section Image URL</label>
                    <input
                      type="url" required
                      value={homeData.mission_image_url || ""}
                      onChange={(e) => setHomeData({ ...homeData, mission_image_url: e.target.value })}
                      className="w-full px-4 py-3 bg-white border border-[#1F4A3D]/10 rounded-lg text-sm"
                    />
                    <p className="text-[10px] text-gray-500 mt-0.5">Appears next to the Mission/Vision/Values tabs on the homepage.</p>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit" disabled={saving}
                    className="bg-[#1F4A3D] text-[#FBF6EE] px-6 py-3 rounded-lg text-xs font-semibold hover:bg-[#15342b] disabled:bg-gray-400 cursor-pointer shadow-sm"
                  >
                    {saving ? "Saving Changes..." : "Save Homepage Content"}
                  </button>
                </div>
              </form>

              {/* Testimonials Panel Integrated here */}
              <div className="border-t border-[#1F4A3D]/10 pt-10 space-y-6">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#C65D2E]">
                  Testimonials Management (Homepage Component)
                </h3>
                
                <form onSubmit={saveTestimonial} className="bg-white p-6 rounded-2xl border border-[#1F4A3D]/10 space-y-4">
                  <h4 className="text-xs font-bold text-[#1F4A3D]">{activeTestimonial.id ? "Edit Testimonial Profile" : "Add Testimonial Profile"}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text" required placeholder="Borrower Name (Bangla)"
                      value={activeTestimonial.name_bn || ""}
                      onChange={(e) => setActiveTestimonial({ ...activeTestimonial, name_bn: e.target.value })}
                      className="px-3 py-2 bg-[#FBF6EE]/10 border border-[#1F4A3D]/10 rounded-lg text-xs"
                    />
                    <input
                      type="text" required placeholder="Borrower Name (English)"
                      value={activeTestimonial.name_en || ""}
                      onChange={(e) => setActiveTestimonial({ ...activeTestimonial, name_en: e.target.value })}
                      className="px-3 py-2 bg-[#FBF6EE]/10 border border-[#1F4A3D]/10 rounded-lg text-xs"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input
                      type="text" required placeholder="Location (Bangla) e.g. নরসিংদী"
                      value={activeTestimonial.location_bn || ""}
                      onChange={(e) => setActiveTestimonial({ ...activeTestimonial, location_bn: e.target.value })}
                      className="px-3 py-2 bg-[#FBF6EE]/10 border border-[#1F4A3D]/10 rounded-lg text-xs"
                    />
                    <input
                      type="text" required placeholder="Location (English)"
                      value={activeTestimonial.location_en || ""}
                      onChange={(e) => setActiveTestimonial({ ...activeTestimonial, location_en: e.target.value })}
                      className="px-3 py-2 bg-[#FBF6EE]/10 border border-[#1F4A3D]/10 rounded-lg text-xs"
                    />
                    <input
                      type="number" required placeholder="Order"
                      value={activeTestimonial.order ?? 1}
                      onChange={(e) => setActiveTestimonial({ ...activeTestimonial, order: Number(e.target.value) })}
                      className="px-3 py-2 bg-[#FBF6EE]/10 border border-[#1F4A3D]/10 rounded-lg text-xs"
                    />
                  </div>
                  <input
                    type="url" required placeholder="Avatar Image URL (Unsplash/Static link)"
                    value={activeTestimonial.imageUrl || ""}
                    onChange={(e) => setActiveTestimonial({ ...activeTestimonial, imageUrl: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FBF6EE]/10 border border-[#1F4A3D]/10 rounded-lg text-xs"
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <textarea
                      rows={3} required placeholder="Quote (Bangla)"
                      value={activeTestimonial.quote_bn || ""}
                      onChange={(e) => setActiveTestimonial({ ...activeTestimonial, quote_bn: e.target.value })}
                      className="px-3 py-2 bg-[#FBF6EE]/10 border border-[#1F4A3D]/10 rounded-lg text-xs w-full"
                    />
                    <textarea
                      rows={3} required placeholder="Quote (English)"
                      value={activeTestimonial.quote_en || ""}
                      onChange={(e) => setActiveTestimonial({ ...activeTestimonial, quote_en: e.target.value })}
                      className="px-3 py-2 bg-[#FBF6EE]/10 border border-[#1F4A3D]/10 rounded-lg text-xs w-full"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button type="submit" disabled={saving} className="bg-[#1F4A3D] text-white px-4 py-2 rounded-lg text-xs font-semibold hover:bg-[#15342b] cursor-pointer">
                      Save Testimonial
                    </button>
                    <button type="button" onClick={() => setActiveTestimonial({ id: "", name_bn: "", name_en: "", location_bn: "", location_en: "", quote_bn: "", quote_en: "", imageUrl: "", order: 1 })} className="border border-gray-200 text-gray-700 px-4 py-2 rounded-lg text-xs hover:bg-gray-50 cursor-pointer">
                      Clear Form
                    </button>
                  </div>
                </form>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                  {testimonialsList.map((t) => (
                    <div key={t.id} className="p-4 bg-white border border-gray-200 rounded-xl shadow-xs flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img src={t.imageUrl} alt={t.name_en} className="w-10 h-10 rounded-full object-cover shrink-0" />
                        <div>
                          <p className="text-xs font-bold text-[#1F4A3D]">{tContent(t.name_bn, t.name_en)}</p>
                          <p className="text-[10px] text-gray-500 font-light">{tContent(t.location_bn, t.location_en)}</p>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <button onClick={() => setActiveTestimonial(t)} className="text-[#C65D2E] hover:bg-[#C65D2E]/5 p-2 rounded-md transition-colors"><Edit className="w-3.5 h-3.5" /></button>
                        <button onClick={() => deleteTestimonial(t.id)} className="text-red-500 hover:bg-red-50 p-2 rounded-md transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* 2. ABOUT US SECTION */}
          {activeSection === "about" && (
            <div className="space-y-12">
              <form onSubmit={saveAbout} className="space-y-8">
                
                {/* Visual Sub-header: Journey Copy */}
                <div className="space-y-4">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[#C65D2E] border-b border-[#1F4A3D]/10 pb-2">
                    About Heading & Journey Narrative
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-[#2B2621]/80">About Page Heading (Bangla)</label>
                      <input
                        type="text" required
                        value={aboutData.heading_bn || ""}
                        onChange={(e) => setAboutData({ ...aboutData, heading_bn: e.target.value })}
                        className="w-full px-4 py-3 bg-white border border-[#1F4A3D]/10 rounded-lg text-sm"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-[#2B2621]/80">About Page Heading (English)</label>
                      <input
                        type="text" required
                        value={aboutData.heading_en || ""}
                        onChange={(e) => setAboutData({ ...aboutData, heading_en: e.target.value })}
                        className="w-full px-4 py-3 bg-white border border-[#1F4A3D]/10 rounded-lg text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-[#2B2621]/80">Main Body Narrative (Bangla)</label>
                      <textarea
                        rows={4} required
                        value={aboutData.body_bn || ""}
                        onChange={(e) => setAboutData({ ...aboutData, body_bn: e.target.value })}
                        className="w-full px-4 py-3 bg-white border border-[#1F4A3D]/10 rounded-lg text-xs leading-relaxed"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-[#2B2621]/80">Main Body Narrative (English)</label>
                      <textarea
                        rows={4} required
                        value={aboutData.body_en || ""}
                        onChange={(e) => setAboutData({ ...aboutData, body_en: e.target.value })}
                        className="w-full px-4 py-3 bg-white border border-[#1F4A3D]/10 rounded-lg text-xs leading-relaxed"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-[#2B2621]/80">Operational Approach Text (Bangla)</label>
                      <textarea
                        rows={3} required
                        value={aboutData.approach_bn || ""}
                        onChange={(e) => setAboutData({ ...aboutData, approach_bn: e.target.value })}
                        className="w-full px-4 py-3 bg-white border border-[#1F4A3D]/10 rounded-lg text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-[#2B2621]/80">Operational Approach Text (English)</label>
                      <textarea
                        rows={3} required
                        value={aboutData.approach_en || ""}
                        onChange={(e) => setAboutData({ ...aboutData, approach_en: e.target.value })}
                        className="w-full px-4 py-3 bg-white border border-[#1F4A3D]/10 rounded-lg text-xs"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#2B2621]/80">Journey Section Image URL</label>
                    <input
                      type="url" required
                      value={aboutData.about_image_url || ""}
                      onChange={(e) => setAboutData({ ...aboutData, about_image_url: e.target.value })}
                      className="w-full px-4 py-3 bg-white border border-[#1F4A3D]/10 rounded-lg text-sm"
                    />
                    <p className="text-[10px] text-gray-500 mt-0.5">Appears as the illustration photo in the Our Journey section of the about page.</p>
                  </div>
                </div>

                {/* Sub-header: Operational Approach Detailed Points */}
                <div className="space-y-4">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[#C65D2E] border-b border-[#1F4A3D]/10 pb-2">
                    Operational Approach Sub-points
                  </h3>
                  <div className="grid grid-cols-1 gap-6">
                    {(approachPoints.length > 0 ? approachPoints : defaultApproachPoints).map((pt, idx) => (
                      <div key={idx} className="p-4 bg-white rounded-xl border border-gray-200 space-y-3">
                        <p className="text-xs font-bold text-[#1F4A3D]">Approach Point #{idx + 1}</p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          <input
                            type="text" required placeholder="Heading (Bangla)"
                            value={pt.title_bn}
                            onChange={(e) => {
                              const copy = [...approachPoints];
                              copy[idx] = { ...copy[idx], title_bn: e.target.value };
                              setApproachPoints(copy);
                            }}
                            className="px-3 py-1.5 border border-gray-200 rounded-lg text-xs"
                          />
                          <input
                            type="text" required placeholder="Heading (English)"
                            value={pt.title_en}
                            onChange={(e) => {
                              const copy = [...approachPoints];
                              copy[idx] = { ...copy[idx], title_en: e.target.value };
                              setApproachPoints(copy);
                            }}
                            className="px-3 py-1.5 border border-gray-200 rounded-lg text-xs"
                          />
                          <select
                            value={pt.icon}
                            onChange={(e) => {
                              const copy = [...approachPoints];
                              copy[idx] = { ...copy[idx], icon: e.target.value };
                              setApproachPoints(copy);
                            }}
                            className="px-3 py-1.5 border border-gray-200 rounded-lg text-xs"
                          >
                            <option value="ShieldCheck">ShieldCheck (Verification)</option>
                            <option value="Users">Users (Committees)</option>
                            <option value="TrendingUp">TrendingUp (Monitoring)</option>
                          </select>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <textarea
                            rows={2} required placeholder="Description (Bangla)"
                            value={pt.desc_bn}
                            onChange={(e) => {
                              const copy = [...approachPoints];
                              copy[idx] = { ...copy[idx], desc_bn: e.target.value };
                              setApproachPoints(copy);
                            }}
                            className="px-3 py-1.5 border border-gray-200 rounded-lg text-xs w-full"
                          />
                          <textarea
                            rows={2} required placeholder="Description (English)"
                            value={pt.desc_en}
                            onChange={(e) => {
                              const copy = [...approachPoints];
                              copy[idx] = { ...copy[idx], desc_en: e.target.value };
                              setApproachPoints(copy);
                            }}
                            className="px-3 py-1.5 border border-gray-200 rounded-lg text-xs w-full"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sub-header: Chairman Message */}
                <div className="space-y-4">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[#C65D2E] border-b border-[#1F4A3D]/10 pb-2">
                    Leadership Message from Chairman
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-[#2B2621]/80">Chairman Name (Bangla)</label>
                      <input
                        type="text" required
                        value={aboutData.chairman_name_bn || ""}
                        onChange={(e) => setAboutData({ ...aboutData, chairman_name_bn: e.target.value })}
                        className="w-full px-4 py-3 bg-white border border-[#1F4A3D]/10 rounded-lg text-sm"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-[#2B2621]/80">Chairman Name (English)</label>
                      <input
                        type="text" required
                        value={aboutData.chairman_name_en || ""}
                        onChange={(e) => setAboutData({ ...aboutData, chairman_name_en: e.target.value })}
                        className="w-full px-4 py-3 bg-white border border-[#1F4A3D]/10 rounded-lg text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-[#2B2621]/80">Chairman Post / Title (Bangla)</label>
                      <input
                        type="text" required
                        value={aboutData.chairman_title_bn || ""}
                        onChange={(e) => setAboutData({ ...aboutData, chairman_title_bn: e.target.value })}
                        className="w-full px-4 py-3 bg-white border border-[#1F4A3D]/10 rounded-lg text-sm"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-[#2B2621]/80">Chairman Post / Title (English)</label>
                      <input
                        type="text" required
                        value={aboutData.chairman_title_en || ""}
                        onChange={(e) => setAboutData({ ...aboutData, chairman_title_en: e.target.value })}
                        className="w-full px-4 py-3 bg-white border border-[#1F4A3D]/10 rounded-lg text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-[#2B2621]/80">Chairman Message (Bangla)</label>
                      <textarea
                        rows={3} required
                        value={aboutData.chairman_message_bn || ""}
                        onChange={(e) => setAboutData({ ...aboutData, chairman_message_bn: e.target.value })}
                        className="w-full px-4 py-3 bg-white border border-[#1F4A3D]/10 rounded-lg text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-[#2B2621]/80">Chairman Message (English)</label>
                      <textarea
                        rows={3} required
                        value={aboutData.chairman_message_en || ""}
                        onChange={(e) => setAboutData({ ...aboutData, chairman_message_en: e.target.value })}
                        className="w-full px-4 py-3 bg-white border border-[#1F4A3D]/10 rounded-lg text-xs"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#2B2621]/80">Chairman Portrait Image URL</label>
                    <input
                      type="url" required
                      value={aboutData.chairman_image_url || ""}
                      onChange={(e) => setAboutData({ ...aboutData, chairman_image_url: e.target.value })}
                      className="w-full px-4 py-3 bg-white border border-[#1F4A3D]/10 rounded-lg text-sm"
                    />
                    <p className="text-[10px] text-gray-500 mt-0.5">Appears as the round avatar picture next to the Chairman's message statement quote block.</p>
                  </div>
                </div>

                {/* Sub-header: Timeline Milestones */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-[#1F4A3D]/10 pb-2">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-[#C65D2E]">
                      Chronological History Timeline
                    </h3>
                    <button
                      type="button"
                      onClick={() => setTimelineItems([...timelineItems, { year: "", year_en: "", title_bn: "", title_en: "", desc_bn: "", desc_en: "" }])}
                      className="text-[#C65D2E] hover:text-[#b04f24] text-xs font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" /> Add Milestone
                    </button>
                  </div>

                  <div className="grid grid-cols-1 gap-6">
                    {timelineItems.map((item, idx) => (
                      <div key={idx} className="p-4 bg-white rounded-xl border border-gray-200 relative space-y-3">
                        <button
                          type="button"
                          onClick={() => setTimelineItems(timelineItems.filter((_, i) => i !== idx))}
                          className="absolute top-3 right-3 text-red-500 hover:text-red-700 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <p className="text-xs font-bold text-[#1F4A3D]">Milestone #{idx + 1}</p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          <input
                            type="text" required placeholder="Year (Bangla) e.g. ২০১৮"
                            value={item.year}
                            onChange={(e) => {
                              const copy = [...timelineItems];
                              copy[idx] = { ...copy[idx], year: e.target.value };
                              setTimelineItems(copy);
                            }}
                            className="px-3 py-1.5 border border-gray-200 rounded-lg text-xs"
                          />
                          <input
                            type="text" required placeholder="Year (English) e.g. 2018"
                            value={item.year_en}
                            onChange={(e) => {
                              const copy = [...timelineItems];
                              copy[idx] = { ...copy[idx], year_en: e.target.value };
                              setTimelineItems(copy);
                            }}
                            className="px-3 py-1.5 border border-gray-200 rounded-lg text-xs"
                          />
                          <input
                            type="text" required placeholder="Title (Bangla)"
                            value={item.title_bn}
                            onChange={(e) => {
                              const copy = [...timelineItems];
                              copy[idx] = { ...copy[idx], title_bn: e.target.value };
                              setTimelineItems(copy);
                            }}
                            className="px-3 py-1.5 border border-gray-200 rounded-lg text-xs md:col-span-2"
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <input
                            type="text" required placeholder="Title (English)"
                            value={item.title_en}
                            onChange={(e) => {
                              const copy = [...timelineItems];
                              copy[idx] = { ...copy[idx], title_en: e.target.value };
                              setTimelineItems(copy);
                            }}
                            className="px-3 py-1.5 border border-gray-200 rounded-lg text-xs"
                          />
                          <textarea
                            rows={2} required placeholder="Description (Bangla)"
                            value={item.desc_bn}
                            onChange={(e) => {
                              const copy = [...timelineItems];
                              copy[idx] = { ...copy[idx], desc_bn: e.target.value };
                              setTimelineItems(copy);
                            }}
                            className="px-3 py-1.5 border border-gray-200 rounded-lg text-xs w-full"
                          />
                        </div>
                        <div>
                          <textarea
                            rows={2} required placeholder="Description (English)"
                            value={item.desc_en}
                            onChange={(e) => {
                              const copy = [...timelineItems];
                              copy[idx] = { ...copy[idx], desc_en: e.target.value };
                              setTimelineItems(copy);
                            }}
                            className="px-3 py-1.5 border border-gray-200 rounded-lg text-xs w-full"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit" disabled={saving}
                    className="bg-[#1F4A3D] text-[#FBF6EE] px-6 py-3 rounded-lg text-xs font-semibold hover:bg-[#15342b] disabled:bg-gray-400 cursor-pointer shadow-sm"
                  >
                    {saving ? "Saving Changes..." : "Save About Us Content"}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* SERVICES PAGE SECTION */}
          {activeSection === "services" && (
            <div className="space-y-12">
              <form onSubmit={saveServices} className="space-y-8">
                
                {/* Visual Sub-header: Services Heading & Intro */}
                <div className="space-y-4">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[#C65D2E] border-b border-[#1F4A3D]/10 pb-2">
                    Services Page Titles & Intro
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-[#2B2621]/80">Heading (Bangla)</label>
                      <input
                        type="text" required
                        value={servicesData.heading_bn || ""}
                        onChange={(e) => setServicesData({ ...servicesData, heading_bn: e.target.value })}
                        className="w-full px-4 py-3 bg-white border border-[#1F4A3D]/10 rounded-lg text-sm"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-[#2B2621]/80">Heading (English)</label>
                      <input
                        type="text" required
                        value={servicesData.heading_en || ""}
                        onChange={(e) => setServicesData({ ...servicesData, heading_en: e.target.value })}
                        className="w-full px-4 py-3 bg-white border border-[#1F4A3D]/10 rounded-lg text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-[#2B2621]/80">Introduction Description (Bangla)</label>
                      <textarea
                        rows={3} required
                        value={servicesData.intro_bn || ""}
                        onChange={(e) => setServicesData({ ...servicesData, intro_bn: e.target.value })}
                        className="w-full px-4 py-3 bg-white border border-[#1F4A3D]/10 rounded-lg text-xs leading-relaxed"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-[#2B2621]/80">Introduction Description (English)</label>
                      <textarea
                        rows={3} required
                        value={servicesData.intro_en || ""}
                        onChange={(e) => setServicesData({ ...servicesData, intro_en: e.target.value })}
                        className="w-full px-4 py-3 bg-white border border-[#1F4A3D]/10 rounded-lg text-xs leading-relaxed"
                      />
                    </div>
                  </div>
                </div>

                {/* Sub-header: Loan Products */}
                <div className="space-y-4">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[#C65D2E] border-b border-[#1F4A3D]/10 pb-2">
                    Loan Products Terms & Policy Settings
                  </h3>
                  
                  {(servicesData.items || []).map((product: any, idx: number) => {
                    const updateProductField = (field: string, value: string) => {
                      const updatedItems = [...(servicesData.items || [])];
                      updatedItems[idx] = { ...updatedItems[idx], [field]: value };
                      setServicesData({ ...servicesData, items: updatedItems });
                    };

                    return (
                      <div key={idx} className="p-6 bg-white rounded-2xl border border-gray-200 space-y-4">
                        <h4 className="text-xs font-bold text-[#1F4A3D] uppercase tracking-wide">
                          Loan Product #{idx + 1}: {tContent(product.title_bn, product.title_en)}
                        </h4>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-gray-500 uppercase">Title (Bangla)</label>
                            <input
                              type="text" required
                              value={product.title_bn || ""}
                              onChange={(e) => updateProductField("title_bn", e.target.value)}
                              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-gray-500 uppercase">Title (English)</label>
                            <input
                              type="text" required
                              value={product.title_en || ""}
                              onChange={(e) => updateProductField("title_en", e.target.value)}
                              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-gray-500 uppercase">Short Subtitle (Bangla)</label>
                            <input
                              type="text" required
                              value={product.short_desc_bn || ""}
                              onChange={(e) => updateProductField("short_desc_bn", e.target.value)}
                              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-gray-500 uppercase">Short Subtitle (English)</label>
                            <input
                              type="text" required
                              value={product.short_desc_en || ""}
                              onChange={(e) => updateProductField("short_desc_en", e.target.value)}
                              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-gray-500 uppercase">Full Description (Bangla)</label>
                            <textarea
                              rows={3} required
                              value={product.full_desc_bn || ""}
                              onChange={(e) => updateProductField("full_desc_bn", e.target.value)}
                              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-gray-500 uppercase">Full Description (English)</label>
                            <textarea
                              rows={3} required
                              value={product.full_desc_en || ""}
                              onChange={(e) => updateProductField("full_desc_en", e.target.value)}
                              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-gray-500 uppercase">Loan Range Limit (Bangla)</label>
                            <textarea
                              rows={2} required
                              value={product.loan_range_bn || ""}
                              onChange={(e) => updateProductField("loan_range_bn", e.target.value)}
                              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-gray-500 uppercase">Loan Range Limit (English)</label>
                            <textarea
                              rows={2} required
                              value={product.loan_range_en || ""}
                              onChange={(e) => updateProductField("loan_range_en", e.target.value)}
                              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-gray-500 uppercase">Tenure & Repayment Policy (Bangla)</label>
                            <textarea
                              rows={2} required
                              value={product.tenure_bn || ""}
                              onChange={(e) => updateProductField("tenure_bn", e.target.value)}
                              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-gray-500 uppercase">Tenure & Repayment Policy (English)</label>
                            <textarea
                              rows={2} required
                              value={product.tenure_en || ""}
                              onChange={(e) => updateProductField("tenure_en", e.target.value)}
                              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs"
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Sub-header: Shared Benefits */}
                <div className="space-y-4">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[#C65D2E] border-b border-[#1F4A3D]/10 pb-2">
                    Shared Benefits Grid
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-[#2B2621]/80">Shared Benefits Title (Bangla)</label>
                      <input
                        type="text" required
                        value={servicesData.shared_benefits_heading_bn || ""}
                        onChange={(e) => setServicesData({ ...servicesData, shared_benefits_heading_bn: e.target.value })}
                        className="w-full px-4 py-3 bg-white border border-[#1F4A3D]/10 rounded-lg text-sm"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-[#2B2621]/80">Shared Benefits Title (English)</label>
                      <input
                        type="text" required
                        value={servicesData.shared_benefits_heading_en || ""}
                        onChange={(e) => setServicesData({ ...servicesData, shared_benefits_heading_en: e.target.value })}
                        className="w-full px-4 py-3 bg-white border border-[#1F4A3D]/10 rounded-lg text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-6">
                    {(servicesData.shared_benefits || []).map((benefit: any, idx: number) => {
                      const updateBenefitField = (field: string, value: string) => {
                        const updatedBenefits = [...(servicesData.shared_benefits || [])];
                        updatedBenefits[idx] = { ...updatedBenefits[idx], [field]: value };
                        setServicesData({ ...servicesData, shared_benefits: updatedBenefits });
                      };

                      return (
                        <div key={idx} className="p-4 bg-white rounded-xl border border-gray-200 space-y-3">
                          <p className="text-xs font-bold text-[#1F4A3D]">Benefit Card #{idx + 1}</p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <input
                              type="text" required placeholder="Benefit Title (Bangla)"
                              value={benefit.title_bn || ""}
                              onChange={(e) => updateBenefitField("title_bn", e.target.value)}
                              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs"
                            />
                            <input
                              type="text" required placeholder="Benefit Title (English)"
                              value={benefit.title_en || ""}
                              onChange={(e) => updateBenefitField("title_en", e.target.value)}
                              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs"
                            />
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <textarea
                              rows={2} required placeholder="Benefit Description (Bangla)"
                              value={benefit.desc_bn || ""}
                              onChange={(e) => updateBenefitField("desc_bn", e.target.value)}
                              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs font-mono"
                            />
                            <textarea
                              rows={2} required placeholder="Benefit Description (English)"
                              value={benefit.desc_en || ""}
                              onChange={(e) => updateBenefitField("desc_en", e.target.value)}
                              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs font-mono"
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Sub-header: Eligibility General Checklist */}
                <div className="space-y-4">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[#C65D2E] border-b border-[#1F4A3D]/10 pb-2">
                    General Eligibility Checklist
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-[#2B2621]/80">Eligibility Title (Bangla)</label>
                      <input
                        type="text" required
                        value={servicesData.eligibility_heading_bn || ""}
                        onChange={(e) => setServicesData({ ...servicesData, eligibility_heading_bn: e.target.value })}
                        className="w-full px-4 py-3 bg-white border border-[#1F4A3D]/10 rounded-lg text-sm"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-[#2B2621]/80">Eligibility Title (English)</label>
                      <input
                        type="text" required
                        value={servicesData.eligibility_heading_en || ""}
                        onChange={(e) => setServicesData({ ...servicesData, eligibility_heading_en: e.target.value })}
                        className="w-full px-4 py-3 bg-white border border-[#1F4A3D]/10 rounded-lg text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-[#2B2621]/80">Checklist Bullets (Bangla)</label>
                      <textarea
                        rows={6}
                        value={eligibilityPoints.bn}
                        onChange={(e) => setEligibilityPoints({ ...eligibilityPoints, bn: e.target.value })}
                        className="w-full px-4 py-3 bg-white border border-[#1F4A3D]/10 rounded-lg text-xs font-mono"
                      />
                      <p className="text-[10px] text-gray-500 mt-0.5">প্রতি লাইনে ১টি করে বুলেটের শর্ত লিখুন (বাংলা)।</p>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-[#2B2621]/80">Checklist Bullets (English)</label>
                      <textarea
                        rows={6}
                        value={eligibilityPoints.en}
                        onChange={(e) => setEligibilityPoints({ ...eligibilityPoints, en: e.target.value })}
                        className="w-full px-4 py-3 bg-white border border-[#1F4A3D]/10 rounded-lg text-xs font-mono"
                      />
                      <p className="text-[10px] text-gray-500 mt-0.5">Enter one point per line for english conditions.</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit" disabled={saving}
                    className="bg-[#1F4A3D] text-[#FBF6EE] px-6 py-3 rounded-lg text-xs font-semibold hover:bg-[#15342b] disabled:bg-gray-400 cursor-pointer shadow-sm"
                  >
                    {saving ? "Saving Changes..." : "Save Services Content"}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* 3. TEAM PAGE SECTION */}
          {activeSection === "team" && (
            <div className="space-y-12">
              
              {/* Heading settings form */}
              <form onSubmit={saveTeamLanding} className="bg-white p-6 rounded-2xl border border-[#1F4A3D]/10 space-y-6">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#C65D2E] border-b border-[#1F4A3D]/10 pb-2">
                  Team Landing Copy
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#2B2621]/80">Title (Bangla)</label>
                    <input
                      type="text" required
                      value={teamContent.title_bn || ""}
                      onChange={(e) => setTeamContent({ ...teamContent, title_bn: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#2B2621]/80">Title (English)</label>
                    <input
                      type="text" required
                      value={teamContent.title_en || ""}
                      onChange={(e) => setTeamContent({ ...teamContent, title_en: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#2B2621]/80">Heading (Bangla)</label>
                    <input
                      type="text" required
                      value={teamContent.heading_bn || ""}
                      onChange={(e) => setTeamContent({ ...teamContent, heading_bn: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#2B2621]/80">Heading (English)</label>
                    <input
                      type="text" required
                      value={teamContent.heading_en || ""}
                      onChange={(e) => setTeamContent({ ...teamContent, heading_en: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#2B2621]/80">Introduction (Bangla)</label>
                    <textarea
                      rows={2} required
                      value={teamContent.intro_bn || ""}
                      onChange={(e) => setTeamContent({ ...teamContent, intro_bn: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#2B2621]/80">Introduction (English)</label>
                    <textarea
                      rows={2} required
                      value={teamContent.intro_en || ""}
                      onChange={(e) => setTeamContent({ ...teamContent, intro_en: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#2B2621]/80">Team Page Banner Image URL</label>
                  <input
                    type="url" required
                    value={teamContent.banner_image_url || ""}
                    onChange={(e) => setTeamContent({ ...teamContent, banner_image_url: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs"
                  />
                  <p className="text-[10px] text-gray-500 mt-0.5">Appears as the header banner image above the team grid on the live site.</p>
                </div>

                <button type="submit" disabled={saving} className="bg-[#1F4A3D] text-white px-5 py-2.5 rounded-lg text-xs font-semibold hover:bg-[#15342b] cursor-pointer">
                  Save Landing Heading
                </button>
              </form>

              {/* Grid CRUD */}
              <div className="space-y-6 pt-4 border-t border-[#1F4A3D]/10">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#C65D2E]">
                  Roster: Executives & Board Members Grid
                </h3>
                
                <form onSubmit={saveTeamMember} className="bg-white p-6 rounded-2xl border border-[#1F4A3D]/10 space-y-4">
                  <h4 className="text-xs font-bold text-[#1F4A3D]">{activeTeamMember.id ? "Edit Team Member" : "Add Team Member"}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text" required placeholder="Name (Bangla)"
                      value={activeTeamMember.name_bn || ""}
                      onChange={(e) => setActiveTeamMember({ ...activeTeamMember, name_bn: e.target.value })}
                      className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs"
                    />
                    <input
                      type="text" required placeholder="Name (English)"
                      value={activeTeamMember.name_en || ""}
                      onChange={(e) => setActiveTeamMember({ ...activeTeamMember, name_en: e.target.value })}
                      className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input
                      type="text" required placeholder="Role (Bangla) e.g. সভাপতি"
                      value={activeTeamMember.role_bn || ""}
                      onChange={(e) => setActiveTeamMember({ ...activeTeamMember, role_bn: e.target.value })}
                      className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs"
                    />
                    <input
                      type="text" required placeholder="Role (English)"
                      value={activeTeamMember.role_en || ""}
                      onChange={(e) => setActiveTeamMember({ ...activeTeamMember, role_en: e.target.value })}
                      className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs"
                    />
                    <input
                      type="number" required placeholder="Order"
                      value={activeTeamMember.order ?? 1}
                      onChange={(e) => setActiveTeamMember({ ...activeTeamMember, order: Number(e.target.value) })}
                      className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs"
                    />
                  </div>
                  <input
                    type="url" required placeholder="Photo Image URL"
                    value={activeTeamMember.imageUrl || ""}
                    onChange={(e) => setActiveTeamMember({ ...activeTeamMember, imageUrl: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs"
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="url" placeholder="Facebook URL (Optional)"
                      value={activeTeamMember.facebook || ""}
                      onChange={(e) => setActiveTeamMember({ ...activeTeamMember, facebook: e.target.value })}
                      className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs"
                    />
                    <input
                      type="url" placeholder="LinkedIn URL (Optional)"
                      value={activeTeamMember.linkedin || ""}
                      onChange={(e) => setActiveTeamMember({ ...activeTeamMember, linkedin: e.target.value })}
                      className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <textarea
                      rows={3} placeholder="Biography (Bangla)"
                      value={activeTeamMember.bio_bn || ""}
                      onChange={(e) => setActiveTeamMember({ ...activeTeamMember, bio_bn: e.target.value })}
                      className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs w-full"
                    />
                    <textarea
                      rows={3} placeholder="Biography (English)"
                      value={activeTeamMember.bio_en || ""}
                      onChange={(e) => setActiveTeamMember({ ...activeTeamMember, bio_en: e.target.value })}
                      className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs w-full"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button type="submit" disabled={saving} className="bg-[#1F4A3D] text-white px-4 py-2 rounded-lg text-xs font-semibold hover:bg-[#15342b] cursor-pointer">
                      Save Member
                    </button>
                    <button type="button" onClick={() => setActiveTeamMember({ id: "", name_bn: "", name_en: "", role_bn: "", role_en: "", imageUrl: "", order: 1, facebook: "", linkedin: "", bio_bn: "", bio_en: "" })} className="border border-gray-200 text-gray-700 px-4 py-2 rounded-lg text-xs hover:bg-gray-50 cursor-pointer">
                      Clear Form
                    </button>
                  </div>
                </form>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {teamList.map((m) => (
                    <div key={m.id} className="p-4 bg-white border border-gray-200 rounded-xl flex items-center justify-between shadow-xs">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#1F4A3D]/5 flex items-center justify-center font-bold text-[#1F4A3D] overflow-hidden shrink-0">
                          {m.imageUrl ? <img src={m.imageUrl} alt="" className="w-full h-full object-cover" /> : m.name_en.charAt(0)}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-[#1F4A3D]">{tContent(m.name_bn, m.name_en)}</p>
                          <p className="text-[10px] text-gray-500 font-light">{tContent(m.role_bn, m.role_en)}</p>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <button onClick={() => setActiveTeamMember(m)} className="text-[#C65D2E] hover:bg-[#C65D2E]/5 p-2 rounded-md transition-colors"><Edit className="w-3.5 h-3.5" /></button>
                        <button onClick={() => deleteTeamMember(m.id)} className="text-red-500 hover:bg-red-50 p-2 rounded-md transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* 4. BLOG PAGE SECTION */}
          {activeSection === "blog" && (
            <div className="space-y-12">
              
              {/* Heading settings form */}
              <form onSubmit={saveBlogLanding} className="bg-white p-6 rounded-2xl border border-[#1F4A3D]/10 space-y-6">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#C65D2E] border-b border-[#1F4A3D]/10 pb-2">
                  Blog Page Intros
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#2B2621]/80">Title (Bangla)</label>
                    <input
                      type="text" required
                      value={blogContent.title_bn || ""}
                      onChange={(e) => setBlogContent({ ...blogContent, title_bn: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#2B2621]/80">Title (English)</label>
                    <input
                      type="text" required
                      value={blogContent.title_en || ""}
                      onChange={(e) => setBlogContent({ ...blogContent, title_en: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#2B2621]/80">Heading (Bangla)</label>
                    <input
                      type="text" required
                      value={blogContent.heading_bn || ""}
                      onChange={(e) => setBlogContent({ ...blogContent, heading_bn: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#2B2621]/80">Heading (English)</label>
                    <input
                      type="text" required
                      value={blogContent.heading_en || ""}
                      onChange={(e) => setBlogContent({ ...blogContent, heading_en: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#2B2621]/80">Introduction (Bangla)</label>
                    <textarea
                      rows={2} required
                      value={blogContent.intro_bn || ""}
                      onChange={(e) => setBlogContent({ ...blogContent, intro_bn: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#2B2621]/80">Introduction (English)</label>
                    <textarea
                      rows={2} required
                      value={blogContent.intro_en || ""}
                      onChange={(e) => setBlogContent({ ...blogContent, intro_en: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#2B2621]/80">Blog Page Banner Image URL</label>
                  <input
                    type="url" required
                    value={blogContent.banner_image_url || ""}
                    onChange={(e) => setBlogContent({ ...blogContent, banner_image_url: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs"
                  />
                  <p className="text-[10px] text-gray-500 mt-0.5">Appears as the header banner image above the blog listing intro on the live site.</p>
                </div>

                <button type="submit" disabled={saving} className="bg-[#1F4A3D] text-white px-5 py-2.5 rounded-lg text-xs font-semibold hover:bg-[#15342b] cursor-pointer">
                  Save Landing Heading
                </button>
              </form>

              {/* Posts CRUD */}
              <div className="space-y-6 pt-4 border-t border-[#1F4A3D]/10">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#C65D2E]">
                  Articles: Blog Post Listings & Editor
                </h3>
                
                <form onSubmit={saveBlog} className="bg-white p-6 rounded-2xl border border-[#1F4A3D]/10 space-y-4">
                  <h4 className="text-xs font-bold text-[#1F4A3D]">{activeBlog.id ? "Edit Blog Article" : "Write Blog Article"}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text" required placeholder="Title (Bangla)"
                      value={activeBlog.title_bn || ""}
                      onChange={(e) => setActiveBlog({ ...activeBlog, title_bn: e.target.value })}
                      className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs"
                    />
                    <input
                      type="text" required placeholder="Title (English)"
                      value={activeBlog.title_en || ""}
                      onChange={(e) => setActiveBlog({ ...activeBlog, title_en: e.target.value })}
                      className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input
                      type="text" placeholder="Slug (optional)"
                      value={activeBlog.slug || ""}
                      onChange={(e) => setActiveBlog({ ...activeBlog, slug: e.target.value })}
                      className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs"
                    />
                    <input
                      type="text" placeholder="Author"
                      value={activeBlog.author || "Onkur Foundation"}
                      onChange={(e) => setActiveBlog({ ...activeBlog, author: e.target.value })}
                      className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs"
                    />
                    <select
                      value={activeBlog.category || "News"}
                      onChange={(e) => setActiveBlog({ ...activeBlog, category: e.target.value })}
                      className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs"
                    >
                      <option value="Success Story">Success Story</option>
                      <option value="News">News / Update</option>
                      <option value="Financial Literacy">Financial Literacy</option>
                      <option value="Community">Community</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="url" required placeholder="Cover Image URL"
                      value={activeBlog.coverImageUrl || ""}
                      onChange={(e) => setActiveBlog({ ...activeBlog, coverImageUrl: e.target.value })}
                      className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs"
                    />
                    <input
                      type="datetime-local" required
                      value={(() => {
                        if (!activeBlog.publishedAt) return "";
                        try {
                          const d = new Date(activeBlog.publishedAt);
                          if (isNaN(d.getTime())) return "";
                          return d.toISOString().slice(0, 16);
                        } catch (e) { return ""; }
                      })()}
                      onChange={(e) => setActiveBlog({ ...activeBlog, publishedAt: e.target.value ? new Date(e.target.value).toISOString() : "" })}
                      className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <textarea
                      rows={3} required placeholder="Excerpt Summary (Bangla)"
                      value={activeBlog.excerpt_bn || ""}
                      onChange={(e) => setActiveBlog({ ...activeBlog, excerpt_bn: e.target.value })}
                      className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs w-full"
                    />
                    <textarea
                      rows={3} required placeholder="Excerpt Summary (English)"
                      value={activeBlog.excerpt_en || ""}
                      onChange={(e) => setActiveBlog({ ...activeBlog, excerpt_en: e.target.value })}
                      className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs w-full"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <textarea
                      rows={6} required placeholder="Full Body Content (Bangla)"
                      value={activeBlog.content_bn || ""}
                      onChange={(e) => setActiveBlog({ ...activeBlog, content_bn: e.target.value })}
                      className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs w-full font-mono"
                    />
                    <textarea
                      rows={6} required placeholder="Full Body Content (English)"
                      value={activeBlog.content_en || ""}
                      onChange={(e) => setActiveBlog({ ...activeBlog, content_en: e.target.value })}
                      className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs w-full font-mono"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button type="submit" disabled={saving} className="bg-[#1F4A3D] text-white px-4 py-2 rounded-lg text-xs font-semibold hover:bg-[#15342b] cursor-pointer">
                      Save Article
                    </button>
                    <button type="button" onClick={() => setActiveBlog({ id: "", title_bn: "", title_en: "", excerpt_bn: "", excerpt_en: "", content_bn: "", content_en: "", coverImageUrl: "", slug: "", publishedAt: "", author: "", category: "News" })} className="border border-gray-200 text-gray-700 px-4 py-2 rounded-lg text-xs hover:bg-gray-50 cursor-pointer">
                      Clear Form
                    </button>
                  </div>
                </form>

                <div className="space-y-4 pt-4">
                  {blogList.map((post) => (
                    <div key={post.id} className="p-4 bg-white border border-gray-200 rounded-xl flex items-center justify-between shadow-xs">
                      <div className="flex items-center gap-3">
                        {post.coverImageUrl && <img src={post.coverImageUrl} alt="" className="w-16 h-10 object-cover rounded-md shrink-0 bg-gray-100" />}
                        <div>
                          <div className="flex items-center gap-1.5">
                            <p className="text-xs font-bold text-[#1F4A3D]">{tContent(post.title_bn, post.title_en)}</p>
                            {post.category && <span className="bg-gray-100 text-[8px] font-bold px-1.5 py-0.5 rounded text-gray-600 uppercase">{post.category}</span>}
                          </div>
                          <p className="text-[9px] text-gray-500 font-light mt-0.5">{new Date(post.publishedAt).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <button onClick={() => setActiveBlog(post)} className="text-[#C65D2E] hover:bg-[#C65D2E]/5 p-2 rounded-md transition-colors"><Edit className="w-3.5 h-3.5" /></button>
                        <button onClick={() => deleteBlog(post.id)} className="text-red-500 hover:bg-red-50 p-2 rounded-md transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* 5. CAREER & JOBS PAGE SECTION (NEW) */}
          {activeSection === "career" && (
            <div className="space-y-8">
              
              {/* Career Banner Editor Form */}
              <form onSubmit={saveCareerContent} className="bg-white p-6 rounded-2xl border border-[#1F4A3D]/10 space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#C65D2E] border-b border-[#1F4A3D]/10 pb-2">
                  Careers Page Banner Image
                </h3>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#2B2621]/80">Careers Banner Image URL</label>
                  <input
                    type="url" required
                    value={careerContent?.banner_image_url || ""}
                    onChange={(e) => setCareerContent({ ...careerContent, banner_image_url: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs"
                  />
                  <p className="text-[10px] text-gray-500 mt-0.5">Appears as the large header banner image at the top of the Careers page.</p>
                </div>
                <button type="submit" disabled={saving} className="bg-[#1F4A3D] text-white px-5 py-2.5 rounded-lg text-xs font-semibold hover:bg-[#15342b] cursor-pointer">
                  Save Banner Image
                </button>
              </form>

              {/* Inner Sub-tabs */}
              <div className="flex border-b border-gray-200">
                <button
                  onClick={() => setCareerSubTab("postings")}
                  className={`px-6 py-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
                    careerSubTab === "postings"
                      ? "border-[#C65D2E] text-[#1F4A3D]"
                      : "border-transparent text-gray-400 hover:text-gray-600"
                  }`}
                >
                  Job Postings CRUD
                </button>
                <button
                  onClick={() => setCareerSubTab("applications")}
                  className={`px-6 py-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
                    careerSubTab === "applications"
                      ? "border-[#C65D2E] text-[#1F4A3D]"
                      : "border-transparent text-gray-400 hover:text-gray-600"
                  }`}
                >
                  Applications Received ({applicationsList.length})
                </button>
              </div>

              {careerSubTab === "postings" && (
                <div className="space-y-8 animate-fadeIn">
                  
                  {/* Job Add/Edit Form */}
                  <form onSubmit={saveJob} className="bg-white p-6 rounded-2xl border border-[#1F4A3D]/10 space-y-4">
                    <h4 className="text-xs font-bold text-[#1F4A3D]">{activeJob.id ? "Edit Job Posting" : "Add Job Posting"}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text" required placeholder="Job Title (Bangla)"
                        value={activeJob.title_bn || ""}
                        onChange={(e) => setActiveJob({ ...activeJob, title_bn: e.target.value })}
                        className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs"
                      />
                      <input
                        type="text" required placeholder="Job Title (English)"
                        value={activeJob.title_en || ""}
                        onChange={(e) => setActiveJob({ ...activeJob, title_en: e.target.value })}
                        className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <input
                        type="text" required placeholder="Department (Bangla)"
                        value={activeJob.department_bn || ""}
                        onChange={(e) => setActiveJob({ ...activeJob, department_bn: e.target.value })}
                        className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs"
                      />
                      <input
                        type="text" required placeholder="Department (English)"
                        value={activeJob.department_en || ""}
                        onChange={(e) => setActiveJob({ ...activeJob, department_en: e.target.value })}
                        className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs"
                      />
                      <input
                        type="text" required placeholder="Location (Bangla)"
                        value={activeJob.location_bn || ""}
                        onChange={(e) => setActiveJob({ ...activeJob, location_bn: e.target.value })}
                        className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs"
                      />
                      <input
                        type="text" required placeholder="Location (English)"
                        value={activeJob.location_en || ""}
                        onChange={(e) => setActiveJob({ ...activeJob, location_en: e.target.value })}
                        className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <input
                        type="text" required placeholder="Job Type (Bangla) e.g. পূর্ণকালীন"
                        value={activeJob.type_bn || ""}
                        onChange={(e) => setActiveJob({ ...activeJob, type_bn: e.target.value })}
                        className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs"
                      />
                      <input
                        type="text" required placeholder="Job Type (English) e.g. Full-time"
                        value={activeJob.type_en || ""}
                        onChange={(e) => setActiveJob({ ...activeJob, type_en: e.target.value })}
                        className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs"
                      />
                      <input
                        type="date" required
                        value={activeJob.deadline || ""}
                        onChange={(e) => setActiveJob({ ...activeJob, deadline: e.target.value })}
                        className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <textarea
                        rows={3} required placeholder="Description (Bangla)"
                        value={activeJob.description_bn || ""}
                        onChange={(e) => setActiveJob({ ...activeJob, description_bn: e.target.value })}
                        className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs w-full"
                      />
                      <textarea
                        rows={3} required placeholder="Description (English)"
                        value={activeJob.description_en || ""}
                        onChange={(e) => setActiveJob({ ...activeJob, description_en: e.target.value })}
                        className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs w-full"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <textarea
                        rows={3} required placeholder="Requirements (Bangla)"
                        value={activeJob.requirements_bn || ""}
                        onChange={(e) => setActiveJob({ ...activeJob, requirements_bn: e.target.value })}
                        className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs w-full"
                      />
                      <textarea
                        rows={3} required placeholder="Requirements (English)"
                        value={activeJob.requirements_en || ""}
                        onChange={(e) => setActiveJob({ ...activeJob, requirements_en: e.target.value })}
                        className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs w-full"
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        id="jobActive" type="checkbox"
                        checked={activeJob.isActive}
                        onChange={(e) => setActiveJob({ ...activeJob, isActive: e.target.checked })}
                        className="rounded text-[#1F4A3D] focus:ring-[#1F4A3D]"
                      />
                      <label htmlFor="jobActive" className="text-xs font-semibold text-[#2B2621]/80 select-none">Show Posting Publicly</label>
                    </div>

                    <div className="flex gap-2">
                      <button type="submit" disabled={saving} className="bg-[#1F4A3D] text-white px-4 py-2 rounded-lg text-xs font-semibold hover:bg-[#15342b] cursor-pointer">
                        Save Job
                      </button>
                      <button type="button" onClick={() => setActiveJob({ id: "", title_bn: "", title_en: "", department_bn: "", department_en: "", location_bn: "", location_en: "", type_bn: "", type_en: "Full-time", deadline: "", description_bn: "", description_en: "", requirements_bn: "", requirements_en: "", isActive: true })} className="border border-gray-200 text-gray-700 px-4 py-2 rounded-lg text-xs hover:bg-gray-50 cursor-pointer">
                        Clear Form
                      </button>
                    </div>
                  </form>

                  {/* Listings Table */}
                  <div className="space-y-4 pt-4 border-t border-gray-200">
                    <h4 className="text-xs font-bold text-[#1F4A3D] uppercase tracking-wider">Current Postings</h4>
                    <div className="grid grid-cols-1 gap-4">
                      {jobsList.map((job) => (
                        <div key={job.id} className="p-4 bg-white border border-gray-200 rounded-xl flex items-center justify-between shadow-xs">
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="text-xs font-bold text-[#1F4A3D]">{tContent(job.title_bn, job.title_en)}</p>
                              <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded uppercase ${job.isActive ? "bg-green-50 text-green-700" : "bg-red-50 text-red-600"}`}>
                                {job.isActive ? "Active" : "Inactive"}
                              </span>
                            </div>
                            <p className="text-[9px] text-gray-500 font-light mt-0.5">
                              {tContent(job.department_bn, job.department_en)} • Deadline: {job.deadline ? new Date(job.deadline).toLocaleDateString() : "N/A"}
                            </p>
                          </div>
                          <div className="flex gap-1">
                            <button onClick={() => setActiveJob(job)} className="text-[#C65D2E] hover:bg-[#C65D2E]/5 p-2 rounded-md transition-colors"><Edit className="w-3.5 h-3.5" /></button>
                            <button onClick={() => deleteJob(job.id)} className="text-red-500 hover:bg-red-50 p-2 rounded-md transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              )}

              {careerSubTab === "applications" && (
                <div className="space-y-6 animate-fadeIn">
                  <h4 className="text-xs font-bold text-[#1F4A3D] uppercase tracking-wider">Submitted Applications (Sorted by Date)</h4>
                  
                  {applicationsList.length === 0 ? (
                    <div className="text-center py-12 text-gray-400 font-light text-sm">
                      No applications received yet.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-4">
                      {applicationsList.map((app) => {
                        const isExpanded = viewingApp?.id === app.id;
                        return (
                          <div key={app.id} className="bg-white border border-gray-200 rounded-xl shadow-xs overflow-hidden">
                            <div 
                              onClick={() => setViewingApp(isExpanded ? null : app)}
                              className="p-4 flex items-center justify-between gap-4 cursor-pointer select-none hover:bg-gray-50"
                            >
                              <div className="space-y-1">
                                <p className="text-xs font-bold text-[#1F4A3D]">{app.fullName}</p>
                                <p className="text-[10px] text-gray-500 font-light">
                                  Applied for: <span className="font-semibold text-gray-700">{tContent(app.jobTitle_bn, app.jobTitle_en)}</span> • Phone: {app.phone}
                                </p>
                              </div>
                              <div className="flex items-center gap-3">
                                <span className="text-[9px] text-gray-400">{new Date(app.submittedAt).toLocaleDateString()}</span>
                                <button className="text-xs text-[#C65D2E] hover:underline cursor-pointer">
                                  {isExpanded ? "Hide Details" : "View Resume"}
                                </button>
                              </div>
                            </div>

                            {isExpanded && (
                              <div className="p-6 bg-gray-50 border-t border-gray-100 space-y-6 text-xs text-gray-700">
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-b border-gray-200 pb-4">
                                  <p><strong>Email:</strong> {app.email}</p>
                                  <p><strong>Phone:</strong> {app.phone}</p>
                                  <p><strong>Present Address:</strong> {app.address}</p>
                                </div>

                                <div className="space-y-2">
                                  <p className="font-bold text-sm text-[#1F4A3D]">Education Background</p>
                                  <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                                    <table className="w-full text-left border-collapse">
                                      <thead>
                                        <tr className="bg-[#1F4A3D]/5 text-[10px] uppercase font-bold text-[#1F4A3D] border-b border-gray-200">
                                          <th className="p-3">Degree</th>
                                          <th className="p-3">Institution</th>
                                          <th className="p-3">Passing Year</th>
                                          <th className="p-3">Result</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {(app.education || []).map((ed: any, i: number) => (
                                          <tr key={i} className="border-b border-gray-100 last:border-0 text-[11px]">
                                            <td className="p-3 font-semibold">{ed.degree}</td>
                                            <td className="p-3">{ed.institution}</td>
                                            <td className="p-3">{ed.year}</td>
                                            <td className="p-3">{ed.result}</td>
                                          </tr>
                                        ))}
                                      </tbody>
                                    </table>
                                  </div>
                                </div>

                                <div className="space-y-2">
                                  <p className="font-bold text-sm text-[#1F4A3D]">Work Experience</p>
                                  {app.isFirstJob ? (
                                    <p className="text-gray-500 font-light italic">Applicant's first job (no prior experience entries).</p>
                                  ) : (
                                    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                                      <table className="w-full text-left border-collapse">
                                        <thead>
                                          <tr className="bg-[#1F4A3D]/5 text-[10px] uppercase font-bold text-[#1F4A3D] border-b border-gray-200">
                                            <th className="p-3">Organization</th>
                                            <th className="p-3">Role</th>
                                            <th className="p-3">Duration</th>
                                            <th className="p-3">Responsibilities</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {(app.experience || []).map((exp: any, i: number) => (
                                            <tr key={i} className="border-b border-gray-100 last:border-0 text-[11px]">
                                              <td className="p-3 font-semibold">{exp.organization}</td>
                                              <td className="p-3">{exp.position}</td>
                                              <td className="p-3">{exp.duration}</td>
                                              <td className="p-3">{exp.responsibilities}</td>
                                            </tr>
                                          ))}
                                        </tbody>
                                      </table>
                                    </div>
                                  )}
                                </div>

                                {app.cvLink && (
                                  <div className="bg-[#1F4A3D]/5 p-3 rounded-lg flex items-center justify-between border border-[#1F4A3D]/10">
                                    <div className="flex items-center gap-2">
                                      <Link2 className="w-4 h-4 text-[#C65D2E]" />
                                      <span className="font-semibold text-[#1F4A3D]">External CV / Portfolio Link:</span>
                                    </div>
                                    <a 
                                      href={app.cvLink} 
                                      target="_blank" 
                                      rel="noreferrer" 
                                      className="text-[#C65D2E] hover:underline font-bold"
                                    >
                                      Open CV Link &rarr;
                                    </a>
                                  </div>
                                )}

                                <div className="space-y-2">
                                  <p className="font-bold text-sm text-[#1F4A3D]">Cover Letter / Statement of Purpose</p>
                                  <p className="p-4 bg-white border border-gray-200 rounded-lg whitespace-pre-wrap leading-relaxed">
                                    {app.coverLetter}
                                  </p>
                                </div>
                              </div>
                            )}

                          </div>
                        );
                      })}
                    </div>
                  )}

                </div>
              )}

            </div>
          )}

          {/* 6. CONTACT PAGE SECTION */}
          {activeSection === "contact" && (
            <div className="space-y-12">
              <form onSubmit={saveContactLanding} className="space-y-8">
                
                <div className="space-y-4 bg-white p-6 rounded-2xl border border-[#1F4A3D]/10">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[#C65D2E] border-b border-gray-200 pb-2">
                    Contact Header Copy
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-[#2B2621]/80">Heading (Bangla)</label>
                      <input
                        type="text" required
                        value={contactContent.heading_bn || ""}
                        onChange={(e) => setContactContent({ ...contactContent, heading_bn: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-[#2B2621]/80">Heading (English)</label>
                      <input
                        type="text" required
                        value={contactContent.heading_en || ""}
                        onChange={(e) => setContactContent({ ...contactContent, heading_en: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-[#2B2621]/80">Subtitle / Description (Bangla)</label>
                      <textarea
                        rows={2} required
                        value={contactContent.body_bn || ""}
                        onChange={(e) => setContactContent({ ...contactContent, body_bn: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-[#2B2621]/80">Subtitle / Description (English)</label>
                      <textarea
                        rows={2} required
                        value={contactContent.body_en || ""}
                        onChange={(e) => setContactContent({ ...contactContent, body_en: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#2B2621]/80">Contact Page Banner Image URL</label>
                    <input
                      type="url" required
                      value={contactContent.banner_image_url || ""}
                      onChange={(e) => setContactContent({ ...contactContent, banner_image_url: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs"
                    />
                    <p className="text-[10px] text-gray-500 mt-0.5">Appears as the large header banner image at the top of the Contact page.</p>
                  </div>
                </div>

                <div className="space-y-4 bg-white p-6 rounded-2xl border border-[#1F4A3D]/10">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[#C65D2E] border-b border-gray-200 pb-2">
                    Office Timings
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-[#2B2621]/80">Hours (Bangla)</label>
                      <input
                        type="text" required
                        value={contactContent.hours_bn || ""}
                        onChange={(e) => setContactContent({ ...contactContent, hours_bn: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-[#2B2621]/80">Hours (English)</label>
                      <input
                        type="text" required
                        value={contactContent.hours_en || ""}
                        onChange={(e) => setContactContent({ ...contactContent, hours_en: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs"
                      />
                    </div>
                  </div>
                </div>

                {/* Department Contacts repeatable list */}
                <div className="space-y-4 bg-white p-6 rounded-2xl border border-[#1F4A3D]/10">
                  <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-[#C65D2E]">
                      Department-Specific Contact Information
                    </h3>
                    <button
                      type="button"
                      onClick={() => setContactDepts([...contactDepts, { name_bn: "", name_en: "", phone: "", email: "" }])}
                      className="text-[#C65D2E] hover:text-[#b04f24] text-xs font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" /> Add Contact Point
                    </button>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    {contactDepts.map((dept, idx) => (
                      <div key={idx} className="p-4 bg-gray-50 rounded-xl relative border border-gray-200 space-y-3">
                        <button
                          type="button"
                          onClick={() => setContactDepts(contactDepts.filter((_, i) => i !== idx))}
                          className="absolute top-3 right-3 text-red-500 hover:text-red-700 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <p className="text-xs font-bold text-[#1F4A3D]">Department #{idx + 1}</p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          <input
                            type="text" required placeholder="Dept Name (Bangla)"
                            value={dept.name_bn}
                            onChange={(e) => {
                              const copy = [...contactDepts];
                              copy[idx] = { ...copy[idx], name_bn: e.target.value };
                              setContactDepts(copy);
                            }}
                            className="px-3 py-1.5 border border-gray-200 rounded-lg text-xs"
                          />
                          <input
                            type="text" required placeholder="Dept Name (English)"
                            value={dept.name_en}
                            onChange={(e) => {
                              const copy = [...contactDepts];
                              copy[idx] = { ...copy[idx], name_en: e.target.value };
                              setContactDepts(copy);
                            }}
                            className="px-3 py-1.5 border border-gray-200 rounded-lg text-xs"
                          />
                          <input
                            type="text" required placeholder="Phone"
                            value={dept.phone}
                            onChange={(e) => {
                              const copy = [...contactDepts];
                              copy[idx] = { ...copy[idx], phone: e.target.value };
                              setContactDepts(copy);
                            }}
                            className="px-3 py-1.5 border border-gray-200 rounded-lg text-xs"
                          />
                          <input
                            type="email" required placeholder="Email"
                            value={dept.email}
                            onChange={(e) => {
                              const copy = [...contactDepts];
                              copy[idx] = { ...copy[idx], email: e.target.value };
                              setContactDepts(copy);
                            }}
                            className="px-3 py-1.5 border border-gray-200 rounded-lg text-xs"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit" disabled={saving}
                    className="bg-[#1F4A3D] text-[#FBF6EE] px-6 py-3 rounded-lg text-xs font-semibold hover:bg-[#15342b] disabled:bg-gray-400 cursor-pointer shadow-sm"
                  >
                    {saving ? "Saving Changes..." : "Save Contact Info"}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* 7. SITE SETTINGS & IMPACT STATS */}
          {activeSection === "settings" && (
            <div className="space-y-12">
              <form onSubmit={saveSettingsAndStats} className="space-y-8">
                
                {/* Visual Sub-header: Contact info */}
                <div className="space-y-4">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[#C65D2E] border-b border-[#1F4A3D]/10 pb-2">
                    Site Contact Settings
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-[#2B2621]/80">Primary Hotline Phone</label>
                      <input
                        type="text" required
                        value={settingsData.phone || ""}
                        onChange={(e) => setSettingsData({ ...settingsData, phone: e.target.value })}
                        className="w-full px-4 py-3 bg-white border border-[#1F4A3D]/10 rounded-lg text-sm"
                      />
                      <p className="text-[10px] text-gray-500 mt-0.5">অফিসের মূল ফোন নম্বর, যা হেডার ও ফুটারে প্রদর্শিত হবে।</p>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-[#2B2621]/80">Primary Email Address</label>
                      <input
                        type="email" required
                        value={settingsData.email || ""}
                        onChange={(e) => setSettingsData({ ...settingsData, email: e.target.value })}
                        className="w-full px-4 py-3 bg-white border border-[#1F4A3D]/10 rounded-lg text-sm"
                      />
                      <p className="text-[10px] text-gray-500 mt-0.5">অফিসের ইমেইল অ্যাড্রেস, যা ফুটারে প্রদর্শিত হবে।</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-[#2B2621]/80">Physical Office Address (Bangla)</label>
                      <textarea
                        rows={2} required
                        value={settingsData.address_bn || ""}
                        onChange={(e) => setSettingsData({ ...settingsData, address_bn: e.target.value })}
                        className="w-full px-4 py-3 bg-white border border-[#1F4A3D]/10 rounded-lg text-sm"
                      />
                      <p className="text-[10px] text-gray-500 mt-0.5">অফিসের পূর্ণ ঠিকানা (বাংলা)।</p>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-[#2B2621]/80">Physical Office Address (English)</label>
                      <textarea
                        rows={2} required
                        value={settingsData.address_en || ""}
                        onChange={(e) => setSettingsData({ ...settingsData, address_en: e.target.value })}
                        className="w-full px-4 py-3 bg-white border border-[#1F4A3D]/10 rounded-lg text-sm"
                      />
                      <p className="text-[10px] text-gray-500 mt-0.5">Physical office address used for text display and Google Map coordinates query.</p>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#2B2621]/80">Facebook Link URL</label>
                    <input
                      type="url" required
                      value={settingsData.facebookUrl || ""}
                      onChange={(e) => setSettingsData({ ...settingsData, facebookUrl: e.target.value })}
                      className="w-full px-4 py-3 bg-white border border-[#1F4A3D]/10 rounded-lg text-sm"
                    />
                    <p className="text-[10px] text-gray-500 mt-0.5">ফুটারে দেওয়া ফেসবুক পেজের লিংক।</p>
                  </div>
                </div>

                {/* Visual Sub-header: Impact Stats */}
                <div className="space-y-4">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[#C65D2E] border-b border-[#1F4A3D]/10 pb-2">
                    Homepage Impact Statistics Counters
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-semibold text-[#2B2621]/80">Amount Distributed ($)</label>
                      <input
                        type="number" required
                        value={statsData.amountDistributed || ""}
                        onChange={(e) => setStatsData({ ...statsData, amountDistributed: e.target.value })}
                        className="w-full px-3 py-2 bg-white border border-[#1F4A3D]/10 rounded-lg text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-semibold text-[#2B2621]/80">People Served</label>
                      <input
                        type="number" required
                        value={statsData.peopleServed || ""}
                        onChange={(e) => setStatsData({ ...statsData, peopleServed: e.target.value })}
                        className="w-full px-3 py-2 bg-white border border-[#1F4A3D]/10 rounded-lg text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-semibold text-[#2B2621]/80">Districts Covered</label>
                      <input
                        type="number" required
                        value={statsData.districtsCovered || ""}
                        onChange={(e) => setStatsData({ ...statsData, districtsCovered: e.target.value })}
                        className="w-full px-3 py-2 bg-white border border-[#1F4A3D]/10 rounded-lg text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-semibold text-[#2B2621]/80">Active Branches</label>
                      <input
                        type="number" required
                        value={statsData.activeBranches || ""}
                        onChange={(e) => setStatsData({ ...statsData, activeBranches: e.target.value })}
                        className="w-full px-3 py-2 bg-white border border-[#1F4A3D]/10 rounded-lg text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-semibold text-[#2B2621]/80">Years Active</label>
                      <input
                        type="number" required
                        value={statsData.yearsActive || ""}
                        onChange={(e) => setStatsData({ ...statsData, yearsActive: e.target.value })}
                        className="w-full px-3 py-2 bg-white border border-[#1F4A3D]/10 rounded-lg text-xs"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4">
                  <button
                    type="submit" disabled={saving}
                    className="bg-[#1F4A3D] text-[#FBF6EE] px-6 py-3 rounded-lg text-xs font-semibold hover:bg-[#15342b] disabled:bg-gray-400 cursor-pointer shadow-sm"
                  >
                    {saving ? "Saving Changes..." : "Save Settings & Stats"}
                  </button>

                  <button
                    type="button"
                    onClick={handleSeedDefaultContent}
                    className="border border-[#C65D2E]/30 hover:bg-[#C65D2E]/5 text-[#C65D2E] px-4 py-2.5 rounded-lg text-xs font-bold cursor-pointer"
                  >
                    Seed Default Content
                  </button>
                </div>
              </form>

              {/* FAQs Accordion Panel Integrated here */}
              <div className="border-t border-[#1F4A3D]/10 pt-10 space-y-6">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#C65D2E]">
                  FAQs Accordion Management
                </h3>
                
                <form onSubmit={saveFaq} className="bg-white p-6 rounded-2xl border border-[#1F4A3D]/10 space-y-4">
                  <h4 className="text-xs font-bold text-[#1F4A3D]">{activeFaq.id ? "Edit Question" : "Add Question"}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text" required placeholder="Question (Bangla)"
                      value={activeFaq.question_bn || ""}
                      onChange={(e) => setActiveFaq({ ...activeFaq, question_bn: e.target.value })}
                      className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs"
                    />
                    <input
                      type="text" required placeholder="Question (English)"
                      value={activeFaq.question_en || ""}
                      onChange={(e) => setActiveFaq({ ...activeFaq, question_en: e.target.value })}
                      className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs"
                    />
                  </div>
                  <input
                    type="number" required placeholder="Order"
                    value={activeFaq.order ?? 1}
                    onChange={(e) => setActiveFaq({ ...activeFaq, order: Number(e.target.value) })}
                    className="w-32 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs"
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <textarea
                      rows={3} required placeholder="Answer (Bangla)"
                      value={activeFaq.answer_bn || ""}
                      onChange={(e) => setActiveFaq({ ...activeFaq, answer_bn: e.target.value })}
                      className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs w-full"
                    />
                    <textarea
                      rows={3} required placeholder="Answer (English)"
                      value={activeFaq.answer_en || ""}
                      onChange={(e) => setActiveFaq({ ...activeFaq, answer_en: e.target.value })}
                      className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs w-full"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button type="submit" disabled={saving} className="bg-[#1F4A3D] text-white px-4 py-2 rounded-lg text-xs font-semibold hover:bg-[#15342b] cursor-pointer">
                      Save FAQ
                    </button>
                    <button type="button" onClick={() => setActiveFaq({ id: "", question_bn: "", question_en: "", answer_bn: "", answer_en: "", order: 1 })} className="border border-gray-200 text-gray-700 px-4 py-2 rounded-lg text-xs hover:bg-gray-50 cursor-pointer">
                      Clear Form
                    </button>
                  </div>
                </form>

                <div className="space-y-4 pt-4">
                  {faqList.map((f) => (
                    <div key={f.id} className="p-4 bg-white border border-gray-200 rounded-xl flex items-center justify-between shadow-xs">
                      <div>
                        <p className="text-xs font-bold text-[#1F4A3D]">{tContent(f.question_bn, f.question_en)}</p>
                        <p className="text-[10px] text-gray-500 font-light mt-0.5">Display Order: {f.order || 1}</p>
                      </div>
                      <div className="flex gap-1">
                        <button onClick={() => setActiveFaq(f)} className="text-[#C65D2E] hover:bg-[#C65D2E]/5 p-2 rounded-md transition-colors"><Edit className="w-3.5 h-3.5" /></button>
                        <button onClick={() => deleteFaq(f.id)} className="text-red-500 hover:bg-red-50 p-2 rounded-md transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

        </div>
      </main>

    </div>
  );
}
