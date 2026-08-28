// thoda zada ts ho gya idhar
export enum SkillNames {
  JS = "js",
  TS = "ts",
  HTML = "html",
  CSS = "css",
  REACT = "react",
  VUE = "vue",
  NEXTJS = "nextjs",
  TAILWIND = "tailwind",
  NODEJS = "nodejs",
  EXPRESS = "express",
  POSTGRES = "postgres",
  MONGODB = "mongodb",
  GIT = "git",
  GITHUB = "github",
  PRETTIER = "prettier",
  NPM = "npm",
  FIREBASE = "firebase",
  WORDPRESS = "wordpress",
  // Languages
  PYTHON_LANG = "python_lang",
  JAVA = "java",
  C_LANG = "c_lang",
  JAVASCRIPT = "javascript",
  HTML_CSS = "html_css",
  SQL = "sql",
  // Developer Tools
  VSCODE = "vscode",
  COLAB = "colab",
}
export type Skill = {
  id: number;
  name: string;
  label: string;
  shortDescription: string;
  color: string;
  icon: string;
};
export const SKILLS: Record<SkillNames, Skill> = {
  [SkillNames.JS]: {
    id: 1,
    name: "js",
    label: "Python",
    shortDescription: "The core programming language for AI, data science, and automation. 🐍⚡",
    color: "#3776ab",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  },
  [SkillNames.TS]: {
    id: 2,
    name: "ts",
    label: "FastAPI",
    shortDescription: "Modern, high-performance web framework for building APIs with Python. ⚡🚀",
    color: "#009688",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg",
  },
  [SkillNames.HTML]: {
    id: 3,
    name: "html",
    label: "Flask",
    shortDescription: "Lightweight Python web framework for microservices and backend serving. 🌶️🔥",
    color: "#000000",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg",
  },
  [SkillNames.CSS]: {
    id: 4,
    name: "css",
    label: "Django",
    shortDescription: "High-level Python web framework for rapid, secure, and clean development. 🖼️🏛️",
    color: "#092e20",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg",
  },
  [SkillNames.REACT]: {
    id: 5,
    name: "react",
    label: "PyTorch",
    shortDescription: "Open-source machine learning library for deep learning and neural network training. 🔥🧠",
    color: "#ee4c2c",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg",
  },
  [SkillNames.VUE]: {
    id: 6,
    name: "vue",
    label: "TensorFlow",
    shortDescription: "End-to-end platform and library for building and deploying machine learning models. 🧬🦾",
    color: "#ff6f00",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg",
  },
  [SkillNames.NEXTJS]: {
    id: 7,
    name: "nextjs",
    label: "Scikit-learn",
    shortDescription: "Simple and efficient library for predictive data analysis and classic ML. 📐📊",
    color: "#f7931e",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scikitlearn/scikitlearn-original.svg",
  },
  [SkillNames.TAILWIND]: {
    id: 8,
    name: "tailwind",
    label: "Pandas",
    shortDescription: "Powerful data structure library for high-performance data manipulation and analysis. 🐼📈",
    color: "#150458",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg",
  },
  [SkillNames.NODEJS]: {
    id: 9,
    name: "nodejs",
    label: "NumPy",
    shortDescription: "Fundamental package for scientific computing and array operations in Python. 🔢🧬",
    color: "#013243",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg",
  },
  [SkillNames.EXPRESS]: {
    id: 10,
    name: "express",
    label: "Matplotlib",
    shortDescription: "Comprehensive plotting library for creating static, animated, and interactive visualizations. 📊📈",
    color: "#11557c",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/matplotlib/matplotlib-original.svg",
  },
  [SkillNames.POSTGRES]: {
    id: 11,
    name: "postgres",
    label: "Seaborn",
    shortDescription: "High-level statistical data visualization library built on top of Matplotlib. 🎨📊",
    color: "#4c72b0",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  },
  [SkillNames.MONGODB]: {
    id: 12,
    name: "mongodb",
    label: "MongoDB",
    shortDescription: "Flexible document-based database for modern, scalable backend applications. 🗃️🍃",
    color: "#47a248",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  },
  [SkillNames.GIT]: {
    id: 13,
    name: "git",
    label: "Git & GitHub",
    shortDescription: "Version control system and collaboration platform for secure code deployment. 🐙🔄",
    color: "#f05032",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  },
  [SkillNames.GITHUB]: {
    id: 14,
    name: "github",
    label: "Jupyter",
    shortDescription: "Web-based interactive environment for notebooks, data science, and scripting. 📓✨",
    color: "#f37626",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg",
  },
  [SkillNames.PRETTIER]: {
    id: 15,
    name: "prettier",
    label: "Streamlit",
    shortDescription: "Open-source Python library to build and share custom web apps for ML and AI. 🎈✨",
    color: "#ff4b4b",
    icon: "https://streamlit.io/images/brand/streamlit-mark-color.svg",
  },
  [SkillNames.NPM]: {
    id: 16,
    name: "npm",
    label: "Hugging Face",
    shortDescription: "The hub for open-source AI models, datasets, and machine learning architectures. 🤗🔬",
    color: "#ffd21e",
    icon: "https://huggingface.co/front/assets/huggingface_logo-noborder.svg",
  },
  [SkillNames.FIREBASE]: {
    id: 17,
    name: "firebase",
    label: "Gemini AI",
    shortDescription: "Google's state-of-the-art multimodal AI model suite and developer platform. ✨🤖",
    color: "#4285f4",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg",
  },
  [SkillNames.WORDPRESS]: {
    id: 18,
    name: "wordpress",
    label: "Docker",
    shortDescription: "Containerization platform to package, distribute, and run applications consistently. 🐳📦",
    color: "#2496ed",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  },
  // ── Languages ──────────────────────────────────────────────────────────────
  [SkillNames.PYTHON_LANG]: {
    id: 19,
    name: "python_lang",
    label: "Keras",
    shortDescription: "High-level neural network API built on top of TensorFlow for rapid prototyping. 🔬",
    color: "#d00000",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/keras/keras-original.svg",
  },
  [SkillNames.JAVA]: {
    id: 20,
    name: "java",
    label: "Java",
    shortDescription: "Strongly typed, object-oriented language for backend and enterprise apps. ☕",
    color: "#ed8b00",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
  },
  [SkillNames.C_LANG]: {
    id: 21,
    name: "c_lang",
    label: "C",
    shortDescription: "Low-level, high-performance systems programming language. ⚙️",
    color: "#a8b9cc",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg",
  },
  [SkillNames.JAVASCRIPT]: {
    id: 22,
    name: "javascript",
    label: "JavaScript",
    shortDescription: "The language of the web — dynamic, event-driven, and everywhere. 🌐",
    color: "#f7df1e",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  },
  [SkillNames.HTML_CSS]: {
    id: 23,
    name: "html_css",
    label: "HTML / CSS",
    shortDescription: "Markup and styling fundamentals for building and designing web interfaces. 🎨",
    color: "#e34f26",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  },
  [SkillNames.SQL]: {
    id: 24,
    name: "sql",
    label: "SQL",
    shortDescription: "Structured query language for managing and querying relational databases. 🗄️",
    color: "#336791",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  },
  // ── Developer Tools ────────────────────────────────────────────────────────
  [SkillNames.VSCODE]: {
    id: 25,
    name: "vscode",
    label: "VS Code",
    shortDescription: "Lightweight yet powerful source-code editor by Microsoft. 🖥️",
    color: "#007acc",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
  },
  [SkillNames.COLAB]: {
    id: 26,
    name: "colab",
    label: "Google Colab",
    shortDescription: "Cloud-hosted Jupyter notebooks with free GPU/TPU access for ML experiments. 🔬",
    color: "#f9ab00",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg",
  },
};

export type Achievement = {
  id: number;
  emoji: string;
  badge?: string;
  title: string;
  description: string;
};

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 1,
    emoji: "🏆",
    badge: "Smart India Hackathon",
    title: "SIH 2nd Runner Up",
    description: "Secured the 2nd runner-up position at the university level for Smart India Hackathon, designing innovative tech-driven solutions.",
  },
  {
    id: 2,
    emoji: "🚀",
    badge: "Hackathon Finalist",
    title: "5x Inter-University Finalist",
    description: "Reached the finals across 5 prestigious national & collegiate hackathons, delivering high-impact prototypes under pressure.",
  },
  {
    id: 3,
    emoji: "🔌",
    title: "Hardware Systems & IoT",
    description: "Gained practical, hands-on experience in building, troubleshooting, and prototyping hardware projects and microcontroller systems.",
  },
  {
    id: 4,
    emoji: "🤝",
    title: "Leadership & Communication",
    description: "Proven track record of coordinating technical teams, speaking at events, and driving collaborative project deliveries.",
  },
];

export const themeDisclaimers = {
  light: [
    "Warning: Light mode emits a gazillion lumens of pure radiance!",
    "Caution: Light mode ahead! Please don't try this at home.",
    "Only trained professionals can handle this much brightness. Proceed with sunglasses!",
    "Brace yourself! Light mode is about to make everything shine brighter than your future.",
    "Flipping the switch to light mode... Are you sure your eyes are ready for this?",
  ],
  dark: [
    "Light mode? I thought you went insane... but welcome back to the dark side!",
    "Switching to dark mode... How was life on the bright side?",
    "Dark mode activated! Thanks you from the bottom of my heart, and my eyes too.",
    "Welcome back to the shadows. How was life out there in the light?",
    "Dark mode on! Finally, someone who understands true sophistication.",
  ],
};

