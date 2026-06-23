import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { FiGithub, FiExternalLink } from 'react-icons/fi'
import { PROJECTS } from '../utils/constants'

const filters = ['All', 'Flutter', 'Firebase', 'BLoC', 'REST API']

function ProjectCard({ project, index, isInView }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="card group relative flex flex-col overflow-hidden"
    >
      {/* Project image placeholder */}
      <div className="h-44 rounded-xl bg-gradient-to-br from-accent/20 to-purple-500/20 mb-5 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <span className="text-4xl relative z-10">📱</span>
        {project.featured && (
          <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-accent/90 text-white text-xs font-medium">
            Featured
          </span>
        )}
      </div>

      <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-accent transition-colors">
        {project.title}
      </h3>
      <p className="text-muted text-sm leading-relaxed mb-4 flex-1">{project.description}</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-5">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="px-2.5 py-1 rounded-lg bg-accent/10 text-accent text-xs font-medium border border-accent/20"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Links */}
      <div className="flex items-center gap-3 mt-auto pt-4 border-t border-white/5">
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-muted hover:text-white text-sm transition-colors"
        >
          <FiGithub size={16} />
          Code
        </a>
        <a
          href={project.live}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-muted hover:text-accent text-sm transition-colors ml-auto"
        >
          Live Demo
          <FiExternalLink size={16} />
        </a>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const { ref, isInView } = useScrollAnimation()
  const [activeFilter, setActiveFilter] = useState('All')

  const filtered = activeFilter === 'All'
    ? PROJECTS
    : PROJECTS.filter((p) => p.tags.includes(activeFilter))

  return (
    <section id="projects" className="py-24 md:py-32 bg-secondary relative">
      <div className="absolute inset-0 bg-grid opacity-50 pointer-events-none" />

      <div ref={ref} className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="text-accent font-mono text-sm text-center mb-2">// what I&apos;ve built</p>
          <h2 className="section-title">
            My <span className="gradient-text">Projects</span>
          </h2>
          <p className="section-subtitle">
            A selection of apps I&apos;ve built across various domains and industries.
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                activeFilter === f
                  ? 'bg-accent text-white shadow-lg shadow-accent/30'
                  : 'bg-surface text-muted hover:text-white border border-white/5 hover:border-accent/30'
              }`}
            >
              {f}
            </button>
          ))}
        </motion.div>

        {/* Project Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={i}
                isInView={isInView}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
