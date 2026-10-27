import React, { useState } from 'react';
import { SILPHOR_COURSES_DATA, Course } from '../data/silphorData';
import { Clock, Award, CheckCircle2, ChevronDown, ChevronUp, ArrowRight, MessageCircle } from 'lucide-react';

interface CoursesPageProps {
  onEnrollCourse: (course: Course) => void;
  selectedCourseId?: string;
}

export const CoursesPage: React.FC<CoursesPageProps> = ({ onEnrollCourse, selectedCourseId }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [expandedSyllabusId, setExpandedSyllabusId] = useState<string | null>(selectedCourseId || 'vlsi-pd');

  const categories = [
    { id: 'ALL', label: 'All Programs' },
    { id: 'VLSI & Physical Design', label: 'VLSI & Physical Design' },
    { id: 'RTL & UVM Verification', label: 'RTL & UVM Verification' },
    { id: 'PCB & Signal Integrity', label: 'PCB & Signal Integrity' },
    { id: 'Embedded & IoT', label: 'Embedded & IoT' },
    { id: 'Power Electronics', label: 'Power Electronics' },
    { id: 'FDP & SDP Programs', label: 'FDP & SDP University Programs' },
    { id: 'Industrial Internships', label: 'Internships & Capstone Projects' },
  ];

  const filteredCourses = SILPHOR_COURSES_DATA.filter(
    (c) => selectedCategory === 'ALL' || c.category === selectedCategory
  );

  return (
    <div className="py-10 space-y-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Title */}
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0B2545] tracking-tight">
          Professional Engineering Certifications &amp; Courses
        </h1>
        <p className="text-sm text-slate-600">
          Hands-on programs designed and mentored by senior semiconductor professionals in Bangalore.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              selectedCategory === cat.id
                ? 'bg-[#FF6B00] text-white shadow-sm font-bold'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Courses List */}
      <div className="space-y-8">
        {filteredCourses.map((course) => {
          const isSyllabusOpen = expandedSyllabusId === course.id;

          return (
            <div
              key={course.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:border-slate-300 transition-all"
            >
              {/* Course Main Card */}
              <div className="p-6 sm:p-8 space-y-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span className="font-mono font-bold text-[#00828A] bg-[#00828A]/10 px-2.5 py-0.5 rounded border border-[#00828A]/30">
                        {course.trackCode}
                      </span>
                      <span className="text-slate-400">·</span>
                      <span className="font-semibold text-slate-600">{course.category}</span>
                      <span className="text-slate-400">·</span>
                      <span className="text-slate-500 flex items-center gap-1 font-medium">
                        <Clock className="w-3.5 h-3.5" />
                        {course.duration}
                      </span>
                      <span className="text-slate-400">·</span>
                      <span className="text-slate-500 font-medium">{course.mode}</span>
                    </div>

                    <h2 className="text-xl sm:text-2xl font-bold text-[#0B2545]">
                      {course.title}
                    </h2>
                  </div>

                  {/* Fee & Action Block */}
                  <div className="flex items-center gap-4 self-start lg:self-auto bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <div>
                      <div className="text-[10px] text-slate-500 uppercase font-bold">Course Investment</div>
                      <div className="text-xl font-extrabold text-[#0B2545] font-mono">
                        ₹{course.feeINR.toLocaleString('en-IN')}
                      </div>
                    </div>
                    <button
                      onClick={() => onEnrollCourse(course)}
                      className="px-5 py-2.5 bg-[#FF6B00] hover:bg-[#EA580C] text-white rounded-xl text-xs font-bold shadow transition-colors cursor-pointer"
                    >
                      Enroll in Batch
                    </button>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {course.fullDesc}
                </p>

                {/* Highlights Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {course.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-2 text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>

                {/* Tools Bar */}
                <div className="bg-[#07172C] text-white p-4 rounded-xl flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="text-slate-400 font-mono text-[11px] uppercase">
                    PDKs &amp; Industrial EDA Toolchain:
                  </div>
                  <div className="flex flex-wrap gap-1.5 font-mono text-[11px]">
                    {course.tools.map((t, i) => (
                      <span key={i} className="px-2 py-0.5 bg-slate-800 rounded text-slate-200 border border-slate-700">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Upcoming Batches Strip */}
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-600">
                    Upcoming Cohorts &amp; Schedules
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {course.batches.map((b) => (
                      <div key={b.id} className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 flex items-center justify-between gap-3 text-xs">
                        <div className="space-y-0.5">
                          <div className="font-bold text-slate-900">{b.name}</div>
                          <div className="text-slate-600 font-medium">{b.startDate} · {b.timing}</div>
                          <div className="text-[11px] text-slate-400">Trainer: {b.trainer}</div>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="text-[11px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                            {b.seatsTotal - b.seatsFilled} Seats Left
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Syllabus Accordion Button */}
                <div className="pt-2">
                  <button
                    onClick={() => setExpandedSyllabusId(isSyllabusOpen ? null : course.id)}
                    className="w-full flex items-center justify-between py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                  >
                    <span>{isSyllabusOpen ? 'Hide Full Module Curriculum' : 'View Detailed Module Syllabus'}</span>
                    {isSyllabusOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Expanded Syllabus Breakdown */}
              {isSyllabusOpen && (
                <div className="border-t border-slate-200 bg-slate-50 p-6 sm:p-8 space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#0B2545]">
                    Comprehensive Curriculum Breakdown ({course.syllabus.length} Phases)
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {course.syllabus.map((mod, idx) => (
                      <div key={idx} className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-mono text-[#00828A] font-bold">{mod.phase}</span>
                        </div>
                        <h4 className="text-xs sm:text-sm font-bold text-slate-900">{mod.title}</h4>
                        <ul className="space-y-1 text-xs text-slate-600 list-disc list-inside">
                          {mod.topics.map((top, ti) => (
                            <li key={ti} className="leading-snug">{top}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
