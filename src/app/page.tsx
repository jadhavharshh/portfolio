"use client";
import { ModeToggle } from "@/components/ui/mode-toggle";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";


const ActivityCalendar = dynamic(
  () => import("react-activity-calendar").then((mod) => mod.default),
  { ssr: false }
);

type ContributionItem = {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
};


export default function Home() {
  const [contributions, setContributions] = useState<ContributionItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("https://github-contributions-api.deno.dev/jadhavharshh.json");
        const data = await res.json();
        console.log("Fetched GitHub data:", data); // Debug log

        if (data?.contributions && Array.isArray(data.contributions) && data.contributions.length > 0) {
          // Validate and transform each contribution to ensure it has the required format
          const validContributions = data.contributions
            .filter((item: any) => item && typeof item === 'object' && item.date)
            .map((item: any) => ({
              date: String(item.date),
              count: Number(item.count) || 0,
              level: (Number(item.level) || 0) as 0 | 1 | 2 | 3 | 4
            }));

          console.log(`Found ${validContributions.length} valid contributions`); // Debug log
          
          if (validContributions.length > 0) {
            setContributions(validContributions);
            setIsLoaded(true);
          } else {
            // No valid contributions after filtering
            setHasError(true);
            setIsLoaded(true);
          }
        } else {
          // No contributions data in response
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
        {/* Hero Section - Styled like legions.dev */}
        <section className="mb-16">
          <div className="text-muted-foreground jetbrains-mono flex items-center gap-1.5 text-xs tracking-tighter ">Hey, it's me</div>
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

          <div className="flex items-center gap-4 mt-8">
            <Link href="/contact" className="px-5 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-opacity inline-flex items-center gap-2">
              <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span> Available for Hire
            </Link>
            <Link href="mailto:your.email@example.com" className="px-5 py-2 border border-border rounded-md hover:bg-accent hover:text-accent-foreground transition-colors">
              Email Me
            </Link>

            <div className="ml-auto">
              <div className="text-xs text-muted-foreground mb-1">Your Request</div>
              <Link href="/contact" className="px-4 py-1.5 bg-secondary text-secondary-foreground rounded-md hover:opacity-90 transition-opacity">
                Request
              </Link>
            </div>
          </div>
          <div className="my-6 p-4 bg-card rounded-lg border border-border">
            <div className="text-sm text-muted-foreground mb-2">GitHub Contributions</div>
            {hasError || contributions.length === 0 ? (
              <div className="p-4 text-center text-muted-foreground">
                <p>Unable to load GitHub contributions at this time.</p>
                <p className="text-xs mt-2">
                  <Link href="https://github.com/jadhavharshh" className="text-primary hover:underline">
                    View Profile on GitHub →
                  </Link>
                </p>
              </div>
            ) : (
              <>
                <ActivityCalendar
                  data={contributions}
                  blockSize={12}
                  blockMargin={4}
                  fontSize={14}
                  colorScheme="dark"
                  theme={{
                    dark: ['#2c2f33', '#5865f2', '#5865f2', '#5865f2', '#5865f2'],
                    light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
                  }}
                  labels={{
                    months: [
                      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
                    ],
                    weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                    totalCount: '{{count}} contributions in the last year',
                  }}
                />

                <div className="text-xs text-muted-foreground text-right mt-2">
                  <Link href="https://github.com/jadhavharshh" className="hover:text-foreground transition-colors">
                    View on GitHub →
                  </Link>
                </div>
              </>
            )}
          </div>
        </section>

        {/* Featured Projects */}
        <section className="py-16">
          <h2 className="font-doto font-bold text-3xl mb-10">Featured Projects</h2>
          <div className="grid grid-cols-1 gap-8">
            {[1, 2, 3].map((project) => (
              <div key={project} className="bg-card text-card-foreground rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow border border-border">
                <div className="h-48 bg-muted flex items-center justify-center">
                  Project Screenshot
                </div>
                <div className="p-6">
                  <h3 className="font-doto font-bold text-xl mb-2">Project Title {project}</h3>
                  <p className="text-muted-foreground mb-4">A brief description of this project and the technologies used to build it.</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-accent text-accent-foreground rounded-full text-sm">React</span>
                    <span className="px-3 py-1 bg-accent text-accent-foreground rounded-full text-sm">TypeScript</span>
                  </div>
                  <div className="flex gap-3 mt-4">
                    <Link href="#" className="text-primary hover:underline">View Project</Link>
                    <Link href="#" className="text-primary hover:underline">GitHub</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

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
        <section className="py-16">
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
      </div>
    </div>
  );
}