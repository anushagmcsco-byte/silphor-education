import React from 'react';
import { Building2, Cpu, Award, Users, CheckCircle2, ShieldCheck, MapPin, Phone, MessageCircle } from 'lucide-react';
import { SILPHOR_CONTACT } from '../data/silphorData';

interface AboutPageProps {
  onNavigate: (tab: 'home' | 'courses' | 'about' | 'contact') => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="py-10 space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero Intro */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#00828A]/10 text-[#00828A] text-xs font-bold uppercase tracking-wider border border-[#00828A]/30">
          <Building2 className="w-3.5 h-3.5" />
          <span>About Silphor Technologies</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0B2545] tracking-tight">
          Bridging Semiconductor Academia with Tier-1 Silicon Production
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Founded in Bengaluru, Silphor Technologies is an enterprise semiconductor distributor, EDA software licensing partner, and advanced VLSI workforce development platform.
        </p>
      </div>

      {/* 3 Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#0B2545] text-[#00828A] flex items-center justify-center font-bold">
            <Cpu className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-[#0B2545]">Sub-14nm &amp; 7nm PDK Access</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Students and corporate engineers work directly on industry-standard Process Design Kits (PDKs) with real foundry design rules, standard cell libraries, and signoff rule decks.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#0B2545] text-[#FF6B00] flex items-center justify-center font-bold">
            <Award className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-[#0B2545]">Senior Industry Faculty</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Our curriculum and live labs are conducted by principal engineers, STA leads, and hardware architects with 15 to 25+ years of experience across Intel, TI, Qualcomm, and Synopsys.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#0B2545] text-emerald-400 flex items-center justify-center font-bold">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-[#0B2545]">Physical Lab Infrastructure</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Our Malleswaram engineering center features cleanroom simulation suites, Xilinx FPGA development boards, Tektronix power analyzers, and high-bandwidth Rohde &amp; Schwarz oscilloscopes.
          </p>
        </div>
      </div>

      {/* Mission & Campus Info Card */}
      <div className="bg-[#07172C] text-white rounded-3xl p-8 sm:p-10 border border-slate-700 shadow-xl space-y-6">
        <div className="max-w-3xl space-y-2">
          <span className="text-xs font-mono text-[#00828A] font-bold uppercase tracking-wider">
            Our Philosophy
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Design · Innovate · Verify · Deliver
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-1">
            As global semiconductor design expands in India, the talent gap between fresh graduates and tape-out-ready engineers has widened. Silphor Technologies closes this gap by treating each course as an engineering project cycle: from architectural specification down to GDSII fabrication delivery.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-800 text-xs">
          <div className="space-y-1">
            <div className="text-slate-400 font-mono">CAMPUS LOCATION</div>
            <div className="text-white font-semibold">{SILPHOR_CONTACT.address}</div>
            <div className="text-amber-300">Landmark: {SILPHOR_CONTACT.landmark}</div>
          </div>
          <div className="space-y-1">
            <div className="text-slate-400 font-mono">CONTACT &amp; ADMISSIONS</div>
            <div className="text-white font-semibold">Hotline: {SILPHOR_CONTACT.phoneDisplay}</div>
            <div className="text-emerald-400">WhatsApp: +91 7829455663</div>
          </div>
        </div>

        <div className="pt-2 flex flex-wrap gap-3">
          <button
            onClick={() => onNavigate('contact')}
            className="px-5 py-2.5 bg-[#FF6B00] hover:bg-[#EA580C] text-white rounded-xl text-xs font-bold shadow cursor-pointer"
          >
            Schedule a Campus Visit
          </button>
          <a
            href={SILPHOR_CONTACT.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-xl text-xs font-bold shadow flex items-center gap-1.5 cursor-pointer"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Chat on WhatsApp (+91 7829455663)</span>
          </a>
        </div>
      </div>
    </div>
  );
};
