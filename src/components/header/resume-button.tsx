"use client";

import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import confetti from "canvas-confetti";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

export default function ResumeButton({ className }: { className?: string }) {
  const [isHovered, setIsHovered] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const [downloaded, setDownloaded] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Close the dropdown on click outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsOpen((prev) => !prev);
  };

  const handleDownloadClick = () => {
    setIsOpen(false);
    setDownloaded(true);

    // Beautiful confetti burst centered on the click event coordinates
    confetti({
      particleCount: 65,
      spread: 50,
      origin: { y: 0.15 },
      colors: ["#8b5cf6", "#a78bfa", "#f472b6", "#60a5fa", "#34d399", "#fbbf24"],
    });

    setTimeout(() => {
      setDownloaded(false);
    }, 2000);
  };

  return (
    <div ref={containerRef} className="relative inline-block">
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.button
            onClick={handleToggle}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.03 }}
            className={cn(
              "group relative flex items-center justify-center gap-2 h-10 px-3 py-2 text-sm font-medium rounded-lg cursor-can-hover transition-colors duration-300 border border-black/10 dark:border-white/10 bg-white/5 hover:bg-white/10 dark:bg-white/5 dark:hover:bg-white/10 backdrop-blur-md shadow-sm hover:shadow-[0_0_15px_rgba(139,92,246,0.15)]",
              isOpen && "bg-white/10 dark:bg-white/10 border-violet-500/30",
              className
            )}
          >
            {/* Shine Sweep Effect on Hover */}
            {isHovered && !isOpen && (
              <motion.div
                className="absolute inset-0 w-full h-full overflow-hidden rounded-lg pointer-events-none"
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ repeat: 0, duration: 0.8, ease: "linear" }}
                style={{
                  background:
                    "linear-gradient(110deg, transparent 35%, rgba(255, 255, 255, 0.12) 50%, transparent 65%)",
                }}
              />
            )}

            {/* Animated composite Document Icon */}
            <div className="relative w-5 h-5 flex items-center justify-center shrink-0">
              <svg
                width="15"
                height="17"
                viewBox="0 0 15 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current text-foreground/75 group-hover:text-foreground transition-colors duration-300"
              >
                <path
                  d="M2 1C1.44772 1 1 1.44772 1 2V15C1 15.5523 1.44772 16 2 16H13C13.5523 16 14 15.5523 14 15V5L10 1H2Z"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9.5 1V5.5H14"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <line x1="3.5" y1="8.5" x2="11.5" y2="8.5" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="3.5" y1="11.5" x2="7.5" y2="11.5" strokeWidth="1.5" strokeLinecap="round" />
              </svg>

              {/* Float badge overlay */}
              <motion.div
                className={cn(
                  "absolute -bottom-1 -right-1 rounded-full p-0.5 border border-white dark:border-zinc-950 shadow-sm transition-colors duration-300",
                  downloaded
                    ? "bg-emerald-500 text-white"
                    : "bg-violet-600 dark:bg-violet-500 text-white"
                )}
                animate={
                  downloaded
                    ? { scale: [1, 1.25, 1] }
                    : isHovered || isOpen
                    ? {
                        y: [0, 2, -1, 1, 0],
                        transition: {
                          duration: 0.8,
                          ease: "easeInOut",
                          repeat: Infinity,
                        },
                      }
                    : { y: 0 }
                }
              >
                {downloaded ? (
                  <svg
                    width="8"
                    height="8"
                    viewBox="0 0 8 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="stroke-current text-white"
                  >
                    <path
                      d="M1.5 4.5L3 6L6.5 2.5"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  <svg
                    width="8"
                    height="8"
                    viewBox="0 0 8 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="stroke-current text-white"
                  >
                    <path
                      d="M4 1V7M4 7L1.5 4.5M4 7L6.5 4.5"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </motion.div>
            </div>

            {/* Text Label: Hidden on narrow screens, shown as inline text on sm+ */}
            <span className="hidden sm:inline font-sans text-foreground/80 group-hover:text-foreground select-none">
              Resume
            </span>
          </motion.button>
        </TooltipTrigger>
        <TooltipContent side="bottom" align="center" className="z-[9999]">
          View or Download Resume
        </TooltipContent>
      </Tooltip>

      {/* Popover Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute right-0 mt-2 w-44 origin-top-right rounded-xl border border-black/10 dark:border-white/10 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-xl p-1.5 shadow-xl z-[9999] flex flex-col gap-1"
          >
            <Link
              href="/resume"
              onClick={() => setIsOpen(false)}
              className="group/item !relative !left-auto flex items-center gap-2.5 px-3 py-2.5 text-sm rounded-lg text-foreground/75 hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-200 select-none cursor-can-hover"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current text-foreground/60 group-hover/item:text-foreground transition-colors duration-200"
              >
                <path
                  d="M1 7C1 7 3.5 2.5 7 2.5C10.5 2.5 13 7 13 7C13 7 10.5 11.5 7 11.5C3.5 11.5 1 7 1 7Z"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle
                  cx="7"
                  cy="7"
                  r="1.8"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>View Online</span>
            </Link>

            <a
              href="/ron_resume.pdf"
              download="Raunak_Raj_Resume.pdf"
              onClick={handleDownloadClick}
              className="group/item !relative !left-auto flex items-center gap-2.5 px-3 py-2.5 text-sm rounded-lg text-foreground/75 hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-200 select-none cursor-can-hover"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current text-foreground/60 group-hover/item:text-foreground transition-colors duration-200"
              >
                <path
                  d="M7 1V9.5M7 9.5L4.5 7.2M7 9.5L9.5 7.2"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 12.5H12"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>Download PDF</span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
