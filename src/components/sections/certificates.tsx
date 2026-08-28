import { CERTIFICATES, Certificate } from "@/data/constants";
import { SectionHeader } from "./section-header";
import SectionWrapper from "../ui/section-wrapper";
import { motion } from "motion/react";
import { BadgeCheck, ExternalLink, Award } from "lucide-react";
import { cn } from "@/lib/utils";

const issuerMeta: Record<string, { color: string; bg: string; badge: string }> = {
  Oracle: {
    color: "text-red-500",
    bg: "bg-red-500/10 border-red-500/20",
    badge: "bg-red-500/15 text-red-500",
  },
  Google: {
    color: "text-blue-500",
    bg: "bg-blue-500/10 border-blue-500/20",
    badge: "bg-blue-500/15 text-blue-500",
  },
  Udemy: {
    color: "text-purple-500",
    bg: "bg-purple-500/10 border-purple-500/20",
    badge: "bg-purple-500/15 text-purple-500",
  },
  upGrad: {
    color: "text-emerald-500",
    bg: "bg-emerald-500/10 border-emerald-500/20",
    badge: "bg-emerald-500/15 text-emerald-500",
  },
};

const CertificateCard = ({
  cert,
  index,
}: {
  cert: Certificate;
  index: number;
}) => {
  const meta = issuerMeta[cert.issuer] ?? {
    color: "text-foreground",
    bg: "bg-secondary/30 border-border/50",
    badge: "bg-secondary text-foreground",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.1, ease: "easeOut" }}
      viewport={{ once: true, margin: "-40px" }}
      className="group relative"
    >
      {/* Glow accent */}
      <div
        className={cn(
          "absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500",
          "bg-gradient-to-br from-transparent via-transparent to-transparent",
          "group-hover:shadow-lg"
        )}
      />

      <div
        className={cn(
          "relative flex flex-col gap-4 p-5 rounded-2xl border",
          "bg-white/70 dark:bg-black/40 backdrop-blur-sm",
          "border-border/60 hover:border-border transition-colors duration-300",
          "shadow-sm hover:shadow-md"
        )}
      >
        {/* Top row: icon + issuer badge */}
        <div className="flex items-start justify-between gap-3">
          <div
            className={cn(
              "flex items-center justify-center w-11 h-11 rounded-xl border shrink-0 text-xl",
              meta.bg
            )}
          >
            {cert.emoji}
          </div>
          <span
            className={cn(
              "text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full",
              meta.badge
            )}
          >
            {cert.issuer}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-bold text-base leading-snug text-foreground font-display pr-2">
          {cert.title}
        </h3>

        {/* Credential ID */}
        {cert.credentialId && (
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-mono">
            <BadgeCheck className="w-3.5 h-3.5 shrink-0 text-green-500" />
            <span className="truncate">ID: {cert.credentialId}</span>
          </div>
        )}

        {/* Footer: year + link */}
        <div className="flex items-center justify-between mt-auto pt-2 border-t border-border/40">
          <span className="text-xs text-muted-foreground font-mono">{cert.year}</span>
          {cert.link ? (
            <a
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "inline-flex items-center gap-1 text-xs font-medium transition-colors",
                meta.color,
                "hover:underline underline-offset-2"
              )}
            >
              View Certificate
              <ExternalLink className="w-3 h-3" />
            </a>
          ) : (
            <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
              <Award className="w-3 h-3" />
              Certified
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const CertificatesSection = () => {
  return (
    <SectionWrapper
      id="certificates"
      className="flex flex-col items-center justify-center min-h-fit md:min-h-[80vh] py-12 md:py-20"
    >
      <div className="w-full max-w-5xl px-4 md:px-8 mx-auto pointer-events-auto">
        <SectionHeader
          id="certificates"
          title="Certificates"
          desc="Verified credentials and professional certifications from leading platforms and institutions."
          className="mb-8 md:mb-20 mt-0"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 md:gap-5">
          {CERTIFICATES.map((cert, index) => (
            <CertificateCard key={cert.id} cert={cert} index={index} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
};

export default CertificatesSection;
