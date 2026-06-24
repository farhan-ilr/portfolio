import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { FiMail, FiGithub, FiLinkedin, FiMapPin, FiSend, FiCheck } from 'react-icons/fi'
import { CONTACT_INFO } from '../utils/constants'

const info = [
  { icon: FiMail,     label: 'Email',    value: CONTACT_INFO.email,           href: `mailto:${CONTACT_INFO.email}` },
  { icon: FiGithub,   label: 'GitHub',   value: 'github.com/farhan',          href: CONTACT_INFO.github },
  { icon: FiLinkedin, label: 'LinkedIn', value: 'linkedin.com/in/farhan',     href: CONTACT_INFO.linkedin },
  { icon: FiMapPin,   label: 'Location', value: CONTACT_INFO.location,        href: null },
]

export default function Contact() {
  const { ref, isInView } = useScrollAnimation()
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const onSubmit = (e) => {
    e.preventDefault()
    // TODO: connect to EmailJS / Formspree
    setSent(true)
    setForm({ name: '', email: '', message: '' })
    setTimeout(() => setSent(false), 4000)
  }

  const inputCls = `w-full bg-secondary border border-border rounded-xl px-4 py-3 text-white text-sm
                    placeholder:text-muted/40 focus:outline-none focus:border-accent/60
                    focus:bg-card transition-all duration-200`

  return (
    <section id="contact" className="py-28 md:py-36 bg-secondary relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-black opacity-60 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(16,185,129,0.06) 0%, transparent 70%)' }} />

      <div ref={ref} className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="section-label">contact</p>
          <h2 className="section-title text-white">
            Let&apos;s <span className="gradient-text">Work Together</span>
          </h2>
          <p className="section-subtitle">
            Have a project in mind? I&apos;d love to hear about it — let&apos;s build something great.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-2 space-y-4"
          >
            <p className="text-muted text-sm leading-relaxed mb-6">
              I&apos;m available for freelance projects, full-time roles, and interesting collaborations.
              Don&apos;t hesitate to reach out — I respond within 24 hours.
            </p>

            {info.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.09 }}
                className="flex items-center gap-4 p-4 rounded-xl border border-border bg-card
                           hover:border-accent/35 hover:bg-card-2 transition-all duration-200 group"
              >
                <div className="w-9 h-9 rounded-lg bg-accent/15 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/25 transition-colors">
                  <item.icon size={16} className="text-accent-light" />
                </div>
                <div className="min-w-0">
                  <p className="text-muted text-xs mb-0.5">{item.label}</p>
                  {item.href
                    ? <a href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined}
                         rel="noopener noreferrer"
                         className="text-white text-sm font-medium hover:text-accent-light transition-colors truncate block">
                        {item.value}
                      </a>
                    : <span className="text-white text-sm font-medium">{item.value}</span>
                  }
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onSubmit={onSubmit}
            className="lg:col-span-3 bg-card border border-border rounded-2xl p-7 space-y-5"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="text-muted text-xs mb-1.5 block tracking-wide">Your Name</label>
                <input type="text" name="name" value={form.name} onChange={onChange}
                  required placeholder="John Doe" className={inputCls} />
              </div>
              <div>
                <label className="text-muted text-xs mb-1.5 block tracking-wide">Email</label>
                <input type="email" name="email" value={form.email} onChange={onChange}
                  required placeholder="john@example.com" className={inputCls} />
              </div>
            </div>

            <div>
              <label className="text-muted text-xs mb-1.5 block tracking-wide">Message</label>
              <textarea name="message" value={form.message} onChange={onChange}
                required rows={5} placeholder="Tell me about your project..."
                className={`${inputCls} resize-none`} />
            </div>

            <AnimatePresenceInline show={sent}>
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2 px-4 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-sm"
              >
                <FiCheck size={16} />
                Message sent! I&apos;ll reply within 24 hours.
              </motion.div>
            </AnimatePresenceInline>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="btn-primary w-full text-sm py-3.5 justify-center"
            >
              <FiSend size={15} />
              Send Message
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  )
}

function AnimatePresenceInline({ show, children }) {
  return <AnimatePresence>{show && children}</AnimatePresence>
}
