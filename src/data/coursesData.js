/**
 * Create.IT - Course Catalog & Multimedia Products Dataset
 * Comprehensive dataset for IMY 320 Multimedia Trends
 */

export const CATEGORIES = [
  { id: 'all', label: 'All Courses', icon: 'Sparkles', count: 12 },
  { id: 'motion', label: 'Motion Graphics', icon: 'Film', count: 3, color: '#c084fc' },
  { id: '3d', label: '3D & CGI', icon: 'Box', count: 3, color: '#38bdf8' },
  { id: 'ux', label: 'UX/UI & Product', icon: 'Layers', count: 2, color: '#fbbf24' },
  { id: 'gamedev', label: 'Game Dev & Unreal', icon: 'Gamepad2', count: 2, color: '#f43f5e' },
  { id: 'audio', label: 'Spatial Audio', icon: 'Volume2', count: 2, color: '#34d399' }
];

export const COURSES = [
  {
    id: 'motion-01',
    title: 'Motion Design Fundamentals: Cinema 4D & After Effects',
    tagline: 'Master kinetic typography, 3D camera tracking, procedural physics, and commercial broadcast animation.',
    category: 'Motion Graphics',
    categoryId: 'motion',
    level: 'Intermediate',
    rating: 4.9,
    ratingCount: 1840,
    studentsCount: '14.8k',
    studentsNumber: 14820,
    duration: '14.5 Hours',
    durationWeeks: '6 Weeks',
    modulesCount: 7,
    lessonsCount: 52,
    price: 74.99,
    originalPrice: 139.99,
    badge: 'Bestseller',
    color: '#c084fc',
    bgColor: 'rgba(192, 132, 252, 0.15)',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    tools: ['Cinema 4D', 'After Effects', 'Redshift', 'Illustrator'],
    instructor: {
      name: 'Elena Rostova',
      role: 'Creative Director @ KineticStudio',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      bio: 'Former senior motion designer at Apple and Nike. Over 12 years creating award-winning broadcast packages and 3D kinetic visuals.'
    },
    whatYouWillLearn: [
      'Master keyframe velocity, value graphs, and kinetic rhythm',
      'Integrate multi-pass 3D Cinema 4D renders directly into After Effects comps',
      'Build complex procedural physics dynamics with Cinema 4D MoGraph toolset',
      'Create 3D camera projection mapping and parallax environments',
      'Design professional UI motion transitions and micro-interactions',
      'Export production-ready ProRes & WebM assets with color management'
    ],
    prerequisites: [
      'Basic familiarity with Adobe Creative Cloud (Photoshop/Illustrator)',
      'A computer capable of running After Effects 2024 and Cinema 4D',
      'No prior 3D modeling experience is required'
    ],
    description: `Unlock the power of commercial motion design in this comprehensive masterclass. Starting from core timing principles to advanced 3D multi-pass compositing, you will build 4 portfolio-ready commercial animation projects.

We dive deep into the Cinema 4D MoGraph effector system, Redshift rendering shaders, camera tracking, and After Effects optical effects. By the end of this course, you will possess the practical technical confidence and aesthetic sensibilities required by modern multimedia production studios.`,
    syllabus: [
      {
        moduleNumber: 1,
        title: 'Foundations of Kinetic Motion & Timing Curves',
        duration: '2h 10m',
        lessons: [
          { title: 'The 12 Principles of Animation Applied to Modern Motion', duration: '18:40', preview: true },
          { title: 'Deconstructing the Speed & Value Graph Editors', duration: '24:15', preview: true },
          { title: 'Kinetic Typography: Rhythm, Weight, and Staggering', duration: '32:10', preview: false },
          { title: 'Hands-on Project: 15-Second Kinetic Title Sequence', duration: '55:00', preview: false }
        ]
      },
      {
        moduleNumber: 2,
        title: 'Cinema 4D MoGraph & Procedural Geometry',
        duration: '2h 45m',
        lessons: [
          { title: 'Cloner Systems, Field Drivers, and Falloffs', duration: '28:30', preview: true },
          { title: 'Rigid & Soft Body Dynamics Simulations', duration: '35:20', preview: false },
          { title: 'Procedural Voronoi Fracturing and Particle Emitters', duration: '41:15', preview: false },
          { title: 'Creating High-Tech Abstract Tech Loops', duration: '59:55', preview: false }
        ]
      },
      {
        moduleNumber: 3,
        title: 'Redshift Lighting, Shaders & Multi-Pass Rendering',
        duration: '2h 30m',
        lessons: [
          { title: 'Studio Lighting Setup: 3-Point & HDRI Lighting', duration: '25:10', preview: false },
          { title: 'Subsurface Scattering, Iridescence & Glass Shaders', duration: '38:40', preview: false },
          { title: 'Configuring AOVs: Cryptomatte, Depth, Normal & Specular Passes', duration: '44:20', preview: false },
          { title: 'Optimizing Render Times & Bucket Settings', duration: '41:50', preview: false }
        ]
      },
      {
        moduleNumber: 4,
        title: 'Compositing in After Effects & Finishing',
        duration: '3h 15m',
        lessons: [
          { title: 'Rebuilding Beauty Passes in 32-bit Floating Point', duration: '34:10', preview: false },
          { title: 'Optical Flares, Depth of Field, and Chromatic Aberration', duration: '42:30', preview: false },
          { title: 'Sound Design Syncing & Final Color Grading (ACES Workflow)', duration: '58:20', preview: false },
          { title: 'Exporting for Web, Social Media & 4K Broadcast Delivery', duration: '60:00', preview: false }
        ]
      }
    ],
    reviews: [
      {
        id: 1,
        author: 'Liam Chen',
        rating: 5,
        date: '3 days ago',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
        comment: 'Hands down the best motion design course on the web. The breakdown of the graph editor and Redshift multi-pass compositing instantly elevated my client work!'
      },
      {
        id: 2,
        author: 'Sarah Jenkins',
        rating: 5,
        date: '1 week ago',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
        comment: 'Clear, concise, and packed with practical studio techniques. The project files alone are worth more than the course fee.'
      }
    ],
    includes: [
      '14.5 hours of high-definition video lessons',
      '38 downloadable C4D project scenes and AE comps',
      'Studio lighting HDRI bundle & custom Redshift materials',
      'Certificate of Completion for IMY portfolio',
      'Direct instructor Q&A access'
    ]
  },
  {
    id: '3d-01',
    title: '3D Visualisation & Photorealistic CGI in Blender',
    tagline: 'Learn architectural visualization, hard-surface modeling, procedural texturing, and photoreal Cycles lighting.',
    category: '3D & CGI',
    categoryId: '3d',
    level: 'All Levels',
    rating: 4.9,
    ratingCount: 2410,
    studentsCount: '21.3k',
    studentsNumber: 21300,
    duration: '18.0 Hours',
    durationWeeks: '8 Weeks',
    modulesCount: 8,
    lessonsCount: 64,
    price: 79.99,
    originalPrice: 149.99,
    badge: 'Popular',
    color: '#38bdf8',
    bgColor: 'rgba(56, 189, 248, 0.15)',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1200&q=80',
    tools: ['Blender 4.2', 'Cycles', 'Substance 3D', 'Photoshop'],
    instructor: {
      name: 'Marcus Sterling',
      role: 'Lead 3D Environment Artist @ RenderCraft',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      bio: 'CGI specialist with over a decade of experience producing photorealistic architectural renderings and cinematic 3D product visuals.'
    },
    whatYouWillLearn: [
      'Master sub-division surface modeling and non-destructive modifiers',
      'Create procedural PBR shaders using node-based material graphs in Blender',
      'Set up realistic day/night interior and exterior lighting with Cycles',
      'Utilize geometry nodes for environmental asset scattering and vegetation',
      'Perform camera calibration, focal length tuning, and depth compositing',
      'Color grade and post-process RAW 32-bit EXRs in Photoshop'
    ],
    prerequisites: [
      'Blender 4.0 or newer (Free and Open Source)',
      'Basic 3-button mouse with scroll wheel'
    ],
    description: `Turn empty 3D viewports into breathtaking photorealistic environments. This course takes you step-by-step through modern CGI visualization workflows used in high-end design agencies.

You will discover non-destructive topology modeling, procedural dirt maps, micro-surface imperfections, physically-accurate IOR values, and cinematic lighting setups. Complete 3 full studio scenes from scratch.`,
    syllabus: [
      {
        moduleNumber: 1,
        title: 'Blender 4 Interface & High-Poly Hard Surface Modeling',
        duration: '3h 15m',
        lessons: [
          { title: 'Topology Flow, Edge Loops, and Creasing', duration: '32:00', preview: true },
          { title: 'Sub-D Modeling of Complex Industrial Product Forms', duration: '48:15', preview: true },
          { title: 'Boolean Workflows with Bevel Modifiers', duration: '40:00', preview: false },
          { title: 'UV Unwrapping Strategies without Texture Stretching', duration: '75:00', preview: false }
        ]
      },
      {
        moduleNumber: 2,
        title: 'PBR Shading, Imperfections & Geometry Nodes',
        duration: '4h 00m',
        lessons: [
          { title: 'The Physics of Light: Fresnel, Roughness & Anisotropy', duration: '35:40', preview: true },
          { title: 'Building Procedural Wood, Metal & Architectural Concrete', duration: '58:20', preview: false },
          { title: 'Geometry Nodes: Procedural Furniture & Plant Scattering', duration: '66:00', preview: false },
          { title: 'Optimizing Poly Counts and Memory Usage', duration: '40:00', preview: false }
        ]
      }
    ],
    reviews: [
      {
        id: 1,
        author: 'David Van Der Merwe',
        rating: 5,
        date: '5 days ago',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
        comment: 'The section on procedural materials changed my entire approach to 3D texturing. Exceptional quality!'
      }
    ],
    includes: [
      '18 hours of step-by-step video instruction',
      '45 high-resolution PBR material textures (4K)',
      'Complete 3D studio and living room project files',
      'IMY 320 accredited course certificate'
    ]
  },
  {
    id: 'ux-01',
    title: 'Interactive UX/UI Masterclass: Design Systems & Prototyping',
    tagline: 'Design scalable multi-platform design systems, micro-interactions, responsive web components, and UX research pipelines.',
    category: 'UX/UI & Product',
    categoryId: 'ux',
    level: 'Beginner to Pro',
    rating: 4.9,
    ratingCount: 3120,
    studentsCount: '28.4k',
    studentsNumber: 28400,
    duration: '16.0 Hours',
    durationWeeks: '5 Weeks',
    modulesCount: 6,
    lessonsCount: 44,
    price: 69.99,
    originalPrice: 129.99,
    badge: 'Trending',
    color: '#fbbf24',
    bgColor: 'rgba(251, 191, 36, 0.15)',
    image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=800&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
    tools: ['Figma', 'Protopie', 'Framer', 'Design Tokens'],
    instructor: {
      name: 'Dr. Zola Khumalo',
      role: 'Staff Product Designer @ NovaUX',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
      bio: 'Leading UX practitioner and educator specializing in design tokens, accessible multi-device interaction models, and heuristic usability evaluations.'
    },
    whatYouWillLearn: [
      'Construct scalable Figma component libraries with auto layout and variants',
      'Implement multi-brand design tokens for light/dark mode transitions',
      'Build advanced micro-interactions using variables and state machines',
      'Conduct rigorous usability testing sessions and UEQ questionnaires',
      'Prepare production-ready developer handoff specifications',
      'Design accessible interfaces conforming to WCAG 2.2 AAA guidelines'
    ],
    prerequisites: [
      'Free Figma account',
      'Interest in digital product interfaces and human-centered design'
    ],
    description: `Master modern UX/UI product design through practical end-to-end projects. Learn how top tech companies build, document, and test interactive web and mobile systems.

From user journey mapping and wireframing to high-fidelity component libraries and fluid micro-animations, this masterclass equips you with the complete toolkit to lead product design initiatives.`,
    syllabus: [
      {
        moduleNumber: 1,
        title: 'Design System Foundations & Figma Auto Layout Mastery',
        duration: '2h 45m',
        lessons: [
          { title: 'Atomic Design Methodology in Modern Web Apps', duration: '22:15', preview: true },
          { title: 'Auto Layout 5: Padding, Gap, Absolute Positioning & Fill Rules', duration: '38:00', preview: true },
          { title: 'Component Properties, Booleans, and Variant Matrices', duration: '45:30', preview: false },
          { title: 'Building a Resilient Button & Input Field System', duration: '59:15', preview: false }
        ]
      },
      {
        moduleNumber: 2,
        title: 'Advanced Interactive Prototyping & Variables',
        duration: '3h 10m',
        lessons: [
          { title: 'Figma Variables: Strings, Numbers, Booleans and Modes', duration: '34:00', preview: true },
          { title: 'Simulating E-Commerce Cart Math and Interactive State', duration: '52:10', preview: false },
          { title: 'Conditional Logic and Dynamic Form Validation', duration: '48:30', preview: false },
          { title: 'Micro-Interactions with Smart Animate Curves', duration: '55:20', preview: false }
        ]
      }
    ],
    reviews: [
      {
        id: 1,
        author: 'Thabo Mokoena',
        rating: 5,
        date: '2 days ago',
        avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=120&q=80',
        comment: 'Directly applicable to our IMY 320 assignment! The design token structure and auto layout tips saved our team days.'
      }
    ],
    includes: [
      '16 hours of curated video walkthroughs',
      'Complete Figma UI Kit & Design System template',
      'Usability testing protocol templates & UEQ survey sheets',
      'Certificate of Product Design Mastery'
    ]
  },
  {
    id: 'gamedev-01',
    title: 'Unreal Engine 5: Next-Gen Game Mechanics & Environments',
    tagline: 'Create real-time cinematic worlds with Nanite, Lumen lighting, Blueprints visual scripting, and Niagara VFX.',
    category: 'Game Dev & Unreal',
    categoryId: 'gamedev',
    level: 'Intermediate to Advanced',
    rating: 4.9,
    ratingCount: 1980,
    studentsCount: '17.9k',
    studentsNumber: 17900,
    duration: '22.5 Hours',
    durationWeeks: '8 Weeks',
    modulesCount: 9,
    lessonsCount: 72,
    price: 89.99,
    originalPrice: 169.99,
    badge: 'Hot',
    color: '#f43f5e',
    bgColor: 'rgba(244, 63, 94, 0.15)',
    image: 'https://images.unsplash.com/photo-1552824722-ddab137b0169?auto=format&fit=crop&w=800&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80',
    tools: ['Unreal Engine 5.4', 'Blueprints', 'Niagara', 'Lumen', 'Nanite'],
    instructor: {
      name: 'Kai Takahashi',
      role: 'Principal Technical Artist @ ApexForge',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80',
      bio: 'AAA game developer with credits on major sci-fi action titles. Specialist in Blueprints architecture and real-time Niagara particle systems.'
    },
    whatYouWillLearn: [
      'Build playable 3rd-person gameplay mechanics using Blueprints',
      'Harness UE5 Lumen for fully dynamic global illumination and reflections',
      'Import millions of raw polygons seamlessly with Nanite virtualized geometry',
      'Author real-time particle effects and magic spells using Niagara VFX',
      'Implement audio spatialization and dynamic sound cues with MetaSounds',
      'Package and optimize PC and console builds for 60fps performance'
    ],
    prerequisites: [
      'Unreal Engine 5.3+ installed',
      'Mid-to-high end dedicated GPU recommended'
    ],
    description: `Dive into the cutting edge of real-time 3D interactive development. Unreal Engine 5 has revolutionized games, virtual production, and interactive architectural walkthroughs.

In this intensive course, you will construct a fully functioning cyberpunk action-adventure vertical slice from a blank project to executable release.`,
    syllabus: [
      {
        moduleNumber: 1,
        title: 'UE5 Architecture, Nanite & Lumen Real-time Lighting',
        duration: '3h 30m',
        lessons: [
          { title: 'Project Hierarchy, World Partition, and Level Streaming', duration: '28:00', preview: true },
          { title: 'Megascans Integration and Nanite Mesh Configuration', duration: '45:10', preview: true },
          { title: 'Dynamic Sun Positioning, Sky Atmosphere & Volumetric Clouds', duration: '52:30', preview: false },
          { title: 'Lumen Post-Process Volumes and Exposure Tuning', duration: '64:20', preview: false }
        ]
      }
    ],
    reviews: [
      {
        id: 1,
        author: 'Chris Redman',
        rating: 5,
        date: '1 week ago',
        avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=120&q=80',
        comment: 'The Blueprints logic is taught so cleanly! Finally made my own procedural climbing system.'
      }
    ],
    includes: [
      '22.5 hours of AAA game development training',
      'Full Sci-Fi City project assets pack (Over 8GB of meshes & materials)',
      'Modular Blueprints character controller template',
      'Certified Unreal Developer diploma'
    ]
  },
  {
    id: 'audio-01',
    title: 'Spatial Audio & Interactive Sound Design with Ableton & Wwise',
    tagline: 'Compose immersive 3D binaural audio landscapes, synthesize futuristic sound effects, and integrate dynamic audio engines.',
    category: 'Spatial Audio',
    categoryId: 'audio',
    level: 'All Levels',
    rating: 4.8,
    ratingCount: 1150,
    studentsCount: '8.7k',
    studentsNumber: 8700,
    duration: '11.0 Hours',
    durationWeeks: '4 Weeks',
    modulesCount: 5,
    lessonsCount: 38,
    price: 59.99,
    originalPrice: 119.99,
    badge: 'Specialist',
    color: '#34d399',
    bgColor: 'rgba(52, 211, 153, 0.15)',
    image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=800&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80',
    tools: ['Ableton Live 12', 'Audiokinetic Wwise', 'Serum', 'FabFilter'],
    instructor: {
      name: 'Maya Lindqvist',
      role: 'Audio Director @ SonicDimensions',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
      bio: 'Award-winning interactive sound designer whose work features in VR installations, film trailers, and interactive multimedia experiences.'
    },
    whatYouWillLearn: [
      'Synthesize custom futuristic sci-fi UI beeps, whooshes, and cinematic impacts',
      'Record and process Foley sound effects with granular synthesis',
      'Set up Dolby Atmos and Ambisonics binaural spatial audio panning',
      'Author adaptive music layers that respond dynamically to user gameplay state',
      'Integrate soundbanks using Audiokinetic Wwise into web and game engines',
      'Master professional loudness standards for streaming and interactive media'
    ],
    prerequisites: [
      'Any digital audio workstation (Ableton Live, Reaper, or Logic Pro)',
      'A pair of stereo headphones for binaural monitoring'
    ],
    description: `Audio accounts for half of the multimedia experience. In this masterclass, you will learn how to design, process, and spatialize high-fidelity audio assets for interactive digital applications.

From modular FM synthesis and granular sound sculpture to Wwise game audio middleware integration, this course turns sound enthusiasts into certified audio engineers.`,
    syllabus: [
      {
        moduleNumber: 1,
        title: 'Sound Synthesis Fundamentals & Sci-Fi SFX Creation',
        duration: '2h 15m',
        lessons: [
          { title: 'Subtractive, Wavetable and FM Synthesis Deep-Dive', duration: '28:30', preview: true },
          { title: 'Designing High-Impact UI Sounds and Feedback Chimes', duration: '34:00', preview: true },
          { title: 'Layering Organic Foley with Synthetic Sub-Bass', duration: '41:15', preview: false },
          { title: 'Compression, EQ, and Transient Shaping Techniques', duration: '31:15', preview: false }
        ]
      }
    ],
    reviews: [
      {
        id: 1,
        author: 'Jordan Bell',
        rating: 5,
        date: '2 weeks ago',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
        comment: 'The binaural spatial audio module blew my mind. Essential knowledge for modern multimedia students.'
      }
    ],
    includes: [
      '11 hours of practical sound engineering instruction',
      '350+ exclusive royalty-free WAV sound effects library (24-bit/96kHz)',
      'Custom Ableton Live racks and Serum synth presets',
      'Spatial Audio Certification'
    ]
  },
  {
    id: 'motion-02',
    title: 'Kinetic 3D Typography & Brand Motion Graphics',
    tagline: 'Transform static brand identities into living, breathing kinetic animations for luxury fashion, tech, and cultural media.',
    category: 'Motion Graphics',
    categoryId: 'motion',
    level: 'Beginner to Intermediate',
    rating: 4.8,
    ratingCount: 920,
    studentsCount: '7.4k',
    studentsNumber: 7400,
    duration: '10.5 Hours',
    durationWeeks: '4 Weeks',
    modulesCount: 5,
    lessonsCount: 36,
    price: 54.99,
    originalPrice: 109.99,
    badge: 'Featured',
    color: '#a855f7',
    bgColor: 'rgba(168, 85, 247, 0.15)',
    image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=800&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80',
    tools: ['After Effects', 'Cavalry', 'Illustrator', 'Glyphs'],
    instructor: {
      name: 'Oliver Du Plessis',
      role: 'Brand Identity Motion Lead @ Studio Form',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
      bio: 'Typographic designer specializing in procedural letterform transformations and generative brand systems for global fashion and tech clients.'
    },
    whatYouWillLearn: [
      'Variable font animation and OpenType feature manipulation in After Effects',
      'Procedural vector kinetic motion with Cavalry and JavaScript expressions',
      'Creating seamless typographic morphs and optical illusions',
      'Designing kinetic brand design guidelines and motion tokens'
    ],
    prerequisites: ['Basic familiarity with vector paths and After Effects'],
    description: `Typography is no longer static. Modern digital brands exist in motion across billboards, web interfaces, and AR viewports. Master the craft of living brand systems.`,
    syllabus: [
      {
        moduleNumber: 1,
        title: 'Anatomy of Expressive Kinetic Letterforms',
        duration: '2h 00m',
        lessons: [
          { title: 'Variable Fonts & Axis Modulation', duration: '24:00', preview: true },
          { title: 'Custom Easing Algorithms for Typographic Mass', duration: '35:00', preview: true },
          { title: '3D Extrusions and Shading in Motion', duration: '61:00', preview: false }
        ]
      }
    ],
    reviews: [
      {
        id: 1,
        author: 'Sipho Ndlovu',
        rating: 5,
        date: '4 days ago',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
        comment: 'Great insights into Cavalry and typography curves. Perfect complement to IMY 320!'
      }
    ],
    includes: [
      '10.5 hours of practical motion lessons',
      '20 editable project files & vector font assets',
      'Kinetic Brand System Template',
      'Verified Course Certificate'
    ]
  },
  {
    id: '3d-02',
    title: 'Subdivision Hard-Surface Sci-Fi Modeling & Shading',
    tagline: 'Design intricate futuristic mechs, robotics, hard-surface props, and weathering textures in Blender & Substance Painter.',
    category: '3D & CGI',
    categoryId: '3d',
    level: 'Intermediate',
    rating: 4.9,
    ratingCount: 1680,
    studentsCount: '13.2k',
    studentsNumber: 13200,
    duration: '15.5 Hours',
    durationWeeks: '6 Weeks',
    modulesCount: 7,
    lessonsCount: 50,
    price: 69.99,
    originalPrice: 139.99,
    badge: 'Popular',
    color: '#06b6d4',
    bgColor: 'rgba(6, 182, 212, 0.15)',
    image: 'https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?auto=format&fit=crop&w=800&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    tools: ['Blender', 'Substance 3D Painter', 'Marmoset Toolbag'],
    instructor: {
      name: 'Valerie Moreau',
      role: 'Senior Hard Surface Artist @ CyberWorks',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      bio: '10+ years modeling mechanical props, sci-fi vehicles, and robotic armor for blockbuster feature films and game cinematics.'
    },
    whatYouWillLearn: [
      'Flawless subdivision topology without pinching or smoothing artifacts',
      'Non-destructive boolean cutting and weighted normals technique',
      'Baking high-poly details to low-poly models in Substance 3D Painter',
      'Procedural edge-wear, dirt accumulation, and painted carbon fiber shaders'
    ],
    prerequisites: ['Basic Blender navigation and modeling tool knowledge'],
    description: `Master high-detail hard surface modeling for game cinematics and visual effects. Create a production-ready futuristic drone asset from reference sketch to final turntable render.`,
    syllabus: [
      {
        moduleNumber: 1,
        title: 'Mastering Non-Destructive Modeling Workflows',
        duration: '2h 30m',
        lessons: [
          { title: 'Pinching Elimination and Edge Loops Control', duration: '30:00', preview: true },
          { title: 'Paneling, Inset Details, and Vent Cutouts', duration: '45:00', preview: true },
          { title: 'Substance Painter Baking Mastery', duration: '75:00', preview: false }
        ]
      }
    ],
    reviews: [
      {
        id: 1,
        author: 'Arun Patel',
        rating: 5,
        date: '6 days ago',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
        comment: 'The cleanest explanation of subdivision surface topology on the internet. Recommended 100%.'
      }
    ],
    includes: [
      '15.5 hours of HD video lessons',
      'Complete Sci-Fi Drone 3D model and 4K textures',
      'Smart materials bundle for Substance 3D Painter',
      'Certificate of Completion'
    ]
  },
  {
    id: 'ux-02',
    title: 'UX Research & Usability Evaluation Methods (UEQ & Heuristics)',
    tagline: 'Conduct quantitative User Experience Questionnaires, heuristic analyses, eye-tracking simulations, and UX audit reports.',
    category: 'UX/UI & Product',
    categoryId: 'ux',
    level: 'All Levels',
    rating: 4.8,
    ratingCount: 780,
    studentsCount: '6.1k',
    studentsNumber: 6100,
    duration: '9.0 Hours',
    durationWeeks: '3 Weeks',
    modulesCount: 4,
    lessonsCount: 30,
    price: 49.99,
    originalPrice: 99.99,
    badge: 'Compulsory',
    color: '#eab308',
    bgColor: 'rgba(234, 179, 8, 0.15)',
    image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=1200&q=80',
    tools: ['UEQ Data Analysis Tool', 'Maze', 'Hotjar', 'Miro'],
    instructor: {
      name: 'Prof. Hendrik Botha',
      role: 'Multimedia UX Researcher & Academic',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
      bio: 'Leading UX research academic specializing in UEQ (User Experience Questionnaire) shortened metrics, usability benchmarking, and HCI evaluation frameworks.'
    },
    whatYouWillLearn: [
      'Design and deploy shortened UEQ questionnaires to measure pragmatic & hedonic quality',
      'Evaluate digital interfaces against Nielsen Norman 10 Usability Heuristics',
      'Synthesize research data into actionable UX design guidelines and design fixes',
      'Structure professional academic & industry UX evaluation reports'
    ],
    prerequisites: ['No prerequisites. Directly aligned with IMY 320 deliverables.'],
    description: `Specifically tailored for multimedia students and product designers conducting rigorous user experience evaluations. Learn how to systematically test usability, identify friction, and formulate evidence-backed design guidelines.`,
    syllabus: [
      {
        moduleNumber: 1,
        title: 'Shortened UEQ Methodology & Benchmark Calculations',
        duration: '2h 15m',
        lessons: [
          { title: 'Pragmatic vs Hedonic Quality Dimensions', duration: '25:00', preview: true },
          { title: 'Calculating Means, Variance, and Confidence Intervals', duration: '40:00', preview: true },
          { title: 'Formulating Design Guidelines from Low-Scoring Scales', duration: '70:00', preview: false }
        ]
      }
    ],
    reviews: [
      {
        id: 1,
        author: 'Anika Meyer',
        rating: 5,
        date: '1 day ago',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80',
        comment: 'This is the exact guide needed for university multimedia evaluations! So structured and clear.'
      }
    ],
    includes: [
      '9 hours of specialized UX research video lessons',
      'Automated Excel & Google Sheets UEQ calculation template',
      'Heuristic evaluation scoring rubric',
      'Accredited UX Research Certificate'
    ]
  }
];

export const MOCK_NOTIFICATIONS = [
  {
    id: 1,
    title: 'New 3D Rendering Module Released',
    message: 'Marcus Sterling uploaded 4 new lessons on Blender 4.2 Geometry Nodes.',
    time: '15m ago',
    unread: true,
    type: 'course'
  },
  {
    id: 2,
    title: 'Flash Sale: 25% Off with Code IMY320',
    message: 'Apply discount code IMY320 at checkout for special student pricing.',
    time: '2h ago',
    unread: true,
    type: 'promo'
  },
  {
    id: 3,
    title: 'Cap-Stone Assignment Reviewed',
    message: 'Your Motion Design kinetic sequence scored 98% from mentor Elena.',
    time: '1d ago',
    unread: false,
    type: 'achievement'
  }
];

export const MOCK_ENROLLED_COURSES = [
  {
    courseId: 'motion-01',
    progress: 68,
    lastLesson: 'Rebuilding Beauty Passes in 32-bit Floating Point',
    nextLessonNumber: 'Module 4 • Lesson 1',
    completedLessons: 35,
    totalLessons: 52,
    lastAccessed: '2 hours ago'
  },
  {
    courseId: 'ux-01',
    progress: 32,
    lastLesson: 'Component Properties, Booleans, and Variant Matrices',
    nextLessonNumber: 'Module 1 • Lesson 3',
    completedLessons: 14,
    totalLessons: 44,
    lastAccessed: 'Yesterday'
  }
];
