/**
 * Silphor Technologies Educational Platform Data
 * Headquarters: Malleswaram, Bangalore
 */

export interface Course {
  id: string;
  trackCode: string;
  title: string;
  category: 'VLSI & Physical Design' | 'RTL & UVM Verification' | 'PCB & Signal Integrity' | 'Embedded & IoT' | 'Power Electronics' | 'FDP & SDP Programs' | 'Industrial Internships';
  shortDesc: string;
  fullDesc: string;
  duration: string;
  mode: 'Hybrid (Lab + Online)' | 'Online Live' | 'Classroom Lab';
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  feeINR: number;
  featured: boolean;
  tools: string[];
  highlights: string[];
  syllabus: {
    phase: string;
    title: string;
    topics: string[];
  }[];
  batches: {
    id: string;
    name: string;
    startDate: string;
    timing: string;
    seatsTotal: number;
    seatsFilled: number;
    trainer: string;
  }[];
}

export const SILPHOR_COURSES_DATA: Course[] = [
  {
    id: 'vlsi-pd',
    trackCode: 'SIL-VLSI-01',
    title: 'Advanced VLSI Design & Physical Implementation',
    category: 'VLSI & Physical Design',
    shortDesc: 'Complete RTL-to-GDSII industrial workflow covering Synthesis, Floorplanning, CTS, Routing & PrimeTime Signoff on 7nm/14nm PDKs.',
    fullDesc: 'Industry-standard training aligned with tier-1 semiconductor MNC specifications. Work on real 7nm/14nm process design kits (PDKs) with industry-grade timing constraints, multi-corner STA, power grids, and DRC/LVS clean tape-out signoff.',
    duration: '24 Weeks (6 Months)',
    mode: 'Hybrid (Lab + Online)',
    level: 'Advanced',
    feeINR: 45000,
    featured: true,
    tools: ['Synopsys Design Compiler', 'Cadence Innovus', 'Synopsys PrimeTime', 'Siemens Calibre', 'QuestaSim'],
    highlights: [
      'Tape-out ready RTL-to-GDSII end-to-end design flow',
      'Hands-on with 7nm FinFET standard cell libraries & SPEF extraction',
      'Multi-Corner Multi-Mode (MCMM) timing closure and signoff',
      '100% placement support with top silicon design houses in Bangalore'
    ],
    syllabus: [
      {
        phase: 'Module 1 (Weeks 1-4)',
        title: 'Digital Architecture & Synthesizable RTL',
        topics: ['Verilog HDL for synthesis', 'Synchronous FSM design', 'Metastability & Clock Domain Crossing (CDC)', 'STA timing fundamentals (setup/hold)']
      },
      {
        phase: 'Module 2 (Weeks 5-10)',
        title: 'Logic Synthesis & Formal Verification',
        topics: ['Synthesis optimization algorithms', 'Delay calculation & .lib modeling', 'SDF back-annotation', 'Equivalence checking with Formality/LEC']
      },
      {
        phase: 'Module 3 (Weeks 11-18)',
        title: 'Physical Design & Optimization',
        topics: ['Core utilization & macro floorplanning', 'Power delivery network (PDN) mesh', 'Clock Tree Synthesis (CTS) H-Tree', 'Detailed routing & crosstalk prevention']
      },
      {
        phase: 'Module 4 (Weeks 19-24)',
        title: 'Signoff Verification & Tape-out Prep',
        topics: ['PrimeTime multi-corner timing closure', 'Siemens Calibre DRC / LVS rule decks', 'Dynamic IR-drop & electromigration', 'GDSII / OASIS stream-out']
      }
    ],
    batches: [
      {
        id: 'b-vlsi-1',
        name: 'Autumn Batch 2026',
        startDate: 'November 15, 2026',
        timing: 'Mon-Thu 7:00 PM - 9:30 PM IST',
        seatsTotal: 30,
        seatsFilled: 22,
        trainer: 'Dr. R. K. Nambiar (Ex-Intel, Texas Instruments)'
      },
      {
        id: 'b-vlsi-2',
        name: 'Weekend FastTrack Cohort',
        startDate: 'December 05, 2026',
        timing: 'Sat & Sun 10:00 AM - 4:00 PM IST',
        seatsTotal: 25,
        seatsFilled: 16,
        trainer: 'M. Sridhar (Principal STA Specialist)'
      }
    ]
  },
  {
    id: 'rtl-uvm',
    trackCode: 'SIL-VERIF-02',
    title: 'RTL Design & SystemVerilog / UVM Verification',
    category: 'RTL & UVM Verification',
    shortDesc: 'Master synthesizable Verilog, SystemVerilog OOP, assertions (SVA), and Universal Verification Methodology (UVM 1.2).',
    fullDesc: 'Focus on writing robust ASIC/FPGA IP cores, constrained-random stimulus generation, functional coverage, and building reusable UVM testbenches from scratch with protocol VIPs (AHB/APB/AXI).',
    duration: '16 Weeks (4 Months)',
    mode: 'Online Live',
    level: 'Intermediate',
    feeINR: 35000,
    featured: true,
    tools: ['Siemens QuestaSim', 'Synopsys VCS', 'Xilinx Vivado', 'Verilator'],
    highlights: [
      'Develop complete UVM 1.2 testbenches with self-checking scoreboards',
      'SystemVerilog Assertions (SVA) and functional coverage metrics',
      'Industrial bus protocol modeling (AMBA AXI / AHB / APB)',
      'Direct interview prep for Verification Engineer roles'
    ],
    syllabus: [
      {
        phase: 'Module 1 (Weeks 1-4)',
        title: 'Advanced Verilog & Synthesizable RTL',
        topics: ['Blocking vs non-blocking semantics', 'Clock gating for dynamic power reduction', 'Parameterized FIFO & Arbiter IPs', 'Linting & coding standards']
      },
      {
        phase: 'Module 2 (Weeks 5-8)',
        title: 'SystemVerilog OOP & Randomization',
        topics: ['Classes, inheritance, polymorphism', 'Virtual interfaces & modports', 'Constrained random generation & solve-before', 'Concurrent SVA assertions']
      },
      {
        phase: 'Module 3 (Weeks 9-16)',
        title: 'UVM 1.2 Architecture & Protocols',
        topics: ['UVM factory, phases, config_db', 'Drivers, monitors, scoreboards, sequencers', 'AHB / APB protocol VIP creation', 'Functional coverage & regression tracking']
      }
    ],
    batches: [
      {
        id: 'b-rtl-1',
        name: 'Regular Evening Cohort',
        startDate: 'November 20, 2026',
        timing: 'Tue & Thu 6:30 PM - 9:00 PM IST',
        seatsTotal: 35,
        seatsFilled: 24,
        trainer: 'Vikram Joshi (Senior RTL Lead, 14 yrs exp)'
      }
    ]
  },
  {
    id: 'pcb-si',
    trackCode: 'SIL-PCB-03',
    title: 'High-Speed Multilayer PCB Design & Signal Integrity',
    category: 'PCB & Signal Integrity',
    shortDesc: 'Schematic capture, 6+ layer stackup design, impedance calculation, DDR/PCIe routing & EMI/EMC compliance.',
    fullDesc: 'Hands-on hardware development covering power planes, controlled impedance differential pairs, thermal dissipation, IPC-2221 standards, and gerber validation for fabrication.',
    duration: '12 Weeks (3 Months)',
    mode: 'Classroom Lab',
    level: 'Intermediate',
    feeINR: 28000,
    featured: true,
    tools: ['Altium Designer', 'KiCad 8', 'HyperLynx SI/PI', 'Polar SI9000'],
    highlights: [
      'Design complex 6-layer and 8-layer high-speed boards',
      'Calculate controlled impedance for 50Ω single-ended and 100Ω differential pairs',
      'BGA fanout and escape routing techniques for FPGAs',
      'Malleswaram hardware lab with high-bandwidth oscilloscopes & logic analyzers'
    ],
    syllabus: [
      {
        phase: 'Module 1 (Weeks 1-3)',
        title: 'Schematic Engineering & Component Selection',
        topics: ['Library creation & IPC standards', 'Power budget & decoupling capacitor networks', 'Schematic DRC & netlist generation']
      },
      {
        phase: 'Module 2 (Weeks 4-7)',
        title: 'Multilayer Layout & Stackup Physics',
        topics: ['4-layer and 6-layer symmetric stackups', 'Microstrip & stripline impedance calculations', 'BGA fanout & escape routing']
      },
      {
        phase: 'Module 3 (Weeks 8-12)',
        title: 'High-Speed Routing & DFM/DFA Signoff',
        topics: ['Length matching & delay skew', 'Crosstalk mitigation & return path slots', 'Gerber RS-274X, ODB++, drill charts', 'Assembly drawing & BOM management']
      }
    ],
    batches: [
      {
        id: 'b-pcb-1',
        name: 'Weekend Lab Cohort',
        startDate: 'November 18, 2026',
        timing: 'Sat & Sun 2:00 PM - 6:00 PM IST',
        seatsTotal: 20,
        seatsFilled: 15,
        trainer: 'Sunil Kumar (Chief Hardware Architect)'
      }
    ]
  },
  {
    id: 'emb-arm',
    trackCode: 'SIL-EMB-04',
    title: 'Embedded Systems & ARM Cortex-M Firmware Architecture',
    category: 'Embedded & IoT',
    shortDesc: 'Bare-metal C, device driver development, FreeRTOS kernel, SPI/I2C/UART/CAN buses, and IoT stacks.',
    fullDesc: 'Learn embedded systems by direct register-level programming on STM32 (ARM Cortex-M4) microcontrollers and ESP32 wireless nodes without high-level library bloat.',
    duration: '16 Weeks (4 Months)',
    mode: 'Hybrid (Lab + Online)',
    level: 'Beginner',
    feeINR: 30000,
    featured: false,
    tools: ['Keil uVision', 'STM32CubeIDE', 'J-Link Debugger', 'Logic Analyzer Suite'],
    highlights: [
      'Direct register-level C programming without HAL dependency',
      'FreeRTOS task scheduling, semaphores, queues, and mutexes',
      'Automotive CAN 2.0B bus integration and diagnostics',
      'Dual-bank Flash OTA updates and cryptographic bootloaders'
    ],
    syllabus: [
      {
        phase: 'Module 1 (Weeks 1-4)',
        title: 'Embedded C & ARM Cortex Architecture',
        topics: ['Memory layout & linker scripts', 'Startup code & vector tables', 'GPIO & interrupt controller (NVIC)']
      },
      {
        phase: 'Module 2 (Weeks 5-8)',
        title: 'Serial Communication Protocols & Drivers',
        topics: ['Register-level UART with DMA', 'I2C sensor integration', 'SPI display interfacing', 'CAN Bus protocol for automotive']
      },
      {
        phase: 'Module 3 (Weeks 9-16)',
        title: 'Real-Time Operating Systems (FreeRTOS)',
        topics: ['Task scheduling & priorities', 'Semaphores, queues, event flags', 'Memory management & stack sizing', 'Firmware OTA updates & secure boot']
      }
    ],
    batches: [
      {
        id: 'b-emb-1',
        name: 'Winter Cohort 2026',
        startDate: 'December 01, 2026',
        timing: 'Mon-Wed-Fri 7:00 PM - 9:00 PM IST',
        seatsTotal: 30,
        seatsFilled: 19,
        trainer: 'Praveen Das (Automotive ECU Specialist)'
      }
    ]
  },
  {
    id: 'pwr-elec',
    trackCode: 'SIL-PWR-05',
    title: 'Power Electronics & E-Mobility Inverter Design',
    category: 'Power Electronics',
    shortDesc: 'Wide Bandgap (SiC & GaN) power stages, gate drivers, magnetic design, and BLDC motor control.',
    fullDesc: 'Specialized industrial engineering curriculum focused on modern electric vehicles, solar inverters, and high-frequency switched-mode power supplies (SMPS).',
    duration: '14 Weeks (3.5 Months)',
    mode: 'Hybrid (Lab + Online)',
    level: 'Advanced',
    feeINR: 38000,
    featured: false,
    tools: ['MATLAB / Simulink', 'PLECS', 'LTspice', 'Tektronix Power Analyzers'],
    highlights: [
      'Wide Bandgap (SiC & GaN) circuit modeling and thermal sizing',
      'Field Oriented Control (FOC) algorithms for EV traction motors',
      'Space Vector PWM (SVPWM) modulation and inverter bridge design',
      'High-frequency planar transformer design and testing'
    ],
    syllabus: [
      {
        phase: 'Module 1 (Weeks 1-4)',
        title: 'Power Semiconductor Topologies',
        topics: ['SiC / GaN vs traditional IGBTs', 'Buck, Boost, Buck-Boost converters', 'Gate driver design & dV/dt protection']
      },
      {
        phase: 'Module 2 (Weeks 5-9)',
        title: 'Inverter Controls & Motor Drives',
        topics: ['Field Oriented Control (FOC)', 'Space Vector Modulation (SVPWM)', 'Sensored & Sensorless BLDC algorithms']
      },
      {
        phase: 'Module 3 (Weeks 10-14)',
        title: 'Thermal Management & HIL Testing',
        topics: ['High-frequency transformer design', 'Heatsink calculation & junction temp modeling', 'Hardware-in-the-Loop (HIL) validation']
      }
    ],
    batches: [
      {
        id: 'b-pwr-1',
        name: 'Industrial Evening Cohort',
        startDate: 'November 25, 2026',
        timing: 'Tue & Thu 7:00 PM - 9:30 PM IST',
        seatsTotal: 20,
        seatsFilled: 12,
        trainer: 'Dr. Anand Verma (Power Systems Consultant)'
      }
    ]
  },
  {
    id: 'fdp-sdp',
    trackCode: 'SIL-ACAD-06',
    title: 'FDP & SDP Programs: Semiconductor & EDA Enablement',
    category: 'FDP & SDP Programs',
    shortDesc: 'Faculty & Student Development workshops for engineering colleges and universities on Synopsys, Cadence, and ASIC workflows.',
    fullDesc: 'Tailored institutional programs for universities and engineering colleges across Karnataka and India. Focuses on faculty upskilling, modernized semiconductor curricula, cloud-based EDA tool licensing setups, and student hands-on bootcamps.',
    duration: '2 to 4 Weeks (Modular)',
    mode: 'Hybrid (Lab + Online)',
    level: 'Intermediate',
    feeINR: 15000,
    featured: false,
    tools: ['Synopsys Design Compiler', 'Cadence Innovus', 'Xilinx Vivado', 'Altium Designer'],
    highlights: [
      'Empower faculty to teach modern RTL-to-GDSII and FPGA design',
      'AICTE / VTU / Autonomous university curriculum alignment',
      'Setup guidelines for institutional EDA simulation laboratories',
      'Direct industry certification for participating professors and scholars'
    ],
    syllabus: [
      {
        phase: 'Module 1',
        title: 'Modern Semiconductor Landscape & Curriculum Framework',
        topics: ['Sub-14nm FinFET technology nodes overview', 'Bridging syllabus gap with tier-1 foundry standards', 'Open-source and commercial EDA tool comparison']
      },
      {
        phase: 'Module 2',
        title: 'Hands-on Digital IC Design & Synthesis Labs',
        topics: ['Synthesizable Verilog & CDC best practices', 'Setting up constraint SDC files in university labs', 'Static Timing Analysis (STA) conceptual labs']
      },
      {
        phase: 'Module 3',
        title: 'FPGA Emulation & Post-Silicon Validation Labs',
        topics: ['Xilinx Vivado hardware testbenches', 'Logic analyzer and oscilloscope probing techniques', 'Designing industry-ready student capstone projects']
      }
    ],
    batches: [
      {
        id: 'b-fdp-1',
        name: 'Winter Academic Cohort 2026',
        startDate: 'December 10, 2026',
        timing: 'Mon-Fri 2:00 PM - 5:00 PM IST',
        seatsTotal: 40,
        seatsFilled: 28,
        trainer: 'Academic Director & Senior EDA Specialist'
      }
    ]
  },
  {
    id: 'internship-capstone',
    trackCode: 'SIL-PROJ-07',
    title: 'Industrial Internships & Capstone Tape-out Projects',
    category: 'Industrial Internships',
    shortDesc: '3 to 6-month hands-on silicon & board design internships with Multi-Project Wafer (MPW) and FPGA emulator projects.',
    fullDesc: 'Intensive internship and capstone program with online screening test. Work inside dedicated project pods on live MPW tape-out designs, high-speed DDR/PCIe board bring-up, or UVM protocol VIP creation with mentor reviews.',
    duration: '16 to 24 Weeks (4 to 6 Months)',
    mode: 'Classroom Lab',
    level: 'Advanced',
    feeINR: 25000,
    featured: true,
    tools: ['Synopsys IC Compiler II', 'Siemens Calibre', 'Xilinx UltraScale+', 'HyperLynx SI'],
    highlights: [
      'Multi-Project Wafer (MPW) tape-out submission experience',
      'Dedicated hardware lab access at Malleswaram center',
      'Direct technical mentorship and weekly code/layout reviews',
      'FastTrack campus placement interviews with tier-1 silicon MNCs'
    ],
    syllabus: [
      {
        phase: 'Phase 1 (Month 1)',
        title: 'Screening, Architecture Specification & Netlist Generation',
        topics: ['Technical entrance screening & pod assignment', 'Architecture micro-spec and RTL coding', 'Constraint budgeting (SDC) & linting signoff']
      },
      {
        phase: 'Phase 2 (Months 2-3)',
        title: 'Implementation & Verification Sprint',
        topics: ['Synthesizable IP design & UVM testbench verification', 'Floorplanning, power mesh & CTS implementation', 'Timing ECOs & multi-corner slack closure']
      },
      {
        phase: 'Phase 3 (Months 4-6)',
        title: 'Signoff, FPGA Emulation & Tape-out Delivery',
        topics: ['Siemens Calibre DRC/LVS clean signoff', 'Bitstream generation & FPGA in-circuit emulation', 'MPW GDSII tape-out submission & internship defense']
      }
    ],
    batches: [
      {
        id: 'b-intern-1',
        name: 'Spring 2027 Project Pod',
        startDate: 'January 05, 2027',
        timing: 'Full-time Lab (Mon-Fri 9:30 AM - 5:30 PM IST)',
        seatsTotal: 15,
        seatsFilled: 9,
        trainer: 'Lead Silicon Architect & Project Director'
      }
    ]
  }
];

export const SILPHOR_CONTACT = {
  organizationName: 'Silphor Technologies Pvt Ltd',
  headquarters: 'Bengaluru (Corporate Headquarters & Semiconductor Engineering Center)',
  coordinates: '13.0031° N, 77.5685° E (Malleswaram)',
  address: '#45 East Road, Malleswaram, Bangalore, Karnataka - 560003, India',
  landmark: 'Near 8th Cross Cultural Hub & Malleswaram Ground',
  phoneDisplay: '+91 7829455663',
  phoneDial: '+917829455663',
  whatsappUrl: 'https://wa.me/917829455663?text=Hello%20Silphor%20Technologies%2C%20I%20would%20like%20to%20inquire%20about%20your%20VLSI%20and%20Embedded%20engineering%20training%20programs.',
  email: 'silphortechnologies@gmail.com',
  workingHours: 'Monday - Friday: 9:00 AM - 7:00 PM IST | Saturday: 9:30 AM - 5:30 PM IST',
  emergencyAdmissions: 'Sunday: Available via WhatsApp for Admissions Consultation'
};

export const SILPHOR_STATS = [
  { value: '1,200+', label: 'Engineers Trained & Placed' },
  { value: '7nm / 14nm', label: 'FinFET PDKs Practiced' },
  { value: '50+', label: 'Hiring MNC Partnerships' },
  { value: '100%', label: 'Hands-on EDA Tool Lab Access' }
];

export const TESTIMONIALS = [
  {
    name: 'Karthik Ramanathan',
    role: 'Physical Design Engineer at Qualcomm',
    course: 'Advanced VLSI Design & Physical Implementation',
    quote: 'The 24-week physical design curriculum gave me hands-on confidence on Cadence Innovus and PrimeTime. The guidance on CTS and multi-corner timing closure was exactly what interviewers asked for.',
    batch: 'Batch of 2025'
  },
  {
    name: 'Sneha Kulkarni',
    role: 'Silicon Verification Engineer at Synopsys',
    course: 'RTL Design & SystemVerilog / UVM Verification',
    quote: 'Transitioning from academia to building reusable UVM testbenches was seamless with Silphor. Their focus on SVA assertions and AMBA protocol VIPs directly helped me clear my technical rounds.',
    batch: 'Batch of 2025'
  },
  {
    name: 'Arjun N. V.',
    role: 'Hardware Design Engineer at Bosch India',
    course: 'High-Speed Multilayer PCB Design & Signal Integrity',
    quote: 'The hardware labs at Malleswaram are equipped with high-bandwidth scopes and real impedance test fixtures. Designing 6-layer high-speed boards under industry mentors transformed my career.',
    batch: 'Batch of 2026'
  }
];

export const EDA_PARTNERS = [
  'Synopsys', 'Cadence', 'Siemens EDA', 'AMD Xilinx', 'STMicroelectronics', 'Altium', 'ARM', 'Texas Instruments'
];
