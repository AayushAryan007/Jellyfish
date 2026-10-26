import { useState } from 'react'
import { links } from '../../data/content'
import Jellyfish from '../Jellyfish'
import MagneticButton from '../MagneticButton'
import { ArrowUpRight, DownloadIcon } from '../Icons'

export default function FinalCTA() {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(links.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      window.location.href = `mailto:${links.email}`
    }
  }

  return (
    <section id="contact" className="relative flex min-h-[100svh] items-center overflow-hidden py-28">
      <div className="pointer-events-none absolute inset-x-0 bottom-[-45%] top-[5%] mx-auto w-[min(1100px,140vw)] opacity-80" aria-hidden="true">
        <Jellyfish seed={9} speed={0.75} tentacles={22} motes={50} />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_55%,rgba(0,0,0,0.65),transparent_65%)]" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-[1440px] px-5 text-center sm:px-8 lg:px-12">
        <h2 className="mx-auto text-[clamp(3rem,8.5vw,8.5rem)] leading-[0.9] tracking-[-0.055em]">
          Let’s build something<br /><span className="text-fade-red">that holds.</span>
        </h2>
        <p className="mx-auto mt-8 max-w-[36rem] text-[1.125rem] leading-[1.6] text-bone/80">
          Open to backend engineering roles, system-design challenges, and AI-driven projects.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <MagneticButton href={links.linkedin} target="_blank" rel="noreferrer" className="min-h-[56px] px-8 text-[1.05rem]">
            Connect on LinkedIn <ArrowUpRight />
          </MagneticButton>
          <MagneticButton href={links.resume} variant="secondary" download className="min-h-[56px] px-7">
            Download résumé <DownloadIcon />
          </MagneticButton>
        </div>
        <button onClick={copy} className="mt-8 text-[1rem] text-bone/75 underline decoration-ember/60 underline-offset-[6px] transition-colors hover:text-bone">
          <span aria-live="polite">{copied ? 'Email copied' : links.email}</span>
        </button>
      </div>
    </section>
  )
}
