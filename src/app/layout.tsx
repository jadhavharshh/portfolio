// app/layout.tsx
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import { Doto, JetBrains_Mono, Figtree } from "next/font/google";
import { Analytics } from "@vercel/analytics/next"

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
  title: "Harsh Jadhav",
  keywords: [
    "Harsh Jadhav",
    "Portfolio",
    "Web Developer",
    "Software Engineer",
    "Next.js",
    "React",
    "JavaScript",
    "TypeScript",
    "Frontend Developer",
    "UI/UX",
    "Web Design",
    "Web Development",
    "Full Stack Developer",
    "Tech Enthusiast",
    "Open Source",
    "GitHub",
    "LinkedIn",
    "Contact",
  ],      
  description: "Harsh Jadhav's portfolio showcasing web development projects, skills, and experience.",
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html 
      lang="en" 
      className={`${doto.variable} ${jetbrains.variable} ${figtree.variable}`}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
