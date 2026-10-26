import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '../../lib/motion'
import { story, storyClose } from '../../data/content'
import Chip from '../Chip'

// Scene 2 slot (The Engine Room). Until the clip exists, a crimson duotone portrait with a slow scroll push-in.
export default function Story() {
  const root = useRef(null)
  const [active, setActive] = useState(0)

  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
      gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: '+=260%',
          pin: true,
          scrub: true,
          onUpdate: (self) => {
            const idx = Math.min(story.length - 1, Math.floor(self.progress * story.length * 0.999))
            setActive((a) => (a === idx ? a : idx))
          },
        },
      })
        .fromTo('.story-photo', { scale: 1.25, yPercent: 4 }, { scale: 1.02, yPercent: -2, ease: 'none' }, 0)
        .fromTo('.story-rail', { scaleY: 0 }, { scaleY: 1, ease: 'none' }, 0)
    })
    mm.add('(max-width: 1023px)', () => setActive(-1))
    return () => mm.revert()
  }, { scope: root })

  return (
    <section id="story" ref={root} className="relative lg:h-screen">
      <div className="mx-auto grid h-full max-w-[1440px] gap-10 px-5 py-24 sm:px-8 lg:grid-cols-12 lg:items-center lg:px-12 lg:py-16">
        <div className="relative h-[60vh] overflow-hidden rounded-[28px] border border-hairline lg:col-span-5 lg:h-full">
          <img
            src="/assets/img/aayush.jpg"
            alt="Aayush Aryan in a black T-shirt, looking off to the side."
            className="story-photo absolute inset-0 h-full w-full object-cover object-[50%_12%] [filter:grayscale(1)_contrast(1.25)_brightness(0.8)]"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-ember mix-blend-multiply" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,transparent_35%,rgba(0,0,0,0.85))]" />
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black to-transparent" />
          <span className="absolute bottom-5 left-5 text-[0.8125rem] text-bone/85">Aayush Aryan · Backend engineer</span>
        </div>

        <div className="lg:col-span-7 lg:pl-8">
          <Chip>Story</Chip>
          <h2 className="mt-5 max-w-[16ch] text-[clamp(2.25rem,3.8vw,3.75rem)] leading-[0.95] tracking-[-0.045em]">How I got to the deep end.</h2>

          <ol className="relative mt-8 flex flex-col gap-4 pl-8">
            <span className="absolute bottom-2 left-[5px] top-2 w-px bg-bone/10" aria-hidden="true" />
            <span className="story-rail absolute bottom-2 left-[5px] top-2 hidden w-px origin-top bg-ember lg:block" aria-hidden="true" />
            {story.map((s, i) => {
              const on = active === -1 || i <= active
              const current = active === i
              return (
                <li key={s.title} className={`relative transition-opacity duration-500 ${on ? 'opacity-100' : 'opacity-35'}`}>
                  <span className={`absolute -left-8 top-[0.45rem] h-[11px] w-[11px] rounded-full border transition-all duration-500 ${current || active === -1 ? 'border-ember bg-ember shadow-[0_0_12px_rgba(230,57,43,0.9)]' : on ? 'border-ember bg-abyss' : 'border-bone/25 bg-abyss'}`} aria-hidden="true" />
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <h3 className="text-[1.2rem] leading-tight tracking-[-0.02em]">{s.title}</h3>
                    <span className="text-[0.8125rem] text-ash">{s.meta}</span>
                  </div>
                  <p className="mt-1.5 max-w-[56ch] text-[0.92rem] leading-[1.5] text-bone/70">{s.body}</p>
                </li>
              )
            })}
          </ol>

          <p className="mt-8 max-w-[40ch] text-[1.1rem] leading-[1.4] tracking-[-0.01em] text-bone">{storyClose}</p>
        </div>
      </div>
    </section>
  )
}
