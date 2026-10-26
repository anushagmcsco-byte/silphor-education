/**
 * Comprehensive Educational Study Notes extracted & summarized from Silphor Technologies curricula
 * Curated for student learning, exam revision, and engineering interview preparation.
 */

export interface StudyTopic {
  id: string;
  title: string;
  subheading: string;
  estimatedReadTime: string;
  summary: string;
  analogy: string;
  corePrinciples: {
    title: string;
    description: string;
    ruleOfThumb?: string;
  }[];
  formulaOrSyntax?: {
    label: string;
    formula: string;
    explanation: string;
  };
  industryTools: string[];
  codeOrConstraintSnippet?: {
    language: string;
    code: string;
    explanation: string;
  };
  interviewFaq: {
    question: string;
    answer: string;
  };
  quickRevisionTakeaways: string[];
  quiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

export interface CourseTrack {
  id: string;
  trackCode: string;
  title: string;
  tagline: string;
  category: 'VLSI' | 'Verification' | 'PCB' | 'Embedded' | 'Power Electronics';
  duration: string;
  mode: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Beginner to Intermediate';
  overview: string;
  industryImpact: string;
  edaTools: string[];
  topics: StudyTopic[];
}

export const SILPHOR_COURSES: CourseTrack[] = [
  {
    id: 'crs-vlsi-01',
    trackCode: 'VLSI-101',
    title: 'Advanced VLSI Design & Physical Implementation',
    tagline: 'Comprehensive RTL-to-GDSII industrial workflow covering Synthesis, Floorplanning, CTS, Routing & PrimeTime Signoff',
    category: 'VLSI',
    duration: '24 Weeks (6 Months)',
    mode: 'Hybrid Lab & Online',
    level: 'Advanced',
    overview: 'Teaches modern sub-14nm/7nm ASIC design cycles. Bridges high-level RTL architecture down to physical silicon manufacturing masks (GDSII) meeting strict multi-corner setup/hold timing, IR-drop tolerances, and design-rule checks.',
    industryImpact: 'Critical for semiconductor product tape-outs at companies like Intel, NVIDIA, Qualcomm, AMD, and Texas Instruments.',
    edaTools: ['Synopsys Design Compiler', 'Cadence Innovus', 'Synopsys PrimeTime', 'Siemens Calibre', 'QuestaSim'],
    topics: [
      {
        id: 'vlsi-syn-rtl',
        title: 'Synthesizable RTL & Clock Domain Crossing (CDC)',
        subheading: 'Building clean synchronous logic and preventing metastability across asynchronous boundaries',
        estimatedReadTime: '8 min read',
        summary: 'In digital hardware design, Verilog/VHDL code must represent physical gates and flip-flops rather than software procedures. Asynchronous clock domain crossing happens whenever a signal moves between registers clocked by independent sources, introducing risk of metastability.',
        analogy: 'Imagine two people jumping on separate trampolines at different rhythms trying to pass a glass of water without spilling. If the receiver reaches when the sender is mid-air, the water drops (metastability). Synchronizers act as a holding bench where the glass is placed steadily before pickup.',
        corePrinciples: [
          {
            title: 'Synchronous Flop Registers',
            description: 'Always use non-blocking assignments (<=) for sequential flip-flops triggered strictly on clock edges (posedge clk).',
            ruleOfThumb: 'Never generate internal clocks using combinational gates (clock glitching).'
          },
          {
            title: 'Metastability Resolution',
            description: 'When setup or hold time is violated on a register, output hovers in an invalid intermediate voltage state before settling randomly. A 2-Flip-Flop (2-FF) synchronizer provides MTBF (Mean Time Between Failures) in decades.',
            ruleOfThumb: 'Single-bit control signals: 2-FF synchronizer. Multi-bit data buses: Asynchronous FIFO with Gray-code pointers.'
          },
          {
            title: 'Static Timing Analysis (STA) Foundations',
            description: 'STA validates every register-to-register path without running dynamic simulation vectors. Setup time checks maximum data arrival delay, while hold time checks minimum contamination delay.',
            ruleOfThumb: 'Setup violations depend on clock frequency (slow down clock to fix). Hold violations are frequency-independent (fixed by adding delay buffers).'
          }
        ],
        formulaOrSyntax: {
          label: 'Setup & Hold Timing Constraints',
          formula: 'Setup: T_clk >= T_cq + T_comb_max + T_setup - T_skew\nHold:  T_cq + T_comb_min >= T_hold + T_skew',
          explanation: 'T_cq is clock-to-Q output delay; T_comb is combinational delay; T_skew is clock arrival difference at launch and capture flip-flops.'
        },
        industryTools: ['Synopsys Design Compiler', 'QuestaSim', 'Cadence Genus'],
        codeOrConstraintSnippet: {
          language: 'verilog',
          code: `// Robust 2-Stage Flip-Flop Synchronizer for CDC
module cdc_2ff_sync #(
  parameter DATA_WIDTH = 1
)(
  input  wire                  dst_clk,
  input  wire                  dst_rst_n,
  input  wire [DATA_WIDTH-1:0] async_in,
  output reg  [DATA_WIDTH-1:0] sync_out
);
  reg [DATA_WIDTH-1:0] meta_reg;

  always @(posedge dst_clk or negedge dst_rst_n) begin
    if (!dst_rst_n) begin
      meta_reg <= {DATA_WIDTH{1'b0}};
      sync_out <= {DATA_WIDTH{1'b0}};
    end else begin
      meta_reg <= async_in;   // First stage absorbs metastability
      sync_out <= meta_reg;   // Second stage delivers clean signal
    end
  end
endmodule`,
          explanation: 'Standard synchronizer macro ensuring downstream logic receives a clean, non-metastable digital value.'
        },
        interviewFaq: {
          question: 'Why can you not use a simple 2-FF synchronizer for a multi-bit data bus?',
          answer: 'Because of differing physical trace lengths and gate delays, individual bits may arrive across clock edges at slightly different nanoseconds. The receiving clock may sample some updated bits and some old bits, producing a catastrophic corrupted data value. Multi-bit transfers must use an Asynchronous FIFO or handshake protocol where Gray code guarantees only 1 bit flips at any clock cycle.'
        },
        quickRevisionTakeaways: [
          'Setup violation: Data too slow (decrease clock speed or optimize logic gates).',
          'Hold violation: Data too fast (independent of frequency; solved by adding delay buffers).',
          'Clock Domain Crossing requires 2-FF synchronizer for single bits, Gray-coded Async FIFO for buses.',
          'Never drive clock pins from combinatorial logic gates without dedicated glitchless clock multiplexers (ICG cells).'
        ],
        quiz: {
          question: 'If a design exhibits a setup timing violation of 150ps on a critical path, which action will resolve it without re-synthesizing?',
          options: [
            'Increasing clock frequency from 500 MHz to 600 MHz',
            'Lowering clock frequency slightly to increase clock period',
            'Adding buffer delay along the combinational data path',
            'Increasing hold time margin in the SDC constraints'
          ],
          correctIndex: 1,
          explanation: 'Setup time check is T_clk >= T_cq + T_comb + T_setup. Lowering clock frequency increases the available clock period T_clk, allowing more time for the data path to arrive.'
        }
      },
      {
        id: 'vlsi-floorplanning-cts',
        title: 'Physical Design: Floorplanning, Power Grid & CTS',
        subheading: 'From netlist to standard cells: defining chip geometry, core utilization, and low-skew clock distribution',
        estimatedReadTime: '9 min read',
        summary: 'Floorplanning dictates the physical location of macros (memories, PLLs, analog IP) and sets the standard cell utilization boundary. Clock Tree Synthesis (CTS) then inserts specialized balanced buffer trees so the master clock arrives at millions of sequential elements at nearly the identical instant.',
        analogy: 'Floorplanning is like city urban planning: placing industrial zones (memory macros) on outer perimeters, zoning residential neighborhoods (standard logic gates) in the middle, and laying giant aqueducts (VDD/VSS power stripes) across every avenue.',
        corePrinciples: [
          {
            title: 'Core Utilization & Aspect Ratio',
            description: 'Core utilization sets the percentage of silicon area occupied by standard cells versus open routing channels. Typically 65% - 75% for initial floorplans to leave headroom for CTS buffers, scan insertion, and timing eco fix cells.',
            ruleOfThumb: 'Utilizations above 80% lead to severe routing congestion and design rule violations in sub-10nm nodes.'
          },
          {
            title: 'Power Distribution Network (PDN / Power Mesh)',
            description: 'Rings and stripes on top-level thick metal layers (e.g. M7/M8) minimize resistance and prevent dynamic voltage drop (IR drop) that causes gates to switch sluggishly.',
            ruleOfThumb: 'Power grid must handle peak instantaneous di/dt current without exceeding 5% VDD supply drop.'
          },
          {
            title: 'Clock Tree Synthesis (CTS)',
            description: 'Clocks consume up to 40% of total dynamic chip power. CTS utilizes H-Tree, fishbone, or clock mesh topologies to balance insertion delay and keep clock skew below 50ps.',
            ruleOfThumb: 'Clock skew is relative arrival delta between flops. Clock latency is absolute delay from source PLL to flop pin.'
          }
        ],
        formulaOrSyntax: {
          label: 'Clock Skew Definition',
          formula: 'T_skew = T_latency(Capture_Flop) - T_latency(Launch_Flop)',
          explanation: 'Positive skew helps setup timing on the current path, but hurts hold timing on the same path.'
        },
        industryTools: ['Cadence Innovus', 'Synopsys IC Compiler II', 'PrimeTime'],
        codeOrConstraintSnippet: {
          language: 'tcl',
          code: `# Synopsys SDC Timing Constraint Sample
create_clock -name "SYS_CLK" -period 2.500 [get_ports clk_in]
set_clock_uncertainty -setup 0.150 [get_clocks SYS_CLK]
set_clock_uncertainty -hold 0.050 [get_clocks SYS_CLK]
set_clock_transition -rise 0.080 [get_clocks SYS_CLK]

# Core utilization and floorplan boundary
initialize_floorplan -core_utilization 0.70 -aspect_ratio 1.0 -core_space 5.0`,
          explanation: 'Defines a 400 MHz system clock with setup/hold jitter margins and initializes a square 70% utilization floorplan.'
        },
        interviewFaq: {
          question: 'What is the trade-off between an H-Tree clock distribution and a Clock Mesh?',
          answer: 'An H-Tree offers lower power consumption and predictable latency by symmetrically branching to leaf clusters, but is susceptible to on-chip variation (OCV). A Clock Mesh cross-connects driver outputs into a unified grid, yielding near-zero skew and extreme resistance to process variations, but draws substantially higher dynamic switching power.'
        },
        quickRevisionTakeaways: [
          'Macro placement rule: Anchor large memory blocks along chip perimeters with pins facing inward.',
          'Decoupling capacitors (decap cells) must be sprinkled near power-hungry cells to buffer di/dt spikes.',
          'Clock Tree Synthesis happens after placement of standard cells and before detailed routing.',
          'Sub-7nm finFETs use high-metal layers (M7-M10) for low-resistance power straps and long global clock trunks.'
        ],
        quiz: {
          question: 'Why do physical design engineers avoid placing standard logic cells in between closely packed memory macros?',
          options: [
            'Standard cells overheat if placed near RAM blocks',
            'Routing congestion and narrow channel pin blockage create DRC pin-access errors',
            'Design Compiler cannot synthesize cells between macros',
            'Innovus will fail to calculate static power'
          ],
          correctIndex: 1,
          explanation: 'Narrow channels between macros suffer from severe routing track congestion, pin blockage, and crosstalk DRC violations. Routing halo obstructions prevent cell placement in these tight corridors.'
        }
      },
      {
        id: 'vlsi-signoff-calibre',
        title: 'Signoff Verification: PrimeTime Timing, DRC/LVS & GDSII',
        subheading: 'Final validation before tape-out: multi-corner STA, physical rule decks, electromigration, and stream-out',
        estimatedReadTime: '7 min read',
        summary: 'Signoff is the formal gateway between IC design and the foundry fabrication fab. Any bug escaping signoff costs upwards of $5M to $20M in lost silicon mask fabrication fees. PrimeTime handles multi-mode multi-corner (MMMC) timing, while Siemens Calibre enforces physical geometry rules.',
        analogy: 'Signoff is like the pre-flight structural inspection of a commercial airliner: inspecting every rivet against blueprints (LVS) and checking that no wing flaps touch during turbulent maneuvers (DRC) across freezing arctic skies and scorching deserts (PVT corners).',
        corePrinciples: [
          {
            title: 'Design Rule Checking (DRC)',
            description: 'Foundry rule decks specify minimum metal spacing, minimum trace widths, enclosure rules, and density minimums to prevent open circuits, shorts, and chemical mechanical polishing (CMP) erosion.',
            ruleOfThumb: 'Metal fill insertion is required post-routing to satisfy density requirements (e.g. 20% to 80% metal presence per tile).'
          },
          {
            title: 'Layout Versus Schematic (LVS)',
            description: 'Extracts the physical transistors, diodes, resistors, and metal wiring from GDSII polygon shapes and verifies 1-to-1 equivalence against the gate-level synthesized schematic netlist.',
            ruleOfThumb: 'LVS catches missing connections, unintended shorts, and substrate well taps.'
          },
          {
            title: 'Process, Voltage, Temperature (PVT) Corners',
            description: 'Timing must close across all operational extremes: Worst-case (SS slow process, low voltage, 125°C - max delay for setup checks) and Best-case (FF fast process, high voltage, -40°C - min delay for hold checks).',
            ruleOfThumb: 'At sub-16nm finFETs, temperature inversion causes cells to run slower at low temperatures under low VDD.'
          }
        ],
        formulaOrSyntax: {
          label: 'Electromigration (Black\'s Equation)',
          formula: 'MTTF = A * J^(-n) * exp(E_a / (k * T))',
          explanation: 'Mean Time to Failure (MTTF) of a metal wire decreases exponentially as current density J increases and temperature T rises, causing atom migration and void formation.'
        },
        industryTools: ['Siemens Calibre DRC/LVS', 'Synopsys PrimeTime', 'Ansys RedHawk (IR Drop)'],
        codeOrConstraintSnippet: {
          language: 'tcl',
          code: `# PrimeTime MMMC Signoff Script Snippet
set_operating_conditions -analysis_type on_chip_variation
read_parasitics -format SPEF -keep_capacitive_coupling top.spef.max
update_timing -full

# Generate signoff report
report_timing -delay_type max -nworst 10 -max_paths 100 > signoff_setup.rpt
report_timing -delay_type min -nworst 10 -max_paths 100 > signoff_hold.rpt
check_timing -verbose`,
          explanation: 'Runs full On-Chip Variation (OCV) timing analysis with back-annotated SPEF parasitics.'
        },
        interviewFaq: {
          question: 'What is the difference between Antenna DRC Violations and standard spacing violations?',
          answer: 'An antenna violation (plasma-induced damage) occurs during manufacturing when long metal tracks act as antennas during reactive ion etching, collecting static electrical charge. If this charge exceeds a ratio of gate oxide area, it discharges through thin transistor gate oxide, permanently destroying the transistor. It is fixed by inserting reverse-biased antenna protection diodes or by bridging the wire to a higher metal layer.'
        },
        quickRevisionTakeaways: [
          'DRC validates geometric rules; LVS validates electrical netlist matching.',
          'SPEF files contain extracted parasitic resistance (R) and capacitance (C) from routed metal shapes.',
          'Multi-Corner Multi-Mode (MCMM) analyzes functional modes (mission, scan-test, sleep) across PVT corners.',
          'GDSII / OASIS is the final binary format containing layer numbers and polygons sent to the foundry mask shop.'
        ],
        quiz: {
          question: 'Which tool and metric verifies that supply voltage does not sag below safe thresholds when multiple logic blocks switch simultaneously?',
          options: [
            'Calibre DRC verifying minimum metal enclosure',
            'Ansys RedHawk / Voltus analyzing dynamic IR-drop',
            'QuestaSim checking functional code coverage',
            'Verilator compiling C++ cycle simulation'
          ],
          correctIndex: 1,
          explanation: 'Dynamic IR-drop tools (such as Ansys RedHawk or Cadence Voltus) evaluate instantaneous current draw during high switching activity to verify that voltage supply drop does not induce timing failures or logic resets.'
        }
      }
    ]
  },
  {
    id: 'crs-rtl-02',
    trackCode: 'VERIF-201',
    title: 'RTL Design & SystemVerilog / UVM Verification',
    tagline: 'Master synthesizable Verilog, SystemVerilog OOP, SVA assertions, and Universal Verification Methodology (UVM 1.2)',
    category: 'Verification',
    duration: '16 Weeks (4 Months)',
    mode: 'Online Live & Hands-on',
    level: 'Intermediate',
    overview: 'Modern SoCs are 70% verification effort. This track covers industrial functional verification methodologies: building automated, self-checking constrained-random testbenches with SystemVerilog OOP, protocol VIPs, and standard UVM 1.2 architectures.',
    industryImpact: 'Verification engineers represent the highest job demand sector in semiconductor design, preventing multi-million dollar ASIC redesign re-spins.',
    edaTools: ['Siemens QuestaSim', 'Synopsys VCS', 'Xilinx Vivado', 'Verilator'],
    topics: [
      {
        id: 'rtl-sv-oop',
        title: 'SystemVerilog OOP & Constrained Randomization',
        subheading: 'Classes, encapsulation, inheritance, random variables, and smart constraint solvers',
        estimatedReadTime: '8 min read',
        summary: 'Verilog modules are static hardware entities that exist throughout simulation. SystemVerilog classes, by contrast, are dynamically allocated objects that can be instantiated, randomized, passed through mailboxes, and collected by memory management.',
        analogy: 'A hardware module is like a physical brick factory machine. A SystemVerilog class object is like a blueprint form filled out on a clipboard: you can stamp out 10,000 randomized transaction order forms and feed them into the factory testing line.',
        corePrinciples: [
          {
            title: 'Dynamic Transaction Classes',
            description: 'Packets, frames, and bus transfers are modeled as class objects extending uvm_sequence_item, containing randomized fields (rand, randc).',
            ruleOfThumb: 'Use "rand" for uniform random distribution, "randc" for cyclic permutation without repeating until all states are exhausted.'
          },
          {
            title: 'Constraint Solvers',
            description: 'Write declarative rules rather than procedural loops. Constraints specify legal protocol ranges, distributions, and relationship dependencies.',
            ruleOfThumb: 'Use "solve a before b;" when a second variable range depends on the value picked for the first.'
          },
          {
            title: 'Virtual Interfaces',
            description: 'Hardware modules use structural static interfaces. Classes cannot connect directly to hardware wires; they access signals through a virtual interface handle acting as a dynamic pointer.',
            ruleOfThumb: 'Always access hardware clocking blocks through virtual interfaces to prevent race conditions.'
          }
        ],
        formulaOrSyntax: {
          label: 'SystemVerilog Constraint Syntax',
          formula: 'constraint c_pkt_len { len inside {[64:1518]}; len % 4 == 0; }',
          explanation: 'Enforces Ethernet frame lengths between 64 and 1518 bytes and word-aligned (divisible by 4).'
        },
        industryTools: ['Synopsys VCS', 'Siemens QuestaSim', 'Cadence Xcelium'],
        codeOrConstraintSnippet: {
          language: 'systemverilog',
          code: `class eth_packet extends uvm_sequence_item;
  rand bit [47:0] dest_mac;
  rand bit [47:0] src_mac;
  rand bit [15:0] eth_type;
  rand bit [7:0]  payload[];
  rand int unsigned payload_len;

  constraint c_len {
    payload_len inside {[46:1500]};
    payload.size() == payload_len;
  }
  
  constraint c_broadcast {
    dest_mac dist { 48'hFF_FF_FF_FF_FF_FF := 10, [0 : 48'hFE_FF_FF_FF_FF_FF] := 90 };
  }

  \`uvm_object_utils(eth_packet)
  function new(string name = "eth_packet");
    super.new(name);
  endfunction
endclass`,
          explanation: 'Defines an Ethernet packet transaction class with weighted random distribution for broadcast MAC addresses.'
        },
        interviewFaq: {
          question: 'What is the difference between a shallow copy and a deep copy in SystemVerilog?',
          answer: 'A shallow copy (new target = new source) copies all primitive data types, but if the object contains handles to nested objects, it copies only the pointers (both parent objects will now point to the exact same child object). A deep copy manually creates brand-new instances of all child objects and duplicates their values recursively, providing complete memory isolation.'
        },
        quickRevisionTakeaways: [
          'Modules are static and represent physical silicon; classes are dynamic objects used in testbenches.',
          'Always use "std::randomize(obj) with { ... };" to add inline ad-hoc constraints during simulation.',
          'Clocking blocks in interfaces eliminate delta-cycle race conditions between testbench and DUT.',
          'Coverage metrics (code coverage + functional coverage) prove whether verification is complete.'
        ],
        quiz: {
          question: 'What happens when a SystemVerilog randomize() call encounters conflicting constraints that cannot be mathematically satisfied?',
          options: [
            'The simulator halts immediately with a fatal syntax crash',
            'randomize() returns 0 (failure) and leaves variables unchanged',
            'The simulator chooses default value 0 for all fields',
            'It ignores the most recently added constraint'
          ],
          correctIndex: 1,
          explanation: 'When constraint solver cannot satisfy rules, randomize() returns 0. Robust testbenches always assert `if (!pkt.randomize()) $fatal("Randomization failed!");`.'
        }
      },
      {
        id: 'rtl-uvm-architecture',
        title: 'UVM 1.2 Architecture, Phases & Scoreboarding',
        subheading: 'Factory pattern, config_db, sequence-driver flow, TLM ports, and golden reference scoreboards',
        estimatedReadTime: '10 min read',
        summary: 'Universal Verification Methodology (UVM) standardizes testbench construction into reusable modular components. Components communicate via Transaction-Level Modeling (TLM) FIFOs and analysis ports, decoupling stimulus generation from physical signal wiggling.',
        analogy: 'UVM is like a modern hospital testing lab: The Doctor (Sequencer) orders specific blood tests; the Nurse (Driver) connects needles and samples the patient; the Sensor Monitor records readings passively; and the Pathologist (Scoreboard) compares the readings against healthy clinical baselines.',
        corePrinciples: [
          {
            title: 'UVM Execution Phases',
            description: 'UVM synchronizes execution in phases: Build phase (construct components top-down), Connect phase (wire TLM ports bottom-up), Run phase (time-consuming simulation tasks), and Check/Report phases (evaluate results).',
            ruleOfThumb: 'Only run_phase is time-consuming (task); all other phases are zero-time functions.'
          },
          {
            title: 'Driver - Sequencer Handshake',
            description: 'Drivers request transactions using seq_item_port.get_next_item(req); convert packet bytes to clock-by-clock signal toggles on DUT pins, and call seq_item_port.item_done().',
            ruleOfThumb: 'Never introduce protocol delays or waiting inside sequencers; keep pin timing inside drivers.'
          },
          {
            title: 'UVM Scoreboard & Analysis Ports',
            description: 'Monitors broadcast observed transactions through uvm_analysis_port to the scoreboard. The scoreboard maintains expected queues or algorithmic reference models and flags errors when actual DUT outputs differ.',
            ruleOfThumb: 'A scoreboard must be self-checking: 0 errors at simulation end with 100% expected item comparison.'
          }
        ],
        formulaOrSyntax: {
          label: 'UVM Component Hierarchy',
          formula: 'uvm_test -> uvm_env -> uvm_agent (Sequencer + Driver + Monitor) + Scoreboard',
          explanation: 'Agents bundle protocol components. Active agents have Driver + Sequencer + Monitor; Passive agents have Monitor only.'
        },
        industryTools: ['Siemens QuestaSim', 'Synopsys VCS', 'Verilator'],
        codeOrConstraintSnippet: {
          language: 'systemverilog',
          code: `// UVM Driver run_phase pattern
class my_driver extends uvm_driver #(my_trans);
  \`uvm_component_utils(my_driver)
  virtual my_if vif;

  task run_phase(uvm_phase phase);
    forever begin
      seq_item_port.get_next_item(req); // Block until sequencer provides item
      drive_to_pins(req);              // Toggle physical signals on vif
      seq_item_port.item_done();        // Acknowledge completion
    end
  endtask

  task drive_to_pins(my_trans tr);
    @(posedge vif.clk);
    vif.valid <= 1'b1;
    vif.data  <= tr.data;
    @(posedge vif.clk);
    while (!vif.ready) @(posedge vif.clk);
    vif.valid <= 1'b0;
  endtask
endclass`,
          explanation: 'Standard UVM driver requesting transaction items and converting them to physical pin signals.'
        },
        interviewFaq: {
          question: 'What is the UVM Factory and why is it essential for verification reuse?',
          answer: 'The UVM Factory is an object-oriented registry that allows test writers to substitute or extend components and transactions without modifying the existing testbench source code. Using "set_type_override_by_type" or "set_inst_override_by_type", an engineer can replace a standard transaction with an error-injecting corrupted packet class for a specific test case without altering the core environment.'
        },
        quickRevisionTakeaways: [
          'build_phase executes top-down; connect_phase executes bottom-up.',
          'uvm_config_db#(T)::set and ::get pass parameters and virtual interface handles across the hierarchy.',
          'uvm_objection mechanism (phase.raise_objection / phase.drop_objection) controls when simulation ends.',
          'Active Agent = Sequencer + Driver + Monitor; Passive Agent = Monitor only (used for bus eavesdropping).'
        ],
        quiz: {
          question: 'What occurs if a test engineer forgets to call phase.raise_objection(this) at the beginning of a UVM sequence or test run_phase?',
          options: [
            'Simulation hangs indefinitely in run_phase',
            'Simulation immediately terminates at simulation time 0ns because no objections are active',
            'The driver automatically creates a default objection',
            'The compiler triggers an elaboration error'
          ],
          correctIndex: 1,
          explanation: 'UVM run_phase terminates the moment total active objections across the hierarchy drop to zero. If no component raises an objection at time 0, UVM proceeds straight to extract_phase and exits immediately.'
        }
      }
    ]
  },
  {
    id: 'crs-pcb-03',
    trackCode: 'PCB-301',
    title: 'High-Speed Multilayer PCB Design & Signal Integrity',
    tagline: 'Schematic capture, 6+ layer stackup design, impedance calculation, DDR/PCIe routing & EMI/EMC compliance',
    category: 'PCB',
    duration: '12 Weeks (3 Months)',
    mode: 'Classroom Lab & Workshops',
    level: 'Intermediate',
    overview: 'High-speed electronics operate in the domain where PCB traces act as transmission lines rather than simple copper connections. Covers controlled impedance, return current paths, differential pairs, BGA fanouts, and DFM/DFA fabrication constraints.',
    industryImpact: 'Essential for designing computer motherboards, automotive sensor ECUs, drone flight controllers, and high-frequency communication boards.',
    edaTools: ['Altium Designer', 'KiCad 8', 'HyperLynx SI/PI', 'Polar SI9000'],
    topics: [
      {
        id: 'pcb-stackup-si',
        title: 'Multilayer Stackups, Return Paths & Controlled Impedance',
        subheading: 'Layer physics, reference planes, microstrip vs stripline, and preventing signal reflections',
        estimatedReadTime: '9 min read',
        summary: 'At gigahertz speeds or sub-nanosecond rise times, high-frequency currents flow through the path of least inductance directly underneath the trace in the adjacent reference plane. Breaking the reference plane forces return currents to take wide loops, creating EMI radiation and signal distortion.',
        analogy: 'Imagine a high-speed express train traveling on an elevated rail. The electromagnetic energy travels not just inside the copper rail, but in the air/dielectric between the rail and the ground underneath. If you dig a canyon across the ground under the tracks, the shockwaves cause the train to derail.',
        corePrinciples: [
          {
            title: 'Transmission Line Threshold',
            description: 'When the propagation delay of a trace exceeds 1/6th to 1/10th of the signal rise time, it must be treated as a transmission line with matched characteristic impedance (typically 50Ω single-ended, 90Ω USB, 100Ω Ethernet).',
            ruleOfThumb: 'Length critical > Trise / (6 * Tpd), where Tpd in FR4 is approx 160 ps/inch.'
          },
          {
            title: 'Solid Reference Planes',
            description: 'Always route high-speed signals over an unbroken, continuous ground (GND) plane. Never route high-speed traces across a split plane or over voids in power polygons.',
            ruleOfThumb: 'If a trace must transition layers, place a return GND via right beside the signal via (via shielding).'
          },
          {
            title: 'Microstrip vs Stripline',
            description: 'Microstrip traces run on outer board layers exposed to air and dielectric. Stripline traces run between two solid internal GND planes, providing superior shielding against radiated EMI.',
            ruleOfThumb: 'Stripline traces are immune to external noise but propagate slightly slower than microstrip.'
          }
        ],
        formulaOrSyntax: {
          label: 'Microstrip Characteristic Impedance (IPC-2141 Approx)',
          formula: 'Z_0 ≈ (87 / sqrt(e_r + 1.41)) * ln(5.98 * H / (0.8 * W + T))',
          explanation: 'W = trace width, H = dielectric thickness to reference plane, T = copper thickness, e_r = dielectric constant (~4.2 for FR-4).'
        },
        industryTools: ['Polar SI9000', 'Altium Designer Layer Stack Manager', 'HyperLynx'],
        codeOrConstraintSnippet: {
          language: 'markdown',
          code: `### Standard 6-Layer Symmetrical High-Speed Stackup
Layer 1 (Top):     Signal (High-Speed Component Layer)  - 0.5 oz Cu
--- Prepreg (Core-Plated Dielectric H1 = 0.1mm, Er = 4.2) ---
Layer 2 (Inner 1): Solid Ground Plane (GND)             - 1.0 oz Cu [Reference for L1 & L3]
--- Core Dielectric H2 = 0.2mm ---
Layer 3 (Inner 2): Signal (Internal Stripline / Bus)    - 0.5 oz Cu
--- Prepreg Dielectric H3 = 0.2mm ---
Layer 4 (Inner 3): Power Plane (VDD / 3V3 / 1V8 Splits) - 1.0 oz Cu
--- Core Dielectric H4 = 0.2mm ---
Layer 5 (Inner 4): Solid Ground Plane (GND)             - 1.0 oz Cu [Reference for L6]
--- Prepreg Dielectric H5 = 0.1mm ---
Layer 6 (Bottom):  Signal (Low-Speed / Power Traces)    - 0.5 oz Cu`,
          explanation: 'Industry standard 6-layer stackup ensuring tightly coupled reference planes for all impedance-controlled signals.'
        },
        interviewFaq: {
          question: 'What is the 3W Rule in PCB layout and what does it achieve?',
          answer: 'The 3W rule states that the center-to-center distance between adjacent parallel signal traces should be at least three times the trace width (2W gap between trace edges). Following this rule reduces electromagnetic crosstalk coupling between adjacent lines by approximately 70% to 75%. For critical clocks and differential pairs, 5W separation is recommended.'
        },
        quickRevisionTakeaways: [
          'High-speed return current follows the path of lowest inductance (directly beneath the trace).',
          'Never route traces across split ground planes; doing so creates an accidental loop antenna.',
          'Differential pairs must be length-matched within tight tolerances (e.g. ±5 mils for PCIe/DDR) to prevent skew.',
          'Decoupling capacitors must be mounted with the shortest possible trace to minimize parasitic via inductance.'
        ],
        quiz: {
          question: 'What happens when a high-speed signal trace encounters an abrupt change in trace width or crosses over a gap in the reference ground plane?',
          options: [
            'Trace resistance decreases and signal velocity accelerates',
            'An impedance discontinuity occurs, causing signal reflections and radiated EMI emissions',
            'The dielectric constant of FR-4 drops to zero',
            'The voltage permanently doubles at the receiver'
          ],
          correctIndex: 1,
          explanation: 'An abrupt change in width or crossing a plane void causes an impedance jump. This reflects energy back toward the transmitter, creating ringing, overshoot/undershoot, and high electromagnetic radiation.'
        }
      }
    ]
  },
  {
    id: 'crs-emb-04',
    trackCode: 'EMB-401',
    title: 'Embedded Systems & ARM Cortex-M Firmware Architecture',
    tagline: 'Bare-metal C, device driver development, FreeRTOS kernel, SPI/I2C/UART/CAN buses, and IoT stacks',
    category: 'Embedded',
    duration: '16 Weeks (4 Months)',
    mode: 'Hybrid Lab & Simulator',
    level: 'Beginner to Intermediate',
    overview: 'Teaches bare-metal low-level programming directly against ARM Cortex-M hardware registers without relying on bloatware libraries. Progresses from startup code and linker scripts to real-time operating systems (FreeRTOS) and automotive CAN networking.',
    industryImpact: 'Powers automotive body control modules, medical pacemakers, robotics actuators, smart energy meters, and industrial IoT nodes.',
    edaTools: ['Keil uVision', 'STM32CubeIDE', 'J-Link Debugger', 'Logic Analyzer Suite'],
    topics: [
      {
        id: 'emb-cortex-memory',
        title: 'ARM Cortex-M Architecture, Linker Scripts & NVIC',
        subheading: 'Flash memory layout, vector tables, interrupt priorities, and bare-metal register manipulation',
        estimatedReadTime: '8 min read',
        summary: 'Microcontrollers boot by loading the initial Main Stack Pointer (MSP) and Reset Handler address from the Vector Table located at flash address 0x08000000. Understanding how the C startup code copies the .data segment from Flash to SRAM and zeros the .bss segment is foundational to embedded firmware engineering.',
        analogy: 'The microcontroller boot sequence is like opening a commercial kitchen: First you check where the chef stands and read the master recipe book (Vector table); then you unpack fresh perishables from the pantry into counter prep bowls (copying .data to RAM), scrub the chopping boards clean (zeroing .bss), and finally ring the bell to open doors (calling main()).',
        corePrinciples: [
          {
            title: 'Memory Segments (.text, .rodata, .data, .bss)',
            description: '.text is executable machine code in Flash; .rodata is const values; .data is initialized global variables copied to SRAM at boot; .bss is uninitialized variables cleared to zero in SRAM.',
            ruleOfThumb: 'Keep heavy lookup tables marked "const" so they remain in Flash rather than consuming scarce SRAM.'
          },
          {
            title: 'Nested Vectored Interrupt Controller (NVIC)',
            description: 'ARM Cortex-M supports up to 240 external interrupts with programmable preemption priorities and subpriorities. Lower numeric priority value represents higher urgency (0 is top priority).',
            ruleOfThumb: 'Never perform lengthy processing or blocking delays (like printf or while loops) inside an ISR (Interrupt Service Routine).'
          },
          {
            title: 'Volatile Keyword in C',
            description: 'Tells the C compiler that a memory location can change unexpectedly outside of the local code flow (by hardware peripherals or ISRs), preventing aggressive compiler optimization from caching the value in a CPU register.',
            ruleOfThumb: 'Always declare hardware peripheral registers and flags shared between ISRs and main loop as "volatile".'
          }
        ],
        formulaOrSyntax: {
          label: 'Direct Register Bit-Manipulation in C',
          formula: 'REG |= (1U << BIT);  // Set bit\nREG &= ~(1U << BIT); // Clear bit\nREG ^= (1U << BIT);  // Toggle bit',
          explanation: 'Standard atomic-style bit manipulation using bitwise OR, AND-NOT, and XOR operators.'
        },
        industryTools: ['STM32CubeIDE / GCC ARM Toolchain', 'Keil MDK', 'OpenOCD / J-Link'],
        codeOrConstraintSnippet: {
          language: 'c',
          code: `// Bare-metal GPIO LED toggle on STM32F4 (AHB1 Bus)
#define RCC_AHB1ENR   (*(volatile uint32_t*)(0x40023800 + 0x30))
#define GPIOA_MODER   (*(volatile uint32_t*)(0x40020000 + 0x00))
#define GPIOA_ODR     (*(volatile uint32_t*)(0x40020000 + 0x14))

void gpio_init(void) {
  // 1. Enable clock for GPIO Port A (bit 0)
  RCC_AHB1ENR |= (1U << 0);
  
  // 2. Set Pin PA5 as General Purpose Output (Mode 01)
  GPIOA_MODER &= ~(3U << (5 * 2)); // Clear mode bits
  GPIOA_MODER |=  (1U << (5 * 2)); // Set as output (01)
}

void led_toggle(void) {
  GPIOA_ODR ^= (1U << 5); // Toggle PA5 pin
}`,
          explanation: 'Register-level peripheral configuration without HAL overhead, demonstrating direct memory-mapped register access.'
        },
        interviewFaq: {
          question: 'What is Priority Inversion in an RTOS and how does Priority Inheritance solve it?',
          answer: 'Priority Inversion occurs when a low-priority task holds a shared mutex resource needed by a high-priority task, but a medium-priority task preempts the low-priority task, indirectly starving the high-priority task. Priority Inheritance temporarily elevates the low-priority task\'s priority to match the high-priority task until it releases the shared mutex, allowing it to complete swiftly and unblock the critical task.'
        },
        quickRevisionTakeaways: [
          'Address 0x08000000 holds the Initial Stack Pointer; 0x08000004 holds the Reset Handler address.',
          'Always mark variables shared between ISRs and background tasks as "volatile sig_atomic_t" or "volatile uint32_t".',
          'Use DMA (Direct Memory Access) for high-speed UART/SPI to offload CPU from servicing byte-by-byte interrupts.',
          'FreeRTOS tasks must yield or block via vTaskDelay() to prevent starving lower priority threads.'
        ],
        quiz: {
          question: 'What will happen if a C programmer omits the "volatile" keyword from a status flag variable polled in a while loop inside main() that is updated by a timer interrupt?',
          options: [
            'The compiler will issue a fatal syntax error',
            'With compiler optimizations enabled (-O2/-O3), the compiler may load the variable into a CPU register once and loop forever in an infinite loop',
            'The variable is automatically placed in Flash memory',
            'The timer interrupt will be disabled permanently'
          ],
          correctIndex: 1,
          explanation: 'Without "volatile", the optimizer assumes nothing outside the while loop can modify the variable. It caches the initial read in a CPU register and creates an infinite loop, ignoring the ISR updates in memory.'
        }
      }
    ]
  },
  {
    id: 'crs-pwr-05',
    trackCode: 'PWR-501',
    title: 'Power Electronics & E-Mobility Inverter Design',
    tagline: 'Wide Bandgap (SiC & GaN) power stages, gate drivers, magnetic design, and BLDC motor control',
    category: 'Power Electronics',
    duration: '14 Weeks (3.5 Months)',
    mode: 'Hybrid Lab & Simulation',
    level: 'Advanced',
    overview: 'Specialized industrial engineering curriculum focused on modern electric vehicles, solar inverters, and high-frequency switched-mode power supplies (SMPS). Explores Silicon Carbide (SiC) MOSFETs, Field Oriented Control (FOC), and magnetic core selection.',
    industryImpact: 'Core foundation for EV powertrain design, renewable grid solar inverters, and high-density datacenter power supplies.',
    edaTools: ['MATLAB / Simulink', 'PLECS', 'LTspice', 'Tektronix Power Analyzers'],
    topics: [
      {
        id: 'pwr-wbg-foc',
        title: 'Wide Bandgap Semiconductors & Field Oriented Control (FOC)',
        subheading: 'SiC vs GaN vs Silicon IGBTs, Space Vector Modulation, and vector motor drives',
        estimatedReadTime: '9 min read',
        summary: 'Silicon Carbide (SiC) and Gallium Nitride (GaN) operate at 5x to 10x higher switching frequencies and temperatures with near-zero reverse recovery losses compared to traditional Silicon IGBTs. Field Oriented Control (FOC) transforms complex 3-phase AC motor currents into two decoupled DC vector components (d-axis for flux, q-axis for torque).',
        analogy: 'FOC is like steering a horse-drawn carriage: Instead of pulling randomly on three separate reins (3-phase sine waves), you resolve the force into one pure forward pull (Torque current Iq) and one pure centering alignment (Flux current Id).',
        corePrinciples: [
          {
            title: 'Wide Bandgap (SiC/GaN) Superiority',
            description: 'Higher electron bandgap energy allows much thinner drift regions for the same voltage rating, resulting in dramatically lower on-resistance (Rds(on)) and shrinking passive inductor sizes.',
            ruleOfThumb: 'Use GaN below 650V for extreme switching speeds (megahertz). Use SiC above 650V-1200V for high-power EV inverters.'
          },
          {
            title: 'Clarke & Park Transforms',
            description: 'Clarke Transform converts 3-phase stationary coordinates (Ia, Ib, Ic) into 2-phase stationary orthogonal coordinates (Iα, Iβ). Park Transform rotates these into a synchronous reference frame (Id, Iq) rotating with the rotor flux angle.',
            ruleOfThumb: 'For surface permanent magnet motors, keep Id = 0 to maximize torque per ampere (MTPA).'
          },
          {
            title: 'Space Vector PWM (SVPWM)',
            description: 'Synthesizes reference voltage vectors using eight basic inverter switching states (6 active vectors, 2 zero vectors). SVPWM provides 15.5% higher DC bus voltage utilization than standard sinusoidal SPWM.',
            ruleOfThumb: 'SVPWM delivers maximum phase-to-phase output voltage of Vdc / sqrt(3).'
          }
        ],
        formulaOrSyntax: {
          label: 'Synchronous Buck Converter Duty Cycle',
          formula: 'V_out = D * V_in, where D = T_on / (T_on + T_off)\nL_min = ((V_in - V_out) * D) / (f_sw * ΔI_L)',
          explanation: 'D is duty cycle; f_sw is switching frequency; ΔI_L is allowable inductor ripple current (typically 20% to 40% of I_out).'
        },
        industryTools: ['PLECS Standalone', 'MATLAB / Simulink Simscape', 'LTspice'],
        codeOrConstraintSnippet: {
          language: 'c',
          code: `// Clarke & Park Transform Implementation for FOC
typedef struct {
  float alpha, beta;
  float d, q;
} FOC_Currents_t;

void clarke_transform(float ia, float ib, float *alpha, float *beta) {
  *alpha = ia;
  *beta  = (ia + 2.0f * ib) * 0.577350269f; // 1 / sqrt(3)
}

void park_transform(float alpha, float beta, float sin_theta, float cos_theta, float *d, float *q) {
  *d =  alpha * cos_theta + beta * sin_theta; // Direct axis (Flux)
  *q = -alpha * sin_theta + beta * cos_theta; // Quadrature axis (Torque)
}`,
          explanation: 'Mathematical transformation executing inside the motor control current loop at 20 kHz.'
        },
        interviewFaq: {
          question: 'Why are isolated gate drivers necessary when driving high-voltage SiC MOSFETs in a half-bridge topology?',
          answer: 'The high-side MOSFET source node floats rapidly between 0V and the high DC link voltage (e.g. 800V) during switching transitions. An isolated gate driver provides galvanic isolation (optical or capacitive) capable of withstanding extreme common-mode transient immunity (CMTI > 100 kV/μs) to prevent erroneous gate turn-ons and catastrophic bridge shoot-through.'
        },
        quickRevisionTakeaways: [
          'SiC / GaN reduce heat generation and allow smaller, lighter passive magnetics in EV powertrains.',
          'FOC decouples motor torque (Iq) and rotor flux (Id) for instant dynamic torque response.',
          'Space Vector PWM yields 15% higher voltage utilization compared to Sinusoidal PWM.',
          'Dead-time insertion in gate drivers prevents upper and lower switches from conducting simultaneously (shoot-through).'
        ],
        quiz: {
          question: 'What is the primary benefit of Space Vector PWM (SVPWM) over standard Sinusoidal PWM (SPWM) in a 3-phase EV motor inverter?',
          options: [
            'SVPWM requires zero calculations from the DSP microcontroller',
            'SVPWM increases DC bus voltage utilization by approximately 15.5% and reduces harmonic distortion',
            'SVPWM eliminates the need for gate driver circuits',
            'SVPWM operates only with brush-type DC motors'
          ],
          correctIndex: 1,
          explanation: 'SVPWM utilizes the full hexagon of inverter switching states, boosting maximum fundamental line-to-line output voltage by 2/sqrt(3) ≈ 1.155 (15.5% higher) without overmodulation.'
        }
      }
    ]
  }
];

export interface Flashcard {
  id: string;
  category: string;
  courseId: string;
  question: string;
  answer: string;
  badge: string;
}

export const FLASHCARDS: Flashcard[] = [
  {
    id: 'fc-1',
    category: 'VLSI',
    courseId: 'crs-vlsi-01',
    question: 'How do you fix a Hold Timing Violation?',
    answer: 'Hold violations are fixed by adding delay buffers to the data path or increasing wire lengths. Hold timing is independent of clock frequency.',
    badge: 'Timing Analysis'
  },
  {
    id: 'fc-2',
    category: 'VLSI',
    courseId: 'crs-vlsi-01',
    question: 'What is the function of Clock Tree Synthesis (CTS)?',
    answer: 'CTS balances clock arrival times across millions of flip-flops to minimize clock skew (arrival delta) and insertion delay, ensuring uniform synchronous operation.',
    badge: 'Physical Design'
  },
  {
    id: 'fc-3',
    category: 'Verification',
    courseId: 'crs-rtl-02',
    question: 'What is the difference between rand and randc in SystemVerilog?',
    answer: '"rand" produces standard uniform random distribution. "randc" produces cyclic permutation where every value in the range is picked exactly once before repeating.',
    badge: 'SystemVerilog'
  },
  {
    id: 'fc-4',
    category: 'Verification',
    courseId: 'crs-rtl-02',
    question: 'Which UVM phase is time-consuming (task)?',
    answer: 'Only the "run_phase" (and its 12 sub-phases) is a time-consuming task. All other phases (build_phase, connect_phase, check_phase) are zero-time functions.',
    badge: 'UVM 1.2'
  },
  {
    id: 'fc-5',
    category: 'PCB',
    courseId: 'crs-pcb-03',
    question: 'Where does high-frequency return current travel in a PCB?',
    answer: 'Directly underneath the trace in the adjacent reference ground plane, following the path of minimum loop inductance (not minimum DC resistance).',
    badge: 'Signal Integrity'
  },
  {
    id: 'fc-6',
    category: 'Embedded',
    courseId: 'crs-emb-04',
    question: 'Why must hardware peripheral registers be declared as volatile in C?',
    answer: 'To prevent the compiler optimizer from caching register values in CPU registers, ensuring every read and write actually communicates with hardware silicon.',
    badge: 'Firmware'
  },
  {
    id: 'fc-7',
    category: 'Power Electronics',
    courseId: 'crs-pwr-05',
    question: 'What do the Clarke and Park transforms achieve in FOC motor control?',
    answer: 'Clarke converts 3-phase AC (Ia, Ib, Ic) into 2-phase stationary (Iα, Iβ). Park rotates them into a synchronous rotating frame (Id for flux, Iq for torque), making AC control as simple as DC.',
    badge: 'Motor Drives'
  }
];
