import { Project, ExperienceItem, SkillCategory, PhotoItem, EducationItem, OutsideWorkItem } from '../types';

export const PERSONAL_INFO = {
  name: "Randall Lee",
  title: "MLOps & Data Engineer",
  profileImage: "/images/profile-photo.jpeg",
  bio: [
    "Hello! 👋 I’m an MLOps Engineer at ICBC (Insurance Corporation of British Columbia), where I bring machine learning and AI solutions to life. My work spans data pipelines, model and AI development, and the tools that help bring AI systems into production reliably. I enjoy working across the data and ML lifecycle to turn promising ideas into practical solutions.",
    "Outside of work, I’m happiest outdoors. I enjoy camping, training for long-distance runs, and exploring new routes on my road bike.",
  ],
  location: "Vancouver, BC, Canada",
  email: "randallxlee@gmail.com",
  github: "https://github.com/randallxlee",
  linkedin: "https://www.linkedin.com/in/randallleeth/",
  status: "Open to MLOps, Data Science & Engineering roles",
};

export const PROJECTS: Project[] = [
  {
    id: "aws-genai-pipeline",
    title: "AWS GenAI Model Deployment & Pipeline",
    description: "End-to-end generative AI workflow integrating foundation models on AWS with automated evaluation, secure inference endpoints, and data ingestion.",
    category: "AI / Systems",
    tags: ["AWS", "Python", "MLOps", "Docker", "Foundation Models"],
    githubUrl: "https://github.com",
    liveUrl: "#",
    highlights: [
      "Built resilient data ingestion pipelines preparing unstructured data for GenAI applications",
      "Automated CI/CD integration testing and model monitoring on AWS infrastructure",
    ],
    imageGradient: "from-blue-600 via-indigo-600 to-purple-700",
  },
  {
    id: "fabric-etl-analytics",
    title: "Enterprise ETL & Real-time KPI Platform",
    description: "Unified analytics pipeline integrating 5+ disparate operational data sources using Python, SQL, and Microsoft Fabric with predictive models.",
    category: "Full Stack",
    tags: ["Python", "SQL", "Microsoft Fabric", "Power BI", "ETL"],
    githubUrl: "https://github.com",
    liveUrl: "#",
    highlights: [
      "Reduced manual departmental reporting effort by 40% through automated reporting",
      "Developed predictive models and real-time operational monitoring dashboards",
    ],
    imageGradient: "from-emerald-500 via-teal-600 to-cyan-700",
  },
  {
    id: "pricing-engine-pipelines",
    title: "High-Throughput Insurance Pricing Engine",
    description: "High-performance data pipelines processing millions of policy and claims records to power core actuarial and pricing models.",
    category: "AI / Systems",
    tags: ["Python", "PySpark", "CI/CD", "Docker", "API Validation"],
    githubUrl: "https://github.com",
    liveUrl: "#",
    highlights: [
      "Boosted data processing performance and pricing model accuracy by 25%",
      "Engineered automated API validation and CI/CD pipelines, cutting production defects by 30%",
    ],
    imageGradient: "from-amber-500 via-orange-600 to-red-600",
  },
  {
    id: "databricks-transformation",
    title: "Databricks Lakehouse Analytics",
    description: "End-to-end data transformation and lakehouse pipeline contributing across the full data science lifecycle from raw ingestion to BI dashboards.",
    category: "Full Stack",
    tags: ["Databricks", "Python", "PySpark", "Power BI", "Data Profiling"],
    githubUrl: "https://github.com",
    liveUrl: "#",
    highlights: [
      "Delivered scalable transformation architectures across public and private sector clients",
      "Translated complex operational bottlenecks into actionable data workflows",
    ],
    imageGradient: "from-violet-600 via-pink-600 to-rose-600",
  },
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    period: "Jul 2026 — Present",
    role: "MLOps Engineer",
    company: "Insurance Corporation of British Columbia (ICBC)",
    location: "Vancouver, Canada",
    description: [
      "Build and maintain machine learning workflows on AWS, supporting model development, deployment, monitoring, and lifecycle management.",
      "Develop generative AI solutions on AWS, integrating foundation models into secure, scalable applications and workflows.",
      "Build data ingestion pipelines to prepare and integrate data for ML and generative AI solutions.",
    ],
    skills: ["AWS", "SageMaker", "Bedrock", "MLOps", "Generative AI", "Python", "Data Pipelines", "Model Monitoring"],
  },
  {
    period: "Oct 2024 — Sept 2025",
    role: "Data Analyst",
    company: "City of Vancouver",
    location: "Vancouver, Canada",
    description: [
      "Designed and deployed end-to-end ETL pipelines and analytical solutions using Python, SQL, and Microsoft Fabric, ingesting and integrating 5+ disparate operational data sources to enable automated reporting, real-time KPI monitoring, and improved data accessibility, reducing manual reporting effort by 40%.",
      "Developed predictive models and interactive dashboards to support performance analysis and operational monitoring, enabling stakeholders to identify trends, optimize workflows, and make data-driven strategic decisions across the department.",
    ],
    skills: ["Python", "SQL", "Microsoft Fabric", "Predictive Modeling", "Power BI", "ETL"],
  },
  {
    period: "Nov 2021 — Mar 2024",
    role: "Data & Analytics Consultant",
    company: "PricewaterhouseCoopers (PwC)",
    location: "Auckland, New Zealand",
    description: [
      "Delivered end-to-end data transformation, data integration and analytics solutions using Databricks, Python, and Power BI for public and private sector clients, contributing across the data science lifecycle including data ingestion, transformation, exploratory analysis, visualization, and stakeholder reporting.",
      "Collaborated with clients and cross-functional teams to gather data requirements, perform data discovery and profiling, and translate business problems into technical data workflows, delivering actionable insights on operational performance and process efficiency.",
    ],
    skills: ["Databricks", "Python", "Power BI", "Data Profiling", "Stakeholder Reporting"],
  },
  {
    period: "Aug 2022 — Mar 2024",
    role: "Data Engineer (Secondment)",
    company: "Insurance Australia Group (IAG)",
    location: "Auckland, New Zealand",
    description: [
      "Contributed to a large-scale pricing engine implementation by developing Python-based data processing pipelines to ingest, clean, and transform millions of insurance policy and claims records, improving pricing model accuracy and processing performance by 25%.",
      "Built and maintained CI/CD automation workflows, integration test pipelines, and API validation processes, enhancing deployment reliability, reducing production defects by 30%, and supporting the deployment of pricing models to production.",
    ],
    skills: ["Python", "CI/CD", "Docker", "API Validation", "Data Pipelines", "PySpark"],
  },
  {
    period: "Mar 2021 — Nov 2021",
    role: "Systems Engineer",
    company: "Lancom Technology",
    location: "Auckland, New Zealand",
    description: [
      "Provided Tier 1 and Tier 2 technical support for clients across diverse industries, ensuring 99%+ network uptime and stable infrastructure performance across on-premises and cloud environments (AWS, Azure) through proactive monitoring, system optimization, and disaster recovery management.",
    ],
    skills: ["AWS", "Azure", "Cloud Infrastructure", "System Optimization", "Disaster Recovery"],
  },
];

export const EDUCATION: EducationItem[] = [
  {
    degree: "Master of Data Science",
    institution: "University of British Columbia",
    location: "Vancouver, Canada",
    period: "2026",
  },
  {
    degree: "Bachelor of Science, Major in Computer Science",
    institution: "University of Auckland",
    location: "Auckland, New Zealand",
    period: "2020",
  },
  {
    degree: "Bachelor of Commerce, Major in Accounting & Finance",
    institution: "University of Auckland",
    location: "Auckland, New Zealand",
    period: "2020",
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: "Data Science & ML Libraries",
    skills: ["Python", "Pandas", "PySpark", "NumPy", "Scikit-learn"],
  },
  {
    category: "Cloud, MLOps & Platforms",
    skills: ["AWS (SageMaker/ Bedrock)", "Azure", "Databricks", "Docker", "Airflow", "CI/CD"],
  },
  {
    category: "Statistics & Modeling",
    skills: ["A/B Testing", "Causal Inference", "Statistical Modelling", "Predictive Modeling"],
  },
  {
    category: "AI Tools & Frameworks",
    skills: ["Hugging Face", "LangChain", "RAG", "LLM Evaluation", "Prompt Engineering"],
  },
];

export const VOLUNTEER_WORK = [
  {
    role: "Volunteer",
    organization: "Data for Good",
    location: "Vancouver, Canada",
    description: "Applying data science and analytics to support community-driven social and non-profit initiatives.",
  },
];

export const OUTSIDE_OF_WORK: OutsideWorkItem[] = [
  {
    title: "Travelling",
    description: "I've travelled to 5 continents and more than 20 countries, and I'm always looking for the next place to explore, whether that's a new city, a remote landscape, or a different way of life.",
    image: '/images/travel.jpeg',
  },
  {
    title: "Endurance Sports",
    description: "I love participating in marathons and road cycling. Early morning miles and long climbs on two wheels are where I clear my head and chase new personal bests.",
    image: '/images/endurance.jpeg',
  },
  {
    title: "Exploring the Outdoors",
    description: "Skiing in the winter and camping and hiking in the summer. Whatever the season, I'm happiest in the mountains, disconnected and breathing fresh air.",
    image: '/images/outdoors.jpeg',
  },
];

export const PHILOSOPHIES = OUTSIDE_OF_WORK;

export const WALLPAPERS = [
  {
    id: "sonoma-graphic",
    name: "Sonoma Horizon",
    thumbnail: "from-blue-600 via-indigo-600 to-purple-900",
    style: "radial-gradient(ellipse at top left, #3b82f6 0%, #1e1b4b 60%, #030712 100%)",
  },
  {
    id: "sequoia-dusk",
    name: "Sequoia Dusk",
    thumbnail: "from-rose-500 via-purple-700 to-slate-950",
    style: "radial-gradient(ellipse at top, #f43f5e 0%, #7e22ce 40%, #0f172a 90%)",
  },
  {
    id: "monterey-abstract",
    name: "Monterey Waves",
    thumbnail: "from-violet-600 via-blue-700 to-slate-900",
    style: "radial-gradient(circle at 80% 20%, #8b5cf6 0%, #1d4ed8 45%, #020617 90%)",
  },
  {
    id: "minimal-dark",
    name: "Space Black",
    thumbnail: "from-zinc-800 to-black",
    style: "radial-gradient(circle at 50% 50%, #18181b 0%, #09090b 60%, #000000 100%)",
  },
  {
    id: "emerald-glow",
    name: "Northern Lights",
    thumbnail: "from-emerald-600 via-teal-800 to-slate-950",
    style: "radial-gradient(ellipse at 30% 20%, #10b981 0%, #0f766e 40%, #022c22 80%, #020617 100%)",
  },
];

export const PHOTO_ALBUMS = [
  "All Photos",
  "Outdoors & Camping",
  "Running & Cycling",
  "Travel",
  "Photography",
] as const;

export const PHOTOS: PhotoItem[] = [
  {
    id: "photo-1",
    url: "/images/army.jpeg",
    title: "Serving in the Singapore Army",
    caption: "Spending 2 years in the Singapore Army was a formative experience that taught me discipline, resilience, and the importance of teamwork.",
    location: "Singapore",
    date: "January 2012",
    favorite: true,
  },
  {
    id: "photo-2",
    url: "/images/marathon.jpeg",
    title: "2026 BMO Marathon",
    caption: "My first full marathon! A challenging but rewarding experience that pushed me to my limits and taught me the value of perseverance and mental toughness.",
    album: "Running & Cycling",
    location: "Vancouver, BC",
    date: "May 2026",
    favorite: true,
  },
  {
    id: "photo-3",
    url: "/images/fondo.jpeg",
    title: "2026 Whistler Fondo",
    caption: "120km of climbing and descending through the beautiful mountains of Whistler, BC. A test of endurance, strategy, and mental fortitude.",
    album: "Running & Cycling",
    location: "Whistler, BC",
    date: "September 2026",
    favorite: true,
  },
  {
    id: "photo-4",
    url: "/images/triple-crown.jpeg",
    title: "Triple Crown",
    caption: "The Triple Crown, over 2500m of elevation gain climbing Vancouver's North Shore mountains. Something that seemed so hard a year ago, finally accomplished.",
    album: "Running & Cycling",
    location: "North Vancouver, BC",
    date: "August 2026",
    favorite: false,
  },
  {
    id: "photo-5",
    url: "/images/mt-cook.jpeg",
    title: "Mt Cook, New Zealand",
    caption: "One of the most beautiful places I've ever been. The mountains, the glaciers, and the lakes are breathtaking, and the sense of scale is humbling.",
    album: "Travel",
    location: "Mt Cook, New Zealand",
    date: "July 2022",
    favorite: false,
  },
  {
    id: "photo-6",
    url: "/images/joffre-lakes.jpeg",
    title: "Joffre Lakes",
    caption: "Snowshoeing through the winter wonderland of Joffre Lakes Provincial Park. The frozen lakes and snow-covered trees made for a magical experience.",
    album: "Outdoors & Camping",
    location: "Whistler, BC",
    date: "February 2026",
    favorite: true,
  },
  {
    id: "photo-7",
    url: "/images/panaroma-ridge.jpeg",
    title: "Panorama Ridge",
    caption: "A breathtaking view from the top of Panorama Ridge, looking out over the vast landscape below.",
    album: "Outdoors & Camping",
    location: "Whistler, BC",
    date: "September 2024",
    favorite: true,
  },
  {
    id: "photo-8",
    url: "/images/skiing.jpeg",
    title: "Day in the Mountains",
    caption: "Nothing quite like having a ski mountains 30 minutes away from home.",
    album: "Outdoors & Camping",
    location: "Cypress Mountain, BC",
    date: "March 2026",
    favorite: false,
  }
];

