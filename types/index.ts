export interface User {
  _id: string
  name: string
  email: string
  role: "admin" | "user"
  createdAt: Date
}

export interface Project {
  _id: string
  title: string
  description: string
  image: string
  technologies: string[]
  githubUrl?: string
  liveUrl?: string
  featured: boolean
  createdAt: Date
}

export interface BlogPost {
  _id: string
  title: string
  slug: string
  content: string
  excerpt: string
  image: string
  published: boolean
  tags: string[]
  createdAt: Date
  updatedAt: Date
}
