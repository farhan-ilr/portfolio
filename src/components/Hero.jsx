import { motion } from 'framer-motion'
import { Link } from 'react-scroll'
import { FiGithub, FiLinkedin, FiArrowRight } from 'react-icons/fi'
import { HiDownload } from 'react-icons/hi'
import Typewriter from './Typewriter'
import { CONTACT_INFO } from '../utils/constants'

const roles = [
  'Flutter Developer',
  'Native Android Developer',
  'Cross-Platform App Builder',
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.4 } },
}
const item = {
  hidden: { opacity: 0, y: 40 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black bg-grid-black">

      {/* ── Animated blobs ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.15, 1], x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.18) 0%, transparent 70%)' }}
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], x: [0, -25, 0], y: [0, 30, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute bottom-[-10%] right-[-5%] w-[450px] h-[450px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.14) 0%, transparent 70%)' }}
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute top-[40%] right-[20%] w-[300px] h-[300px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.1) 0%, transparent 70%)' }}
        />
      </div>

      {/* ── Content ── */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto"
      >
        {/* Status badge */}
        <motion.div variants={item} className="flex justify-center mb-8">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card text-sm text-muted">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse glow-dot" />
            Open to new opportunities
          </div>
        </motion.div>

        {/* Name */}
        <motion.h1
          variants={item}
          className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter leading-none mb-5"
        >
          <span className="block text-white">Hi, I&apos;m</span>
          <span className="block shimmer-text mt-1">Farhan.</span>
        </motion.h1>

        {/* Typewriter role */}
        <motion.div
          variants={item}
          className="text-xl sm:text-2xl md:text-3xl font-mono font-medium text-muted mb-8 h-10"
        >
          <span className="text-accent-light">{'// '}</span>
          <Typewriter words={roles} speed={70} deleteSpeed={45} pause={1600} />
        </motion.div>

        {/* Description */}
        <motion.p
          variants={item}
          className="text-muted text-sm sm:text-base md:text-lg max-w-xl mx-auto leading-relaxed mb-10 text-balance"
        >
          I build <span className="text-white">pixel-perfect, high-performance</span> mobile apps
          with Flutter — from concept to App Store. 3+ years, 70+ apps shipped.
        </motion.p>

        {/* CTA row */}
        <motion.div
          variants={item}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <Link to="projects" smooth duration={600} offset={-80}>
            <button className="btn-primary w-full sm:w-auto text-base px-8 py-4 group">
              View My Work
              <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
          <a href="/resume.pdf" download>
            <button className="btn-outline w-full sm:w-auto text-base px-8 py-4 group">
              <HiDownload className="group-hover:-translate-y-0.5 transition-transform" />
              Download CV
            </button>
          </a>
        </motion.div>

        {/* Socials */}
        <motion.div variants={item} className="flex items-center justify-center gap-6">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-border" />
          <a href={CONTACT_INFO.github} target="_blank" rel="noopener noreferrer"
            className="w-10 h-10 rounded-xl border border-border flex items-center justify-center text-muted
                       hover:text-white hover:border-accent/50 hover:bg-accent/10 transition-all duration-200 hover:scale-110">
            <FiGithub size={18} />
          </a>
          <a href={CONTACT_INFO.linkedin} target="_blank" rel="noopener noreferrer"
            className="w-10 h-10 rounded-xl border border-border flex items-center justify-center text-muted
                       hover:text-white hover:border-accent-2/50 hover:bg-accent-2/10 transition-all duration-200 hover:scale-110">
            <FiLinkedin size={18} />
          </a>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-border" />
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-muted text-xs font-mono tracking-widest">SCROLL</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-8 bg-gradient-to-b from-accent/60 to-transparent"
        />
      </motion.div>
    </section>
  )
}
