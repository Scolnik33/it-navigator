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
      <Suspense fallback={<p>loading...</p>}>
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
