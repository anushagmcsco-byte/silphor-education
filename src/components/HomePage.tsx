import React from 'react';
import { Cpu, ArrowRight, Clock, MapPin, CheckCircle2, Phone, MessageCircle } from 'lucide-react';
import { SILPHOR_COURSES_DATA, SILPHOR_CONTACT, SILPHOR_STATS, TESTIMONIALS, EDA_PARTNERS, Course } from '../data/silphorData';

interface HomePageProps {
  onNavigate: (tab: 'home' | 'courses' | 'about' | 'contact') => void;
  onSelectCourse: (course: Course) => void;
  onEnrollCourse: (course: Course) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onSelectCourse,
  onEnrollCourse,
}) => {
  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-[#07172C] via-[#0B2545] to-[#0A1F3B] text-white py-12 md:py-18 border-b border-slate-700/80 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#00828A]/20 border border-[#00828A]/50 text-[#00828A] text-xs font-bold uppercase tracking-wider">
                <Cpu className="w-3.5 h-3.5" />
                <span>Premier Semiconductor &amp; VLSI Engineering Academy · Bengaluru</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
                Launch Your Career in <br className="hidden sm:inline" />
                <span className="text-[#FF6B00]">VLSI, ASIC &amp; Embedded</span> Systems
              </h1>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
                Master complete RTL-to-GDSII physical design, SystemVerilog/UVM verification, multilayer high-speed PCB, and ARM Cortex firmware on tier-1 EDA tools with semiconductor veterans in Malleswaram, Bangalore.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => onNavigate('courses')}
                  className="px-6 py-3.5 bg-[#FF6B00] hover:bg-[#EA580C] text-white text-xs sm:text-sm font-extrabold rounded-xl shadow-lg transition-all active:scale-95 cursor-pointer flex items-center gap-2"
                >
                  <span>Explore Engineering Programs</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href={SILPHOR_CONTACT.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3.5 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs sm:text-sm font-bold rounded-xl shadow-md transition-all active:scale-95 cursor-pointer flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Admissions: +91 7829455663</span>
                </a>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 pt-3 border-t border-slate-700/60 font-mono">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#00828A]" />
                  <span>Sub-14nm &amp; 7nm PDKs</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#00828A]" />
                  <span>100% Placement Support</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#00828A]" />
                  <span>Malleswaram Physical Hardware Lab</span>
                </div>
              </div>
            </div>

            {/* Right Column: Admission Card */}
            <div className="lg:col-span-5 bg-[#07172C] rounded-2xl p-6 sm:p-7 border border-slate-700 shadow-2xl space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                  Admissions Open · Winter 2026 Cohorts
                </span>
                <span className="text-[10px] bg-[#FF6B00]/20 text-[#FF6B00] px-2 py-0.5 rounded font-bold border border-[#FF6B00]/40">
                  Limited Seats
                </span>
              </div>

              <div className="space-y-3">
                <div className="text-sm font-bold text-white">Next Upcoming Batch:</div>
                <div className="bg-[#0B2545] p-4 rounded-xl border border-slate-700/80 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[#00828A]">Advanced VLSI Physical Design</span>
                    <span className="text-[#FF6B00] font-mono font-bold">₹45,000</span>
                  </div>
                  <div className="text-xs text-slate-300">
                    Starts: <strong>November 15, 2026</strong> · Mon-Thu Evening
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Trainer: Dr. R. K. Nambiar (Ex-Intel, Texas Instruments)
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#FF6B00]" />
                  <span>Malleswaram, Bangalore Center &amp; Online Hybrid</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-emerald-400" />
                  <span>Hotline: <strong className="text-white">+91 7829455663</strong></span>
                </div>
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  onClick={() => onEnrollCourse(SILPHOR_COURSES_DATA[0])}
                  className="flex-1 py-3 bg-[#FF6B00] hover:bg-[#EA580C] text-white rounded-xl text-xs font-bold shadow transition-colors cursor-pointer text-center"
                >
                  Reserve Your Seat
                </button>
                <button
                  onClick={() => onNavigate('contact')}
                  className="px-4 py-3 bg-[#0B2545] hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold border border-slate-600 transition-colors cursor-pointer"
                >
                  Visit Campus
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {SILPHOR_STATS.map((stat, idx) => (
            <div key={idx} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm text-center space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#0B2545] font-mono tabular-nums">
                {stat.value}
              </div>
              <div className="text-xs text-slate-600 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Courses */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#00828A]">
              Industry-Grade Curricula
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0B2545] tracking-tight">
              Our Specialized Engineering Programs
            </h2>
          </div>
          <button
            onClick={() => onNavigate('courses')}
            className="text-xs font-bold text-[#FF6B00] hover:text-[#EA580C] flex items-center gap-1 cursor-pointer"
          >
            <span>View All 5 Courses</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SILPHOR_COURSES_DATA.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group"
            >
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono font-bold text-[#00828A] bg-[#00828A]/10 px-2 py-0.5 rounded border border-[#00828A]/30">
                    {course.trackCode}
                  </span>
                  <span className="text-slate-500 flex items-center gap-1 text-[11px]">
                    <Clock className="w-3 h-3" />
                    {course.duration}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-[#0B2545] group-hover:text-[#FF6B00] transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                    {course.shortDesc}
                  </p>
                </div>

                <div className="space-y-1.5 pt-2 border-t border-slate-100">
                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    Tools &amp; PDKs:
                  </div>
                  <div className="flex flex-wrap gap-1 text-[11px]">
                    {course.tools.slice(0, 3).map((tool, i) => (
                      <span key={i} className="px-2 py-0.5 bg-slate-100 rounded text-slate-700 font-mono">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-slate-500 uppercase font-bold">Course Fee</div>
                  <div className="text-sm font-extrabold text-[#0B2545] font-mono">
                    ₹{course.feeINR.toLocaleString('en-IN')}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onSelectCourse(course)}
                    className="px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-[#0B2545] cursor-pointer"
                  >
                    Syllabus
                  </button>
                  <button
                    onClick={() => onEnrollCourse(course)}
                    className="px-3 py-1.5 bg-[#FF6B00] hover:bg-[#EA580C] text-white text-xs font-bold rounded-lg shadow-sm transition-colors cursor-pointer"
                  >
                    Enroll Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* EDA Partners */}
      <section className="bg-slate-100 py-10 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="text-xs uppercase tracking-wider font-extrabold text-slate-500">
            Aligned with Global Semiconductor &amp; EDA Tooling Standards
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6 text-slate-700 font-bold font-mono text-sm sm:text-base">
            {EDA_PARTNERS.map((partner, idx) => (
              <span key={idx}>{partner}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-[#00828A]">Alumni Placements</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0B2545] tracking-tight">Hear from Placed Engineers</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-4">
              <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed">"{t.quote}"</p>
              <div className="pt-3 border-t border-slate-100 space-y-0.5">
                <div className="text-xs font-bold text-[#0B2545]">{t.name}</div>
                <div className="text-[11px] text-[#FF6B00] font-semibold">{t.role}</div>
                <div className="text-[10px] text-slate-400">{t.course}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
