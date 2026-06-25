"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Lock, Plus, Trash2, Edit3, Save, X, ArrowLeft, 
  LayoutDashboard, LogOut, ExternalLink, Github, Upload, ImageIcon
} from "lucide-react";
import Link from "next/link";

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  liveUrl: string;
  githubUrl: string;
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [projects, setProjects] = useState<Project[]>([]);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Project>>({
    title: "",
    description: "",
    image: "",
    tags: [],
    liveUrl: "",
    githubUrl: "",
  });
  const [tagInput, setTagInput] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isAuthenticated) {
      fetchProjects();
    }
  }, [isAuthenticated]);

  const fetchProjects = async () => {
    const res = await fetch("/api/projects");
    const data = await res.json();
    setProjects(data);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Invalid password");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("Image must be less than 2MB");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImagePreview(base64String);
        setFormData({ ...formData, image: base64String });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    if (!formData.title || !formData.description) return;

    const method = isEditing ? "PUT" : "POST";
    const body = isEditing 
      ? JSON.stringify({ ...formData, id: isEditing })
      : JSON.stringify(formData);

    await fetch("/api/projects", {
      method,
      headers: { "Content-Type": "application/json" },
      body,
    });

    setIsEditing(null);
    setFormData({ title: "", description: "", image: "", tags: [], liveUrl: "", githubUrl: "" });
    setImagePreview(null);
    fetchProjects();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    await fetch("/api/projects", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetchProjects();
  };

  const handleEdit = (project: Project) => {
    setIsEditing(project.id);
    setFormData(project);
    setImagePreview(project.image || null);
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags?.includes(tagInput.trim())) {
      setFormData({ ...formData, tags: [...(formData.tags || []), tagInput.trim()] });
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    setFormData({ ...formData, tags: formData.tags?.filter((t) => t !== tag) || [] });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md p-8 rounded-2xl bg-card border border-border"
        >
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-accent-cyan/10 mb-6 mx-auto">
            <Lock className="w-6 h-6 text-accent-cyan" />
          </div>
          <h1 className="text-2xl font-bold text-center mb-2">Admin Access</h1>
          <p className="text-muted text-center text-sm mb-6">
            Enter the admin password to manage projects.
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password..."
              className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-accent-cyan focus:outline-none transition-colors"
            />
            {error && <p className="text-accent-rose text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-accent-cyan text-black font-bold hover:bg-accent-cyan/90 transition-colors"
            >
              Access Dashboard
            </button>
          </form>

          <Link href="/" className="flex items-center justify-center gap-2 mt-6 text-sm text-muted hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Portfolio
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-accent-cyan/10 flex items-center justify-center">
              <LayoutDashboard className="w-5 h-5 text-accent-cyan" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Project Manager</h1>
              <p className="text-sm text-muted">Add, edit, or delete portfolio projects</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:border-accent-cyan transition-colors text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              View Site
            </Link>
            <button
              onClick={() => setIsAuthenticated(false)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:border-accent-rose transition-colors text-sm text-accent-rose"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <div className="sticky top-6 p-6 rounded-2xl bg-card border border-border">
              <h2 className="text-lg font-bold mb-4">
                {isEditing ? "Edit Project" : "Add New Project"}
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="text-sm text-muted mb-1 block">Project Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-background border border-border focus:border-accent-cyan focus:outline-none"
                    placeholder="e.g. E-Commerce API"
                  />
                </div>

                <div>
                  <label className="text-sm text-muted mb-1 block">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-background border border-border focus:border-accent-cyan focus:outline-none h-24 resize-none"
                    placeholder="Brief project description..."
                  />
                </div>

                <div>
                  <label className="text-sm text-muted mb-1 block">Project Image</label>
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="relative w-full h-32 rounded-lg bg-background border border-dashed border-border hover:border-accent-cyan cursor-pointer flex flex-col items-center justify-center gap-2 transition-colors overflow-hidden group"
                  >
                    {imagePreview ? (
                      <>
                        <img src={imagePreview} alt="Preview" className="absolute inset-0 w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <div className="flex items-center gap-2 text-white">
                            <Upload className="w-4 h-4" />
                            <span className="text-sm">Change Image</span>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <ImageIcon className="w-8 h-8 text-muted" />
                        <span className="text-sm text-muted">Click to upload image</span>
                        <span className="text-xs text-muted-foreground">Max 2MB</span>
                      </>
                    )}
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm text-muted mb-1 block">Tech Tags</label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                      className="flex-1 px-3 py-2 rounded-lg bg-background border border-border focus:border-accent-cyan focus:outline-none"
                      placeholder="React"
                    />
                    <button
                      onClick={addTag}
                      className="px-3 py-2 rounded-lg bg-accent-cyan/10 text-accent-cyan hover:bg-accent-cyan/20 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20"
                      >
                        {tag}
                        <button onClick={() => removeTag(tag)} className="hover:text-white">
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm text-muted mb-1 block">Live URL</label>
                  <input
                    type="text"
                    value={formData.liveUrl}
                    onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-background border border-border focus:border-accent-cyan focus:outline-none"
                    placeholder="https://..."
                  />
                </div>

                <div>
                  <label className="text-sm text-muted mb-1 block">GitHub URL</label>
                  <input
                    type="text"
                    value={formData.githubUrl}
                    onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-background border border-border focus:border-accent-cyan focus:outline-none"
                    placeholder="https://github.com/..."
                  />
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    onClick={handleSave}
                    className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-accent-cyan text-black font-bold hover:bg-accent-cyan/90 transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    {isEditing ? "Update" : "Create"}
                  </button>
                  {isEditing && (
                    <button
                      onClick={() => {
                        setIsEditing(null);
                        setFormData({ title: "", description: "", image: "", tags: [], liveUrl: "", githubUrl: "" });
                        setImagePreview(null);
                      }}
                      className="px-4 py-2 rounded-lg border border-border hover:border-accent-rose text-accent-rose transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence>
              {projects.map((project) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="p-4 rounded-xl bg-card border border-border hover:border-accent-cyan/30 transition-colors group"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex gap-4">
                      <div className="w-16 h-16 rounded-lg bg-background overflow-hidden flex-shrink-0">
                        {project.image ? (
                          <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full bg-accent-cyan/10 flex items-center justify-center">
                            <LayoutDashboard className="w-6 h-6 text-accent-cyan/50" />
                          </div>
                        )}
                      </div>
                      <div>
                        <h3 className="font-bold group-hover:text-accent-cyan transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-sm text-muted line-clamp-1 mt-1">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {project.tags.map((tag) => (
                            <span key={tag} className="px-2 py-0.5 rounded text-[10px] bg-white/5 text-muted border border-white/10">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg hover:bg-white/5 text-muted hover:text-white transition-colors">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg hover:bg-white/5 text-muted hover:text-white transition-colors">
                        <Github className="w-4 h-4" />
                      </a>
                      <button
                        onClick={() => handleEdit(project)}
                        className="p-2 rounded-lg hover:bg-accent-cyan/10 text-muted hover:text-accent-cyan transition-colors"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(project.id)}
                        className="p-2 rounded-lg hover:bg-accent-rose/10 text-muted hover:text-accent-rose transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {projects.length === 0 && (
              <div className="text-center py-12 text-muted border border-dashed border-border rounded-xl">
                <p>No projects yet. Create your first one!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
