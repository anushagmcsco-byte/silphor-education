import React, { useState } from 'react';
import { CourseTrack, SILPHOR_COURSES } from '../data/silphorNotes';
import { ChevronDown, ChevronUp, BookOpen, Clock, Award, Cpu, ArrowRight } from 'lucide-react';

interface TrackSelectorProps {
  onSelectTopic: (courseId: string, topicId: string) => void;
  masteredTopicIds: string[];
}

export const TrackSelector: React.FC<TrackSelectorProps> = ({
  onSelectTopic,
  masteredTopicIds,
}) => {
  const [expandedCourseId, setExpandedCourseId] = useState<string | null>('crs-vlsi-01');

  const toggleCourse = (id: string) => {
    setExpandedCourseId(expandedCourseId === id ? null : id);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <h2 className="text-xl font-bold text-[#0B2545] tracking-tight">
          Silphor Technologies Engineering Tracks &amp; Curricula
        </h2>
        <p className="text-sm text-slate-600 mt-1">
          Explore complete syllabus roadmaps, process design kits (PDKs), and verified industry toolchains. Select any core module to read detailed study notes.
        </p>
      </div>

      <div className="space-y-4">
        {SILPHOR_COURSES.map((course) => {
          const isExpanded = expandedCourseId === course.id;
          const courseMasteredCount = course.topics.filter((t) =>
            masteredTopicIds.includes(t.id)
          ).length;

          return (
            <div
              key={course.id}
              className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden transition-all hover:border-slate-300"
            >
              {/* Course Card Header */}
              <div
                onClick={() => toggleCourse(course.id)}
                className="p-5 sm:p-6 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 select-none hover:bg-slate-50/60"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="font-mono font-bold text-[#00828A] bg-[#00828A]/10 px-2 py-0.5 rounded border border-[#00828A]/30">
                      {course.trackCode}
                    </span>
                    <span className="text-slate-400">·</span>
                    <span className="font-semibold text-slate-600">{course.category}</span>
                    <span className="text-slate-400">·</span>
                    <span className="text-slate-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {course.duration}
                    </span>
                    <span className="text-slate-400">·</span>
                    <span className="text-slate-500">{course.mode}</span>
                  </div>

                  <h3 className="text-lg font-bold text-[#0B2545]">
                    {course.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 line-clamp-2">
                    {course.tagline}
                  </p>
                </div>

                <div className="flex items-center gap-4 self-end sm:self-center shrink-0">
                  <div className="text-right hidden sm:block">
                    <div className="text-xs font-mono font-bold text-slate-700">
                      {courseMasteredCount}/{course.topics.length} Mastered
                    </div>
                    <div className="text-[11px] text-slate-400">{course.level} Level</div>
                  </div>

                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </div>
              </div>

              {/* Expanded Curriculum View */}
              {isExpanded && (
                <div className="border-t border-slate-200 bg-slate-50/50 p-5 sm:p-6 space-y-6">
                  {/* Overview & Industry Impact */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                    <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-1">
                      <div className="font-bold text-[#0B2545] uppercase tracking-wider text-xs">
                        Course Overview
                      </div>
                      <p className="text-slate-600 leading-relaxed">
                        {course.overview}
                      </p>
                    </div>

                    <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-1">
                      <div className="font-bold text-[#00828A] uppercase tracking-wider text-xs">
                        Industry Relevance &amp; Hiring Impact
                      </div>
                      <p className="text-slate-600 leading-relaxed">
                        {course.industryImpact}
                      </p>
                    </div>
                  </div>

                  {/* EDA Tools Bar */}
                  <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Standard EDA Tools Taught &amp; Practiced
                    </div>
                    <div className="flex flex-wrap gap-2 text-xs font-medium text-slate-700">
                      {course.edaTools.map((tool, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded bg-[#07172C] text-slate-200 font-mono text-[11px]"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Modules & Detailed Study Notes Links */}
                  <div className="space-y-3">
                    <div className="text-xs font-bold uppercase tracking-wider text-[#0B2545]">
                      Curated Study Notes Modules ({course.topics.length} Available)
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {course.topics.map((t, idx) => {
                        const isMastered = masteredTopicIds.includes(t.id);

                        return (
                          <div
                            key={t.id}
                            onClick={() => onSelectTopic(course.id, t.id)}
                            className="bg-white p-4 rounded-xl border border-slate-200 hover:border-[#FF6B00] shadow-sm hover:shadow transition-all cursor-pointer flex flex-col justify-between group"
                          >
                            <div className="space-y-1.5">
                              <div className="flex items-center justify-between text-xs">
                                <span className="font-mono text-[#00828A] font-semibold">
                                  Module {idx + 1} · {t.estimatedReadTime}
                                </span>
                                {isMastered && (
                                  <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[10px]">
                                    ✓ Mastered
                                  </span>
                                )}
                              </div>
                              <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#FF6B00] transition-colors">
                                {t.title}
                              </h4>
                              <p className="text-xs text-slate-500 line-clamp-2">
                                {t.subheading}
                              </p>
                            </div>

                            <div className="pt-3 mt-2 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#0B2545] group-hover:text-[#FF6B00]">
                              <span>Open Comprehensive Study Note</span>
                              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                            </div>
                          </div>
                        );
                      })}
                    </div>
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
