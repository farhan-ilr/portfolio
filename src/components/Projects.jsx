import { useState } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiArrowUpRight } from 'react-icons/fi'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { PROJECTS } from '../utils/constants'

const pad = (n) => String(n).padStart(2, '0')

function Row({ project, index, dimmed, onActive }) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="border-t border-border"
    >
      <Link
        to={`/projects/${project.slug}`}
        onMouseEnter={() => onActive(index)}
        onMouseLeave={() => onActive(null)}
        onFocus={() => onActive(index)}
        onBlur={() => onActive(null)}
        aria-label={`${project.title} — ${project.subtitle}`}
        className={`group block py-7 md:py-10 outline-none transition-opacity duration-300 focus-visible:bg-white/[0.03] ${dimmed ? 'md:opacity-[0.35]' : ''}`}
      >
        {/* Phones have no hover, so the cover sits inline instead of floating. */}
        {project.image && (
          <img
            src={project.image}
            alt=""
            loading="lazy"
            className="md:hidden mb-5 w-full aspect-[2/1] object-cover rounded-md border border-border"
          />
        )}

        <div className="grid md:grid-cols-12 gap-x-6 gap-y-3 items-start">
          <span className="hidden md:block md:col-span-1 pt-3 font-mono text-xs text-muted">{pad(index + 1)}</span>

          <div className="md:col-span-6">
            <h3 className="text-3xl md:text-5xl font-semibold tracking-tight text-zinc-200 transition-all duration-300 group-hover:text-white md:group-hover:translate-x-3 group-focus-visible:text-white">
              {project.title}
            </h3>
            <p className="mt-2 text-sm md:text-base text-muted">{project.subtitle}</p>
          </div>

          <div className="md:col-span-4 md:pt-2 text-sm leading-relaxed">
            <p className="text-muted-fg">{project.category}</p>
            <p className="mt-1 text-muted">{project.tags.slice(0, 4).join(' / ')}</p>
          </div>

          <FiArrowUpRight
            aria-hidden
            size={26}
            className="hidden md:block md:col-span-1 justify-self-end mt-2 text-muted transition-all duration-300 group-hover:text-accent-light group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </div>
      </Link>
    </motion.li>
  )
}

/** Cover image that trails the cursor while a row is hovered. Position is driven by motion values, so no re-renders on move. */
function Preview({ project, x, y }) {
  return (
    <AnimatePresence>
      {project?.image && (
        <motion.div
          key="preview"
          style={{ x, y }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          aria-hidden
          className="pointer-events-none fixed left-0 top-0 z-30 hidden md:block [@media(hover:none)]:!hidden"
        >
          <AnimatePresence mode="popLayout">
            <motion.img
              key={project.slug}
              src={project.image}
              alt=""
              initial={{ opacity: 0, scale: 1.06 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="w-[360px] aspect-[2/1] object-cover rounded-md border border-white/10 shadow-2xl shadow-black/60"
            />
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function Projects() {
  const { ref, isInView } = useScrollAnimation()
  const reduced = useReducedMotion()
  const [active, setActive] = useState(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 260, damping: 30, mass: 0.6 })
  const sy = useSpring(my, { stiffness: 260, damping: 30, mass: 0.6 })

  const onMove = (e) => {
    // Below-right of the cursor, so the cover lands on the next (dimmed) row, not the hovered row's own text.
    const nx = e.clientX + 28
    const ny = e.clientY + 28
    mx.set(nx)
    my.set(ny)
    if (reduced) { sx.jump(nx); sy.jump(ny) }
  }

  return (
    <section id="projects" className="py-24 md:py-36 bg-secondary">
      <div ref={ref} className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 md:mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-semibold tracking-tight text-white">
            Selected work
            <sup className="ml-2 align-top font-mono text-sm font-normal text-muted">({pad(PROJECTS.length)})</sup>
          </h2>
        </motion.div>

        <ul onMouseMove={onMove} className="border-b border-border">
          {PROJECTS.map((project, i) => (
            <Row
              key={project.id}
              project={project}
              index={i}
              dimmed={active !== null && active !== i}
              onActive={setActive}
            />
          ))}
        </ul>
      </div>

      <Preview project={active !== null ? PROJECTS[active] : null} x={sx} y={sy} />
    </section>
  )
}
