import { useMemo } from 'react'
import { GazeController, cursorToGaze, rayCounts } from '../lib/gaze'

const TAP_LOOK_MS = 1600
const CURSOR_IDLE_MS = 9000
const GLANCES = [
  { dx: -0.7, dy: 0 }, { dx: 0.5, dy: 0 }, { dx: 0, dy: -0.6 },
  { dx: -0.4, dy: -0.3 }, { dx: 0, dy: 0 }, { dx: 0, dy: 0 },
]

/** Turns cursor/touch input into a smoothed gaze. `update` is called every frame; nothing here re-renders React. */
export function useCharacterGaze(manifest) {
  return useMemo(() => {
    const controller = new GazeController()
    const counts = manifest ? rayCounts(manifest) : { right: 0, left: 0, up: 0, down: 0 }
    let glance = GLANCES[4]
    let nextGlanceAt = 0
    let lastTap = 0
    let tapTarget = null
    let tapUntil = 0

    function update(dt, i) {
      let dx = 0
      let dy = 0
      const c = i.cursor
      if (c.tapCount !== lastTap) {
        lastTap = c.tapCount
        tapTarget = { dx: (c.clientX - i.faceX) / i.rangeX, dy: (c.clientY - i.faceY) / i.rangeY }
        tapUntil = i.now + TAP_LOOK_MS
      }
      if (i.trackingEnabled && c.inside && !c.touch) {
        dx = (c.clientX - i.faceX) / i.rangeX
        dy = (c.clientY - i.faceY) / i.rangeY
      } else if (tapTarget && i.now < tapUntil) {
        dx = tapTarget.dx
        dy = tapTarget.dy
      } else if (i.idleEnabled && (c.touch || (!c.inside && c.lastActive === 0) || i.now - c.lastActive > CURSOR_IDLE_MS)) {
        // Touch devices (or visitors who never moved a mouse) get gentle scripted glances.
        if (i.now > nextGlanceAt) {
          glance = GLANCES[Math.floor(Math.random() * GLANCES.length)]
          nextGlanceAt = i.now + 1800 + Math.random() * 2600
        }
        dx = glance.dx
        dy = glance.dy
      }
      const clamp = (v) => Math.max(-1.5, Math.min(1.5, v))
      return controller.update(dt, cursorToGaze(clamp(dx), clamp(dy), counts, controller.state.ray))
    }
    return { update, controller }
  }, [manifest])
}
