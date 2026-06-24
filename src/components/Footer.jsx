import { motion } from 'framer-motion'
import { Link } from 'react-scroll'
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'
import { RiInstagramLine } from 'react-icons/ri'
import { NAV_LINKS, CONTACT_INFO } from '../utils/constants'

const socials = [
  { icon: FiGithub,         href: CONTACT_INFO.github,                 label: 'GitHub' },
  { icon: FiLinkedin,       href: CONTACT_INFO.linkedin,               label: 'LinkedIn' },
  { icon: RiInstagramLine,  href: CONTACT_INFO.instagram,              label: 'Instagram' },
  { icon: FiMail,           href: `mailto:${CONTACT_INFO.email}`,      label: 'Email' },
]

export default function Footer() {
  return (
    <footer className="bg-black border-t border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">

          {/* Brand */}
          <div>
            {/* Monogram + name stack — matches Navbar */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-accent-2
                              flex items-center justify-center shadow-glow-sm flex-shrink-0">
                <span className="text-white font-black text-sm font-mono">FA</span>
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-white font-bold text-sm tracking-wide">Farhan</span>
                <span className="text-muted font-mono text-[10px] tracking-widest">Flutter & Android Dev</span>
              </div>
            </div>
            <p className="text-muted text-xs leading-relaxed max-w-xs">
              Building cross-platform mobile experiences with Flutter &amp; Android.
              Available for freelance &amp; full-time opportunities.
            </p>
          </div>

          {/* Nav */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-[0.15em] mb-5">Navigation</h4>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} smooth duration={600} offset={-80}
                    className="text-muted hover:text-white text-xs transition-all duration-200
                               cursor-pointer hover:translate-x-1 inline-block">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-[0.15em] mb-5">Connect</h4>
            <div className="flex flex-wrap gap-2.5">
              {socials.map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-9 h-9 rounded-xl border border-border bg-card flex items-center justify-center
                             text-muted hover:text-white hover:border-accent/40 hover:bg-accent/10 transition-colors"
                >
                  <s.icon size={16} />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border pt-8 flex items-center justify-center">
          <p className="text-muted text-xs">
            © {new Date().getFullYear()} Farhan. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
