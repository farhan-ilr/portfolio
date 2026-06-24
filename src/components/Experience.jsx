import { motion } from 'framer-motion'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { EXPERIENCE } from '../utils/constants'
import { FiBriefcase, FiCalendar, FiArrowRight, FiZap } from 'react-icons/fi'

export default function Experience() {
  const { ref, isInView } = useScrollAnimation()

  return (
    <section id="experience" className="py-24 md:py-32 bg-black">
      <div ref={ref} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

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
              career
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">
              Work Experience
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-muted text-sm max-w-xs text-left sm:text-right leading-relaxed"
          >
            Where I&apos;ve been and what I&apos;ve built.
          </motion.p>
        </div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          style={{ originX: 0 }}
          className="h-px bg-gradient-to-r from-accent/60 via-accent-2/30 to-transparent mb-14"
        />

        {/* Timeline */}
        <div className="relative">
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ originY: 0 }}
            className="absolute left-[27px] md:left-[35px] top-2 bottom-2 w-px
                       bg-gradient-to-b from-accent via-accent/30 to-transparent"
          />

          {EXPERIENCE.map((exp, i) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.4 + i * 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="relative pl-16 md:pl-24 pb-10 last:pb-0"
            >
              {/* Timeline dot */}
              <motion.div
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.5 + i * 0.18, type: 'spring', stiffness: 220 }}
                className="absolute left-4 md:left-5 top-1 w-7 h-7 rounded-full
                           bg-accent/15 border-2 border-accent
                           flex items-center justify-center shadow-glow-sm"
              >
                <FiBriefcase size={12} className="text-accent-light" />
              </motion.div>

              {/* Card */}
              <div className="card-hover group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent
                                opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative">

                  {/* Role + company + period row */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                    <div>
                      <h3 className="text-white font-bold text-lg leading-snug mb-1">
                        {exp.role}
                      </h3>
                      <span className="inline-flex items-center gap-1.5 text-accent-light text-sm font-medium">
                        <FiBriefcase size={12} />
                        {exp.company}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <div className="flex items-center gap-1.5 text-muted text-xs">
                        <FiCalendar size={12} />
                        {exp.period}
                      </div>
                      {exp.current && (
                        <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg
                                         bg-accent/15 text-accent-light text-xs
                                         border border-accent/25 font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                          Active
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Tech tags */}
                  {exp.tags && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {exp.tags.map((tag) => (
                        <span key={tag}
                          className="px-2 py-0.5 rounded-md bg-accent/10 text-accent-light
                                     text-[11px] font-mono border border-accent/15">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Bullet points */}
                  <ul className="space-y-2.5">
                    {exp.description.map((point, j) => (
                      <motion.li
                        key={j}
                        initial={{ opacity: 0, x: -14 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.35, delay: 0.6 + i * 0.18 + j * 0.06 }}
                        className="flex items-start gap-3 text-muted text-sm leading-relaxed group/item"
                      >
                        <FiArrowRight size={13}
                          className="text-accent flex-shrink-0 mt-0.5
                                     group-hover/item:translate-x-0.5 transition-transform" />
                        {point}
                      </motion.li>
                    ))}
                  </ul>

                  {/* Key Integrations */}
                  {exp.integrations && (
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.8 + i * 0.18 }}
                      className="mt-5 pt-5 border-t border-border"
                    >
                      <div className="flex items-center gap-2 text-xs font-mono text-accent-light
                                      tracking-widest uppercase mb-3">
                        <FiZap size={12} />
                        Key Integrations
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {exp.integrations.map((item, k) => (
                          <div key={k}
                            className="flex items-start gap-2 px-3 py-2 rounded-lg bg-black/40
                                       border border-border hover:border-accent/30 transition-colors">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 flex-shrink-0" />
                            <div>
                              <span className="text-white text-xs font-medium">{item.label}</span>
                              <span className="text-muted text-xs"> — {item.desc}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
