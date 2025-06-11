import { Title } from "@/components/shared";
import { Button } from "@/components/ui";
import Link from "next/link";
import React from "react";

export default function NotAuth() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <img
        src="/images/not-found.png"
        alt="Страница не найдена"
        className="w-[250px] sm:w-[300px] md:w-[350px] lg:w-[400px] h-auto mb-4"
      />
      <Title
        size="2xl"
        text="Страница не найдена"
        className="font-bold text-blue-600 text-xl sm:text-2xl md:text-3xl"
      />
      <p className="text-blue-700 text-sm sm:text-base md:text-lg mt-2">
        Упс... Кажется такой страницы не существует
      </p>
      <Link href="/">
        <Button
          variant={"default"}
          size={"lg"}
          className="mt-4 px-6 py-2 text-sm sm:text-base"
        >
          На главную
        </Button>
      </Link>
    </div>
  );
}
