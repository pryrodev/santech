export type DrivingChangeMenuKey = "impact" | "career";

export type DrivingChangeSection = {
  key: DrivingChangeMenuKey;
  label: string;
  categories: readonly DrivingChangeTopic[];
};

export type DrivingChangeTopic = {
  id: string;
  num: string;
  label: string;
  subtitle: string;
};

export const drivingChangeSections: readonly DrivingChangeSection[] = [
  {
    key: "impact",
    label: "IMPACT IN ACTION",
    categories: [
      {
        id: "systems-in-use",
        num: "01",
        label: "Systems in use",
        subtitle: "Deployed systems and live institutional operations",
      },
      {
        id: "learning-that-remains",
        num: "02",
        label: "Learning that remains",
        subtitle: "Technical training and self-sustaining institutional capability",
      },
      {
        id: "world-context",
        num: "03",
        label: "World context",
        subtitle: "Technology designed for local realities and infrastructure",
      },
    ],
  },
  {
    key: "career",
    label: "CAREER OUTREACH",
    categories: [
      {
        id: "practical-entry",
        num: "01",
        label: "Practical entry",
        subtitle: "Hands-on university labs, high school STEM camps & bootcamps",
      },
      {
        id: "mentorship-and-placement",
        num: "02",
        label: "Mentorship and placement",
        subtitle: "Apprenticeships, senior engineering mentorship & career launchpads",
      },
      {
        id: "community-outreach",
        num: "03",
        label: "Community outreach",
        subtitle: "Open community hackathons, tech summits & digital inclusion",
      },
    ],
  },
];

export type DrivingChangeStory = {
  id?: number;
  slug: string;
  sectionKey: DrivingChangeMenuKey;
  category: string;
  categoryLabel: string;
  title: string;
  date: string;
  publishedAt: string;
  readingTime: string;
  image: string;
  imageAlt: string;
  excerpt: string;
  location: string;
  institution?: string | null;
  body: string[];
  stats?: { label: string; value: string } | null;
};

export const drivingChangeStories: readonly DrivingChangeStory[] = [
  // =========================================================================
  // IMPACT IN ACTION -> 01 Systems in use
  // =========================================================================
  {
    slug: "e-visitors-national-rollout-field-operations",
    sectionKey: "impact",
    category: "systems-in-use",
    categoryLabel: "Systems in use",
    title: "E-Visitors Deployment Across National & Commercial Facilities",
    date: "June 24, 2026",
    publishedAt: "2026-06-24",
    readingTime: "4 min read",
    image: "/images/techforwardlive2026-photo-download-1of1/Highlights/CEPSTUDIO(18).jpg",
    imageAlt: "SAN TECH engineers demonstrating live E-Visitors automated visitor scanning at institutional entrance",
    excerpt: "SAN TECH field engineers deployed biometric scanning and automated identity verification across high-throughput public and corporate facilities.",
    location: "Kigali & Regional Hubs",
    institution: "Public Sector & Corporate Towers",
    stats: { label: "Daily Check-ins", value: "35,000+" },
    body: [
      "SAN TECH engineers worked on the ground with security officers and facility managers to replace slow paper logbooks with automated optical document scanning and real-time host notifications.",
      "The field deployment streamlined security checkpoint queues by over 70%, ensuring complete audit compliance, emergency headcount visibility, and instant badge generation.",
      "Engineers conducted on-site user coaching for front-desk teams, verifying hardware resilience across peak morning rush hours.",
    ],
  },
  {
    slug: "smart-biometrics-access-control-integration",
    sectionKey: "impact",
    category: "systems-in-use",
    categoryLabel: "Systems in use",
    title: "Edge AI Biometric Access Control in High-Security Campuses",
    date: "May 18, 2026",
    publishedAt: "2026-05-18",
    readingTime: "3 min read",
    image: "/images/techforwardlive2026-photo-download-1of1/Highlights/CEPSTUDIO(108).jpg",
    imageAlt: "Field engineers calibrating edge AI optical sensors and turnstile access control",
    excerpt: "Deploying low-latency edge computer vision devices for touchless access verification and perimeter security monitoring.",
    location: "Kigali Innovation City",
    institution: "Enterprise Technology Parks",
    stats: { label: "Inference Time", value: "< 120ms" },
    body: [
      "Our field team implemented neural inference at the edge, allowing gates to verify pre-registered personnel even during network disconnects.",
      "The system logs encrypted access telemetry and generates automatic anomaly alerts without transmitting sensitive biometric raw data to external servers.",
    ],
  },
  {
    slug: "municipal-document-tracking-and-verification",
    sectionKey: "impact",
    category: "systems-in-use",
    categoryLabel: "Systems in use",
    title: "Real-Time Document Verification & Public Queue Management",
    date: "April 08, 2026",
    publishedAt: "2026-04-08",
    readingTime: "4 min read",
    image: "/images/techforwardlive2026-photo-download-1of1/Highlights/CEPSTUDIO(170).jpg",
    imageAlt: "Institutional officials utilizing SAN TECH digital workflow systems in daily administrative operations",
    excerpt: "Replacing paper files with QR-encoded cryptographic tracking, reducing citizen service processing time from 4 days to 15 minutes.",
    location: "District Administrative Centres",
    institution: "Local Governance Offices",
    stats: { label: "Processing Speed", value: "15 mins" },
    body: [
      "SAN TECH systems provide complete end-to-end provenance for municipal documents, ensuring transparency and eliminating lost physical files.",
    ],
  },

  // =========================================================================
  // IMPACT IN ACTION -> 02 Learning that remains
  // =========================================================================
  {
    slug: "institutional-engineering-coaching-and-transfer",
    sectionKey: "impact",
    category: "learning-that-remains",
    categoryLabel: "Learning that remains",
    title: "Leaving Lasting Capability: Hands-On Partner Team Training",
    date: "June 10, 2026",
    publishedAt: "2026-06-10",
    readingTime: "4 min read",
    image: "/images/techforwardlive2026-photo-download-1of1/Highlights/CEPSTUDIO(174).jpg",
    imageAlt: "Partner technical leads receiving certifications after completing SAN TECH systems administration course",
    excerpt: "Every software and hardware system deployment includes exhaustive operational runbooks, architecture masterclasses, and code transfers.",
    location: "Kigali & Pan-African",
    institution: "Ministry & Enterprise IT Units",
    stats: { label: "Engineers Upskilled", value: "450+" },
    body: [
      "We believe technology delivery is only half the journey. True success occurs when our clients' internal teams can independently maintain, debug, and evolve the systems.",
      "SAN TECH provided 6-week intensive engineering transfer clinics covering database backup protocols, disaster recovery drills, and container orchestration.",
    ],
  },
  {
    slug: "san-hub-institutional-certifications",
    sectionKey: "impact",
    category: "learning-that-remains",
    categoryLabel: "Learning that remains",
    title: "SAN HUB Professional Certifications for Enterprise IT Staff",
    date: "May 02, 2026",
    publishedAt: "2026-05-02",
    readingTime: "3 min read",
    image: "/images/techforwardlive2026-photo-download-1of1/Highlights/CEPSTUDIO(151).jpg",
    imageAlt: "Enterprise IT administrators participating in hands-on server hardening and network defense training",
    excerpt: "Standardizing security best practices, GDPR/DPIA compliance protocols, and zero-trust principles across institutional partner teams.",
    location: "SAN HUB Academy",
    institution: "Financial & Health Institutions",
    stats: { label: "Certifications Issued", value: "180 Staff" },
    body: [
      "Course modules emphasize practical diagnostic troubleshooting and disaster simulations rather than theoretical examinations.",
    ],
  },
  {
    slug: "open-documentation-and-developer-knowledgebase",
    sectionKey: "impact",
    category: "learning-that-remains",
    categoryLabel: "Learning that remains",
    title: "Open APIs, Interactive Documentation & Developer Playbooks",
    date: "March 15, 2026",
    publishedAt: "2026-03-15",
    readingTime: "3 min read",
    image: "/images/techforwardlive2026-photo-download-1of1/Highlights/CEPSTUDIO(40).jpg",
    imageAlt: "Software developers reviewing open architecture diagrams and API playbooks",
    excerpt: "Publishing accessible documentation, SDKs, and code recipes so local developers can integrate with SAN TECH platforms effortlessly.",
    location: "Online & Regional Labs",
    institution: "Developer Ecosystem",
    stats: { label: "API Integrations", value: "85+ Apps" },
    body: [
      "Accessible tooling and comprehensive SDKs in JavaScript, Python, and Go ensure that institutional ecosystems thrive long after initial rollout.",
    ],
  },

  // =========================================================================
  // IMPACT IN ACTION -> 03 World context
  // =========================================================================
  {
    slug: "offline-first-architecture-low-bandwidth",
    sectionKey: "impact",
    category: "world-context",
    categoryLabel: "World context",
    title: "Offline-First Systems Engineered for Variable Connectivity",
    date: "June 02, 2026",
    publishedAt: "2026-06-02",
    readingTime: "4 min read",
    image: "/images/techforwardlive2026-photo-download-1of1/Highlights/CEPSTUDIO(62).jpg",
    imageAlt: "Field engineers testing offline mobile scanning nodes in low-connectivity conditions",
    excerpt: "Designing resilient local caching and eventual consistency protocols that guarantee uninterrupted operations during grid and fiber disruptions.",
    location: "Rwanda & West Africa",
    institution: "Regional Field Deployments",
    stats: { label: "Uptime Guaranteed", value: "99.98%" },
    body: [
      "Imported off-the-shelf software frequently breaks down when regional internet connections drop. SAN TECH builds offline-first architecture with local SQLite/IndexedDB replicas.",
      "Transactions, check-ins, and cryptographic logs synchronize automatically with central cloud nodes the moment connectivity is restored.",
    ],
  },
  {
    slug: "multilingual-vernacular-interfaces-rwanda",
    sectionKey: "impact",
    category: "world-context",
    categoryLabel: "World context",
    title: "Bilingual & Vernacular UX: Kinyarwanda, French, and English",
    date: "April 20, 2026",
    publishedAt: "2026-04-20",
    readingTime: "3 min read",
    image: "/images/rw-graphic01-30p.png",
    imageAlt: "Rwanda cultural graphic showing local context and vernacular digital empowerment",
    excerpt: "Ensuring every citizen and front-line officer can interact with technology naturally in their own native language and cultural context.",
    location: "Kigali, Rwanda",
    institution: "Civic Interfaces",
    stats: { label: "Languages Supported", value: "3 Native" },
    body: [
      "Our design systems incorporate native Kinyarwanda terminology alongside English and French to eliminate literacy and linguistic barriers for public users.",
    ],
  },
  {
    slug: "climate-resilient-hardware-packaging",
    sectionKey: "impact",
    category: "world-context",
    categoryLabel: "World context",
    title: "Thermal & Dust-Resilient Hardware Engineering for African Climates",
    date: "February 28, 2026",
    publishedAt: "2026-02-28",
    readingTime: "3 min read",
    image: "/images/techforwardlive2026-photo-download-1of1/Highlights/CEPSTUDIO(112).jpg",
    imageAlt: "Engineers inspecting custom thermal-dissipating aluminum hardware enclosures for biometric scanners",
    excerpt: "Custom enclosure designs with passive thermal dissipation and wide voltage tolerance engineered for equatorial conditions.",
    location: "Rwanda & Mali",
    institution: "Hardware Labs",
    stats: { label: "Operating Range", value: "-5°C to 50°C" },
    body: [
      "SAN TECH manufactures ruggedized casing with internal surge protection to withstand power fluctuations and ambient outdoor dust.",
    ],
  },

  // =========================================================================
  // CAREER OUTREACH -> 01 Practical entry
  // =========================================================================
  {
    slug: "university-rwanda-hands-on-applied-ai-labs",
    sectionKey: "career",
    category: "practical-entry",
    categoryLabel: "Practical entry",
    title: "University of Rwanda Applied AI & Systems Architecture Labs",
    date: "June 16, 2026",
    publishedAt: "2026-06-16",
    readingTime: "4 min read",
    image: "/images/techforwardlive2026-photo-download-1of1/Highlights/CEPSTUDIO(108).jpg",
    imageAlt: "Undergraduate computer science students programming edge AI vision models in university lab",
    excerpt: "Over 180 Computer Science and Electronics engineering undergraduates built real-time computer vision prototypes and edge inference pipelines.",
    location: "University of Rwanda (CST)",
    institution: "College of Science & Technology",
    stats: { label: "Students Trained", value: "180+" },
    body: [
      "SAN TECH engineers led 3-day practical workshops at CST Kigali. Students received embedded micro-controller kits to write real-time OpenCV and TensorRT code.",
      "Instead of textbook theory, students solved tangible regional challenges including traffic counting and touchless optical visitor verification.",
    ],
  },
  {
    slug: "secondary-school-stem-robotics-camps",
    sectionKey: "career",
    category: "practical-entry",
    categoryLabel: "Practical entry",
    title: "Secondary Schools STEM Robotics & Micro-Controller Camps",
    date: "May 25, 2026",
    publishedAt: "2026-05-25",
    readingTime: "3 min read",
    image: "/images/techforwardlive2026-photo-download-1of1/Highlights/CEPSTUDIO(1).jpg",
    imageAlt: "Secondary school students assembling micro-controllers and robotics hardware components",
    excerpt: "Demystifying software engineering for 250+ secondary students across 8 schools through hands-on electronics and coding clinics.",
    location: "Kigali & Rural Districts",
    institution: "Secondary STEM Outreach",
    stats: { label: "High School Students", value: "250+" },
    body: [
      "SAN TECH's outreach team brought robotics kits and interactive logic software to classrooms, inspiring teenagers before university specialization.",
    ],
  },
  {
    slug: "kepler-and-alu-production-cicd-bootcamps",
    sectionKey: "career",
    category: "practical-entry",
    categoryLabel: "Practical entry",
    title: "Production CI/CD & Automated Testing at Kepler and ALU",
    date: "April 14, 2026",
    publishedAt: "2026-04-14",
    readingTime: "4 min read",
    image: "/images/techforwardlive2026-photo-download-1of1/Highlights/CEPSTUDIO(40).jpg",
    imageAlt: "University students collaborating during software deployment bootcamp",
    excerpt: "Teaching industry engineering workflows: Git branch management, Docker containerization, Playwright test suites, and clean pull requests.",
    location: "Kigali Innovation City",
    institution: "ALU & Kepler College",
    stats: { label: "Student Projects", value: "48 Deployed" },
    body: [
      "Equipping undergraduates with real production development habits so they are Day-1 ready for high-performing engineering teams.",
    ],
  },

  // =========================================================================
  // CAREER OUTREACH -> 02 Mentorship and placement
  // =========================================================================
  {
    slug: "san-tech-engineering-apprenticeship-program",
    sectionKey: "career",
    category: "mentorship-and-placement",
    categoryLabel: "Mentorship and placement",
    title: "SAN TECH 6-Month Paid Engineering Apprenticeship Cohorts",
    date: "June 20, 2026",
    publishedAt: "2026-06-20",
    readingTime: "4 min read",
    image: "/images/graduates.jpg",
    imageAlt: "SAN TECH cohort graduates celebrating their full-time engineering placements",
    excerpt: "Transitioning top graduates directly from potential into real contribution through guided mentoring on live production enterprise systems.",
    location: "Kigali, Rwanda",
    institution: "SAN TECH Engineering Labs",
    stats: { label: "Employment Rate", value: "98.4%" },
    body: [
      "Apprentices work side-by-side with senior architects on real client deliverables, receiving weekly code reviews, system design coaching, and career guidance.",
      "Over 98% of cohort apprentices successfully transition into full-time junior and mid-level software engineering positions.",
    ],
  },
  {
    slug: "women-in-tech-senior-leadership-circles",
    sectionKey: "career",
    category: "mentorship-and-placement",
    categoryLabel: "Mentorship and placement",
    title: "Women in Tech Mentorship & Engineering Leadership Circles",
    date: "May 08, 2026",
    publishedAt: "2026-05-08",
    readingTime: "4 min read",
    image: "/images/techforwardlive2026-photo-download-1of1/Highlights/CEPSTUDIO(165).jpg",
    imageAlt: "Female developers and tech mentors collaborating during technical strategy session",
    excerpt: "1-on-1 career navigation, technical interview coaching, and senior architecture mentorship for emerging female engineers.",
    location: "Kigali & Remote",
    institution: "SAN HUB Women in Tech",
    stats: { label: "Mentees Advanced", value: "65 Engineers" },
    body: [
      "Connecting promising female engineers with CTOs and lead architects to build confidence, leadership skills, and executive negotiation capability.",
    ],
  },
  {
    slug: "executive-one-on-one-career-clinics",
    sectionKey: "career",
    category: "mentorship-and-placement",
    categoryLabel: "Mentorship and placement",
    title: "Executive Tech Clinics & Career Portfolio Reviews",
    date: "March 22, 2026",
    publishedAt: "2026-03-22",
    readingTime: "3 min read",
    image: "/images/techforwardlive2026-photo-download-1of1/Highlights/CEPSTUDIO(174).jpg",
    imageAlt: "Senior SAN TECH architects presenting certificates and career recommendations to graduates",
    excerpt: "Free monthly open clinics providing junior developers with honest resume critiques, code audits, and technical interview simulations.",
    location: "SAN HUB Arena",
    institution: "SAN HUB Career Services",
    stats: { label: "Clinics Hosted", value: "24 Sessions" },
    body: [
      "Helping self-taught builders and university leavers present their software portfolio clearly to global and regional tech employers.",
    ],
  },

  // =========================================================================
  // CAREER OUTREACH -> 03 Community outreach
  // =========================================================================
  {
    slug: "tech-forward-live-annual-summit",
    sectionKey: "career",
    category: "community-outreach",
    categoryLabel: "Community outreach",
    title: "Tech Forward Live: Connecting Builders, Students & Industry Leaders",
    date: "June 05, 2026",
    publishedAt: "2026-06-05",
    readingTime: "5 min read",
    image: "/images/techforwardlive2026-photo-download-1of1/Highlights/CEPSTUDIO(80).jpg",
    imageAlt: "Audience of hundreds of young builders, students, and institutional partners at Tech Forward Live summit",
    excerpt: "Gathering over 1,200 developers, students, researchers, and technology executives for keynote talks, live demos, and talent showcases.",
    location: "Kigali Arena & Online",
    institution: "Tech Forward Live Summit",
    stats: { label: "Summit Attendees", value: "1,200+" },
    body: [
      "Tech Forward Live is SAN TECH's flagship community summit. The event celebrates regional innovation, awards developer micro-grants, and showcases breakthrough African tech.",
      "The summit features hands-on demo pods where student teams present their working software prototypes directly to potential investors and employers.",
    ],
  },
  {
    slug: "open-community-hackathons-and-microgrants",
    sectionKey: "career",
    category: "community-outreach",
    categoryLabel: "Community outreach",
    title: "48-Hour Open Community Buildathons & Micro-Grants",
    date: "April 28, 2026",
    publishedAt: "2026-04-28",
    readingTime: "4 min read",
    image: "/images/techforwardlive2026-photo-download-1of1/Highlights/CEPSTUDIO(144).jpg",
    imageAlt: "Hackathon participants presenting working civic tech prototypes to judging panel",
    excerpt: "Funding high-impact civic prototypes with $15,000 in micro-grants, cloud hosting credits, and dedicated SAN HUB incubation space.",
    location: "SAN HUB Kigali",
    institution: "Community Hackathons",
    stats: { label: "Grants Distributed", value: "$15,000" },
    body: [
      "Weekend coding sprints focused on solving real municipal challenges, accessible public services, and open data visualization for African cities.",
    ],
  },
  {
    slug: "neighborhood-open-days-and-digital-literacy",
    sectionKey: "career",
    category: "community-outreach",
    categoryLabel: "Community outreach",
    title: "Neighborhood Open Days: Welcoming Families to the World of Tech",
    date: "February 12, 2026",
    publishedAt: "2026-02-12",
    readingTime: "3 min read",
    image: "/images/techforwardlive2026-photo-download-1of1/Highlights/CEPSTUDIO(87).jpg",
    imageAlt: "Young kids and parents exploring interactive digital games and code demos during SAN HUB open day",
    excerpt: "Opening SAN TECH labs to parents, teachers, and school children to experience 3D printing, robotics, and interactive programming.",
    location: "SAN HUB Campus",
    institution: "Community Open Days",
    stats: { label: "Visitors Welcomed", value: "850+ Guests" },
    body: [
      "Making technology approachable, welcoming, and exciting for families across our surrounding neighborhoods.",
    ],
  },
];
