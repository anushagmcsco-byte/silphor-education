import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageCircle, 
  Send, 
  CheckCircle2, 
  Compass, 
  Building2, 
  ExternalLink 
} from 'lucide-react';
import { SILPHOR_CONTACT, SILPHOR_COURSES_DATA } from '../data/silphorData';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: 'Advanced VLSI Design & Physical Implementation',
    mode: 'Hybrid (Lab + Online)',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleSendViaWhatsApp = () => {
    const text = `*New Admission Inquiry - Silphor Technologies*%0A%0A*Name:* ${encodeURIComponent(formData.name || 'Prospective Student')}%0A*Phone:* ${encodeURIComponent(formData.phone || 'Not provided')}%0A*Email:* ${encodeURIComponent(formData.email || 'Not provided')}%0A*Course:* ${encodeURIComponent(formData.course)}%0A*Mode:* ${encodeURIComponent(formData.mode)}%0A*Message:* ${encodeURIComponent(formData.message || 'I would like to inquire about admission, fee structure, and upcoming batches.')}`;
    window.open(`https://wa.me/917829455663?text=${text}`, '_blank');
  };

  return (
    <div className="py-10 space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Page Title & Intro */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#00828A]/10 text-[#00828A] text-xs font-bold uppercase tracking-wider border border-[#00828A]/30">
          <Building2 className="w-3.5 h-3.5" />
          <span>Connect with Silphor Technologies</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0B2545] tracking-tight">
          Admissions, Corporate Training &amp; Campus Center
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Speak with our principal semiconductor faculty, schedule an in-person cleanroom lab walkthrough, or reserve your seat for the upcoming cohorts in Bengaluru.
        </p>
      </div>

      {/* Main Grid: Contact Details & Inquiry Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Official Contact Directory & Address */}
        <div className="lg:col-span-5 space-y-6">
          {/* Main Headquarters Card */}
          <div className="bg-[#07172C] text-white rounded-2xl p-6 sm:p-7 border border-slate-700 shadow-xl space-y-6">
            <div className="border-b border-slate-700 pb-4">
              <span className="text-[11px] font-mono text-[#00828A] uppercase font-bold tracking-wider">
                Corporate Headquarters &amp; Semiconductor Center
              </span>
              <h2 className="text-xl font-bold text-white mt-1">
                Silphor Technologies Bengaluru
              </h2>
            </div>

            {/* Address with coordinates & landmark */}
            <div className="space-y-4 text-xs sm:text-sm text-slate-300">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#FF6B00] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <div className="font-semibold text-white">Physical Address:</div>
                  <p className="text-slate-300 leading-relaxed">
                    {SILPHOR_CONTACT.address}
                  </p>
                  <div className="text-xs text-amber-300 font-medium pt-0.5">
                    <strong>Landmark:</strong> {SILPHOR_CONTACT.landmark}
                  </div>
                  <div className="text-[11px] font-mono text-[#00828A] pt-0.5 flex items-center gap-1">
                    <Compass className="w-3 h-3" />
                    <span>Coordinates: {SILPHOR_CONTACT.coordinates}</span>
                  </div>
                </div>
              </div>

              {/* Telephone & WhatsApp */}
              <div className="flex items-start gap-3 pt-2 border-t border-slate-800">
                <Phone className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <div className="font-semibold text-white">Direct Telephone &amp; WhatsApp:</div>
                  <div className="flex flex-wrap items-center gap-3">
                    <a
                      href={`tel:${SILPHOR_CONTACT.phoneDial}`}
                      className="text-base font-bold font-mono text-white hover:text-[#FF6B00] transition-colors"
                    >
                      {SILPHOR_CONTACT.phoneDisplay}
                    </a>
                  </div>
                  <a
                    href={SILPHOR_CONTACT.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 font-semibold pt-0.5"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>💬 Chat on WhatsApp (+91 7829455663)</span>
                  </a>
                </div>
              </div>

              {/* Electronic Mail */}
              <div className="flex items-start gap-3 pt-2 border-t border-slate-800">
                <Mail className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <div className="font-semibold text-white">Official Electronic Mail:</div>
                  <a
                    href={`mailto:${SILPHOR_CONTACT.email}`}
                    className="text-xs sm:text-sm font-mono text-sky-300 hover:underline"
                  >
                    {SILPHOR_CONTACT.email}
                  </a>
                </div>
              </div>

              {/* Working Hours */}
              <div className="flex items-start gap-3 pt-2 border-t border-slate-800">
                <Clock className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <div className="font-semibold text-white">Operational Hours:</div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {SILPHOR_CONTACT.workingHours}
                  </p>
                  <p className="text-[11px] text-slate-400 italic">
                    {SILPHOR_CONTACT.emergencyAdmissions}
                  </p>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Callout Button */}
            <div className="pt-2">
              <a
                href={SILPHOR_CONTACT.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-xl font-bold text-xs sm:text-sm shadow-md transition-all active:scale-98 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Start Direct WhatsApp Conversation</span>
              </a>
            </div>
          </div>

          {/* Quick Directions Card */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-2">
            <h3 className="text-xs font-bold text-[#0B2545] uppercase tracking-wider">
              Transit &amp; Visiting Malleswaram Campus
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Located in the central engineering corridor of Malleswaram, 5 minutes from the Sampige Road Metro Station and directly opposite the 8th Cross Cultural Hub. Visitors are welcome during regular operational hours.
            </p>
            <div className="pt-1">
              <a
                href="https://maps.google.com/?q=13.0031,77.5685"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#00828A] hover:underline"
              >
                <span>View on Google Maps (13.0031° N, 77.5685° E)</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Admission & Inquiry Form */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-6">
          <div className="space-y-1 pb-2 border-b border-slate-100">
            <h2 className="text-xl font-bold text-[#0B2545] tracking-tight">
              Request Course Brochure &amp; Consultation
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Submit your inquiry below or transfer straight to WhatsApp for instant counselor response.
            </p>
          </div>

          {isSubmitted ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-8 text-center space-y-4 animate-in fade-in duration-300">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-emerald-950">
                  Inquiry Received Successfully!
                </h3>
                <p className="text-xs sm:text-sm text-emerald-800 max-w-md mx-auto">
                  Thank you, <strong>{formData.name}</strong>. An admissions counselor from Silphor Technologies has been notified and will reach out to you at <strong>{formData.phone || formData.email}</strong> shortly.
                </p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={handleSendViaWhatsApp}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-lg font-bold text-xs shadow cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Forward Details to WhatsApp (+91 7829455663)</span>
                </button>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="w-full sm:w-auto px-4 py-2 bg-white text-slate-700 hover:bg-slate-100 border border-slate-200 rounded-lg text-xs font-semibold cursor-pointer"
                >
                  Submit Another Inquiry
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Ramesh Hegde"
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
                  />
                </div>

                {/* Email Address */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. ramesh@example.com"
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Mobile / WhatsApp Number */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">
                    Mobile / WhatsApp Number <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
                  />
                </div>

                {/* Training Mode */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">
                    Preferred Training Mode
                  </label>
                  <select
                    value={formData.mode}
                    onChange={(e) => setFormData({ ...formData, mode: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
                  >
                    <option value="Hybrid (Lab + Online)">Hybrid (Lab in Malleswaram + Online)</option>
                    <option value="Classroom Lab">100% In-Person Classroom Lab</option>
                    <option value="Online Live">Online Live Cohort</option>
                  </select>
                </div>
              </div>

              {/* Course Selection */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">
                  Target Engineering Discipline
                </label>
                <select
                  value={formData.course}
                  onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
                >
                  {SILPHOR_COURSES_DATA.map((c) => (
                    <option key={c.id} value={c.title}>
                      {c.title} ({c.duration})
                    </option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">
                  Your Background or Specific Inquiries
                </label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us about your educational background (B.Tech/M.Tech, year of graduation) and when you would like to join..."
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="submit"
                  className="w-full sm:flex-1 py-3 px-4 bg-[#FF6B00] hover:bg-[#EA580C] text-white rounded-xl font-bold text-xs sm:text-sm shadow-md transition-all active:scale-98 cursor-pointer flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Application Inquiry</span>
                </button>

                <button
                  type="button"
                  onClick={handleSendViaWhatsApp}
                  className="w-full sm:w-auto py-3 px-4 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-xl font-bold text-xs sm:text-sm shadow-sm transition-all active:scale-98 cursor-pointer flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send via WhatsApp (+91 7829455663)</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
