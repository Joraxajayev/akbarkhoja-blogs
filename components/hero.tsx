"use client";

import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4">
      {/* Floating orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute top-3/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="backdrop-blur-xl bg-white/10 rounded-3xl p-8 border border-white/20 shadow-2xl">
          <motion.h1
            className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent mb-6"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}>
            Frontend
            <br />
            <span className="text-5xl md:text-7xl">Developer</span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-white/80 mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}>
            Crafting beautiful, interactive experiences with modern web
            technologies.
            <br />
            Passionate about clean code and innovative design.
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-4 justify-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}>
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() =>
                window.open(
                  "https://github.com/Joraxajayev",
                  "_blank"
                )
              }>
              <Github className="w-5 h-5 mr-2" />
              GitHub
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/30 text-slate-800 hover:bg-white/10 backdrop-blur-sm"
              onClick={() =>
                window.open(
                  "https://www.linkedin.com/in/akbarxoja-joraxojayev-263182353",
                  "_blank"
                )
              }>
              <Linkedin className="w-5 h-5 mr-2" />
              LinkedIn
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/30 text-slate-800 hover:bg-white/10 backdrop-blur-sm">
              <Mail className="w-5 h-5 mr-2" />
              Contact
            </Button>
          </motion.div>

          <motion.div
            className="animate-bounce"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}>
            <ArrowDown className="w-8 h-8 text-white/60 mx-auto" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
