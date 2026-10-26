import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, prefersReducedMotion } from '../../lib/motion'
import { mission } from '../../data/content'
import Chip from '../Chip'
import Drifter from '../Drifter'

// Turns "plain [highlighted words] plain" into word tokens.
function tokenize(text) {
  const out = []
  text.split(/(\[[^\]]+\])/).forEach((part) => {
    const hl = part.startsWith('[')
    part.replace(/[[\]]/g, '').split(/\s+/).filter(Boolean).forEach((w) => {
      // Punctuation that follows a highlighted phrase sticks to the previous word.
      if (/^[,.;:]/.test(w) && out.length) {
        out[out.length - 1].tail = w[0]
        if (w.length > 1) out.push({ w: w.slice(1), hl })
      } else out.push({ w, hl })
    })
  })
  return out
}

export default function Mission() {
  const root = useRef(null)
  const words = tokenize(mission.statement)

  useGSAP(() => {
    if (prefersReducedMotion()) return
    gsap.fromTo('.m-word', { opacity: 0.14 }, {
      opacity: 1,
      stagger: 0.06,
      ease: 'none',
      scrollTrigger: { trigger: '.m-statement', start: 'top 78%', end: 'bottom 42%', scrub: true },
    })
  }, { scope: root })

  return (
    <section id="mission" ref={root} className="relative overflow-hidden py-24 lg:py-40">
      <Drifter className="right-[4%] top-[18%] hidden sm:block" size={260} seed={33} opacity={0.5} depth={45} sway={-35} speed={0.7} />
      <div className="relative z-10 mx-auto grid max-w-[1440px] gap-10 px-5 sm:px-8 lg:grid-cols-12 lg:px-12">
        <div className="lg:col-span-3"><Chip>Mission</Chip></div>
        <div className="lg:col-span-9">
          <p className="m-statement max-w-[22ch] text-[clamp(2rem,4.2vw,4rem)] leading-[1.06] tracking-[-0.035em] lg:max-w-[24ch]">
            {words.map((t, i) => (
              <span key={i} className="m-word"><span className={t.hl ? 'text-ember' : ''}>{t.w}</span>{t.tail}{' '}</span>
            ))}
          </p>
          <p className="mt-12 max-w-[30rem] text-[1.0625rem] leading-[1.6] text-ash lg:ml-auto lg:mr-[8%]">{mission.note}</p>
        </div>
      </div>
    </section>
  )
}
