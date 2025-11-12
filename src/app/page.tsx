"use client";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import ExperienceSection from "@/components/sections/ExperienceSection";
import EducationSection from "@/components/sections/EducationSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import { FloatingDockDemo } from "@/components/sections/dock-example";
import Header from "@/components/layout/Header";

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
        <div className="new-container relative !border-none sm:!border-dashed w-full">
          <Header />
          
          {/* Hero Section */}
          <motion.section 
            className="flex flex-col gap-6 border-b border-dashed px-4 sm:px-6 py-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {/* Availability Badge */}
            <div className="flex items-center gap-2 px-3 py-1.5 border border-dashed rounded-sm bg-muted/20 w-fit">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="jetbrains-mono text-[10px] tracking-tight text-muted-foreground">Available for hire</span>
            </div>

            <div className="flex flex-col gap-2">
              <div className="jetbrains-mono text-muted-foreground text-xs tracking-tight uppercase opacity-70">Hey, it's me</div>
              <h1 className="instrument-serif text-5xl md:text-6xl font-normal tracking-tight">Harsh Jadhav</h1>
              <div className="jetbrains-mono text-muted-foreground text-xs tracking-tight opacity-70">@theharshjadhav</div>
            </div>

            <p className="jetbrains-mono text-sm text-muted-foreground max-w-xl tracking-tight">
              Building things that people use. Shipping fast, learning faster.<br/><br/>
              Currently neck-deep in <span className="text-foreground font-medium">Solana</span> and <span className="text-foreground font-medium">Web3</span>, exploring AI, freelancing, and occasionally touching grass.<br/><br/>
              If it compiles and works, it ships.
            </p>
          </motion.section>

          {/* Work Experience */}
          <motion.section 
            className="flex flex-col gap-6 border-b border-dashed px-4 sm:px-6 py-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          >
            <h2 className="jetbrains-mono text-sm font-medium tracking-tight">Experience</h2>
            <ExperienceSection />
          </motion.section>

          {/* Education */}
          <motion.section 
            className="flex flex-col gap-6 border-b border-dashed px-4 sm:px-6 py-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          >
            <h2 className="jetbrains-mono text-sm font-medium tracking-tight">Education</h2>
            <EducationSection />
          </motion.section>

          {/* Skills */}
          <motion.section 
            className="flex flex-col gap-6 border-b border-dashed px-4 sm:px-6 py-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
          >
            <h2 className="jetbrains-mono text-sm font-medium tracking-tight">Skills</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {["JavaScript", "TypeScript", "React", "Next.js", "Node.js", "Express", "MongoDB", "PostgreSQL", "Python", "TailwindCSS", "Git", "Docker", "AI/ML"].map((skill) => (
                <div key={skill} className="flex items-center justify-center px-4 py-3 border border-dashed rounded-sm bg-muted/20">
                  <span className="jetbrains-mono text-xs text-muted-foreground tracking-tight">{skill}</span>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Projects */}
          <motion.section 
            className="flex flex-col gap-6 border-b border-dashed px-4 sm:px-6 py-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
          >
            <ProjectsSection />
          </motion.section>

          {/* Newsletter Subscribe */}
          <motion.section 
            className="flex flex-col gap-6 border-b border-dashed px-4 sm:px-6 py-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
          >
            <h2 className="jetbrains-mono text-sm font-medium tracking-tight">Subscribe</h2>
            <p className="jetbrains-mono text-xs text-muted-foreground tracking-tight">Get notified when I publish something new.</p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="flex-1 px-3 py-2 jetbrains-mono text-xs bg-background border border-dashed rounded-sm focus:outline-none focus:border-foreground/40 transition-colors"
                required
                disabled={isSubmitting}
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 jetbrains-mono text-xs border border-dashed rounded-sm hover:bg-muted/20 transition-colors disabled:opacity-50"
              >
                {isSubmitting ? '...' : 'Subscribe'}
              </button>
            </form>
            {message && (
              <p className="jetbrains-mono text-xs mt-2 text-muted-foreground tracking-tight">{message}</p>
            )}
          </motion.section>

          {/* Footer */}
          <motion.section
            className="flex flex-col gap-4 px-4 sm:px-6 py-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
          >
            <p className="jetbrains-mono text-xs text-muted-foreground tracking-tight text-center">
              © 2024 Harsh Jadhav. Built with Next.js
            </p>
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
