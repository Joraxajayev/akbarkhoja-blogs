"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, Search, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

interface Project {
  _id: string
  title: string
  description: string
  image: string
  technologies: string[]
  githubUrl: string
  liveUrl: string
  featured: boolean
  createdAt: string
}

interface ProjectsPageProps {
  projects: Project[]
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="group backdrop-blur-xl bg-white/10 border-white/20 hover:bg-white/15 transition-all duration-500 hover:scale-105 hover:shadow-2xl">
      <CardContent className="p-0">
        <div className="relative overflow-hidden rounded-t-lg">
          <Image
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            width={500}
            height={300}
            className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          {project.featured && (
            <div className="absolute top-4 left-4">
              <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white border-0">Featured</Badge>
            </div>
          )}
        </div>

        <div className="p-6">
          <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-200 transition-colors">
            {project.title}
          </h3>

          <p className="text-white/70 mb-4 text-sm leading-relaxed line-clamp-3">{project.description}</p>

          <div className="flex flex-wrap gap-2 mb-6">
            {project.technologies.slice(0, 4).map((tech) => (
              <Badge
                key={tech}
                variant="secondary"
                className="bg-white/10 text-white/90 border-white/20 hover:bg-white/20 transition-colors text-xs"
              >
                {tech}
              </Badge>
            ))}
            {project.technologies.length > 4 && (
              <Badge variant="secondary" className="bg-white/10 text-white/90 border-white/20 text-xs">
                +{project.technologies.length - 4}
              </Badge>
            )}
          </div>

          <div className="flex gap-3">
            <Button
              size="sm"
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 flex-1"
              asChild
            >
              <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-2" />
                Live Demo
              </Link>
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="border-white/30 text-black hover:bg-white/10 hover:border-white/50"
              asChild
            >
              <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function ProjectsHeader() {
  return (
    <div className="text-center mb-16">
      <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent mb-6">
        Projects
      </h1>
      <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
        A collection of my work showcasing modern web development, innovative solutions, and creative problem-solving
        across various technologies and frameworks.
      </p>
    </div>
  )
}

function ProjectsFilters() {
  return (
    <div className="mb-12">
      <Card className="backdrop-blur-xl bg-white/10 border-white/20">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
              <Input
                placeholder="Search projects..."
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white/40"
              />
            </div>
            <Button variant="outline" className="border-white/30 text-black hover:bg-white/10 hover:border-white/50">
              <Filter className="w-4 h-4 mr-2" />
              Filter by Tech
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function ProjectStats({ projects }: { projects: Project[] }) {
  const featuredCount = projects.filter((p) => p.featured).length
  const totalTechnologies = new Set(projects.flatMap((p) => p.technologies)).size

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      <Card className="backdrop-blur-xl bg-white/10 border-white/20">
        <CardContent className="p-6 text-center">
          <div className="text-3xl font-bold text-white mb-2">{projects.length}</div>
          <div className="text-white/70">Total Projects</div>
        </CardContent>
      </Card>
      <Card className="backdrop-blur-xl bg-white/10 border-white/20">
        <CardContent className="p-6 text-center">
          <div className="text-3xl font-bold text-purple-300 mb-2">{featuredCount}</div>
          <div className="text-white/70">Featured Projects</div>
        </CardContent>
      </Card>
      <Card className="backdrop-blur-xl bg-white/10 border-white/20">
        <CardContent className="p-6 text-center">
          <div className="text-3xl font-bold text-blue-300 mb-2">{totalTechnologies}</div>
          <div className="text-white/70">Technologies Used</div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function ProjectsPage({ projects }: ProjectsPageProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTech, setSelectedTech] = useState<string | null>(null)

  const featuredProjects = projects.filter((p) => p.featured)
  const otherProjects = projects.filter((p) => !p.featured)

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 pt-20">
      <div className="absolute inset-0 bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12">
        <ProjectsHeader />
        <ProjectStats projects={projects} />
        <ProjectsFilters />

        {projects.length === 0 ? (
          <div className="text-center py-20">
            <Card className="backdrop-blur-xl bg-white/10 border-white/20 inline-block">
              <CardContent className="p-12">
                <h3 className="text-2xl font-bold text-white mb-4">No Projects Yet</h3>
                <p className="text-white/70 mb-6">Check back soon for new projects!</p>
                <Link href="/">
                  <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0">
                    Back to Home
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        ) : (
          <>
            {/* Featured Projects */}
            {featuredProjects.length > 0 && (
              <div className="mb-16">
                <h2 className="text-3xl font-bold text-white mb-8 text-center">Featured Projects</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {featuredProjects.map((project) => (
                    <ProjectCard key={project._id} project={project} />
                  ))}
                </div>
              </div>
            )}

            {/* All Projects */}
            {otherProjects.length > 0 && (
              <div>
                <h2 className="text-3xl font-bold text-white mb-8 text-center">
                  {featuredProjects.length > 0 ? "Other Projects" : "All Projects"}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {otherProjects.map((project) => (
                    <ProjectCard key={project._id} project={project} />
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* Summary */}
        {projects.length > 0 && (
          <div className="mt-16 text-center">
            <Card className="backdrop-blur-xl bg-white/10 border-white/20 inline-block">
              <CardContent className="p-6">
                <p className="text-white/70">
                  Showing {projects.length} project{projects.length !== 1 ? "s" : ""}
                </p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
