"use client"

import { Button } from "@/components/ui/button"
import { Github, Linkedin, Twitter, Mail, Heart } from "lucide-react"
import { motion } from "framer-motion"

export default function Footer() {
  const socialLinks = [
    { name: "GitHub", icon: Github, href: "https://github.com/Joraxajayev" },
    { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com/in/Joraxojayev" },
    { name: "Twitter", icon: Twitter, href: "https://twitter.com/akbarkhoja" },
    { name: "Email", icon: Mail, href: "mailto:akbarjoraxojayev7@gmail.com" },
  ]

  const quickLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Blog", href: "#blog" },
    { name: "Contact", href: "#contact" },
  ]

  return (
    <footer className="relative bg-gradient-to-t from-purple-800/90 via-blue-600/50 to-transparent backdrop-blur-xl border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <motion.h3
              className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
            >
              Frontend Developer
            </motion.h3>
            <p className="text-white/70 leading-relaxed">
              Crafting beautiful, interactive experiences with modern web technologies. Passionate about clean code and
              innovative design.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button variant="ghost" size="sm" className="text-white/70 hover:text-white hover:bg-white/10 p-2">
                    <link.icon className="w-5 h-5" />
                  </Button>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Quick Links</h4>
            <div className="space-y-2">
              {quickLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  className="block text-white/70 hover:text-white transition-colors duration-200"
                  whileHover={{ x: 5 }}
                >
                  {link.name}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Get In Touch</h4>
            <div className="space-y-2 text-white/70">
              <p>📧 akbarjoraxojayev7@gmail.com</p>
              <p>📱 +998 (93) 075-70-18</p>
              <p>📍 Tashkent, UZB</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/60 text-sm flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-red-400" /> using Next.js & TypeScript
          </p>
          <p className="text-white/60 text-sm mt-4 md:mt-0">
            © {new Date().getFullYear()} Your Name. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
