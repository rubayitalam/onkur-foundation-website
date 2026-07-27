"use client";

import React, { useEffect, useState } from "react";
import { ref, onValue, push, set } from "firebase/database";
import { db } from "@/lib/firebase";
import { useLanguage } from "@/context/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Briefcase, MapPin, Calendar, Clock, Plus, Trash2, 
  CheckCircle2, X, ChevronDown, ChevronUp, GraduationCap, Link2 
} from "lucide-react";

export default function CareerPage() {
  const { tContent, t } = useLanguage();
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedJobId, setExpandedJobId] = useState<string | null>(null);
  
  // Application modal state
  const [applyingJob, setApplyingJob] = useState<any | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // Form fields
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [cvLink, setCvLink] = useState("");
  
  const [education, setEducation] = useState<any[]>([
    { degree: "", institution: "", year: "", result: "" }
  ]);
  const [experience, setExperience] = useState<any[]>([
    { organization: "", position: "", duration: "", responsibilities: "" }
  ]);
  const [isFirstJob, setIsFirstJob] = useState(false);
  const [careerContent, setCareerContent] = useState<any>(null);

  useEffect(() => {
    const jobsRef = ref(db, "jobs");
    const contentRef = ref(db, "siteContent/career");
    
    let loaded = 0;
    const checkLoaded = () => {
      loaded++;
      if (loaded >= 2) setLoading(false);
    };

    const unsubJobs = onValue(jobsRef, (snap) => {
      const val = snap.val();
      if (val) {
        const arr = Object.keys(val)
          .map(k => ({ id: k, ...val[k] }))
          .filter(j => j.isActive === true);
        setJobs(arr);
      } else {
        setJobs([]);
      }
      checkLoaded();
    }, () => checkLoaded());

    const unsubContent = onValue(contentRef, (snap) => {
      setCareerContent(snap.val());
      checkLoaded();
    }, () => checkLoaded());

    return () => {
      unsubJobs();
      unsubContent();
    };
  }, []);

  const handleApplyClick = (job: any) => {
    setApplyingJob(job);
    setSuccess(false);
  };

  const handleCloseModal = () => {
    setApplyingJob(null);
    // Reset Form fields
    setFullName("");
    setPhone("");
    setEmail("");
    setAddress("");
    setCoverLetter("");
    setCvLink("");
    setEducation([{ degree: "", institution: "", year: "", result: "" }]);
    setExperience([{ organization: "", position: "", duration: "", responsibilities: "" }]);
    setIsFirstJob(false);
  };

  // repeatable education handlers
  const addEducation = () => {
    setEducation([...education, { degree: "", institution: "", year: "", result: "" }]);
  };
  const removeEducation = (index: number) => {
    setEducation(education.filter((_, i) => i !== index));
  };
  const handleEducationChange = (index: number, field: string, val: string) => {
    const updated = [...education];
    updated[index] = { ...updated[index], [field]: val };
    setEducation(updated);
  };

  // repeatable experience handlers
  const addExperience = () => {
    setExperience([...experience, { organization: "", position: "", duration: "", responsibilities: "" }]);
  };
  const removeExperience = (index: number) => {
    setExperience(experience.filter((_, i) => i !== index));
  };
  const handleExperienceChange = (index: number, field: string, val: string) => {
    const updated = [...experience];
    updated[index] = { ...updated[index], [field]: val };
    setExperience(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const appsRef = ref(db, "jobApplications");
      const newAppRef = push(appsRef);
      
      const payload = {
        jobId: applyingJob.id,
        jobTitle_bn: applyingJob.title_bn,
        jobTitle_en: applyingJob.title_en,
        fullName,
        phone,
        email,
        address,
        education: education.filter(ed => ed.degree || ed.institution),
        experience: isFirstJob ? [] : experience.filter(exp => exp.organization || exp.position),
        isFirstJob,
        coverLetter,
        cvLink,
        submittedAt: new Date().toISOString()
      };

      await set(newAppRef, payload);
      setSuccess(true);
    } catch (err: any) {
      alert("Error submitting application: " + err.message);
    } finally {
      setSubmitting(false);
    }
  };

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
          src={careerContent?.banner_image_url || "https://images.unsplash.com/photo-1521791136364-7286475269a9?auto=format&fit=crop&q=80&w=1200"} 
          alt="Onkur Careers Banner" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* 1. Header Hero */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-[#C65D2E] font-semibold text-sm uppercase tracking-wider block">
          {tContent("নিয়োগ বিজ্ঞপ্তি", "Careers at Onkur")}
        </span>
        <h1 className="text-4xl font-extrabold text-[#1F4A3D]">
          {tContent("আমাদের দলে যোগ দিন", "Join Our Empowering Team")}
        </h1>
        <p className="text-base text-[#2B2621] font-normal leading-relaxed">
          {tContent(
            "অঙ্কুর ফাউন্ডেশনে আমরা গ্রামীণ প্রান্তিক জনগোষ্ঠীর অর্থনৈতিক স্বাধীনতার জন্য নিরলসভাবে কাজ করে যাচ্ছি। আমাদের সাথে ক্যারিয়ার গড়ুন এবং একটি পরিবর্তনের কারিগর হোন।",
            "At Onkur, we work to bring financial independence to rural communities. Grow your career with us and become a force for sustainable change."
          )}
        </p>
      </div>

      {/* 2. Job Listings Grid */}
      {jobs.length === 0 ? (
        <div className="text-center max-w-md mx-auto p-12 bg-white rounded-3xl border border-[#1F4A3D]/5 shadow-sm space-y-4">
          <Briefcase className="w-12 h-12 text-[#2B2621]/30 mx-auto" />
          <h3 className="text-lg font-bold text-[#1F4A3D]">
            {tContent("বর্তমানে কোনো নিয়োগ বিজ্ঞপ্তি নেই", "No Current Openings")}
          </h3>
          <p className="text-sm text-[#2B2621] font-normal">
            {tContent(
              "ভবিষ্যতের নিয়োগ বিজ্ঞপ্তির জন্য নিয়মিত আমাদের ওয়েবসাইট ভিজিট করুন। ধন্যবাদ।",
              "Check back soon or visit our office for updates regarding future career listings."
            )}
          </p>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto space-y-6">
          {jobs.map((job) => {
            const isExpanded = expandedJobId === job.id;
            return (
              <div 
                key={job.id} 
                className="bg-white rounded-2xl border border-[#1F4A3D]/5 shadow-xs overflow-hidden transition-all duration-300 hover:shadow-md"
              >
                {/* Header Card Area */}
                <div 
                  onClick={() => setExpandedJobId(isExpanded ? null : job.id)}
                  className="p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 cursor-pointer select-none"
                >
                  <div className="space-y-3">
                    <span className="inline-block bg-[#1F4A3D]/5 text-[#1F4A3D] text-xs font-semibold px-2.5 py-1 rounded-md">
                      {tContent(job.department_bn, job.department_en)}
                    </span>
                    <h3 className="text-xl font-bold text-[#1F4A3D]">
                      {tContent(job.title_bn, job.title_en)}
                    </h3>
                    
                    <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-[#2B2621] font-normal">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#C65D2E]" />
                        <span>{tContent(job.location_bn, job.location_en)}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#C65D2E]" />
                        <span>{tContent(job.type_bn, job.type_en)}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#C9973B]" />
                        <span>
                          {tContent("আবেদনের শেষ তারিখ: ", "Deadline: ")}
                          {job.deadline ? new Date(job.deadline).toLocaleDateString() : ""}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button 
                      type="button"
                      className="text-xs font-semibold text-[#C65D2E] flex items-center gap-1 hover:underline"
                    >
                      <span>{isExpanded ? tContent("সংক্ষেপ করুন", "Hide Details") : tContent("বিস্তারিত দেখুন", "View Details")}</span>
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Collapsible Details Area */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      className="overflow-hidden border-t border-[#1F4A3D]/5 bg-[#FBF6EE]/20"
                    >
                      <div className="p-6 sm:p-8 space-y-6">
                        <div className="space-y-2.5">
                          <h4 className="font-bold text-sm text-[#1F4A3D] uppercase tracking-wider">
                            {tContent("কাজের বিবরণী (Job Description)", "Job Description")}
                          </h4>
                          <p className="text-sm text-[#2B2621] font-normal leading-relaxed whitespace-pre-wrap">
                            {tContent(job.description_bn, job.description_en)}
                          </p>
                        </div>

                        <div className="space-y-2.5">
                          <h4 className="font-bold text-sm text-[#1F4A3D] uppercase tracking-wider">
                            {tContent("যোগ্যতা ও প্রয়োজনীয় দক্ষতা (Requirements)", "Requirements")}
                          </h4>
                          <p className="text-sm text-[#2B2621] font-normal leading-relaxed whitespace-pre-wrap">
                            {tContent(job.requirements_bn, job.requirements_en)}
                          </p>
                        </div>

                        <div className="pt-4 border-t border-[#1F4A3D]/5 flex justify-end">
                          <button
                            type="button"
                            onClick={() => handleApplyClick(job)}
                            className="bg-[#C65D2E] hover:bg-[#b04f24] text-white px-6 py-3 rounded-lg text-xs font-semibold shadow-sm hover:shadow transition-all cursor-pointer"
                          >
                            {tContent("আবেদন করুন", "Apply Now")}
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      )}

      {/* 3. Job Application Overlay Modal */}
      <AnimatePresence>
        {applyingJob && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white rounded-3xl shadow-2xl border border-[#1F4A3D]/10 w-full max-w-3xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              {/* Modal Header */}
              <div className="bg-[#1F4A3D] text-[#FBF6EE] px-6 py-5 flex items-center justify-between">
                <div className="space-y-0.5">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#C9973B]">
                    {tContent("আবেদন ফর্ম", "Job Application Form")}
                  </span>
                  <h3 className="text-base font-bold truncate">
                    {tContent(applyingJob.title_bn, applyingJob.title_en)}
                  </h3>
                </div>
                <button 
                  onClick={handleCloseModal}
                  className="p-1.5 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="flex-1 overflow-y-auto p-6 sm:p-8">
                {success ? (
                  <div className="text-center py-12 space-y-6 max-w-md mx-auto">
                    <div className="w-16 h-16 bg-[#1F4A3D]/5 text-[#C65D2E] rounded-full flex items-center justify-center mx-auto border border-[#C65D2E]/20 animate-bounce">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-xl font-bold text-[#1F4A3D]">
                        {tContent("আবেদন সফলভাবে সম্পন্ন হয়েছে!", "Application Submitted Successfully!")}
                      </h4>
                      <p className="text-sm text-[#2B2621] font-normal">
                        {tContent(
                          "আপনার আবেদনের বিবরণ আমরা পেয়েছি। আমাদের টিম খুব শীঘ্রই বাছাই পর্ব শেষে আপনার সাথে যোগাযোগ করবে। ধন্যবাদ।",
                          "We have received your application. Our recruitment team will review it and contact you soon."
                        )}
                      </p>
                    </div>
                    <div className="pt-4">
                      <button
                        onClick={handleCloseModal}
                        className="bg-[#1F4A3D] text-white px-6 py-2.5 rounded-lg text-xs font-semibold hover:bg-[#15342b] transition-all cursor-pointer"
                      >
                        {tContent("বন্ধ করুন", "Close Window")}
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Part 1: Basic Info */}
                    <div className="space-y-4">
                      <h4 className="font-bold text-sm text-[#1F4A3D] border-b border-[#1F4A3D]/10 pb-2">
                        {tContent("ব্যক্তিগত বিবরণী (Personal Info)", "Personal Information")}
                      </h4>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-[#2B2621]">{tContent("পূর্ণ নাম", "Full Name")} *</label>
                          <input
                            type="text"
                            required
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="w-full px-3 py-2 border border-[#1F4A3D]/10 rounded-lg text-sm bg-[#FBF6EE]/15 focus:outline-[#1F4A3D]"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-[#2B2621]">{tContent("মোবাইল নম্বর", "Phone Number")} *</label>
                          <input
                            type="tel"
                            required
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full px-3 py-2 border border-[#1F4A3D]/10 rounded-lg text-sm bg-[#FBF6EE]/15 focus:outline-[#1F4A3D]"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-[#2B2621]">{tContent("ইমেইল ঠিকানা", "Email Address")} *</label>
                          <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 border border-[#1F4A3D]/10 rounded-lg text-sm bg-[#FBF6EE]/15 focus:outline-[#1F4A3D]"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-[#2B2621]">{tContent("বর্তমান ঠিকানা", "Present Address")} *</label>
                          <input
                            type="text"
                            required
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="w-full px-3 py-2 border border-[#1F4A3D]/10 rounded-lg text-sm bg-[#FBF6EE]/15 focus:outline-[#1F4A3D]"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Part 2: Education List (Repeatable) */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between border-b border-[#1F4A3D]/10 pb-2">
                        <h4 className="font-bold text-sm text-[#1F4A3D]">
                          {tContent("শিক্ষাগত যোগ্যতা (Education)", "Education Background")}
                        </h4>
                        <button
                          type="button"
                          onClick={addEducation}
                          className="text-[#C65D2E] hover:text-[#b04f24] text-xs font-semibold flex items-center gap-1 cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>{tContent("ডিগ্রী যোগ করুন", "Add Degree")}</span>
                        </button>
                      </div>

                      {education.map((ed, idx) => (
                        <div key={idx} className="p-4 bg-[#FBF6EE]/30 rounded-xl border border-[#1F4A3D]/5 space-y-3 relative">
                          {education.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeEducation(idx)}
                              className="absolute top-3 right-3 text-red-500 hover:text-red-700 cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold text-[#2B2621] uppercase tracking-wider">{tContent("পরীক্ষা / ডিগ্রীর নাম", "Degree / Exam")}</label>
                              <input
                                type="text"
                                required
                                value={ed.degree}
                                placeholder="e.g. SSC / HSC / BSS"
                                onChange={(e) => handleEducationChange(idx, "degree", e.target.value)}
                                className="w-full px-3 py-1.5 border border-[#1F4A3D]/10 rounded-lg text-xs focus:outline-[#1F4A3D]"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold text-[#2B2621] uppercase tracking-wider">{tContent("শিক্ষা প্রতিষ্ঠান", "Institution")}</label>
                              <input
                                type="text"
                                required
                                value={ed.institution}
                                onChange={(e) => handleEducationChange(idx, "institution", e.target.value)}
                                className="w-full px-3 py-1.5 border border-[#1F4A3D]/10 rounded-lg text-xs focus:outline-[#1F4A3D]"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold text-[#2B2621] uppercase tracking-wider">{tContent("পাশের সাল", "Passing Year")}</label>
                              <input
                                type="number"
                                required
                                value={ed.year}
                                onChange={(e) => handleEducationChange(idx, "year", e.target.value)}
                                className="w-full px-3 py-1.5 border border-[#1F4A3D]/10 rounded-lg text-xs focus:outline-[#1F4A3D]"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold text-[#2B2621] uppercase tracking-wider">{tContent("ফলাফল (জিপিএ / বিভাগ)", "Result / GPA")}</label>
                              <input
                                type="text"
                                required
                                value={ed.result}
                                placeholder="e.g. GPA 5.00 / 1st Class"
                                onChange={(e) => handleEducationChange(idx, "result", e.target.value)}
                                className="w-full px-3 py-1.5 border border-[#1F4A3D]/10 rounded-lg text-xs focus:outline-[#1F4A3D]"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Part 3: Experience Details */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between border-b border-[#1F4A3D]/10 pb-2">
                        <div className="flex items-center gap-3">
                          <h4 className="font-bold text-sm text-[#1F4A3D]">
                            {tContent("কাজের অভিজ্ঞতা (Experience)", "Work Experience")}
                          </h4>
                          <label className="inline-flex items-center gap-1.5 text-xs text-[#2B2621] select-none cursor-pointer">
                            <input
                              type="checkbox"
                              checked={isFirstJob}
                              onChange={(e) => setIsFirstJob(e.target.checked)}
                              className="rounded border-[#1F4A3D]/20 text-[#1F4A3D]"
                            />
                            <span>{tContent("এটি আমার প্রথম চাকরি", "This is my first job")}</span>
                          </label>
                        </div>
                        
                        {!isFirstJob && (
                          <button
                            type="button"
                            onClick={addExperience}
                            className="text-[#C65D2E] hover:text-[#b04f24] text-xs font-semibold flex items-center gap-1 cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>{tContent("অভিজ্ঞতা যোগ করুন", "Add Work")}</span>
                          </button>
                        )}
                      </div>

                      {!isFirstJob && experience.map((exp, idx) => (
                        <div key={idx} className="p-4 bg-[#FBF6EE]/30 rounded-xl border border-[#1F4A3D]/5 space-y-3 relative animate-fadeIn">
                          {experience.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeExperience(idx)}
                              className="absolute top-3 right-3 text-red-500 hover:text-red-700 cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold text-[#2B2621] uppercase tracking-wider">{tContent("প্রতিষ্ঠানের নাম", "Company / Organization")}</label>
                              <input
                                type="text"
                                required
                                value={exp.organization}
                                onChange={(e) => handleExperienceChange(idx, "organization", e.target.value)}
                                className="w-full px-3 py-1.5 border border-[#1F4A3D]/10 rounded-lg text-xs focus:outline-[#1F4A3D]"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold text-[#2B2621] uppercase tracking-wider">{tContent("পদবী", "Position")}</label>
                              <input
                                type="text"
                                required
                                value={exp.position}
                                onChange={(e) => handleExperienceChange(idx, "position", e.target.value)}
                                className="w-full px-3 py-1.5 border border-[#1F4A3D]/10 rounded-lg text-xs focus:outline-[#1F4A3D]"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold text-[#2B2621] uppercase tracking-wider">{tContent("সময়কাল (যেমন: ৬ মাস)", "Duration")}</label>
                              <input
                                type="text"
                                required
                                value={exp.duration}
                                placeholder="e.g. 1 Year / 6 Months"
                                onChange={(e) => handleExperienceChange(idx, "duration", e.target.value)}
                                className="w-full px-3 py-1.5 border border-[#1F4A3D]/10 rounded-lg text-xs focus:outline-[#1F4A3D]"
                              />
                            </div>
                            <div className="space-y-1 sm:col-span-2">
                              <label className="text-[10px] font-bold text-[#2B2621] uppercase tracking-wider">{tContent("দায়িত্বসমূহ", "Key Responsibilities")}</label>
                              <input
                                type="text"
                                required
                                value={exp.responsibilities}
                                onChange={(e) => handleExperienceChange(idx, "responsibilities", e.target.value)}
                                className="w-full px-3 py-1.5 border border-[#1F4A3D]/10 rounded-lg text-xs focus:outline-[#1F4A3D]"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Part 4: Resume & Cover Letter */}
                    <div className="space-y-4">
                      <h4 className="font-bold text-sm text-[#1F4A3D] border-b border-[#1F4A3D]/10 pb-2">
                        {tContent("জীবনবৃত্তান্ত ও কভার লেটার (Application Details)", "Application Details")}
                      </h4>

                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-[#2B2621] flex items-center gap-1">
                          <Link2 className="w-3.5 h-3.5 text-[#C65D2E]" />
                          <span>{tContent("সিভি / পোর্টফোলিও লিংক (গুগল ড্রাইভ/লিঙ্কডইন)", "CV / Resume Link (Google Drive / LinkedIn)")}</span>
                        </label>
                        <input
                          type="url"
                          value={cvLink}
                          placeholder="https://drive.google.com/..."
                          onChange={(e) => setCvLink(e.target.value)}
                          className="w-full px-3 py-2 border border-[#1F4A3D]/10 rounded-lg text-sm bg-[#FBF6EE]/15 focus:outline-[#1F4A3D]"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-[#2B2621]">{tContent("কভার লেটার / আবেদন বার্তা", "Cover Letter / Message")} *</label>
                        <textarea
                          rows={4}
                          required
                          value={coverLetter}
                          onChange={(e) => setCoverLetter(e.target.value)}
                          className="w-full px-3 py-2 border border-[#1F4A3D]/10 rounded-lg text-sm bg-[#FBF6EE]/15 focus:outline-[#1F4A3D] w-full"
                          placeholder={tContent("কেন আপনি এই পদের জন্য যোগ্য তা সংক্ষেপে লিখুন...", "Briefly write why you are a good fit for this role...")}
                        />
                      </div>
                    </div>

                    {/* Submit Actions */}
                    <div className="flex justify-end gap-3 pt-4 border-t border-[#1F4A3D]/5">
                      <button
                        type="button"
                        onClick={handleCloseModal}
                        className="border border-[#1F4A3D]/20 text-[#1F4A3D] px-5 py-2.5 rounded-lg text-xs font-semibold hover:bg-[#1F4A3D]/5 cursor-pointer"
                      >
                        {tContent("বাতিল", "Cancel")}
                      </button>
                      <button
                        type="submit"
                        disabled={submitting}
                        className="bg-[#1F4A3D] hover:bg-[#15342b] text-white px-6 py-2.5 rounded-lg text-xs font-semibold disabled:bg-gray-400 cursor-pointer flex items-center gap-1.5"
                      >
                        {submitting ? (
                          <>
                            <div className="animate-spin rounded-full h-3 w-3 border-t-2 border-b-2 border-white"></div>
                            <span>{tContent("জমা হচ্ছে...", "Submitting...")}</span>
                          </>
                        ) : (
                          <span>{tContent("আবেদন জমা দিন", "Submit Application")}</span>
                        )}
                      </button>
                    </div>

                  </form>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
