import type { Metadata } from "next"
import ProjectsPage from "@/components/projects/projects-page"
import { getProjects } from "@/lib/projects"

export default async function ProjectsPageRoute() {
  const projects = await getProjects()

  return <ProjectsPage projects={projects} />
}

export const metadata: Metadata = {
  title: "Projects | Akbarkhoja",
  description:
    "A collection of my work showcasing modern web development, innovative solutions, and creative problem-solving across various technologies and frameworks.",
  openGraph: {
    title: "Projects | Akbarkhoja",
    description:
      "A collection of my work showcasing modern web development, innovative solutions, and creative problem-solving across various technologies and frameworks.",
    type: "website",
  },
}
