"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface Testimonial {
  name_bn: string;
  name_en: string;
  location_bn: string;
  location_en: string;
  quote_bn: string;
  quote_en: string;
  imageUrl?: string;
}

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
}

export default function TestimonialCarousel({ testimonials }: TestimonialCarouselProps) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const [isHovered, setIsHovered] = useState(false);
  const { tContent } = useLanguage();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 150 : -150,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 150 : -150,
      opacity: 0
    })
  };

  const nextSlide = () => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    if (!isHovered && testimonials.length > 1) {
      timerRef.current = setInterval(nextSlide, 5000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isHovered, testimonials.length]);

  if (!testimonials || testimonials.length === 0) {
    return (
      <div className="text-center py-12 text-[#2B2621] font-normal">
        {tContent("কোনো প্রশংসাপত্র নেই।", "No testimonials available yet.")}
      </div>
    );
  }

  const current = testimonials[index];

  return (
    <div
      className="relative max-w-4xl mx-auto px-4 py-8"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-[320px] sm:h-[260px] md:h-[220px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="absolute w-full text-center flex flex-col items-center px-10 md:px-16"
          >
            <Quote className="w-10 h-10 text-[#C9973B] mb-4 opacity-40" />
            <p className="text-base sm:text-lg text-slate-800 font-medium leading-relaxed mb-6 italic">
              "{tContent(current.quote_bn, current.quote_en)}"
            </p>
            <div className="flex items-center gap-3">
              {current.imageUrl ? (
                <img
                  src={current.imageUrl}
                  alt={tContent(current.name_bn, current.name_en)}
                  className="w-12 h-12 rounded-full object-cover border-2 border-[#1F4A3D]"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-[#1F4A3D] text-[#FBF6EE] flex items-center justify-center font-bold text-lg">
                  {tContent(current.name_bn, current.name_en).charAt(0)}
                </div>
              )}
              <div className="text-left">
                <h4 className="font-bold text-slate-900 text-sm sm:text-base">
                  {tContent(current.name_bn, current.name_en)}
                </h4>
                <p className="text-xs text-slate-600 font-semibold">
                  {tContent(current.location_bn, current.location_en)}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Buttons */}
      {testimonials.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-[#1F4A3D] hover:bg-[#C65D2E] text-white p-2 rounded-full shadow-md transition-colors duration-200 focus:outline-none"
            aria-label="Previous Testimonial"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-[#1F4A3D] hover:bg-[#C65D2E] text-white p-2 rounded-full shadow-md transition-colors duration-200 focus:outline-none"
            aria-label="Next Testimonial"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </>
      )}

      {/* Dot Indicators */}
      {testimonials.length > 1 && (
        <div className="flex justify-center space-x-2 mt-6">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > index ? 1 : -1);
                setIndex(i);
              }}
              className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                i === index ? "bg-[#C65D2E]" : "bg-[#1F4A3D]/20 hover:bg-[#1F4A3D]/40"
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
