"use client";

import { motion } from "framer-motion";

type Photo = {
  src: string;
  title: string;
  description: string;
};

const ROW_ONE: Photo[] = [
  {
    src: "https://images.unsplash.com/photo-1596361803154-857df2de0a2c?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cnVyYWwlMjBsaWZlfGVufDB8fDB8fHww",
    title: "Rural Livelihoods",
    description: "Empowering families through sustainable farming.",
  },
  {
    src: "https://images.unsplash.com/photo-1562658601-0ae4a690ae1f?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cnVyYWwlMjBsaWZlfGVufDB8fDB8fHww",
    title: "Women Entrepreneurs",
    description: "Small loans that spark big dreams.",
  },
  {
    src: "https://plus.unsplash.com/premium_photo-1672738870962-1c5e638b667b?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cnVyYWwlMjBsaWZlfGVufDB8fDB8fHww",
    title: "Village Markets",
    description: "Connecting local producers to fair trade.",
  },
  {
    src: "https://images.unsplash.com/photo-1661534422993-ad363a871043?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHJ1cmFsJTIwbGlmZXxlbnwwfHwwfHx8MA%3D%3D",
    title: "Education Access",
    description: "Keeping rural children in school.",
  },
  {
    src: "https://images.unsplash.com/photo-1608815045016-294216dd282f?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHJ1cmFsJTIwbGlmZXxlbnwwfHwwfHx8MA%3D%3D",
    title: "Clean Water",
    description: "Safe drinking water for every household.",
  },
  {
    src: "https://images.unsplash.com/photo-1611502029437-54521b5e6ada?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cnVyYWwlMjBsaWZlfGVufDB8fDB8fHww",
    title: "Community Growth",
    description: "Together we build stronger villages.",
  },
];

const ROW_TWO: Photo[] = [
  {
    src: "https://media.istockphoto.com/id/2279011231/photo/elderly-woman-sitting-at-home-contemplating-rural-life-and-simple-existence.webp?a=1&b=1&s=612x612&w=0&k=20&c=Z5Xbcl0Cn8Jhv_ecITZlaVDFkWA4mtca-wmDAY31uAk=",
    title: "Elderly Care",
    description: "Dignity and support for our elders.",
  },
  {
    src: "https://images.unsplash.com/photo-1668352745852-893d2a2a1fda?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fHJ1cmFsJTIwbGlmZXxlbnwwfHwwfHx8MA%3D%3D",
    title: "Harvest Season",
    description: "Reaping the rewards of hard work.",
  },
  {
    src: "https://images.unsplash.com/photo-1715616609979-c397f2133f54?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzB8fHJ1cmFsJTIwbGlmZXxlbnwwfHwwfHx8MA%3D%3D",
    title: "Handicrafts",
    description: "Preserving traditional skills and crafts.",
  },
  {
    src: "https://plus.unsplash.com/premium_photo-1682092655459-2ba62ad1ee17?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzd8fHJ1cmFsJTIwbGlmZXxlbnwwfHwwfHx8MA%3D%3D",
    title: "Family Support",
    description: "Strengthening bonds, building futures.",
  },
  {
    src: "https://plus.unsplash.com/premium_photo-1682092642861-742c2a19d652?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTd8fHJ1cmFsJTIwbGlmZXxlbnwwfHwwfHx8MA%3D%3D",
    title: "Skill Training",
    description: "Vocational programs for self-reliance.",
  },
  {
    src: "https://plus.unsplash.com/premium_photo-1722704536864-5e02148bec33?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzZ8fHJ1cmFsJTIwbGlmZXxlbnwwfHwwfHx8MA%3D%3D",
    title: "Healthcare",
    description: "Bringing medical care to remote areas.",
  },
];

function MarqueeRow({
  images,
  direction = "left",
  duration = 40,
}: {
  images: Photo[];
  direction?: "left" | "right";
  duration?: number;
}) {
  // Duplicate for seamless looping
  const loop = [...images, ...images];

  return (
    <div className="relative overflow-hidden py-2">
      <motion.div
        className="flex gap-4 md:gap-6 w-max"
        animate={{
          x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
        }}
        transition={{
          duration,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {loop.map((photo, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.04, y: -6 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="group relative shrink-0 w-56 h-36 md:w-80 md:h-52 rounded-2xl overflow-hidden shadow-md ring-1 ring-black/5 cursor-pointer"
          >
            <img
              src={photo.src}
              alt={photo.title}
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              loading="lazy"
            />

            {/* Base subtle gradient (always visible) */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent transition-opacity duration-500 group-hover:opacity-0" />

            {/* Deep gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Caption */}
            <div className="absolute inset-x-0 bottom-0 p-4 md:p-5 z-10">
              <motion.h4
                initial={false}
                className="text-white font-bold text-sm md:text-base leading-tight translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out"
              >
                {photo.title}
              </motion.h4>
              <p className="text-white/80 text-[11px] md:text-xs mt-1 leading-snug translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-75 ease-out">
                {photo.description}
              </p>

              {/* Animated accent line */}
              <span className="block h-0.5 w-0 group-hover:w-10 bg-[#7EE0B8] rounded-full mt-2 transition-all duration-500 delay-150 ease-out" />
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-white to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-white to-transparent z-10" />
    </div>
  );
}

export default function PhotoMarquee() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="space-y-4 md:space-y-6 mb-20"
    >
      <MarqueeRow images={ROW_ONE} direction="left" duration={45} />
      <MarqueeRow images={ROW_TWO} direction="right" duration={55} />
    </motion.div>
  );
}
