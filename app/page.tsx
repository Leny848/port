'use client'

import { useEffect, useState } from 'react'
import { Github, Linkedin, Mail, ExternalLink, Code2, Terminal, Cpu, Globe } from 'lucide-react'

interface Project {
  id: string
  title: string
  description: string
  tech: string[]
  link: string
  github: string
}

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/projects')
      .then(r => r.json())
      .then(data => {
        setProjects(data.projects || [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const defaultProjects: Project[] = [
    {
      id: '1',
      title: 'E-Commerce Platform',
      description: 'Full-stack e-commerce with payment integration, cart, and admin dashboard.',
      tech: ['Next.js', 'TypeScript', 'Stripe', 'Prisma'],
      link: '#',
      github: '#',
    },
    {
      id: '2',
      title: 'Task Management App',
      description: 'Real-time collaborative task manager with drag-and-drop and team features.',
      tech: ['React', 'Node.js', 'Socket.io', 'MongoDB'],
      link: '#',
      github: '#',
    },
    {
      id: '3',
      title: 'AI Content Generator',
      description: 'AI-powered tool for generating blog posts, social media content, and more.',
      tech: ['Python', 'OpenAI', 'FastAPI', 'React'],
      link: '#',
      github: '#',
    },
  ]

  const displayProjects = projects.length > 0 ? projects : defaultProjects

  return (
    <main className="min-h-screen">
      <section className="relative px-6 py-20 lg:px-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-6 flex justify-center gap-4">
            <Cpu className="w-8 h-8 text-blue-400" />
            <Code2 className="w-8 h-8 text-blue-400" />
            <Terminal className="w-8 h-8 text-blue-400" />
          </div>
          <h1 className="text-5xl lg:text-7xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Chukwuma Promise
          </h1>
          <p className="text-xl text-gray-400 mb-8">Full Stack Developer | Problem Solver | Tech Enthusiast</p>
          <div className="flex justify-center gap-6">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-gray-800 hover:bg-gray-700 transition">
              <Github className="w-6 h-6" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-gray-800 hover:bg-gray-700 transition">
              <Linkedin className="w-6 h-6" />
            </a>
            <a href="mailto:chukwuma@example.com" className="p-3 rounded-full bg-gray-800 hover:bg-gray-700 transition">
              <Mail className="w-6 h-6" />
            </a>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 lg:px-20 bg-gray-900/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Technical Skills</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js', 'Python', 'PostgreSQL', 'MongoDB', 'Docker', 'AWS', 'Git', 'Tailwind'].map(skill => (
              <div key={skill} className="p-4 rounded-lg bg-gray-800 text-center hover:bg-gray-700 transition">
                {skill}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16 lg:px-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-2 text-center">Featured Projects</h2>
          <p className="text-gray-400 text-center mb-8">
            {loading ? 'Loading projects...' : projects.length === 0 ? 'No projects added yet. Go to /admin to add projects.' : `${projects.length} project(s) loaded`}
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayProjects.map(project => (
              <div key={project.id} className="rounded-xl bg-gray-800 border border-gray-700 overflow-hidden hover:border-blue-500 transition">
                <div className="h-40 bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                  <Globe className="w-12 h-12 text-white/50" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-gray-400 text-sm mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map(t => (
                      <span key={t} className="px-2 py-1 text-xs rounded-full bg-blue-900/50 text-blue-300">{t}</span>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-sm text-blue-400 hover:text-blue-300">
                      <ExternalLink className="w-4 h-4" /> Live Demo
                    </a>
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-sm text-gray-400 hover:text-white">
                      <Github className="w-4 h-4" /> Code
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="px-6 py-8 text-center text-gray-500 border-t border-gray-800">
        <p>© 2024 Chukwuma Promise. Built with Next.js & Tailwind CSS.</p>
        <a href="/admin" className="text-sm text-gray-600 hover:text-gray-400 mt-2 inline-block">Admin Login</a>
      </footer>
    </main>
  )
}
