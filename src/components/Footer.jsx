import { motion } from 'framer-motion'
import { Link } from 'react-scroll'
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'
import { RiInstagramLine } from 'react-icons/ri'
import { NAV_LINKS, CONTACT_INFO } from '../utils/constants'

const socials = [
  { icon: FiGithub,        href: CONTACT_INFO.github,             label: 'GitHub' },
  { icon: FiLinkedin,      href: CONTACT_INFO.linkedin,           label: 'LinkedIn' },
  { icon: RiInstagramLine, href: CONTACT_INFO.instagram,          label: 'Instagram' },
  { icon: FiMail,          href: `mailto:${CONTACT_INFO.email}`,  label: 'Email' },
]

export default function Footer() {
  return (
    <footer className="bg-black border-t border-border overflow-hidden">

      {/* ── Big name block ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-12">

          {/* Name + tagline */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-xs font-mono tracking-[0.25em] uppercase text-muted mb-3"
            >
              Flutter &amp; Android Developer
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="text-[clamp(3rem,9vw,6rem)] font-black leading-none tracking-tight"
            >
              <span className="text-white">farhan</span>
              <span className="text-accent">.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="text-muted text-xs mt-3 max-w-xs leading-relaxed"
            >
              Building cross-platform mobile experiences with Flutter &amp; Native Android.
              Available for freelance &amp; full-time opportunities.
            </motion.p>
          </div>

          {/* Nav links + socials */}
          <div className="flex flex-col gap-6 md:items-end">
            {/* Nav links */}
            <ul className="flex flex-wrap gap-x-6 gap-y-2 md:justify-end">
              {NAV_LINKS.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    smooth
                    duration={600}
                    offset={-80}
                    className="text-muted hover:text-white text-xs font-mono tracking-wide
                               transition-colors duration-200 cursor-pointer hover:text-accent-light"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Socials */}
            <div className="flex items-center gap-2">
              {socials.map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-9 h-9 rounded-xl border border-border bg-card
                             flex items-center justify-center text-muted
                             hover:text-white hover:border-accent/40
                             hover:bg-accent/10 transition-all duration-200"
                >
                  <s.icon size={16} />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-muted text-[11px] font-mono">
            © {new Date().getFullYear()} Farhan. All rights reserved.
          </p>
          <p className="text-muted/50 text-[11px] font-mono">
            Kottakkal, Malappuram, Kerala, India
          </p>
        </div>
      </div>
    </footer>
  )
}
