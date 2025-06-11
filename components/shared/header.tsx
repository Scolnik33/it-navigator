"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Container, NavItem, SearchBlock, AuthModal } from "./index";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import Link from "next/link";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const LinkScroll = dynamic(
  () => import("react-scroll").then((mod) => mod.Link),
  {
    ssr: false,
  }
);

export const Header: React.FC = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleScroll = () => setIsScrolled(window.scrollY > 0);

  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const variants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div
      className={cn(
        "bg-white fixed top-0 left-0 right-0 z-30 transition-shadow ease-in-out duration-500",
        { "border-b shadow-xl": isScrolled }
      )}
    >
      <Container className="flex items-center justify-between py-4 md:py-6 px-4">
        <div className="flex items-center gap-2">
          {pathname !== "/" ? (
            <Link href="/">
              <img
                src="/images/logo.png"
                alt="logo"
                className="w-[120px] md:w-[160px]"
              />
            </Link>
          ) : (
            <motion.div
              initial="hidden"
              animate="visible"
              transition={{ duration: 1.5 }}
              variants={variants}
            >
              <LinkScroll
                to="up"
                smooth={true}
                duration={500}
                offset={-110}
                className="cursor-pointer"
              >
                <img
                  src="/images/logo.png"
                  alt="logo"
                  className="w-[120px] md:w-[160px] md:me-12"
                />
              </LinkScroll>
            </motion.div>
          )}
        </div>

        {pathname === "/" && (
          <>
            <div className="hidden lg:flex space-x-6 text-base">
              <NavItem
                title="Мероприятия в сфере ИТ"
                link="events"
                variants={variants}
              />
              <NavItem
                title="ИТ-компании региона"
                link="companies"
                variants={variants}
              />
              <NavItem
                title="Образовательные организации"
                link="education"
                variants={variants}
              />
            </div>

            <button
              className="lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </>
        )}

        {pathname !== "/verify" && (
          <motion.div
            className="hidden lg:block"
            initial="hidden"
            animate="visible"
            transition={{ duration: 1.5 }}
            variants={variants}
          >
            <div className="hidden md:flex items-center space-x-4">
              <AuthModal />
              <SearchBlock />
            </div>
          </motion.div>
        )}
      </Container>

      {isMenuOpen && pathname === "/" && (
        <div className="lg:hidden flex flex-col items-start px-4 pb-4 space-y-3 bg-white border-t">
          <NavItem
            title="Мероприятия в сфере ИТ"
            link="events"
            variants={variants}
            className="mt-4"
          />
          <NavItem
            title="ИТ-компании региона"
            link="companies"
            variants={variants}
          />
          <NavItem
            title="Образовательные организации"
            link="education"
            variants={variants}
          />
          <div className="flex flex-col space-y-2 mt-2 w-full">
            <SearchBlock />
            <AuthModal />
          </div>
        </div>
      )}
    </div>
  );
};
