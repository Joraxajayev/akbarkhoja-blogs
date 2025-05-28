import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import clientPromise from "@/lib/mongodb"

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db("portfolio")
    const posts = db.collection("blog_posts")

    // Ensure the collection exists
    const collections = await db.listCollections({ name: "blog_posts" }).toArray()
    if (collections.length === 0) {
      // Create the collection with sample data if it doesn't exist
      await db.createCollection("blog_posts")
      await posts.insertMany([
        {
          title: "Building Scalable React Applications with TypeScript",
          excerpt: "Learn how to structure large React applications using TypeScript, focusing on maintainability and developer experience.",
          image: "/placeholder.svg",
          tags: ["React", "TypeScript", "Architecture"],
          createdAt: new Date("2024-01-15"),
          updatedAt: new Date("2024-01-15")
        },
        {
          title: "The Future of Web Development: Trends to Watch",
          excerpt: "Exploring emerging technologies and trends that will shape the future of web development in the coming years.",
          image: "/placeholder.svg",
          tags: ["Web Development", "Trends", "Future"],
          createdAt: new Date("2024-01-10"),
          updatedAt: new Date("2024-01-10")
        },
        {
          title: "Optimizing Performance in Next.js Applications",
          excerpt: "Advanced techniques for improving performance in Next.js applications, including code splitting and caching strategies.",
          image: "/placeholder.svg",
          tags: ["Next.js", "Performance", "Optimization"],
          createdAt: new Date("2024-01-05"),
          updatedAt: new Date("2024-01-05")
        }
      ])
    }

    const allPosts = await posts.find({}).sort({ createdAt: -1 }).limit(9).toArray()

    return NextResponse.json(allPosts)
  } catch (error) {
    console.error('Failed to fetch blog posts:', error)
    return NextResponse.json(
      { error: "Failed to fetch blog posts" }, 
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "admin") {
      return NextResponse.json(
        { error: "Unauthorized" }, 
        { status: 401 }
      )
    }

    const body = await request.json()
    const client = await clientPromise
    const posts = client.db("portfolio").collection("blog_posts")

    const newPost = {
      ...body,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await posts.insertOne(newPost)

    return NextResponse.json({ id: result.insertedId, ...newPost })
  } catch (error) {
    console.error('Failed to create blog post:', error)
    return NextResponse.json(
      { error: "Failed to create blog post" }, 
      { status: 500 }
    )
  }
}
