"use client";

import React from "react";
import Link from "next/link";
import SocialMediaButtons from "../social/social-media-icons";

function Footer() {
  return (
    <footer className="flex w-full shrink-0 flex-col items-center gap-4 border-t border-border px-4 py-6 sm:flex-row md:px-6 sm:justify-between">
      <div className="flex items-center gap-2">
        <Link href="/" className="font-mono text-sm font-bold text-foreground hover:underline">
          &lt;Raunak Raj /&gt;
        </Link>
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400 font-mono">
        © 2024 Raunak Raj · Built with curiosity &amp; code
      </p>
      <SocialMediaButtons />
    </footer>
  );
}

export default Footer;
