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
import { motion } from "framer-motion";
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
  const [welcomeIndex, setWelcomeIndex] = useState(0);
  const [welcomeComplete, setWelcomeComplete] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [chartReady, setChartReady] = useState(false);


  // Welcome messages in different languages
  const welcomeMessages = [
    "Welcome", // English
    "Bienvenue", // French
    "Bienvenido", // Spanish
    "Willkommen", // German
    "Benvenuto", // Italian
    "ようこそ", // Japanese
    "欢迎", // Chinese
    "환영합니다", // Korean
    "Selamat Datang", // Indonesian
    "Добро пожаловать", // Russian
  ];
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
            setDataLoaded(true); // Mark data as loaded but don't show content yet
          } else {
            setHasError(true);
            setDataLoaded(true);
          }
        } else {
          setHasError(true);
          setDataLoaded(true);
        }
      } catch (err) {
        console.error("Failed to fetch GitHub contributions:", err);
        setHasError(true);
        setDataLoaded(true);
      }
    }
    fetchData();
  }, []);

  // Effect to cycle through welcome messages
  // Effect to cycle through welcome messages
  useEffect(() => {
    if (!isLoaded) {
      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex < welcomeMessages.length - 1) {
          currentIndex++;
          setWelcomeIndex(currentIndex);
        } else {
          // We've gone through all messages
          setWelcomeComplete(true);
          clearInterval(interval);
        }
      }, 300); // Much faster rotation - 300ms per message (3 seconds total)

      return () => clearInterval(interval);
    }
  }, [isLoaded, welcomeMessages.length]);

  // Effect to control when to actually show the main content
  useEffect(() => {
    // Only show main content when both data is loaded AND welcome messages are complete
    if (dataLoaded && welcomeComplete) {
      // Add a small delay to ensure smooth transition
      setTimeout(() => setIsLoaded(true), 800);
    }
  }, [dataLoaded, welcomeComplete]);


  return (
    <>
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
          <div id="projects">
            <ProjectsSection />
          </div>
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
              <h3 className="font-doto font-bold text-2xl mb-6">My Skills</h3>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                {/* Frontend Category */}
                <div className="col-span-2 md:col-span-1">
                  <h4 className="text-primary text-sm font-medium uppercase tracking-wide mb-4">Frontend</h4>
                  <div className="space-y-3">
                    {[
                      { name: "React", level: 90 },
                      { name: "TypeScript", level: 85 },
                      { name: "Next.js", level: 80 },
                      { name: "Tailwind CSS", level: 95 },
                    ].map((skill) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        viewport={{ once: true }}
                        className="group"
                      >
                        <div className="flex justify-between items-center mb-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">{skill.name}</span>
                          </div>
                          <span className="text-xs text-muted-foreground">{skill.level}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-accent/30 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-gradient-to-r from-primary/80 to-primary rounded-full"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            transition={{ duration: 1, delay: 0.1 }}
                            viewport={{ once: true }}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Backend Category */}
                <div className="col-span-2 md:col-span-1">
                  <h4 className="text-primary text-sm font-medium uppercase tracking-wide mb-4">Backend</h4>
                  <div className="space-y-3">
                    {[
                      { name: "Node.js", level: 85 },
                      { name: "Express", level: 80 },
                      { name: "MongoDB", level: 75 },
                      { name: "REST API", level: 90 },
                    ].map((skill) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        viewport={{ once: true }}
                        className="group"
                      >
                        <div className="flex justify-between items-center mb-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">{skill.name}</span>
                          </div>
                          <span className="text-xs text-muted-foreground">{skill.level}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-accent/30 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-gradient-to-r from-primary/80 to-primary rounded-full"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            transition={{ duration: 1, delay: 0.1 }}
                            viewport={{ once: true }}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Tools Category */}
                <div className="col-span-2 md:col-span-1">
                  <h4 className="text-primary text-sm font-medium uppercase tracking-wide mb-4">Tools & Others</h4>
                  <div className="space-y-3">
                    {[
                      { name: "Git", level: 85 },
                      { name: "Figma", level: 80 },
                      { name: "Docker", level: 70 },
                      { name: "CI/CD", level: 75 },
                    ].map((skill) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        viewport={{ once: true }}
                        className="group"
                      >
                        <div className="flex justify-between items-center mb-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">{skill.name}</span>
                          </div>
                          <span className="text-xs text-muted-foreground">{skill.level}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-accent/30 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-gradient-to-r from-primary/80 to-primary rounded-full"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            transition={{ duration: 1, delay: 0.1 }}
                            viewport={{ once: true }}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Technology Badges */}
              <div className="mt-12">
                <h4 className="text-primary text-sm font-medium uppercase tracking-wide mb-4">Technologies I've Worked With</h4>
                <div className="flex flex-wrap gap-2">
                  {[
                    "JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS",
                    "Node.js", "Express", "MongoDB", "PostgreSQL", "Redux",
                    "GraphQL", "Firebase", "AWS", "Vercel", "Git", "Figma"
                  ].map((tech, index) => (
                    <motion.div
                      key={tech}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      viewport={{ once: true }}
                      whileHover={{ y: -4 }}
                      className="px-3 py-1.5 bg-card/30 backdrop-blur-sm border border-border/40 rounded-full text-xs font-medium hover:border-white/20 hover:bg-white/10 transition-all duration-300"
                    >
                      {tech}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          {/* Contact Section */}
          <section className="py-16" id="contact">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-2xl border border-border/40 bg-card/20 p-8"
            >
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl" />

              <div className="relative z-10">
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  <div className="w-full md:w-3/5">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                      viewport={{ once: true }}
                    >
                      <h2 className="font-doto font-bold text-3xl mb-4">Let's Create Something Amazing</h2>
                      <p className="text-muted-foreground mb-6">
                        Have a project in mind or just want to chat about tech? I'm always open to discussing new opportunities and ideas.
                      </p>

                      <div className="space-y-4">
                        <motion.div
                          className="flex items-center gap-3 group"
                          whileHover={{ x: 5 }}
                          transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                            </svg>
                          </div>
                          <div>
                            <p className="text-sm font-medium group-hover:text-primary transition-colors">Email Me</p>
                            <Link
                              href="mailto:your.email@example.com"
                              className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                            >
                              your.email@example.com
                            </Link>
                          </div>
                        </motion.div>

                        <motion.div
                          className="flex items-center gap-3 group"
                          whileHover={{ x: 5 }}
                          transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                            </svg>
                          </div>
                          <div>
                            <p className="text-sm font-medium group-hover:text-primary transition-colors">Location</p>
                            <p className="text-muted-foreground text-sm">Mumbai, India</p>
                          </div>
                        </motion.div>
                      </div>
                    </motion.div>
                  </div>

                  <div className="w-full md:w-2/5">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      viewport={{ once: true }}
                      className="bg-background/50 backdrop-blur-sm p-6 rounded-xl border border-border/40"
                    >
                      <h3 className="font-medium text-lg mb-4">Ready to Start?</h3>
                      <Link
                        href="mailto:your.email@example.com"
                        className="flex items-center justify-center w-full gap-2 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-all hover:-translate-y-0.5 active:translate-y-0 duration-200"
                      >
                        <span>Say Hello</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                      </Link>

                      <div className="mt-6 pt-6 border-t border-border/40">
                        <p className="text-xs text-muted-foreground mb-3">Typical response time: within 24 hours</p>
                        <div className="flex gap-1.5">
                          {[...Array(5)].map((_, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0 }}
                              whileInView={{ opacity: 1 }}
                              transition={{ delay: 0.4 + (i * 0.1) }}
                              viewport={{ once: true }}
                              className="w-8 h-1 rounded-full bg-primary"
                            />
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </section>

          {/* Footer */}
          <footer className="py-8 border-t border-border">
            <div className="flex flex-col text-center justify-between items-center">
              <p className="text-muted-foreground">© {new Date().getFullYear()} Harsh Jadhav. All rights reserved.</p>
            </div>
          </footer>
          <div className="fixed left-0 right-0 bottom-6 z-[100] flex justify-end md:justify-center items-center w-full pr-4 md:pr-0">
            <FloatingDockDemo />
          </div>
        </div>
      </div>    {!isLoaded && (
        <motion.div
          className="fixed inset-0 z-1000 bg-black flex items-center justify-center"
          initial={{ y: 0 }}
          animate={welcomeComplete ? {
            y: "-100%",
            transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.5 }
          } : { y: 0 }}
        >
          <motion.div
            className="z-[51] flex flex-col items-center justify-center pointer-events-none"
            animate={welcomeComplete ? {
              opacity: 0,
              transition: { duration: 0.3 }
            } : { opacity: 1 }}
          >
            <motion.div
              key={welcomeIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="text-5xl text-white font-doto font-bold mb-6"
            >
              {welcomeMessages[welcomeIndex]}
            </motion.div>
          </motion.div>
        </motion.div>
      )}

    </>
  );
}