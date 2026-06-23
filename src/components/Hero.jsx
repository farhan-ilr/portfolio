import { motion } from 'framer-motion'
import { Link } from 'react-scroll'
import { FiGithub, FiLinkedin, FiDownload } from 'react-icons/fi'
import { CONTACT_INFO } from '../utils/constants'

const floatingVariants = {
  animate: {
    y: [0, -15, 0],
    transition: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
  },
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-primary bg-grid"
    >
      {/* Radial glow background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-500/8 rounded-full blur-[100px]" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto"
      >
        {/* Badge */}
        <motion.div variants={itemVariants} className="flex justify-center mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/30 bg-accent/10 text-accent text-sm font-medium">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Available for Freelance
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-4"
        >
          Hi, I&apos;m{' '}
          <span className="gradient-text glow">Farhan A</span>
        </motion.h1>

        {/* Role */}
        <motion.div variants={itemVariants} className="mb-6">
          <p className="text-xl sm:text-2xl md:text-3xl font-semibold text-muted">
            <span className="text-white">Flutter Developer</span>{' '}
            <span className="text-accent font-mono">| 3+ Years</span>
          </p>
        </motion.div>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="text-muted text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10 text-balance"
        >
          I craft beautiful, performant cross-platform mobile apps with Flutter.
          Passionate about clean architecture, smooth animations, and pixel-perfect UI.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <Link to="projects" smooth duration={500} offset={-80}>
            <button className="btn-primary w-full sm:w-auto px-8 py-4 text-base">
              View My Work
            </button>
          </Link>
          <Link to="contact" smooth duration={500} offset={-80}>
            <button className="btn-outline w-full sm:w-auto px-8 py-4 text-base">
              Get In Touch
            </button>
          </Link>
        </motion.div>

        {/* Social Links */}
        <motion.div
          variants={itemVariants}
          className="flex items-center justify-center gap-6"
        >
          <a
            href={CONTACT_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-white transition-colors duration-200 hover:scale-110 active:scale-95"
            aria-label="GitHub"
          >
            <FiGithub size={22} />
          </a>
          <a
            href={CONTACT_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-white transition-colors duration-200 hover:scale-110 active:scale-95"
            aria-label="LinkedIn"
          >
            <FiLinkedin size={22} />
          </a>
          <a
            href="/resume.pdf"
            download
            className="flex items-center gap-2 text-muted hover:text-white transition-colors duration-200 text-sm font-medium"
          >
            <FiDownload size={18} />
            Resume
          </a>
        </motion.div>
      </motion.div>

      {/* Floating code badge */}
      <motion.div
        variants={floatingVariants}
        animate="animate"
        className="absolute bottom-16 left-1/2 -translate-x-1/2 text-muted/30 text-sm font-mono hidden md:block"
      >
        scroll down ↓
      </motion.div>
    </section>
  )
}
