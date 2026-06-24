import { useState, useEffect } from 'react'

export default function Typewriter({ words, speed = 80, deleteSpeed = 50, pause = 1800 }) {
  const [index, setIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = words[index % words.length]

    const timeout = setTimeout(() => {
      if (!deleting) {
        setDisplayed(current.slice(0, displayed.length + 1))
        if (displayed.length + 1 === current.length) {
          setTimeout(() => setDeleting(true), pause)
        }
      } else {
        setDisplayed(current.slice(0, displayed.length - 1))
        if (displayed.length - 1 === 0) {
          setDeleting(false)
          setIndex((i) => i + 1)
        }
      }
    }, deleting ? deleteSpeed : speed)

    return () => clearTimeout(timeout)
  }, [displayed, deleting, index, words, speed, deleteSpeed, pause])

  return (
    <span>
      {displayed}
      <span className="inline-block w-0.5 h-[1em] bg-accent-light ml-0.5 animate-pulse align-middle" />
    </span>
  )
}
