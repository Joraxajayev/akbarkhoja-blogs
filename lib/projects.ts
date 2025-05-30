import clientPromise from "@/lib/mongodb"

export interface Project {
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

export async function getProjects(): Promise<Project[]> {
  try {
    const client = await clientPromise
    const projects = client.db("portfolio").collection("projects")

    const projectList = await projects.find({}).sort({ createdAt: -1 }).toArray()

    return projectList.map((project) => ({
      ...project,
      _id: project._id.toString(),
      createdAt: project.createdAt ? project.createdAt.toISOString() : new Date().toISOString(),
      featured: project.featured || false,
      technologies: project.technologies || [],
    }))
  } catch (error) {
    console.error("Error fetching projects:", error)
    return []
  }
}

export async function getProject(id: string): Promise<Project | null> {
  try {
    const client = await clientPromise
    const projects = client.db("portfolio").collection("projects")

    const project = await projects.findOne({ _id: id })

    if (!project) {
      return null
    }

    return {
      ...project,
      _id: project._id.toString(),
      createdAt: project.createdAt ? project.createdAt.toISOString() : new Date().toISOString(),
      featured: project.featured || false,
      technologies: project.technologies || [],
    }
  } catch (error) {
    console.error("Error fetching project:", error)
    return null
  }
}
