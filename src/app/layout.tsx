import type { Metadata } from "next";
import "./globals.css";
import {Suspense} from "react";

export const metadata: Metadata = {
  title: "TypeScript Chess",
  description: "A Chess application written in TypeScript.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  //   https://coolors.co/011e16-01271d-00f2b5-d6d6d6-b10f2e
  return (
    <html lang="en">
      <body>
        <Suspense fallback={<>Loading...</>}>
          {children}
        </Suspense>
      </body>
    </html>
  );
}
