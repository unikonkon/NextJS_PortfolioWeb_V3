export type ColorScheme = 'orange' | 'orangeLight' | 'blue' | 'yellow' | 'red' | 'green' | 'purple' | 'indigo';

export interface PersonalProject {
  title: string;
  role: string;
  description: string;
  image: string;
  slideImages?: string[]; // เพิ่ม slideImages สำหรับ modal
  technologies: string[];
  githubUrl?: string;
  githubUrlFrontend?: string;
  githubUrlBackend?: string;
  githubUrlNodePullData?: string;
  demoUrl?: string;
  featured?: boolean;
  colorScheme: ColorScheme;
}
// Personal projects data
export const personalProjects: PersonalProject[] = [
    {
      title: "💼 Job Matching AI",
      role: "Full Stack Developer",
      description: "AI-powered job matching application that helps job seekers find ideal roles by analyzing resumes and matching them with relevant job opportunities using RAG and vector search technology.",
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
      featured: true,
      technologies: ["Next.js 16", "TypeScript", "Google Gemini Pro 1.5", "RAG", "IndexedDB", "TailwindCSS", "Node.js", "ulixee", "huggingface/transformers"],
      githubUrl: "https://github.com/unikonkon/NextJS_Job_MatchingAI",
      githubUrlNodePullData: "https://github.com/unikonkon/nodeJS_JobThai_Scraper",
      demoUrl: "https://jobmatchingai.vercel.app/",
      colorScheme: "indigo" as const
    },
    {
      title: "📰 Crypto News Analysis",
      role: "Full Stack Developer",
      description: "AI-powered crypto news aggregator with sentiment analysis and trending score using Google Gemini API. Real-time updates with RSS feeds from major crypto news sources.",
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
      featured: true,
      colorScheme: "orange" as const
    },
    {
      title: "🎵 WebRecord Sound App",
      role: "Full Stack Developer",
      description: "Browser-based audio recording with IndexedDB storage, Firebase auth, and privacy-first approach.",
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
      featured: true,
      colorScheme: "blue" as const
    },
    {
      title: "📋 WEB Planning Generator",
      role: "Front-End Developer",
      description: "AI-powered website planning tool that generates project discovery documents and website flowcharts using Google Gemini API. Features 4-step wizard, export to PDF/Word, and Mermaid diagram generation.",
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
      colorScheme: "purple" as const
    },
    {
      title: "📰 Crypto Sentiment Analysis",
      role: "Full Stack Developer",
      description: "Analyze the sentiment of cryptocurrencies using AI Gemini API to make better investment decisions. updates with RSS feeds from major crypto news sources.",
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
        "/project/CryptoSentiment12.png",
      ],
      technologies: ["Next.js", "TypeScript", "Supabase", "Google Gemini API", "TailwindCSS", "NestJS", "Three.js"],
      githubUrlFrontend: "https://github.com/unikonkon/FrontEnd_useNestJS_CryptoSentimentAnalysis",
      githubUrlBackend: "https://github.com/unikonkon/BackEnd_NestJS_CryptoSentimentAnalysis",
      demoUrl: "https://crypto-sentiment-analysis-ten.vercel.app/",
      colorScheme: "orangeLight" as const
    },
    {
      title: "📈 CryptoTracker",
      role: "Front-End Developer",
      description: "Modern cryptocurrency tracking with categorized views, search functionality, and 7-day price charts.",
      image: "/project/project CryptoTracker.png",
      technologies: ["Next.js", "TypeScript", "TailwindCSS", "Recharts"],
      githubUrl: "https://github.com/unikonkon/NextJS_CryptoTracker",
      demoUrl: "https://crypto-tracker-drab-eta.vercel.app/",
      colorScheme: "yellow" as const
    },
    {
      title: "🌐 HTML Fetcher",
      role: "Front-End Developer",
      description: "Web application for fetching and processing HTML content from URLs. Built with Next.js and TypeScript for efficient web scraping and content extraction.",
      image: "/project/project HTMLFetcher1.png",
      slideImages: [
        "/project/project HTMLFetcher1.png",
        "/project/project HTMLFetcher2.png",
        "/project/project HTMLFetcher3.png",
      ],
      technologies: ["Next.js", "TypeScript", "TailwindCSS"],
      githubUrl: "https://github.com/unikonkon/NextJS_HTML_Fetcher",
      demoUrl: "https://html-fetcher-blush.vercel.app/",
      colorScheme: "blue" as const
    },
    {
      title: "🗣️ Text-to-Speech App",
      role: "Front-End Developer",
      description: "Web application for text-to-speech conversion with voice selection and multi-language support.",
      image: "/project/project texttospeech.png",
      technologies: ["Next.js", "TypeScript", "Web Speech API"],
      githubUrl: "https://github.com/unikonkon/NextJS_Text-to-Speech-App",
      demoUrl: "https://text-to-speech-app-kappa.vercel.app/",
      colorScheme: "green" as const
    },
    {
      title: "🇹🇭 PyThaiTTS App",
      role: "Full Stack Developer",
      description: "Full-stack Thai text-to-speech with FastAPI backend and PyThaiTTS integration.",
      image: "/project/project PyThaiTTS texttospeech.png",
      technologies: ["Next.js", "FastAPI", "Python", "PyThaiTTS"],
      githubUrl: "https://github.com/unikonkon/NextJS_Text-to-Speech-for-PyThaiTTS",
      colorScheme: "purple" as const
    },
    {
      title: "💼 Portfolio V1",
      role: "Front-End Developer",
      description: "Clean and minimalist portfolio website with responsive design principles.",
      image: "/project/project webport1.png",
      technologies: ["Next.js", "TypeScript", "TailwindCSS", "Three.js"],
      githubUrl: "https://github.com/unikonkon/NextJs_WebProtfolio",
      demoUrl: "https://faradaybanana.vercel.app/",
      colorScheme: "indigo" as const
    },
    {
      title: "💼 Portfolio V2",
      role: "Front-End Developer",
      description: "Clean and minimalist portfolio website with responsive design principles.",
      image: "/project/Portfolio V2.png",
      technologies: ["Next.js", "TypeScript", "TailwindCSS", "Three.js"],
      githubUrl: "https://github.com/unikonkon/NextJS_PortfolioWeb_V2",
      demoUrl: "https://bananafaradayport.vercel.app/",
      colorScheme: "indigo" as const
    },
    {
      title: "💼 Portfolio Modern Programmer",
      role: "Front-End Developer",
      description: "Clean and minimalist portfolio website with responsive design principles.",
      image: "/project/Portfolio Modern Programmer.png",
      technologies: ["Next.js", "TypeScript", "TailwindCSS", "gsap"],
      githubUrl: "https://github.com/unikonkon/NextJS_PortfolioWeb_Modern_Programmer_GSAP",
      demoUrl: "https://portfolio-web-modern-programmer-gsa.vercel.app/",
      colorScheme: "indigo" as const
    },
    {
      title: "💼 Portfolio Programmer Space",
      role: "Front-End Developer",
      description: "Clean and minimalist portfolio website with responsive design principles.",
      image: "/project/Portfolio Programmer Space.png",
      technologies: ["Next.js", "TypeScript", "TailwindCSS", "framer-motion"],
      githubUrl: "https://github.com/unikonkon/NextJS_PortfolioWeb_Modern_Programmer_Space",
      demoUrl: "https://portfolio-web-modern-programmer-spa.vercel.app/",
      colorScheme: "indigo" as const
    },
    {
      title: "💼 Portfolio Greek Roman",
      role: "Front-End Developer",
      description: "Clean and minimalist portfolio website with responsive design principles.",
      image: "/project/Portfolio Greek Roman.png",
      technologies: ["Next.js", "TypeScript", "TailwindCSS", "framer-motion"],
      githubUrl: "https://github.com/unikonkon/NextJS_PortfolioWeb_Modern_Programmer_GreekRoman",
      demoUrl: "https://portfolio-web-modern-programmer-gre.vercel.app/",
      colorScheme: "indigo" as const
    }
  ];


export interface WorkProject {
    title: string;
    role: string;
    description: string;
    technologies: string[];
    features: string[];
    icon: string;
    colorScheme: ColorScheme;
    demoUrl?: string;
}
  // Work projects data
export const workProjects: WorkProject[] = [
  {
    title: "ACT Project",
    role: "Full Stack Developer",
    description: "Full-stack development with data fetching from multiple sources, risk assessment logic, and Excel exports.",
    technologies: ["JavaScript", "TypeScript", "React", "Elasticsearch", "Express", "GitLab", "Jenkins", "Postman", "Ant Design"],
    features: [
      "Update the API for fetching data from the web",
      "Update the API for fetching data from the Kibana database",
      "Update the front-end view to reflect data from MA and the new database data sent",
      "Write Python logic for project risk assessment",
      "Redesign the flow for fetching data from 3 web pages: EGP, DBD, GOV",
      "Update the API for fetching data from the 3 web pages (EGP, DBD, GOV) based on the previous version",
      "Set up Jenkins processes to run commands for fetching project and company data",
      "Implement code paths for project and company data as required",
      "Create an Excel export for the required project and company data"
    ],
    icon: "📊",
    colorScheme: "yellow" as const
  },
  {
    title: "ACT Phase 2",
    role: "Full Stack Developer",
    description: "Enhanced project with advanced data fetching flows, database storage, and modern web interface.",
    technologies: ["JavaScript", "TypeScript", "Next.js", "Nodejs", "PostgreSQL", "Express", "GitLab", "Jenkins", "Postman", "Puppeteer", "Ant Design"],
    features: [
      "Design the flow for fetching project and company data from 3 web pages: EGP, DBD, and GOV",
      "Develop an API to fetch project data from the 3 web pages (EGP, DBD, GOV) and store it in the database",
      "Set up a Jenkins process to run commands for fetching project and company data",
      "Develop the web view for the front-end of Phase 2"
    ],
    icon: "🚀",
    colorScheme: "purple" as const,
    demoUrl: "https://actai.co/"
  },
  {
    title: "Iapp Speech Flow",
    role: "Full Stack Developer",
    description: "Mobile-to-web migration with Electron desktop app deployment for cross-platform compatibility.",
    technologies: ["JavaScript", "TypeScript", "Next.js", "PostgreSQL", "Express", "GitLab", "Jenkins", "Postman", "NextUI", "TailwindCSS", "Electron"],
    features: [
      "Plan the development of Iapp Speech Flow for Web and design the workflow",
      "Convert the mobile code into a web format using Next.js",
      "Design the code flow for Iapp Speech Flow on the Web",
      "Build the application as an Electron app for macOS and Windows"
    ],
    icon: "💬",
    colorScheme: "green" as const
  },
  {
    title: "NBTC - Drone Data Transmission",
    role: "Backend Developer",
    description: "Developed a Proxy API for transmitting drone data to mobile and web platforms, ensuring secure and compliant data transmission with NBTC regulations",
    technologies: ["JavaScript", "TypeScript", "PostgreSQL", "Express", "GitLab", "Jenkins", "Postman"],
    features: [
      "Developed an API for transmitting drone data to both mobile and web platforms, ensuring data is transmitted securely and in compliance with NBTC regulations",
      "Provided real-time logging and error handling to track ensure the integrity of data during transmission",
      "Presented the API functionality to the client, explaining how the API works and ensuring they understand how it complies with NBTC regulations"
    ],
    icon: "🚁",
    colorScheme: "blue" as const
  },
  {
    title: "IISI Hub of Talent",
    role: "Front-end Developer",
    description: "Talent recruitment platform with profile management system and role-based signup process. Features interactive profile browsing",
    technologies: ["JavaScript", "TypeScript", "React", "GitLab", "Jenkins", "Postman"],
    features: [
      "Connect the role data API from the signup process to display and edit the data in the view according to the design",
      "Connect the API flow for liking profiles and viewing the data in the system according to the design"
    ],
    icon: "👥",
    colorScheme: "orange" as const
  },
  {
    title: "Digital Touchpoint - Wellness Chatbot",
    role: "Full Stack Developer",
    description: "Wellness chatbot platform with comprehensive user management, authentication system, and package pricing dashboard. Built with Next.js and JWT authentication.",
    technologies: ["Next.js", "TypeScript", "JWT", "GitLab", "Jenkins", "Postman", "PostgreSQL"],
    features: [
      "Write an API from Next.js to retrieve, add, delete, and edit data for the signup process and add/remove package pricing information",
      "Write an authentication flow to protect users using JWT for login and viewing the user signup process",
      "Create a dashboard bot view to display package and user information"
    ],
    icon: "🤖",
    colorScheme: "indigo" as const
  }
];
