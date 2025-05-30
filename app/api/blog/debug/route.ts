import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"

export async function GET() {
  try {
    const client = await clientPromise
    const posts = client.db("portfolio").collection("blog_posts")

    const blogPosts = await posts.find({}).toArray()

    const simplifiedPosts = blogPosts.map((post) => ({
      _id: post._id.toString(),
      title: post.title,
      slug:
        post.slug ||
        post.title
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^\w-]+/g, ""),
      published: post.published !== false,
      hasContent: !!post.content,
      createdAt: post.createdAt ? post.createdAt.toISOString() : null,
    }))

    return NextResponse.json({
      totalPosts: simplifiedPosts.length,
      posts: simplifiedPosts,
    })
  } catch (error) {
    console.error("Error in debug API:", error)
    return NextResponse.json({ error: "Failed to fetch blog posts" }, { status: 500 })
  }
}
