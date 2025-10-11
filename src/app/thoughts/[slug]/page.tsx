"use client";
import Link from "next/link";
import React from "react";
import { useParams } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { FloatingDockDemo } from "@/components/sections/dock-example";

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
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center bg-background text-foreground">
        <div className="w-full max-w-[680px] mx-auto px-6 py-16">
          <Link 
            href="/thoughts" 
            className="text-sm text-muted-foreground hover:text-foreground transition-colors mb-8 inline-block"
          >
            ← Back to Thoughts
          </Link>
          <p className="text-sm text-muted-foreground">Post not found.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen flex flex-col items-center bg-background text-foreground">
        <div className="w-full max-w-[680px] mx-auto px-6 py-16">
          
          {/* Header */}
          <div className="mb-12">
            <Link 
              href="/thoughts" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors mb-8 inline-block"
            >
              ← Back to Thoughts
            </Link>
            <time className="text-xs text-muted-foreground block mb-4">
              {new Date(post.date).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </time>
            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
            {post.excerpt && (
              <p className="text-lg text-muted-foreground">{post.excerpt}</p>
            )}
          </div>

          {/* Content */}
          <article className="prose prose-sm prose-neutral dark:prose-invert max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {post.content}
            </ReactMarkdown>
          </article>

        </div>

        {/* Floating Dock */}
        <div className="fixed left-0 right-0 bottom-6 z-[100] flex justify-center items-center w-full">
          <FloatingDockDemo />
        </div>
      </div>
    </>
  );
}
