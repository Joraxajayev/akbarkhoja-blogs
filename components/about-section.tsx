"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { Code, Palette, Zap, Users } from "lucide-react"

const features = [
  {
    icon: Code,
    title: "Clean Code",
    description: "Writing maintainable, scalable, and well-documented code that stands the test of time.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Palette,
    title: "Design Focus",
    description: "Creating beautiful, intuitive interfaces that provide exceptional user experiences.",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Zap,
    title: "Performance",
    description: "Optimizing applications for speed, efficiency, and seamless user interactions.",
    color: "from-yellow-500 to-orange-500",
  },
  {
    icon: Users,
    title: "Collaboration",
    description: "Working effectively with teams to deliver projects on time and exceed expectations.",
    color: "from-green-500 to-teal-500",
  },
]

const achievements = [
  { number: "50+", label: "Projects Completed" },
  { number: "3+", label: "Years Experience" },
  { number: "15+", label: "Technologies" },
  { number: "100%", label: "Client Satisfaction" },
]

export default function AboutSection() {
  return (
    <section id="about" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            About Me
          </motion.h2>
          <motion.p
            className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            I'm a passionate frontend developer with a love for creating digital experiences that are not only
            functional but also beautiful and intuitive. With expertise in modern web technologies, I bring ideas to
            life through code.
          </motion.p>
        </div>

        {/* Achievement Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {achievements.map((achievement, index) => (
            <Card key={achievement.label} className="backdrop-blur-xl bg-white/10 border-white/20 text-center">
              <CardContent className="p-6">
                <motion.div
                  className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  {achievement.number}
                </motion.div>
                <p className="text-white/70 text-sm">{achievement.label}</p>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="backdrop-blur-xl bg-white/10 border-white/20 hover:bg-white/15 transition-all duration-300 h-full">
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <div
                      className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-lg flex items-center justify-center`}
                    >
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white">{feature.title}</h3>
                  </div>
                  <p className="text-white/70 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Personal Touch */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Card className="backdrop-blur-xl bg-white/10 border-white/20 max-w-4xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-white mb-4">My Journey</h3>
              <p className="text-white/70 leading-relaxed mb-6">
                My journey in web development started with curiosity and has evolved into a passion for creating
                meaningful digital experiences. I believe that great software is not just about functionality—it's about
                creating solutions that people love to use.
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                {["Problem Solver", "Creative Thinker", "Team Player", "Continuous Learner"].map((trait) => (
                  <Badge
                    key={trait}
                    variant="secondary"
                    className="bg-white/10 text-white/90 border-white/20 hover:bg-white/20 transition-colors"
                  >
                    {trait}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
