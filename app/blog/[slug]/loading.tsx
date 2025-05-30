import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function Loading() {
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

        {/* Featured Image Skeleton */}
        <Skeleton className="w-full h-[400px] rounded-xl mb-8 bg-white/10" />

        {/* Post Header Skeleton */}
        <div className="text-center mb-12">
          <Skeleton className="h-12 w-3/4 mx-auto mb-6 bg-white/10" />

          <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
            <Skeleton className="h-6 w-32 bg-white/10" />
            <Skeleton className="h-6 w-24 bg-white/10" />
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            <Skeleton className="h-6 w-16 rounded-full bg-white/10" />
            <Skeleton className="h-6 w-20 rounded-full bg-white/10" />
            <Skeleton className="h-6 w-24 rounded-full bg-white/10" />
          </div>
        </div>

        {/* Post Content Skeleton */}
        <Card className="backdrop-blur-xl bg-white/10 border-white/20 mb-12">
          <CardContent className="p-8">
            <Skeleton className="h-6 w-full mb-4 bg-white/10" />
            <Skeleton className="h-6 w-full mb-4 bg-white/10" />
            <Skeleton className="h-6 w-3/4 mb-8 bg-white/10" />

            <Skeleton className="h-10 w-1/2 mb-6 bg-white/10" />
            <Skeleton className="h-6 w-full mb-4 bg-white/10" />
            <Skeleton className="h-6 w-full mb-4 bg-white/10" />
            <Skeleton className="h-6 w-5/6 mb-8 bg-white/10" />

            <Skeleton className="h-10 w-1/2 mb-6 bg-white/10" />
            <Skeleton className="h-6 w-full mb-4 bg-white/10" />
            <Skeleton className="h-6 w-full mb-4 bg-white/10" />
            <Skeleton className="h-6 w-full mb-4 bg-white/10" />
            <Skeleton className="h-6 w-2/3 mb-4 bg-white/10" />
          </CardContent>
        </Card>

        {/* Share Section Skeleton */}
        <div className="text-center">
          <Skeleton className="h-8 w-48 mx-auto mb-4 bg-white/10" />
          <Skeleton className="h-10 w-24 mx-auto bg-white/10" />
        </div>
      </div>
    </div>
  )
}
