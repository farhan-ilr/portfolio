import { motion } from 'framer-motion'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { SKILLS } from '../utils/constants'

function SkillBar({ name, level, icon, delay, isInView }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="space-y-2"
    >
      <div className="flex justify-between items-center">
        <span className="text-white font-medium text-sm flex items-center gap-2">
          {icon && <span>{icon}</span>}
          {name}
        </span>
        <span className="text-accent font-mono text-sm">{level}%</span>
      </div>
      <div className="h-2 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : {}}
          transition={{ duration: 1, delay: delay + 0.2, ease: 'easeOut' }}
          className="h-full rounded-full bg-gradient-to-r from-accent to-purple-400"
        />
      </div>
    </motion.div>
  )
}

function TagBadge({ name, delay, isInView }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.4, delay }}
      className="px-3 py-1.5 rounded-lg bg-surface border border-white/5 text-muted
                 hover:border-accent/40 hover:text-white transition-all duration-200 text-sm font-medium"
    >
      {name}
    </motion.span>
  )
}

export default function Skills() {
  const { ref, isInView } = useScrollAnimation()

  return (
    <section id="skills" className="py-24 md:py-32 bg-primary">
      <div ref={ref} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="text-accent font-mono text-sm text-center mb-2">// what I know</p>
          <h2 className="section-title">
            My <span className="gradient-text">Skills</span>
          </h2>
          <p className="section-subtitle">
            3+ years of hands-on experience building production-grade mobile apps.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Core Skills with bars */}
          <div>
            <motion.h3
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.2 }}
              className="text-white font-semibold text-lg mb-6 flex items-center gap-2"
            >
              <span className="w-6 h-0.5 bg-accent" />
              Core Technologies
            </motion.h3>
            <div className="space-y-6">
              {SKILLS.core.map((skill, i) => (
                <SkillBar
                  key={skill.name}
                  {...skill}
                  delay={0.3 + i * 0.1}
                  isInView={isInView}
                />
              ))}
            </div>
          </div>

          {/* Tools & Libraries */}
          <div>
            <motion.h3
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.2 }}
              className="text-white font-semibold text-lg mb-6 flex items-center gap-2"
            >
              <span className="w-6 h-0.5 bg-accent" />
              Tools & Libraries
            </motion.h3>
            <div className="flex flex-wrap gap-3">
              {SKILLS.tools.map((skill, i) => (
                <TagBadge
                  key={skill.name}
                  name={skill.name}
                  delay={0.3 + i * 0.07}
                  isInView={isInView}
                />
              ))}
            </div>

            {/* Flutter badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8 }}
              className="mt-8 p-5 rounded-2xl bg-accent/10 border border-accent/20"
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">🐦</span>
                <span className="text-white font-semibold">Flutter Specialist</span>
              </div>
              <p className="text-muted text-sm leading-relaxed">
                Deep expertise in Flutter SDK, custom widget creation, performance optimization,
                platform channels, and publishing to App Store & Google Play.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
