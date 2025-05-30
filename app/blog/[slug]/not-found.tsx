import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Home } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 pt-20">
      <div className="absolute inset-0 bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-12">
        <div className="flex justify-center items-center min-h-[60vh]">
          <Card className="backdrop-blur-xl bg-white/10 border-white/20 w-full max-w-lg">
            <CardContent className="p-8 text-center">
              <h1 className="text-4xl font-bold text-white mb-4">Blog Post Not Found</h1>
              <p className="text-white/70 mb-8">The blog post you're looking for doesn't exist or has been removed.</p>

              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link href="/blog">
                  <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 w-full sm:w-auto">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Blog
                  </Button>
                </Link>
                <Link href="/">
                  <Button
                    variant="outline"
                    className="border-white/30 text-slate-800 hover:bg-white/10 hover:border-white/50 w-full sm:w-auto"
                  >
                    <Home className="w-4 h-4 mr-2" />
                    Home
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
