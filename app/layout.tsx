import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { Footer, Header, Providers } from "@/components/shared";
import { cn } from "@/lib/utils";

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
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
