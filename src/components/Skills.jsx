import { motion } from 'framer-motion'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import {
  SiFlutter, SiDart, SiKotlin, SiFirebase, SiSqlite,
  SiGit, SiGithub, SiFigma, SiAndroidstudio,
  SiGoogleplay, SiAppstore, SiZoom, SiRazorpay,
  SiGooglemaps, SiXcode,
} from 'react-icons/si'
import { FaJava } from 'react-icons/fa'
import { FiCamera, FiWatch, FiPrinter, FiLink } from 'react-icons/fi'

const iconMap = {
  SiFlutter: SiFlutter, SiDart: SiDart, SiKotlin: SiKotlin,
  FaJava: FaJava, SiFirebase: SiFirebase, SiSqlite: SiSqlite,
  SiGit: SiGit, SiGithub: SiGithub,
  SiAndroidstudio: SiAndroidstudio, SiXcode: SiXcode, SiFigma: SiFigma,
  SiGoogleplay: SiGoogleplay, SiAppstore: SiAppstore,
  SiZoom: SiZoom, SiRazorpay: SiRazorpay,
  SiGooglemaps: SiGooglemaps, FiCamera: FiCamera,
  FiWatch: FiWatch, FiPrinter: FiPrinter, FiLink: FiLink,
}

const CATEGORIES = [
  {
    label: 'Languages',
    skills: [
      { name: 'Flutter', icon: 'SiFlutter', color: '#54C5F8' },
      { name: 'Dart',    icon: 'SiDart',    color: '#0175C2' },
      { name: 'Kotlin',  icon: 'SiKotlin',  color: '#7F52FF' },
      { name: 'Java',    icon: 'FaJava',    color: '#f89820' },
    ],
  },
  {
    label: 'SDKs & Integrations',
    skills: [
      { name: 'Firebase',        icon: 'SiFirebase',   color: '#FFCA28' },
      { name: 'SQLite',          icon: 'SiSqlite',     color: '#6db4cf' },
      { name: 'Zoom SDK',        icon: 'SiZoom',       color: '#2D8CFF' },
      { name: 'Razorpay',        icon: 'SiRazorpay',   color: '#3395FF' },
      { name: 'Google Maps',     icon: 'SiGooglemaps', color: '#4285F4' },
      { name: 'Airbridge',       icon: 'FiLink',       color: '#71717a' },
      { name: 'Tuya Camera',     icon: 'FiCamera',     color: '#71717a' },
      { name: 'H Band Watch',    icon: 'FiWatch',      color: '#71717a' },
      { name: 'Thermal Printer', icon: 'FiPrinter',    color: '#71717a' },
    ],
  },
  {
    label: 'Tools',
    skills: [
      { name: 'Git',            icon: 'SiGit',           color: '#F05032' },
      { name: 'GitHub',         icon: 'SiGithub',        color: '#ffffff' },
      { name: 'Android Studio', icon: 'SiAndroidstudio', color: '#3DDC84' },
      { name: 'Xcode',          icon: 'SiXcode',         color: '#147EFB' },
      { name: 'Figma',          icon: 'SiFigma',         color: '#F24E1E' },
    ],
  },
  {
    label: 'Deployment',
    skills: [
      { name: 'Google Play Console', icon: 'SiGoogleplay', color: '#414141' },
      { name: 'App Store Connect',   icon: 'SiAppstore',   color: '#0D96F6' },
    ],
  },
]

function SkillChip({ skill, index, isInView }) {
  const Icon = iconMap[skill.icon]
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4, scale: 1.06 }}
      className="group flex items-center gap-3 px-4 py-3 rounded-xl
                 border border-border bg-card hover:border-white/15 hover:bg-card-2
                 transition-all duration-250 cursor-default"
    >
      {Icon && (
        <Icon size={18} style={{ color: skill.color }}
          className="flex-shrink-0 group-hover:scale-110 transition-transform duration-250" />
      )}
      <span className="text-muted text-sm font-medium group-hover:text-white transition-colors duration-200 whitespace-nowrap">
        {skill.name}
      </span>
    </motion.div>
  )
}

export default function Skills() {
  const { ref, isInView } = useScrollAnimation()
  let chipIndex = 0

  return (
    <section id="skills" className="py-24 md:py-32 bg-black">
      <div ref={ref} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <span className="inline-flex items-center gap-2 text-xs font-mono text-accent-light
                           tracking-[0.2em] uppercase mb-3">
            <span className="w-4 h-px bg-accent" />
            stack
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">
            Tech Stack &amp; Tools
          </h2>
        </motion.div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          style={{ originX: 0 }}
          className="h-px bg-gradient-to-r from-accent/60 via-accent-2/30 to-transparent mb-14"
        />

        <div className="space-y-10">
          {CATEGORIES.map((cat, ci) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.15 + ci * 0.08 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-muted">
                  {cat.label}
                </span>
                <div className="flex-1 h-px bg-border" />
              </div>
              <div className="flex flex-wrap gap-2.5">
                {cat.skills.map((skill) => {
                  const idx = chipIndex++
                  return <SkillChip key={skill.name} skill={skill} index={idx} isInView={isInView} />
                })}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
