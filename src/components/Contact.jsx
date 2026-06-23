import { useState } from 'react'
import { motion } from 'framer-motion'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { FiMail, FiGithub, FiLinkedin, FiMapPin, FiSend } from 'react-icons/fi'
import { CONTACT_INFO } from '../utils/constants'

const contactItems = [
  { icon: FiMail, label: 'Email', value: CONTACT_INFO.email, href: `mailto:${CONTACT_INFO.email}` },
  { icon: FiGithub, label: 'GitHub', value: 'github.com/farhan', href: CONTACT_INFO.github },
  { icon: FiLinkedin, label: 'LinkedIn', value: 'linkedin.com/in/farhan', href: CONTACT_INFO.linkedin },
  { icon: FiMapPin, label: 'Location', value: CONTACT_INFO.location, href: null },
]

export default function Contact() {
  const { ref, isInView } = useScrollAnimation()
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState(null)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: wire up to EmailJS, Formspree, or your preferred service
    setStatus('success')
    setTimeout(() => setStatus(null), 4000)
    setForm({ name: '', email: '', message: '' })
  }

  return (
    <section id="contact" className="py-24 md:py-32 bg-secondary relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-50 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

      <div ref={ref} className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="text-accent font-mono text-sm text-center mb-2">// let&apos;s talk</p>
          <h2 className="section-title">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p className="section-subtitle">
            Have a project in mind? I&apos;d love to hear about it. Let&apos;s build something great together.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-2 space-y-4"
          >
            <p className="text-muted leading-relaxed mb-6">
              I&apos;m open to freelance projects, full-time opportunities, and interesting collaborations.
              Feel free to reach out!
            </p>
            {contactItems.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="flex items-center gap-4 p-4 rounded-xl bg-surface border border-white/5 hover:border-accent/30 transition-all duration-200 group"
              >
                <div className="w-10 h-10 rounded-xl bg-accent/15 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/25 transition-colors">
                  <item.icon size={18} className="text-accent" />
                </div>
                <div>
                  <p className="text-muted text-xs mb-0.5">{item.label}</p>
                  {item.href ? (
                    <a href={item.href} className="text-white text-sm font-medium hover:text-accent transition-colors">
                      {item.value}
                    </a>
                  ) : (
                    <span className="text-white text-sm font-medium">{item.value}</span>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Contact Form */}
          <motion.form
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            onSubmit={handleSubmit}
            className="lg:col-span-3 card space-y-5"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="text-muted text-sm mb-1.5 block">Your Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="John Doe"
                  className="w-full bg-primary border border-white/10 rounded-xl px-4 py-3 text-white text-sm
                             placeholder:text-muted/50 focus:outline-none focus:border-accent/60
                             transition-colors duration-200"
                />
              </div>
              <div>
                <label className="text-muted text-sm mb-1.5 block">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="john@example.com"
                  className="w-full bg-primary border border-white/10 rounded-xl px-4 py-3 text-white text-sm
                             placeholder:text-muted/50 focus:outline-none focus:border-accent/60
                             transition-colors duration-200"
                />
              </div>
            </div>
            <div>
              <label className="text-muted text-sm mb-1.5 block">Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
                placeholder="Tell me about your project..."
                className="w-full bg-primary border border-white/10 rounded-xl px-4 py-3 text-white text-sm
                           placeholder:text-muted/50 focus:outline-none focus:border-accent/60
                           transition-colors duration-200 resize-none"
              />
            </div>

            {status === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="px-4 py-3 rounded-xl bg-green-500/15 border border-green-500/25 text-green-400 text-sm"
              >
                Message sent! I&apos;ll get back to you shortly.
              </motion.div>
            )}

            <button
              type="submit"
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              <FiSend size={16} />
              Send Message
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  )
}
