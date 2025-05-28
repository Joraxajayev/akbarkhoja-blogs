"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  BarChart3,
  FileText,
  FolderOpen,
  Users,
  Plus,
  Edit,
  Trash2,
  ExternalLink,
} from "lucide-react";
import BlogPostForm from "./blog-post-form";
import ProjectForm from "./project-form";
import UserForm from "./user-form";
import type { Project, BlogPost, User } from "@/types";

interface DashboardStats {
  totalProjects: number;
  totalBlogPosts: number;
  totalUsers: number;
  publishedPosts: number;
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [showBlogForm, setShowBlogForm] = useState(false);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showUserForm, setShowUserForm] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  // State for data
  const [stats, setStats] = useState<DashboardStats>({
    totalProjects: 0,
    totalBlogPosts: 0,
    totalUsers: 0,
    publishedPosts: 0,
  });
  const [projects, setProjects] = useState<Project[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch all data
  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // Fetch projects
      const projectsRes = await fetch("/api/projects");
      const projectsData = await projectsRes.json();
      setProjects(projectsData);

      // Fetch blog posts
      const blogRes = await fetch("/api/blog/all");
      const blogData = await blogRes.json();
      setBlogPosts(blogData);

      // Fetch users
      const usersRes = await fetch("/api/users");
      const usersData = await usersRes.json();
      setUsers(usersData);

      // Calculate stats
      setStats({
        totalProjects: projectsData.length,
        totalBlogPosts: blogData.length,
        totalUsers: usersData.length,
        publishedPosts: blogData.filter((post: BlogPost) => post.published)
          .length,
      });
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Delete functions
  const deleteProject = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      const response = await fetch(`/api/projects/${id}`, { method: "DELETE" });
      if (response.ok) {
        setProjects(projects.filter((p) => p._id !== id));
        setStats((prev) => ({
          ...prev,
          totalProjects: prev.totalProjects - 1,
        }));
      }
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  const deleteBlogPost = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return;

    try {
      const response = await fetch(`/api/blog/${id}`, { method: "DELETE" });
      if (response.ok) {
        setBlogPosts(blogPosts.filter((p) => p._id !== id));
        setStats((prev) => ({
          ...prev,
          totalBlogPosts: prev.totalBlogPosts - 1,
        }));
      }
    } catch (error) {
      console.error("Error deleting blog post:", error);
    }
  };

  const deleteUser = async (id: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;

    try {
      const response = await fetch(`/api/users/${id}`, { method: "DELETE" });
      if (response.ok) {
        setUsers(users.filter((u) => u._id !== id));
        setStats((prev) => ({ ...prev, totalUsers: prev.totalUsers - 1 }));
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // Edit functions
  const editProject = (project: Project) => {
    setEditingItem(project);
    setShowProjectForm(true);
  };

  const editBlogPost = (post: BlogPost) => {
    setEditingItem(post);
    setShowBlogForm(true);
  };

  const editUser = (user: User) => {
    setEditingItem(user);
    setShowUserForm(true);
  };

  // Form close handlers
  const handleFormClose = () => {
    setShowBlogForm(false);
    setShowProjectForm(false);
    setShowUserForm(false);
    setEditingItem(null);
    fetchDashboardData(); // Refresh data
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6 pt-20">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent mb-2">
            Admin Dashboard
          </h1>
          <p className="text-white/70">
            Manage your portfolio content and settings
          </p>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6">
          <TabsList className="bg-white/10 backdrop-blur-xl border-white/20">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-white/20">
              <BarChart3 className="w-4 h-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="projects"
              className="data-[state=active]:bg-white/20">
              <FolderOpen className="w-4 h-4 mr-2" />
              Projects ({stats.totalProjects})
            </TabsTrigger>
            <TabsTrigger
              value="blog"
              className="data-[state=active]:bg-white/20">
              <FileText className="w-4 h-4 mr-2" />
              Blog Posts ({stats.totalBlogPosts})
            </TabsTrigger>
            <TabsTrigger
              value="users"
              className="data-[state=active]:bg-white/20">
              <Users className="w-4 h-4 mr-2" />
              Users ({stats.totalUsers})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="backdrop-blur-xl bg-white/10 border-white/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-white/90 text-sm font-medium">
                    Total Projects
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-white">
                    {stats.totalProjects}
                  </div>
                  <p className="text-green-400 text-sm">
                    {projects.filter((p) => p.featured).length} featured
                  </p>
                </CardContent>
              </Card>

              <Card className="backdrop-blur-xl bg-white/10 border-white/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-white/90 text-sm font-medium">
                    Blog Posts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-white">
                    {stats.totalBlogPosts}
                  </div>
                  <p className="text-green-400 text-sm">
                    {stats.publishedPosts} published
                  </p>
                </CardContent>
              </Card>

              <Card className="backdrop-blur-xl bg-white/10 border-white/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-white/90 text-sm font-medium">
                    Total Users
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-white">
                    {stats.totalUsers}
                  </div>
                  <p className="text-white/60 text-sm">
                    {users.filter((u) => u.role === "admin").length} admins
                  </p>
                </CardContent>
              </Card>

              <Card className="backdrop-blur-xl bg-white/10 border-white/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-white/90 text-sm font-medium">
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-white">
                    {
                      blogPosts.filter((p) => {
                        const weekAgo = new Date();
                        weekAgo.setDate(weekAgo.getDate() - 7);
                        return new Date(p.createdAt) > weekAgo;
                      }).length
                    }
                  </div>
                  <p className="text-white/60 text-sm">Posts this week</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="projects" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Projects</h2>
              <Button
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                onClick={() => setShowProjectForm(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Project
              </Button>
            </div>

            <Card className="backdrop-blur-xl bg-white/10 border-white/20">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {projects.length === 0 ? (
                    <div className="text-center py-8 text-white/60">
                      No projects found. Create your first project!
                    </div>
                  ) : (
                    projects.map((project) => (
                      <div
                        key={project._id}
                        className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center overflow-hidden">
                            {project.image ? (
                              <img
                                src={project.image || "/placeholder.svg"}
                                alt={project.title}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <FolderOpen className="w-8 h-8 text-white" />
                            )}
                          </div>
                          <div>
                            <h3 className="text-white font-semibold">
                              {project.title}
                            </h3>
                            <p className="text-white/60 text-sm line-clamp-1">
                              {project.description}
                            </p>
                            <div className="flex gap-1 mt-1">
                              {project.technologies.slice(0, 3).map((tech) => (
                                <Badge
                                  key={tech}
                                  variant="secondary"
                                  className="bg-white/10 text-white/70 text-xs">
                                  {tech}
                                </Badge>
                              ))}
                              {project.technologies.length > 3 && (
                                <Badge
                                  variant="secondary"
                                  className="bg-white/10 text-white/70 text-xs">
                                  +{project.technologies.length - 3}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {project.featured && (
                            <Badge
                              variant="secondary"
                              className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                              Featured
                            </Badge>
                          )}
                          {project.liveUrl && (
                            <Button
                              size="sm"
                              variant="ghost"
                              className="text-white/70 hover:text-white hover:bg-white/10"
                              onClick={() =>
                                window.open(project.liveUrl, "_blank")
                              }>
                              <ExternalLink className="w-4 h-4" />
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-white/70 hover:text-white hover:bg-white/10"
                            onClick={() => editProject(project)}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                            onClick={() => deleteProject(project._id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="blog" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Blog Posts</h2>
              <Button
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                onClick={() => setShowBlogForm(true)}>
                <Plus className="w-4 h-4 mr-2" />
                New Post
              </Button>
            </div>

            <Card className="backdrop-blur-xl bg-white/10 border-white/20">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {blogPosts.length === 0 ? (
                    <div className="text-center py-8 text-white/60">
                      No blog posts found. Write your first post!
                    </div>
                  ) : (
                    blogPosts.map((post) => (
                      <div
                        key={post._id}
                        className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-blue-600 rounded-lg flex items-center justify-center overflow-hidden">
                            {post.image ? (
                              <img
                                src={post.image || "/placeholder.svg"}
                                alt={post.title}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <FileText className="w-8 h-8 text-white" />
                            )}
                          </div>
                          <div>
                            <h3 className="text-white font-semibold">
                              {post.title}
                            </h3>
                            <p className="text-white/60 text-sm line-clamp-1">
                              {post.excerpt}
                            </p>
                            <p className="text-white/50 text-xs">
                              {new Date(post.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant="secondary"
                            className={
                              post.published
                                ? "bg-green-500/20 text-green-400 border-green-500/30"
                                : "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                            }>
                            {post.published ? "Published" : "Draft"}
                          </Badge>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-white/70 hover:text-white hover:bg-white/10"
                            onClick={() => editBlogPost(post)}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                            onClick={() => deleteBlogPost(post._id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Users</h2>
              <Button
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                onClick={() => setShowUserForm(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add User
              </Button>
            </div>

            <Card className="backdrop-blur-xl bg-white/10 border-white/20">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {users.length === 0 ? (
                    <div className="text-center py-8 text-white/60">
                      No users found.
                    </div>
                  ) : (
                    users.map((user) => (
                      <div
                        key={user._id}
                        className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-orange-600 to-red-600 rounded-full flex items-center justify-center">
                            <Users className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-white font-semibold">
                              {user.name}
                            </h3>
                            <p className="text-white/60 text-sm">
                              {user.email}
                            </p>
                            <p className="text-white/50 text-xs">
                              Created:{" "}
                              {new Date(user.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant="secondary"
                            className={
                              user.role === "admin"
                                ? "bg-purple-500/20 text-purple-400 border-purple-500/30"
                                : "bg-gray-500/20 text-gray-400 border-gray-500/30"
                            }>
                            {user.role}
                          </Badge>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-white/70 hover:text-white hover:bg-white/10"
                            onClick={() => editUser(user)}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                            onClick={() => deleteUser(user._id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Forms */}
        {showProjectForm && (
          <ProjectForm editData={editingItem} onClose={handleFormClose} />
        )}
        {showBlogForm && (
          <BlogPostForm editData={editingItem} onClose={handleFormClose} />
        )}
        {showUserForm && (
          <UserForm editData={editingItem} onClose={handleFormClose} />
        )}
      </div>
    </div>
  );
}
