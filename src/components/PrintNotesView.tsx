import React from 'react';
import { SILPHOR_COURSES } from '../data/silphorNotes';
import { Printer, ArrowLeft, Download, CheckCircle2 } from 'lucide-react';

interface PrintNotesViewProps {
  onBack: () => void;
}

export const PrintNotesView: React.FC<PrintNotesViewProps> = ({ onBack }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 p-4 sm:p-8 max-w-5xl mx-auto space-y-8">
      {/* On-Screen Action Bar (Hidden when printing) */}
      <div className="no-print bg-[#07172C] text-white p-4 rounded-xl flex items-center justify-between shadow-md">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-300 hover:text-white cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Interactive Dashboard</span>
        </button>

        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-300 hidden sm:inline">
            Print ready: formatted for A4 &amp; Letter PDF export
          </span>
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-4 py-2 bg-[#FF6B00] hover:bg-[#EA580C] text-white rounded-lg text-xs sm:text-sm font-bold shadow cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Print / Save as PDF</span>
          </button>
        </div>
      </div>

      {/* Document Header with Silphor Branding */}
      <div className="border-b-2 border-slate-900 pb-6 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/assets/aistudio/silphor_logo_1790265984763_c9b81bad.jpg"
              alt="Silphor Technologies"
              className="w-12 h-12 object-contain rounded"
              referrerPolicy="no-referrer"
            />
            <div>
              <h1 className="text-2xl font-black tracking-tight text-slate-950 font-sans">
                SILPHOR TECHNOLOGIES
              </h1>
              <div className="text-xs font-mono uppercase tracking-widest text-slate-500 font-bold">
                DESIGN · INNOVATE · VERIFY · DELIVER
              </div>
            </div>
          </div>
          <div className="text-right text-xs text-slate-500 font-mono">
            <div>Comprehensive Engineering Study Notes</div>
            <div>Curated for Student Revision &amp; Silicon Interviews</div>
            <div>Bengaluru · Hyderabad · Global EDA Hub</div>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed pt-2">
          This study summary covers foundational principles, mathematical timing constraints, high-speed layout rules, and firmware architectures across Silphor Technologies' five specialized engineering disciplines.
        </p>
      </div>

      {/* All Course Tracks & Topics */}
      <div className="space-y-12">
        {SILPHOR_COURSES.map((course, cIdx) => (
          <div key={course.id} className="space-y-6">
            <div className="bg-slate-100 p-3 rounded-lg border-l-4 border-[#0B2545] flex items-center justify-between">
              <div>
                <span className="text-xs font-mono font-bold text-[#00828A]">
                  TRACK {cIdx + 1}: {course.trackCode}
                </span>
                <h2 className="text-lg font-extrabold text-slate-900">
                  {course.title}
                </h2>
              </div>
              <span className="text-xs font-semibold text-slate-600 bg-white px-2.5 py-1 rounded border border-slate-300">
                {course.duration} · {course.category}
              </span>
            </div>

            <div className="space-y-8 pl-2">
              {course.topics.map((topic, tIdx) => (
                <div key={topic.id} className="border-b border-slate-200 pb-6 space-y-4">
                  <div>
                    <span className="text-xs font-mono text-[#FF6B00] font-bold">
                      Module {cIdx + 1}.{tIdx + 1}
                    </span>
                    <h3 className="text-base font-bold text-slate-900">
                      {topic.title}
                    </h3>
                    <p className="text-xs text-slate-500 italic">
                      {topic.subheading}
                    </p>
                  </div>

                  {/* Summary & Analogy */}
                  <div className="text-xs sm:text-sm text-slate-800 leading-relaxed space-y-2">
                    <p>
                      <strong>Concept Overview: </strong> {topic.summary}
                    </p>
                    <p className="bg-amber-50 p-2.5 rounded border border-amber-200 text-amber-950 italic text-xs">
                      <strong>Intuitive Analogy: </strong> "{topic.analogy}"
                    </p>
                  </div>

                  {/* Core Principles */}
                  <div className="space-y-1.5">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-700">
                      Core Technical Principles &amp; Rules of Thumb:
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                      {topic.corePrinciples.map((cp, idx) => (
                        <div key={idx} className="bg-slate-50 p-2.5 rounded border border-slate-200">
                          <div className="font-bold text-slate-900">{cp.title}</div>
                          <div className="text-slate-600 mt-0.5">{cp.description}</div>
                          {cp.ruleOfThumb && (
                            <div className="text-[11px] text-slate-800 mt-1 font-medium">
                              <strong>Rule:</strong> {cp.ruleOfThumb}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Formula */}
                  {topic.formulaOrSyntax && (
                    <div className="bg-slate-900 text-white p-3 rounded text-xs font-mono space-y-1">
                      <div className="text-[#00828A] font-bold">
                        {topic.formulaOrSyntax.label}:
                      </div>
                      <div className="text-amber-300 font-bold whitespace-pre-wrap">
                        {topic.formulaOrSyntax.formula}
                      </div>
                      <div className="text-slate-400 text-[11px]">
                        {topic.formulaOrSyntax.explanation}
                      </div>
                    </div>
                  )}

                  {/* Interview Question */}
                  <div className="bg-slate-50 p-3 rounded border border-slate-200 text-xs space-y-1">
                    <div className="font-bold text-slate-900">
                      Interview FAQ: {topic.interviewFaq.question}
                    </div>
                    <div className="text-slate-700">
                      <strong>Answer: </strong> {topic.interviewFaq.answer}
                    </div>
                  </div>

                  {/* Quick Takeaways */}
                  <div className="text-xs text-slate-700">
                    <strong>Quick Takeaways: </strong>
                    <ul className="list-disc list-inside mt-1 space-y-0.5">
                      {topic.quickRevisionTakeaways.map((takeaway, i) => (
                        <li key={i}>{takeaway}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="border-t-2 border-slate-900 pt-4 text-center text-xs text-slate-500 font-mono">
        © 2026 Silphor Technologies · Malleswaram, Bangalore · Design · Innovate · Verify · Deliver
      </div>
    </div>
  );
};
