"use client";
import Link from "next/link";
import React from "react";
import { useParams } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { motion } from "framer-motion";
import { FloatingDockDemo } from "@/components/sections/dock-example";
import Header from "@/components/layout/Header";

type Post = {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  slug: string;
};

export default function ThoughtPost() {
  const params = useParams();
  const slug = params.slug as string;
  const [post, setPost] = React.useState<Post | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetch(`/api/thoughts/${slug}`)
      .then(res => res.json())
      .then(data => {
        setPost(data.post || null);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <p className="jetbrains-mono text-xs text-muted-foreground tracking-tight">Loading...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center bg-background text-foreground">
        <div className="new-container relative !border-none sm:!border-dashed w-full">
          <Header />
          <motion.section 
            className="flex flex-col gap-6 px-4 sm:px-6 py-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <Link 
              href="/thoughts" 
              className="jetbrains-mono text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              ← Back to Thoughts
            </Link>
            <div className="flex flex-col gap-3 border border-dashed rounded-sm p-8 bg-muted/20 text-center">
              <p className="jetbrains-mono text-xs text-muted-foreground tracking-tight">Post not found.</p>
            </div>
          </motion.section>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen flex flex-col items-center bg-background text-foreground">
        <div className="new-container relative !border-none sm:!border-dashed w-full">
          <Header />
          
          {/* Post Header */}
          <motion.section 
            className="flex flex-col gap-6 border-b border-dashed px-4 sm:px-6 py-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <Link 
              href="/thoughts" 
              className="jetbrains-mono text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              ← Back to Thoughts
            </Link>
            
            <div className="flex flex-col gap-4">
              <time className="jetbrains-mono text-[10px] text-muted-foreground tracking-tight uppercase">
                {new Date(post.date).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </time>
              <h1 className="instrument-serif text-4xl md:text-5xl font-normal tracking-tight">{post.title}</h1>
              {post.excerpt && (
                <p className="jetbrains-mono text-sm text-muted-foreground tracking-tight">{post.excerpt}</p>
              )}
            </div>
          </motion.section>

          {/* Content */}
          <motion.section
            className="px-4 sm:px-6 py-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          >
            <article className="prose prose-sm prose-neutral dark:prose-invert max-w-none
              prose-headings:font-normal prose-headings:tracking-tight
              prose-h1:text-2xl prose-h1:mb-4
              prose-h2:text-xl prose-h2:mb-3
              prose-h3:text-lg prose-h3:mb-2
              prose-p:jetbrains-mono prose-p:text-sm prose-p:leading-relaxed
              prose-a:text-foreground prose-a:underline prose-a:decoration-muted-foreground
              prose-code:jetbrains-mono prose-code:text-xs
              prose-pre:bg-muted/20 prose-pre:border prose-pre:border-dashed
              prose-ul:jetbrains-mono prose-ul:text-sm
              prose-ol:jetbrains-mono prose-ol:text-sm
              prose-li:marker:text-muted-foreground">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {post.content}
              </ReactMarkdown>
            </article>
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
