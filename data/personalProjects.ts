export type ColorScheme = 'orange' | 'orangeLight' | 'blue' | 'yellow' | 'red' | 'green' | 'purple' | 'indigo' | 'cyan' | 'pink';

export interface Project {
  id: string;
  index: string;
  type: "WEB APP" | "MOBILE APP" | "DESIGN" | "FULL STACK" | "AI APP" | "TOOL" | "PORTFOLIO";
  title: string;
  role: string;
  description: string;
  date: string;
  image: string;
  slideImages?: string[];
  technologies: string[];
  githubUrl?: string;
  githubUrlFrontend?: string;
  githubUrlBackend?: string;
  githubUrlNodePullData?: string;
  demoUrl?: string;
  colorScheme: ColorScheme;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    id: "job-matching-ai",
    index: "01",
    type: "AI APP",
    title: "Job Matching AI",
    role: "Full Stack Developer",
    description: "AI-powered job matching application that helps job seekers find ideal roles by analyzing resumes and matching them with relevant job opportunities using RAG and vector search technology.",
    date: "Q1 2025",
    image: "/project/JobMatching1.png",
    slideImages: [
      "/project/JobMatching1.png",
      "/project/JobMatching2.png",
      "/project/JobMatching3.png",
      "/project/JobMatching4.png",
      "/project/JobMatching5.png",
      "/project/JobMatching6.png",
      "/project/JobMatching7.png"
    ],
    technologies: ["Next.js 16", "TypeScript", "Google Gemini Pro 1.5", "RAG", "IndexedDB", "TailwindCSS", "Node.js", "ulixee", "huggingface/transformers"],
    githubUrl: "https://github.com/unikonkon/NextJS_Job_MatchingAI",
    githubUrlNodePullData: "https://github.com/unikonkon/nodeJS_JobThai_Scraper",
    demoUrl: "https://jobmatchingai.vercel.app/",
    colorScheme: "indigo",
    featured: true
  },
  {
    id: "crypto-news",
    index: "02",
    type: "FULL STACK",
    title: "Crypto News Analysis",
    role: "Full Stack Developer",
    description: "AI-powered crypto news aggregator with sentiment analysis and trending score using Google Gemini API. Real-time updates with RSS feeds from major crypto news sources.",
    date: "Q4 2024",
    image: "/project/CryptoNews3.png",
    slideImages: [
      "/project/CryptoNews1.png",
      "/project/CryptoNews2.png",
      "/project/CryptoNews3.png",
      "/project/CryptoNews4.png",
      "/project/CryptoNews5.png",
      "/project/CryptoNews6.png",
      "/project/CryptoNews7.png",
      "/project/CryptoNews8.png"
    ],
    technologies: ["Next.js", "TypeScript", "Supabase", "Google Gemini API", "TailwindCSS", "RSS Parser"],
    githubUrl: "https://github.com/unikonkon/NextJS_Crypto_News_Aggregator",
    demoUrl: "https://crypto-news-aggregator-alpha.vercel.app/",
    colorScheme: "orange",
    featured: true
  },
  {
    id: "web-record",
    index: "03",
    type: "WEB APP",
    title: "WebRecord Sound App",
    role: "Full Stack Developer",
    description: "Browser-based audio recording with IndexedDB storage, Firebase auth, and privacy-first approach.",
    date: "Q3 2024",
    image: "/project/project WebRecord1.png",
    slideImages: [
      "/project/project WebRecord1.png",
      "/project/project WebRecord2.png",
      "/project/project WebRecord3.png",
      "/project/project WebRecord4.png",
      "/project/project WebRecord5.png",
      "/project/project WebRecord6.png"
    ],
    technologies: ["React", "TypeScript", "TailwindCSS", "IndexedDB"],
    githubUrl: "https://github.com/unikonkon/React_WebRecord",
    demoUrl: "https://voice-record-phi.vercel.app/",
    colorScheme: "blue",
    featured: true
  },
  {
    id: "web-planning",
    index: "04",
    type: "AI APP",
    title: "WEB Planning Generator",
    role: "Front-End Developer",
    description: "AI-powered website planning tool that generates project discovery documents and website flowcharts using Google Gemini API. Features 4-step wizard, export to PDF/Word, and Mermaid diagram generation.",
    date: "Q2 2024",
    image: "/project/project WEB Planning1.png",
    slideImages: [
      "/project/project WEB Planning1.png",
      "/project/project WEB Planning2.png",
      "/project/project WEB Planning3.png",
      "/project/project WEB Planning4.png",
      "/project/project WEB Planning5.png",
      "/project/project WEB Planning6.png",
      "/project/project WEB Planning7.png",
      "/project/project WEB Planning8.png"
    ],
    technologies: ["Next.js 15", "TypeScript", "TailwindCSS", "Google Gemini API", "Mermaid.js", "shadcn/ui", "IndexedDB"],
    githubUrl: "https://github.com/unikonkon/NextJS_WEB_Planning_Generator",
    demoUrl: "https://next-js-web-planning-generator.vercel.app",
    colorScheme: "purple",
    featured: true
  },
  {
    id: "crypto-sentiment",
    index: "05",
    type: "FULL STACK",
    title: "Crypto Sentiment Analysis",
    role: "Full Stack Developer",
    description: "Analyze the sentiment of cryptocurrencies using AI Gemini API to make better investment decisions. Updates with RSS feeds from major crypto news sources.",
    date: "Q1 2024",
    image: "/project/CryptoSentiment1.png",
    slideImages: [
      "/project/CryptoSentiment1.png",
      "/project/CryptoSentiment2.png",
      "/project/CryptoSentiment3.png",
      "/project/CryptoSentiment4.png",
      "/project/CryptoSentiment5.png",
      "/project/CryptoSentiment6.png",
      "/project/CryptoSentiment7.png",
      "/project/CryptoSentiment8.png",
      "/project/CryptoSentiment9.png",
      "/project/CryptoSentiment10.png",
      "/project/CryptoSentiment11.png",
      "/project/CryptoSentiment12.png"
    ],
    technologies: ["Next.js", "TypeScript", "Supabase", "Google Gemini API", "TailwindCSS", "NestJS", "Three.js"],
    githubUrlFrontend: "https://github.com/unikonkon/FrontEnd_useNestJS_CryptoSentimentAnalysis",
    githubUrlBackend: "https://github.com/unikonkon/BackEnd_NestJS_CryptoSentimentAnalysis",
    demoUrl: "https://crypto-sentiment-analysis-ten.vercel.app/",
    colorScheme: "orangeLight",
    featured: true
  },
  {
    id: "crypto-tracker",
    index: "06",
    type: "WEB APP",
    title: "CryptoTracker",
    role: "Front-End Developer",
    description: "Modern cryptocurrency tracking with categorized views, search functionality, and 7-day price charts.",
    date: "Q4 2023",
    image: "/project/project CryptoTracker.png",
    technologies: ["Next.js", "TypeScript", "TailwindCSS", "Recharts"],
    githubUrl: "https://github.com/unikonkon/NextJS_CryptoTracker",
    demoUrl: "https://crypto-tracker-drab-eta.vercel.app/",
    colorScheme: "yellow",
    featured: true
  },
  {
    id: "html-fetcher",
    index: "07",
    type: "TOOL",
    title: "HTML Fetcher",
    role: "Front-End Developer",
    description: "Web application for fetching and processing HTML content from URLs. Built with Next.js and TypeScript for efficient web scraping and content extraction.",
    date: "Q3 2023",
    image: "/project/project HTMLFetcher1.png",
    slideImages: [
      "/project/project HTMLFetcher1.png",
      "/project/project HTMLFetcher2.png",
      "/project/project HTMLFetcher3.png"
    ],
    technologies: ["Next.js", "TypeScript", "TailwindCSS"],
    githubUrl: "https://github.com/unikonkon/NextJS_HTML_Fetcher",
    demoUrl: "https://html-fetcher-blush.vercel.app/",
    colorScheme: "blue",
    featured: true
  },
  {
    id: "text-to-speech-app",
    index: "08",
    type: "WEB APP",
    title: "🗣️ Text-to-Speech App",
    role: "Front-End Developer",
    description: "Web application for text-to-speech conversion with voice selection and multi-language support.",
    date: "Q2 2023",
    image: "/project/project texttospeech.png",
    technologies: ["Next.js", "TypeScript", "Web Speech API"],
    githubUrl: "https://github.com/unikonkon/NextJS_Text-to-Speech-App",
    demoUrl: "https://text-to-speech-app-kappa.vercel.app/",
    colorScheme: "green",
    featured: true
  },
  {
    id: "pythaitts-app",
    index: "09",
    type: "FULL STACK",
    title: "🇹🇭 PyThaiTTS App",
    role: "Full Stack Developer",
    description: "Full-stack Thai text-to-speech with FastAPI backend and PyThaiTTS integration.",
    date: "Q1 2023",
    image: "/project/project PyThaiTTS texttospeech.png",
    technologies: ["Next.js", "FastAPI", "Python", "PyThaiTTS"],
    githubUrl: "https://github.com/unikonkon/NextJS_Text-to-Speech-for-PyThaiTTS",
    colorScheme: "purple",
    featured: true
  },
  {
    id: "portfolio-v1",
    index: "10",
    type: "PORTFOLIO",
    title: "💼 Portfolio V1",
    role: "Front-End Developer",
    description: "Clean and minimalist portfolio website with responsive design principles.",
    date: "Q1 2023",
    image: "/project/project webport1.png",
    technologies: ["Next.js", "TypeScript", "TailwindCSS", "Three.js"],
    githubUrl: "https://github.com/unikonkon/NextJs_WebProtfolio",
    demoUrl: "https://faradaybanana.vercel.app/",
    colorScheme: "indigo",
    featured: true
  },
  {
    id: "portfolio-v2",
    index: "11",
    type: "PORTFOLIO",
    title: "💼 Portfolio V2",
    role: "Front-End Developer",
    description: "Clean and minimalist portfolio website with responsive design principles.",
    date: "Q1 2023",
    image: "/project/Portfolio V2.png",
    technologies: ["Next.js", "TypeScript", "TailwindCSS", "Three.js"],
    githubUrl: "https://github.com/unikonkon/NextJS_PortfolioWeb_V2",
    demoUrl: "https://bananafaradayport.vercel.app/",
    colorScheme: "indigo",
    featured: true
  },
  {
    id: "portfolio-modern-programmer",
    index: "12",
    type: "PORTFOLIO",
    title: "💼 Portfolio Modern Programmer",
    role: "Front-End Developer",
    description: "Clean and minimalist portfolio website with responsive design principles.",
    date: "Q1 2023",
    image: "/project/Portfolio Modern Programmer.png",
    technologies: ["Next.js", "TypeScript", "TailwindCSS", "gsap"],
    githubUrl: "https://github.com/unikonkon/NextJS_PortfolioWeb_Modern_Programmer_GSAP",
    demoUrl: "https://portfolio-web-modern-programmer-gsa.vercel.app/",
    colorScheme: "indigo",
    featured: true
  },
  {
    id: "portfolio-programmer-space",
    index: "13",
    type: "PORTFOLIO",
    title: "💼 Portfolio Programmer Space",
    role: "Front-End Developer",
    description: "Clean and minimalist portfolio website with responsive design principles.",
    date: "Q1 2023",
    image: "/project/Portfolio Programmer Space.png",
    technologies: ["Next.js", "TypeScript", "TailwindCSS", "framer-motion"],
    githubUrl: "https://github.com/unikonkon/NextJS_PortfolioWeb_Modern_Programmer_Space",
    demoUrl: "https://portfolio-web-modern-programmer-spa.vercel.app/",
    colorScheme: "indigo",
    featured: true
  },
  {
    id: "portfolio-greek-roman",
    index: "14",
    type: "PORTFOLIO",
    title: "💼 Portfolio Greek Roman",
    role: "Front-End Developer",
    description: "Clean and minimalist portfolio website with responsive design principles.",
    date: "Q1 2023",
    image: "/project/Portfolio Greek Roman.png",
    technologies: ["Next.js", "TypeScript", "TailwindCSS", "framer-motion"],
    githubUrl: "https://github.com/unikonkon/NextJS_PortfolioWeb_Modern_Programmer_GreekRoman",
    demoUrl: "https://portfolio-web-modern-programmer-gre.vercel.app/",
    colorScheme: "indigo",
    featured: true
  }

];

export const featuredProjects = projects.filter(p => p.featured);
export const allProjects = projects;
