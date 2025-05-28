"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X, Save } from "lucide-react"
import type { User } from "@/types"

interface UserFormProps {
  editData?: User | null
  onClose: () => void
}

export default function UserForm({ editData, onClose }: UserFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user" as "admin" | "user",
  })
  const [isSaving, setIsSaving] = useState(false)

  // Populate form if editing
  useEffect(() => {
    if (editData) {
      setFormData({
        name: editData.name || "",
        email: editData.email || "",
        password: "", // Don't populate password for security
        role: editData.role || "user",
      })
    }
  }, [editData])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    try {
      const url = editData ? `/api/users/${editData._id}` : "/api/users"
      const method = editData ? "PUT" : "POST"

      // Don't send empty password for updates
      const submitData = { ...formData }
      if (editData && !submitData.password) {
        delete submitData.password
      }

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitData),
      })

      if (response.ok) {
        onClose()
      } else {
        const error = await response.json()
        alert(`Failed to save user: ${error.error}`)
      }
    } catch (error) {
      console.error("Failed to save user:", error)
      alert("Failed to save user")
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md backdrop-blur-xl bg-white/10 border-white/20">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl font-bold text-white">{editData ? "Edit User" : "Create New User"}</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-white/70 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </Button>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-white/90">
                Full Name
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-purple-400"
                placeholder="Enter full name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-white/90">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-purple-400"
                placeholder="Enter email address"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-white/90">
                Password {editData && "(leave empty to keep current)"}
              </Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-purple-400"
                placeholder={editData ? "Enter new password" : "Enter password"}
                required={!editData}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role" className="text-white/90">
                Role
              </Label>
              <Select
                value={formData.role}
                onValueChange={(value: "admin" | "user") => setFormData((prev) => ({ ...prev, role: value }))}
              >
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">User</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-4 pt-4">
              <Button
                type="submit"
                disabled={isSaving}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 flex-1"
              >
                <Save className="w-4 h-4 mr-2" />
                {isSaving ? "Saving..." : editData ? "Update User" : "Create User"}
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
