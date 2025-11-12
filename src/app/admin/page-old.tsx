"use client";
import React from "react";
import { useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function Admin() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loginError, setLoginError] = React.useState("");

  // Post form
  const [title, setTitle] = React.useState("");
  const [slug, setSlug] = React.useState("");
  const [excerpt, setExcerpt] = React.useState("");
  const [content, setContent] = React.useState("");
  const [showPreview, setShowPreview] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [message, setMessage] = React.useState("");

  React.useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("adminToken", data.token);
        setIsAuthenticated(true);
      } else {
        setLoginError(data.error || "Login failed");
      }
    } catch (error) {
      setLoginError("Login failed");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setIsAuthenticated(false);
    router.push("/");
  };

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (!slug) {
      setSlug(generateSlug(value));
    }
  };

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    try {
      const res = await fetch("/api/thoughts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, slug, excerpt, content }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Post published successfully!");
        setTitle("");
        setSlug("");
        setExcerpt("");
        setContent("");
        setTimeout(() => router.push("/thoughts"), 1500);
      } else {
        setMessage(data.error || "Failed to publish");
      }
    } catch (error) {
      setMessage("Failed to publish");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <div className="w-full max-w-md px-6">
          <h1 className="text-3xl font-bold mb-8 text-center">Admin Login</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                className="w-full px-4 py-2 text-sm bg-background border border-border rounded focus:outline-none focus:border-foreground/40"
                required
              />
            </div>
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full px-4 py-2 text-sm bg-background border border-border rounded focus:outline-none focus:border-foreground/40"
                required
              />
            </div>
            {loginError && (
              <p className="text-xs text-red-500">{loginError}</p>
            )}
            <button
              type="submit"
              className="w-full px-4 py-2 text-sm border border-border rounded hover:bg-secondary transition-colors"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="w-full max-w-7xl mx-auto px-6 py-8">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Panel</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm border border-border rounded hover:bg-secondary transition-colors"
          >
            Logout
          </button>
        </div>

        {/* Editor Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Editor */}
          <div>
            <h2 className="text-xl font-bold mb-4">Create Post</h2>
            <form onSubmit={handlePublish} className="space-y-4">
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="Post title"
                  className="w-full px-3 py-2 text-sm bg-background border border-border rounded focus:outline-none focus:border-foreground/40"
                  required
                />
              </div>

              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Slug</label>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="post-slug"
                  className="w-full px-3 py-2 text-sm bg-background border border-border rounded focus:outline-none focus:border-foreground/40"
                  required
                />
              </div>

              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Excerpt</label>
                <textarea
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="Short description..."
                  className="w-full px-3 py-2 text-sm bg-background border border-border rounded focus:outline-none focus:border-foreground/40 h-20 resize-none"
                />
              </div>

              <div>
                <label className="text-xs text-muted-foreground mb-1 block">
                  Content (Markdown supported)
                </label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write your post in markdown..."
                  className="w-full px-3 py-2 text-sm bg-background border border-border rounded focus:outline-none focus:border-foreground/40 h-96 resize-none font-mono"
                  required
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowPreview(!showPreview)}
                  className="flex-1 px-4 py-2 text-sm border border-border rounded hover:bg-secondary transition-colors"
                >
                  {showPreview ? "Hide Preview" : "Show Preview"}
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 px-4 py-2 text-sm bg-foreground text-background rounded hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  {isSubmitting ? "Publishing..." : "Publish"}
                </button>
              </div>

              {message && (
                <p className="text-xs text-muted-foreground">{message}</p>
              )}
            </form>
          </div>

          {/* Preview */}
          <div>
            <h2 className="text-xl font-bold mb-4">
              {showPreview ? "Preview" : "Preview (hidden)"}
            </h2>
            {showPreview && (
              <div className="border border-border rounded p-6">
                <time className="text-xs text-muted-foreground">
                  {new Date().toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
                <h1 className="text-3xl font-bold mt-4 mb-2">{title || "Untitled"}</h1>
                {excerpt && (
                  <p className="text-lg text-muted-foreground mb-6">{excerpt}</p>
                )}
                <div className="prose prose-sm prose-neutral dark:prose-invert max-w-none">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {content || "*No content yet...*"}
                  </ReactMarkdown>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
