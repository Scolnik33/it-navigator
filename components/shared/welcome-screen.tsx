"use client";

import React, { useEffect } from "react";
import { Title } from "./title";
import { Button } from "../ui";
import { AddEventModal } from "./modals/add-event-modal";
import dynamic from "next/dynamic";
import { useSearchParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { animationVariants } from "@/lib/animation-variants";
import { CheckStatus } from "./check-status";
import { useUserEventsStore } from "@/store/user-events";
import { useSession } from "next-auth/react";

const LinkScroll = dynamic(
  () => import("react-scroll").then((mod) => mod.Link),
  { ssr: true }
);

const Element = dynamic(
  () => import("react-scroll").then((mod) => mod.Element),
  { ssr: true }
);

export const WelcomeScreen: React.FC = () => {
  const events = useUserEventsStore((state) => state.events);
  const getEvents = useUserEventsStore((state) => state.getEvents);
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleStatusEvents = async () => {
    try {
      await getEvents(Number(session?.user.id));
    } catch (err) {
      console.log("Error fetching status events data:", err);
      toast.error("Не удалось загрузить статус мероприятий", {
        icon: "❌",
      });
    }
  };

  useEffect(() => {
    console.log("Session on prod:", session);
    handleStatusEvents();
  }, [session]);

  useEffect(() => {
    const verified = searchParams.get("verified");
    const logout = searchParams.get("logout");

    if (verified) {
      toast.success("Код подтвержден! Вы успешно зарегистрировались!", {
        icon: "✅",
      });
      setTimeout(() => router.replace("/"), 500);
    } else if (logout) {
      toast.success("Вы вышли из аккаунта", {
        icon: "✅",
      });
      router.replace("/");
    }
  }, [searchParams, router]);

  return (
    <Element
      name="up"
      className="w-full relative z-[2] top-30 mb-[250px] px-4 flex flex-col lg:flex-row items-center justify-between gap-8"
    >
      <div className="w-full lg:w-1/2 flex justify-center">
        <motion.img
          src="/images/i.png"
          alt="Логотип ИТ-навигатора"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="w-[400px] h-[300px] lg:w-[780px] lg:h-[660px] object-contain"
        />
      </div>

      <div className="w-full lg:w-1/2 text-center lg:text-left">
        <motion.div
          initial="hidden"
          animate="visible"
          transition={{ duration: 1, delay: 1 }}
          variants={animationVariants}
        >
          <Title
            className="font-bold text-blue-500 text-2xl sm:text-3xl md:text-4xl"
            text="ИТ-навигатор"
            size="xl"
          />
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          transition={{ duration: 1, delay: 1.5 }}
          variants={animationVariants}
        >
          <div className="lg:max-w-[800px] text-blue-700 leading-relaxed mt-4 text-sm sm:text-base md:text-lg">
            Добро пожаловать в ИТ-навигатор Омской области — ваш путеводитель по
            цифровым возможностям региона. Здесь вы найдете все необходимые
            ресурсы для развития в сфере информационных технологий и инноваций!
          </div>
        </motion.div>

        <div className="flex flex-col sm:flex-row sm:justify-center lg:justify-start gap-4 mt-6">
          <motion.div
            initial="hidden"
            animate="visible"
            transition={{ duration: 1, delay: 2 }}
            variants={animationVariants}
          >
            <LinkScroll to="events" smooth={true} duration={500} offset={-110}>
              <Button
                size="xl"
                variant="default"
                className="text-sm md:text-base w-full sm:w-auto"
              >
                Ближайшие мероприятия
              </Button>
            </LinkScroll>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            transition={{ duration: 1, delay: 2.5 }}
            variants={animationVariants}
          >
            <AddEventModal />
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            transition={{ duration: 1, delay: 3 }}
            variants={animationVariants}
          >
            {events.length > 0 && <CheckStatus events={events} />}
          </motion.div>
        </div>
      </div>
    </Element>
  );
};
