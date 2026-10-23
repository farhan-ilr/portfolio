import { useEffect, useRef, useState, Component } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { motion, useReducedMotion } from 'framer-motion'
import InteractiveCharacter from './InteractiveCharacter'
import { thinManifest } from '../../lib/gaze'
import { assetUrl } from '../../hooks/useCharacterTextures'

const POSTER = 'character/optimized/f213.webp'

function webglAvailable() {
  try {
    const c = document.createElement('canvas')
    return !!(c.getContext('webgl2') || c.getContext('webgl'))
  } catch { return false }
}

class Boundary extends Component {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  render() { return this.state.failed ? null : this.props.children }
}

/** Bottom-flush portrait sized to the canvas; mirrors the CSS poster geometry exactly. */
function Portrait({ manifest, reduced, onReady }) {
  const viewport = useThree((s) => s.viewport)
  const aspect = manifest.width / manifest.height
  const height = Math.min(viewport.height * 0.98, viewport.width / aspect)
  const y = -viewport.height / 2 + height / 2 - viewport.height * 0.02
  return (
    <InteractiveCharacter
      characterAssets={manifest}
      scale={height}
      position={[0, y, 0]}
      idleAnimationEnabled={!reduced}
      onReady={onReady}
    />
  )
}

/**
 * Cursor-following cartoon character. Renders a static poster instantly, then hands over
 * to the WebGL portrait once the centre frame is on the GPU. Falls back to the poster
 * alone when WebGL is unavailable.
 */
export default function CharacterStage({ className = '' }) {
  const wrap = useRef(null)
  const reduced = useReducedMotion()
  const [manifest, setManifest] = useState(null)
  const [mountScene, setMountScene] = useState(false)
  const [ready, setReady] = useState(false)
  const [visible, setVisible] = useState(true)
  const gl = useRef(webglAvailable())

  useEffect(() => {
    const ctrl = new AbortController()
    fetch(assetUrl('character/manifest.json'), { signal: ctrl.signal })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((m) => setManifest(window.matchMedia('(max-width: 1023px)').matches ? thinManifest(m, 2) : m))
      .catch(() => {}) // poster stays; the page still works
    return () => ctrl.abort()
  }, [])

  // Mount the canvas after first paint so the page text is never delayed.
  useEffect(() => {
    if (!gl.current) return
    const id = window.setTimeout(() => setMountScene(true), 150)
    return () => window.clearTimeout(id)
  }, [])

  // Stop rendering while the hero is scrolled out of view.
  useEffect(() => {
    const el = wrap.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting))
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={wrap} className={`relative w-full h-full [container-type:size] ${className}`}>
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(55% 55% at 50% 45%, rgba(225,29,72,0.20), transparent 70%)' }}
      />
      {mountScene && manifest && (
        <Boundary>
          <Canvas
            className="!absolute inset-0"
            dpr={[1, 1.5]}
            frameloop={visible ? 'always' : 'never'}
            camera={{ position: [0, 0, 8], fov: 32 }}
            gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
            aria-hidden
          >
            <Portrait manifest={manifest} reduced={!!reduced} onReady={() => setReady(true)} />
          </Canvas>
        </Boundary>
      )}
      {/* Wrapper centres the poster: framer-motion's inline transform would override a translate-based centring. */}
      <div className="pointer-events-none absolute inset-x-0 flex justify-center" style={{ bottom: '-2cqh' }}>
        <motion.img
          src={assetUrl(POSTER)}
          alt="Cartoon portrait of Farhan"
          fetchpriority="high"
          decoding="async"
          draggable={false}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: ready ? 0 : 1, y: 0 }}
          transition={{ opacity: { duration: ready ? 0.6 : 0.9 }, y: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } }}
          className="select-none [height:min(98cqh,81.8cqw)]"
          style={{ aspectRatio: '880 / 720' }}
        />
      </div>
    </div>
  )
}
