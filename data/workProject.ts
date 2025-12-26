export type ColorScheme = 'orange' | 'orangeLight' | 'blue' | 'yellow' | 'red' | 'green' | 'purple' | 'indigo' | 'cyan' | 'pink';

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
