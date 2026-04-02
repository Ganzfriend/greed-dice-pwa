import "@/styles/globals.css";

import { Metadata } from "next";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils.js";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

// eslint-disable-next-line react-refresh/only-export-components
export const metadata: Metadata = {
  title: "Greed Game",
  description: "A strategy dice game for all ages",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
