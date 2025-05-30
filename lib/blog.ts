import clientPromise from "@/lib/mongodb"

export interface BlogPost {
  _id: string
  title: string
  slug: string
  content: string
  excerpt: string
  image: string
  tags: string[]
  createdAt: string
  updatedAt?: string
  published: boolean
  author?: {
    name: string
    image?: string
  }
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const client = await clientPromise
    const posts = client.db("portfolio").collection("blog_posts")

    const blogPosts = await posts
      .find({ published: { $ne: false } })
      .sort({ createdAt: -1 })
      .toArray()

    return blogPosts.map((post) => ({
      ...post,
      _id: post._id.toString(),
      slug:
        post.slug ||
        post.title
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^\w-]+/g, ""),
      createdAt: post.createdAt.toISOString(),
      updatedAt: post.updatedAt ? post.updatedAt.toISOString() : undefined,
    }))
  } catch (error) {
    console.error("Error fetching blog posts:", error)
    return []
  }
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const client = await clientPromise
    const posts = client.db("portfolio").collection("blog_posts")

    // First try to find by slug field
    let post = await posts.findOne({
      slug: slug,
      published: { $ne: false },
    })

    if (!post) {
      // If no slug field exists, try to find by generating slug from title
      const allPosts = await posts.find({}).toArray()
      post = allPosts.find((p) => {
        const generatedSlug = p.title
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^\w-]+/g, "")
        return generatedSlug === slug && p.published !== false
      })
    }

    if (!post) {
      return null
    }

    return {
      ...post,
      _id: post._id.toString(),
      slug:
        post.slug ||
        post.title
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^\w-]+/g, ""),
      content:
        post.content ||
        `<p>${post.excerpt}</p><p>This is a sample blog post content. The full content would be stored in the database.</p>`,
      createdAt: post.createdAt.toISOString(),
      updatedAt: post.updatedAt ? post.updatedAt.toISOString() : undefined,
    }
  } catch (error) {
    console.error("Error fetching blog post:", error)
    return null
  }
}
