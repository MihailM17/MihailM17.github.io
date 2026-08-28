export interface Project {
  slug: string;
  index: string;
  title: string;
  titleEn: string;
  year: string;
  kicker: string;
  meta: string;
  youtubeUrl: string;
  thumb: string;
  cover: string;
  synopsis: string;
  story: string[];
  specs: { label: string; value: string }[];
  gallery: { src: string; caption: string; alt: string }[];
}

export const projects: Project[] = [
  {
    slug: "silent-lifts-vitosha",
    index: "01",
    title: "Замлъкналите лифтове на Витоша",
    titleEn: "The Silent Lifts of Vitosha",
    year: "2026",
    kicker: "Documentary · Director & Editor",
    meta: "11 min · Vitosha, Sofia · In collab with University of Central Florida · 28 days",
    youtubeUrl: "https://youtu.be/_ajdklDn5_k",
    thumb: "https://img.youtube.com/vi/_ajdklDn5_k/maxresdefault.jpg",
    cover: "https://img.youtube.com/vi/_ajdklDn5_k/maxresdefault.jpg",
    synopsis: "A documentary film exploring the history and impact of the Vitosha mountain lift closures.",
    story: [
      "The Silent Lifts of Vitosha was created in just 28 days during a joint production sprint between New Bulgarian University and students from the University of Central Florida. The event, organized by our professors, featured five crews of four people each. It was an incredible opportunity to test the skills we've acquired over the past three years while collaborating and making connections with international filmmakers.",
      "The concept came to me naturally. For a long time, I've missed the lifts that connect my hometown of Sofia to Vitosha Mountain - places I frequently visited with my parents when I was younger. Once the idea was born and we dove into the research, the topic revealed itself to be far more complex, intriguing, and political than any of us initially expected. We followed lift operators and the families who built their lives and careers around these chairlifts that no longer run.",
      "None of this would have been possible without our incredible four-person crew. My fellow Bulgarian teammate took on the heavy lifting of producing, opening doors and connecting us with people I never thought we'd be able to reach. On the American side, our cinematographer immersed herself in this entirely new environment almost instantly, finding the most amazing shots along the mountain. Our fourth teammate, also from the US, was the absolute glue of the production, recording sound and handling all the essential details that tied the whole project together.",
      "I wrote, directed, edited, and graded the film in DaVinci Resolve. Every interview was a single-take, single-camera confession; every piece of B-roll was earned through a hike. It was a truly unforgettable experience and a defining project, culminating in special screenings for representatives of the US Council in Sofia as well as local government officials."
    ],
    specs: [
      { label: "Role", value: "Director & Editor" },
      { label: "Duration", value: "11 min" },
      { label: "Location", value: "Vitosha, Sofia" },
      { label: "Collab", value: "NBU × UCF — made in 28 days" },
      { label: "Tools", value: "DaVinci Resolve, Sony FX3" },
    ],
    gallery: [
      { src: "https://img.youtube.com/vi/_ajdklDn5_k/maxresdefault.jpg", caption: "Vitosha ridge — empty chairs at golden hour", alt: "Vitosha lifts" },
      { src: "/1000000570.png", caption: "Portrait — on location", alt: "On set portrait" },
      { src: "/art-portal-cover.png", caption: "Stills — archival poster", alt: "Poster" },
    ],
  },
  {
    slug: "eastern-wind",
    index: "04",
    title: "Източен вятър",
    titleEn: "Eastern Wind",
    year: "2025",
    kicker: "Short Film · Editor & Production Sound",
    meta: "13 min · NBU · Independent · Mountain Villa",
    youtubeUrl: "https://youtu.be/jGJNPgaQiJE",
    thumb: "https://img.youtube.com/vi/jGJNPgaQiJE/maxresdefault.jpg",
    cover: "https://img.youtube.com/vi/jGJNPgaQiJE/maxresdefault.jpg",
    synopsis: "A psychological drama about friends at a mountain villa where the East Wind exposes hidden tensions — my first credit as editor and production sound, made independently after my first year at NBU.",
    story: [
      "Made independently just after my first year at New Bulgarian University, Източен вятър holds a special place in my portfolio as a benchmark for how far I've come. When a colleague wanted to create a short film outside of our regular university coursework, she brought me on board to edit and, for the very first time, run production sound.",
      "The film is a psychological drama about friends staying at a mountain villa. A local host warns them about the \"East Wind,\" a phenomenon believed to bring out the worst in people. As the weather turns, hidden resentments and a secret affair boil over, ultimately culminating in a severe allergic reaction and a tragic car crash.",
      "Stepping into the role of the \"sound guy\" was a completely new and fun challenge that forced me to listen to a set in an entirely different way. The post-production was equally demanding. Piecing together the tension and balancing the audio mix proved to be a tough edit, but pushing through those hurdles yielded a final result that far exceeded my initial expectations."
    ],
    specs: [
      { label: "Role", value: "Editor & Production Sound" },
      { label: "Duration", value: "13 min" },
      { label: "Format", value: "Independent · Short Film" },
      { label: "Year", value: "2025" },
    ],
    gallery: [
      { src: "https://img.youtube.com/vi/jGJNPgaQiJE/maxresdefault.jpg", caption: "Interior — kitchen light at 6am", alt: "Eastern Wind still" },
      { src: "/big-praz-1.png", caption: "Lookbook — Eastern Wind", alt: "Poster" },
    ],
  },
  {
    slug: "zasnet",
    index: "02",
    title: "Заснет",
    titleEn: "Заснет",
    year: "2025",
    kicker: "Short Film · Director & Editor",
    meta: "9 min · NBU · DaVinci Resolve grade",
    youtubeUrl: "https://youtu.be/GpF_UJrMVxk",
    thumb: "https://img.youtube.com/vi/GpF_UJrMVxk/maxresdefault.jpg",
    cover: "https://img.youtube.com/vi/GpF_UJrMVxk/maxresdefault.jpg",
    synopsis: "A narrative short film about the complexities of human relationships.",
    story: [
      "This short film was born out of a winter film workshop at New Bulgarian University. The greatest challenge? We had exactly three days to shoot a film in the village of Elena—a location we knew almost nothing about beforehand.",
      "To prepare, I relied heavily on Google Maps to blindly scout potential shooting locations. It was a risky, hit-or-miss strategy, but a necessary one. Although I didn't write the screenplay, I worked to ensure the script was as adaptable as possible for unpredictable conditions. We shot almost entirely outdoors in the freezing winter, relying on zero artificial lighting—just the sun, the mountain fog, and what we had in front of the lens.",
      "While every project has room for improvement, the constraints of this shoot taught our team an incredible amount about adaptability and run-and-gun filmmaking."
    ],
    specs: [
      { label: "Role", value: "Director & Editor" },
      { label: "Duration", value: "9 min" },
      { label: "Grade", value: "DaVinci Resolve" },
      { label: "Year", value: "2025" },
    ],
    gallery: [
      { src: "https://img.youtube.com/vi/_ajdklDn5_k/maxresdefault.jpg", caption: "Zasnet — night interior", alt: "Zasnet still" },
      { src: "/big-praz-2.png", caption: "Set — monitor", alt: "On monitor" },
    ],
  },
  {
    slug: "remake-season-2",
    index: "03",
    title: "РимейкЪТ — Season 2",
    titleEn: "Remake — Season 2",
    year: "2025",
    kicker: "TV Reality Show · Director",
    meta: "3-episode competition · NBU Television · 2025",
    youtubeUrl: "https://youtu.be/L-FgwXF-VA8?si=tXC_bETUdr_AfYAI",
    thumb: "https://img.youtube.com/vi/L-FgwXF-VA8/maxresdefault.jpg",
    cover: "https://img.youtube.com/vi/L-FgwXF-VA8/maxresdefault.jpg",
    synopsis: "The second season of a student reality competition project, requiring extensive crew organization and post-production management.",
    story: [
      "РимейкЪТ is a student-led television reality show at New Bulgarian University that follows competing teams as they recreate scenes from iconic Bulgarian films. The format documents the entire filmmaking journey - from initial script analysis and artistic choices to the chaotic shoot days, editing, and the final screening.",
      "For the second season, the students chose to remake scenes from the massive new hit Gundi: Legend of Love. Stepping into the role of Series Director for the reality production, I wanted to ensure the show wasn't just a dry behind-the-scenes documentary. I wanted it to have a distinct visual framework. Inspired by the way the original Gundi film utilized color to separate character motives, I introduced a color-coding system for our reality show. Instead of just dividing the teams functionally, we assigned them specific colors - blue, green, red, yellow - each symbolizing different qualities and attitudes. This visual concept became a creative bridge between the original cinematic masterpiece and our reality format.",
      "The logistics were intense. Distributing the TV crew, synchronizing schedules, and leading a group of people I didn't initially know well required fast, precise decisions. Thanks to the guidance of our university supervisors, Bobi Dimova and Rado Badov, we kept our focus through the highly pressurized studio shoot days. That calm translated into post-production, where I worked closely with our lead editor, Kaloyan Zlatev. Sifting through hundreds of gigabytes of footage to craft a compelling narrative across three 20-minute episodes was a monumental task, but we were completely in sync.",
      "The project culminated in a packed premiere at the university cinema. To our surprise, the director and lead cinematographer of Gundi: Legend of Love - Dimitar Dimitrov and Boris Slavkov - attended the screening. Watching the reality show with them and hearing the director say, \"I don't know much about reality formats, but I genuinely had fun; you did a super job,\" was an unforgettable, validating experience."
    ],
    specs: [
      { label: "Role", value: "Director — Season 2" },
      { label: "Format", value: "3 × 20 min · Reality Competition" },
      { label: "Network", value: "NBU Television" },
      { label: "Cameras", value: "8 × broadcast" },
    ],
    gallery: [
      { src: "https://img.youtube.com/vi/L-FgwXF-VA8/maxresdefault.jpg", caption: "Control room — live cut", alt: "Control room" },
      { src: "/director-photo-final-remakecut.jpg", caption: "Director — Remake Season 2", alt: "Director Remake" },
      { src: "/group-photo-final-remakecut.jpg", caption: "Group photo — Remake Season 2", alt: "Group Remake" },
      { src: "/me-final-remakecut.jpg", caption: "Director final — Remake Season 2", alt: "Director final Remake" },
      { src: "/me-remakecut.jpg", caption: "On set — Remake Season 2", alt: "On set Remake" },
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
