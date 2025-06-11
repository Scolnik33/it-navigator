"use client";

import React from "react";
import { Container } from "../container";
import { Title } from "../title";
import { Education } from "./education";
import dynamic from "next/dynamic";

const Element = dynamic(
  () => import("react-scroll").then((mod) => mod.Element),
  { ssr: true }
);

export const EducationBlock: React.FC = () => {
  return (
    <Element name="education" className="mb-36 sm:mb-48">
      <Container>
        <Title
          className="font-bold mb-6 sm:mb-10 text-blue-500"
          text="Образовательные организации"
          size="lg"
        />
        <Education />
      </Container>
    </Element>
  );
};
