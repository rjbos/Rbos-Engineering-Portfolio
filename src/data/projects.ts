import {
  Bot,
  Cpu,
  Factory,
  Flame,
  Gauge,
  Layers3,
  PenTool,
  type LucideIcon,
} from 'lucide-react'

export interface Project {
  id: number
  slug: string
  title: string
  category: string
  difficulty: 'Beginner-Friendly' | 'Intermediate' | 'Advanced'
  icon: LucideIcon
  cover: string
  summary: string
  description: string
  skills: Array<string>
  deliverables: Array<string>
  year: string
  role: string
  duration: string
  featured?: boolean
  problem: string
  approach: Array<string>
  outcomes: Array<{ label: string; value: string }>
  tools: Array<string>
}

const projects: Array<Project> = [
  {
    id: 1,
    slug: 'parametric-cad-gearbox',
    title: 'Parametric CAD Gearbox Assembly',
    category: 'Design & CAD',
    difficulty: 'Intermediate',
    icon: PenTool,
    cover:
      'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1400&q=80',
    summary:
      'A fully constrained two-stage gearbox modeled with parametric parts, engineering drawings, GD&T, and a complete bill of materials.',
    description:
      'Designed a compact two-stage helical gearbox from first principles — sizing the gears, selecting bearings, and validating shaft deflection. The assembly is fully parametric so reduction ratios and module sizes can be adjusted without rebuilding the model. Drawings include datum schemes, geometric tolerances, and surface finish callouts ready for shop release.',
    skills: ['SolidWorks', 'Fusion 360', 'GD&T', 'BOM', 'Design Intent'],
    deliverables: ['3D CAD assembly', 'Exploded view', '2D drawings', 'Motion study'],
    tools: ['SolidWorks 2024', 'Fusion 360', 'Mathcad'],
    year: '2025',
    role: 'Lead Designer',
    duration: '6 weeks',
    featured: true,
    problem:
      'A small robotics team needed a compact 12:1 reduction gearbox capable of handling 15 Nm of continuous torque while fitting inside a 120 mm cube. Off-the-shelf options were either oversized or required long lead times.',
    approach: [
      'Selected helical gears for quieter operation and higher load capacity than spur equivalents.',
      'Sized shafts using ASME B106.1M and validated bearing life to L10 = 10,000 hrs.',
      'Built the model parametrically so module, face width, and reduction stage ratios drive every downstream feature.',
      'Produced fully toleranced shop drawings with datums chosen to mirror fixturing during machining.',
    ],
    outcomes: [
      { label: 'Reduction ratio', value: '12:1' },
      { label: 'Continuous torque', value: '15 Nm' },
      { label: 'Envelope', value: '118 × 120 × 95 mm' },
      { label: 'Predicted efficiency', value: '92%' },
    ],
  },
  {
    id: 2,
    slug: 'autonomous-line-following-robot',
    title: 'Autonomous Line-Following Robot',
    category: 'Robotics & Mechatronics',
    difficulty: 'Intermediate',
    icon: Bot,
    cover:
      'https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=1400&q=80',
    summary:
      'A mobile robot that follows a path and avoids obstacles using IR sensors, DC motors, and a PID-tuned control loop running on an Arduino.',
    description:
      'A two-wheel differential-drive robot designed to follow a high-contrast path while avoiding obstacles in real time. The chassis is a custom 3D-printed frame; control runs on an ATmega328P with a 100 Hz PID loop driving an L298N motor controller. Tuning was performed empirically using step-response data captured over serial.',
    skills: ['Arduino', 'Sensors', 'Motor Control', 'PID', 'Mechatronics'],
    deliverables: ['Working robot', 'Circuit diagram', 'Control code', 'Test video'],
    tools: ['Arduino IDE', 'Fusion 360', 'KiCad'],
    year: '2025',
    role: 'Mechatronics Engineer',
    duration: '4 weeks',
    featured: true,
    problem:
      'Build a low-cost mobile platform that can autonomously follow a curved track at usable speed without overshooting on tight turns or oscillating on straightaways.',
    approach: [
      'Designed a 3D-printed chassis sized around 6 V gear motors with quadrature encoders.',
      'Used an array of five IR reflectance sensors to estimate lateral error against the line.',
      'Implemented a discrete PID controller in C++ and tuned gains using Ziegler–Nichols as a starting point.',
      'Logged step-response data over serial to refine derivative term and reduce overshoot on hairpins.',
    ],
    outcomes: [
      { label: 'Top tracked speed', value: '0.9 m/s' },
      { label: 'Lap time (5 m course)', value: '7.4 s' },
      { label: 'Loop rate', value: '100 Hz' },
      { label: 'Battery runtime', value: '45 min' },
    ],
  },
  {
    id: 3,
    slug: 'heat-exchanger-design',
    title: 'Heat Exchanger Design & Analysis',
    category: 'Thermal & Energy',
    difficulty: 'Advanced',
    icon: Flame,
    cover:
      'https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=1400&q=80',
    summary:
      'Sized and validated a counter-flow shell-and-tube heat exchanger, comparing closed-form calculations against CFD simulation results.',
    description:
      'Designed a shell-and-tube heat exchanger to recover waste heat from a small process loop. Hand calculations using LMTD and ε-NTU methods set the baseline, then ANSYS Fluent simulations were used to verify pressure drop and outlet temperatures across operating conditions. The final design met thermal duty within 3% of analytical predictions.',
    skills: ['Thermodynamics', 'Heat Transfer', 'ANSYS', 'MATLAB', 'Optimization'],
    deliverables: ['Thermal calculations', 'Simulation plots', 'Efficiency analysis', 'Design report'],
    tools: ['ANSYS Fluent', 'MATLAB', 'Mathcad'],
    year: '2024',
    role: 'Thermal Engineer',
    duration: '8 weeks',
    problem:
      'Recover at least 4 kW of waste heat from a 60 °C process water stream using available cooling water at 18 °C, while keeping pumping power under 25 W per side.',
    approach: [
      'Computed required UA and tube count using LMTD with correction factor for counter-flow geometry.',
      'Cross-checked outlet temperatures with the ε-NTU method to validate sizing assumptions.',
      'Built a 3D CFD model in ANSYS Fluent to evaluate pressure drop, baffle spacing, and dead zones.',
      'Iterated on tube pitch and baffle cut to balance heat transfer against pumping cost.',
    ],
    outcomes: [
      { label: 'Thermal duty', value: '4.1 kW' },
      { label: 'Effectiveness', value: '0.78' },
      { label: 'Tube-side ΔP', value: '12 kPa' },
      { label: 'CFD vs. analytical', value: 'within 3%' },
    ],
  },
  {
    id: 4,
    slug: 'design-for-manufacturing-case-study',
    title: 'Design for Manufacturing Case Study',
    category: 'Manufacturing',
    difficulty: 'Beginner-Friendly',
    icon: Factory,
    cover:
      'https://images.unsplash.com/photo-1565514020179-026b92b84bb6?w=1400&q=80',
    summary:
      'Redesigned an existing bracket for CNC machining and sheet metal fabrication, cutting unit cost by 38% without sacrificing strength.',
    description:
      'Took a legacy mounting bracket originally machined from billet aluminum and reworked it for sheet metal fabrication. The redesign preserved load-bearing capacity while replacing 47 minutes of machining with a 4-step bend operation. Tolerances were rebalanced around the new process to keep assembly fit identical.',
    skills: ['DFM', 'Materials', 'CNC', 'Injection Molding', 'Cost Reduction'],
    deliverables: ['Before/after design', 'Manufacturing plan', 'Cost estimate', 'Material choice'],
    tools: ['SolidWorks', 'SolidWorks Simulation', 'CAMWorks'],
    year: '2024',
    role: 'Mechanical Engineer',
    duration: '3 weeks',
    problem:
      'A high-volume bracket was originally machined from solid stock at $24 per unit. Production volume is doubling and the existing process is becoming a bottleneck.',
    approach: [
      'Documented the existing geometry, tolerances, and load cases as the baseline.',
      'Evaluated three candidate processes — CNC, sheet metal, and investment casting — against cost and lead time.',
      'Selected sheet metal forming and rebalanced features around minimum bend radii and relief cuts.',
      'Validated stiffness equivalence in SolidWorks Simulation under the published 1.5× load case.',
    ],
    outcomes: [
      { label: 'Unit cost', value: '$24 → $14.80' },
      { label: 'Cycle time', value: '47 min → 6 min' },
      { label: 'Stiffness', value: 'within 4% of original' },
      { label: 'Annual savings', value: '$36,800' },
    ],
  },
  {
    id: 5,
    slug: 'vehicle-suspension-simulation',
    title: 'Vehicle Suspension Simulation',
    category: 'Automotive & Dynamics',
    difficulty: 'Advanced',
    icon: Gauge,
    cover:
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1400&q=80',
    summary:
      'Modeled a double-wishbone suspension in MATLAB/Simulink to study ride versus handling tradeoffs across spring and damper configurations.',
    description:
      'A quarter-car and full-vehicle Simulink model used to evaluate suspension tuning for a student race car. The study quantified the tradeoff between sprung-mass acceleration (ride) and contact-patch load variation (grip) across 32 spring/damper combinations, guiding final hardware selection.',
    skills: ['MATLAB', 'Simulink', 'Vehicle Dynamics', 'Kinematics', 'Data Analysis'],
    deliverables: ['Simulation model', 'Response plots', 'Design tradeoff study', 'Technical writeup'],
    tools: ['MATLAB', 'Simulink', 'Adams Car'],
    year: '2024',
    role: 'Vehicle Dynamics Lead',
    duration: '10 weeks',
    problem:
      'A student race team needed objective data to choose spring rates and damper curves before committing to hardware purchases for the season.',
    approach: [
      'Built a four-state quarter-car model and verified against an analytical 2-DOF reference solution.',
      'Extended to a 14-DOF full-vehicle model with kinematic suspension geometry.',
      'Swept spring and damper configurations against road profiles synthesized from ISO 8608 PSD data.',
      'Produced a Pareto plot of ride RMS acceleration vs. tire-load variation to support selection.',
    ],
    outcomes: [
      { label: 'Configurations swept', value: '32' },
      { label: 'Ride RMS reduction', value: '22%' },
      { label: 'Load variation', value: '−14%' },
      { label: 'Sim vs. test', value: 'within 8%' },
    ],
  },
  {
    id: 6,
    slug: 'fea-structural-bracket',
    title: 'FEA Structural Bracket Analysis',
    category: 'FEA & Simulation',
    difficulty: 'Intermediate',
    icon: Layers3,
    cover:
      'https://images.unsplash.com/photo-1581093588401-fbb62a02f120?w=1400&q=80',
    summary:
      'Performed a finite element analysis on a load-bearing aluminum bracket including stress, displacement, and a documented mesh convergence study.',
    description:
      'A linear static FEA study of a cantilevered aluminum bracket under a 2.5 kN tip load. The analysis produced stress and displacement contours, a safety factor map, and a mesh convergence plot showing peak stress converging within 3% across three refinement levels.',
    skills: ['ANSYS', 'SolidWorks Simulation', 'FEA', 'Mesh Study', 'Failure Analysis'],
    deliverables: ['FEA model', 'Stress contours', 'Safety factor', 'Mesh convergence study'],
    tools: ['ANSYS Mechanical', 'SolidWorks Simulation'],
    year: '2025',
    role: 'Simulation Engineer',
    duration: '2 weeks',
    problem:
      'A bracket already in service was being repurposed for a higher load case. A defensible analysis was needed before approving the change.',
    approach: [
      'Defined boundary conditions and loads to mirror the in-service mounting and worst-case use.',
      'Ran three mesh refinement levels and tracked peak von Mises stress for convergence.',
      'Compared peak stress to the material yield strength with a documented safety factor.',
      'Identified a fillet location with elevated stress and recommended a 1 mm radius increase.',
    ],
    outcomes: [
      { label: 'Peak von Mises', value: '184 MPa' },
      { label: 'Safety factor', value: '1.49' },
      { label: 'Max deflection', value: '0.62 mm' },
      { label: 'Mesh convergence', value: '< 3% drift' },
    ],
  },
  {
    id: 7,
    slug: 'iot-vibration-monitoring',
    title: 'IoT Vibration Monitoring System',
    category: 'Smart Mechanical Systems',
    difficulty: 'Intermediate',
    icon: Cpu,
    cover:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1400&q=80',
    summary:
      'Built a wireless vibration and temperature monitor for rotating equipment with a live dashboard and FFT-based fault detection.',
    description:
      'A retrofit-friendly condition monitoring node based on an ESP32, MEMS accelerometer, and thermistor. Time-domain samples are streamed to a Python ingestion service that computes FFT spectra and tracks per-band energy. The dashboard surfaces trend lines so impending bearing issues become visible before failure.',
    skills: ['IoT', 'Sensors', 'Python', 'Data Logging', 'Predictive Maintenance'],
    deliverables: ['Sensor prototype', 'Dashboard', 'Data plots', 'Maintenance insights'],
    tools: ['ESP32', 'Python', 'InfluxDB', 'Grafana'],
    year: '2025',
    role: 'Embedded & Data Engineer',
    duration: '5 weeks',
    problem:
      'Small workshops rarely have the budget for industrial condition monitoring kit, but unplanned bearing failures still cost them days of downtime.',
    approach: [
      'Selected an ADXL355 MEMS accelerometer for its noise floor and built a magnetic mount for retrofit installation.',
      'Sampled three axes at 1 kHz and streamed raw frames to a local broker over MQTT.',
      'Ran FFT on the server side and tracked per-band RMS energy in InfluxDB.',
      'Built a Grafana dashboard with band trend lines and threshold alerts.',
    ],
    outcomes: [
      { label: 'Sample rate', value: '1 kHz × 3 axes' },
      { label: 'Detection lead time', value: '~14 days' },
      { label: 'Hardware BOM', value: '< $60' },
      { label: 'Battery life', value: '6 weeks' },
    ],
  },
]

export default projects
