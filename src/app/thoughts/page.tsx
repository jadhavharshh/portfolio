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
          <div className="mb-12">
            <Link 
              href="/" 
              className="text-xs text-muted-foreground hover:text-foreground transition-colors mb-8 inline-block"
            >
              ← Back
            </Link>
            <h1 className="text-2xl font-bold mb-2">Thoughts</h1>
            <p className="text-sm text-muted-foreground">
              Random thoughts on code, tech, and things I'm building. Unfiltered.
            </p>
          </div>

          {/* Posts List */}
          {loading ? (
            <p className="text-sm text-muted-foreground">Loading...</p>
          ) : posts.length === 0 ? (
            <p className="text-sm text-muted-foreground">No thoughts yet.</p>
          ) : (
            <div className="space-y-6">
              {posts.map((post) => (
                <article
                  key={post.id}
                  className="flex justify-between gap-8 pb-6 border-b border-border last:border-b-0"
                >
                  <Link href={`/thoughts/${post.slug}`} className="flex-1 group">
                    <h2 className="text-sm font-medium mb-1 group-hover:text-muted-foreground transition-colors">
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p className="text-sm text-muted-foreground">
                        {post.excerpt}
                      </p>
                    )}
                  </Link>
                  <time className="text-sm text-muted-foreground whitespace-nowrap">
                    {new Date(post.date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </time>
                </article>
              ))}
            </div>
          )}

        </div>

        {/* Floating Dock */}
        <div className="fixed left-0 right-0 bottom-6 z-[100] flex justify-center items-center w-full">
          <FloatingDockDemo />
        </div>
      </div>
    </>
  );
}
