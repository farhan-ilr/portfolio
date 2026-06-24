import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-scroll'
import { FiArrowUp } from 'react-icons/fi'

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-6 right-6 z-50"
        >
          <Link to="hero" smooth duration={700}>
            <motion.button
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.9 }}
              className="w-11 h-11 rounded-xl bg-accent hover:bg-accent-light text-white
                         flex items-center justify-center shadow-glow transition-colors duration-200"
              aria-label="Back to top"
            >
              <FiArrowUp size={18} />
            </motion.button>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
