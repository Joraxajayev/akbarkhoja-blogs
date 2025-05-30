"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, ArrowRight, Search, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

interface BlogPost {
  _id: string
  title: string
  slug: string
  excerpt: string
  image: string
  tags: string[]
  createdAt: string
  published: boolean
}

interface BlogPageProps {
  posts: BlogPost[]
}

function BlogPostCard({ post }: { post: BlogPost }) {
  return (
    <Card className="group backdrop-blur-xl bg-white/10 border-white/20 hover:bg-white/15 transition-all duration-500 hover:scale-105 hover:shadow-2xl">
      <CardContent className="p-0">
        <div className="relative overflow-hidden rounded-t-lg">
          <Image
            src={post.image || "/placeholder.svg"}
            alt={post.title}
            width={400}
            height={250}
            className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        <div className="p-6">
          <div className="flex items-center gap-2 text-white/60 text-sm mb-3">
            <Calendar className="w-4 h-4" />
            {new Date(post.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>

          <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-200 transition-colors line-clamp-2">
            {post.title}
          </h3>

          <p className="text-white/70 mb-4 text-sm leading-relaxed line-clamp-3">{post.excerpt}</p>

          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.slice(0, 3).map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="bg-white/10 text-white/90 border-white/20 hover:bg-white/20 transition-colors text-xs"
              >
                {tag}
              </Badge>
            ))}
            {post.tags.length > 3 && (
              <Badge variant="secondary" className="bg-white/10 text-white/90 border-white/20 text-xs">
                +{post.tags.length - 3}
              </Badge>
            )}
          </div>

          <Link href={`/blog/${post.slug}`}>
            <Button
              variant="ghost"
              className="text-white hover:text-blue-200 hover:bg-white/10 p-0 h-auto group/btn w-full justify-start"
            >
              Read More
              <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

function BlogHeader() {
  return (
    <div className="text-center mb-16">
      <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent mb-6">
        Blog
      </h1>
      <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
        Insights, tutorials, and thoughts on modern web development, technology trends, and software engineering best
        practices.
      </p>
    </div>
  )
}

function BlogFilters() {
  return (
    <div className="mb-12">
      <Card className="backdrop-blur-xl bg-white/10 border-white/20">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
              <Input
                placeholder="Search blog posts..."
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white/40"
              />
            </div>
            <Button variant="outline" className="border-white/30 text-black hover:bg-white/10 hover:border-white/50">
              <Filter className="w-4 h-4 mr-2" />
              Filter by Tag
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function BlogPage({ posts }: BlogPageProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 pt-20">
      <div className="absolute inset-0 bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12">
        <BlogHeader />
        <BlogFilters />

        {posts.length === 0 ? (
          <div className="text-center py-20">
            <Card className="backdrop-blur-xl bg-white/10 border-white/20 inline-block">
              <CardContent className="p-12">
                <h3 className="text-2xl font-bold text-white mb-4">No Blog Posts Yet</h3>
                <p className="text-white/70 mb-6">Check back soon for new content!</p>
                <Link href="/">
                  <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0">
                    Back to Home
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <BlogPostCard key={post._id} post={post} />
            ))}
          </div>
        )}

        {/* Pagination would go here */}
        {posts.length > 0 && (
          <div className="mt-16 text-center">
            <Card className="backdrop-blur-xl bg-white/10 border-white/20 inline-block">
              <CardContent className="p-6">
                <p className="text-white/70">
                  Showing {posts.length} post{posts.length !== 1 ? "s" : ""}
                </p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
