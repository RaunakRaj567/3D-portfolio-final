"use client";

import { useInView } from "motion/react";
import React, { useRef } from "react";
import { Button } from "../ui/button";
import { SiGithub, SiInstagram, SiLinkedin } from "react-icons/si";
import { Mail } from "lucide-react";
import { config } from "@/data/config";
import Link from "next/link";

const BUTTONS = [
  {
    name: "Github",
    href: config.social.github,
    icon: <SiGithub size={"24"} className="text-foreground" />,
  },
  {
    name: "LinkedIn",
    href: config.social.linkedin,
    icon: <SiLinkedin size={"24"} className="text-foreground" />,
  },
  {
    name: "Instagram",
    href: config.social.instagram,
    icon: <SiInstagram size={"24"} className="text-foreground" />,
  },
  {
    name: "Email",
    href: `mailto:${config.email}`,
    icon: <Mail size={"24"} className="text-foreground" />,
  },
];

const SocialMediaButtons = () => {
  const ref = useRef<HTMLDivElement>(null);
  const show = useInView(ref, { once: true });
  return (
    <div ref={ref} className="z-10 flex gap-2">
      {show &&
        BUTTONS.map((button) => (
          <Link href={button.href} key={button.name} target="_blank" aria-label={button.name}>
            <Button variant={"ghost"} size="icon" className="w-10 h-10">
              {button.icon}
            </Button>
          </Link>
        ))}
    </div>
  );
};

export default SocialMediaButtons;
