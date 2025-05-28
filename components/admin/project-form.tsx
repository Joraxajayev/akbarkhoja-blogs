"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { X, Upload, Save, Link, Github } from "lucide-react"
import type { Project } from "@/types"

interface ProjectFormProps {
  editData?: Project | null
  onClose: () => void
}

export default function ProjectForm({ editData, onClose }: ProjectFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    technologies: [] as string[],
    githubUrl: "",
    liveUrl: "",
    featured: false,
  })
  const [newTech, setNewTech] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  // Populate form if editing
  useEffect(() => {
    if (editData) {
      setFormData({
        title: editData.title || "",
        description: editData.description || "",
        image: editData.image || "",
        technologies: editData.technologies || [],
        githubUrl: editData.githubUrl || "",
        liveUrl: editData.liveUrl || "",
        featured: editData.featured || false,
      })
    }
  }, [editData])

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    try {
      const response = await fetch(`/api/upload?filename=${file.name}`, {
        method: "POST",
        body: file,
      })

      if (response.ok) {
        const { url } = await response.json()
        setFormData((prev) => ({ ...prev, image: url }))
      }
    } catch (error) {
      console.error("Upload failed:", error)
    } finally {
      setIsUploading(false)
    }
  }

  const addTechnology = () => {
    if (newTech.trim() && !formData.technologies.includes(newTech.trim())) {
      setFormData((prev) => ({
        ...prev,
        technologies: [...prev.technologies, newTech.trim()],
      }))
      setNewTech("")
    }
  }

  const removeTechnology = (techToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      technologies: prev.technologies.filter((tech) => tech !== techToRemove),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    try {
      const url = editData ? `/api/projects/${editData._id}` : "/api/projects"
      const method = editData ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        onClose()
      } else {
        const error = await response.json()
        alert(`Failed to save project: ${error.error}`)
      }
    } catch (error) {
      console.error("Failed to save project:", error)
      alert("Failed to save project")
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto backdrop-blur-xl bg-white/10 border-white/20">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl font-bold text-white">
            {editData ? "Edit Project" : "Add New Project"}
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-white/70 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-white/90">
                Project Title
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-purple-400"
                placeholder="Enter project title"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-white/90">
                Description
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-purple-400 min-h-[100px]"
                placeholder="Describe your project"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image" className="text-white/90">
                Project Image
              </Label>
              <div className="flex gap-2">
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="bg-white/10 border-white/20 text-white file:bg-white/10 file:border-0 file:text-white/70"
                />
                {isUploading && (
                  <Button disabled className="bg-white/10">
                    <Upload className="w-4 h-4 animate-spin" />
                  </Button>
                )}
              </div>
              {formData.image && (
                <div className="mt-2">
                  <img
                    src={formData.image || "/placeholder.svg"}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-lg border border-white/20"
                  />
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="githubUrl" className="text-white/90">
                  GitHub URL
                </Label>
                <div className="relative">
                  <Github className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50" />
                  <Input
                    id="githubUrl"
                    value={formData.githubUrl}
                    onChange={(e) => setFormData((prev) => ({ ...prev, githubUrl: e.target.value }))}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-purple-400 pl-10"
                    placeholder="https://github.com/..."
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="liveUrl" className="text-white/90">
                  Live URL
                </Label>
                <div className="relative">
                  <Link className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50" />
                  <Input
                    id="liveUrl"
                    value={formData.liveUrl}
                    onChange={(e) => setFormData((prev) => ({ ...prev, liveUrl: e.target.value }))}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-purple-400 pl-10"
                    placeholder="https://example.com"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-white/90">Technologies</Label>
              <div className="flex gap-2 mb-2">
                <Input
                  value={newTech}
                  onChange={(e) => setNewTech(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTechnology())}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-purple-400"
                  placeholder="Add a technology"
                />
                <Button
                  type="button"
                  onClick={addTechnology}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.technologies.map((tech) => (
                  <Badge
                    key={tech}
                    variant="secondary"
                    className="bg-white/10 text-white/90 border-white/20 hover:bg-white/20 cursor-pointer"
                    onClick={() => removeTechnology(tech)}
                  >
                    {tech}
                    <X className="w-3 h-3 ml-1" />
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="featured"
                checked={formData.featured}
                onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, featured: checked }))}
              />
              <Label htmlFor="featured" className="text-white/90">
                Feature this project
              </Label>
            </div>

            <div className="flex gap-4 pt-4">
              <Button
                type="submit"
                disabled={isSaving}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 flex-1"
              >
                <Save className="w-4 h-4 mr-2" />
                {isSaving ? "Saving..." : editData ? "Update Project" : "Save Project"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="border-white/30 text-white hover:bg-white/10"
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
