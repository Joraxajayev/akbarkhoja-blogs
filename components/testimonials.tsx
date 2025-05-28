"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Product Manager",
    company: "TechCorp",
    content:
      "Working with this developer was an absolute pleasure. They delivered a beautiful, responsive website that exceeded our expectations. The attention to detail and communication throughout the project was outstanding.",
    rating: 5,
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    name: "Michael Chen",
    role: "Startup Founder",
    company: "InnovateLab",
    content:
      "The quality of work and professionalism shown was remarkable. Our web application was delivered on time and the code quality was exceptional. I would definitely work with them again.",
    rating: 5,
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    name: "Emily Rodriguez",
    role: "Marketing Director",
    company: "GrowthCo",
    content:
      "They transformed our outdated website into a modern, fast, and user-friendly platform. The results speak for themselves - our conversion rates increased by 40% after the redesign.",
    rating: 5,
    avatar: "/placeholder.svg?height=60&width=60",
  },
]

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white to-yellow-200 bg-clip-text text-transparent mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            What Clients Say
          </motion.h2>
          <motion.p
            className="text-xl text-white/70 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Don't just take my word for it. Here's what some of my clients have to say about working with me.
          </motion.p>
        </div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="backdrop-blur-xl bg-white/10 border-white/20">
                <CardContent className="p-8 md:p-12">
                  <div className="flex justify-center mb-6">
                    <Quote className="w-12 h-12 text-purple-400" />
                  </div>

                  <blockquote className="text-lg md:text-xl text-white/90 text-center leading-relaxed mb-8">
                    "{testimonials[currentIndex].content}"
                  </blockquote>

                  <div className="flex justify-center mb-6">
                    <div className="flex space-x-1">
                      {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-center space-x-4">
                    <img
                      src={testimonials[currentIndex].avatar || "/placeholder.svg"}
                      alt={testimonials[currentIndex].name}
                      className="w-12 h-12 rounded-full border-2 border-white/20"
                    />
                    <div className="text-center">
                      <h4 className="text-white font-semibold">{testimonials[currentIndex].name}</h4>
                      <p className="text-white/60 text-sm">
                        {testimonials[currentIndex].role} at {testimonials[currentIndex].company}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-center space-x-4 mt-8">
            <Button
              variant="ghost"
              size="sm"
              onClick={prevTestimonial}
              className="text-white/70 hover:text-white hover:bg-white/10"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={nextTestimonial}
              className="text-white/70 hover:text-white hover:bg-white/10"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-2 mt-4">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                  index === currentIndex ? "bg-purple-400" : "bg-white/30"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
