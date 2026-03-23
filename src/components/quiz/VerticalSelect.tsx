"use client";

import {
  Code2, LayoutGrid, Palette, Rocket, Megaphone,
  BarChart3, HandshakeIcon, BriefcaseIcon,
} from "lucide-react";
import { Vertical, VERTICAL_LABELS } from "@/lib/experts";

const icons: Record<Vertical, React.ReactNode> = {
  product: <LayoutGrid className="w-5 h-5 sm:w-6 sm:h-6" />,
  engineering: <Code2 className="w-5 h-5 sm:w-6 sm:h-6" />,
  data: <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6" />,
  design: <Palette className="w-5 h-5 sm:w-6 sm:h-6" />,
  marketing: <Megaphone className="w-5 h-5 sm:w-6 sm:h-6" />,
  sales: <HandshakeIcon className="w-5 h-5 sm:w-6 sm:h-6" />,
  ops: <BriefcaseIcon className="w-5 h-5 sm:w-6 sm:h-6" />,
  founder: <Rocket className="w-5 h-5 sm:w-6 sm:h-6" />,
};

interface Props {
  onSelect: (vertical: Vertical) => void;
}

export function VerticalSelect({ onSelect }: Props) {
  const verticals = Object.keys(VERTICAL_LABELS) as Vertical[];

  return (
    <div className="w-full max-w-2xl mx-auto px-4 sm:px-0">
      <div className="text-center mb-6 sm:mb-8 flex flex-col gap-2">
        <h2 className="text-2xl sm:text-[32px] font-light font-serif text-white leading-[1.15] tracking-[-0.96px]">
          What&apos;s your field?
        </h2>
        <p className="text-white/80 text-base sm:text-lg font-medium leading-6">
          We&apos;ll match you with experts in your world.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
        {verticals.map((vertical) => (
          <button
            key={vertical}
            onClick={() => onSelect(vertical)}
            className="group flex items-center gap-2.5 px-3 py-2.5 sm:p-4 rounded-lg border border-white/10 bg-navy-900 text-left transition-colors hover:border-brand-blue-light/40 hover:bg-navy-800 focus:outline-none cursor-pointer"
          >
            <div className="flex-shrink-0 w-7 h-7 sm:w-9 sm:h-9 rounded-lg bg-navy-800 border border-white/10 flex items-center justify-center text-white/60 group-hover:text-white group-hover:bg-navy-700 transition-colors">
              {icons[vertical]}
            </div>
            <div className="font-semibold text-white text-xs sm:text-sm leading-tight">
              {VERTICAL_LABELS[vertical]}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
