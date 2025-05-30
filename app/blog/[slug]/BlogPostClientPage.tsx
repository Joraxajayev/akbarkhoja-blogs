"use client"

import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ArrowLeft, Share2 } from "lucide-react"
import clientPromise from "@/lib/mongodb"
import { useEffect, useState } from "react"

interface BlogPost {
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

interface Props {
  params: {
    slug: string
  }
}

async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const client = await clientPromise
    const posts = client.db("portfolio").collection("blog_posts")

    const post = await posts.findOne({
      slug: slug,
      published: { $ne: false },
    })

    if (!post) {
      return null
    }

    return {
      ...post,
      _id: post._id.toString(),
      createdAt: post.createdAt.toISOString(),
      updatedAt: post.updatedAt ? post.updatedAt.toISOString() : undefined,
    }
  } catch (error) {
    console.error("Error fetching blog post:", error)
    return null
  }
}

// Calculate reading time
function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200
  const words = content.split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}

export default function BlogPostClientPage({ params }: Props) {
  const [post, setPost] = useState<BlogPost | null>(null)
  const [readingTime, setReadingTime] = useState<number>(0)

  useEffect(() => {
    async function loadPost() {
      const fetchedPost = await getBlogPost(params.slug)
      if (!fetchedPost) {
        notFound()
      }
      setPost(fetchedPost)
      setReadingTime(calculateReadingTime(fetchedPost.content))
    }

    loadPost()
  }, [params.slug])

  if (!post) {
    return null // Or a loading state
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 pt-20">
      <div className="absolute inset-0 bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-12">
        {/* Back Button */}
        <div className="mb-8">
          <Link href="/blog">
            <Button variant="ghost" className="text-white/70 hover:text-white hover:bg-white/10">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
        </div>

        {/* Featured Image */}
        <div className="relative w-full h-[400px] rounded-xl overflow-hidden mb-8">
          <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        </div>

        {/* Post Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">{post.title}</h1>

          <div className="flex flex-wrap items-center justify-center gap-4 mb-6 text-white/70">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              {new Date(post.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              {readingTime} min read
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {post.tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="bg-white/10 text-white/90 border-white/20 hover:bg-white/20 transition-colors"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Post Content */}
        <Card className="backdrop-blur-xl bg-white/10 border-white/20 mb-12">
          <CardContent className="p-8">
            <div
              className="prose prose-invert max-w-none prose-headings:text-white prose-a:text-blue-300 hover:prose-a:text-blue-200 prose-blockquote:border-blue-300 prose-code:text-blue-300 prose-pre:bg-black/30"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </CardContent>
        </Card>

        {/* Share Section */}
        <div className="text-center">
          <h3 className="text-xl font-semibold text-white mb-4">Share this article</h3>
          <div className="flex justify-center gap-4">
            <Button
              size="sm"
              variant="outline"
              className="border-white/30 text-slate-800 hover:bg-white/10 hover:border-white/50"
              onClick={() => {
                if (typeof window !== "undefined") {
                  window.open(
                    `https://twitter.com/intent/tweet?text=${encodeURIComponent(
                      post.title,
                    )}&url=${encodeURIComponent(window.location.href)}`,
                    "_blank",
                  )
                }
              }}
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
