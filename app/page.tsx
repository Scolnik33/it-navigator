import {
  Companies,
  EducationBlock,
  EventsBlock,
  WelcomeScreen,
} from "@/components/shared";
import { Suspense } from "react";

export default async function Home() {
  return (
    <>
      {/* Главный экран встречающий посетителя сайта */}
      <Suspense fallback={<div className="w-full h-min-screen flex items-center justify-center">loading...</div>}>
        <WelcomeScreen />
      </Suspense>

      {/* БЛОК С АЙТИ МЕРОПРИЯТИЯМИ */}
      <EventsBlock />

      {/* БЛОК С АЙТИ КОМПАНИЯМИ */}
      <Companies />

      {/* БЛОК С ОБРАЗОВАТЕЛЬНЫМИ ОРГАНИЗАЦИЯМИ */}
      <EducationBlock />
    </>
  );
}

// Не нажимается выбрать дату на телефоне
// ЗАСИДИТЬ ПРОЕКТ И ПОНЯТЬ ПОЧЕМУ НЕ ОТОБРАЖАЮТСЯ КАРТИНКИ А ТОЛЬКО ИХ ALT