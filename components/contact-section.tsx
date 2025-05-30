"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Mail,
  MapPin,
  Phone,
  Send,
  CheckCircle,
  AlertCircle,
  Loader2,
  Calendar,
  Clock,
  Globe,
  Github,
  Linkedin,
  Twitter,
  MessageSquare,
  Copy,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface FormData {
  name: string
  email: string
  subject: string
  message: string
  budget: string
  timeline: string
  projectType: string
}

interface FormErrors {
  name?: string
  email?: string
  subject?: string
  message?: string
}

export default function ContactSection() {
  const { toast } = useToast()
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
    budget: "",
    timeline: "",
    projectType: "",
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const projectTypes = [
    "Web Development",
    "Mobile App",
    "E-commerce",
    "Portfolio",
    "Blog/CMS",
    "API Development",
    "Consulting",
    "Other",
  ]

  const budgetRanges = [
    "Under $1,000",
    "$1,000 - $5,000",
    "$5,000 - $10,000",
    "$10,000 - $25,000",
    "$25,000+",
    "Let's discuss",
  ]

  const timelineOptions = ["ASAP", "1-2 weeks", "1 month", "2-3 months", "3+ months", "Flexible"]

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email"
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required"
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required"
    } else if (formData.message.length < 10) {
      newErrors.message = "Message must be at least 10 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fix the errors in the form",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/contact/route.ts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setIsSubmitted(true)
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
          budget: "",
          timeline: "",
          projectType: "",
        })
        toast({
          title: "Message Sent Successfully! 🎉",
          description: "Thank you for reaching out. I'll get back to you within 24 hours.",
        })
      } else {
        throw new Error("Failed to send message")
      }
    } catch (error) {
      console.error("Contact form error:", error)
      toast({
        title: "Failed to Send Message",
        description: "Please try again or contact me directly via email.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text)
      toast({
        title: `${label} Copied!`,
        description: `${text} has been copied to your clipboard.`,
      })
    } catch (error) {
      console.error("Failed to copy:", error)
    }
  }

  const socialLinks = [
    { icon: Github, href: "https://github.com/akbarkhoja", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com/in/akbarkhoja", label: "LinkedIn" },
    { icon: Twitter, href: "https://twitter.com/akbarkhoja", label: "Twitter" },
  ]

  if (isSubmitted) {
    return (
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="backdrop-blur-xl bg-white/10 border-white/20 rounded-2xl p-12">
            <CheckCircle className="w-20 h-20 text-green-400 mx-auto mb-6" />
            <h2 className="text-4xl font-bold text-white mb-4">Message Sent Successfully!</h2>
            <p className="text-xl text-white/70 mb-8">
              Thank you for reaching out. I'll review your message and get back to you within 24 hours.
            </p>
            <Button
              onClick={() => setIsSubmitted(false)}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              Send Another Message
            </Button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white to-green-200 bg-clip-text text-transparent mb-4">
            Get In Touch
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto mb-8">
            Have a project in mind? Let's collaborate and create something amazing together.
          </p>

          {/* Quick Stats */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Badge variant="secondary" className="bg-white/10 text-white border-white/20">
              <Clock className="w-4 h-4 mr-2" />
              24h Response Time
            </Badge>
            <Badge variant="secondary" className="bg-white/10 text-white border-white/20">
              <MessageSquare className="w-4 h-4 mr-2" />
              Free Consultation
            </Badge>
            <Badge variant="secondary" className="bg-white/10 text-white border-white/20">
              <Globe className="w-4 h-4 mr-2" />
              Available Worldwide
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="backdrop-blur-xl bg-white/10 border-white/20">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Send className="w-6 h-6 text-purple-400" />
                  <h3 className="text-2xl font-bold text-white">Send a Message</h3>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Basic Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Input
                        placeholder="Your Name *"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        className={`bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-purple-400 ${
                          errors.name ? "border-red-400" : ""
                        }`}
                      />
                      {errors.name && (
                        <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.name}
                        </p>
                      )}
                    </div>
                    <div>
                      <Input
                        type="email"
                        placeholder="Your Email *"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className={`bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-purple-400 ${
                          errors.email ? "border-red-400" : ""
                        }`}
                      />
                      {errors.email && (
                        <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <Input
                      placeholder="Subject *"
                      value={formData.subject}
                      onChange={(e) => handleInputChange("subject", e.target.value)}
                      className={`bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-purple-400 ${
                        errors.subject ? "border-red-400" : ""
                      }`}
                    />
                    {errors.subject && (
                      <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.subject}
                      </p>
                    )}
                  </div>

                  {/* Project Details */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <select
                        value={formData.projectType}
                        onChange={(e) => handleInputChange("projectType", e.target.value)}
                        className="w-full bg-white/10 border border-white/20 text-white rounded-md px-3 py-2 focus:border-purple-400 focus:outline-none"
                      >
                        <option value="" className="bg-gray-800">
                          Project Type
                        </option>
                        {projectTypes.map((type) => (
                          <option key={type} value={type} className="bg-gray-800">
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <select
                        value={formData.budget}
                        onChange={(e) => handleInputChange("budget", e.target.value)}
                        className="w-full bg-white/10 border border-white/20 text-white rounded-md px-3 py-2 focus:border-purple-400 focus:outline-none"
                      >
                        <option value="" className="bg-gray-800">
                          Budget Range
                        </option>
                        {budgetRanges.map((budget) => (
                          <option key={budget} value={budget} className="bg-gray-800">
                            {budget}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <select
                        value={formData.timeline}
                        onChange={(e) => handleInputChange("timeline", e.target.value)}
                        className="w-full bg-white/10 border border-white/20 text-white rounded-md px-3 py-2 focus:border-purple-400 focus:outline-none"
                      >
                        <option value="" className="bg-gray-800">
                          Timeline
                        </option>
                        {timelineOptions.map((timeline) => (
                          <option key={timeline} value={timeline} className="bg-gray-800">
                            {timeline}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <Textarea
                      placeholder="Tell me about your project... *"
                      rows={6}
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      className={`bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-purple-400 resize-none ${
                        errors.message ? "border-red-400" : ""
                      }`}
                    />
                    {errors.message && (
                      <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.message}
                      </p>
                    )}
                    <p className="text-white/50 text-sm mt-2">{formData.message.length}/500 characters</p>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 py-3 text-lg font-semibold"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Sending Message...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Info & Social */}
          <div className="space-y-6">
            {/* Contact Information */}
            <Card className="backdrop-blur-xl bg-white/10 border-white/20">
              <CardContent className="p-6">
                <h4 className="text-xl font-bold text-white mb-6">Contact Information</h4>

                <div className="space-y-4">
                  <div
                    className="flex items-center gap-4 group cursor-pointer"
                    onClick={() => copyToClipboard("akbarjoraxojayev7@gmail.com", "Email")}
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h5 className="text-white font-semibold">Email</h5>
                      <p className="text-white/70 group-hover:text-white transition-colors">
                        akbarjoraxojayev7@gmail.com
                      </p>
                    </div>
                    <Copy className="w-4 h-4 text-white/50 group-hover:text-white transition-colors" />
                  </div>

                  <div
                    className="flex items-center gap-4 group cursor-pointer"
                    onClick={() => copyToClipboard("+998 (93) 075-70-18", "Phone")}
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-blue-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h5 className="text-white font-semibold">Phone</h5>
                      <p className="text-white/70 group-hover:text-white transition-colors">+998 (93) 075-70-18</p>
                    </div>
                    <Copy className="w-4 h-4 text-white/50 group-hover:text-white transition-colors" />
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-600 to-red-600 rounded-full flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h5 className="text-white font-semibold">Location</h5>
                      <p className="text-white/70">Tashkent, UZB</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Availability */}
            

            {/* Social Links */}
            <Card className="backdrop-blur-xl bg-white/10 border-white/20">
              <CardContent className="p-6">
                <h4 className="text-lg font-semibold text-white mb-4">Connect With Me</h4>
                <div className="flex gap-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full flex items-center justify-center transition-all hover:scale-110"
                    >
                      <social.icon className="w-5 h-5 text-white" />
                    </a>
                  ))}
                </div>
                <p className="text-white/50 text-sm mt-3">Follow me for updates on latest projects and tech insights</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
