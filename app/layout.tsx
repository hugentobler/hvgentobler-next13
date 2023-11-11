import "./globals.css";

import localFont from "next/font/local";
import { Viewport } from "next";
import { themeEffect } from "@/components/theme-effect";

export const viewport: Viewport = {
  themeColor: "transparent",
};

export const metadata = {
  title: "Hugentobler",
  description: "",
};

const univers = localFont({
  src: [
    { path: "./fonts/UniversLTStd-UltraCn.woff", weight: "200" },
    { path: "./fonts/UniversLTStd-Cn.woff", weight: "300" },
    { path: "./fonts/UniversLTStd.woff", weight: "400" },
  ],
  variable: "--font-univers",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${univers.variable} scroll-smooth antialiased`}
      suppressHydrationWarning={true} // For changing theme classname
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(${themeEffect.toString()})();`,
          }}
        />
      </head>
      <body
        className="
        bg-background text-primary
        selection:bg-secondary selection:text-background dark:selection:bg-primary
        "
      >
        <div className="mx-auto max-w-screen-2xl px-2 md:px-8">{children}</div>
      </body>
    </html>
  );
}
