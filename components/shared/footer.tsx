"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Link from "next/link";
import { Container } from "./container";
import dynamic from "next/dynamic";

const variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const LinkScroll = dynamic(
  () => import("react-scroll").then((mod) => mod.Link),
  { ssr: true }
);

export const Footer: React.FC = () => {
  return (
    <footer
      className={cn(
        "bg-white border-t shadow-inner mt-20 text-gray-700 text-center",
        "transition-shadow ease-in-out duration-500"
      )}
    >
      <Container className="py-12">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
          variants={variants}
        >
          <div>
            <Link href="/">
              <img
                src="/images/logo.png"
                alt="logo"
                width={180}
                height={50}
                className="cursor-pointer mb-4 mx-auto md:mx-0"
              />
            </Link>
            <p className="text-sm leading-relaxed md:max-w-[300px]">
              Платформа объединяет ИТ-сообщество региона: мероприятия, компании,
              образовательные организации и новости индустрии.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Навигация</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <LinkScroll
                  className="hover:text-blue-700 transition-colors duration-200 cursor-pointer"
                  to={"events"}
                  smooth={true}
                  duration={500}
                  offset={-110}
                >
                  Мероприятия в сфере ИТ
                </LinkScroll>
              </li>
              <li>
                <LinkScroll
                  className="hover:text-blue-700 transition-colors duration-200 cursor-pointer"
                  to={"companies"}
                  smooth={true}
                  duration={500}
                  offset={-110}
                >
                  ИТ-компании региона
                </LinkScroll>
              </li>
              <li>
                <LinkScroll
                  className="hover:text-blue-700 transition-colors duration-200 cursor-pointer"
                  to={"education"}
                  smooth={true}
                  duration={500}
                  offset={-110}
                >
                  Образовательные организации
                </LinkScroll>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Контакты</h3>
            <ul className="text-sm space-y-2">
              <li>📍 г. Омск, ул. Примерная, 12</li>
              <li>📞 +7 (123) 456-78-90</li>
              <li>📧 info@testweb.ru</li>
            </ul>
          </div>
        </motion.div>

        <motion.div
          className="mt-12 border-t pt-6 text-center text-gray-500 text-xs select-none"
          initial="hidden"
          animate="visible"
          transition={{ duration: 1.5, delay: 0.5 }}
          variants={variants}
        >
          © {new Date().getFullYear()} ИТ-навигатор. Все права защищены.
          Сделано с ❤️.
        </motion.div>
      </Container>
    </footer>
  );
};
