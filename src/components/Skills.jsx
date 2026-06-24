import { motion } from 'framer-motion'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import {
  SiFlutter, SiDart, SiAndroid, SiKotlin, SiFirebase,
  SiGit, SiGithub, SiFigma, SiSqlite, SiPostman,
  SiAndroidstudio, SiGoogleplay, SiAppstore,
} from 'react-icons/si'
import { SKILLS } from '../utils/constants'

const iconMap = {
  SiFlutter:          SiFlutter,
  SiDart:             SiDart,
  SiAndroid:          SiAndroid,
  SiKotlin:           SiKotlin,
  SiFirebase:         SiFirebase,
  SiGit:              SiGit,
  SiGithub:           SiGithub,
  SiFigma:            SiFigma,
  SiSqlite:           SiSqlite,
  SiPostman:          SiPostman,
  SiAndroidstudio:    SiAndroidstudio,
  SiGoogleplay:       SiGoogleplay,
  SiAppstore:         SiAppstore,
}

export default function Skills() {
  const { ref, isInView } = useScrollAnimation()

  return (
    <section id="skills" className="py-24 md:py-32 bg-black">
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
              tech stack
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">
              My Skills
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-muted text-sm max-w-xs text-left sm:text-right leading-relaxed"
          >
            Tools and technologies I work with.
          </motion.p>
        </div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          style={{ originX: 0 }}
          className="h-px bg-gradient-to-r from-accent/60 via-accent-2/30 to-transparent mb-14"
        />

        {/* Icon grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
          {SKILLS.map((skill, i) => {
            const Icon = iconMap[skill.icon]
            return (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6, scale: 1.05 }}
                className="group flex flex-col items-center gap-3 p-4 rounded-2xl
                           border border-border bg-card hover:border-white/15
                           hover:bg-card-2 transition-all duration-300 cursor-default"
              >
                {Icon && (
                  <Icon
                    size={32}
                    style={{ color: skill.color }}
                    className="transition-transform duration-300 group-hover:scale-110 drop-shadow-sm"
                  />
                )}
                <span className="text-muted text-[11px] font-medium text-center leading-tight
                                 group-hover:text-white transition-colors duration-200">
                  {skill.name}
                </span>
              </motion.div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
