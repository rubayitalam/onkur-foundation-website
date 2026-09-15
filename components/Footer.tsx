"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  const { footerContent, settings, tContent } = useLanguage();

  const servicesList = [
    { labelBn: "ক্ষুদ্র (নারী) ঋণ", labelEn: "Small (Women's) Loan" },
    {
      labelBn: "ক্ষুদ্র ব্যবসা ও উদ্যোক্তা ঋণ",
      labelEn: "Small Business & Entrepreneur Loan",
    },
  ];

  return (
    <footer
      className="relative rounded-t-[10rem] pt-10 pb-6 border-t border-secondary/10"
      style={{
        background:
          "radial-gradient(circle at 0% 0%, color-mix(in srgb, var(--color-secondary) 6%, white) 0%, transparent 50%), " +
          "radial-gradient(circle at 100% 0%, color-mix(in srgb, var(--color-secondary) 6%, white) 0%, transparent 50%), " +
          "radial-gradient(circle at 0% 100%, color-mix(in srgb, var(--color-secondary) 6%, white) 0%, transparent 50%), " +
          "radial-gradient(circle at 100% 100%, color-mix(in srgb, var(--color-secondary) 6%, white) 0%, transparent 50%), " +
          "#FFFFFF",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-20 lg:px-8">
        {/* Top row: logo + socials */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6">
          <Link href="/" className="inline-flex select-none group">
            <div className="bg-white rounded-lg px-2.5 py-1.5 shadow-sm flex items-center justify-center transition-transform duration-200 group-hover:scale-105">
              <img
                src="/logo.png"
                alt="অঙ্কুর - Onkur Foundation"
                className="h-8 w-auto object-contain"
              />
            </div>
          </Link>

          {settings?.facebookUrl && (
            <a
              href={settings.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-secondary hover:bg-primary flex items-center justify-center transition-colors"
            >
              <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
              </svg>
            </a>
          )}
        </div>

        <div className="border-t border-secondary/15"></div>

        {/* Middle row: link columns + CTA, tightened */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 py-8">
          {/* Quick Links */}
          <div>
            <h3 className="text-primary font-semibold text-sm mb-3">
              {tContent("দ্রুত লিংক", "Quick Links")}
            </h3>
            <ul className="space-y-2">
              {(footerContent?.quickLinks || []).map(
                (link: any, index: number) => (
                  <li key={index}>
                    <Link
                      href={link.url}
                      className="text-sm text-secondary hover:text-primary transition-colors"
                    >
                      {tContent(link.label_bn, link.label_en)}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-primary font-semibold text-sm mb-3">
              {tContent("আমাদের সেবা", "Our Services")}
            </h3>
            <ul className="space-y-2">
              {servicesList.map((service, index) => (
                <li key={index}>
                  <Link
                    href="/services"
                    className="text-sm text-secondary hover:text-primary transition-colors"
                  >
                    {tContent(service.labelBn, service.labelEn)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-primary font-semibold text-sm mb-3">
              {tContent("যোগাযোগ করুন", "Get In Touch")}
            </h3>
            <ul className="space-y-2 text-sm text-secondary">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>
                  {tContent(settings?.address_bn, settings?.address_en)}
                </span>
              </li>
              {settings?.phone && (
                <li className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-primary" />
                  <a
                    href={`tel:${settings.phone}`}
                    className="hover:text-primary transition-colors"
                  >
                    {settings.phone}
                  </a>
                </li>
              )}
              {settings?.email && (
                <li className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-primary" />
                  <a
                    href={`mailto:${settings.email}`}
                    className="hover:text-primary transition-colors"
                  >
                    {settings.email}
                  </a>
                </li>
              )}
            </ul>
          </div>

          {/* CTA */}
          <div>
            <h3 className="text-secondary font-bold text-lg mb-2">
              {tContent("আজই আবেদন করুন", "Apply for a Loan")}
            </h3>
            <p className="text-sm text-secondary/80 leading-relaxed mb-4">
              {tContent(
                "সহজ শর্তে ক্ষুদ্র ঋণের জন্য আবেদন করুন।",
                "Apply on easy terms and reach your goals.",
              )}
            </p>
            <Link
              href="/contact"
              className="inline-block bg-primary hover:opacity-90 text-white px-5 py-2.5 rounded-full text-sm font-medium transition-all shadow-sm"
            >
              {tContent("আবেদন করুন", "Apply Now")}
            </Link>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="border-t border-secondary/15 pt-5 flex flex-col md:flex-row items-center justify-between text-xs text-secondary/80 gap-3">
          <p>
            {tContent(
              footerContent?.copyrightText_bn ||
                "© ২০২৬ অঙ্কুর ফাউন্ডেশন। সর্বস্বত্ব সংরক্ষিত।",
              footerContent?.copyrightText_en ||
                "© 2026 Onkur Foundation. All Rights Reserved.",
            )}
          </p>
          <Link href="/admin" className="hover:underline hover:text-primary">
            {tContent("প্রশাসক লগইন", "Admin Login")}
          </Link>
        </div>
      </div>
    </footer>
  );
}
