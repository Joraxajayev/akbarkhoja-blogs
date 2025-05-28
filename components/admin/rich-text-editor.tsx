"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Bold, Italic, Underline, List, ListOrdered, Link, ImageIcon, Code, Quote } from "lucide-react"

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export default function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  const [selectedText, setSelectedText] = useState("")

  const handleCommand = useCallback((command: string, value?: string) => {
    document.execCommand(command, false, value)
  }, [])

  const handleTextChange = useCallback(
    (e: React.FormEvent<HTMLDivElement>) => {
      const content = e.currentTarget.innerHTML
      onChange(content)
    },
    [onChange],
  )

  const insertImage = useCallback(() => {
    const url = prompt("Enter image URL:")
    if (url) {
      handleCommand("insertImage", url)
    }
  }, [handleCommand])

  const insertLink = useCallback(() => {
    const url = prompt("Enter link URL:")
    if (url) {
      handleCommand("createLink", url)
    }
  }, [handleCommand])

  return (
    <Card className="backdrop-blur-xl bg-white/10 border-white/20">
      <CardContent className="p-0">
        {/* Toolbar */}
        <div className="flex flex-wrap gap-1 p-3 border-b border-white/20">
          <Button
            size="sm"
            variant="ghost"
            className="text-white/70 hover:text-white hover:bg-white/10"
            onClick={() => handleCommand("bold")}
          >
            <Bold className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="text-white/70 hover:text-white hover:bg-white/10"
            onClick={() => handleCommand("italic")}
          >
            <Italic className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="text-white/70 hover:text-white hover:bg-white/10"
            onClick={() => handleCommand("underline")}
          >
            <Underline className="w-4 h-4" />
          </Button>

          <div className="w-px h-6 bg-white/20 mx-1" />

          <Button
            size="sm"
            variant="ghost"
            className="text-white/70 hover:text-white hover:bg-white/10"
            onClick={() => handleCommand("insertUnorderedList")}
          >
            <List className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="text-white/70 hover:text-white hover:bg-white/10"
            onClick={() => handleCommand("insertOrderedList")}
          >
            <ListOrdered className="w-4 h-4" />
          </Button>

          <div className="w-px h-6 bg-white/20 mx-1" />

          <Button
            size="sm"
            variant="ghost"
            className="text-white/70 hover:text-white hover:bg-white/10"
            onClick={insertLink}
          >
            <Link className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="text-white/70 hover:text-white hover:bg-white/10"
            onClick={insertImage}
          >
            <ImageIcon className="w-4 h-4" />
          </Button>

          <div className="w-px h-6 bg-white/20 mx-1" />

          <Button
            size="sm"
            variant="ghost"
            className="text-white/70 hover:text-white hover:bg-white/10"
            onClick={() => handleCommand("formatBlock", "blockquote")}
          >
            <Quote className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="text-white/70 hover:text-white hover:bg-white/10"
            onClick={() => handleCommand("formatBlock", "pre")}
          >
            <Code className="w-4 h-4" />
          </Button>
        </div>

        {/* Editor */}
        <div
          contentEditable
          className="min-h-[300px] p-4 text-white focus:outline-none prose prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: value }}
          onInput={handleTextChange}
          style={{
            wordBreak: "break-word",
          }}
          data-placeholder={placeholder}
        />
      </CardContent>
    </Card>
  )
}
