import { Suspense } from "react"
import Hero from "@/components/hero"
import AboutSection from "@/components/about-section"
import FeaturedProjectsServer from "@/components/featured-projects"
import LatestBlogPosts from "@/components/latest-blog-posts"
import SkillsShowcase from "@/components/skills-showcase"
import Testimonials from "@/components/testimonials"
import ContactSection from "@/components/contact-section"
import LoadingSpinner from "@/components/loading-spinner"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="absolute inset-0 bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

      <section id="home">
        <Hero />
      </section>

      <section id="about">
        <AboutSection />
      </section>

      <section id="projects">
        <Suspense fallback={<LoadingSpinner size="lg" text="Loading projects..." />}>
          <FeaturedProjectsServer />
        </Suspense>
      </section>

      <Suspense fallback={<LoadingSpinner size="lg" text="Loading skills..." />}>
        <SkillsShowcase />
      </Suspense>

      <section id="blog">
        <Suspense fallback={<LoadingSpinner size="lg" text="Loading blog posts..." />}>
          <LatestBlogPosts />
        </Suspense>
      </section>

      <Suspense fallback={<LoadingSpinner size="lg" text="Loading testimonials..." />}>
        <Testimonials />
      </Suspense>

      <section id="contact">
        <ContactSection />
      </section>
    </div>
  )
}
