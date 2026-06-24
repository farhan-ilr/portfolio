import { motion } from 'framer-motion'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

const stats = [
  { value: '3+',   label: 'Years Experience' },
  { value: '70+',  label: 'Apps Delivered' },
  { value: '30+',  label: 'Happy Clients' },
  { value: '50K+', label: 'App Downloads' },
]

const tags    = ['Flutter', 'Dart', 'Android (Kotlin)', 'Firebase', 'REST APIs', 'GetX', 'Riverpod']

export default function About() {
  const { ref, isInView } = useScrollAnimation()

  return (
    <section id="about" className="py-24 md:py-32 bg-secondary relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute inset-0 bg-grid-black opacity-40 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-48 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(225,29,72,0.05) 0%, transparent 70%)' }} />

      <div ref={ref} className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header — left/right split matching other sections */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-14">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 text-xs font-mono text-accent-light
                             tracking-[0.2em] uppercase mb-3">
              <span className="w-4 h-px bg-accent" />
              about me
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">
              Who <span className="gradient-text">I Am</span>
            </h2>
          </motion.div>

        </div>

        {/* Animated divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          style={{ originX: 0 }}
          className="h-px bg-gradient-to-r from-accent/60 via-accent-2/30 to-transparent mb-14"
        />

        {/* Two-column layout: bio left, stats right */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start mb-14">

          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.2 }}
            className="lg:col-span-3 space-y-5"
          >
            <p className="text-muted text-base leading-loose">
              I&apos;m <span className="text-white font-semibold">Farhan</span>, a Flutter &amp; Native Android Developer
              with <span className="text-accent-light font-semibold">3+ years</span> of experience building
              apps that are fast, beautiful, and easy to use.
            </p>
            <p className="text-muted text-base leading-loose">
              At <span className="text-white font-semibold">Trogon Media</span>, I&apos;ve shipped over
              <span className="text-accent-light font-semibold"> 70 production apps</span> — from custom LMS
              and CRM &amp; ERP systems to e-commerce and healthcare platforms. I care deeply about clean
              architecture, smooth performance, and pixel-perfect UI.
            </p>

            {/* Tech tags */}
            <div className="flex flex-wrap gap-2 pt-2">
              {tags.map((tag, i) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.3, delay: 0.5 + i * 0.05 }}
                  className="px-3 py-1.5 text-xs rounded-lg border border-border bg-card
                             text-muted hover:text-white hover:border-accent/40 transition-all duration-200"
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.3 }}
            className="lg:col-span-2 grid grid-cols-2 gap-4"
          >
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.45, delay: 0.35 + i * 0.09, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center justify-center p-5 rounded-2xl
                           border border-border bg-card hover:border-accent/30
                           hover:bg-card-2 transition-all duration-300 group text-center"
              >
                <div className="text-2xl md:text-3xl font-extrabold gradient-text mb-1 group-hover:scale-105 transition-transform">
                  {s.value}
                </div>
                <div className="text-muted text-[11px] tracking-wide leading-tight">{s.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  )
}
