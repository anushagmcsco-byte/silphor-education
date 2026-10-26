import React, { useState } from 'react';
import { Search, Copy, Check, X, FileText, Cpu, Calculator, Zap } from 'lucide-react';

interface CheatSheetItem {
  discipline: 'VLSI' | 'Verification' | 'PCB' | 'Embedded' | 'Power';
  category: string;
  name: string;
  formulaOrSyntax: string;
  ruleOfThumb: string;
  tools: string;
}

const CHEAT_SHEET_DATA: CheatSheetItem[] = [
  {
    discipline: 'VLSI',
    category: 'Timing Analysis (STA)',
    name: 'Setup Timing Check',
    formulaOrSyntax: 'T_clk >= T_cq + T_comb_max + T_setup - T_skew + T_jitter',
    ruleOfThumb: 'Setup violations depend on clock frequency. Fixed by slowing down clock or optimizing logic gates.',
    tools: 'PrimeTime, Design Compiler'
  },
  {
    discipline: 'VLSI',
    category: 'Timing Analysis (STA)',
    name: 'Hold Timing Check',
    formulaOrSyntax: 'T_cq + T_comb_min >= T_hold + T_skew',
    ruleOfThumb: 'Hold violations are frequency-independent. Fixed by adding delay buffers to data path.',
    tools: 'PrimeTime, Innovus'
  },
  {
    discipline: 'VLSI',
    category: 'Physical Design',
    name: 'Floorplan Core Utilization',
    formulaOrSyntax: 'Utilization = (Area of Std Cells + Macros) / Total Core Area',
    ruleOfThumb: 'Target 65%-75% for initial floorplan; leaving headroom for CTS repeaters and timing ECOs.',
    tools: 'Cadence Innovus, ICC2'
  },
  {
    discipline: 'Verification',
    category: 'SystemVerilog OOP',
    name: 'Constrained Random Range',
    formulaOrSyntax: 'constraint c_burst { length inside {[1:16]}; length % 2 == 0; }',
    ruleOfThumb: 'Always verify if (!item.randomize()) $fatal(); to catch over-constrained solver failures.',
    tools: 'QuestaSim, VCS'
  },
  {
    discipline: 'Verification',
    category: 'UVM 1.2',
    name: 'Phase Objection Control',
    formulaOrSyntax: 'phase.raise_objection(this);\n// perform transaction sequence\nphase.drop_objection(this);',
    ruleOfThumb: 'If no objections are raised at time 0 in run_phase, simulation terminates instantly.',
    tools: 'UVM 1.2 Library'
  },
  {
    discipline: 'PCB',
    category: 'Transmission Lines',
    name: 'Microstrip Characteristic Impedance (Z₀)',
    formulaOrSyntax: 'Z_0 ≈ (87 / sqrt(e_r + 1.41)) * ln(5.98 * H / (0.8 * W + T))',
    ruleOfThumb: 'FR-4 standard target is 50Ω single-ended, 90Ω USB diff pair, 100Ω Ethernet/PCIe.',
    tools: 'Polar SI9000, Altium'
  },
  {
    discipline: 'PCB',
    category: 'Signal Integrity',
    name: 'Critical Trace Length Rule',
    formulaOrSyntax: 'L_critical > T_rise / (6 * T_pd), where T_pd in FR4 ≈ 160 ps/inch',
    ruleOfThumb: 'Traces longer than L_critical must be treated as transmission lines with matched termination.',
    tools: 'HyperLynx SI/PI'
  },
  {
    discipline: 'Embedded',
    category: 'ARM Cortex Architecture',
    name: 'Memory-Mapped Bit Clear & Set',
    formulaOrSyntax: 'REG |= (1U << BIT);  // Set\nREG &= ~(1U << BIT); // Clear\nREG ^= (1U << BIT);  // Toggle',
    ruleOfThumb: 'Always mark peripheral registers and flags shared with ISRs as volatile uint32_t.',
    tools: 'Keil uVision, GCC ARM'
  },
  {
    discipline: 'Embedded',
    category: 'RTOS Concurrency',
    name: 'Priority Inversion Prevention',
    formulaOrSyntax: 'xSemaphoreCreateMutex(); // Priority Inheritance Enabled',
    ruleOfThumb: 'Binary semaphores do NOT support priority inheritance; always use Mutex for shared resources.',
    tools: 'FreeRTOS Kernel'
  },
  {
    discipline: 'Power',
    category: 'SMPS Topologies',
    name: 'Synchronous Buck Duty Cycle',
    formulaOrSyntax: 'V_out = D * V_in, where D = T_on / (T_on + T_off)\nL_min = ((V_in - V_out) * D) / (f_sw * ΔI_L)',
    ruleOfThumb: 'Allow 20% to 40% inductor ripple current for optimal inductor size versus core loss.',
    tools: 'PLECS, LTspice'
  },
  {
    discipline: 'Power',
    category: 'Motor Control',
    name: 'Clarke & Park Transformations',
    formulaOrSyntax: 'Clarke: [Ia, Ib, Ic] -> [Iα, Iβ]\nPark: [Iα, Iβ] * [cosθ, sinθ] -> [Id (Flux), Iq (Torque)]',
    ruleOfThumb: 'In PMSM surface motors, keep Id = 0 to maximize Torque Per Ampere (MTPA).',
    tools: 'MATLAB / Simulink'
  }
];

interface CheatSheetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CheatSheetModal: React.FC<CheatSheetModalProps> = ({ isOpen, onClose }) => {
  const [search, setSearch] = useState('');
  const [disciplineFilter, setDisciplineFilter] = useState<string>('ALL');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  if (!isOpen) return null;

  const filtered = CHEAT_SHEET_DATA.filter((item) => {
    const matchesDiscipline = disciplineFilter === 'ALL' || item.discipline === disciplineFilter;
    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.formulaOrSyntax.toLowerCase().includes(search.toLowerCase()) ||
      item.ruleOfThumb.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase());
    return matchesDiscipline && matchesSearch;
  });

  const handleCopy = (formula: string, idx: number) => {
    navigator.clipboard.writeText(formula);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto no-print">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-[#07172C] text-white p-5 sm:p-6 flex items-center justify-between border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#FF6B00] rounded-lg text-white">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold tracking-tight">
                Engineering Formula &amp; Invariants Cheat Sheet
              </h3>
              <p className="text-xs text-slate-300">
                Silphor Technologies Exam &amp; Interview Quick Reference
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Filter Bar */}
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search formula, rule, or tool..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#FF6B00]"
            />
          </div>

          <div className="flex flex-wrap gap-1 w-full sm:w-auto">
            {['ALL', 'VLSI', 'Verification', 'PCB', 'Embedded', 'Power'].map((d) => (
              <button
                key={d}
                onClick={() => setDisciplineFilter(d)}
                className={`px-2.5 py-1 text-xs font-semibold rounded cursor-pointer ${
                  disciplineFilter === d
                    ? 'bg-[#0B2545] text-white'
                    : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* Content Table */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 flex-1">
          {filtered.length > 0 ? (
            <div className="space-y-3">
              {filtered.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-[#F8FAFC] border border-slate-200 rounded-xl p-4 hover:border-slate-300 transition-colors space-y-2"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold uppercase bg-[#00828A]/10 text-[#00828A] px-2 py-0.5 rounded border border-[#00828A]/30">
                        {item.discipline}
                      </span>
                      <span className="text-xs font-bold text-slate-900">{item.name}</span>
                      <span className="text-xs text-slate-400">· {item.category}</span>
                    </div>

                    <button
                      onClick={() => handleCopy(item.formulaOrSyntax, idx)}
                      className="flex items-center gap-1 text-[11px] font-semibold text-slate-500 hover:text-slate-800 cursor-pointer"
                    >
                      {copiedIndex === idx ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                      <span>{copiedIndex === idx ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>

                  {/* Formula Box */}
                  <div className="bg-[#07172C] text-amber-300 font-mono text-xs p-3 rounded-lg overflow-x-auto whitespace-pre-wrap">
                    {item.formulaOrSyntax}
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-600 pt-1">
                    <div>
                      <span className="font-bold text-[#FF6B00]">Rule of Thumb: </span>
                      {item.ruleOfThumb}
                    </div>
                    <div className="text-[11px] font-mono text-slate-500 shrink-0">
                      Tools: {item.tools}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-slate-500 text-sm">
              No formulas matched your search.
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 p-4 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#0B2545] text-white text-xs font-bold rounded-lg hover:bg-slate-800 cursor-pointer"
          >
            Close Cheat Sheet
          </button>
        </div>
      </div>
    </div>
  );
};
