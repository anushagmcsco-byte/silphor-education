import React, { useState } from 'react';
import { FLASHCARDS, Flashcard } from '../data/silphorNotes';
import { RotateCw, CheckCircle, HelpCircle, ArrowLeft, ArrowRight, Shuffle, Sparkles } from 'lucide-react';

export const FlashcardsDeck: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [knownCardIds, setKnownCardIds] = useState<string[]>([]);
  const [reviewCardIds, setReviewCardIds] = useState<string[]>([]);

  const filteredCards = FLASHCARDS.filter(
    (fc) => selectedCategory === 'ALL' || fc.category === selectedCategory
  );

  const currentCard: Flashcard | undefined = filteredCards[currentIndex];

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev < filteredCards.length - 1 ? prev + 1 : 0));
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : filteredCards.length - 1));
  };

  const handleKnown = (id: string) => {
    if (!knownCardIds.includes(id)) {
      setKnownCardIds([...knownCardIds, id]);
    }
    setReviewCardIds(reviewCardIds.filter((cid) => cid !== id));
    handleNext();
  };

  const handleNeedReview = (id: string) => {
    if (!reviewCardIds.includes(id)) {
      setReviewCardIds([...reviewCardIds, id]);
    }
    setKnownCardIds(knownCardIds.filter((cid) => cid !== id));
    handleNext();
  };

  const categories = ['ALL', 'VLSI', 'Verification', 'PCB', 'Embedded', 'Power Electronics'];

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#0B2545] tracking-tight">
            Engineering Revision Flashcards
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Test and drill critical silicon formulas, physical design invariants, and protocol concepts.
          </p>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-3 text-xs font-mono">
          <div className="bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg text-emerald-800 font-bold">
            ✓ Mastered: {knownCardIds.length}
          </div>
          <div className="bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-lg text-amber-800 font-bold">
            🔄 Review: {reviewCardIds.length}
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-1.5">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setSelectedCategory(cat);
              setCurrentIndex(0);
              setIsFlipped(false);
            }}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
              selectedCategory === cat
                ? 'bg-[#FF6B00] text-white shadow font-bold'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {cat === 'ALL' ? 'All Disciplines' : cat}
          </button>
        ))}
      </div>

      {/* Main Flashcard Container */}
      {currentCard ? (
        <div className="max-w-xl mx-auto space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
            <span>
              Card {currentIndex + 1} of {filteredCards.length}
            </span>
            <span className="bg-[#00828A]/10 text-[#00828A] px-2 py-0.5 rounded font-bold border border-[#00828A]/30">
              {currentCard.badge}
            </span>
          </div>

          {/* Flashcard Box with 3D Flip */}
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="cursor-pointer min-h-[260px] bg-gradient-to-br from-[#0B2545] to-[#07172C] text-white p-8 rounded-2xl shadow-xl border border-slate-700 flex flex-col justify-between select-none transition-transform hover:scale-[1.01] active:scale-[0.99]"
          >
            <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
              <span className="uppercase text-[#FF6B00] font-bold tracking-wider">
                {isFlipped ? 'Answer & Explanation' : 'Question Prompt'}
              </span>
              <span className="flex items-center gap-1 text-slate-400">
                <RotateCw className="w-3.5 h-3.5" />
                Click anywhere to flip
              </span>
            </div>

            <div className="py-6 text-center">
              {isFlipped ? (
                <div className="text-base sm:text-lg font-medium text-emerald-300 leading-relaxed">
                  {currentCard.answer}
                </div>
              ) : (
                <div className="text-lg sm:text-xl font-bold text-white tracking-tight">
                  {currentCard.question}
                </div>
              )}
            </div>

            <div className="text-center text-xs text-slate-400">
              {isFlipped ? 'Click again to view question' : 'Click to reveal answer'}
            </div>
          </div>

          {/* Action Handlers */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => handleNeedReview(currentCard.id)}
              className="py-2.5 px-4 rounded-xl border border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5"
            >
              <HelpCircle className="w-4 h-4 text-amber-600" />
              <span>Review Again Later</span>
            </button>

            <button
              onClick={() => handleKnown(currentCard.id)}
              className="py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow"
            >
              <CheckCircle className="w-4 h-4" />
              <span>I Know This Well ✓</span>
            </button>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={handlePrev}
              className="flex items-center gap-1 text-xs font-bold text-slate-600 hover:text-slate-900 cursor-pointer p-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>
            <button
              onClick={handleNext}
              className="flex items-center gap-1 text-xs font-bold text-slate-600 hover:text-slate-900 cursor-pointer p-2"
            >
              <span>Next Card</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
          <p className="text-slate-500 text-sm">No flashcards found for this discipline.</p>
        </div>
      )}
    </div>
  );
};
