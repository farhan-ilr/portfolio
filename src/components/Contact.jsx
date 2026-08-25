import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { FiMail, FiMapPin, FiSend, FiCheck, FiLinkedin } from 'react-icons/fi'
import { SiGithub } from 'react-icons/si'
import { CONTACT_INFO } from '../utils/constants'

const INFO = [
  {
    icon: SiGithub,
    label: 'GitHub',
    value: 'Farhan',
    href: CONTACT_INFO.github,
  },
  {
    icon: FiLinkedin,
    label: 'LinkedIn',
    value: 'Farhan Nazar',
    href: CONTACT_INFO.linkedin,
  },
  {
    icon: FiMail,
    label: 'Email',
    value: CONTACT_INFO.email,
    href: `mailto:${CONTACT_INFO.email}`,
  },
  {
    icon: FiMapPin,
    label: 'Location',
    value: 'Kottakkal, Kerala, India',
    href: null,
  },
]

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
})

export default function Contact() {
  const { ref, isInView } = useScrollAnimation()
  const [form, setForm]   = useState({ name: '', email: '', message: '' })
  const [sent, setSent]   = useState(false)

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })
  const onSubmit = (e) => {
    e.preventDefault()
    setSent(true)
    setForm({ name: '', email: '', message: '' })
    setTimeout(() => setSent(false), 4000)
  }

  const inputCls =
    `w-full bg-black border border-border rounded-xl px-4 py-3 text-white text-sm
     placeholder:text-muted/35 focus:outline-none focus:border-accent/60
     transition-colors duration-200`

  return (
    <section id="contact" className="bg-secondary relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-black opacity-40 pointer-events-none" />

      <div ref={ref} className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="text-xs font-mono tracking-[0.25em] uppercase text-muted mb-4">— contact</p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
            Let&apos;s <span className="shimmer-text">Work Together</span>
          </h2>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

          {/* ── Left: info list ── */}
          <div className="space-y-2">
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-muted text-sm leading-relaxed mb-8 max-w-sm"
            >
              Open to freelance, full-time roles, and cool collaborations.
              Reach out — I respond within 24 hours.
            </motion.p>

            {INFO.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.18 + i * 0.1 }}
              >
                {item.href ? (
                  <a
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 py-3.5 border-b border-border/60
                               last:border-b-0 transition-colors duration-200 hover:border-white/20"
                  >
                    <item.icon size={16} className="text-muted flex-shrink-0
                                                     group-hover:text-white transition-colors duration-200" />
                    <div className="min-w-0 flex items-baseline gap-2.5">
                      <p className="text-[10px] font-mono tracking-widest uppercase text-muted/70 flex-shrink-0">
                        {item.label}
                      </p>
                      <p className="text-white/90 text-sm truncate
                                    group-hover:text-white transition-colors duration-200">
                        {item.value}
                      </p>
                    </div>
                  </a>
                ) : (
                  <div className="flex items-center gap-4 py-3.5 border-b border-border/60 last:border-b-0">
                    <item.icon size={16} className="text-muted flex-shrink-0" />
                    <div className="min-w-0 flex items-baseline gap-2.5">
                      <p className="text-[10px] font-mono tracking-widest uppercase text-muted/70 flex-shrink-0">
                        {item.label}
                      </p>
                      <p className="text-white/90 text-sm">{item.value}</p>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}

            {/* Availability dot */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.55 }}
              className="flex items-center gap-2 pt-4 pl-1 text-muted text-xs font-mono"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              Available for new projects
            </motion.div>
          </div>

          {/* ── Right: message form ── */}
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            onSubmit={onSubmit}
            className="bg-card border border-border rounded-2xl p-7 space-y-5 self-start"
          >
            <h3 className="text-white font-bold text-lg">Send a message</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-mono tracking-widest uppercase text-muted mb-2">
                  Name
                </label>
                <input
                  type="text" name="name" value={form.name} onChange={onChange}
                  required placeholder="John Doe"
                  className={inputCls}
                />
              </div>
              <div>
                <label className="block text-[10px] font-mono tracking-widest uppercase text-muted mb-2">
                  Email
                </label>
                <input
                  type="email" name="email" value={form.email} onChange={onChange}
                  required placeholder="john@example.com"
                  className={inputCls}
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-mono tracking-widest uppercase text-muted mb-2">
                Message
              </label>
              <textarea
                name="message" value={form.message} onChange={onChange}
                required rows={5} placeholder="Tell me about your project..."
                className={`${inputCls} resize-none`}
              />
            </div>

            <AnimatePresence>
              {sent && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2 text-sm text-accent-light"
                >
                  <FiCheck size={15} />
                  Sent! I&apos;ll reply within 24 hours.
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="w-full flex items-center justify-center gap-2 bg-white
                         text-black hover:text-accent font-bold py-3.5 rounded-xl text-sm
                         transition-colors duration-300"
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
