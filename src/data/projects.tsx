import SlideShow from "@/components/slide-show";
import { Button } from "@/components/ui/button";
import { TypographyP } from "@/components/ui/typography";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

const BASE_PATH = "/assets/projects-screenshots";
const PLACEHOLDER_IMG = "/assets/logo-dark.svg";

const MaskIcon = ({ src, title }: { src: string; title?: string }) => (
  <span
    role="img"
    aria-label={title}
    className="block bg-current"
    style={{
      width: "1em",
      height: "1em",
      WebkitMaskImage: `url(${src})`,
      maskImage: `url(${src})`,
      WebkitMaskRepeat: "no-repeat",
      maskRepeat: "no-repeat",
      WebkitMaskPosition: "center",
      maskPosition: "center",
      WebkitMaskSize: "contain",
      maskSize: "contain",
    }}
  />
);

const ProjectsLinks = ({ live, github }: { live?: string; github?: string }) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-start gap-3 my-3 mb-8">
      {live && live !== "#" && (
        <Link
          className="font-mono underline flex gap-2"
          rel="noopener"
          target="_new"
          href={live}
        >
          <Button variant={"default"} size={"sm"}>
            Visit Website
            <ArrowUpRight className="ml-3 w-5 h-5" />
          </Button>
        </Link>
      )}
      {github && github !== "#" && (
        <Link
          className="font-mono underline flex gap-2"
          rel="noopener"
          target="_new"
          href={github}
        >
          <Button variant={"outline"} size={"sm"}>
            Source Code
            <ArrowUpRight className="ml-3 w-5 h-5" />
          </Button>
        </Link>
      )}
    </div>
  );
};

export type Skill = {
  title: string;
  bg: string;
  fg: string;
  icon: ReactNode;
};

const brand = (title: string, file: string, color = false): Skill => ({
  title,
  bg: "black",
  fg: "white",
  icon: color ? (
    <img src={`/assets/logos/${file}`} alt={title} className="w-4 h-4 object-contain" />
  ) : (
    <MaskIcon src={`/assets/logos/${file}`} title={title} />
  ),
});

const PROJECT_SKILLS = {
  python: brand("Python", "python.svg", true),
  pandas: brand("Pandas", "pandas.svg", true),
  numpy: brand("NumPy", "numpy.svg", true),
  tensorflow: brand("TensorFlow", "tensorflow.svg", true),
  pytorch: brand("PyTorch", "python.svg", true),
  scikitlearn: brand("Scikit-learn", "scikitlearn.svg", true),
  matplotlib: brand("Matplotlib", "matplotlib.svg", true),
  gemini: brand("Gemini AI", "vercel-mono.svg"),
  streamlit: brand("Streamlit", "python-mono.svg"),
  nlp: brand("NLP", "python-mono.svg"),
  ml: brand("ML", "python-mono.svg"),
  realtime: brand("Real-Time", "python-mono.svg"),
  dsp: brand("DSP", "python-mono.svg"),
  automation: brand("Automation", "python-mono.svg"),
  llm: brand("LLM", "python-mono.svg"),
  promptEng: brand("Prompt Eng.", "python-mono.svg"),
  deepLearning: brand("Deep Learning", "python-mono.svg"),
  langchain: brand("LangChain", "python-mono.svg"),
  pinecone: brand("Pinecone", "python-mono.svg"),
  rag: brand("RAG", "python-mono.svg"),
  opencv: brand("OpenCV", "python-mono.svg"),
  cnn: brand("CNNs", "python-mono.svg"),
  flask: brand("Flask", "python-mono.svg"),
  fastapi: brand("FastAPI", "python-mono.svg"),
};

export type Project = {
  id: string;
  category: string;
  title: string;
  src: string;
  screenshots: string[];
  skills: { frontend: Skill[]; backend: Skill[] };
  content: React.ReactNode | any;
  github?: string;
  live: string;
};

const projects: Project[] = [
  {
    id: "placement-dashboard",
    category: "AI & Streamlit",
    title: "AI Placement Analysis Dashboard",
    src: `${BASE_PATH}/AI Placement Dashboard.jpg`,
    screenshots: ["AI Placement Dashboard.jpg"],
    live: "#",
    github: "https://github.com/RaunakRaj567/AI-Powered-Placement-Analysis-Dashboard-Data-Agent",
    skills: {
      frontend: [PROJECT_SKILLS.streamlit, PROJECT_SKILLS.pandas, PROJECT_SKILLS.matplotlib],
      backend: [PROJECT_SKILLS.python, PROJECT_SKILLS.gemini, PROJECT_SKILLS.numpy],
    },
    get content() {
      return (
        <div>
          <TypographyP className="font-mono mb-4">
            An interactive, AI-driven data intelligence dashboard designed for academic placement coordinators. It cleans, processes, and visualizes student performance datasets, implements a custom placement eligibility heuristic engine, and integrates Gemini 3.5 Flash to deliver instant natural-language analysis on skill trends and cohort metrics.
          </TypographyP>
          <ProjectsLinks live={this.live} github={this.github} />
          <SlideShow images={[`${BASE_PATH}/AI Placement Dashboard.jpg`]} />
        </div>
      );
    },
  },
  {
    id: "rag-chatbot",
    category: "Generative AI & RAG",
    title: "RAG Document Q&A Chatbot",
    src: `${BASE_PATH}/Rag Pipeline.jpg`,
    screenshots: ["Rag Pipeline.jpg"],
    live: "#",
    github: "https://github.com/RaunakRaj567",
    skills: {
      frontend: [PROJECT_SKILLS.langchain, PROJECT_SKILLS.pinecone, PROJECT_SKILLS.rag],
      backend: [PROJECT_SKILLS.python, PROJECT_SKILLS.llm, PROJECT_SKILLS.numpy],
    },
    get content() {
      return (
        <div>
          <TypographyP className="font-mono mb-4">
            An enterprise-grade Retrieval-Augmented Generation (RAG) chatbot that ingests multi-page PDF documents, generates vector embeddings, stores them in Pinecone vector DB, and retrieves contextually relevant chunks to answer complex queries with accurate source attribution. Built with LangChain and LlamaIndex for the full RAG pipeline.
          </TypographyP>
          <ProjectsLinks live={this.live} github={this.github} />
          <SlideShow images={[`${BASE_PATH}/Rag Pipeline.jpg`]} />
        </div>
      );
    },
  },
  {
    id: "agri-mitra",
    category: "Computer Vision & AI",
    title: "Agri-Mitra AI",
    src: `${BASE_PATH}/Agri Mitra.jpg`,
    screenshots: ["Agri Mitra.jpg"],
    live: "#",
    github: "https://github.com/RaunakRaj567",
    skills: {
      frontend: [PROJECT_SKILLS.pytorch, PROJECT_SKILLS.cnn, PROJECT_SKILLS.opencv],
      backend: [PROJECT_SKILLS.python, PROJECT_SKILLS.deepLearning, PROJECT_SKILLS.fastapi],
    },
    get content() {
      return (
        <div>
          <TypographyP className="font-mono mb-4">
            A smart agricultural advisory platform powered by deep learning that offers AI-driven crop disease diagnosis, yield prediction, and localized weather insights for farmers. Utilizes Convolutional Neural Networks (CNNs) for real-time leaf disease classification and integrates weather APIs with soil data pipelines for automated crop management recommendations.
          </TypographyP>
          <ProjectsLinks live={this.live} github={this.github} />
          <SlideShow images={[`${BASE_PATH}/Agri Mitra.jpg`]} />
        </div>
      );
    },
  },
  {
    id: "adaptive-learning",
    category: "NLP & EdTech",
    title: "Adaptive Learning Platform",
    src: `${BASE_PATH}/Smart study app.jpg`,
    screenshots: ["Smart study app.jpg"],
    live: "#",
    github: "https://github.com/Naiitikk/Ai-SmartEducation-System",
    skills: {
      frontend: [PROJECT_SKILLS.nlp, PROJECT_SKILLS.pandas],
      backend: [PROJECT_SKILLS.python, PROJECT_SKILLS.llm, PROJECT_SKILLS.numpy],
    },
    get content() {
      return (
        <div>
          <TypographyP className="font-mono mb-4">
            An AI-powered educational application that personalizes content delivery based on individual learner performance. Uses NLP to assess comprehension levels and dynamically adjusts quizzes, resources, and difficulty to optimize learning outcomes.
          </TypographyP>
          <ProjectsLinks live={this.live} github={this.github} />
          <SlideShow images={[`${BASE_PATH}/Smart study app.jpg`]} />
        </div>
      );
    },
  },
  {
    id: "rtb-bidding",
    category: "Machine Learning",
    title: "ML-Powered RTB Bidding Platform",
    src: `${BASE_PATH}/ML powered RTB.jpg`,
    screenshots: ["ML powered RTB.jpg"],
    live: "#",
    github: "https://github.com/RaunakRaj567/Real-Time-Bidding-DSP-Optimization-System",
    skills: {
      frontend: [PROJECT_SKILLS.pandas, PROJECT_SKILLS.numpy, PROJECT_SKILLS.matplotlib],
      backend: [PROJECT_SKILLS.python, PROJECT_SKILLS.scikitlearn],
    },
    get content() {
      return (
        <div>
          <TypographyP className="font-mono mb-4">
            A Real-Time Bidding Demand-Side Platform (DSP) that uses machine learning to predict Click-Through Rates (CTR) and dynamically compute optimal bids. Trained on historical ad impression data with feature engineering and model evaluation pipelines.
          </TypographyP>
          <ProjectsLinks live={this.live} github={this.github} />
          <SlideShow images={[`${BASE_PATH}/ML powered RTB.jpg`]} />
        </div>
      );
    },
  },
  {
    id: "prompt-generator",
    category: "LLM Automation",
    title: "Automatic Prompt Generator",
    src: `${BASE_PATH}/Automatic prompt generator.jpg`,
    screenshots: ["Automatic prompt generator.jpg"],
    live: "#",
    github: "https://github.com/RaunakRaj567/AI-Prompt-Generation-Automated-",
    skills: {
      frontend: [PROJECT_SKILLS.automation],
      backend: [PROJECT_SKILLS.python, PROJECT_SKILLS.llm, PROJECT_SKILLS.promptEng],
    },
    get content() {
      return (
        <div>
          <TypographyP className="font-mono mb-4">
            An automation tool that intelligently generates optimized prompts for Large Language Models based on task context and goals. Significantly reduces manual prompt engineering effort and improves LLM output quality through structured templating.
          </TypographyP>
          <ProjectsLinks live={this.live} github={this.github} />
          <SlideShow images={[`${BASE_PATH}/Automatic prompt generator.jpg`]} />
        </div>
      );
    },
  },
];

export default projects;
