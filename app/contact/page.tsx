"use client";

import React, { useState, useEffect } from "react";
import { ref, push, set, onValue } from "firebase/database";
import { db } from "@/lib/firebase";
import { useLanguage } from "@/context/LanguageContext";
import { MapPin, Phone, Mail, Send, CheckCircle2, Clock } from "lucide-react";

export default function ContactPage() {
  const { tContent, t, settings } = useLanguage();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  
  const [contactData, setContactData] = useState<any>(null);

  useEffect(() => {
    const contactRef = ref(db, "siteContent/contact");
    const unsub = onValue(contactRef, (snap) => {
      setContactData(snap.val());
    });
    return () => unsub();
  }, []);

  const defaultDepartments = [
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
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const messagesRef = ref(db, "contactMessages");
      const newMessageRef = push(messagesRef);
      await set(newMessageRef, {
        name,
        email,
        phone,
        message,
        submittedAt: new Date().toISOString()
      });

      setSuccess(true);
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
    } catch (err: any) {
      setError(err.message || "Failed to submit message.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      
      {/* Banner Image */}
      <div className="w-full h-64 md:h-80 rounded-3xl overflow-hidden shadow-xs border border-[#1F4A3D]/10 relative bg-gray-100">
        <img 
          src={contactData?.banner_image_url || "https://images.unsplash.com/photo-1423666639041-f56000c29a96?auto=format&fit=crop&q=80&w=1200"} 
          alt="Onkur Contact Banner" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <span className="text-[#C65D2E] font-semibold text-sm uppercase tracking-wider block">
          {tContent(contactData?.heading_bn || "যোগাযোগ করুন", contactData?.heading_en || "Contact Us")}
        </span>
        <h1 className="text-4xl font-bold text-[#1F4A3D]">
          {tContent(contactData?.heading_bn || "আমাদের সাথে যোগাযোগ করুন", contactData?.heading_en || "Get In Touch")}
        </h1>
        <p className="text-base text-[#2B2621]/70 font-light leading-relaxed">
          {tContent(
            contactData?.body_bn || "যেকোনো অনুসন্ধান, ঋণের আবেদন বা সহযোগিতার জন্য আমাদের সাথে সরাসরি যোগাযোগ করুন অথবা নিচের ফর্মটি পূরণ করুন।",
            contactData?.body_en || "Reach out to us for any questions or to apply for a loan."
          )}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Info Column */}
        <div className="lg:col-span-5 space-y-8 bg-[#1F4A3D] text-[#FBF6EE] p-8 md:p-10 rounded-3xl shadow-sm">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-[#C9973B]">
              {tContent("কার্যালয়ের ঠিকানা", "Office Contact")}
            </h2>
            <p className="text-sm font-light text-[#FBF6EE]/80">
              {tContent(
                "আমাদের অফিস পরিদর্শনের জন্য ঠিকানা ও যোগাযোগের বিবরণ:",
                "Below are our direct points of contact for official operations."
              )}
            </p>
          </div>

          <div className="space-y-6 pt-4">
            <div className="flex items-start gap-4">
              <MapPin className="w-6 h-6 text-[#C9973B] shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-sm tracking-wide uppercase text-[#FBF6EE]/60">
                  {tContent("ঠিকানা", "Address")}
                </h4>
                <p className="text-sm font-light leading-relaxed mt-1">
                  {tContent(settings?.address_bn, settings?.address_en)}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Clock className="w-5 h-5 text-[#C9973B] shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-sm tracking-wide uppercase text-[#FBF6EE]/60">
                  {tContent("কার্যদিবস ও সময়", "Office Hours")}
                </h4>
                <p className="text-sm font-light leading-relaxed mt-1">
                  {tContent(
                    contactData?.hours_bn || "রবি-বৃহস্পতি, সকাল ৯টা - বিকাল ৫টা", 
                    contactData?.hours_en || "Sun-Thu, 9 AM - 5 PM"
                  )}
                </p>
              </div>
            </div>

            {settings?.phone && (
              <div className="flex items-start gap-4">
                <Phone className="w-5 h-5 text-[#C9973B] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm tracking-wide uppercase text-[#FBF6EE]/60">
                    {tContent("ফোন", "Phone")}
                  </h4>
                  <a href={`tel:${settings.phone}`} className="text-sm font-light hover:underline block mt-1">
                    {settings.phone}
                  </a>
                </div>
              </div>
            )}

            {settings?.email && (
              <div className="flex items-start gap-4">
                <Mail className="w-5 h-5 text-[#C9973B] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm tracking-wide uppercase text-[#FBF6EE]/60">
                    {tContent("ইমেইল", "Email")}
                  </h4>
                  <a href={`mailto:${settings.email}`} className="text-sm font-light hover:underline block mt-1">
                    {settings.email}
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Department Contacts repeatable list */}
          <div className="border-t border-[#FBF6EE]/15 pt-6 space-y-4">
            <h4 className="font-bold text-xs uppercase tracking-widest text-[#C9973B]">
              {tContent("বিভাগীয় যোগাযোগ", "Departmental Contacts")}
            </h4>
            <div className="space-y-4">
              {(contactData?.departments || defaultDepartments).map((dept: any, idx: number) => (
                <div key={idx} className="bg-white/5 p-3.5 rounded-xl border border-white/5 text-xs space-y-1">
                  <p className="font-bold text-white">
                    {tContent(dept.name_bn, dept.name_en)}
                  </p>
                  {dept.phone && (
                    <p className="text-[#FBF6EE]/75 font-light">
                      {tContent("ফোন: ", "Phone: ")}
                      <a href={`tel:${dept.phone}`} className="hover:underline">{dept.phone}</a>
                    </p>
                  )}
                  {dept.email && (
                    <p className="text-[#FBF6EE]/75 font-light">
                      {tContent("ইমেইল: ", "Email: ")}
                      <a href={`mailto:${dept.email}`} className="hover:underline">{dept.email}</a>
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Form Column */}
        <div className="lg:col-span-7 bg-white p-8 md:p-10 rounded-3xl border border-[#1F4A3D]/5 shadow-sm">
          {success ? (
            <div className="text-center py-12 space-y-4">
              <div className="bg-[#1F4A3D]/5 text-[#1F4A3D] p-4 rounded-full inline-block">
                <CheckCircle2 className="w-12 h-12 text-[#C65D2E]" />
              </div>
              <h3 className="text-2xl font-bold text-[#1F4A3D]">
                {t("contactForm.success")}
              </h3>
              <button
                onClick={() => setSuccess(false)}
                className="mt-4 text-sm font-semibold text-[#C65D2E] hover:underline cursor-pointer"
              >
                {tContent("আরেকটি বার্তা পাঠান", "Send another message")}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <h3 className="text-xl font-bold text-[#1F4A3D] border-b border-[#1F4A3D]/10 pb-3">
                {t("contactForm.title")}
              </h3>

              {error && (
                <div className="bg-red-50 text-red-600 text-sm p-4 rounded-md border border-red-100">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label htmlFor="name" className="text-xs font-semibold uppercase text-[#2B2621]/70">
                    {t("contactForm.name")}
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 bg-[#FBF6EE]/40 border border-[#1F4A3D]/10 rounded-lg focus:outline-none focus:border-[#C65D2E] text-sm"
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="phone" className="text-xs font-semibold uppercase text-[#2B2621]/70">
                    {t("contactForm.phone")}
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-3 bg-[#FBF6EE]/40 border border-[#1F4A3D]/10 rounded-lg focus:outline-none focus:border-[#C65D2E] text-sm"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label htmlFor="email" className="text-xs font-semibold uppercase text-[#2B2621]/70">
                  {t("contactForm.email")}
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-[#FBF6EE]/40 border border-[#1F4A3D]/10 rounded-lg focus:outline-none focus:border-[#C65D2E] text-sm"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="message" className="text-xs font-semibold uppercase text-[#2B2621]/70">
                  {t("contactForm.message")}
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-3 bg-[#FBF6EE]/40 border border-[#1F4A3D]/10 rounded-lg focus:outline-none focus:border-[#C65D2E] text-sm resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-[#C65D2E] hover:bg-[#b04f24] text-white py-3.5 rounded-lg text-sm font-semibold tracking-wide shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                <span>{submitting ? t("common.saving") : t("common.submit")}</span>
                {!submitting && <Send className="w-4 h-4" />}
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Embedded Official Google Map for Navana Shaz Sylvania */}
      <div className="rounded-3xl overflow-hidden shadow-sm border border-[#1F4A3D]/15 h-[450px] w-full">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.392916435311!2d90.4207945!3d23.804623199999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c76ced93ae11%3A0x625b9d54b7adb92a!2sNavana%20Shaz%20Sylvania!5e0!3m2!1sen!2sbd!4v1785219426549!5m2!1sen!2sbd"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          title="Navana Shaz Sylvania Office Location"
        ></iframe>
      </div>

    </div>
  );
}
