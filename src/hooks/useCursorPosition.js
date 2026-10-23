import { useEffect, useRef } from 'react'

// One shared, mutable cursor state fed by a single set of window listeners.
// Read it inside rAF / useFrame — it never triggers a React re-render.
const state = { clientX: 0, clientY: 0, nx: 0, ny: 0, inside: false, touch: false, lastActive: 0, tapCount: 0 }
let listeners = 0
let teardown = null

function attach() {
  const onMove = (e) => {
    state.clientX = e.clientX
    state.clientY = e.clientY
    state.nx = (e.clientX / window.innerWidth) * 2 - 1
    state.ny = (e.clientY / window.innerHeight) * 2 - 1
    state.lastActive = performance.now()
    state.touch = e.pointerType === 'touch'
    state.inside = !state.touch
  }
  const onDown = (e) => { onMove(e); if (e.pointerType === 'touch') state.tapCount++ }
  const onLeave = () => { state.inside = false }
  window.addEventListener('pointermove', onMove, { passive: true })
  window.addEventListener('pointerdown', onDown, { passive: true })
  document.documentElement.addEventListener('pointerleave', onLeave)
  window.addEventListener('blur', onLeave)
  return () => {
    window.removeEventListener('pointermove', onMove)
    window.removeEventListener('pointerdown', onDown)
    document.documentElement.removeEventListener('pointerleave', onLeave)
    window.removeEventListener('blur', onLeave)
  }
}

export function useCursorPosition() {
  const ref = useRef(state)
  useEffect(() => {
    if (listeners++ === 0) teardown = attach()
    return () => { if (--listeners === 0) { teardown?.(); teardown = null } }
  }, [])
  return ref
}
