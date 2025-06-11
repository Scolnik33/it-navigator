"use client";

import React from "react";
import dynamic from "next/dynamic";
import { useSectionsStore } from "@/store/sections";
import { Container } from "../container";
import { Title } from "../title";
import { Carousel } from "../../ui";
import { CompaniesItem } from "./companies-item";
import { CompaniesSkeleton } from "./skeleton/companies-skeleton";

const Element = dynamic(
  () => import("react-scroll").then((mod) => mod.Element),
  { ssr: true }
);

export const Companies: React.FC = () => {
  const companies = useSectionsStore((state) => state.companies);
  const loading = useSectionsStore((state) => state.loading);

  return (
    <Element name="companies" className="mb-48">
      <Container>
        <Title
          className="font-bold mb-10 text-blue-500"
          text="ИТ-компании региона"
          size="lg"
        />
      </Container>

      <Carousel.Carousel>
        <Carousel.CarouselContent>
          {loading ? (
            [...Array(1)].map((_, index) => <CompaniesSkeleton key={index} />)
          ) : (
            companies.map((item) => <CompaniesItem key={item.id} {...item} />)
          )}
        </Carousel.CarouselContent>

        <Carousel.CarouselPrevious className="absolute left-[8%] md:left-[14%] z-10 p-2 bg-white rounded-full shadow-md" />
        <Carousel.CarouselNext className="absolute right-[8%] md:right-[14%] z-10 p-2 bg-white rounded-full shadow-md" />
      </Carousel.Carousel>
    </Element>
  );
};
