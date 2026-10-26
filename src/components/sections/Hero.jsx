import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, prefersReducedMotion } from '../../lib/motion'
import { hero, links, videos } from '../../data/content'
import Jellyfish from '../Jellyfish'
import Chip from '../Chip'
import GlassCard from '../GlassCard'
import MagneticButton from '../MagneticButton'
import { ArrowUpRight, DownloadIcon, GitHubIcon, LinkedInIcon, MailIcon } from '../Icons'

export default function Hero() {
  const root = useRef(null)

  useGSAP(() => {
    if (prefersReducedMotion()) return
    const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })
    tl.from('.hero-jelly', { opacity: 0, scale: 0.92, duration: 2.4, ease: 'power2.out' })
      .from('.hero-line > span', { yPercent: 110, duration: 1.3, stagger: 0.09 }, 0.35)
      .from('.hero-fade', { opacity: 0, y: 18, duration: 1, stagger: 0.07 }, 0.8)
      .from('.hero-card', { opacity: 0, y: 30, duration: 1.1, stagger: 0.08 }, 1)
      .from('.hero-side', { opacity: 0, x: 30, duration: 1.1, stagger: 0.1 }, 1.05)

    // The hero drifts upward slightly as you begin the descent.
    gsap.to('.hero-jelly', { yPercent: -12, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true } })
  }, { scope: root })

  return (
    <section id="top" ref={root} className="relative min-h-[100svh] overflow-hidden pb-16 pt-28 lg:pt-28">
      {/* Scene 1: Abyssal Bloom. Live canvas until the Higgsfield clip is dropped in. */}
      <div className="hero-jelly pointer-events-none absolute inset-y-0 right-[-30%] w-[120%] opacity-70 sm:right-[-12%] sm:w-[80%] sm:opacity-90 lg:right-[2%] lg:w-[58%]" aria-hidden="true">
        {videos.hero ? (
          <video className="h-full w-full object-cover mix-blend-screen" src={videos.hero} autoPlay muted loop playsInline />
        ) : (
          <Jellyfish seed={11} speed={0.9} tentacles={20} motes={60} />
        )}
      </div>
      <div className="hero-jelly pointer-events-none absolute bottom-0 left-0 h-[42%] w-[30%] [mask-image:linear-gradient(to_bottom,#000_45%,transparent_95%)] max-lg:hidden" aria-hidden="true">
        <div className="absolute -bottom-[75%] -left-[35%] h-[190%] w-[100%] rotate-[28deg] opacity-75 blur-[1.5px]">
          <Jellyfish seed={27} speed={0.6} tentacles={12} motes={0} intensity={1.1} />
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,rgba(0,0,0,0.75),transparent_60%)] lg:hidden" aria-hidden="true" />

      <div className="relative z-10 mx-auto grid max-w-[1440px] gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:px-12">
        <div className="lg:col-span-8">
          <div className="hero-fade"><Chip>{hero.chip}</Chip></div>

          <h1 className="mt-7 text-[clamp(3.4rem,8.6vw,8.25rem)] font-normal leading-[0.88] tracking-[-0.055em]">
            {hero.lines.map((line, i) => (
              <span key={line} className="hero-line block overflow-hidden pb-[0.06em]">
                <span className="flex items-start gap-5">
                  <span className={i === hero.lines.length - 1 ? 'text-fade-red' : ''}>{line}</span>
                  {i === 0 && (
                    <span className="mt-[0.5em] hidden text-[0.9rem] leading-[1.3] tracking-normal text-bone/75 sm:block">
                      {hero.sideNote.map((s) => <span key={s} className="block">{s}</span>)}
                    </span>
                  )}
                </span>
              </span>
            ))}
          </h1>

          <p className="hero-fade mt-7 max-w-[34rem] text-[1.125rem] leading-[1.55] text-bone/80 sm:text-[1.25rem]">{hero.body}</p>

          <div className="hero-fade mt-8 flex flex-wrap gap-3">
            <MagneticButton href={links.linkedin} target="_blank" rel="noreferrer">
              Connect on LinkedIn <ArrowUpRight />
            </MagneticButton>
            <MagneticButton href={links.resume} variant="secondary" download>
              Download résumé <DownloadIcon />
            </MagneticButton>
          </div>

          <div className="mt-10 grid max-w-[44rem] grid-cols-2 gap-3 sm:grid-cols-3">
            {hero.cards.map((c) => (
              <GlassCard key={c.label} className="hero-card flex min-h-[120px] flex-col justify-between p-4">
                <span className="text-[0.8125rem] font-medium text-bone/85">{c.label}</span>
                <span className="text-[2.6rem] font-light leading-none tracking-[-0.05em]">{c.value}</span>
              </GlassCard>
            ))}
          </div>
        </div>

        <aside className="hidden flex-col items-end justify-between lg:col-span-4 lg:flex">
          <div className="hero-side text-right text-[0.85rem] leading-[1.5]">
            <span className="block text-ash">/i build</span>
            {hero.build.map((b, i) => (
              <span key={b} className={`block ${i % 2 === 0 ? 'text-ember' : 'text-bone'}`}>{b}</span>
            ))}
          </div>

          <div className="flex items-end gap-4">
            <div className="hero-side flex flex-col gap-2" aria-label="Social links">
              {[
                { href: links.linkedin, label: 'LinkedIn', Icon: LinkedInIcon },
                { href: links.github, label: 'GitHub', Icon: GitHubIcon },
                { href: `mailto:${links.email}`, label: 'Email', Icon: MailIcon },
              ].map(({ href, label, Icon }) => (
                <a key={label} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" aria-label={label} className="glass grid h-11 w-11 place-items-center rounded-xl text-bone/85 transition-colors hover:text-glow">
                  <Icon />
                </a>
              ))}
            </div>

            <div className="flex w-[17rem] flex-col gap-3">
              <GlassCard className="hero-side h-[15rem] p-0">
                <div className="absolute inset-0 opacity-90"><Jellyfish seed={4} speed={0.7} tentacles={12} motes={14} /></div>
                <div className="relative flex h-full flex-col justify-between p-4">
                  <div className="flex items-center justify-between text-[0.75rem] text-bone/80">
                    <span>Production</span><span className="font-mono">01/04</span>
                  </div>
                  <div>
                    <span className="block text-[3rem] font-light leading-none tracking-[-0.05em]">{hero.featureA.value}</span>
                    <span className="mt-2 block text-[0.8125rem] text-bone/85">{hero.featureA.label}</span>
                  </div>
                </div>
              </GlassCard>
              <GlassCard className="hero-side p-4">
                <span className="block text-[3rem] font-light leading-none tracking-[-0.05em]">{hero.featureB.value}</span>
                <span className="mt-2 block text-[0.8125rem] text-ash">{hero.featureB.label}</span>
                <a href={`mailto:${links.email}`} className="btn-primary mt-5 flex min-h-[40px] items-center justify-center rounded-full text-[0.85rem] font-medium">Email me</a>
              </GlassCard>
            </div>
          </div>
        </aside>
      </div>
    </section>
  )
}
