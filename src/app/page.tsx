"use client";
import { ModeToggle } from "@/components/ui/mode-toggle";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import ExperienceSection from "@/components/sections/ExperienceSection";
import ContactPlatforms from "@/components/sections/ContactPlatforms";
import ProjectsSection from "@/components/sections/ProjectsSection";
import { FloatingDockDemo } from "@/components/sections/dock-example";

const ActivityCalendar = dynamic(
  () => import("react-activity-calendar").then((mod) => mod.default),
  { ssr: false }
);

type ContributionItem = {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
};

// Helper function to filter contributions to past 6 months
function filterLast6Months(contributions: ContributionItem[]): ContributionItem[] {
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 10);

  return contributions.filter(item => {
    const itemDate = new Date(item.date);
    return itemDate >= sixMonthsAgo;
  });
}

export default function Home() {
  const [contributions, setContributions] = useState<ContributionItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("https://github-contributions-api.deno.dev/jadhavharshh.json");
        const data = await res.json();
        console.log("Fetched GitHub data:", data);

        if (data?.contributions && Array.isArray(data.contributions)) {
          // Flatten the nested array structure
          const flattenedContributions = data.contributions.flat();

          // Convert contribution levels to numbers
          const contributionLevelMap = {
            'NONE': 0,
            'FIRST_QUARTILE': 1,
            'SECOND_QUARTILE': 2,
            'THIRD_QUARTILE': 3,
            'FOURTH_QUARTILE': 4
          };

          // Transform to the expected format
          const validContributions = flattenedContributions
            .filter((item: any) => item && typeof item === 'object' && item.date)
            .map((item: any) => ({
              date: String(item.date),
              count: Number(item.contributionCount || 0),
              level: contributionLevelMap[item.contributionLevel as keyof typeof contributionLevelMap] || 0
            }));

          console.log(`Found ${validContributions.length} valid contributions`);

          if (validContributions.length > 0) {
            // Filter to show only the past 6 months
            const filteredContributions = filterLast6Months(validContributions);
            setContributions(filteredContributions);
            setIsLoaded(true);
          } else {
            setHasError(true);
            setIsLoaded(true);
          }
        } else {
          setHasError(true);
          setIsLoaded(true);
        }
      } catch (err) {
        console.error("Failed to fetch GitHub contributions:", err);
        setHasError(true);
        setIsLoaded(true);
      }
    }
    fetchData();
  }, []);

  // Use a simple placeholder while loading
  if (!isLoaded) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground">
        <div className="animate-pulse">Loading your awesome portfolio...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-background text-foreground">
      <div className="w-full max-w-[700px] mx-auto px-6 py-20">
        <section className="mb-16">
          <div className="text-muted-foreground jetbrains-mono flex items-center gap-1.5 text-xs tracking-tighter">Hey, it's me</div>
          <h1 className="font-doto text-4xl md:text-5xl font-bold tracking-tight mb-4">Harsh Jadhav</h1>
          <div className="text-muted-foreground jetbrains-mono flex items-center gap-1.5 text-xs tracking-tighter mb-8">@theharshjadhav</div>

          <div className="space-y-6 text-lg">
            <p className="text-sm text-muted-foreground">
              Yup! I'm a <span className="text-primary font-medium">Web Developer</span>. Big deal, right? But wait — there's more! I'm not just any developer, I'm a <span className="text-primary font-medium">Full Stack Developer</span>. And if that wasn't enough, guess what? maybe <span className="text-primary font-medium">Freelancer</span>? Oh yeah, I've got that badge too!
            </p>

            <p className="text-sm text-muted-foreground">
              I love both <span className="text-primary font-medium">Development</span> and <span className="text-primary font-medium">Design</span>, so, That means I can create beautiful and functional websites. I'm always looking for new opportunities to learn and grow.
            </p>
          </div>

          <div className="flex items-center gap-3 mt-8">
            <Link
              href="/contact"
              className="group relative px-3 py-1.5 text-xs font-medium text-foreground bg-white/5 border border-transparent hover:border-white/20 hover:bg-white/10 rounded-md transform hover:-translate-y-0.5 transition-all duration-200 ease-out active:translate-y-0"
            >
              <div className="flex items-center gap-1.5">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
                <span>Available for Hire</span>
              </div>
            </Link>

            <Link
              href="mailto:your.email@example.com"
              className="group relative px-3 py-1.5 text-xs font-medium text-foreground bg-white/5 border border-transparent hover:border-white/20 hover:bg-white/10 rounded-md transform hover:-translate-y-0.5 transition-all duration-200 ease-out active:translate-y-0"
            >
              <div className="flex items-center gap-1.5">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                </svg>
                <span>Email Me</span>
              </div>
            </Link>
          </div>
          {/* Enhanced GitHub Contributions Section */}
          <div className="my-8 py-1 px-0" id="experience">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-foreground">GitHub Activity</h3>
                <p className="text-sm text-muted-foreground">My coding journey over the past 6 months</p>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-sm bg-muted-foreground/20"></div>
                  <span>Less</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-sm bg-green-400"></div>
                  <span>More</span>
                </div>
              </div>
            </div>

            {hasError || contributions.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground border-2 border-dashed border-border rounded-xl">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <p className="font-medium mb-2">Unable to load GitHub contributions</p>
                <p className="text-sm mb-4">Check out my profile directly for the latest activity</p>
                <Link
                  href="https://github.com/jadhavharshh"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity text-sm"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  View on GitHub
                </Link>
              </div>
            ) : (
              <div className="relative overflow-hidden">
                {/* Gradient overlay for modern effect */}
                <div className="absolute inset-0 pointer-events-none rounded-lg"></div>

                <div className="relative bg-background/50 backdrop-blur-sm rounded-lg">
                  <div className="flex justify-center w-full">
                    <ActivityCalendar
                      data={contributions}
                      blockSize={11}
                      blockMargin={3}
                      fontSize={12}
                      colorScheme="dark"
                      maxLevel={4}
                      hideTotalCount={false}
                      hideColorLegend={false}
                      hideMonthLabels={false}
                      theme={{
                        dark: [
                          'rgb(22, 27, 34)',      // Very dark for no contributions
                          'rgb(14, 68, 41)',      // Dark green
                          'rgb(0, 109, 50)',      // Medium green  
                          'rgb(38, 166, 65)',     // Bright green
                          'rgb(57, 211, 83)'      // Very bright green
                        ],
                        light: [
                          'rgb(235, 237, 240)',   // Light gray
                          'rgb(155, 233, 168)',   // Light green
                          'rgb(64, 196, 99)',     // Medium green
                          'rgb(48, 161, 78)',     // Dark green
                          'rgb(33, 110, 57)'      // Very dark green
                        ],
                      }}
                      labels={{
                        months: [
                          'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                          'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
                        ],
                        weekdays: ['', 'M', '', 'W', '', 'F', ''],
                        totalCount: '{{count}} contributions in the last 6 months',
                      }}
                      style={{
                        color: 'rgb(139, 148, 158)',
                      }}
                    />
                  </div>
                </div>

              </div>
            )}
            <ExperienceSection />
          </div>
        </section>
        <ContactPlatforms />
        <div id="projects">        <ProjectsSection /></div>
        {/* About Section */}
        <section className="py-16">
          <div>
            <h2 className="font-doto font-bold text-3xl mb-6">About Me</h2>
            <p className="text-muted-foreground mb-4">
              I'm a passionate web developer with X years of experience building modern web applications.
              My focus is on creating clean, efficient, and user-friendly interfaces that deliver exceptional experiences.
            </p>
            <p className="text-muted-foreground mb-6">
              When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects,
              or enjoying outdoor activities.
            </p>
            <h3 className="font-doto font-bold text-2xl mb-4">My Skills</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {["JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS", "Node.js", "Git", "Figma"].map((skill) => (
                <div key={skill} className="bg-accent p-3 rounded-lg text-center text-accent-foreground">
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16" id="contact">
          <div className="text-center">
            <h2 className="font-doto font-bold text-3xl mb-6">Get In Touch</h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
              Interested in working together? Feel free to reach out for collaborations or just a friendly chat.
            </p>
            <Link href="mailto:your.email@example.com" className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity">
              Say Hello 👋
            </Link>
            <div className="flex justify-center gap-6 mt-10">
              {["GitHub", "LinkedIn", "Twitter", "Instagram"].map((platform) => (
                <Link key={platform} href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  {platform}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground">© {new Date().getFullYear()} Your Name. All rights reserved.</p>
            <p className="text-muted-foreground">Built with Next.js & Tailwind CSS</p>
          </div>
        </footer>
        <div className="fixed left-0 right-0 bottom-6 z-[100] flex justify-end md:justify-center items-center w-full pr-4 md:pr-0">
          <FloatingDockDemo />
        </div>
      </div>
    </div>
  );
}