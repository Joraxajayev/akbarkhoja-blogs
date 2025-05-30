import type { Metadata } from "next"
import BlogPage from "@/components/blog/blog-page"
import { getBlogPosts } from "@/lib/blog"

export default async function BlogPageRoute() {
  const posts = await getBlogPosts()

  return <BlogPage posts={posts} />
}

export const metadata: Metadata = {
  title: "Blog | Akbarkhoja",
  description:
    "Insights, tutorials, and thoughts on modern web development, technology trends, and software engineering best practices.",
  openGraph: {
    title: "Blog | Akbarkhoja",
    description:
      "Insights, tutorials, and thoughts on modern web development, technology trends, and software engineering best practices.",
    type: "website",
  },
}
