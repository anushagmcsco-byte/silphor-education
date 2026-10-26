import React, { useState } from 'react';
import { X, CheckCircle2, MessageCircle, Send, Award, Phone } from 'lucide-react';
import { Course, SILPHOR_CONTACT } from '../data/silphorData';

interface EnrollModalProps {
  course: Course | null;
  isOpen: boolean;
  onClose: () => void;
}

export const EnrollModal: React.FC<EnrollModalProps> = ({ course, isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [batchId, setBatchId] = useState(course?.batches[0]?.id || '');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen || !course) return null;

  const handleEnroll = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
  };

  const handleWhatsAppForward = () => {
    const selectedBatch = course.batches.find((b) => b.id === batchId) || course.batches[0];
    const text = `*New Batch Registration - Silphor Technologies*%0A%0A*Name:* ${encodeURIComponent(name || 'Student')}%0A*Phone:* ${encodeURIComponent(phone)}%0A*Email:* ${encodeURIComponent(email)}%0A*Course:* ${encodeURIComponent(course.title)}%0A*Selected Cohort:* ${encodeURIComponent(selectedBatch.name + ' (' + selectedBatch.startDate + ')')}%0A*Fee:* ₹${course.feeINR.toLocaleString('en-IN')}`;
    window.open(`https://wa.me/917829455663?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto no-print">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden animate-in fade-in duration-200">
        {/* Modal Header */}
        <div className="bg-[#07172C] text-white p-5 flex items-center justify-between border-b border-slate-700">
          <div>
            <span className="text-[10px] font-mono uppercase text-[#00828A] font-bold">
              {course.trackCode} · FastTrack Admission
            </span>
            <h3 className="text-base sm:text-lg font-bold text-white">
              Enroll in {course.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {isSuccess ? (
            <div className="text-center space-y-4 py-4">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <div className="space-y-1">
                <h4 className="text-lg font-bold text-slate-900">
                  Seat Reservation Requested!
                </h4>
                <p className="text-xs text-slate-600 max-w-sm mx-auto">
                  We have registered your interest for <strong>{course.title}</strong>. Our admissions coordinator will call you at <strong>{phone}</strong> to confirm your slot.
                </p>
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <button
                  onClick={handleWhatsAppForward}
                  className="w-full py-2.5 px-4 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-xl text-xs font-bold shadow flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Confirm Instantly on WhatsApp (+91 7829455663)</span>
                </button>
                <button
                  onClick={onClose}
                  className="w-full py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleEnroll} className="space-y-4">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                <div>
                  <div className="text-slate-500 font-medium">Standard Program Fee</div>
                  <div className="text-base font-extrabold text-[#0B2545] font-mono">
                    ₹{course.feeINR.toLocaleString('en-IN')}
                  </div>
                </div>
                <div className="text-right text-[11px] text-slate-500">
                  <div>Duration: <strong>{course.duration}</strong></div>
                  <div>Mode: <strong>{course.mode}</strong></div>
                </div>
              </div>

              {/* Select Batch */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">
                  Select Cohort / Batch Schedule
                </label>
                <select
                  value={batchId}
                  onChange={(e) => setBatchId(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
                >
                  {course.batches.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.name} — Starts {b.startDate} ({b.timing})
                    </option>
                  ))}
                </select>
              </div>

              {/* Full Name */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">
                  Your Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Ananya Sharma"
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
                />
              </div>

              {/* Phone */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">
                  Mobile / WhatsApp Number <span className="text-rose-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
                />
              </div>

              {/* Email */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">
                  Email Address <span className="text-rose-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ananya@example.com"
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
                />
              </div>

              <div className="pt-2 flex items-center gap-3">
                <button
                  type="submit"
                  className="flex-1 py-2.5 px-4 bg-[#FF6B00] hover:bg-[#EA580C] text-white rounded-xl text-xs font-bold shadow transition-colors cursor-pointer"
                >
                  Confirm Registration
                </button>
                <button
                  type="button"
                  onClick={handleWhatsAppForward}
                  className="py-2.5 px-3 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-xl text-xs font-bold shadow flex items-center gap-1.5 cursor-pointer"
                  title="Direct WhatsApp"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span className="hidden sm:inline">WhatsApp</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
