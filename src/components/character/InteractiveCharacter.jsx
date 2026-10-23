import { useEffect, useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Vector3 } from 'three'
import { frameSrc } from '../../lib/gaze'
import { createCharacterMaterial } from './characterMaterial'
import { useCharacterTextures } from '../../hooks/useCharacterTextures'
import { useCharacterGaze } from '../../hooks/useCharacterGaze'
import { useCursorPosition } from '../../hooks/useCursorPosition'

const BLINK_MS = 170

/**
 * Camera-facing portrait plane whose gaze follows the cursor.
 * Props: characterAssets (manifest), cursorTrackingEnabled, idleAnimationEnabled,
 * scale (world-unit height), position, faceAnchor (face centre, fraction of plane height), onReady.
 */
export default function InteractiveCharacter({
  characterAssets: manifest,
  cursorTrackingEnabled = true,
  idleAnimationEnabled = true,
  scale = 4,
  position = [0, 0, 0],
  faceAnchor = [0, 0.19],
  onReady,
}) {
  const group = useRef(null)
  const cursor = useCursorPosition()
  const { textures, ready } = useCharacterTextures(manifest)
  const gaze = useCharacterGaze(manifest)
  const camera = useThree((s) => s.camera)
  const gl = useThree((s) => s.gl)
  const material = useMemo(() => createCharacterMaterial(), [])
  const scratch = useMemo(() => new Vector3(), [])
  const blink = useRef({ next: 2500, start: -1 })
  const aspect = manifest.width / manifest.height

  useEffect(() => () => material.dispose(), [material])
  useEffect(() => { if (ready) onReady?.() }, [ready, onReady])

  useFrame((state, dt) => {
    const g = group.current
    const center = textures.get(manifest.center)
    if (!g || !center) return
    dt = Math.min(dt, 0.05)
    const now = performance.now()
    const u = material.uniforms
    material.visible = true

    // Face position on screen -> cursor offset relative to the face.
    g.updateWorldMatrix(true, false)
    scratch.set(faceAnchor[0] * aspect, faceAnchor[1], 0).applyMatrix4(g.matrixWorld).project(camera)
    const rect = gl.domElement.getBoundingClientRect()
    const faceX = rect.left + (scratch.x * 0.5 + 0.5) * rect.width
    const faceY = rect.top + (-scratch.y * 0.5 + 0.5) * rect.height

    const s = gaze.update(dt, {
      cursor: cursor.current, faceX, faceY,
      rangeX: Math.max(280, window.innerWidth * 0.4),
      rangeY: Math.max(220, window.innerHeight * 0.4),
      now, trackingEnabled: cursorTrackingEnabled, idleEnabled: idleAnimationEnabled,
    })

    // Two neighbouring frames for the fractional position; frames stream in while idle,
    // so until one arrives use the nearest loaded frame closer to the centre.
    const lo = Math.floor(s.pos)
    const pick = (idx) => {
      for (let i = idx; i > 0; i--) {
        const t = textures.get(frameSrc(manifest, s.ray, i))
        if (t) return t
      }
      return center
    }
    u.uA.value = pick(lo)
    u.uB.value = pick(lo + 1)
    u.uMix.value = s.pos - lo

    // Blink using the closed-eye frame that best matches the current pose.
    if (idleAnimationEnabled) {
      const b = blink.current
      if (b.start < 0 && now > b.next) b.start = now
      let amt = 0
      if (b.start >= 0) {
        const p = (now - b.start) / BLINK_MS
        if (p >= 1) { b.start = -1; b.next = now + 2600 + Math.random() * 3800 }
        else amt = Math.sin(p * Math.PI)
      }
      const blinkTex = textures.get(manifest.blink[s.pos > 0.6 && s.ray ? s.ray : 'center'])
      u.uBlink.value = blinkTex ?? center
      u.uBlinkAmt.value = blinkTex ? Math.min(1, amt * 1.25) : 0
    } else {
      u.uBlink.value = center
      u.uBlinkAmt.value = 0
    }

    // Breathing, slight head drift, and a hint of facing the cursor.
    const t = state.clock.elapsedTime
    const idle = idleAnimationEnabled ? 1 : 0
    const track = cursorTrackingEnabled && cursor.current.inside ? 1 : 0
    const sx = Math.max(-1, Math.min(1, (cursor.current.clientX - faceX) / (rect.width * 0.6)))
    const sy = Math.max(-1, Math.min(1, (cursor.current.clientY - faceY) / (rect.height * 0.6)))
    const breathe = Math.sin(t * 1.5) * idle
    g.position.set(position[0], position[1] + breathe * 0.012 * scale, position[2])
    g.scale.setScalar(scale * (1 + breathe * 0.004))
    const k = 1 - Math.exp(-dt * 4)
    g.rotation.y += (sx * 0.07 * track + Math.sin(t * 0.5) * 0.015 * idle - g.rotation.y) * k
    g.rotation.x += (sy * 0.04 * track + Math.sin(t * 0.7) * 0.008 * idle - g.rotation.x) * k
  })

  return (
    <group ref={group} position={position} scale={scale}>
      <mesh renderOrder={2}>
        <planeGeometry args={[aspect, 1]} />
        <primitive object={material} attach="material" />
      </mesh>
    </group>
  )
}
