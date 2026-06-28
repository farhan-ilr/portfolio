import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { FiArrowRight } from 'react-icons/fi'
import { SiAppstore, SiGoogleplay } from 'react-icons/si'
import { PROJECTS } from '../utils/constants'

function ProjectCard({ project, index, isInView }) {
  const navigate = useNavigate()

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      onClick={() => navigate(`/projects/${project.slug}`)}
      className="group rounded-2xl border border-border bg-card overflow-hidden cursor-pointer
                 hover:border-accent/30 transition-all duration-300 hover:shadow-glow-sm"
    >
      {/* 16:9 Image / Placeholder */}
      <div className="relative w-full aspect-video bg-gradient-to-br from-white/5 via-card to-card-2
                      overflow-hidden">
        <div className="absolute inset-0 bg-grid-black opacity-40" />

        {project.image ? (
          <img src={project.image} alt={project.title}
            className="absolute inset-0 w-full h-full object-cover" />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
            <motion.span
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: index * 0.4 }}
              className="text-5xl drop-shadow-xl"
            >
              {project.emoji}
            </motion.span>
            <span className="text-muted text-xs font-mono tracking-widest opacity-50">
              IMAGE COMING SOON
            </span>
          </div>
        )}

        {/* Category badge */}
        {project.category && (
          <div className="absolute top-3 left-3">
            <span className="px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-sm
                             text-accent-light text-[10px] font-mono tracking-widest border border-accent/20">
              {project.category}
            </span>
          </div>
        )}

        {/* Store icons overlay */}
        <div className="absolute top-3 right-3 flex gap-1.5">
          {project.appStore && (
            <a href={project.appStore} target="_blank" rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              className="w-7 h-7 rounded-lg bg-black/70 backdrop-blur-sm border border-white/10
                         flex items-center justify-center text-muted hover:text-white transition-colors">
              <SiAppstore size={13} />
            </a>
          )}
          {project.playStore && (
            <a href={project.playStore} target="_blank" rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              className="w-7 h-7 rounded-lg bg-black/70 backdrop-blur-sm border border-white/10
                         flex items-center justify-center text-muted hover:text-white transition-colors">
              <SiGoogleplay size={13} />
            </a>
          )}
        </div>
      </div>

      {/* Card body */}
      <div className="p-5">
        <h3 className="text-white font-bold text-lg mb-1.5 group-hover:text-accent-light transition-colors">
          {project.title}
        </h3>
        <p className="text-muted text-sm leading-relaxed mb-4 line-clamp-3">
          {project.description}
        </p>

        {/* View link */}
        <div className="flex items-center gap-2 text-sm font-medium text-accent-light
                        group-hover:text-white transition-colors">
          View Project
          <FiArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const { ref, isInView } = useScrollAnimation()

  return (
    <section id="projects" className="py-24 md:py-32 bg-secondary relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-black opacity-60 pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-64 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(225,29,72,0.05) 0%, transparent 70%)' }} />

      <div ref={ref} className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-14">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 text-xs font-mono text-accent-light
                             tracking-[0.2em] uppercase mb-3">
              <span className="w-4 h-px bg-accent" />
              portfolio
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">
              My Projects
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-muted text-sm max-w-xs text-left sm:text-right leading-relaxed"
          >
            Real-world apps I&apos;ve designed, built, and shipped.
          </motion.p>
        </div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          style={{ originX: 0 }}
          className="h-px bg-gradient-to-r from-accent/60 via-accent-2/30 to-transparent mb-14"
        />

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} isInView={isInView} />
          ))}
        </div>

      </div>
    </section>
  )
}
