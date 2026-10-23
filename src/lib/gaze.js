// Cursor -> gaze mapping. The video provides frames along four "rays" (left/right/up/down)
// ordered from near-centre to the extreme. A gaze is a ray plus a fractional position on it.
export const DEAD_ZONE = 0.1
const FULL_DEFLECTION = 0.8
const SWITCH_BIAS = 1.2 // other axis must beat the current one by this factor to switch rays
export const RAYS = ['right', 'left', 'up', 'down']

export const rayCounts = (m) => ({
  right: m.rays.right.length, left: m.rays.left.length, up: m.rays.up.length, down: m.rays.down.length,
})

/** Source path of the frame at `index` along `ray` (0 = centre). */
export function frameSrc(m, ray, index) {
  if (!ray || index <= 0) return m.center
  const list = m.rays[ray]
  return list[Math.min(index, list.length) - 1].src
}

/** All frame paths, near-centre frames of every ray first so extremes stream in last. */
export function allFrameSrcs(m) {
  const out = [m.center]
  const longest = Math.max(...RAYS.map((r) => m.rays[r].length))
  for (let i = 0; i < longest; i++) for (const r of RAYS) if (m.rays[r][i]) out.push(m.rays[r][i].src)
  return [...out, ...new Set(Object.values(m.blink))]
}

/** Keep every `step`-th frame of each ray (and the last) to save GPU memory on small screens. */
export function thinManifest(m, step) {
  const rays = {}
  for (const r of RAYS) rays[r] = m.rays[r].filter((_, i) => (i + 1) % step === 0 || i === m.rays[r].length - 1)
  return { ...m, rays }
}

/** dx/dy: cursor offset from the face, normalised (+x right, +y down). */
export function cursorToGaze(dx, dy, counts, current = null) {
  const ax = Math.abs(dx)
  const ay = Math.abs(dy)
  const mag = Math.max(ax, ay)
  if (mag < DEAD_ZONE) return { ray: null, pos: 0 }
  let horizontal = ax >= ay
  if (current) {
    const currentHorizontal = current === 'left' || current === 'right'
    if (currentHorizontal !== horizontal) {
      const challenger = horizontal ? ax : ay
      const incumbent = horizontal ? ay : ax
      if (challenger < incumbent * SWITCH_BIAS) horizontal = currentHorizontal
    }
  }
  const ray = horizontal ? (dx < 0 ? 'left' : 'right') : dy < 0 ? 'up' : 'down'
  const t = Math.min(1, Math.max(0, ((horizontal ? ax : ay) - DEAD_ZONE) / (FULL_DEFLECTION - DEAD_ZONE)))
  return { ray, pos: t * counts[ray] }
}

/** Eases toward a target gaze; switching rays always travels back through the centre frame. */
export class GazeController {
  state = { ray: null, pos: 0 }
  update(dt, target, rate = 11) {
    const k = 1 - Math.exp(-dt * rate)
    const s = this.state
    if (s.ray !== target.ray && s.ray !== null) {
      s.pos += (0 - s.pos) * k
      if (s.pos < 0.04) { s.pos = 0; s.ray = target.ray }
    } else {
      if (s.ray === null) s.ray = target.ray
      s.pos += (target.pos - s.pos) * k
      if (s.ray !== null && s.pos < 0.01 && target.ray === null) s.ray = null
    }
    return s
  }
}
