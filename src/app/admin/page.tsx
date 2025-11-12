"use client";
import React from "react";
import { useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { motion } from "framer-motion";
import Header from "@/components/layout/Header";

type Post = {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content?: string;
  date: string;
};

export default function Admin() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loginError, setLoginError] = React.useState("");

  // View state
  const [view, setView] = React.useState<"list" | "create" | "edit">("list");
  
  // Posts list
  const [posts, setPosts] = React.useState<Post[]>([]);
  const [loading, setLoading] = React.useState(false);

  // Post form
  const [editingPost, setEditingPost] = React.useState<Post | null>(null);
  const [title, setTitle] = React.useState("");
  const [slug, setSlug] = React.useState("");
  const [excerpt, setExcerpt] = React.useState("");
  const [content, setContent] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [message, setMessage] = React.useState("");

  React.useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem("adminToken");
      if (token) {
        try {
          const res = await fetch('/api/auth/login', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          
          if (res.ok) {
            setIsAuthenticated(true);
            fetchPosts();
          } else {
            // Token expired or invalid
            localStorage.removeItem("adminToken");
            setIsAuthenticated(false);
          }
        } catch (error) {
          localStorage.removeItem("adminToken");
          setIsAuthenticated(false);
        }
      }
    };
    
    validateToken();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/thoughts');
      const data = await res.json();
      setPosts(data.posts || []);
    } catch (error) {
      console.error('Failed to fetch posts');
    } finally {
      setLoading(false);
    }
  };

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
        fetchPosts();
      } else {
        console.error('Login error:', data);
        setLoginError(data.error || "Login failed");
      }
    } catch (error) {
      console.error('Login exception:', error);
      setLoginError("Login failed - check console");
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
    if (!slug || !editingPost) {
      setSlug(generateSlug(value));
    }
  };

  const handleCreateNew = () => {
    setView("create");
    setEditingPost(null);
    setTitle("");
    setSlug("");
    setExcerpt("");
    setContent("");
    setMessage("");
  };

  const handleEditPost = async (post: Post) => {
    setView("edit");
    setEditingPost(post);
    setTitle(post.title);
    setSlug(post.slug);
    setExcerpt(post.excerpt);
    setMessage("");
    
    // Fetch full content
    try {
      const res = await fetch(`/api/thoughts/${post.slug}`);
      const data = await res.json();
      setContent(data.post?.content || "");
    } catch (error) {
      setContent("");
    }
  };

  const handleDeletePost = async (id: number) => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    try {
      const res = await fetch(`/api/thoughts?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        fetchPosts();
        setMessage("Post deleted successfully!");
        setTimeout(() => setMessage(""), 3000);
      }
    } catch (error) {
      setMessage("Failed to delete post");
    }
  };

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    try {
      if (editingPost) {
        // Update existing post
        const res = await fetch(`/api/thoughts/${editingPost.slug}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title, newSlug: slug, excerpt, content }),
        });

        const data = await res.json();

        if (res.ok) {
          setMessage("Post updated successfully!");
          fetchPosts();
          setTimeout(() => {
            setView("list");
            setMessage("");
          }, 1500);
        } else {
          setMessage(data.error || "Failed to update");
        }
      } else {
        // Create new post
        const res = await fetch("/api/thoughts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title, slug, excerpt, content }),
        });

        const data = await res.json();

        if (res.ok) {
          setMessage("Post published successfully!");
          fetchPosts();
          setTimeout(() => {
            setView("list");
            setMessage("");
          }, 1500);
        } else {
          setMessage(data.error || "Failed to publish");
        }
      }
    } catch (error) {
      setMessage("Failed to save post");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col bg-background text-foreground">
        <div className="new-container relative !border-none sm:!border-dashed w-full mx-auto flex-1 flex flex-col">
          <Header />
          
          <motion.section 
            className="flex-1 flex flex-col items-center justify-center gap-8 border-b border-dashed px-4 sm:px-6 py-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div className="flex flex-col gap-4 text-center">
              <h1 className="instrument-serif text-5xl md:text-6xl font-normal tracking-tight">Admin</h1>
              <p className="jetbrains-mono text-sm text-muted-foreground tracking-tight">
                Authenticate to manage posts
              </p>
            </div>

            <form onSubmit={handleLogin} className="flex flex-col gap-3 w-full max-w-sm">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                className="px-3 py-2 jetbrains-mono text-xs bg-background border border-dashed rounded-sm focus:outline-none focus:border-foreground/40 transition-colors"
                required
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="px-3 py-2 jetbrains-mono text-xs bg-background border border-dashed rounded-sm focus:outline-none focus:border-foreground/40 transition-colors"
                required
              />
              {loginError && (
                <p className="jetbrains-mono text-xs text-red-500 tracking-tight">{loginError}</p>
              )}
              <button
                type="submit"
                className="px-4 py-2 jetbrains-mono text-xs border border-dashed rounded-sm hover:bg-muted/20 transition-colors"
              >
                Login
              </button>
            </form>
          </motion.section>
        </div>
      </div>
    );
  }

  // Posts List View
  if (view === "list") {
    return (
      <div className="min-h-screen flex flex-col bg-background text-foreground">
        <div className="new-container relative !border-none sm:!border-dashed w-full mx-auto min-h-screen flex flex-col">
          <Header />
          
          {/* Admin Header */}
          <motion.section 
            className="flex flex-col gap-6 border-b border-dashed px-4 sm:px-6 py-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex flex-col gap-2">
                <h1 className="instrument-serif text-5xl md:text-6xl font-normal tracking-tight">Admin</h1>
                <p className="jetbrains-mono text-sm text-muted-foreground tracking-tight">
                  Manage your posts
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleCreateNew}
                  className="px-3 py-1.5 jetbrains-mono text-[10px] border border-dashed rounded-sm bg-muted/20 hover:bg-muted/30 transition-colors"
                >
                  [NEW POST]
                </button>
                <button
                  onClick={handleLogout}
                  className="px-3 py-1.5 jetbrains-mono text-[10px] border border-dashed rounded-sm bg-muted/20 hover:bg-muted/30 transition-colors"
                >
                  [LOGOUT]
                </button>
              </div>
            </div>
          </motion.section>

          {/* Posts List */}
          <motion.section 
            className="flex flex-col gap-6 px-4 sm:px-6 py-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          >
            {message && (
              <div className="flex items-center gap-2 px-3 py-1.5 border border-dashed rounded-sm bg-muted/20">
                <span className="jetbrains-mono text-xs tracking-tight text-green-500">{message}</span>
              </div>
            )}

            {loading ? (
              <p className="jetbrains-mono text-xs text-muted-foreground tracking-tight">Loading...</p>
            ) : posts.length === 0 ? (
              <div className="flex flex-col gap-3 border border-dashed rounded-sm p-8 bg-muted/20 text-center">
                <p className="jetbrains-mono text-xs text-muted-foreground tracking-tight">No posts yet.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-3">
                {posts.map((post) => (
                  <div 
                    key={post.id} 
                    className="flex items-start justify-between gap-4 border border-dashed rounded-sm p-4 bg-muted/20"
                  >
                    <div className="flex-1">
                      <h2 className="jetbrains-mono text-sm font-medium tracking-tight mb-1">
                        {post.title}
                      </h2>
                      {post.excerpt && (
                        <p className="jetbrains-mono text-xs text-muted-foreground tracking-tight">
                          {post.excerpt}
                        </p>
                      )}
                      <time className="jetbrains-mono text-[10px] text-muted-foreground tracking-tight mt-2 block">
                        {new Date(post.date).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </time>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditPost(post)}
                        className="px-2 py-1 jetbrains-mono text-[10px] border border-dashed rounded-sm hover:bg-muted/30 transition-colors"
                      >
                        EDIT
                      </button>
                      <button
                        onClick={() => handleDeletePost(post.id)}
                        className="px-2 py-1 jetbrains-mono text-[10px] border border-dashed rounded-sm hover:bg-red-500/20 transition-colors text-red-500"
                      >
                        DELETE
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.section>
        </div>
      </div>
    );
  }

  // Create/Edit Form View
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <div className="new-container relative !border-none sm:!border-dashed w-full mx-auto min-h-screen flex flex-col">
        <Header />
        
        {/* Form Header */}
        <motion.section 
          className="flex flex-col gap-6 border-b border-dashed px-4 sm:px-6 py-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-2">
              <h1 className="instrument-serif text-4xl md:text-5xl font-normal tracking-tight">
                {editingPost ? "Edit Post" : "Create Post"}
              </h1>
            </div>
            <button
              onClick={() => setView("list")}
              className="px-3 py-1.5 jetbrains-mono text-[10px] border border-dashed rounded-sm bg-muted/20 hover:bg-muted/30 transition-colors"
            >
              [BACK]
            </button>
          </div>
        </motion.section>

        {/* Form */}
        <motion.section 
          className="px-4 sm:px-6 py-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
        >
          <form onSubmit={handlePublish} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Editor */}
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label className="jetbrains-mono text-[10px] text-muted-foreground tracking-tight uppercase">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="Post title"
                  className="px-3 py-2 jetbrains-mono text-xs bg-background border border-dashed rounded-sm focus:outline-none focus:border-foreground/40"
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="jetbrains-mono text-[10px] text-muted-foreground tracking-tight uppercase">Slug</label>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="post-slug"
                  className="px-3 py-2 jetbrains-mono text-xs bg-background border border-dashed rounded-sm focus:outline-none focus:border-foreground/40"
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="jetbrains-mono text-[10px] text-muted-foreground tracking-tight uppercase">Excerpt</label>
                <textarea
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="Short description..."
                  className="px-3 py-2 jetbrains-mono text-xs bg-background border border-dashed rounded-sm focus:outline-none focus:border-foreground/40 h-20 resize-none"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="jetbrains-mono text-[10px] text-muted-foreground tracking-tight uppercase">
                  Content (Markdown)
                </label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write your post in markdown..."
                  className="px-3 py-2 jetbrains-mono text-xs bg-background border border-dashed rounded-sm focus:outline-none focus:border-foreground/40 h-96 resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-4 py-2 jetbrains-mono text-xs border border-dashed rounded-sm bg-foreground text-background hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {isSubmitting ? "Saving..." : (editingPost ? "Update" : "Publish")}
              </button>

              {message && (
                <p className="jetbrains-mono text-xs tracking-tight text-center">{message}</p>
              )}
            </div>

            {/* Preview */}
            <div className="flex flex-col gap-4">
              <div className="jetbrains-mono text-[10px] text-muted-foreground tracking-tight uppercase">
                Live Preview
              </div>
              <div className="border border-dashed rounded-sm overflow-hidden bg-muted/20 h-[600px] flex flex-col">
                <div className="p-6 overflow-y-auto flex-1">
                    <time className="jetbrains-mono text-[10px] text-muted-foreground tracking-tight uppercase block mb-4">
                      {new Date().toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                    <h1 className="instrument-serif text-3xl font-normal tracking-tight mb-2 break-words">
                      {title || "Untitled"}
                    </h1>
                    {excerpt && (
                      <p className="jetbrains-mono text-sm text-muted-foreground tracking-tight mb-6 break-words">
                        {excerpt}
                      </p>
                    )}
                    <div className="prose prose-sm prose-neutral dark:prose-invert max-w-none
                      prose-headings:font-normal prose-headings:tracking-tight prose-headings:break-words
                      prose-h1:text-2xl prose-h1:mb-4
                      prose-h2:text-xl prose-h2:mb-3
                      prose-h3:text-lg prose-h3:mb-2
                      prose-p:jetbrains-mono prose-p:text-sm prose-p:leading-relaxed prose-p:break-words
                      prose-a:text-foreground prose-a:underline prose-a:decoration-muted-foreground prose-a:break-all
                      prose-code:jetbrains-mono prose-code:text-xs prose-code:break-words
                      prose-pre:bg-muted/30 prose-pre:border prose-pre:border-dashed prose-pre:overflow-x-auto
                      prose-ul:jetbrains-mono prose-ul:text-sm
                      prose-ol:jetbrains-mono prose-ol:text-sm
                      prose-li:marker:text-muted-foreground prose-li:break-words
                      prose-strong:font-semibold prose-strong:text-foreground
                      prose-em:italic
                      prose-blockquote:border-l-2 prose-blockquote:border-muted-foreground prose-blockquote:pl-4 prose-blockquote:italic
                      prose-img:rounded-sm prose-img:border prose-img:border-dashed">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {content || "*No content yet...*"}
                      </ReactMarkdown>
                    </div>
                  </div>
                </div>
            </div>

          </form>
        </motion.section>
      </div>
    </div>
  );
}
