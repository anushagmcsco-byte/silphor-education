import React, { useState } from 'react';
import { StudyTopic, CourseTrack } from '../data/silphorNotes';
import { 
  Bookmark, 
  BookmarkCheck, 
  CheckCircle2, 
  Circle, 
  Volume2, 
  VolumeX, 
  Copy, 
  Check, 
  Lightbulb, 
  HelpCircle, 
  Zap, 
  Code2, 
  ChevronRight,
  BookOpen,
  ArrowLeft,
  ArrowRight
} from 'lucide-react';

interface TopicNoteDetailProps {
  topic: StudyTopic;
  course: CourseTrack;
  isMastered: boolean;
  onToggleMastered: () => void;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
  onNextTopic?: () => void;
  onPrevTopic?: () => void;
  hasNext: boolean;
  hasPrev: boolean;
}

export const TopicNoteDetail: React.FC<TopicNoteDetailProps> = ({
  topic,
  course,
  isMastered,
  onToggleMastered,
  isBookmarked,
  onToggleBookmark,
  onNextTopic,
  onPrevTopic,
  hasNext,
  hasPrev,
}) => {
  const [copied, setCopied] = useState(false);
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<number | null>(null);
  const [isQuizSubmitted, setIsQuizSubmitted] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');

  // Text-to-speech for audible revision
  const handleToggleSpeech = () => {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported in this browser.');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      window.speechSynthesis.cancel();
      const textToRead = `${topic.title}. ${topic.subheading}. Summary: ${topic.summary}. Real-world analogy: ${topic.analogy}`;
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.rate = 1.0;
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleQuizOptionClick = (idx: number) => {
    if (isQuizSubmitted) return;
    setSelectedQuizAnswer(idx);
    setIsQuizSubmitted(true);
  };

  const fontSizeClasses = {
    normal: 'text-sm leading-relaxed',
    large: 'text-base leading-relaxed',
    xlarge: 'text-lg leading-relaxed',
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden">
      {/* Top Action & Control Ribbon */}
      <div className="bg-[#0B2545] text-white px-6 py-4 flex flex-wrap items-center justify-between gap-4 border-b border-slate-700">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-300 font-mono mb-1">
            <span className="text-[#00828A] font-bold uppercase">{course.category}</span>
            <span>·</span>
            <span>{course.trackCode}</span>
            <span>·</span>
            <span>{topic.estimatedReadTime}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            {topic.title}
          </h2>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Font Size Adjuster */}
          <div className="flex items-center bg-[#07172C] rounded-lg p-0.5 border border-slate-700 text-xs">
            <button
              onClick={() => setFontSize('normal')}
              className={`px-2 py-1 rounded cursor-pointer ${fontSize === 'normal' ? 'bg-[#FF6B00] text-white font-bold' : 'text-slate-400'}`}
              title="Normal font size"
            >
              A
            </button>
            <button
              onClick={() => setFontSize('large')}
              className={`px-2 py-1 rounded cursor-pointer ${fontSize === 'large' ? 'bg-[#FF6B00] text-white font-bold' : 'text-slate-400'}`}
              title="Large font size"
            >
              A+
            </button>
          </div>

          {/* Audio Reader */}
          <button
            onClick={handleToggleSpeech}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer border ${
              isSpeaking
                ? 'bg-rose-600 text-white border-rose-500 animate-pulse'
                : 'bg-[#07172C] text-slate-300 hover:text-white border-slate-700'
            }`}
            title={isSpeaking ? 'Stop audio' : 'Listen to summary'}
          >
            {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-[#00828A]" />}
            <span>{isSpeaking ? 'Stop' : 'Listen'}</span>
          </button>

          {/* Bookmark */}
          <button
            onClick={onToggleBookmark}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer border ${
              isBookmarked
                ? 'bg-[#00828A] text-white border-[#00828A]'
                : 'bg-[#07172C] text-slate-300 hover:text-white border-slate-700'
            }`}
          >
            {isBookmarked ? <BookmarkCheck className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
            <span>{isBookmarked ? 'Saved' : 'Save'}</span>
          </button>

          {/* Mastered Toggle */}
          <button
            onClick={onToggleMastered}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer shadow-sm ${
              isMastered
                ? 'bg-emerald-600 text-white'
                : 'bg-[#FF6B00] hover:bg-[#EA580C] text-white'
            }`}
          >
            {isMastered ? <CheckCircle2 className="w-4 h-4" /> : <Circle className="w-4 h-4" />}
            <span>{isMastered ? 'Mastered ✓' : 'Mark Mastered'}</span>
          </button>
        </div>
      </div>

      {/* Main Study Note Content Body */}
      <div className="p-6 sm:p-8 space-y-8">
        {/* Subheading Kicker */}
        <p className="text-slate-600 font-medium text-sm sm:text-base border-b border-slate-100 pb-4">
          {topic.subheading}
        </p>

        {/* Executive Summary */}
        <section className="space-y-3">
          <h3 className="text-xs uppercase tracking-wider font-extrabold text-[#0B2545] flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[#00828A]" />
            <span>Executive Conceptual Summary</span>
          </h3>
          <p className={`text-slate-700 ${fontSizeClasses[fontSize]}`}>
            {topic.summary}
          </p>
        </section>

        {/* Real-World Analogy (Pedagogical Gold) */}
        <section className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-5 space-y-2">
          <div className="flex items-center gap-2 text-amber-900 font-bold text-xs uppercase tracking-wider">
            <Lightbulb className="w-4 h-4 text-amber-600" />
            <span>Intuitive Real-World Analogy</span>
          </div>
          <p className="text-slate-800 text-sm leading-relaxed italic">
            "{topic.analogy}"
          </p>
        </section>

        {/* Core Principles & Rules of Thumb */}
        <section className="space-y-4">
          <h3 className="text-xs uppercase tracking-wider font-extrabold text-[#0B2545] flex items-center gap-2">
            <Zap className="w-4 h-4 text-[#FF6B00]" />
            <span>Core Principles &amp; Industry Rules of Thumb</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {topic.corePrinciples.map((cp, idx) => (
              <div 
                key={idx}
                className="bg-[#F8FAFC] border border-slate-200 rounded-xl p-4 flex flex-col justify-between hover:border-slate-300 transition-colors"
              >
                <div>
                  <h4 className="text-sm font-bold text-slate-900 mb-2">
                    {idx + 1}. {cp.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed mb-3">
                    {cp.description}
                  </p>
                </div>
                {cp.ruleOfThumb && (
                  <div className="bg-white border border-slate-200 rounded p-2 text-[11px] text-[#0B2545] font-medium">
                    <span className="font-bold text-[#FF6B00]">Rule of Thumb: </span>
                    {cp.ruleOfThumb}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Key Timing / Mathematical Formula */}
        {topic.formulaOrSyntax && (
          <section className="space-y-3">
            <h3 className="text-xs uppercase tracking-wider font-extrabold text-[#0B2545]">
              Fundamental Formula &amp; Constraint Equation
            </h3>
            <div className="bg-[#07172C] text-slate-100 p-5 rounded-xl border border-slate-700 shadow-inner space-y-2">
              <div className="text-xs text-[#00828A] font-bold uppercase tracking-wider">
                {topic.formulaOrSyntax.label}
              </div>
              <pre className="font-mono text-sm sm:text-base text-amber-300 overflow-x-auto py-2 whitespace-pre-wrap">
                {topic.formulaOrSyntax.formula}
              </pre>
              <div className="text-xs text-slate-400 border-t border-slate-800 pt-2">
                {topic.formulaOrSyntax.explanation}
              </div>
            </div>
          </section>
        )}

        {/* Industry Code or Constraint Snippet */}
        {topic.codeOrConstraintSnippet && (
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs uppercase tracking-wider font-extrabold text-[#0B2545] flex items-center gap-2">
                <Code2 className="w-4 h-4 text-[#00828A]" />
                <span>Production Code &amp; Synthesis Snippet ({topic.codeOrConstraintSnippet.language})</span>
              </h3>
              <button
                onClick={() => handleCopyCode(topic.codeOrConstraintSnippet!.code)}
                className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-800 font-semibold cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy Code'}</span>
              </button>
            </div>
            
            <div className="relative rounded-xl overflow-hidden bg-slate-900 border border-slate-800 text-xs sm:text-sm font-mono text-emerald-400 p-4 shadow-sm overflow-x-auto">
              <pre className="whitespace-pre">
                {topic.codeOrConstraintSnippet.code}
              </pre>
            </div>
            <p className="text-xs text-slate-500 italic">
              {topic.codeOrConstraintSnippet.explanation}
            </p>
          </section>
        )}

        {/* Industry EDA Tooling */}
        <section className="space-y-2 pt-2 border-t border-slate-100">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Standard Industry Toolchain
          </div>
          <div className="flex flex-wrap gap-2 text-xs text-slate-700">
            {topic.industryTools.map((tool, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded bg-slate-100 border border-slate-200 font-medium"
              >
                {tool}
              </span>
            ))}
          </div>
        </section>

        {/* High-Yield Interview Question & Answer */}
        <section className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-3">
          <div className="flex items-center gap-2 text-[#0B2545] font-bold text-xs uppercase tracking-wider">
            <HelpCircle className="w-4 h-4 text-[#FF6B00]" />
            <span>Silicon MNC Interview Favorite</span>
          </div>
          <div className="font-bold text-sm text-slate-900">
            Q: {topic.interviewFaq.question}
          </div>
          <div className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-white p-3.5 rounded-lg border border-slate-200">
            <span className="font-bold text-emerald-700">Answer: </span>
            {topic.interviewFaq.answer}
          </div>
        </section>

        {/* Quick Revision Bullets */}
        <section className="space-y-2">
          <h3 className="text-xs uppercase tracking-wider font-extrabold text-[#0B2545]">
            Quick Revision Takeaways
          </h3>
          <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700 list-disc list-inside bg-slate-50/60 p-4 rounded-xl border border-slate-200/80">
            {topic.quickRevisionTakeaways.map((item, idx) => (
              <li key={idx} className="leading-relaxed">
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* Interactive Knowledge Check Quiz */}
        <section className="bg-gradient-to-r from-slate-900 to-[#0B2545] text-white p-6 rounded-xl shadow-md space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#FF6B00]">
              Concept Checkpoint Quiz
            </span>
            {isQuizSubmitted && (
              <button
                onClick={() => {
                  setSelectedQuizAnswer(null);
                  setIsQuizSubmitted(false);
                }}
                className="text-xs text-slate-300 hover:text-white underline cursor-pointer"
              >
                Reset Question
              </button>
            )}
          </div>

          <p className="text-sm sm:text-base font-semibold text-white">
            {topic.quiz.question}
          </p>

          <div className="space-y-2">
            {topic.quiz.options.map((opt, idx) => {
              let btnClass = 'bg-[#07172C] text-slate-200 border-slate-700 hover:bg-slate-800';
              if (isQuizSubmitted) {
                if (idx === topic.quiz.correctIndex) {
                  btnClass = 'bg-emerald-700 text-white border-emerald-500 font-bold';
                } else if (idx === selectedQuizAnswer) {
                  btnClass = 'bg-rose-700 text-white border-rose-500';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleQuizOptionClick(idx)}
                  disabled={isQuizSubmitted}
                  className={`w-full text-left p-3 rounded-lg border text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-between ${btnClass}`}
                >
                  <span>{opt}</span>
                  {isQuizSubmitted && idx === topic.quiz.correctIndex && (
                    <span className="text-xs font-bold text-emerald-300">Correct ✓</span>
                  )}
                  {isQuizSubmitted && idx === selectedQuizAnswer && idx !== topic.quiz.correctIndex && (
                    <span className="text-xs font-bold text-rose-300">Incorrect ✗</span>
                  )}
                </button>
              );
            })}
          </div>

          {isQuizSubmitted && (
            <div className="bg-black/30 p-3.5 rounded-lg border border-slate-700 text-xs text-slate-200 leading-relaxed">
              <span className="font-bold text-[#00828A]">Explanation: </span>
              {topic.quiz.explanation}
            </div>
          )}
        </section>

        {/* Previous / Next Topic Navigation Buttons */}
        <div className="flex items-center justify-between pt-6 border-t border-slate-200">
          <button
            onClick={onPrevTopic}
            disabled={!hasPrev}
            className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg border transition-colors ${
              hasPrev
                ? 'text-[#0B2545] border-slate-300 hover:bg-slate-100 cursor-pointer'
                : 'text-slate-300 border-slate-200 cursor-not-allowed opacity-50'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous Concept</span>
          </button>

          <button
            onClick={onNextTopic}
            disabled={!hasNext}
            className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg bg-[#FF6B00] hover:bg-[#EA580C] text-white transition-colors ${
              hasNext ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'
            }`}
          >
            <span>Next Concept</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
