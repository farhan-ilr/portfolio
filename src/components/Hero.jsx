import { useRef } from 'react'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
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

/* ─── Stagger container ─────────────────────────────── */
const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.13, delayChildren: 0.3 },
  },
}
const fadeUp = {
  hidden: { opacity: 0, y: 48, filter: 'blur(6px)' },
  show:   { opacity: 1, y: 0,  filter: 'blur(0px)',
            transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] } },
}

/* ─── Magnetic button ───────────────────────────────── */
function MagneticBtn({ children, className, onClick }) {
  const ref = useRef(null)
  const mx  = useMotionValue(0)
  const my  = useMotionValue(0)
  const sx  = useSpring(mx, { stiffness: 220, damping: 18 })
  const sy  = useSpring(my, { stiffness: 220, damping: 18 })

  const onMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    mx.set((e.clientX - rect.left - rect.width  / 2) * 0.28)
    my.set((e.clientY - rect.top  - rect.height / 2) * 0.28)
  }
  const onLeave = () => { mx.set(0); my.set(0) }

  return (
    <motion.div
      ref={ref}
      style={{ x: sx, y: sy }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={onClick}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black bg-grid-black"
    >

      {/* ── Animated blobs ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.18, 1], x: [0, 35, 0], y: [0, -25, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-[15%] -left-[10%] w-[560px] h-[560px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(225,29,72,0.13) 0%, transparent 68%)' }}
        />
        <motion.div
          animate={{ scale: [1, 1.22, 1], x: [0, -30, 0], y: [0, 35, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute -bottom-[12%] -right-[8%] w-[480px] h-[480px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(244,63,94,0.09) 0%, transparent 68%)' }}
        />
        <motion.div
          animate={{ scale: [1, 1.12, 1], rotate: [0, 15, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
          className="absolute top-[35%] right-[15%] w-[280px] h-[280px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(225,29,72,0.06) 0%, transparent 68%)' }}
        />
      </div>

      {/* ── Content ── */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto"
      >

        {/* Name */}
        <motion.h1
          variants={fadeUp}
          className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter leading-none mb-5 pt-10 md:pt-14"
        >
          <span className="text-white">Hi, I&apos;m </span>
          <motion.span
            className="shimmer-text"
            animate={{ backgroundPosition: ['0% center', '200% center'] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          >
            Farhan.
          </motion.span>
        </motion.h1>

        {/* Typewriter */}
        <motion.div
          variants={fadeUp}
          className="text-xl sm:text-2xl md:text-3xl font-mono font-medium text-muted mb-8 h-10"
        >
          <span className="text-accent-light">{'// '}</span>
          <Typewriter words={roles} speed={70} deleteSpeed={45} pause={1600} />
        </motion.div>

        {/* Description */}
        <motion.p
          variants={fadeUp}
          className="text-muted text-sm sm:text-base md:text-lg max-w-xl mx-auto leading-relaxed mb-12 text-balance"
        >
          I build{' '}
          <span className="text-white font-medium">pixel-perfect, high-performance</span>{' '}
          mobile apps with Flutter — from concept to App Store.{' '}
          <span className="text-white font-medium">3+ years, 70+ apps shipped.</span>
        </motion.p>

        {/* ── CTA buttons ── */}
        <motion.div
          variants={fadeUp}
          className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-14"
        >

          {/* View My Work — circle-reveal */}
          <Link to="projects" smooth duration={600} offset={-80}>
            <MagneticBtn>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="relative group overflow-hidden font-bold text-white px-14 py-5 rounded-2xl"
              >
                {/* Spinning conic gradient border */}
                <span className="absolute inset-0 rounded-2xl overflow-hidden">
                  <span className="absolute inset-[-50%] animate-spin-slow
                                   bg-[conic-gradient(from_0deg,#e11d48,#fb7185,#f43f5e,#e11d48)]
                                   opacity-90" />
                </span>
                {/* Dark inner fill */}
                <span className="absolute inset-[1.5px] rounded-[14px] bg-black" />
                {/* Content */}
                <span className="relative z-10 flex items-center gap-3 text-xl font-black">
                  Explore My Work
                  <FiArrowRight size={22} className="group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </motion.button>
            </MagneticBtn>
          </Link>

          {/* Download CV — sliding underline text */}
          <a href="/resume.pdf" download>
            <MagneticBtn>
              <motion.button
                whileTap={{ scale: 0.97 }}
                className="group relative flex items-center gap-2.5 px-2 py-1 text-base font-semibold text-muted hover:text-white transition-colors duration-300"
              >
                <HiDownload
                  size={18}
                  className="group-hover:-translate-y-0.5 transition-transform duration-300"
                />
                <span className="relative">
                  Download CV
                  {/* Animated underline */}
                  <span
                    className="absolute -bottom-0.5 left-0 h-px w-0 bg-accent
                               group-hover:w-full transition-all duration-400 ease-out"
                  />
                </span>
              </motion.button>
            </MagneticBtn>
          </a>
        </motion.div>

        {/* Socials */}
        <motion.div variants={fadeUp} className="flex items-center justify-center gap-5">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-border" />
          {[
            { href: CONTACT_INFO.github,   Icon: FiGithub },
            { href: CONTACT_INFO.linkedin, Icon: FiLinkedin },
          ].map(({ href, Icon }, i) => (
            <motion.a
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.18, y: -3 }}
              whileTap={{ scale: 0.92 }}
              transition={{ type: 'spring', stiffness: 300, damping: 15 }}
              className="w-10 h-10 rounded-xl border border-border flex items-center justify-center
                         text-muted hover:text-white hover:border-accent/50 hover:bg-accent/10
                         transition-colors duration-200"
            >
              <Icon size={18} />
            </motion.a>
          ))}
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-border" />
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-muted text-[10px] font-mono tracking-[0.3em]">SCROLL</span>
        <motion.div
          animate={{ y: [0, 8, 0], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-10 bg-gradient-to-b from-accent to-transparent"
        />
      </motion.div>
    </section>
  )
}
