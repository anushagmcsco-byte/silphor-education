import React, { useState } from 'react';
import { Layers, Play, RotateCcw, Cpu, Zap, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const ArchitectureVisualizer: React.FC = () => {
  const [activeVisualizer, setActiveVisualizer] = useState<'asic' | 'pcb' | 'cortex' | 'foc'>('asic');

  // ASIC Visualizer State
  const [asicStep, setAsicStep] = useState(0);

  // PCB Stackup State
  const [traceWidthMils, setTraceWidthMils] = useState(6.0);
  const [dielectricHeightMils, setDielectricHeightMils] = useState(4.0);

  // FOC State
  const [rotorAngleDeg, setRotorAngleDeg] = useState(45);
  const [torqueCommand, setTorqueCommand] = useState(80);

  const asicStages = [
    {
      title: 'Stage 1: Synthesizable RTL to Gate Netlist',
      tool: 'Synopsys Design Compiler',
      description: 'Translates behavioral Verilog/SystemVerilog RTL into generic logic gates and maps them against standard cell target libraries (.db). Generates initial gate netlist.',
      dieState: 'Synthesizing Boolean equations into AND, OR, XOR gates and flip-flops.',
      metrics: 'Logic Gates: 450,000 | Target Frequency: 400 MHz'
    },
    {
      title: 'Stage 2: Floorplanning & Power Mesh (PDN)',
      tool: 'Cadence Innovus',
      description: 'Defines the die boundary (aspect ratio 1.0, 70% utilization), anchors SRAM memory macros along outer edges with keep-out halos, and routes thick VDD/VSS metal straps.',
      dieState: 'Die boundary established with 4 memory macros and power grid stripes.',
      metrics: 'Core Utilization: 70% | VDD Mesh Layer: Metal 7 & Metal 8'
    },
    {
      title: 'Stage 3: Standard Cell Placement & Scan Stitch',
      tool: 'Cadence Innovus / Synopsys ICC2',
      description: 'Places standard logic gates into standard cell rows. Inserts test scan flip-flops (DFT) to guarantee silicon testability in post-silicon manufacturing.',
      dieState: 'Logic cells grouped by connectivity, minimizing wirelength congestion.',
      metrics: 'Congestion: 0.12% | Total Wirelength: 14.2 meters'
    },
    {
      title: 'Stage 4: Clock Tree Synthesis (CTS)',
      tool: 'Synopsys PrimeTime / Innovus CTS',
      description: 'Builds balanced clock distribution trees using symmetric H-tree and inverting buffer repeaters to minimize arrival skew across all sequential flops.',
      dieState: 'Clock tree branches radiating from central PLL to leaf registers.',
      metrics: 'Max Clock Skew: 38 ps | Clock Insertion Delay: 480 ps'
    },
    {
      title: 'Stage 5: Detailed Metal Routing & Crosstalk Mitigation',
      tool: 'Cadence Innovus Detailed Router',
      description: 'Routes signal tracks on Metal 1 through Metal 6 using grid-based Nanoroute. Enforces 3W spacing on high-speed nets to prevent capacitive crosstalk glitches.',
      dieState: 'Dense multi-tier orthogonal routing with zero shorts and zero opens.',
      metrics: 'DRC Violations: 0 | Layer Count: 8 Cu Layers'
    },
    {
      title: 'Stage 6: Signoff STA & GDSII Stream-Out',
      tool: 'Siemens Calibre & PrimeTime',
      description: 'Final multi-corner signoff timing check (SS, TT, FF PVT corners), DRC design-rule verification, and streaming out polygon masks in binary GDSII format for the fabrication fab.',
      dieState: 'Golden mask verified! Ready for tape-out fabrication.',
      metrics: 'Setup Slack: +45 ps (Pass) | Hold Slack: +18 ps (Pass)'
    }
  ];

  // Calculate PCB microstrip impedance (IPC formula approx)
  // Z0 ≈ (87 / sqrt(Er + 1.41)) * ln(5.98 * H / (0.8 * W + T))
  const er = 4.2; // FR-4
  const t = 1.4; // 1 oz copper in mils
  const rawZ0 = (87 / Math.sqrt(er + 1.41)) * Math.log((5.98 * dielectricHeightMils) / (0.8 * traceWidthMils + t));
  const z0 = Math.max(25, Math.min(120, Math.round(rawZ0)));

  return (
    <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden">
      {/* Visualizer Header */}
      <div className="bg-[#07172C] text-white p-6 border-b border-slate-800">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#00828A] font-bold uppercase tracking-wider mb-1">
              <Cpu className="w-4 h-4" />
              <span>Interactive Engineering Simulators</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Hardware Architecture &amp; Physical Flow Visualizer
            </h2>
          </div>

          {/* Mode Selector Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 bg-[#0B2545] p-1 rounded-lg border border-slate-700">
            <button
              onClick={() => setActiveVisualizer('asic')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                activeVisualizer === 'asic'
                  ? 'bg-[#FF6B00] text-white shadow'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              ASIC RTL-to-GDSII
            </button>
            <button
              onClick={() => setActiveVisualizer('pcb')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                activeVisualizer === 'pcb'
                  ? 'bg-[#FF6B00] text-white shadow'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              PCB Stackup &amp; Z₀
            </button>
            <button
              onClick={() => setActiveVisualizer('cortex')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                activeVisualizer === 'cortex'
                  ? 'bg-[#FF6B00] text-white shadow'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              ARM Cortex Memory
            </button>
            <button
              onClick={() => setActiveVisualizer('foc')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                activeVisualizer === 'foc'
                  ? 'bg-[#FF6B00] text-white shadow'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              FOC Motor Vectors
            </button>
          </div>
        </div>
      </div>

      {/* Visualizer Content Body */}
      <div className="p-6 sm:p-8">
        {/* ================= 1. ASIC FLOW VISUALIZER ================= */}
        {activeVisualizer === 'asic' && (
          <div className="space-y-6">
            {/* Step Progress Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
              {asicStages.map((stage, idx) => (
                <button
                  key={idx}
                  onClick={() => setAsicStep(idx)}
                  className={`p-2.5 rounded-lg text-left transition-all cursor-pointer border ${
                    asicStep === idx
                      ? 'bg-[#0B2545] text-white border-[#00828A] ring-2 ring-[#00828A]/40 shadow-sm'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <div className="text-[10px] font-mono font-bold uppercase text-[#FF6B00]">
                    Step {idx + 1}
                  </div>
                  <div className="text-xs font-semibold truncate">
                    {stage.title.split(':')[1]?.trim() || stage.title}
                  </div>
                </button>
              ))}
            </div>

            {/* Split Sandbox Display */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              {/* Left Zone: Live Silicon Die SVG Canvas */}
              <div className="lg:col-span-7 bg-[#07172C] rounded-xl p-6 border border-slate-700 shadow-inner flex flex-col items-center justify-center min-h-[340px]">
                <div className="text-xs font-mono text-slate-400 mb-2">
                  Silicon Die Substrate (7nm FinFET PDK)
                </div>

                <svg className="w-full max-w-[340px] h-[260px]" viewBox="0 0 300 240">
                  {/* Die Base */}
                  <rect x="20" y="20" width="260" height="200" rx="6" fill="#0B1B33" stroke="#1E3A8A" strokeWidth="2" />

                  {/* Stage 1: Synthesis Netlist Representation */}
                  {asicStep >= 0 && (
                    <g opacity={asicStep === 0 ? 1 : 0.4}>
                      <circle cx="60" cy="60" r="12" fill="#0284C7" />
                      <circle cx="150" cy="70" r="14" fill="#0284C7" />
                      <circle cx="240" cy="60" r="12" fill="#0284C7" />
                      <line x1="60" y1="60" x2="150" y2="70" stroke="#0284C7" strokeWidth="1.5" strokeDasharray="3 3" />
                      <line x1="150" y1="70" x2="240" y2="60" stroke="#0284C7" strokeWidth="1.5" strokeDasharray="3 3" />
                      <text x="150" y="98" fill="#93C5FD" fontSize="9" textAnchor="middle" fontFamily="monospace">Gate Netlist Mapping</text>
                    </g>
                  )}

                  {/* Stage 2: Floorplan Macros & Power Grid */}
                  {asicStep >= 1 && (
                    <g>
                      {/* VDD/VSS Power Straps */}
                      <line x1="20" y1="50" x2="280" y2="50" stroke="#EF4444" strokeWidth="2.5" opacity="0.6" />
                      <line x1="20" y1="120" x2="280" y2="120" stroke="#3B82F6" strokeWidth="2.5" opacity="0.6" />
                      <line x1="20" y1="190" x2="280" y2="190" stroke="#EF4444" strokeWidth="2.5" opacity="0.6" />
                      
                      {/* Corner SRAM Memory Macros */}
                      <rect x="30" y="30" width="55" height="40" rx="3" fill="#1E293B" stroke="#00828A" strokeWidth="1.5" />
                      <text x="57" y="54" fill="#5EEAD4" fontSize="8" textAnchor="middle" fontWeight="bold">SRAM 1</text>
                      <rect x="215" y="30" width="55" height="40" rx="3" fill="#1E293B" stroke="#00828A" strokeWidth="1.5" />
                      <text x="242" y="54" fill="#5EEAD4" fontSize="8" textAnchor="middle" fontWeight="bold">SRAM 2</text>
                    </g>
                  )}

                  {/* Stage 3: Placement Standard Cells */}
                  {asicStep >= 2 && (
                    <g>
                      <rect x="95" y="75" width="110" height="85" fill="#0F2B48" rx="4" stroke="#38BDF8" strokeWidth="1" />
                      <rect x="102" y="82" width="16" height="10" fill="#38BDF8" rx="1" />
                      <rect x="124" y="82" width="22" height="10" fill="#38BDF8" rx="1" />
                      <rect x="152" y="82" width="18" height="10" fill="#38BDF8" rx="1" />
                      <rect x="176" y="82" width="20" height="10" fill="#38BDF8" rx="1" />
                      
                      <rect x="102" y="98" width="26" height="10" fill="#38BDF8" rx="1" />
                      <rect x="134" y="98" width="18" height="10" fill="#38BDF8" rx="1" />
                      <rect x="158" y="98" width="38" height="10" fill="#38BDF8" rx="1" />
                      <text x="150" y="145" fill="#BAE6FD" fontSize="8" textAnchor="middle">Std Cell Placement</text>
                    </g>
                  )}

                  {/* Stage 4: Clock Tree Synthesis (H-Tree) */}
                  {asicStep >= 3 && (
                    <g stroke="#F59E0B" strokeWidth="2" strokeLinecap="round">
                      {/* Central Trunk */}
                      <line x1="150" y1="20" x2="150" y2="120" />
                      <line x1="150" y1="120" x2="150" y2="170" />
                      {/* Horizontal Branches */}
                      <line x1="90" y1="120" x2="210" y2="120" />
                      <line x1="90" y1="100" x2="90" y2="140" />
                      <line x1="210" y1="100" x2="210" y2="140" />
                      <circle cx="150" cy="120" r="4" fill="#F59E0B" />
                    </g>
                  )}

                  {/* Stage 5: Detailed Metal Routing */}
                  {asicStep >= 4 && (
                    <g stroke="#10B981" strokeWidth="1.2">
                      <path d="M 102 87 L 102 110 L 134 110 L 134 103" fill="none" />
                      <path d="M 146 87 L 146 115 L 176 115 L 176 92" fill="none" />
                      <path d="M 85 50 L 102 50 L 102 82" fill="none" />
                      <path d="M 215 50 L 196 50 L 196 82" fill="none" />
                    </g>
                  )}

                  {/* Stage 6: Signoff Golden Stamp */}
                  {asicStep >= 5 && (
                    <g>
                      <rect x="75" y="180" width="150" height="28" rx="4" fill="#065F46" stroke="#34D399" strokeWidth="1.5" />
                      <text x="150" y="198" fill="#ECFDF5" fontSize="10" textAnchor="middle" fontWeight="bold">
                        ✓ PASSED DRC/LVS SIGNOFF
                      </text>
                    </g>
                  )}
                </svg>

                <div className="text-[11px] text-slate-300 text-center mt-2 max-w-sm italic">
                  {asicStages[asicStep].dieState}
                </div>
              </div>

              {/* Right Zone: Explanatory Card & Step Control */}
              <div className="lg:col-span-5 space-y-4">
                <div className="bg-[#F8FAFC] border border-slate-200 rounded-xl p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#FF6B00] uppercase tracking-wider font-mono">
                      Workflow Stage {asicStep + 1} of 6
                    </span>
                    <span className="text-xs font-bold text-slate-600 bg-white px-2 py-0.5 rounded border border-slate-200">
                      {asicStages[asicStep].tool}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-[#0B2545]">
                    {asicStages[asicStep].title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {asicStages[asicStep].description}
                  </p>

                  <div className="bg-white p-3 rounded-lg border border-slate-200 text-xs font-mono text-slate-800">
                    <span className="font-bold text-[#00828A]">PDK Metrics: </span>
                    {asicStages[asicStep].metrics}
                  </div>
                </div>

                {/* Step Controls */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setAsicStep((prev) => (prev > 0 ? prev - 1 : 0))}
                    disabled={asicStep === 0}
                    className={`flex-1 py-2 px-3 text-xs font-bold rounded-lg border transition-colors cursor-pointer ${
                      asicStep === 0
                        ? 'text-slate-300 border-slate-200 cursor-not-allowed'
                        : 'text-slate-700 border-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    Previous Phase
                  </button>
                  <button
                    onClick={() => setAsicStep((prev) => (prev < asicStages.length - 1 ? prev + 1 : 0))}
                    className="flex-1 py-2 px-3 text-xs font-bold rounded-lg bg-[#FF6B00] hover:bg-[#EA580C] text-white transition-colors cursor-pointer shadow flex items-center justify-center gap-1.5"
                  >
                    <span>{asicStep === asicStages.length - 1 ? 'Restart Flow' : 'Advance Next Phase'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= 2. PCB STACKUP VISUALIZER ================= */}
        {activeVisualizer === 'pcb' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Zone: Interactive Controls & Impedance Readout */}
              <div className="lg:col-span-5 bg-slate-50 border border-slate-200 rounded-xl p-6 space-y-5">
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-[#0B2545]">
                    Controlled Impedance Calculator (Microstrip)
                  </h3>
                  <p className="text-xs text-slate-500">
                    Adjust physical dimensions to reach standard 50Ω single-ended target impedance.
                  </p>
                </div>

                {/* Live Impedance Target Box */}
                <div className={`p-4 rounded-xl border text-center transition-colors ${
                  Math.abs(z0 - 50) <= 3
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                    : 'bg-amber-50 border-amber-300 text-amber-900'
                }`}>
                  <div className="text-xs uppercase font-bold tracking-wider">
                    Calculated Impedance (Z₀)
                  </div>
                  <div className="text-3xl font-extrabold font-mono py-1">
                    {z0} Ω
                  </div>
                  <div className="text-xs font-semibold">
                    {Math.abs(z0 - 50) <= 3 ? '✓ Ideal 50Ω Matched (No Reflection)' : '⚠️ Mismatched (Signal Reflections Likely)'}
                  </div>
                </div>

                {/* Slider 1: Trace Width */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold text-slate-700">
                    <span>Trace Width (W)</span>
                    <span className="font-mono">{traceWidthMils.toFixed(1)} mils</span>
                  </div>
                  <input
                    type="range"
                    min="3"
                    max="15"
                    step="0.5"
                    value={traceWidthMils}
                    onChange={(e) => setTraceWidthMils(parseFloat(e.target.value))}
                    className="w-full accent-[#FF6B00] cursor-pointer"
                  />
                  <div className="text-[11px] text-slate-500">
                    Wider copper trace reduces inductance, lowering characteristic impedance.
                  </div>
                </div>

                {/* Slider 2: Dielectric Height */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold text-slate-700">
                    <span>Dielectric Height to GND (H)</span>
                    <span className="font-mono">{dielectricHeightMils.toFixed(1)} mils</span>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="10"
                    step="0.5"
                    value={dielectricHeightMils}
                    onChange={(e) => setDielectricHeightMils(parseFloat(e.target.value))}
                    className="w-full accent-[#00828A] cursor-pointer"
                  />
                  <div className="text-[11px] text-slate-500">
                    Thinner prepreg increases capacitive coupling to GND, lowering Z₀.
                  </div>
                </div>
              </div>

              {/* Right Zone: 6-Layer Physical Stackup Diagram */}
              <div className="lg:col-span-7 bg-[#07172C] rounded-xl p-6 border border-slate-700 text-white space-y-4">
                <div className="flex justify-between items-center text-xs text-slate-400 font-mono">
                  <span>Standard 6-Layer Symmetrical Cross-Section</span>
                  <span className="text-[#00828A]">FR-4 (Er = 4.2)</span>
                </div>

                <div className="space-y-1.5 font-mono text-xs">
                  {/* Layer 1: Top Signal */}
                  <div className="bg-[#B45309] text-white p-2.5 rounded flex items-center justify-between border border-amber-500/40">
                    <span className="font-bold">L1: Top Microstrip Trace (W = {traceWidthMils} mils)</span>
                    <span className="text-[10px] bg-black/40 px-2 py-0.5 rounded">High-Speed RF/CLK</span>
                  </div>

                  {/* Prepreg */}
                  <div className="bg-slate-700/60 text-slate-300 text-[10px] text-center py-1">
                    ↕ Prepreg Dielectric (H = {dielectricHeightMils} mils) — Return Current Electric Field
                  </div>

                  {/* Layer 2: Solid GND */}
                  <div className="bg-[#047857] text-white p-2.5 rounded flex items-center justify-between border border-emerald-400/40">
                    <span className="font-bold">L2: Solid Ground Plane (GND)</span>
                    <span className="text-[10px] bg-black/40 px-2 py-0.5 rounded">Primary Reference</span>
                  </div>

                  {/* Core */}
                  <div className="bg-slate-700/60 text-slate-300 text-[10px] text-center py-1">
                    ↕ Core Dielectric (8.0 mils)
                  </div>

                  {/* Layer 3: Inner Stripline */}
                  <div className="bg-[#0284C7] text-white p-2.5 rounded flex items-center justify-between border border-sky-400/40">
                    <span className="font-bold">L3: Inner Signal (Stripline Bus)</span>
                    <span className="text-[10px] bg-black/40 px-2 py-0.5 rounded">Shielded</span>
                  </div>

                  {/* Prepreg */}
                  <div className="bg-slate-700/60 text-slate-300 text-[10px] text-center py-1">
                    ↕ Prepreg Dielectric (8.0 mils)
                  </div>

                  {/* Layer 4: Power */}
                  <div className="bg-[#B91C1C] text-white p-2.5 rounded flex items-center justify-between border border-rose-400/40">
                    <span className="font-bold">L4: VDD Power Plane (3V3 / 1V8 Splits)</span>
                    <span className="text-[10px] bg-black/40 px-2 py-0.5 rounded">Power Delivery</span>
                  </div>

                  {/* Core */}
                  <div className="bg-slate-700/60 text-slate-300 text-[10px] text-center py-1">
                    ↕ Core Dielectric (8.0 mils)
                  </div>

                  {/* Layer 5: Secondary GND */}
                  <div className="bg-[#047857] text-white p-2.5 rounded flex items-center justify-between border border-emerald-400/40">
                    <span className="font-bold">L5: Solid Ground Plane (GND)</span>
                    <span className="text-[10px] bg-black/40 px-2 py-0.5 rounded">Reference for L6</span>
                  </div>

                  {/* Layer 6: Bottom */}
                  <div className="bg-[#B45309] text-white p-2.5 rounded flex items-center justify-between border border-amber-500/40">
                    <span className="font-bold">L6: Bottom Signal</span>
                    <span className="text-[10px] bg-black/40 px-2 py-0.5 rounded">I/O & Testpoints</span>
                  </div>
                </div>

                <div className="text-[11px] text-slate-300 bg-black/30 p-3 rounded-lg border border-slate-700">
                  <span className="font-bold text-[#FF6B00]">Key Rule: </span>
                  Always provide an unbroken solid reference ground plane directly above or below high-speed routing to prevent radiated EMI and crosstalk.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= 3. ARM CORTEX-M MEMORY MAP ================= */}
        {activeVisualizer === 'cortex' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              {/* Memory Layout Diagram */}
              <div className="md:col-span-6 bg-[#07172C] rounded-xl p-6 border border-slate-700 text-white space-y-3">
                <div className="text-xs font-mono text-slate-400 flex justify-between">
                  <span>ARM Cortex-M4 Address Space</span>
                  <span className="text-[#00828A]">32-Bit Linear</span>
                </div>

                <div className="space-y-2 font-mono text-xs">
                  {/* Flash Section */}
                  <div className="border border-sky-500/40 bg-sky-950/40 p-3 rounded-lg">
                    <div className="flex justify-between text-sky-400 font-bold mb-1">
                      <span>INTERNAL FLASH MEMORY</span>
                      <span>0x0800_0000 - 0x0807_FFFF</span>
                    </div>
                    <div className="space-y-1 pl-2 text-[11px] text-slate-300">
                      <div className="flex justify-between bg-black/30 p-1 rounded">
                        <span>[0x0800_0000] Vector Table (MSP &amp; Reset Handler)</span>
                        <span className="text-amber-400">Fixed</span>
                      </div>
                      <div className="flex justify-between bg-black/30 p-1 rounded">
                        <span>[0x0800_01AC] .text segment (C Machine Code)</span>
                        <span className="text-sky-300">Read-Only</span>
                      </div>
                      <div className="flex justify-between bg-black/30 p-1 rounded">
                        <span>[0x0801_0000] .rodata segment (const strings, tables)</span>
                        <span className="text-sky-300">Read-Only</span>
                      </div>
                    </div>
                  </div>

                  {/* SRAM Section */}
                  <div className="border border-emerald-500/40 bg-emerald-950/40 p-3 rounded-lg">
                    <div className="flex justify-between text-emerald-400 font-bold mb-1">
                      <span>INTERNAL SRAM MEMORY</span>
                      <span>0x2000_0000 - 0x2001_FFFF</span>
                    </div>
                    <div className="space-y-1 pl-2 text-[11px] text-slate-300">
                      <div className="flex justify-between bg-black/30 p-1 rounded">
                        <span>[0x2000_0000] .data (initialized globals, copied from Flash)</span>
                        <span className="text-emerald-300">R/W</span>
                      </div>
                      <div className="flex justify-between bg-black/30 p-1 rounded">
                        <span>[0x2000_0400] .bss (uninitialized globals, cleared to 0)</span>
                        <span className="text-emerald-300">R/W</span>
                      </div>
                      <div className="flex justify-between bg-black/30 p-1 rounded text-amber-300">
                        <span>[0x2000_1000] Heap (malloc, grows upward ▲)</span>
                        <span>Dynamic</span>
                      </div>
                      <div className="flex justify-between bg-rose-950/60 p-1 rounded text-rose-300 border border-rose-500/40 font-bold">
                        <span>[0x2001_FFFF] Stack (local vars, grows downward ▼)</span>
                        <span>MSP</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-[11px] text-amber-300 bg-amber-950/30 p-2.5 rounded border border-amber-500/30">
                  ⚠️ <strong>Stack Overflow Collision:</strong> If recursion or large local buffers cause the Stack (downward) to collide with Heap (upward), memory corruption triggers a HardFault!
                </div>
              </div>

              {/* Cortex-M Boot Sequence Flow */}
              <div className="md:col-span-6 bg-[#F8FAFC] border border-slate-200 rounded-xl p-6 space-y-4">
                <h3 className="text-sm font-bold text-[#0B2545] uppercase tracking-wider">
                  The Microcontroller Boot Sequence
                </h3>

                <ol className="space-y-2.5 text-xs text-slate-700">
                  <li className="flex gap-2">
                    <span className="font-bold text-[#FF6B00]">1.</span>
                    <span><strong>Power-on Reset:</strong> CPU hardware fetches initial Stack Pointer value from address 0x08000000 into the MSP register.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-bold text-[#FF6B00]">2.</span>
                    <span><strong>Load Reset Handler:</strong> CPU reads the pointer at 0x08000004 and jumps to the Reset_Handler() routine in startup_stm32.s.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-bold text-[#FF6B00]">3.</span>
                    <span><strong>Copy .data Segment:</strong> Loop copies initial variable values from non-volatile Flash into SRAM.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-bold text-[#FF6B00]">4.</span>
                    <span><strong>Zero .bss Segment:</strong> Loop fills all uninitialized static/global variable locations in SRAM with zeros.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-bold text-[#FF6B00]">5.</span>
                    <span><strong>Call main():</strong> System enters user C code, initializes PLL clocks, peripherals, and starts FreeRTOS scheduler.</span>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        )}

        {/* ================= 4. FOC MOTOR VECTOR VISUALIZER ================= */}
        {activeVisualizer === 'foc' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              {/* Interactive Vector Controls */}
              <div className="md:col-span-5 bg-slate-50 border border-slate-200 rounded-xl p-6 space-y-4">
                <h3 className="text-base font-bold text-[#0B2545]">
                  Field Oriented Control (FOC) Decoupled Vectors
                </h3>
                <p className="text-xs text-slate-600">
                  FOC resolves 3-phase AC stator currents into two DC vectors rotating synchronously with the magnetic rotor.
                </p>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold text-slate-700">
                    <span>Rotor Angle (θ_elec)</span>
                    <span className="font-mono">{rotorAngleDeg}°</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="360"
                    value={rotorAngleDeg}
                    onChange={(e) => setRotorAngleDeg(parseInt(e.target.value))}
                    className="w-full accent-[#FF6B00] cursor-pointer"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold text-slate-700">
                    <span>Torque Current Command (I_q)</span>
                    <span className="font-mono">{torqueCommand} %</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={torqueCommand}
                    onChange={(e) => setTorqueCommand(parseInt(e.target.value))}
                    className="w-full accent-[#00828A] cursor-pointer"
                  />
                </div>

                <div className="bg-white p-3.5 rounded-lg border border-slate-200 space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="font-bold text-slate-600">Flux Axis (I_d):</span>
                    <span className="font-mono font-bold text-sky-700">0.0 A (Zero for MTPA)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-bold text-slate-600">Torque Axis (I_q):</span>
                    <span className="font-mono font-bold text-[#FF6B00]">{(torqueCommand * 0.5).toFixed(1)} A</span>
                  </div>
                </div>
              </div>

              {/* Vector Compass SVG */}
              <div className="md:col-span-7 bg-[#07172C] rounded-xl p-6 border border-slate-700 flex flex-col items-center justify-center min-h-[300px]">
                <div className="text-xs font-mono text-slate-400 mb-2">
                  Synchronous Rotating Reference Frame (d-q Axis)
                </div>

                <svg className="w-[260px] h-[220px]" viewBox="-130 -110 260 220">
                  {/* Stationary Axes α-β */}
                  <line x1="-100" y1="0" x2="100" y2="0" stroke="#334155" strokeWidth="1.5" strokeDasharray="3 3" />
                  <line x1="0" y1="-90" x2="0" y2="90" stroke="#334155" strokeWidth="1.5" strokeDasharray="3 3" />
                  <text x="105" y="4" fill="#64748B" fontSize="9">α</text>
                  <text x="-4" y="-95" fill="#64748B" fontSize="9">β</text>

                  {/* Rotating d-axis (Flux) */}
                  {(() => {
                    const rad = (rotorAngleDeg * Math.PI) / 180;
                    const dx = 75 * Math.cos(rad);
                    const dy = -75 * Math.sin(rad);
                    // q-axis is 90 deg ahead
                    const qrad = rad + Math.PI / 2;
                    const qlen = (torqueCommand / 100) * 80;
                    const qx = qlen * Math.cos(qrad);
                    const qy = -qlen * Math.sin(qrad);

                    return (
                      <g>
                        {/* d-vector (blue) */}
                        <line x1="0" y1="0" x2={dx} y2={dy} stroke="#0284C7" strokeWidth="3" markerEnd="url(#arrow-blue)" />
                        <text x={dx + 8} y={dy + 4} fill="#38BDF8" fontSize="10" fontWeight="bold">d (Flux)</text>

                        {/* q-vector (orange) */}
                        <line x1="0" y1="0" x2={qx} y2={qy} stroke="#FF6B00" strokeWidth="3.5" />
                        <text x={qx + 8} y={qy + 4} fill="#FF6B00" fontSize="10" fontWeight="bold">q (Torque)</text>

                        <circle cx="0" cy="0" r="4" fill="#F8FAFC" />
                      </g>
                    );
                  })()}
                </svg>

                <div className="text-[11px] text-slate-300 text-center mt-2 max-w-sm">
                  By keeping flux current <code className="text-sky-300">Id = 0</code>, 100% of inverter current goes into generating pure electromagnetic torque on <code className="text-[#FF6B00]">Iq</code>!
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
