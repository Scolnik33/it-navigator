"use client";

import React from "react";
import { Container } from "../container";
import { Title } from "../title";
import { Events } from "./events";
import dynamic from "next/dynamic";
import { Filtration } from "..";

const Element = dynamic(
  () => import("react-scroll").then((mod) => mod.Element),
  { ssr: true }
);

export const EventsBlock: React.FC = () => {
  return (
    <Element name="events">
      <div className="mb-24 md:mb-32 lg:mb-48 px-4 md:px-0">
        <Container>
          <Title
            className="font-bold mb-4 md:mb-5 text-blue-500"
            text="Ближайшие мероприятия"
            size="lg"
          />
          <Filtration />
          <Events />
        </Container>
      </div>
    </Element>
  );
};

