import defaultHeroImg from '../assets/hero.png';

export const FALLBACK_CSV = `id,title,category,price,duration,instructor,rating,description,lessons,tools,level,students,image,badge
1,"Cinema 4D & After Effects: Motion Graphics","Motion Graphics",750.00,"6 Weeks","Elena Rostova",4.9,"Learn kinetic typography, 3D camera tracking, and commercial broadcast animation workflows.","Module 1: Kinetic Timing & Graph Editors;Module 2: Cinema 4D MoGraph;Module 3: Redshift Shaders & Lighting;Module 4: After Effects Compositing","Cinema 4D;After Effects;Redshift","Intermediate","14.8k","/assets/hero.png","Popular"
2,"Blender 3D Modeling & Photoreal CGI","3D & CGI",800.00,"8 Weeks","Marcus Sterling",4.9,"Learn hard-surface modeling, procedural texturing, and photoreal Cycles lighting.","Module 1: Hard Surface Topology;Module 2: Procedural PBR Shading;Module 3: Geometry Nodes;Module 4: Studio Lighting","Blender;Cycles;Photoshop","All Levels","21.3k","/assets/hero.png","Bestseller"
3,"UI/UX Design Systems & Figma Prototyping","UX/UI Design",700.00,"5 Weeks","Dr. Zola Khumalo",4.9,"Build component design systems, responsive layouts, interactive variables, and usability tests.","Module 1: Atomic Design Systems;Module 2: Figma Variables & Logic;Module 3: Micro-Interactions;Module 4: Usability Evaluation","Figma;Protopie;Framer","Beginner to Pro","28.4k","/assets/hero.png","Featured"
4,"Unreal Engine 5: Real-Time Environments","Game Development",900.00,"8 Weeks","Kai Takahashi",4.9,"Build interactive 3D worlds with Nanite geometry, Lumen dynamic lighting, and Blueprints.","Module 1: World Partition & Nanite;Module 2: Lumen Lighting;Module 3: Blueprints Scripting;Module 4: Niagara Particles","Unreal Engine 5;Blueprints","Intermediate","17.9k","/assets/hero.png","Top Rated"
5,"Spatial Audio & Sound Design in Ableton Live","Spatial Audio",600.00,"4 Weeks","Maya Lindqvist",4.8,"Design immersive 3D binaural audio landscapes, synthesize sound effects, and master for media.","Module 1: Sound Synthesis;Module 2: Sci-Fi UI Foley;Module 3: Binaural Spatial Panning;Module 4: Game Audio Integration","Ableton Live;Wwise;Serum","All Levels","8.7k","/assets/hero.png","Specialist"
6,"Kinetic Typography & Brand Identity","Motion Graphics",550.00,"4 Weeks","Oliver Du Plessis",4.8,"Create procedural letterform animations, variable font modulation, and kinetic brand systems.","Module 1: Variable Font Modulation;Module 2: Procedural Vector Motion;Module 3: 3D Typography;Module 4: Brand Motion Tokens","After Effects;Cavalry;Illustrator","Beginner to Pro","7.4k","/assets/hero.png","Popular"
7,"Cinematic VFX & Compositing in Nuke","VFX & Post",850.00,"7 Weeks","Valerie Moreau",4.9,"Master node-based CGI compositing, green screen keying, rotoscoping, and 3D camera projection.","Module 1: Node-Based Logic;Module 2: Keying & Edges;Module 3: Camera Tracking;Module 4: Deep Compositing","Foundry Nuke;Mocha Pro","Advanced","6.8k","/assets/hero.png","Pro"
8,"Digital Concept Art & Environment Painting","Digital Art",500.00,"5 Weeks","Sipho Ndlovu",4.8,"Paint sci-fi and fantasy environment keyframes with perspective, lighting, and custom brushes.","Module 1: Thumbnail Composition;Module 2: Perspective Grids;Module 3: Digital Brushes;Module 4: Portfolio Polishing","Photoshop;Procreate;Blender","All Levels","11.2k","/assets/hero.png","Creative"
9,"Creative Coding & Generative Visuals in TouchDesigner","Creative Tech",650.00,"6 Weeks","Arun Patel",4.9,"Create interactive audiovisual installations, real-time shaders, and generative visuals.","Module 1: Operators & Data Flow;Module 2: Audio-Reactive Geometry;Module 3: Real-Time Shaders;Module 4: Live Setup","TouchDesigner;GLSL;Python","Intermediate","5.9k","/assets/hero.png","Tech"
10,"Color Grading in DaVinci Resolve Studio","Post-Production",600.00,"4 Weeks","David Van Der Merwe",4.8,"Master color science, primary and secondary grading, film look emulation, and HDR deliverables.","Module 1: Color Science & ACES;Module 2: Primary Correction;Module 3: Secondary Qualifiers;Module 4: Film Emulation","DaVinci Resolve;ACES","Beginner to Pro","9.4k","/assets/hero.png","Studio"
11,"2D Character Animation in Toon Boom Harmony","2D Animation",680.00,"6 Weeks","Anika Meyer",4.8,"Animate character rigs with cut-out deformers, timing, keyframe posing, and lip-sync.","Module 1: Animation Principles;Module 2: Character Rigging;Module 3: Deformers & Turnarounds;Module 4: Final Scene Comp","Toon Boom;Photoshop","Intermediate","8.1k","/assets/hero.png","Core"
12,"WebXR & 3D Interactive Web Development","Creative Tech",800.00,"6 Weeks","Prof. Hendrik Botha",4.9,"Build browser-based augmented and virtual reality web apps using Three.js and WebXR.","Module 1: Three.js 3D Scenes;Module 2: WebXR Interaction;Module 3: 3D Asset Optimization;Module 4: Cross-Device Deploy","Three.js;WebXR;JavaScript","Intermediate","6.5k","/assets/hero.png","New"`;

/**
 * Standard CSV line parser.
 */
export function parseCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current.trim());
  return result;
}

/**
 * Parse CSV text into course items using the same hero image.
 */
export function parseCoursesCSV(csvText) {
  if (!csvText || !csvText.trim()) return [];
  
  const rawLines = csvText.replace(/\r\n/g, '\n').replace(/\r/g, '\n').trim().split('\n');
  if (rawLines.length <= 1) return [];

  const courses = [];

  for (let i = 1; i < rawLines.length; i++) {
    const line = rawLines[i].trim();
    if (!line) continue;

    const parts = parseCSVLine(line);
    if (parts.length < 8) continue;

    const id = parts[0]?.trim() || String(i);
    const title = parts[1]?.trim() || 'Untitled Course';
    const category = parts[2]?.trim() || 'Multimedia';
    const price = parseFloat(parts[3]?.trim()) || 500.00;
    const duration = parts[4]?.trim() || '6 Weeks';
    const instructor = parts[5]?.trim() || 'Instructor';
    const rating = parseFloat(parts[6]?.trim()) || 4.8;
    const description = parts[7]?.trim() || 'Course overview and practical exercises.';
    
    // Lessons split by semicolon
    const lessonsRaw = parts[8] ? parts[8].trim() : '';
    const lessons = lessonsRaw ? lessonsRaw.split(';').map(l => l.trim()).filter(Boolean) : [
      'Module 1: Introduction & Fundamentals',
      'Module 2: Project Workflows',
      'Module 3: Advanced Topics',
      'Module 4: Final Practical Submission'
    ];

    // Tools split by semicolon
    const toolsRaw = parts[9] ? parts[9].trim() : '';
    const tools = toolsRaw ? toolsRaw.split(';').map(t => t.trim()).filter(Boolean) : ['Creative Tools'];

    const level = parts[10]?.trim() || 'All Levels';
    const students = parts[11]?.trim() || '10k';
    const badge = parts[13]?.trim() || '';

    courses.push({
      id,
      title,
      category,
      price,
      duration,
      instructor,
      rating,
      description,
      lessons,
      tools,
      level,
      students,
      studentsCount: students,
      image: defaultHeroImg, // Use the same image across all items as requested
      badge
    });
  }

  return courses;
}

/**
 * Load courses from CSV with fallback.
 */
export async function loadCourses() {
  try {
    const response = await fetch('/courses.csv');
    if (!response.ok) {
      return parseCoursesCSV(FALLBACK_CSV);
    }
    const text = await response.text();
    const parsed = parseCoursesCSV(text);
    return parsed.length > 0 ? parsed : parseCoursesCSV(FALLBACK_CSV);
  } catch {
    return parseCoursesCSV(FALLBACK_CSV);
  }
}
