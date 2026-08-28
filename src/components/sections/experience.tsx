import { ACHIEVEMENTS, Achievement } from "@/data/constants";
import { SectionHeader } from "./section-header";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import SectionWrapper from "../ui/section-wrapper";
import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AchievementsSection = () => {
  return (
    <SectionWrapper
      id="achievements"
      className="flex flex-col items-center justify-center min-h-fit md:min-h-[100vh] py-12 md:py-20"
    >
      <div className="w-full max-w-4xl px-4 md:px-8 mx-auto pointer-events-auto">
        <SectionHeader
          id="achievements"
          title="Achievements"
          desc="Key highlights from my academic and technical journey."
          className="mb-8 md:mb-20 mt-0"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
          {ACHIEVEMENTS.map((ach, index) => (
            <AchievementCard key={ach.id} achievement={ach} index={index} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
};

const AchievementCard = ({
  achievement,
  index,
}: {
  achievement: Achievement;
  index: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: index * 0.1,
        ease: "easeOut",
      }}
      viewport={{ once: true, margin: "-50px" }}
      className="w-full flex"
    >
      <Card
        className={cn(
          "bg-card text-card-foreground border-border w-full flex flex-col justify-between",
          "hover:border-primary/20 transition-colors duration-300",
          "shadow-sm hover:shadow-md"
        )}
      >
        <CardHeader className="pb-3 flex-1 flex flex-col justify-start">
          <div className="flex items-start gap-4">
            <span className="text-3xl p-2 rounded-xl bg-secondary/30 select-none shrink-0">
              {achievement.emoji}
            </span>
            <div className="space-y-1">
              {achievement.badge && (
                <Badge variant="secondary" className="w-fit font-mono text-[10px] font-normal uppercase tracking-wider">
                  {achievement.badge}
                </Badge>
              )}
              <CardTitle className="text-lg font-bold tracking-tight leading-tight">
                {achievement.title}
              </CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            {achievement.description}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AchievementsSection;
