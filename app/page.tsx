import {
  Companies,
  EducationBlock,
  EventsBlock,
  WelcomeScreen,
} from "@/components/shared";

export default async function Home() {
  return (
    <>
      {/* Главный экран встречающий посетителя сайта */}
      <WelcomeScreen />

      {/* БЛОК С АЙТИ МЕРОПРИЯТИЯМИ */}
      <EventsBlock />

      {/* БЛОК С АЙТИ КОМПАНИЯМИ */}
      <Companies />

      {/* БЛОК С ОБРАЗОВАТЕЛЬНЫМИ ОРГАНИЗАЦИЯМИ */}
      <EducationBlock />
    </>
  );
}
