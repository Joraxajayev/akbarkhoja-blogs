"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"
import Image from "next/image"

interface Project {
  _id: string
  title: string
  description: string
  image: string
  technologies: string[]
  githubUrl: string
  liveUrl: string
}

export default function FeaturedProjects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch("/api/projects", { cache: "no-store" })
        if (!res.ok) throw new Error("Failed to fetch projects")
        setProjects(await res.json())
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load projects")
      } finally {
        setIsLoading(false)
      }
    }
    fetchProjects()
  }, [])

  if (isLoading) {
    return (
      <section className="py-20 px-4 text-center">
        <p className="text-white/70">Loading projects...</p>
      </section>
    )
  }
  if (error) {
    return (
      <section className="py-20 px-4 text-center">
        <p className="text-red-400">{error}</p>
      </section>
    )
  }

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent mb-4">
            Featured Projects
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            A showcase of my latest work.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Card
              key={project._id}
              className="group backdrop-blur-xl bg-white/10 border-white/20 hover:bg-white/15 transition-all duration-500 hover:scale-105 hover:shadow-2xl"
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    width={500}
                    height={300}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-200 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-white/70 mb-4 text-sm leading-relaxed">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <Badge
                        key={tech}
                        variant="secondary"
                        className="bg-white/10 text-white/90 border-white/20 hover:bg-white/20 transition-colors"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 flex-1"
                      onClick={() => window.open(project.liveUrl, "_blank")}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Live Demo
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-white/30 text-slate-800 hover:bg-white/10"
                      onClick={() => window.open(project.githubUrl, "_blank")}
                    >
                      <Github className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}











