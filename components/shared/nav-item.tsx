"use client";

import { cn } from "@/lib/utils";
import React from "react";
import dynamic from "next/dynamic";
import { motion, Variants } from "framer-motion";

interface Props {
  className?: string;
  title: string;
  link: string;
  variants: Variants;
}

const LinkScroll = dynamic(
  () => import("react-scroll").then((mod) => mod.Link),
  { ssr: true }
);

export const NavItem: React.FC<Props> = ({
  className,
  title,
  link,
  variants,
}) => {
  return (
    <LinkScroll to={link} smooth={true} duration={500} offset={-110}>
      <motion.div
        className="relative"
        initial="hidden"
        animate="visible"
        transition={{ duration: 2 }}
        variants={variants}
      >
        <div
          className={cn(
            "text-sm sm:text-base md:text-base font-bold",
            "transition duration-200 hover:text-blue-700 cursor-pointer",
            className
          )}
        >
          {title}
        </div>
      </motion.div>
    </LinkScroll>
  );
};
