"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, ArrowLeft, Clock } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

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

interface BlogPostPageProps {
  post: BlogPost
}

export default function BlogPostPage({ post }: BlogPostPageProps) {
  const readingTime = Math.ceil(post.content.split(" ").length / 200)

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 pt-20">
      <div className="absolute inset-0 bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-12">
        {/* Back Button */}
        <Link href="/blog">
          <Button variant="ghost" className="text-white/70 hover:text-white hover:bg-white/10 mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Button>
        </Link>

        {/* Article Header */}
        <Card className="backdrop-blur-xl bg-white/10 border-white/20 mb-8">
          <CardContent className="p-0">
            {/* Featured Image */}
            <div className="relative w-full h-64 md:h-96 overflow-hidden rounded-t-lg">
              <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" priority />
            </div>

            {/* Article Info */}
            <div className="p-8">
              <div className="flex flex-wrap gap-2 mb-4">
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

              <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">{post.title}</h1>
              <p className="text-white/80 mb-4">{post.excerpt}</p>

              {/* Author Info */}

              <div className="flex items-center gap-6 text-white/60 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {new Date(post.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {readingTime} min read
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Article Content */}


        {/* Article Footer */}
        <div className="mt-12 text-center">
          <Card className="backdrop-blur-xl bg-white/10 border-white/20 inline-block">
            <CardContent className="p-6">
              <p className="text-white/70 mb-4">Thanks for reading! If you enjoyed this post, feel free to share it.</p>
              <Link href="/#contact">
                <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0">
                  Get In Touch
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
