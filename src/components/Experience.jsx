import { motion } from 'framer-motion'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { EXPERIENCE } from '../utils/constants'
import { FiBriefcase, FiCalendar, FiCheckCircle } from 'react-icons/fi'

export default function Experience() {
  const { ref, isInView } = useScrollAnimation()

  return (
    <section id="experience" className="py-24 md:py-32 bg-primary">
      <div ref={ref} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="text-accent font-mono text-sm text-center mb-2">// where I&apos;ve worked</p>
          <h2 className="section-title">
            Work <span className="gradient-text">Experience</span>
          </h2>
          <p className="section-subtitle">
            Building real products for real users since 2021.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-accent via-accent/40 to-transparent" />

          {EXPERIENCE.map((exp, i) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.2 + 0.3 }}
              className="relative pl-16 md:pl-20 pb-12 last:pb-0"
            >
              {/* Dot */}
              <div className="absolute left-4 md:left-5 top-1 w-4 h-4 rounded-full bg-accent border-2 border-primary shadow-lg shadow-accent/40 flex items-center justify-center">
                <div className={`w-1.5 h-1.5 rounded-full ${exp.current ? 'bg-white animate-pulse' : 'bg-white/60'}`} />
              </div>

              {/* Card */}
              <div className="card">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                  <div>
                    <h3 className="text-white font-bold text-xl">{exp.role}</h3>
                    <div className="flex items-center gap-2 text-accent mt-1">
                      <FiBriefcase size={14} />
                      <span className="font-medium">{exp.company}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-muted text-sm whitespace-nowrap">
                    <FiCalendar size={14} />
                    {exp.period}
                    {exp.current && (
                      <span className="ml-2 px-2 py-0.5 rounded-full bg-green-500/15 text-green-400 text-xs border border-green-500/25">
                        Current
                      </span>
                    )}
                  </div>
                </div>

                <ul className="space-y-2.5">
                  {exp.description.map((point, j) => (
                    <motion.li
                      key={j}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.4, delay: 0.5 + i * 0.2 + j * 0.07 }}
                      className="flex items-start gap-2.5 text-muted text-sm leading-relaxed"
                    >
                      <FiCheckCircle size={16} className="text-accent flex-shrink-0 mt-0.5" />
                      {point}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
