import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '../../lib/motion'
import { links, work } from '../../data/content'
import Chip from '../Chip'
import { ArrowUpRight } from '../Icons'

function TraceArt({ lines, index }) {
  return (
    <div className="relative h-full overflow-hidden bg-abyss">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_0%,rgba(230,57,43,0.45),transparent_60%)]" />
      <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,.6)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.6)_1px,transparent_1px)] [background-size:28px_28px]" />
      <span className="absolute right-6 top-5 font-mono text-[0.72rem] text-bone/50">{String(index + 1).padStart(2, '0')}/{String(work.length).padStart(2, '0')}</span>
      <div className="absolute bottom-6 left-6 right-6 flex flex-col gap-1.5 font-mono text-[clamp(0.72rem,1vw,0.85rem)]">
        {lines.map((l, i) => (
          <span key={l} className={i === lines.length - 1 ? 'text-glow' : 'text-bone/70'}>
            <span className="mr-3 text-bone/25">{String(i + 1).padStart(2, '0')}</span>{l}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function Work() {
  const root = useRef(null)
  const track = useRef(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
      const distance = () => track.current.scrollWidth - track.current.parentElement.clientWidth
      gsap.to(track.current, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: () => `+=${distance()}`, pin: true, scrub: 1, invalidateOnRefresh: true },
      })
    })
    return () => mm.revert()
  }, { scope: root })

  return (
    <section id="work" ref={root} className="relative overflow-hidden py-24 lg:flex lg:h-screen lg:flex-col lg:justify-center lg:py-0">
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Chip>Selected work</Chip>
            <h2 className="mt-6 text-[clamp(2.5rem,5vw,5rem)] leading-[0.95] tracking-[-0.045em]">Systems in production.</h2>
          </div>
          <p className="max-w-[30rem] text-[1rem] leading-[1.6] text-ash">Real systems at Zopper for a bank’s insurance business. Specifics stay at the level of my public résumé.</p>
        </div>
      </div>

      <div className="mx-auto mt-10 w-full max-w-[1440px] overflow-x-auto px-5 [scrollbar-width:none] sm:px-8 lg:overflow-visible lg:px-12">
        <ul ref={track} className="flex snap-x snap-mandatory gap-4 pb-2 lg:snap-none">
          {work.map((w, i) => (
            <li key={w.title} data-cursor="view" className="flex w-[86vw] shrink-0 snap-start flex-col overflow-hidden rounded-[28px] border border-hairline sm:w-[64vw] lg:w-[46vw] xl:w-[40vw]">
              <div className="h-[200px] sm:h-[240px] lg:h-[34vh]"><TraceArt lines={w.trace} index={i} /></div>
              <div className="flex flex-1 flex-col bg-bone p-6 text-abyss">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="text-[1.5rem] leading-[1.1] tracking-[-0.03em]">{w.title}</h3>
                  <span className="text-[0.8125rem] text-abyss/55">{w.role}</span>
                </div>
                <p className="mt-3 text-[0.95rem] leading-[1.55] text-abyss/75">{w.description}</p>
                <dl className="mt-5 grid gap-4 border-t border-abyss/10 pt-4 text-[0.85rem] sm:grid-cols-2">
                  <div><dt className="text-abyss/50">Stack</dt><dd className="mt-1 leading-[1.45]">{w.stack}</dd></div>
                  <div><dt className="text-abyss/50">Impact</dt><dd className="mt-1 leading-[1.45]">{w.impact}</dd></div>
                </dl>
              </div>
            </li>
          ))}
          <li className="glass flex w-[86vw] shrink-0 snap-start flex-col justify-between rounded-[28px] p-8 sm:w-[64vw] lg:w-[30vw]">
            <div>
              <span className="text-[0.8125rem] text-ash">Currently building</span>
              <h3 className="mt-3 text-[clamp(1.8rem,2.6vw,2.5rem)] leading-[1.02] tracking-[-0.035em]">AI applications with LLMs, RAG and agents.</h3>
            </div>
            <a href={links.github} target="_blank" rel="noreferrer" className="mt-10 inline-flex items-center gap-2 text-glow hover:text-bone">
              Follow along on GitHub <ArrowUpRight />
            </a>
          </li>
        </ul>
      </div>
    </section>
  )
}
