import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import clientPromise from "@/lib/mongodb"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const client = await clientPromise
    const posts = client.db("portfolio").collection("blog_posts")

    const allPosts = await posts.find({}).sort({ createdAt: -1 }).toArray()

    return NextResponse.json(allPosts)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch blog posts" }, { status: 500 })
  }
}
