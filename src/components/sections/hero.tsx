import { cn } from "@/lib/utils";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { File, ArrowRight, MessageSquare } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { usePreloader } from "../preloader";
import { BlurIn, BoxReveal } from "../reveal-animations";
import ScrollDownIcon from "../scroll-down-icon";
import { SiGithub, SiLinkedin, SiInstagram } from "react-icons/si";
import { config } from "@/data/config";
import SectionWrapper from "../ui/section-wrapper";
import { motion } from "motion/react";

const roles = [
  "ML Engineer",
  "AI Enthusiast",
  "Data Scientist",
  "Software Developer",
  "Prompt Engineer",
  "Deep Learning Dev",
];

function TypewriterRoles() {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const handleType = () => {
      const fullText = roles[currentRoleIndex];
      if (!isDeleting) {
        setCurrentText(fullText.substring(0, currentText.length + 1));
        setTypingSpeed(100);

        if (currentText === fullText) {
          timer = setTimeout(() => setIsDeleting(true), 2000);
          return;
        }
      } else {
        setCurrentText(fullText.substring(0, currentText.length - 1));
        setTypingSpeed(50);

        if (currentText === "") {
          setIsDeleting(false);
          setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }

      timer = setTimeout(handleType, typingSpeed);
    };

    timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentRoleIndex, typingSpeed]);

  return (
    <span className="text-primary border-r-2 border-primary dark:border-primary/80 animate-pulse pr-1">
      {currentText}
    </span>
  );
}

const HeroSection = () => {
  const { isLoading } = usePreloader();

  return (
    <SectionWrapper id="hero" className={cn("relative w-full min-h-screen flex items-center")}>
      {/* Background center brain orb decoration */}
      <div className="absolute right-10 md:right-[20%] top-[30%] md:top-[40%] -translate-y-1/2 w-48 h-48 md:w-80 md:h-80 bg-gradient-to-tr from-primary/10 to-indigo-500/20 rounded-full blur-3xl pointer-events-none animate-pulse z-0 flex items-center justify-center">
        <span className="text-6xl md:text-8xl opacity-30 select-none animate-bounce">🧠</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 w-full grid md:grid-cols-12 gap-8 z-10 relative">
        <div
          className={cn(
            "col-span-12 md:col-span-8 lg:col-span-7",
            "flex flex-col justify-center items-start",
            "pt-16 pb-8 md:py-24"
          )}
        >
          {!isLoading && (
            <div className="flex flex-col w-full">
              <BlurIn delay={0.3}>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/80 border border-border/50 text-xs md:text-sm text-slate-500 dark:text-zinc-400 font-mono mb-4 pointer-events-auto">
                  <span className="flex h-2 w-2 rounded-full bg-green-500 animate-ping" />
                  Hello, World! — Welcome to my Portfolio
                </div>
              </BlurIn>

              <BlurIn delay={0.5}>
                <Tooltip delayDuration={300}>
                  <TooltipTrigger asChild>
                    <h1
                      className={cn(
                        "-ml-[4px] leading-none text-slate-800 dark:text-zinc-100 text-left font-bold text-[2.6rem] sm:text-7xl md:text-8xl tracking-tight cursor-default font-display"
                      )}
                    >
                      Raunak Raj
                    </h1>
                  </TooltipTrigger>
                  <TooltipContent
                    side="top"
                    className="dark:bg-white dark:text-black"
                  >
                    theres something waiting for you in devtools
                  </TooltipContent>
                </Tooltip>
              </BlurIn>

              <BlurIn delay={0.7}>
                <div className="mt-2 font-semibold text-base sm:text-xl md:text-2xl text-slate-500 dark:text-zinc-400 font-mono">
                  B.Tech CSE · <TypewriterRoles />
                </div>
              </BlurIn>

              {/* Stats Block */}
              <BlurIn delay={0.9}>
                <div className="flex flex-wrap gap-4 md:gap-8 my-4 py-3 border-y border-border/50 w-full pointer-events-auto">
                  <div className="flex flex-col">
                    <span className="text-2xl sm:text-3xl font-extrabold text-foreground font-display">7.5</span>
                    <span className="text-xs text-muted-foreground uppercase tracking-widest font-mono">CGPA</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-2xl sm:text-3xl font-extrabold text-foreground font-display">100+</span>
                    <span className="text-xs text-muted-foreground uppercase tracking-widest font-mono">LeetCode</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-2xl sm:text-3xl font-extrabold text-foreground font-display">5+</span>
                    <span className="text-xs text-muted-foreground uppercase tracking-widest font-mono">Projects</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-2xl sm:text-3xl font-extrabold text-foreground font-display">AI Focused</span>
                    <span className="text-xs text-muted-foreground uppercase tracking-widest font-mono">Specialization</span>
                  </div>
                </div>
              </BlurIn>

              <BlurIn delay={1.1}>
                <p className="text-sm sm:text-base md:text-lg text-slate-500 dark:text-zinc-400 leading-relaxed max-w-xl text-left pointer-events-auto">
                  I am currently pursuing a Bachelor of Technology in Computer Science and Engineering with a specialization in Data Science and Machine Learning (CGPA 7.5/10). With a strong interest in Artificial Intelligence and emerging technologies, I have developed diverse software solutions ranging from AI-driven data intelligence dashboards to real-time bidding platforms powered by machine learning. My experience also includes automation technologies, where I successfully built an automatic prompt generator.
                </p>
              </BlurIn>

              <div className="mt-5 flex flex-col sm:flex-row gap-3 w-full sm:w-fit pointer-events-auto">
                <BoxReveal delay={1.3} width="100%">
                  <Link href="#projects" className="w-full sm:w-auto">
                    <Button className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-6 text-base font-semibold">
                      View Projects
                      <ArrowRight size={18} />
                    </Button>
                  </Link>
                </BoxReveal>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <Tooltip delayDuration={300}>
                    <TooltipTrigger asChild>
                      <Link href="#contact" className="flex-1 sm:flex-none">
                        <Button
                          variant="outline"
                          className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-6 text-base"
                        >
                          <MessageSquare size={18} />
                          Get In Touch
                        </Button>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">
                      <p>let&apos;s build something together! 🤝</p>
                    </TooltipContent>
                  </Tooltip>

                  <div className="flex items-center gap-2 ml-2">
                    <Link
                      href={config.social.github}
                      target="_blank"
                      className="cursor-can-hover"
                      aria-label="GitHub"
                    >
                      <Button variant="outline" size="icon" className="w-12 h-12">
                        <SiGithub size={20} />
                      </Button>
                    </Link>
                    <Link
                      href={config.social.linkedin}
                      target="_blank"
                      className="cursor-can-hover"
                      aria-label="LinkedIn"
                    >
                      <Button variant="outline" size="icon" className="w-12 h-12">
                        <SiLinkedin size={20} />
                      </Button>
                    </Link>
                    <Link
                      href={config.social.instagram}
                      target="_blank"
                      className="cursor-can-hover"
                      aria-label="Instagram"
                    >
                      <Button variant="outline" size="icon" className="w-12 h-12">
                        <SiInstagram size={20} />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Floating Badges */}
              <BlurIn delay={1.5}>
                <div className="flex flex-wrap gap-2 mt-5 pointer-events-auto">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-500/10 text-blue-500 text-xs sm:text-sm font-mono font-medium border border-blue-500/20 shadow-sm animate-bounce [animation-delay:0.2s]">
                    ⚡ Machine Learning
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-500/10 text-purple-500 text-xs sm:text-sm font-mono font-medium border border-purple-500/20 shadow-sm animate-bounce [animation-delay:0.4s]">
                    🤖 AI Research
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-500 text-xs sm:text-sm font-mono font-medium border border-emerald-500/20 shadow-sm animate-bounce [animation-delay:0.6s]">
                    📊 Data Science
                  </span>
                </div>
              </BlurIn>
            </div>
          )}
        </div>
      </div>
      <div className="absolute bottom-10 left-[50%] translate-x-[-50%] z-20 pointer-events-auto">
        <ScrollDownIcon />
      </div>
    </SectionWrapper>
  );
};

export default HeroSection;
