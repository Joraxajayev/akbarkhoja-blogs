"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, ArrowRight } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"

interface BlogPost {
  _id: string
  title: string
  excerpt: string
  image: string
  tags: string[]
  createdAt: string
}

export default function LatestBlogPosts() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/blog`, {
          cache: "no-store",
        })
        
        if (!res.ok) {
          throw new Error('Failed to fetch blog posts')
        }
        
        const data = await res.json()
        setPosts(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load blog posts')
      } finally {
        setIsLoading(false)
      }
    }

    fetchPosts()
  }, [])

  if (isLoading) {
    return (
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-white/70">Loading blog posts...</p>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-red-400">{error}</p>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent mb-4">
            Latest Blog Posts
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Insights, tutorials, and thoughts on modern web development and technology trends.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Card
              key={post._id}
              className="group backdrop-blur-xl bg-white/10 border-white/20 hover:bg-white/15 transition-all duration-500 hover:scale-105 hover:shadow-2xl"
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <Image
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    width={400}
                    height={200}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 text-white/60 text-sm mb-3">
                    <Calendar className="w-4 h-4" />
                    {new Date(post.createdAt).toLocaleDateString()}
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-200 transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-white/70 mb-4 text-sm leading-relaxed line-clamp-3">{post.excerpt}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="bg-white/10 text-white/90 border-white/20 hover:bg-white/20 transition-colors text-xs"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <Button
                    variant="ghost"
                    className="text-white hover:text-blue-200 hover:bg-white/10 p-0 h-auto group/btn"
                  >
                    Read More
                    <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
