// ============================================================
// EDIT ALL SITE TEXT HERE — single file for VS Code
// No need to hunt through components. Change values, save, rebuild.
// ============================================================

export const siteContent = {
  // Browser tab title
  siteTitle: "Mihail Mihaylov — Director & Editor",

  hero: {
    eyebrow: "Director — Editor",
    titleLine1: "Mihail",
    titleLine2: "Mihaylov",
    sub: "Third-year director and editor at New Bulgarian University, with experience directing short films, documentaries, TV, and online short-form content.",
    meta: "Sofia, Bulgaria · 42.70°N 23.32°E",
  },

  about: {
    kicker: "About — Sofia / NBU",
    titleLine1: "Crafting",
    titleLine2: "visual stories.",
    lead: "Sofia-based director who lives in post-production — final year, Cinema & Television at New Bulgarian University.",
    p1: "Hey, I'm Mihail. I'm a Sofia-based director who also edits videos. I'm currently in my final year studying Cinema and Television at New Bulgarian University.",
    p2: "I love the entire post-production puzzle, especially color grading and cutting in DaVinci Resolve. Over the past couple of years, my work has bounced between directing short documentaries and TV reality shows, to editing fast-paced digital content and broadcast deliveries.",
    stats: [
      { value: "28", label: "days to be made — Vitosha doc sprint" },
      { value: "04", label: "episodes delivered" },
      { value: "03", label: "shorts & docs" },
    ],
    lang: "Bulgarian • English — Sofia, Bulgaria",
    portraitAlt: "Portrait of Mihail Mihaylov",
  },

  narrative: {
    kicker: "Narrative",
    index: "01",
    count: "03 / Short Films & Docs",
    hint: "Strict editorial — title, comma, year. No fluff.",
  },

  commercial: {
    kicker: "Commercial",
    index: "02",
    count: "7Arts · Timeless · Broadcast",
    hint: "Professional work",
    jobs: [
      {
        org: "7Arts / ArtPortal",
        role: "Editor & Camera Operator",
        years: "2024 — 2025",
        desc: "Cutting and shooting art-world coverage for Bulgaria's largest cultural platform. Gallery openings, artist profiles, and social-first verticals — often same-day turnarounds.",
        items: [
          { url: "https://www.instagram.com/reel/DP1d4V7DE5n/", thumb: "/art-portal-cover.png", label: "Art Portal — Reel · 2025", isVertical: true },
          { url: "https://www.instagram.com/reel/DQwwvU7CGVI/", thumb: "/big-praz-1.png", label: "Big Praz — Announcement · 2025", isVertical: true },
          { url: "https://www.facebook.com/share/v/1DQJKSR9fR/", thumb: "/big-praz-2.png", label: "Big Praz — Live Reel · 2025", isVertical: true },
        ],
      },
      {
        org: "Timeless Production Group",
        role: "Post-production Editor — ‘Уча Зная и Играя’",
        years: "2023 — 2024",
        desc: "Editor on the children's educational series 'Уча Зная и Играя'. Four delivered episodes, broadcast-ready color and sound — built for curious young eyes.",
        items: [
          { url: "https://youtu.be/vC3i48d0Mms", thumb: "https://img.youtube.com/vi/vC3i48d0Mms/hqdefault.jpg", label: "Сапунените мехури" },
          { url: "https://youtu.be/CE5H1h6dpFw", thumb: "https://img.youtube.com/vi/CE5H1h6dpFw/hqdefault.jpg", label: "Колелото" },
          { url: "https://youtu.be/O9bSfzCGmyg", thumb: "https://img.youtube.com/vi/O9bSfzCGmyg/hqdefault.jpg", label: "Фотография" },
          { url: "https://youtu.be/l9OJxQ7X9vY", thumb: "https://img.youtube.com/vi/l9OJxQ7X9vY/hqdefault.jpg", label: "Механика" },
        ],
      },
    ],
    credits: [
      { org: "New Bulgarian University", role: "Cinema & Television — Directing & Editing", note: "final year" },
      { org: "Timeless Production Group", role: "Post-production editor", note: "4 episodes delivered" },
      { org: "7Arts / ArtPortal", role: "Editor + camera operator", note: "daily culture coverage" },
      { org: "Sofia International Film Festival", role: "Photo & video coverage", note: "volunteer, 2 years" },
    ],
  },

  gallery: {
    eyebrow: "Archive / Film Strip",
    title: "Selected Stills.",
    hint: "SCROLL → hold to scrub",
    items: [
      { src: "/art-portal-cover.png", alt: "Art Portal still", caption: "Art Portal — Gallery coverage", year: "2025" },
      { src: "/big-praz-1.png", alt: "Big Praz Show poster", caption: "Big Praz — Announcement", year: "2025" },
      { src: "/big-praz-2.png", alt: "Big Praz rehearsal still", caption: "Big Praz — Stage", year: "2025" },
      { src: "/1000000570.png", alt: "Portrait of Mihail on set", caption: "On set — Sofia", year: "2024" },
      { src: "https://img.youtube.com/vi/_ajdklDn5_k/maxresdefault.jpg", alt: "Silent Lifts still", caption: "Замлъкналите лифтове — Vitosha", year: "2026" },
      { src: "https://img.youtube.com/vi/GpF_UJrMVxk/maxresdefault.jpg", alt: "Zasnet still", caption: "Заснет — Night interior", year: "2024" },
      { src: "https://img.youtube.com/vi/L-FgwXF-VA8/maxresdefault.jpg", alt: "Remake show still", caption: "РимейкЪТ — Control room", year: "2025" },
      { src: "https://img.youtube.com/vi/vC3i48d0Mms/hqdefault.jpg", alt: "Ucha Znaia still", caption: "Уча Зная и Играя — Lab", year: "2024" },
    ],
  },

  craft: {
    kicker: "Craft",
    title: "The cut is the performance.",
    nowKicker: "Now",
    nowTitle: "Resolve-first, story-always.",
    tags: ["DaVinci Resolve", "Color", "Edit", "Camera", "Broadcast Delivery"],
    approachKicker: "Approach",
    approachText: "Fast where it needs to be, patient where it matters. I like hard cuts, honest color, and letting a subject finish a thought.",
  },

  contact: {
    kicker: "Contact",
    title: "Get in touch.",
    titleAccent: "", // if you want "loud." etc, put here
    lede: "Based in Sofia, Bulgaria. Open to editing, color, and directing work.",
    email: "mohailmihaylov2004@gmail.com",
    instagram: "https://www.instagram.com/mihail.m4307/",
    linkedin: "https://www.linkedin.com/in/mihail-mihaylov-bb0238247/",
    formNote: "Opens your email app — no data stored on site.",
  },

  // Footer
  footer: "© 2026 Mihail Mihaylov · Sofia, Bulgaria · Made for the big screen",

  // Hamburger menu — edit labels here too
  nav: [
    { href: "#narrative", label: "Narrative" },
    { href: "#commercial", label: "Commercial" },
    { href: "#archive", label: "Archive" },
    { href: "#about", label: "About" },
    { href: "#contact", label: "Contact" },
  ],
};

// For projects detail pages — edit stories in src/data/projects.ts
// That file has story: string[] and gallery: [] per film.
// Change that file's story paragraphs and images to update each /projects/[slug] page.

