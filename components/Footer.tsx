"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  const { footerContent, settings, tContent } = useLanguage();

  const servicesList = [
    { labelBn: "রুরাল মাইক্রোলোন", labelEn: "Rural Microloans" },
    { labelBn: "মাইক্রোক্রেডিট লোন", labelEn: "Microcredit Loan" },
    { labelBn: "এসএমই লোন", labelEn: "SME Loan" }
  ];

  return (
    <footer className="bg-[#1F4A3D] text-[#FBF6EE] border-t border-[#C9973B]/20 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 mb-12">
          {/* Brand Col */}
          <div className="space-y-4">
            <Link href="/" className="flex flex-col select-none">
              <span className="text-3xl font-bold tracking-tight text-[#C9973B]">অঙ্কুর</span>
              <span className="text-xs uppercase tracking-widest text-[#FBF6EE] font-semibold">Onkur Foundation</span>
            </Link>
            <p className="text-sm text-[#FBF6EE] leading-relaxed font-normal">
              {tContent(
                footerContent?.tagline_bn || "অঙ্কুর – আশা জাগানো, জীবন গড়া। ক্ষুদ্র ঋণ, বড় পরিবর্তন।",
                footerContent?.tagline_en || "Onkur – Growing Hope, Empowering Lives. Small Loans. Big Change."
              )}
            </p>
            {settings?.facebookUrl && (
              <a
                href={settings.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm text-[#FBF6EE] hover:text-[#C9973B] transition-colors gap-2 mt-2"
              >
                <svg className="w-5 h-5 fill-[#C9973B] shrink-0" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
                </svg>
                <span>Facebook Page</span>
              </a>
            )}
          </div>

          {/* Quick Links Col */}
          <div>
            <h3 className="text-[#C9973B] font-semibold text-lg mb-6 border-b border-[#FBF6EE]/10 pb-2">
              {tContent("দ্রুত লিংক", "Quick Links")}
            </h3>
            <ul className="space-y-3">
              {(footerContent?.quickLinks || []).map((link: any, index: number) => (
                <li key={index}>
                  <Link
                    href={link.url}
                    className="text-sm text-[#FBF6EE] hover:text-[#C9973B] transition-colors font-normal"
                  >
                    {tContent(link.label_bn, link.label_en)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Col */}
          <div>
            <h3 className="text-[#C9973B] font-semibold text-lg mb-6 border-b border-[#FBF6EE]/10 pb-2">
              {tContent("আমাদের সেবা", "Our Services")}
            </h3>
            <ul className="space-y-3">
              {servicesList.map((service, index) => (
                <li key={index} className="text-sm text-[#FBF6EE] font-normal">
                  {tContent(service.labelBn, service.labelEn)}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Col */}
          <div className="space-y-4">
            <h3 className="text-[#C9973B] font-semibold text-lg mb-6 border-b border-[#FBF6EE]/10 pb-2">
              {tContent("যোগাযোগ করুন", "Get In Touch")}
            </h3>
            <ul className="space-y-3 text-sm font-normal text-[#FBF6EE]">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#C9973B] shrink-0 mt-0.5" />
                <span>{tContent(settings?.address_bn, settings?.address_en)}</span>
              </li>
              {settings?.phone && (
                <li className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#C9973B]" />
                  <a href={`tel:${settings.phone}`} className="hover:text-[#C9973B] transition-colors">
                    {settings.phone}
                  </a>
                </li>
              )}
              {settings?.email && (
                <li className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#C9973B]" />
                  <a href={`mailto:${settings.email}`} className="hover:text-[#C9973B] transition-colors">
                    {settings.email}
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="border-t border-[#FBF6EE]/10 pt-8 mt-8 flex flex-col md:flex-row items-center justify-between text-xs text-[#FBF6EE] font-normal gap-4">
          <p>
            {tContent(
              footerContent?.copyrightText_bn || "© ২০২৬ অঙ্কুর ফাউন্ডেশন। সর্বস্বত্ব সংরক্ষিত।",
              footerContent?.copyrightText_en || "© 2026 Onkur Foundation. All Rights Reserved."
            )}
          </p>
          <div className="space-x-4">
            <Link href="/admin" className="hover:underline hover:text-[#C9973B]">
              {tContent("প্রশাসক লগইন", "Admin Login")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
