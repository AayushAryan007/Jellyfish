import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, prefersReducedMotion } from '../../lib/motion'
import { pillars } from '../../data/content'
import Topology from '../Topology'
import Chip from '../Chip'

// Scene 3: Tendrils to Topology. Pinned on desktop; the network forms as you scroll.
export default function Pillars() {
  const root = useRef(null)
  const progress = useRef(0)
  const [active, setActive] = useState(0)

  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
      gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: '+=220%',
          pin: true,
          scrub: true,
          onUpdate: (self) => {
            progress.current = self.progress
            const idx = Math.min(pillars.length - 1, Math.floor(self.progress * pillars.length * 0.999))
            setActive((a) => (a === idx ? a : idx))
          },
        },
      })
    })
    mm.add('(max-width: 1023px) and (prefers-reduced-motion: no-preference)', () => {
      gsap.to(progress, { current: 1, duration: 3.5, ease: 'power2.inOut', scrollTrigger: { trigger: '.topo-wrap', start: 'top 70%', once: true } })
    })
    mm.add('(prefers-reduced-motion: reduce)', () => { progress.current = 1 })
    return () => mm.revert()
  }, { scope: root })

  return (
    <section id="craft" ref={root} className="relative lg:h-screen">
      <div className="mx-auto grid h-full max-w-[1440px] gap-10 px-5 py-24 sm:px-8 lg:grid-cols-12 lg:items-center lg:px-12 lg:py-0">
        <div className="lg:col-span-6">
          <Chip>What I do</Chip>
          <h2 className="mt-6 max-w-[12ch] text-[clamp(2.5rem,5vw,5rem)] leading-[0.95] tracking-[-0.045em]">Three disciplines, one system.</h2>
          <div className="topo-wrap relative mt-6 h-[420px] sm:h-[480px] lg:mt-4 lg:h-[60vh]">
            <Topology progress={progress} />
          </div>
        </div>

        <ol className="flex flex-col gap-3 lg:col-span-6">
          {pillars.map((p, i) => {
            const on = active === i
            return (
              <li
                key={p.title}
                className={`glass rounded-[24px] p-6 transition-[opacity,border-color,box-shadow] duration-500 lg:p-8 ${on ? 'border-glow/45 shadow-[0_0_40px_-10px_rgba(230,57,43,0.55)] lg:opacity-100' : 'lg:opacity-45'}`}
              >
                <div className="flex items-start justify-between gap-6">
                  <h3 className="text-[clamp(1.5rem,2.3vw,2.1rem)] leading-[1.05] tracking-[-0.03em]">{p.title}</h3>
                  <span className={`font-mono text-[0.75rem] ${on ? 'text-ember' : 'text-ash'}`}>({String(i + 1).padStart(2, '0')})</span>
                </div>
                <div className={`grid transition-[grid-template-rows] duration-500 ${on ? 'grid-rows-[1fr]' : 'grid-rows-[1fr] lg:grid-rows-[0fr]'}`}>
                  <div className="overflow-hidden">
                    <p className="mt-4 max-w-[46ch] text-[1rem] leading-[1.6] text-bone/75">{p.body}</p>
                    <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technologies">
                      {p.tags.map((t) => (
                        <li key={t} className="rounded-full border border-bone/10 bg-bone/[0.04] px-3 py-1 font-mono text-[0.72rem] text-bone/80">{t}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
