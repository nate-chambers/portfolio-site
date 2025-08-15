import React from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react'
import { Button } from './ui/button.jsx'
import { Badge } from './ui/badge.jsx'

const BlogPost = ({ post, onBack }) => {
  // Helper function to parse markdown text
  const parseMarkdownText = (text) => {
    if (!text.includes('**')) return text
    
    const parts = text.split('**')
    return parts.map((part, i) => 
      i % 2 === 1 ? <strong key={i}>{part}</strong> : part
    )
  }

  // Helper function to render content with proper list grouping
  const renderContent = (content) => {
    const lines = content.split('\n')
    const elements = []
    let i = 0

    while (i < lines.length) {
      const line = lines[i]
      
      // Handle headers
      if (line.startsWith('# ')) {
        elements.push(<h1 key={i} className="text-2xl font-bold mt-8 mb-4">{line.substring(2)}</h1>)
        i++
      }
      else if (line.startsWith('## ')) {
        elements.push(<h2 key={i} className="text-xl font-semibold mt-6 mb-3">{line.substring(3)}</h2>)
        i++
      }
      else if (line.startsWith('### ')) {
        elements.push(<h3 key={i} className="text-lg font-medium mt-4 mb-2">{line.substring(4)}</h3>)
        i++
      }
      
      // Handle bullet lists - group consecutive bullet points
      else if (line.startsWith('- ')) {
        const listItems = []
        while (i < lines.length && lines[i].startsWith('- ')) {
          listItems.push(
            <li key={`bullet-${i}`}>{parseMarkdownText(lines[i].substring(2))}</li>
          )
          i++
        }
        if (listItems.length > 0) {
          elements.push(
            <ul key={`ul-${i}`} className="list-disc ml-6 mb-3">
              {listItems}
            </ul>
          )
        }
      }
      
      // Handle numbered lists - group consecutive numbered points
      else if (line.startsWith('1. ')) {
        const listItems = []
        let counter = 1
        while (i < lines.length && lines[i].startsWith(`${counter}. `)) {
          listItems.push(
            <li key={`numbered-${i}`}>{parseMarkdownText(lines[i].substring(3))}</li>
          )
          i++
          counter++
        }
        if (listItems.length > 0) {
          elements.push(
            <ol key={`ol-${i}`} className="list-decimal ml-6 mb-3">
              {listItems}
            </ol>
          )
        }
      }
      
      // Handle empty lines
      else if (line.trim() === '') {
        elements.push(<div key={i} className="h-3"></div>)
        i++
      }
      
      // Handle regular paragraphs with markdown
      else {
        elements.push(<p key={i} className="mb-3">{parseMarkdownText(line)}</p>)
        i++
      }
    }

    return elements
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mx-auto max-w-4xl px-4 py-8"
    >
      {/* Back button */}
      <Button
        variant="outline"
        onClick={onBack}
        className="mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to blog
      </Button>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
        
        {/* Meta information */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-600 dark:text-neutral-400 mb-6">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            {new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            {post.readTime}
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {post.tags.map(tag => (
            <Badge key={tag} variant="secondary">
              <Tag className="mr-1 h-3 w-3" />
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="prose prose-neutral dark:prose-invert max-w-none">
        {renderContent(post.content)}
      </div>
    </motion.div>
  )
}

export default BlogPost
