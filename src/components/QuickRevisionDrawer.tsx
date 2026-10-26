import React from 'react';
import { SILPHOR_COURSES } from '../data/silphorNotes';
import { X, CheckCircle2, Zap, BookOpen, Lightbulb } from 'lucide-react';

interface QuickRevisionDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTopic: (courseId: string, topicId: string) => void;
}

export const QuickRevisionDrawer: React.FC<QuickRevisionDrawerProps> = ({
  isOpen,
  onClose,
  onSelectTopic,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs no-print">
      <div className="bg-white w-full max-w-xl h-full shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-right duration-200">
        {/* Drawer Header */}
        <div className="bg-[#07172C] text-white p-5 flex items-center justify-between border-b border-slate-700">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-[#FF6B00] rounded-md text-white">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">5-Minute Rapid Revision Deck</h3>
              <p className="text-[11px] text-slate-300">Quick-fire takeaways before exams &amp; technical interviews</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {SILPHOR_COURSES.map((course) => (
            <div key={course.id} className="space-y-3">
              <div className="flex items-center gap-2 border-b border-slate-200 pb-1.5">
                <span className="font-mono text-xs font-bold text-[#00828A] bg-[#00828A]/10 px-2 py-0.5 rounded">
                  {course.category}
                </span>
                <h4 className="text-sm font-bold text-[#0B2545]">
                  {course.title}
                </h4>
              </div>

              <div className="space-y-3">
                {course.topics.map((topic) => (
                  <div
                    key={topic.id}
                    className="bg-[#F8FAFC] border border-slate-200 rounded-xl p-3.5 space-y-2 hover:border-[#FF6B00] transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900">
                        {topic.title}
                      </span>
                      <button
                        onClick={() => {
                          onSelectTopic(course.id, topic.id);
                          onClose();
                        }}
                        className="text-[11px] font-semibold text-[#00828A] hover:underline cursor-pointer"
                      >
                        Read Full Note →
                      </button>
                    </div>

                    <ul className="space-y-1 text-xs text-slate-600 list-disc list-inside">
                      {topic.quickRevisionTakeaways.map((item, i) => (
                        <li key={i} className="leading-snug">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Drawer Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 text-center">
          <button
            onClick={onClose}
            className="w-full py-2 bg-[#0B2545] text-white text-xs font-bold rounded-lg hover:bg-slate-800 cursor-pointer"
          >
            Done Reviewing
          </button>
        </div>
      </div>
    </div>
  );
};
