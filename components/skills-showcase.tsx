"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion, AnimatePresence } from "framer-motion"

const skillCategories = [
  {
    name: "Frontend",
    skills: [
      { name: "React", level: 95, color: "from-blue-500 to-cyan-500" },
      { name: "Next.js", level: 90, color: "from-gray-700 to-gray-900" },
      { name: "TypeScript", level: 88, color: "from-blue-600 to-blue-800" },
      { name: "Tailwind CSS", level: 92, color: "from-teal-400 to-blue-500" },
    ],
  },
  {
    name: "Backend",
    skills: [
      { name: "Node.js", level: 85, color: "from-green-500 to-green-700" },
      { name: "Python", level: 80, color: "from-yellow-400 to-yellow-600" },
      { name: "MongoDB", level: 82, color: "from-green-600 to-green-800" },
      { name: "PostgreSQL", level: 78, color: "from-blue-500 to-blue-700" },
      { name: "GraphQL", level: 70, color: "from-pink-500 to-purple-600" },
    ],
  },
  {
    name: "Tools & Others",
    skills: [
      { name: "Git", level: 90, color: "from-orange-500 to-red-500" },
      { name: "Docker", level: 75, color: "from-blue-400 to-blue-600" },
      { name: "AWS", level: 70, color: "from-yellow-500 to-orange-500" },
      { name: "Figma", level: 85, color: "from-purple-500 to-pink-500" },
      { name: "Jest", level: 80, color: "from-red-500 to-red-700" },
    ],
  },
]

export default function SkillsShowcase() {
  const [activeCategory, setActiveCategory] = useState(0)

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white to-orange-200 bg-clip-text text-transparent mb-4">
            Skills & Expertise
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            A comprehensive overview of my technical skills and proficiency levels across different technologies.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {skillCategories.map((category, index) => (
            <button
              key={category.name}
              onClick={() => setActiveCategory(index)}
              className={`px-6 py-3 rounded-full backdrop-blur-xl border transition-all duration-300 ${
                activeCategory === index
                  ? "bg-white/20 border-white/40 text-white"
                  : "bg-white/10 border-white/20 text-white/70 hover:bg-white/15 hover:text-white"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {skillCategories[activeCategory].skills.map((skill, index) => (
              <Card
                key={skill.name}
                className="backdrop-blur-xl bg-white/10 border-white/20 hover:bg-white/15 transition-all duration-300"
              >
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-white font-semibold text-lg">{skill.name}</h3>
                    <Badge variant="secondary" className="bg-white/10 text-white/90 border-white/20">
                      {skill.level}%
                    </Badge>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
                    <motion.div
                      className={`h-full bg-gradient-to-r ${skill.color} rounded-full`}
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
