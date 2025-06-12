import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { Footer, Header, Providers } from "@/components/shared";
import { cn } from "@/lib/utils";
import { Suspense } from "react";

const nunito = Nunito({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "It-навигатор",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          nunito.className,
          "bg-linear-to-b from-[#FFFFFF] to-[#9dbffa]"
        )}
      >
        <Providers>
          <Suspense
            fallback={
              <div className="w-full relative z-[2] top-30 mb-[250px] px-4 flex flex-col lg:flex-row items-center justify-between gap-8">Загрузка</div>
            }
          >
            <Header />
            {children}
            <Footer />
          </Suspense>
        </Providers>
      </body>
    </html>
  );
}
