import React, { useState } from 'react';
import { Phone, MessageCircle, X } from 'lucide-react';
import { SILPHOR_CONTACT } from '../data/silphorData';

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  const handleWhatsAppClick = () => {
    window.open(SILPHOR_CONTACT.whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const handleCallClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.location.href = `tel:${SILPHOR_CONTACT.phoneDial}`;
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2 no-print">
      {/* Tooltip Notification Callout */}
      {showTooltip && (
        <div className="bg-white border border-slate-200 rounded-xl shadow-2xl p-3 max-w-xs text-xs text-slate-800 animate-in fade-in slide-in-from-bottom-2 duration-300 relative group">
          <button
            onClick={() => setShowTooltip(false)}
            className="absolute top-1.5 right-1.5 text-slate-400 hover:text-slate-600 p-0.5 rounded cursor-pointer"
            title="Dismiss"
          >
            <X className="w-3.5 h-3.5" />
          </button>

          <div className="flex items-center gap-2 mb-1.5 pr-4">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-bold text-[#0B2545] text-xs">Admissions Desk Online</span>
          </div>

          <p className="text-slate-600 text-[11px] leading-relaxed mb-2">
            Have questions about VLSI batches, fees, or campus visits? Chat directly with an engineer counselor.
          </p>

          <div className="flex items-center gap-2">
            <button
              onClick={handleWhatsAppClick}
              className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-md font-bold text-[11px] shadow-sm transition-transform active:scale-95 cursor-pointer"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp Chat</span>
            </button>
            <button
              onClick={handleCallClick}
              className="py-1.5 px-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md font-semibold text-[11px] transition-colors cursor-pointer"
              title="Direct Call"
            >
              <Phone className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Main Floating Trigger Button */}
      <button
        onClick={handleWhatsAppClick}
        aria-label="Chat on WhatsApp +91 7829455663"
        className="group relative flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white px-4 py-3 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
      >
        <span className="relative flex items-center justify-center">
          <MessageCircle className="w-6 h-6 fill-white text-white" />
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#0B2545]"></span>
          </span>
        </span>

        <div className="flex flex-col text-left">
          <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-950/80 leading-none">
            Chat on WhatsApp
          </span>
          <span className="text-xs font-mono font-extrabold text-white leading-tight">
            +91 7829455663
          </span>
        </div>
      </button>
    </div>
  );
};
