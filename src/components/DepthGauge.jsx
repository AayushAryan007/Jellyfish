import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from '../lib/motion'

// The site’s signature: a depth reading from 0 m at the surface to 4,000 m at the footer.
export default function DepthGauge() {
  const num = useRef(null)
  const fill = useRef(null)
  useGSAP(() => {
    ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        const m = Math.round((self.progress * 4000) / 10) * 10
        num.current.textContent = `${m.toLocaleString('en-US')} m`
        fill.current.style.transform = `scaleY(${self.progress})`
      },
    })
  })
  return (
    <div className="pointer-events-none fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-3 lg:flex xl:right-6" aria-hidden="true">
      <span className="font-mono text-[0.7rem] text-ash [writing-mode:vertical-rl]">depth</span>
      <div className="relative h-40 w-px bg-bone/15">
        <div ref={fill} className="absolute inset-0 origin-top bg-ember shadow-[0_0_8px_rgba(230,57,43,0.8)]" style={{ transform: 'scaleY(0)' }} />
      </div>
      <span ref={num} className="w-16 text-center font-mono text-[0.7rem] tabular-nums text-bone/80">0 m</span>
    </div>
  )
}
