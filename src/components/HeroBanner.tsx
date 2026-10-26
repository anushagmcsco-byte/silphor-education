import React from 'react';
import { Search, Sparkles, Cpu, BookOpen, CheckCircle2, Bookmark, Lightbulb, Terminal } from 'lucide-react';

interface HeroBannerProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  masteredCount: number;
  totalTopics: number;
  bookmarkedOnly: boolean;
  setBookmarkedOnly: (val: boolean) => void;
  onOpenQuickReview: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  masteredCount,
  totalTopics,
  bookmarkedOnly,
  setBookmarkedOnly,
  onOpenQuickReview,
}) => {
  const categories = [
    { id: 'ALL', label: 'All Disciplines' },
    { id: 'VLSI', label: 'VLSI & Physical Design' },
    { id: 'Verification', label: 'RTL & UVM Verification' },
    { id: 'PCB', label: 'High-Speed PCB Design' },
    { id: 'Embedded', label: 'ARM Cortex Firmware' },
    { id: 'Power Electronics', label: 'Power & E-Mobility' },
  ];

  const masteryPercentage = Math.round((masteredCount / (totalTopics || 1)) * 100);

  return (
    <div className="bg-gradient-to-b from-[#07172C] via-[#0B2545] to-[#0D2D54] text-white border-b border-slate-700/60 shadow-lg no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Hero Title & Description */}
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#00828A]/20 border border-[#00828A]/50 text-[#00828A] text-xs font-semibold">
              <Cpu className="w-3.5 h-3.5" />
              <span>Extracted & Synthesized from Silphor Technologies Engineering Programs</span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white leading-tight">
              High-Yield Study Notes &amp; Mastery Dashboard
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
              Clear, bite-sized summaries, foundational analogies, timing formulas, and interview essentials for semiconductor, VLSI, and electronics systems engineering.
            </p>

            {/* High-Contrast Search Bar */}
            <div className="pt-2 relative max-w-xl">
              <div className="relative flex items-center">
                <Search className="absolute left-3.5 w-5 h-5 text-slate-400 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search topics, formulas, EDA tools (e.g., CTS, UVM, Clock Skew, FreeRTOS, FOC)..."
                  className="w-full pl-11 pr-24 py-3 bg-white text-slate-900 rounded-lg shadow-md text-sm font-medium placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FF6B00] border border-slate-300"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2 px-2.5 py-1 text-xs font-semibold text-slate-500 hover:text-slate-800 bg-slate-100 rounded cursor-pointer"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer whitespace-nowrap ${
                    selectedCategory === cat.id
                      ? 'bg-[#FF6B00] text-white shadow-sm font-bold'
                      : 'bg-[#0B2545]/90 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-600/60'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
              
              <button
                onClick={() => setBookmarkedOnly(!bookmarkedOnly)}
                className={`flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer whitespace-nowrap ${
                  bookmarkedOnly
                    ? 'bg-[#00828A] text-white shadow-sm font-bold'
                    : 'bg-[#0B2545]/90 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-600/60'
                }`}
              >
                <Bookmark className="w-3 h-3" />
                <span>Saved Only</span>
              </button>
            </div>
          </div>

          {/* Right Column: User Progress & Quick Stats Card (Intellipaat card style) */}
          <div className="lg:col-span-4 bg-[#07172C] rounded-xl p-5 border border-slate-700 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Your Learning Progress
              </span>
              <span className="text-xs font-mono font-bold text-[#FF6B00] bg-[#FF6B00]/10 px-2 py-0.5 rounded border border-[#FF6B00]/30">
                {masteryPercentage}% Complete
              </span>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-medium text-slate-300">
                <span>Concepts Mastered</span>
                <span className="font-mono tabular-nums font-bold text-white">
                  {masteredCount} of {totalTopics}
                </span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-[#00828A] to-[#FF6B00] h-2.5 rounded-full transition-all duration-500"
                  style={{ width: `${masteryPercentage}%` }}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-center pt-2">
              <div className="bg-[#0B2545] p-2.5 rounded-lg border border-slate-700/80">
                <div className="text-lg font-bold text-white font-mono tabular-nums">5</div>
                <div className="text-[11px] text-slate-400">Core Tracks</div>
              </div>
              <div className="bg-[#0B2545] p-2.5 rounded-lg border border-slate-700/80">
                <div className="text-lg font-bold text-[#00828A] font-mono tabular-nums">100%</div>
                <div className="text-[11px] text-slate-400">Tier-1 EDA Aligned</div>
              </div>
            </div>

            <button
              onClick={onOpenQuickReview}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-[#00828A] hover:bg-[#006e75] text-white rounded-lg text-xs font-bold transition-colors cursor-pointer shadow"
            >
              <Lightbulb className="w-4 h-4 text-amber-300" />
              <span>Launch Quick 5-Min Revision</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
