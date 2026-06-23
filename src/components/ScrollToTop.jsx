import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-scroll'
import { FiArrowUp } from 'react-icons/fi'

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <Link to="hero" smooth duration={600}>
            <button
              className="w-11 h-11 rounded-xl bg-accent hover:bg-accent-light text-white
                         flex items-center justify-center shadow-lg shadow-accent/30
                         transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
              aria-label="Scroll to top"
            >
              <FiArrowUp size={18} />
            </button>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
