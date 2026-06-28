import { motion } from 'framer-motion'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { EXPERIENCE, EDUCATION } from '../utils/constants'
import { FiBriefcase, FiCalendar, FiArrowRight, FiZap, FiBook } from 'react-icons/fi'

function TimelineCard({ children, index, isInView, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

export default function Experience() {
  const { ref, isInView } = useScrollAnimation()

  return (
    <section id="experience" className="py-24 md:py-32 bg-black">
      <div ref={ref} className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="inline-flex items-center gap-2 text-xs font-mono text-accent-light tracking-[0.2em] uppercase mb-3">
            <span className="w-4 h-px bg-accent" />
            resume
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">
            Experience &amp; Education
          </h2>
        </motion.div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          style={{ originX: 0 }}
          className="h-px bg-gradient-to-r from-accent/60 via-accent-2/30 to-transparent mb-14"
        />

        {/* Two-column layout on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">

          {/* ── Left: Work Experience (3/5) ── */}
          <div className="lg:col-span-3 space-y-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="w-8 h-8 rounded-lg bg-accent/15 border border-accent/25 flex items-center justify-center">
                <FiBriefcase size={14} className="text-accent-light" />
              </div>
              <span className="text-white font-bold text-sm tracking-wide">Work Experience</span>
            </motion.div>

            {EXPERIENCE.map((exp, i) => (
              <TimelineCard key={exp.id} index={i} isInView={isInView} delay={0.25 + i * 0.14}>
                <div className="relative pl-5 border-l border-border hover:border-accent/40 transition-colors duration-300">
                  {/* Dot */}
                  <span className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-accent border-2 border-black" />

                  <div className="bg-card border border-border rounded-2xl p-6 hover:border-accent/30 transition-colors duration-300">
                    {/* Role + badge */}
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                      <div>
                        <h3 className="text-white font-bold text-base leading-snug">{exp.role}</h3>
                        <p className="text-accent-light text-sm font-medium mt-0.5">{exp.company}</p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="flex items-center gap-1.5 text-muted text-xs font-mono">
                          <FiCalendar size={11} />
                          {exp.period}
                        </span>
                        {exp.current && (
                          <span className="flex items-center gap-1 px-2 py-0.5 rounded-full
                                           bg-accent/15 text-accent-light text-[10px] font-medium border border-accent/25">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                            Active
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Bullets */}
                    <ul className="space-y-2">
                      {exp.description.map((point, j) => (
                        <li key={j} className="flex items-start gap-2.5 text-muted text-sm leading-relaxed">
                          <FiArrowRight size={12} className="text-accent flex-shrink-0 mt-1" />
                          {point}
                        </li>
                      ))}
                    </ul>

                    {/* Integrations */}
                    {exp.integrations && (
                      <div className="mt-5 pt-4 border-t border-border">
                        <div className="flex items-center gap-2 text-[10px] font-mono text-accent-light tracking-widest uppercase mb-3">
                          <FiZap size={11} />
                          Key Integrations
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {exp.integrations.map((item) => (
                            <span key={item.label}
                              className="px-2.5 py-1 rounded-lg bg-black border border-border
                                         text-muted text-xs hover:border-accent/30 hover:text-white
                                         transition-colors duration-200">
                              {item.label}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </TimelineCard>
            ))}
          </div>

          {/* ── Right: Education (2/5) ── */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="w-8 h-8 rounded-lg bg-accent/15 border border-accent/25 flex items-center justify-center">
                <FiBook size={14} className="text-accent-light" />
              </div>
              <span className="text-white font-bold text-sm tracking-wide">Education</span>
            </motion.div>

            {EDUCATION.map((edu, i) => (
              <motion.div
                key={edu.id}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 + i * 0.12 }}
                className="relative pl-5 border-l border-border hover:border-accent/40 transition-colors duration-300"
              >
                <span className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-accent border-2 border-black" />

                <div className="bg-card border border-border rounded-2xl overflow-hidden hover:border-accent/40 transition-colors duration-300">
                  {/* Top accent bar */}
                  <div className="h-1 w-full bg-gradient-to-r from-accent via-accent-2 to-transparent" />

                  <div className="p-6">
                    {/* Degree — largest, most prominent */}
                    <h3 className="text-xl font-black text-white leading-tight mb-3">
                      {edu.degree}
                    </h3>

                    {/* Period */}
                    <div className="flex items-center gap-1.5 mb-4">
                      <FiCalendar size={11} className="text-accent" />
                      <span className="text-white font-bold text-sm font-mono tracking-widest">
                        {edu.period}
                      </span>
                    </div>

                    {/* Institution + location */}
                    <p className="text-white/80 text-sm font-medium">{edu.institution}</p>
                    <p className="text-muted text-xs mb-4">{edu.location}</p>

                    {/* Description */}
                    {edu.description && (
                      <p className="text-muted text-sm leading-relaxed border-t border-border pt-4">
                        {edu.description}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
