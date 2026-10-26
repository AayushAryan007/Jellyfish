import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, prefersReducedMotion } from '../lib/motion'
import Jellyfish from './Jellyfish'

// A smaller jellyfish that drifts behind the glass cards: scroll parallax plus its own slow sway.
export default function Drifter({ className = '', size = 220, seed = 3, opacity = 0.6, depth = 30, sway = 40, speed = 0.8 }) {
  const ref = useRef(null)
  useGSAP(() => {
    if (prefersReducedMotion()) return
    gsap.to(ref.current, { yPercent: -depth, ease: 'none', scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom top', scrub: true } })
    gsap.to(ref.current.firstChild, { x: sway, rotate: sway > 0 ? 6 : -6, duration: 9 + (seed % 5), ease: 'sine.inOut', repeat: -1, yoyo: true })
  }, { scope: ref })
  return (
    <div ref={ref} className={`pointer-events-none absolute z-0 ${className}`} style={{ width: size, height: size * 2, opacity }} aria-hidden="true">
      <div className="relative h-full w-full">
        <Jellyfish seed={seed} speed={speed} tentacles={11} motes={0} intensity={0.9} />
      </div>
    </div>
  )
}
