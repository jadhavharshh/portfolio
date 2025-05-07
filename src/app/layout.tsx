// app/layout.tsx
import "./globals.css";
import { Doto, JetBrains_Mono, Figtree } from "next/font/google";

const doto = Doto({
  subsets: ["latin"],
  variable: "--font-doto",
  weight: ["400", "500", "700"], // regular, medium, bold
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
});

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
  weight: ["300", "400", "600", "800"],
});

export const metadata = {
  title: "My Portfolio",
  description: "Built with Next.js",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${doto.variable} ${jetbrains.variable} ${figtree.variable}`}>
      <body>{children}</body>
    </html>
  );
}
