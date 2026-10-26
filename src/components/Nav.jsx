import { useEffect, useState } from 'react'
import { links, nav } from '../data/content'
import { scrollToTarget } from '../lib/motion'
import { ArrowUpRight } from './Icons'

export default function Nav({ active }) {
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    let last = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setHidden(y > last && y > 160)
      last = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { document.body.style.overflow = open ? 'hidden' : '' }, [open])

  const go = (id) => (e) => { e.preventDefault(); setOpen(false); scrollToTarget(`#${id}`) }

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 transition-transform duration-500 ${hidden && !open ? '-translate-y-full' : ''}`}>
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-5 py-4 sm:px-8 lg:px-12">
          <a href="#top" onClick={go('top')} className="flex items-center gap-2.5 text-[1.15rem] font-medium tracking-[-0.02em]">
            <span className="relative grid h-6 w-6 place-items-center">
              <span className="absolute inset-0 rounded-full bg-ember shadow-[0_0_18px_4px_rgba(230,57,43,0.6)]" />
              <span className="relative h-2 w-2 rounded-full bg-bone/90" />
            </span>
            Aayush Aryan
          </a>

          <nav aria-label="Primary" className="glass hidden rounded-full p-1 md:flex">
            {nav.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                onClick={go(n.id)}
                aria-current={active === n.id ? 'true' : undefined}
                className={`rounded-full px-5 py-2 text-[0.9rem] transition-colors duration-300 ${active === n.id ? 'bg-ember text-bone shadow-[0_0_20px_rgba(230,57,43,0.55)]' : 'text-bone/75 hover:text-bone'}`}
              >
                {n.label}
              </a>
            ))}
          </nav>

          <a href={links.linkedin} target="_blank" rel="noreferrer" className="btn-primary hidden min-h-[42px] items-center gap-1.5 rounded-full px-5 text-[0.9rem] font-medium md:inline-flex">
            LinkedIn <ArrowUpRight />
          </a>
          <button onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-controls="mobile-menu" className="btn-primary inline-flex min-h-[44px] items-center gap-2 rounded-full px-5 text-[0.9rem] font-medium md:hidden">
            {open ? 'Close' : 'Menu'}
          </button>
        </div>
      </header>

      <div id="mobile-menu" hidden={!open} className="fixed inset-0 z-40 bg-abyss/95 backdrop-blur-xl md:hidden">
        <nav aria-label="Mobile" className="flex h-full flex-col justify-center gap-2 px-8">
          {nav.map((n) => (
            <a key={n.id} href={`#${n.id}`} onClick={go(n.id)} className="text-[3rem] leading-[1.1] tracking-[-0.04em] text-bone">
              {n.label}
            </a>
          ))}
          <a href={links.linkedin} target="_blank" rel="noreferrer" className="mt-8 text-lg text-ember">LinkedIn ↗</a>
        </nav>
      </div>
    </>
  )
}
