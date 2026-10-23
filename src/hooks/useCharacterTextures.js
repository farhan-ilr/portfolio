import { useEffect, useRef, useState } from 'react'
import { LinearFilter, SRGBColorSpace, TextureLoader } from 'three'
import { allFrameSrcs } from '../lib/gaze'

export const assetUrl = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`

const onIdle = (fn, timeout = 1500) => {
  if (typeof window.requestIdleCallback === 'function') {
    const id = window.requestIdleCallback(fn, { timeout })
    return () => window.cancelIdleCallback(id)
  }
  const id = window.setTimeout(fn, 200)
  return () => window.clearTimeout(id)
}

/** Loads the centre frame first (unlocks rendering), then streams the rest while idle. Disposes everything on unmount. */
export function useCharacterTextures(manifest) {
  const store = useRef(new Map())
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (!manifest) return
    let cancelled = false
    const loader = new TextureLoader()
    const textures = store.current
    const load = (src) => new Promise((resolve) => {
      if (textures.has(src)) return resolve()
      loader.load(assetUrl(src), (t) => {
        t.colorSpace = SRGBColorSpace
        t.generateMipmaps = false
        t.minFilter = LinearFilter
        t.magFilter = LinearFilter
        if (cancelled) t.dispose(); else textures.set(src, t)
        resolve()
      }, undefined, () => resolve())
    })
    ;(async () => {
      await load(manifest.center)
      if (cancelled) return
      setReady(true)
      for (const src of allFrameSrcs(manifest).slice(1)) {
        await new Promise((r) => onIdle(r))
        if (cancelled) return
        await load(src)
      }
    })()
    return () => {
      cancelled = true
      textures.forEach((t) => t.dispose())
      textures.clear()
      setReady(false)
    }
  }, [manifest])

  return { textures: store.current, ready }
}
