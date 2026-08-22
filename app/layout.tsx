import type { Metadata } from "next";
import { Fraunces } from "next/font/google";
import "./globals.css";
import Nav from "./ui/TopNav/Nav";
import Header from "./ui/header/Header";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ROD Zacisze Bytom",
  description:
    "Oficjalna strona Rodzinnych Ogródków Działkowych 'Zacisze' w Bytomiu",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fraunces.variable} h-full antialiased`}>
      <body className="min-h-dvh flex flex-col w-auto lg:gap-10 lg:py-80 bg-background">
        <Header />
        <main className="min-h-dvh pb-10 lg:pb-0">{children}</main>
        <Nav />
      </body>
    </html>
  );
}
