"use client";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import { FloatingDockDemo } from "@/components/sections/dock-example";

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
        <div className="w-full max-w-[680px] mx-auto px-6 py-16">
          
          {/* Header */}
          <div className="mb-20">
            <Link 
              href="/" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors mb-8 inline-block"
            >
              ← Back
            </Link>
            <h1 className="text-4xl font-bold mb-4">Thoughts</h1>
            <p className="text-sm text-muted-foreground">
              Writing about development, design, and things I'm learning.
            </p>
          </div>

          {/* Posts List */}
          <div className="space-y-8">
            {loading ? (
              <p className="text-sm text-muted-foreground">Loading thoughts...</p>
            ) : posts.length === 0 ? (
              <p className="text-sm text-muted-foreground">No thoughts yet. Check back soon!</p>
            ) : (
              posts.map((post) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="pb-8 border-b border-border last:border-b-0"
                >
                  <Link href={`/thoughts/${post.slug}`} className="group">
                    <time className="text-xs text-muted-foreground">
                      {new Date(post.date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </time>
                    <h2 className="text-xl font-bold mt-2 mb-2 group-hover:text-muted-foreground transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      {post.excerpt}
                    </p>
                  </Link>
                </motion.article>
              ))
            )}
          </div>

        </div>

        {/* Floating Dock */}
        <div className="fixed left-0 right-0 bottom-6 z-[100] flex justify-center items-center w-full">
          <FloatingDockDemo />
        </div>
      </div>
    </>
  );
}
