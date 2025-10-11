"use client";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import ExperienceSection from "@/components/sections/ExperienceSection";
import EducationSection from "@/components/sections/EducationSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import { FloatingDockDemo } from "@/components/sections/dock-example";

export default function Home() {
  const [email, setEmail] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [message, setMessage] = React.useState('');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage('Thanks for subscribing!');
        setEmail('');
      } else {
        setMessage(data.error || 'Something went wrong');
      }
    } catch (error) {
      setMessage('Failed to subscribe');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="min-h-screen flex flex-col items-center bg-background text-foreground">
        <div className="w-full max-w-[680px] mx-auto px-6 py-16">
          
          {/* Introduction */}
          <motion.section 
            className="mb-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div className="text-muted-foreground jetbrains-mono flex items-center gap-1.5 text-xs tracking-tighter uppercase opacity-70">Hey, it's me</div>
            <h1 className="font-doto text-5xl md:text-6xl font-bold tracking-tight mb-4">Harsh Jadhav</h1>
            <div className="text-muted-foreground jetbrains-mono flex items-center gap-1.5 text-xs tracking-tighter mb-8 opacity-70">@theharshjadhav</div>

            <p className="text-sm text-muted-foreground max-w-xl">
              Full-stack developer building modern web applications. Currently exploring <span className="text-foreground font-medium">AI/ML</span> while freelancing and creating <span className="text-foreground font-medium">beautiful, functional websites</span>.
            </p>
          </motion.section>

          {/* Work Experience - Minimal */}
          <motion.section 
            className="mb-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          >
            <h2 className="text-2xl font-bold mb-8">Experience</h2>
            <ExperienceSection />
          </motion.section>

          {/* Education */}
          <motion.section 
            className="mb-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          >
            <h2 className="text-2xl font-bold mb-8">Education</h2>
            <EducationSection />
          </motion.section>

          {/* Skills */}
          <motion.section 
            className="mb-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
          >
            <h2 className="text-2xl font-bold mb-8">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {["JavaScript", "TypeScript", "React", "Next.js", "Node.js", "Express", "MongoDB", "PostgreSQL", "Python", "TailwindCSS", "Git", "Docker", "AI/ML"].map((skill) => (
                <span key={skill} className="px-3 py-1 text-sm border border-border rounded-md text-muted-foreground">
                  {skill}
                </span>
              ))}
            </div>
          </motion.section>

          {/* Projects */}
          <motion.section 
            className="mb-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
          >
            <ProjectsSection />
          </motion.section>

          {/* Newsletter Subscribe */}
          <motion.section 
            className="mb-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
          >
            <h2 className="text-2xl font-bold mb-4">Subscribe</h2>
            <p className="text-sm text-muted-foreground mb-6">Get notified when I publish something new.</p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="flex-1 px-3 py-2 text-sm bg-background border border-border rounded focus:outline-none focus:border-foreground/40 transition-colors"
                required
                disabled={isSubmitting}
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 text-sm border border-border rounded hover:bg-secondary transition-colors disabled:opacity-50"
              >
                {isSubmitting ? '...' : 'Subscribe'}
              </button>
            </form>
            {message && (
              <p className="text-xs mt-2 text-muted-foreground">{message}</p>
            )}
          </motion.section>
        </div>

        {/* Floating Dock */}
        <div className="fixed left-0 right-0 bottom-6 z-[100] flex justify-center items-center w-full">
          <FloatingDockDemo />
        </div>
      </div>
    </>
  );
}
