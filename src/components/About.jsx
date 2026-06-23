import { motion } from 'framer-motion'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { FiCode, FiSmartphone, FiLayers } from 'react-icons/fi'

const stats = [
  { label: 'Years Experience', value: '3+' },
  { label: 'Projects Delivered', value: '70+' },
  { label: 'Happy Clients', value: '30+' },
  { label: 'App Downloads', value: '50K+' },
]

const traits = [
  { icon: FiSmartphone, title: 'Mobile-First', desc: 'Building native-feel apps for iOS & Android from a single codebase.' },
  { icon: FiCode, title: 'Clean Code', desc: 'Following SOLID principles and design patterns for maintainable code.' },
  { icon: FiLayers, title: 'Architecture', desc: 'Experienced in BLoC, GetX, Riverpod, and Clean Architecture.' },
]

export default function About() {
  const { ref, isInView } = useScrollAnimation()

  return (
    <section id="about" className="py-24 md:py-32 bg-secondary relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-50 pointer-events-none" />

      <div ref={ref} className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="text-accent font-mono text-sm text-center mb-2">// who am I</p>
          <h2 className="section-title">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="section-subtitle">
            Turning ideas into polished, production-ready mobile experiences.
          </p>
        </motion.div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-5"
          >
            <p className="text-muted text-base md:text-lg leading-relaxed">
              I&apos;m <span className="text-white font-semibold">Farhan A</span>, a passionate Flutter Developer
              with over <span className="text-accent font-semibold">3 years of experience</span> building
              high-quality cross-platform mobile applications.
            </p>
            <p className="text-muted text-base md:text-lg leading-relaxed">
              At <span className="text-white font-semibold">Trogon Media</span>, I&apos;ve had the opportunity
              to work on <span className="text-accent font-semibold">70+ projects</span> spanning e-commerce,
              healthcare, fintech, and social platforms — gaining deep expertise in complex state management,
              real-time data, and custom UI components.
            </p>
            <p className="text-muted text-base md:text-lg leading-relaxed">
              I believe great apps are built at the intersection of beautiful design and solid engineering.
              When I&apos;m not coding, I explore new Flutter packages, contribute to open source, and keep up
              with the latest mobile development trends.
            </p>
          </motion.div>

          {/* Traits */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="space-y-4"
          >
            {traits.map((trait, i) => (
              <motion.div
                key={trait.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                className="card flex items-start gap-4"
              >
                <div className="w-11 h-11 rounded-xl bg-accent/15 flex items-center justify-center flex-shrink-0">
                  <trait.icon size={22} className="text-accent" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">{trait.title}</h3>
                  <p className="text-muted text-sm leading-relaxed">{trait.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
              className="card text-center"
            >
              <div className="text-3xl md:text-4xl font-extrabold gradient-text mb-2">{stat.value}</div>
              <div className="text-muted text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
