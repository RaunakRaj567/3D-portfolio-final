"use client";

import type { CSSProperties } from "react";
import SectionWrapper from "../ui/section-wrapper";
import { SectionHeader } from "./section-header";
import { SKILLS } from "@/data/constants";
import { usePerfProfile } from "@/hooks/use-perf-profile";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const coreProficiencies = [
  { name: "🤖 Machine Learning & AI", value: 90 },
  { name: "🐍 Python Development", value: 88 },
  { name: "📊 Data Science & Analytics", value: 85 },
  { name: "🧠 Deep Learning (PyTorch / TF)", value: 80 },
  { name: "🌐 Web Dev (FastAPI / Flask)", value: 72 },
  { name: "☕ Java & Systems (C)", value: 70 },
];

const domains = [
  {
    title: "🔤 Languages",
    details: "Python · Java · C · JavaScript · HTML/CSS · SQL",
  },
  {
    title: "🛠️ Developer Tools",
    details: "VS Code · Git · GitHub · Jupyter Notebooks · Google Colab",
  },
  {
    title: "⚙️ Technologies & Frameworks",
    details: "PyTorch · TensorFlow · Scikit-learn · Streamlit · FastAPI · Flask",
  },
];

const CoreProficienciesAndDomains = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 w-full max-w-5xl mx-auto px-4 md:px-8 mt-6 md:mt-12 pointer-events-auto">
      {/* Core Proficiencies Card */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <Card className="bg-white/80 dark:bg-black/50 backdrop-blur-md border-border/60">
          <CardHeader>
            <CardTitle className="text-xl font-bold tracking-tight text-foreground font-display">Core Proficiencies</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            {coreProficiencies.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-sm font-medium">
                  <span className="text-foreground/90">{item.name}</span>
                  <span className="text-primary font-mono">{item.value}%</span>
                </div>
                <div className="h-2 w-full bg-secondary/50 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-primary"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${item.value}%` }}
                    transition={{ duration: 1, delay: index * 0.1, ease: "easeOut" }}
                    viewport={{ once: true }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </motion.div>

      {/* Domains Card */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <Card className="bg-white/80 dark:bg-black/50 backdrop-blur-md border-border/60 h-full">
          <CardHeader>
            <CardTitle className="text-xl font-bold tracking-tight text-foreground font-display">Domains of Expertise</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {domains.map((domain, index) => (
              <div
                key={index}
                className="p-4 rounded-xl border border-border/50 bg-secondary/20 hover:bg-secondary/30 transition-colors"
              >
                <h4 className="font-semibold text-sm text-foreground mb-1 font-mono">
                  {domain.title}
                </h4>
                <p className="text-xs text-muted-foreground">
                  {domain.details}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

const TechStackGrid = () => {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 md:px-8 mt-6 md:mt-12 pointer-events-auto">
      <h3 className="text-lg font-bold text-foreground mb-6 font-display text-center md:text-left">Tech Stack & Tools</h3>
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5">
        {Object.values(SKILLS).map((skill) => (
          <li
            key={skill.name}
            style={{ "--skill": skill.color } as CSSProperties}
            className={cn(
              "group relative flex flex-col items-center justify-center gap-3 overflow-hidden rounded-2xl p-5",
              "border border-border/60 bg-secondary/20 backdrop-blur-sm",
              "transition-[transform,border-color,background-color,box-shadow] duration-300",
              "hover:-translate-y-1 hover:border-[var(--skill)] hover:bg-secondary/40",
              "hover:shadow-[0_10px_40px_-12px_var(--skill)]"
            )}
          >
            <span
              aria-hidden
              style={{ background: "var(--skill)" }}
              className="pointer-events-none absolute -top-6 h-16 w-16 rounded-full opacity-25 blur-2xl transition-opacity duration-300 group-hover:opacity-70"
            />
            <img
              src={skill.icon}
              alt={skill.label}
              width={44}
              height={44}
              loading="lazy"
              className="relative size-9 object-contain drop-shadow-sm transition-transform duration-300 group-hover:scale-110 md:size-11"
            />
            <span className="relative text-center text-xs font-medium text-foreground/80 transition-colors group-hover:text-foreground md:text-sm font-mono">
              {skill.label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const SkillsSection = () => {
  const { disable3D, ready } = usePerfProfile();
  const showGrid = ready && disable3D;

  if (showGrid) {
    return (
      <SectionWrapper
        id="skills"
        className="flex w-full min-h-fit md:min-h-screen flex-col justify-center py-12 md:py-24"
      >
        <SectionHeader
          id="skills"
          title="Skills & Technologies"
          desc="A multidisciplinary skill set spanning machine learning, automation, full-stack development, and AI research."
          className="static mb-6"
        />
        <CoreProficienciesAndDomains />
        <TechStackGrid />
      </SectionWrapper>
    );
  }

  return (
    <SectionWrapper
      id="skills"
      className="w-full min-h-fit md:min-h-screen md:min-h-[140vh] py-12 md:py-24 pointer-events-none flex flex-col items-center justify-start"
    >
      <SectionHeader 
        id="skills" 
        title="Skills & Technologies" 
        className="static mb-6"
      />
      <CoreProficienciesAndDomains />
    </SectionWrapper>
  );
};

export default SkillsSection;
