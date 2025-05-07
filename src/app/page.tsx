import { ModeToggle } from "@/components/ui/mode-toggle";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background main-page">
      {/* Main content container with max width */}
      <div className="w-full max-w-[1200px] mx-auto">
        {/* Hero Section */}
        <section className="flex flex-col md:flex-row items-center justify-between py-20 px-6 md:px-10 gap-10">
          <div className="flex-1 space-y-6">
            <h1 className="font-doto font-bold text-5xl md:text-6xl">
              <span className="text-primary">Hello, I'm</span>
              <br />
              <span>Your Name</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-md">
              Frontend Developer specializing in creating engaging, accessible web experiences with modern frameworks.
            </p>
            <div className="flex gap-4 pt-4">
              <Link href="/projects" className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity">
                View Projects
              </Link>
              <Link href="/contact" className="px-6 py-3 border border-border rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors">
                Contact Me
              </Link>
            </div>
          </div>
          <div className="flex-1 flex justify-center">
            <div className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-primary">
              {/* Replace with your actual profile image */}
              <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground">
                Profile Image
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Full-width background sections with content constrained */}
      <div className="w-full bg-secondary">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">
          {/* Featured Projects */}
          <section className="py-16">
            <h2 className="font-doto font-bold text-3xl md:text-4xl mb-10 text-center">Featured Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((project) => (
                <div key={project} className="bg-card text-card-foreground rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
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
        </div>
      </div>

      <div className="w-full max-w-[1200px] mx-auto px-6 md:px-10">
        {/* About Section */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-doto font-bold text-3xl md:text-4xl mb-6">About Me</h2>
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
      </div>

      <div className="w-full bg-secondary">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">
          {/* Contact Section */}
          <section className="py-16">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="font-doto font-bold text-3xl md:text-4xl mb-6">Get In Touch</h2>
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
        </div>
      </div>

      <div className="w-full border-t border-border">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">
          {/* Footer */}
          <footer className="py-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-muted-foreground">© {new Date().getFullYear()} Your Name. All rights reserved.</p>
              <p className="text-muted-foreground">Built with Next.js & Tailwind CSS</p>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}