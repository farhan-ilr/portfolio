import { Suspense, useMemo, useRef } from 'react'
import { createRoot } from 'react-dom/client'
import { flushSync } from 'react-dom'
import * as THREE from 'three'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import {
  SiFlutter, SiDart, SiAndroid, SiKotlin, SiFirebase,
  SiGit, SiFigma, SiSqlite, SiAndroidstudio,
} from 'react-icons/si'

const ICONS = [
  { Icon: SiFlutter,       color: '#54C5F8' },
  { Icon: SiDart,          color: '#0175C2' },
  { Icon: SiAndroid,       color: '#3DDC84' },
  { Icon: SiKotlin,        color: '#7F52FF' },
  { Icon: SiFirebase,      color: '#FFCA28' },
  { Icon: SiGit,           color: '#F05032' },
  { Icon: SiFigma,         color: '#F24E1E' },
  { Icon: SiSqlite,        color: '#89b6e8' },
  { Icon: SiAndroidstudio, color: '#3DDC84' },
]

function iconToDataUrl(Icon, color, size = 128) {
  const div = document.createElement('div')
  const root = createRoot(div)
  flushSync(() => {
    root.render(<Icon size={size} color={color} />)
  })
  const svgEl = div.querySelector('svg')
  svgEl.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
  svgEl.setAttribute('width', size)
  svgEl.setAttribute('height', size)
  const svgString = new XMLSerializer().serializeToString(svgEl)
  root.unmount()
  return `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svgString)))}`
}

function useIconTextures() {
  return useMemo(() => {
    const loader = new THREE.TextureLoader()
    return ICONS.map(({ Icon, color }) => {
      const url = iconToDataUrl(Icon, color)
      const tex = loader.load(url)
      tex.colorSpace = THREE.SRGBColorSpace
      return tex
    })
  }, [])
}

function FloatingIcon({ texture, position, scale, speed, offset }) {
  const ref = useRef(null)

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed + offset
    if (!ref.current) return
    ref.current.position.y = position[1] + Math.sin(t) * 0.45
    ref.current.position.x = position[0] + Math.cos(t * 0.6) * 0.25
    ref.current.rotation.z = Math.sin(t * 0.4) * 0.15
  })

  return (
    <sprite ref={ref} position={position} scale={[scale, scale, 1]}>
      <spriteMaterial map={texture} transparent depthWrite={false} />
    </sprite>
  )
}

function IconField() {
  const textures = useIconTextures()

  const { viewport } = useThree()

  const items = useMemo(() => {
    const cols = 3
    const rows = 3
    const spreadX = viewport.width * 0.92
    const spreadY = viewport.height * 0.8
    const list = []
    textures.forEach((tex, i) => {
      const col = i % cols
      const row = Math.floor(i / cols)
      const jitterX = (Math.random() - 0.5) * (spreadX / cols) * 0.5
      const jitterY = (Math.random() - 0.5) * (spreadY / rows) * 0.5
      const x = (col / (cols - 1) - 0.5) * spreadX + jitterX
      const y = (row / (rows - 1) - 0.5) * spreadY + jitterY
      const z = (Math.random() - 0.5) * 2
      list.push({
        texture: tex,
        position: [x, y, z],
        scale: 0.85 + Math.random() * 0.5,
        speed: 0.35 + Math.random() * 0.35,
        offset: Math.random() * Math.PI * 2,
      })
    })
    return list
  }, [textures, viewport.width, viewport.height])

  return (
    <>
      {items.map((it, i) => (
        <FloatingIcon key={i} {...it} />
      ))}
    </>
  )
}

export default function Hero3D() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas
        orthographic
        camera={{ position: [0, 0, 10], zoom: 60 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
      >
        <Suspense fallback={null}>
          <IconField />
        </Suspense>
      </Canvas>
    </div>
  )
}
