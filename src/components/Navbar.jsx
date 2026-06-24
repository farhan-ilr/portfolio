import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-scroll'
import { HiMenuAlt3, HiX } from 'react-icons/hi'
import { NAV_LINKS } from '../utils/constants'

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-black/85 backdrop-blur-xl border-b border-border'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* ── Logo ── */}
          <Link to="hero" smooth duration={600} className="cursor-pointer group">
            <span className="font-mono font-bold text-lg tracking-tight">
              <span className="text-white group-hover:text-accent-light transition-colors duration-300">farhan</span>
              <span className="text-accent">.</span>
            </span>
          </Link>

          {/* ── Desktop Nav ── */}
          <ul className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  smooth
                  duration={600}
                  offset={-80}
                  spy
                  activeClass="active-nav"
                  className="relative px-4 py-2 text-sm text-muted hover:text-white
                             transition-colors duration-200 cursor-pointer rounded-lg
                             hover:bg-white/5 group"
                >
                  {link.label}
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-px
                                   bg-accent group-hover:w-4 transition-all duration-300" />
                </Link>
              </li>
            ))}
          </ul>

          {/* ── Hire Me CTA ── */}
          <Link to="contact" smooth duration={600} offset={-80} className="hidden md:block">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="relative group overflow-hidden text-sm font-semibold text-white
                         px-5 py-2.5 rounded-xl"
            >
              {/* Spinning gradient border */}
              <span className="absolute inset-0 rounded-xl overflow-hidden">
                <span className="absolute inset-[-50%] animate-spin-slow
                                 bg-[conic-gradient(from_0deg,#e11d48,#fb7185,#f43f5e,#e11d48)]
                                 opacity-80" />
              </span>
              <span className="absolute inset-[1.5px] rounded-[10px] bg-black group-hover:bg-card transition-colors duration-300" />
              <span className="relative">Hire Me</span>
            </motion.button>
          </Link>

          {/* ── Mobile toggle ── */}
          <button
            className="md:hidden w-9 h-9 rounded-lg border border-border flex items-center
                       justify-center text-muted hover:text-white hover:border-accent/40 transition-all"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <HiX size={18} /> : <HiMenuAlt3 size={18} />}
          </button>
        </div>
      </div>

      {/* ── Mobile menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.97 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="md:hidden mx-4 mb-4 rounded-2xl bg-card border border-border overflow-hidden"
          >
            <ul className="flex flex-col p-3 gap-1">
              {NAV_LINKS.map((link, i) => (
                <motion.li
                  key={link.to}
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <Link
                    to={link.to}
                    smooth
                    duration={600}
                    offset={-80}
                    onClick={() => setMenuOpen(false)}
                    className="block px-4 py-3 rounded-xl text-muted hover:text-white
                               hover:bg-white/5 text-sm font-medium transition-all cursor-pointer"
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
              <li className="pt-2 border-t border-border mt-1">
                <Link
                  to="contact"
                  smooth
                  duration={600}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-center w-full text-sm py-3 px-4
                             rounded-xl bg-accent text-white font-semibold
                             transition-colors cursor-pointer hover:bg-accent-2"
                >
                  Hire Me
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
