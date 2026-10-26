import React from 'react';
import { BookOpen, Sparkles, Printer, BookmarkCheck, Search, Award } from 'lucide-react';

interface HeaderProps {
  activeTab: 'notes' | 'tracks' | 'visualizer' | 'flashcards' | 'cheatsheet' | 'print';
  setActiveTab: (tab: 'notes' | 'tracks' | 'visualizer' | 'flashcards' | 'cheatsheet' | 'print') => void;
  masteredCount: number;
  totalTopics: number;
  bookmarkedCount: number;
  onOpenBookmarks: () => void;
  onPrintNotes: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  masteredCount,
  totalTopics,
  bookmarkedCount,
  onOpenBookmarks,
  onPrintNotes,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#07172C] text-white border-b border-[#1E293B] shadow-md no-print">
      {/* Top micro-announcement bar in Intellipaat style */}
      <div className="bg-[#0B2545] border-b border-slate-800/80 px-4 py-1 text-xs text-slate-300 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-[#00828A]">SILPHOR TECHNOLOGIES</span>
          <span>·</span>
          <span className="text-slate-300 hidden sm:inline">Industrial Semiconductor & VLSI Engineering Portal</span>
          <span>·</span>
          <span className="text-[#FF6B00] font-medium hidden md:inline">Tier-1 EDA Curriculum & Study Notes</span>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5 text-slate-300">
            <Award className="w-3.5 h-3.5 text-[#FF6B00]" />
            <span>Mastery:</span>
            <span className="font-mono font-bold text-white tabular-nums">
              {masteredCount}/{totalTopics}
            </span>
          </div>
          {bookmarkedCount > 0 && (
            <button
              onClick={onOpenBookmarks}
              className="flex items-center gap-1 text-[#00828A] hover:text-white transition-colors cursor-pointer"
            >
              <BookmarkCheck className="w-3.5 h-3.5" />
              <span>{bookmarkedCount} Saved</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
        {/* Brand Zone: Silphor Logo matching user uploaded asset */}
        <div 
          onClick={() => setActiveTab('notes')}
          className="flex items-center gap-3 cursor-pointer select-none shrink-0"
        >
          <img
            src="/assets/aistudio/silphor_logo_1790265984763_c9b81bad.jpg"
            alt="Silphor Technologies Logo"
            className="w-11 h-11 rounded-md object-contain bg-white p-0.5 shadow-sm border border-slate-700"
            referrerPolicy="no-referrer"
          />
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-lg font-extrabold tracking-tight text-white font-sans">
                SILPHOR
              </span>
              <span className="text-xs uppercase tracking-widest px-1.5 py-0.5 rounded bg-[#00828A]/20 text-[#00828A] font-bold border border-[#00828A]/40">
                STUDY HUB
              </span>
            </div>
            <span className="text-[10px] text-slate-400 tracking-wider uppercase font-mono">
              DESIGN · INNOVATE · VERIFY · DELIVER
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          <button
            onClick={() => setActiveTab('notes')}
            className={`px-3 py-2 text-sm font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'notes'
                ? 'bg-[#0B2545] text-white border border-[#00828A]/60 shadow-inner'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            Study Notes
          </button>
          <button
            onClick={() => setActiveTab('tracks')}
            className={`px-3 py-2 text-sm font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'tracks'
                ? 'bg-[#0B2545] text-white border border-[#00828A]/60 shadow-inner'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            5 Course Tracks
          </button>
          <button
            onClick={() => setActiveTab('visualizer')}
            className={`px-3 py-2 text-sm font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'visualizer'
                ? 'bg-[#0B2545] text-white border border-[#00828A]/60 shadow-inner'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            Interactive Visualizers
          </button>
          <button
            onClick={() => setActiveTab('flashcards')}
            className={`px-3 py-2 text-sm font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'flashcards'
                ? 'bg-[#0B2545] text-white border border-[#00828A]/60 shadow-inner'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            Flashcards & Quizzes
          </button>
          <button
            onClick={() => setActiveTab('cheatsheet')}
            className={`px-3 py-2 text-sm font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'cheatsheet'
                ? 'bg-[#0B2545] text-white border border-[#00828A]/60 shadow-inner'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            Formula Cheat Sheet
          </button>
        </nav>

        {/* Primary Action Button: Intellipaat high-contrast orange CTA */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onPrintNotes}
            title="Download or Print Curated Study Notes"
            className="flex items-center gap-2 px-4 py-2 text-xs md:text-sm font-bold text-white bg-[#FF6B00] hover:bg-[#EA580C] rounded-lg shadow-md transition-transform active:scale-95 cursor-pointer whitespace-nowrap shrink-0"
          >
            <Printer className="w-4 h-4" />
            <span>Export Notes (PDF)</span>
          </button>
        </div>
      </div>

      {/* Mobile nav scrollbar */}
      <div className="flex md:hidden overflow-x-auto px-4 py-2 gap-2 border-t border-slate-800/60 bg-[#07172C] text-xs">
        <button
          onClick={() => setActiveTab('notes')}
          className={`px-3 py-1.5 rounded font-semibold whitespace-nowrap ${
            activeTab === 'notes' ? 'bg-[#FF6B00] text-white' : 'text-slate-300'
          }`}
        >
          Notes
        </button>
        <button
          onClick={() => setActiveTab('tracks')}
          className={`px-3 py-1.5 rounded font-semibold whitespace-nowrap ${
            activeTab === 'tracks' ? 'bg-[#FF6B00] text-white' : 'text-slate-300'
          }`}
        >
          Courses
        </button>
        <button
          onClick={() => setActiveTab('visualizer')}
          className={`px-3 py-1.5 rounded font-semibold whitespace-nowrap ${
            activeTab === 'visualizer' ? 'bg-[#FF6B00] text-white' : 'text-slate-300'
          }`}
        >
          Visualizers
        </button>
        <button
          onClick={() => setActiveTab('flashcards')}
          className={`px-3 py-1.5 rounded font-semibold whitespace-nowrap ${
            activeTab === 'flashcards' ? 'bg-[#FF6B00] text-white' : 'text-slate-300'
          }`}
        >
          Flashcards
        </button>
        <button
          onClick={() => setActiveTab('cheatsheet')}
          className={`px-3 py-1.5 rounded font-semibold whitespace-nowrap ${
            activeTab === 'cheatsheet' ? 'bg-[#FF6B00] text-white' : 'text-slate-300'
          }`}
        >
          Cheat Sheet
        </button>
      </div>
    </header>
  );
};
