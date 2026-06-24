import { motion } from 'framer-motion'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { FiGithub } from 'react-icons/fi'
import { SiAppstore, SiGoogleplay } from 'react-icons/si'
import { PROJECTS } from '../utils/constants'

function RoleCard({ role, delay, isInView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] }}
      className="flex items-start gap-3 p-4 rounded-xl border border-border bg-black/40
                 hover:border-accent/30 hover:bg-card transition-all duration-200 group"
    >
      <span className="text-xl flex-shrink-0 mt-0.5">{role.icon}</span>
      <div>
        <span className="text-white text-sm font-semibold block mb-1 group-hover:text-accent-light transition-colors">
          {role.name}
        </span>
        <p className="text-muted text-xs leading-relaxed">{role.desc}</p>
      </div>
    </motion.div>
  )
}

function FeaturedProject({ project, isInView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-2xl border border-border bg-card overflow-hidden"
    >
      {/* Header banner */}
      <div className="relative h-36 bg-gradient-to-br from-blue-600/20 via-sky-500/10 to-transparent
                      flex items-center px-8 gap-5 border-b border-border overflow-hidden">
        <div className="absolute inset-0 bg-grid-black opacity-40" />
        <div className="absolute -right-10 -top-10 w-48 h-48 rounded-full bg-accent/10 blur-3xl" />

        <span className="text-5xl relative z-10">{project.emoji}</span>
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-white font-extrabold text-2xl">{project.title}</h3>
            <span className="px-2 py-0.5 rounded-md bg-accent/20 text-accent-light text-xs font-mono border border-accent/20">
              Featured
            </span>
          </div>
          <p className="text-muted text-xs">{project.subtitle}</p>
        </div>

        <div className="ml-auto relative z-10 flex gap-2">
          {project.github && project.github !== '#' && (
            <a href={project.github} target="_blank" rel="noopener noreferrer"
              className="w-8 h-8 rounded-lg border border-border bg-black/40 flex items-center justify-center
                         text-muted hover:text-white hover:border-accent/40 transition-all">
              <FiGithub size={14} />
            </a>
          )}
          {project.appStore && (
            <a href={project.appStore} target="_blank" rel="noopener noreferrer"
              className="w-8 h-8 rounded-lg border border-border bg-black/40 flex items-center justify-center
                         text-muted hover:text-white hover:border-white/30 transition-all"
              title="App Store">
              <SiAppstore size={14} />
            </a>
          )}
          {project.playStore && (
            <a href={project.playStore} target="_blank" rel="noopener noreferrer"
              className="w-8 h-8 rounded-lg border border-border bg-black/40 flex items-center justify-center
                         text-muted hover:text-white hover:border-white/30 transition-all"
              title="Google Play">
              <SiGoogleplay size={14} />
            </a>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="p-6">
        {/* Category */}
        {project.category && (
          <p className="text-xs font-mono text-accent-light tracking-widest uppercase mb-3">
            {project.category}
          </p>
        )}

        <p className="text-muted text-sm leading-relaxed mb-5">{project.description}</p>

        {/* Store buttons */}
        {(project.appStore || project.playStore) && (
          <div className="flex flex-wrap gap-3 mb-6">
            {project.appStore && (
              <a href={project.appStore} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border bg-black/50
                           hover:border-white/25 hover:bg-white/5 transition-all duration-200 group">
                <SiAppstore size={16} className="text-muted group-hover:text-white transition-colors" />
                <div className="text-left">
                  <p className="text-muted text-[10px] leading-none">Download on the</p>
                  <p className="text-white text-xs font-semibold leading-tight">App Store</p>
                </div>
              </a>
            )}
            {project.playStore && (
              <a href={project.playStore} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border bg-black/50
                           hover:border-white/25 hover:bg-white/5 transition-all duration-200 group">
                <SiGoogleplay size={16} className="text-muted group-hover:text-white transition-colors" />
                <div className="text-left">
                  <p className="text-muted text-[10px] leading-none">Get it on</p>
                  <p className="text-white text-xs font-semibold leading-tight">Google Play</p>
                </div>
              </a>
            )}
          </div>
        )}

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 mb-7">
          {project.tags.map((tag) => (
            <span key={tag}
              className="px-2.5 py-1 rounded-lg bg-accent/10 text-accent-light text-xs
                         font-mono border border-accent/15">
              {tag}
            </span>
          ))}
        </div>

        {/* Roles */}
        {project.roles && (
          <>
            <div className="flex items-center gap-2 text-xs font-mono text-accent-light
                            tracking-widest uppercase mb-4">
              <span className="w-4 h-px bg-accent" />
              User Roles
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.roles.map((role, i) => (
                <RoleCard key={role.name} role={role} delay={0.3 + i * 0.07} isInView={isInView} />
              ))}
            </div>
          </>
        )}
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
        style={{ background: 'radial-gradient(ellipse, rgba(37,99,235,0.07) 0%, transparent 70%)' }} />

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

        {/* Projects */}
        <div className="space-y-8">
          {PROJECTS.map((project) =>
            project.roles ? (
              <FeaturedProject key={project.id} project={project} isInView={isInView} />
            ) : (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="card-hover text-center py-16 text-muted text-sm"
              >
                More projects coming soon...
              </motion.div>
            )
          )}
        </div>
      </div>
    </section>
  )
}
