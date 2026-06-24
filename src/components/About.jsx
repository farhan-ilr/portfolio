import { motion } from 'framer-motion'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

const stats = [
  { value: '3+',   label: 'Years Experience' },
  { value: '70+',  label: 'Apps Delivered' },
  { value: '30+',  label: 'Happy Clients' },
  { value: '50K+', label: 'App Downloads' },
]

export default function About() {
  const { ref, isInView } = useScrollAnimation()

  return (
    <section id="about" className="py-24 md:py-32 bg-secondary">
      <div ref={ref} className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="section-label">about me</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Who <span className="gradient-text">I Am</span>
          </h2>
        </motion.div>

        {/* Bio */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="space-y-4 text-muted text-base leading-loose mb-12 text-center"
        >
          <p>
            I&apos;m <span className="text-white font-semibold">Farhan</span>, a Flutter &amp; Native Android Developer
            with <span className="text-accent-light font-semibold">3+ years</span> of experience building
            apps that are fast, beautiful, and easy to use.
          </p>
          <p>
            At <span className="text-white font-semibold">Trogon Media</span>, I&apos;ve shipped over
            <span className="text-accent-light font-semibold"> 70 production apps</span> — from e-commerce
            and fintech to healthcare and social platforms. I care deeply about clean architecture,
            smooth performance, and pixel-perfect UI.
          </p>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{ originX: 0.5 }}
          className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-12"
        />

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center"
        >
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 + i * 0.08 }}
            >
              <div className="text-2xl md:text-3xl font-extrabold gradient-text mb-1">{s.value}</div>
              <div className="text-muted text-xs tracking-wide">{s.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.55 }}
          style={{ originX: 0.5 }}
          className="h-px bg-gradient-to-r from-transparent via-border to-transparent mt-12 mb-12"
        />

        {/* Tech tags */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-wrap justify-center gap-2"
        >
          {['Flutter', 'Dart', 'Android (Kotlin)', 'Firebase', 'REST APIs', 'GetX', 'Riverpod'].map((tag, i) => (
            <motion.span
              key={tag}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.35, delay: 0.65 + i * 0.05 }}
              className="px-3 py-1.5 text-xs rounded-lg border border-border bg-card
                         text-muted hover:text-white hover:border-accent/40 transition-all duration-200"
            >
              {tag}
            </motion.span>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
