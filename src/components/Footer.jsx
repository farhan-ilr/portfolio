import { motion } from 'framer-motion'
import { Link } from 'react-scroll'
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'
import { NAV_LINKS, CONTACT_INFO } from '../utils/constants'

const socials = [
  { icon: FiGithub,   href: CONTACT_INFO.github,              label: 'GitHub' },
  { icon: FiLinkedin, href: CONTACT_INFO.linkedin,            label: 'LinkedIn' },
  { icon: FiMail,     href: `mailto:${CONTACT_INFO.email}`,   label: 'Email' },
]

export default function Footer() {
  return (
    <footer className="bg-black border-t border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">

          {/* Brand */}
          <div>
            <span className="font-mono font-bold text-lg block mb-3">
              <span className="text-accent">&lt;</span>
              <span className="text-white">Farhan</span>
              <span className="text-accent"> /&gt;</span>
            </span>
            <p className="text-muted text-xs leading-relaxed max-w-xs">
              Flutter Developer crafting cross-platform mobile experiences. Available for freelance &amp; full-time.
            </p>
          </div>

          {/* Nav */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-[0.15em] mb-5">Navigation</h4>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} smooth duration={600} offset={-80}
                    className="text-muted hover:text-white text-xs transition-colors cursor-pointer hover:translate-x-1 inline-block transition-transform duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-[0.15em] mb-5">Connect</h4>
            <div className="flex gap-3">
              {socials.map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  whileHover={{ scale: 1.12, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-9 h-9 rounded-xl border border-border bg-card flex items-center justify-center
                             text-muted hover:text-white hover:border-accent/40 hover:bg-accent/10 transition-colors"
                >
                  <s.icon size={15} />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border pt-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-muted text-xs">
            © {new Date().getFullYear()} Farhan. All rights reserved.
          </p>
          <p className="text-muted text-xs">
            Built with React, Vite &amp; Framer Motion
          </p>
        </div>
      </div>
    </footer>
  )
}
