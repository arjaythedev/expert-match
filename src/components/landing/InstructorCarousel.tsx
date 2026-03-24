"use client";

import { motion } from "framer-motion";
import { Zap, BookOpen, User } from "lucide-react";

interface CarouselItem {
  type: "expert" | "lesson" | "course";
  name: string;
  subtitle: string;
  imgUrl?: string;
}

// Mix of real experts, lessons, and courses from our catalog
const ROW_1: CarouselItem[] = [
  { type: "expert", name: "Ethan Evans", subtitle: "Retired Amazon VP, 70+ Patents", imgUrl: "https://d2426xcxuh3ht5.cloudfront.net/PjUkSV6AQbOJCG9tdbBw_EE.jpeg" },
  { type: "lesson", name: "Executive Presence for Poor Public Speakers", subtitle: "Ethan Evans" },
  { type: "expert", name: "Dr. Marily Nika", subtitle: "Gen AI PM Lead at Google", imgUrl: "https://d2426xcxuh3ht5.cloudfront.net/pSuhPzFyTmbEtsDy5rUY_marily-nika.jpeg" },
  { type: "course", name: "World Class Product Sense in Practice", subtitle: "Shreyas Doshi" },
  { type: "expert", name: "Anna Arteeva", subtitle: "Former Head of Design at Payoneer", imgUrl: "https://d2426xcxuh3ht5.cloudfront.net/T2bw6YitTltsiFUHosri_anna_arteeva.png" },
  { type: "lesson", name: "Build ANY AI Product in Hours, Not Months", subtitle: "Pawel Huryn" },
  { type: "expert", name: "Cassie Kozyrkov", subtitle: "Former Chief Decision Science Officer, Google", imgUrl: "https://d2426xcxuh3ht5.cloudfront.net/cU5KbysaQHyNprN3AAvH_1709746519023.jpeg" },
  { type: "course", name: "AI Evals For Engineers & PMs", subtitle: "Parlance Labs" },
];

const ROW_2: CarouselItem[] = [
  { type: "expert", name: "Harold Dijkstra", subtitle: "AI Agents & Vibe Coding Bootcamp", imgUrl: "https://d2426xcxuh3ht5.cloudfront.net/rdVrwqSNSuqWtEk8MWoW_Harold%20Dijkstra%20100%20School.png" },
  { type: "course", name: "AI Product Management Certification", subtitle: "Product Faculty" },
  { type: "expert", name: "Jared Spool", subtitle: "Expert in UX Strategy", imgUrl: "https://d2426xcxuh3ht5.cloudfront.net/qr1RmhOT32U0OE6Dckcw_Jared-headshot.png" },
  { type: "lesson", name: "Building Conversational AI Products", subtitle: "Dr. Marily Nika" },
  { type: "expert", name: "Everett Berry", subtitle: "Head of GTM Engineering at Clay", imgUrl: "https://d2426xcxuh3ht5.cloudfront.net/sMDdYMErSYmwuvP619TO_1710209431139.jpeg" },
  { type: "lesson", name: "The 100x Product Builder: Claude Code Architect", subtitle: "Carl Vellotti" },
  { type: "expert", name: "Joey Banks", subtitle: "Previously at Figma, Twitter, and Webflow", imgUrl: "https://d2426xcxuh3ht5.cloudfront.net/ECzmBA4MRNG0QDAnOfBj_Banks_Joey_Square.jpg" },
  { type: "course", name: "Building Agentic AI Applications", subtitle: "Aishwarya Kiriti" },
];

const ROW_3: CarouselItem[] = [
  { type: "expert", name: "Mahesh Yadav", subtitle: "Former GenAI Product Lead at MAANG", imgUrl: "https://d2426xcxuh3ht5.cloudfront.net/KvgFAzZDR9Sn4tgDSe0t_Image%203-23-25%20at%207.52%E2%80%AFAM.jpeg" },
  { type: "lesson", name: "Building AI Agents: Bootcamp Demo", subtitle: "Amir Feizpour" },
  { type: "expert", name: "Vitaly Friedman", subtitle: "Co Founder of Smashing Magazine", imgUrl: "https://d2426xcxuh3ht5.cloudfront.net/Cjsa1KYSWdyq37uwnFew_vitaly.jpeg" },
  { type: "course", name: "Designing with AI: From Concept to Production", subtitle: "Brooke Katalinich" },
  { type: "expert", name: "Ben Erez", subtitle: "Former Meta PM", imgUrl: "https://d2426xcxuh3ht5.cloudfront.net/d2oS4vDSQ423FnKjjaHz_Ben%20Headshot%20Dec%202018%20square.jpg" },
  { type: "lesson", name: "No Vibes, Just Evals: Frameworks for AI PMs", subtitle: "Jason P. Yoong" },
  { type: "expert", name: "Elena Luneva", subtitle: "VP GoFundMe, Former GM at Nextdoor", imgUrl: "https://d2426xcxuh3ht5.cloudfront.net/sUTxr1tRRJqeXkrGnnFY_Elena%20L.jpeg" },
  { type: "course", name: "GTM Engineering Mastery", subtitle: "Everett Berry" },
];

function CarouselCard({ item }: { item: CarouselItem }) {
  const icon = item.type === "expert"
    ? <User className="w-3 h-3" />
    : item.type === "lesson"
    ? <Zap className="w-3 h-3" />
    : <BookOpen className="w-3 h-3" />;

  const label = item.type === "expert" ? "Expert" : item.type === "lesson" ? "Lesson" : "Course";

  const borderColor = item.type === "expert"
    ? "border-lime/10"
    : "border-brand-blue/10";

  const labelColor = item.type === "expert"
    ? "text-lime/50"
    : "text-brand-blue-light/50";

  return (
    <div className={`flex-shrink-0 w-[230px] bg-navy-900 border ${borderColor} rounded-xl p-4`}>
      <div className={`flex items-center gap-1.5 ${labelColor} mb-2.5`}>
        {icon}
        <span className="text-[10px] uppercase tracking-wider font-medium">{label}</span>
      </div>
      <div className="flex items-start gap-3">
        {item.imgUrl && (
          <div className="w-11 h-11 rounded-lg overflow-hidden bg-navy-700 flex-shrink-0 border border-navy-600">
            <img
              src={item.imgUrl}
              alt={item.name}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        )}
        <div className="min-w-0">
          <p className="text-sm font-medium text-white leading-tight line-clamp-2">{item.name}</p>
          <p className="text-[11px] text-white/40 mt-1 line-clamp-1">{item.subtitle}</p>
        </div>
      </div>
    </div>
  );
}

function CarouselRow({ items, direction, duration }: { items: CarouselItem[]; direction: "left" | "right"; duration: number }) {
  // Double the items for seamless loop
  const doubled = [...items, ...items];
  const totalWidth = items.length * 236; // 220px card + 16px gap

  return (
    <div className="overflow-hidden">
      <motion.div
        className="flex gap-4"
        animate={{
          x: direction === "left" ? [0, -totalWidth] : [-totalWidth, 0],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration,
            ease: "linear",
          },
        }}
      >
        {doubled.map((item, i) => (
          <CarouselCard key={`${item.name}-${i}`} item={item} />
        ))}
      </motion.div>
    </div>
  );
}

export function InstructorCarousel() {
  return (
    <div className="absolute inset-0 flex flex-col justify-center gap-5 opacity-95">
      <CarouselRow items={ROW_1} direction="left" duration={40} />
      <CarouselRow items={ROW_2} direction="right" duration={45} />
      <CarouselRow items={ROW_3} direction="left" duration={42} />
    </div>
  );
}
