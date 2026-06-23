import { motion } from 'framer-motion'
import { Link } from 'react-scroll'
import { FiGithub, FiLinkedin, FiMail, FiHeart } from 'react-icons/fi'
import { NAV_LINKS, CONTACT_INFO } from '../utils/constants'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-primary border-t border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <span className="text-xl font-bold font-mono gradient-text block mb-3">
              &lt;Farhan /&gt;
            </span>
            <p className="text-muted text-sm leading-relaxed max-w-xs">
              Flutter Developer crafting beautiful mobile experiences.
              Open to freelance &amp; full-time opportunities.
            </p>
          </div>

          {/* Nav */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    smooth
                    duration={500}
                    offset={-80}
                    className="text-muted hover:text-white text-sm transition-colors cursor-pointer"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Connect</h4>
            <div className="flex flex-col gap-3">
              <a
                href={CONTACT_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-muted hover:text-white text-sm transition-colors"
              >
                <FiGithub size={16} /> GitHub
              </a>
              <a
                href={CONTACT_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-muted hover:text-white text-sm transition-colors"
              >
                <FiLinkedin size={16} /> LinkedIn
              </a>
              <a
                href={`mailto:${CONTACT_INFO.email}`}
                className="flex items-center gap-2.5 text-muted hover:text-white text-sm transition-colors"
              >
                <FiMail size={16} /> {CONTACT_INFO.email}
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-muted text-sm">
            © {year} Farhan A. All rights reserved.
          </p>
          <p className="text-muted text-sm flex items-center gap-1.5">
            Built with <FiHeart size={13} className="text-red-400" /> using React & Framer Motion
          </p>
        </div>
      </div>
    </footer>
  )
}
