"use client";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import { FloatingDockDemo } from "@/components/sections/dock-example";
import Header from "@/components/layout/Header";

type Post = {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  slug: string;
};

export default function Thoughts() {
  const [posts, setPosts] = React.useState<Post[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetch('/api/thoughts')
      .then(res => res.json())
      .then(data => {
        setPosts(data.posts || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <>
      <div className="min-h-screen flex flex-col items-center bg-background text-foreground">
        <div className="new-container relative !border-none sm:!border-dashed w-full">
          <Header />
          
          {/* Page Header */}
          <motion.section 
            className="flex flex-col gap-6 border-b border-dashed px-4 sm:px-6 py-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div className="flex flex-col gap-2">
              <h1 className="instrument-serif text-5xl md:text-6xl font-normal tracking-tight">Thoughts</h1>
              <p className="jetbrains-mono text-sm text-muted-foreground max-w-xl tracking-tight">
                Random thoughts on code, tech, and things I'm building. Unfiltered.
              </p>
            </div>
          </motion.section>

          {/* Posts List */}
          <motion.section 
            className="flex flex-col gap-6 px-4 sm:px-6 py-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          >
            {loading ? (
              <p className="jetbrains-mono text-xs text-muted-foreground tracking-tight">Loading...</p>
            ) : posts.length === 0 ? (
              <div className="flex flex-col gap-3 border border-dashed rounded-sm p-8 bg-muted/20 text-center">
                <p className="jetbrains-mono text-xs text-muted-foreground tracking-tight">No thoughts yet.</p>
                <p className="jetbrains-mono text-[10px] text-muted-foreground tracking-tight opacity-70">Check back soon!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-3">
                {posts.map((post) => (
                  <Link 
                    key={post.id} 
                    href={`/thoughts/${post.slug}`}
                    className="flex flex-col gap-3 border border-dashed rounded-sm p-4 bg-muted/20 hover:bg-muted/30 transition-colors group"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <h2 className="jetbrains-mono text-sm font-medium tracking-tight group-hover:text-foreground transition-colors">
                        {post.title}
                      </h2>
                      <time className="jetbrains-mono text-[10px] text-muted-foreground tracking-tight whitespace-nowrap mt-0.5">
                        {new Date(post.date).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </time>
                    </div>
                    {post.excerpt && (
                      <p className="jetbrains-mono text-xs text-muted-foreground tracking-tight">
                        {post.excerpt}
                      </p>
                    )}
                  </Link>
                ))}
              </div>
            )}
          </motion.section>

          {/* Footer */}
          <motion.section
            className="flex flex-col gap-4 px-4 sm:px-6 py-8 border-t border-dashed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
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
