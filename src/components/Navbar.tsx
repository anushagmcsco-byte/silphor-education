import React from 'react';
import { Phone, MessageCircle, ArrowRight, Menu, X } from 'lucide-react';
import { SILPHOR_CONTACT } from '../data/silphorData';

interface NavbarProps {
  activeTab: 'home' | 'courses' | 'about' | 'contact';
  setActiveTab: (tab: 'home' | 'courses' | 'about' | 'contact') => void;
  onOpenEnroll: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenEnroll,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const handleNavClick = (tab: 'home' | 'courses' | 'about' | 'contact') => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#07172C] text-white border-b border-[#1E293B] shadow-md no-print">
      {/* Top Hotline Bar */}
      <div className="bg-[#0B2545] border-b border-slate-800 px-4 py-1.5 text-xs text-slate-300 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-[#00828A]">SILPHOR TECHNOLOGIES</span>
          <span>·</span>
          <span className="text-slate-300 hidden sm:inline">Malleswaram, Bangalore</span>
          <span>·</span>
          <span className="text-[#FF6B00] font-medium hidden md:inline">Winter 2026 Admissions Open</span>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono">
          <a
            href={`tel:${SILPHOR_CONTACT.phoneDial}`}
            className="flex items-center gap-1.5 text-slate-300 hover:text-white"
          >
            <Phone className="w-3.5 h-3.5 text-[#FF6B00]" />
            <span>{SILPHOR_CONTACT.phoneDisplay}</span>
          </a>
          <a
            href={SILPHOR_CONTACT.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-semibold"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>

      {/* Main Navigation Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-6">
        {/* Brand Zone */}
        <div
          onClick={() => handleNavClick('home')}
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
                ACADEMY
              </span>
            </div>
            <span className="text-[10px] text-slate-400 tracking-wider uppercase font-mono">
              DESIGN · INNOVATE · VERIFY · DELIVER
            </span>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          <button
            onClick={() => handleNavClick('home')}
            className={`px-3.5 py-2 text-sm font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'home'
                ? 'bg-[#0B2545] text-white border border-[#00828A]/60'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => handleNavClick('courses')}
            className={`px-3.5 py-2 text-sm font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'courses'
                ? 'bg-[#0B2545] text-white border border-[#00828A]/60'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            Courses &amp; Batches
          </button>
          <button
            onClick={() => handleNavClick('about')}
            className={`px-3.5 py-2 text-sm font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'about'
                ? 'bg-[#0B2545] text-white border border-[#00828A]/60'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            About Us
          </button>
          <button
            onClick={() => handleNavClick('contact')}
            className={`px-3.5 py-2 text-sm font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'contact'
                ? 'bg-[#0B2545] text-white border border-[#00828A]/60'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            Contact &amp; Campus
          </button>
        </nav>

        {/* Action Button: Intellipaat Orange CTA */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href={SILPHOR_CONTACT.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-lg text-xs font-bold shadow-sm transition-transform active:scale-95 cursor-pointer whitespace-nowrap"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>+91 7829455663</span>
          </a>

          <button
            onClick={onOpenEnroll}
            className="px-4 py-2 bg-[#FF6B00] hover:bg-[#EA580C] text-white rounded-lg text-xs sm:text-sm font-bold shadow-md transition-transform active:scale-95 cursor-pointer whitespace-nowrap"
          >
            Apply Now
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-300 hover:text-white rounded-lg"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0B2545] border-t border-slate-800 px-4 py-3 space-y-2 text-xs">
          <button
            onClick={() => handleNavClick('home')}
            className={`w-full text-left py-2 px-3 rounded font-semibold ${
              activeTab === 'home' ? 'bg-[#FF6B00] text-white' : 'text-slate-200'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => handleNavClick('courses')}
            className={`w-full text-left py-2 px-3 rounded font-semibold ${
              activeTab === 'courses' ? 'bg-[#FF6B00] text-white' : 'text-slate-200'
            }`}
          >
            Courses &amp; Batches
          </button>
          <button
            onClick={() => handleNavClick('about')}
            className={`w-full text-left py-2 px-3 rounded font-semibold ${
              activeTab === 'about' ? 'bg-[#FF6B00] text-white' : 'text-slate-200'
            }`}
          >
            About Us
          </button>
          <button
            onClick={() => handleNavClick('contact')}
            className={`w-full text-left py-2 px-3 rounded font-semibold ${
              activeTab === 'contact' ? 'bg-[#FF6B00] text-white' : 'text-slate-200'
            }`}
          >
            Contact &amp; Campus
          </button>
          <a
            href={SILPHOR_CONTACT.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-1.5 py-2.5 bg-[#25D366] text-white rounded font-bold"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Chat on WhatsApp (+91 7829455663)</span>
          </a>
        </div>
      )}
    </header>
  );
};
