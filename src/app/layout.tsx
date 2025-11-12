// app/layout.tsx
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import { 
  Doto, 
  JetBrains_Mono, 
  Figtree,
  Instrument_Serif,
  Instrument_Sans,
  Urbanist,
  Bricolage_Grotesque
} from "next/font/google";
import { Analytics } from "@vercel/analytics/next"

const doto = Doto({
  subsets: ["latin"],
  variable: "--font-doto",
  weight: ["400", "500", "700"],
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

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-instrument-serif",
  weight: ["400"],
});

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument-sans",
  weight: ["400", "500", "600", "700"],
});

const urbanist = Urbanist({
  subsets: ["latin"],
  variable: "--font-urbanist",
});

const bricolageGrotesque = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage-grotesque",
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "Harsh Jadhav",
  description: "Building things that people use. Shipping fast, learning faster. Currently neck-deep in Solana and Web3, exploring AI, freelancing, and occasionally touching grass.",
  keywords: [
    "Harsh Jadhav",
    "Portfolio",
    "Web Developer",
    "Software Engineer",
    "Solana Developer",
    "Web3",
    "Blockchain",
    "Next.js",
    "React",
    "JavaScript",
    "TypeScript",
    "Frontend Developer",
    "Full Stack Developer",
    "AI/ML",
    "Freelancer",
    "Open Source",
  ],
  authors: [{ name: "Harsh Jadhav" }],
  creator: "Harsh Jadhav",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://harshjadhav.dev",
    title: "Harsh Jadhav — Builder, Shipper, Learner",
    description: "Building things that people use. Shipping fast, learning faster. Currently neck-deep in Solana and Web3.",
    siteName: "Harsh Jadhav",
  },
  twitter: {
    card: "summary_large_image",
    title: "Harsh Jadhav — Builder, Shipper, Learner",
    description: "Building things that people use. Shipping fast, learning faster. Currently neck-deep in Solana and Web3.",
    creator: "@theharshjadhav",
  },
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html 
      lang="en" 
      className={`${doto.variable} ${jetbrains.variable} ${figtree.variable} ${instrumentSerif.variable} ${instrumentSans.variable} ${urbanist.variable} ${bricolageGrotesque.variable}`}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Analytics />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
