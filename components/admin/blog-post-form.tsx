"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import RichTextEditor from "./rich-text-editor"
import { X, Upload, Save } from "lucide-react"
import type { BlogPost } from "@/types"

interface BlogPostFormProps {
  editData?: BlogPost | null
  onClose: () => void
}

export default function BlogPostForm({ editData, onClose }: BlogPostFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    excerpt: "",
    image: "",
    published: false,
    tags: [] as string[],
  })
  const [newTag, setNewTag] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  // Populate form if editing
  useEffect(() => {
    if (editData) {
      setFormData({
        title: editData.title || "",
        content: editData.content || "",
        excerpt: editData.excerpt || "",
        image: editData.image || "",
        published: editData.published || false,
        tags: editData.tags || [],
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

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }))
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    try {
      const url = editData ? `/api/blog/${editData._id}` : "/api/blog"
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
        alert(`Failed to save blog post: ${error.error}`)
      }
    } catch (error) {
      console.error("Failed to save blog post:", error)
      alert("Failed to save blog post")
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto backdrop-blur-xl bg-white/10 border-white/20">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl font-bold text-white">
            {editData ? "Edit Blog Post" : "Create New Blog Post"}
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-white/90">
                  Title
                </Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-purple-400"
                  placeholder="Enter blog post title"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image" className="text-white/90">
                  Featured Image
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
                      className="w-full h-32 object-cover rounded-lg border border-white/20"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="excerpt" className="text-white/90">
                Excerpt
              </Label>
              <Input
                id="excerpt"
                value={formData.excerpt}
                onChange={(e) => setFormData((prev) => ({ ...prev, excerpt: e.target.value }))}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-purple-400"
                placeholder="Brief description of the blog post"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-white/90">Tags</Label>
              <div className="flex gap-2 mb-2">
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-purple-400"
                  placeholder="Add a tag"
                />
                <Button
                  type="button"
                  onClick={addTag}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="bg-white/10 text-white/90 border-white/20 hover:bg-white/20 cursor-pointer"
                    onClick={() => removeTag(tag)}
                  >
                    {tag}
                    <X className="w-3 h-3 ml-1" />
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-white/90">Content</Label>
              <RichTextEditor
                value={formData.content}
                onChange={(content) => setFormData((prev) => ({ ...prev, content }))}
                placeholder="Write your blog post content here..."
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="published"
                checked={formData.published}
                onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, published: checked }))}
              />
              <Label htmlFor="published" className="text-white/90">
                Publish immediately
              </Label>
            </div>

            <div className="flex gap-4 pt-4">
              <Button
                type="submit"
                disabled={isSaving}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 flex-1"
              >
                <Save className="w-4 h-4 mr-2" />
                {isSaving ? "Saving..." : editData ? "Update Post" : "Save Post"}
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
