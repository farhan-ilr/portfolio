import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowLeft, FiZap } from 'react-icons/fi'
import { SiAppstore, SiGoogleplay } from 'react-icons/si'
import { PROJECTS } from '../utils/constants'

export default function ProjectDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const project = PROJECTS.find(p => p.slug === slug)

  useEffect(() => { window.scrollTo(0, 0) }, [])

  if (!project) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted mb-4">Project not found.</p>
          <button onClick={() => navigate('/')} className="btn-primary text-sm">
            Go Home
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-text">

      {/* Sticky top bar */}
      <div className="sticky top-0 z-50 bg-black/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <button
            onClick={() => navigate('/#projects')}
            className="flex items-center gap-2 text-muted hover:text-white text-sm transition-colors group"
          >
            <FiArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
            Back to Projects
          </button>
          <span className="font-mono font-bold text-lg tracking-tight">
            <span className="text-white">farhan</span>
            <span className="text-accent">.</span>
          </span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* 16:9 Hero image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative w-full aspect-video rounded-2xl overflow-hidden border border-border mb-10
                     bg-gradient-to-br from-white/5 via-card to-card-2"
        >
          <div className="absolute inset-0 bg-grid-black opacity-40" />
          {project.image ? (
            <img src={project.image} alt={project.title}
              className="absolute inset-0 w-full h-full object-cover" />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
              <motion.span
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="text-7xl drop-shadow-2xl"
              >
                {project.emoji}
              </motion.span>
              <span className="text-muted text-xs font-mono tracking-widest opacity-40">
                IMAGE COMING SOON
              </span>
            </div>
          )}
        </motion.div>

        {/* Title row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6"
        >
          <div>
            {project.category && (
              <span className="text-xs font-mono text-accent-light tracking-widest uppercase block mb-2">
                {project.category}
              </span>
            )}
            <h1 className="text-3xl md:text-4xl font-extrabold text-white">{project.title}</h1>
          </div>

          {/* Store buttons */}
          <div className="flex gap-3 flex-shrink-0">
            {project.appStore && (
              <a href={project.appStore} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-card
                           hover:border-white/20 hover:bg-card-2 transition-all duration-200 group">
                <SiAppstore size={18} className="text-muted group-hover:text-white transition-colors" />
                <div>
                  <p className="text-muted text-[10px] leading-none">Download on the</p>
                  <p className="text-white text-xs font-semibold">App Store</p>
                </div>
              </a>
            )}
            {project.playStore && (
              <a href={project.playStore} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-card
                           hover:border-white/20 hover:bg-card-2 transition-all duration-200 group">
                <SiGoogleplay size={18} className="text-muted group-hover:text-white transition-colors" />
                <div>
                  <p className="text-muted text-[10px] leading-none">Get it on</p>
                  <p className="text-white text-xs font-semibold">Google Play</p>
                </div>
              </a>
            )}
          </div>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-muted text-base leading-loose mb-8 max-w-3xl"
        >
          {project.description}
        </motion.p>

        {/* Tech tags */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-2 mb-12"
        >
          {project.tags.map((tag) => (
            <span key={tag}
              className="px-3 py-1.5 rounded-lg bg-accent/10 text-accent-light text-xs
                         font-mono border border-accent/15">
              {tag}
            </span>
          ))}
        </motion.div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-accent/50 via-accent-2/20 to-transparent mb-12" />

        {/* Roles / Integrations */}
        {project.roles && project.roles.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            <div className="flex items-center gap-2 text-xs font-mono text-accent-light
                            tracking-widest uppercase mb-6">
              <span className="w-4 h-px bg-accent" />
              {project.rolesLabel ?? 'User Roles'}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {project.roles.map((role, i) => (
                <motion.div
                  key={role.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.3 + i * 0.08 }}
                  className="flex items-start gap-4 p-5 rounded-2xl border border-border bg-card
                             hover:border-accent/30 hover:bg-card-2 transition-all duration-200"
                >
                  <span className="text-2xl flex-shrink-0">{role.icon}</span>
                  <div>
                    <h3 className="text-white font-semibold text-sm mb-2">{role.name}</h3>
                    <p className="text-muted text-xs leading-relaxed">{role.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Back button bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-16 pt-8 border-t border-border"
        >
          <button
            onClick={() => navigate('/#projects')}
            className="flex items-center gap-2 text-muted hover:text-white text-sm transition-colors group"
          >
            <FiArrowLeft size={15} className="group-hover:-translate-x-0.5 transition-transform" />
            Back to Projects
          </button>
        </motion.div>

      </div>
    </div>
  )
}
