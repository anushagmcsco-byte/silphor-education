import React from 'react';
import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';
import { SILPHOR_CONTACT } from '../data/silphorData';

interface FooterProps {
  onNavigate: (tab: 'home' | 'courses' | 'about' | 'contact') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#07172C] text-slate-400 text-xs border-t border-slate-800 py-12 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Brand & Logo */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <img
                src="/assets/aistudio/silphor_logo_1790265984763_c9b81bad.jpg"
                alt="Silphor Technologies Logo"
                className="w-9 h-9 rounded object-contain bg-white p-0.5"
                referrerPolicy="no-referrer"
              />
              <span className="text-base font-extrabold text-white tracking-tight">
                SILPHOR TECHNOLOGIES
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Industrial Semiconductor, VLSI Engineering &amp; EDA Tooling Platform. Design, Innovate, Verify, Deliver.
            </p>
            <div className="text-[11px] text-[#00828A] font-mono">
              Coordinates: {SILPHOR_CONTACT.coordinates}
            </div>
          </div>

          {/* Col 2: Engineering Courses */}
          <div className="space-y-2">
            <div className="font-bold text-white uppercase tracking-wider text-xs">
              Specialized Programs
            </div>
            <ul className="space-y-1.5 text-slate-400">
              <li>
                <button
                  onClick={() => onNavigate('courses')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Advanced VLSI Physical Design
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('courses')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  RTL &amp; SystemVerilog / UVM
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('courses')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  High-Speed Multilayer PCB Design
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('courses')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  ARM Cortex-M Embedded Firmware
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('courses')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Power Electronics &amp; EV Inverter
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Direct Contact Information */}
          <div className="space-y-2">
            <div className="font-bold text-white uppercase tracking-wider text-xs">
              Corporate Headquarters
            </div>
            <div className="space-y-1.5 text-slate-300">
              <p className="leading-relaxed">
                {SILPHOR_CONTACT.address}
              </p>
              <p className="text-amber-300 text-[11px]">
                Landmark: {SILPHOR_CONTACT.landmark}
              </p>
              <div className="pt-1 space-y-1">
                <a
                  href={`tel:${SILPHOR_CONTACT.phoneDial}`}
                  className="flex items-center gap-1.5 text-white hover:text-[#FF6B00] font-mono"
                >
                  <Phone className="w-3.5 h-3.5 text-[#FF6B00]" />
                  <span>{SILPHOR_CONTACT.phoneDisplay}</span>
                </a>
                <a
                  href={`mailto:${SILPHOR_CONTACT.email}`}
                  className="flex items-center gap-1.5 text-slate-300 hover:text-white font-mono"
                >
                  <Mail className="w-3.5 h-3.5 text-sky-400" />
                  <span>{SILPHOR_CONTACT.email}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Col 4: WhatsApp Admissions Desk */}
          <div className="space-y-3">
            <div className="font-bold text-white uppercase tracking-wider text-xs">
              Direct WhatsApp Desk
            </div>
            <p className="text-slate-400 text-xs">
              Admissions counselors are available for instant query resolution:
            </p>
            <a
              href={SILPHOR_CONTACT.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 py-2.5 px-4 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-xl text-xs font-bold shadow transition-colors cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>💬 +91 7829455663</span>
            </a>
            <div className="text-[11px] text-slate-400">
              {SILPHOR_CONTACT.workingHours}
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <div>
            © 2026 Silphor Technologies Pvt Ltd · Design · Innovate · Verify · Deliver
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => onNavigate('about')} className="hover:text-white cursor-pointer">About Us</button>
            <span>·</span>
            <button onClick={() => onNavigate('courses')} className="hover:text-white cursor-pointer">Courses</button>
            <span>·</span>
            <button onClick={() => onNavigate('contact')} className="hover:text-white cursor-pointer">Contact &amp; Campus</button>
          </div>
        </div>
      </div>
    </footer>
  );
};
