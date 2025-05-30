import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 pt-20">
      <div className="absolute inset-0 bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12">
        {/* Header Skeleton */}
        <div className="text-center mb-16">
          <Skeleton className="h-16 w-3/4 mx-auto mb-6 bg-white/10" />
          <Skeleton className="h-6 w-full max-w-2xl mx-auto mb-2 bg-white/10" />
          <Skeleton className="h-6 w-full max-w-xl mx-auto bg-white/10" />
        </div>

        {/* Filters Skeleton */}
        <div className="mb-12">
          <Card className="backdrop-blur-xl bg-white/10 border-white/20">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <Skeleton className="h-10 flex-1 bg-white/10" />
                <Skeleton className="h-10 w-32 bg-white/10" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Blog Posts Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array(6)
            .fill(0)
            .map((_, i) => (
              <Card key={i} className="backdrop-blur-xl bg-white/10 border-white/20">
                <CardContent className="p-0">
                  <Skeleton className="w-full h-64 rounded-t-lg bg-white/10" />
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Skeleton className="h-4 w-4 rounded-full bg-white/10" />
                      <Skeleton className="h-4 w-32 bg-white/10" />
                    </div>
                    <Skeleton className="h-7 w-3/4 mb-3 bg-white/10" />
                    <Skeleton className="h-4 w-full mb-2 bg-white/10" />
                    <Skeleton className="h-4 w-full mb-2 bg-white/10" />
                    <Skeleton className="h-4 w-2/3 mb-4 bg-white/10" />
                    <div className="flex flex-wrap gap-2 mb-6">
                      <Skeleton className="h-6 w-16 rounded-full bg-white/10" />
                      <Skeleton className="h-6 w-20 rounded-full bg-white/10" />
                      <Skeleton className="h-6 w-12 rounded-full bg-white/10" />
                    </div>
                    <Skeleton className="h-8 w-28 bg-white/10" />
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>
    </div>
  )
}
