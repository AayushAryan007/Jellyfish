import { principles } from '../../data/content'
import GlassCard from '../GlassCard'
import Drifter from '../Drifter'

export default function Principles() {
  return (
    <section aria-labelledby="principles-title" className="relative overflow-hidden py-24 lg:py-32">
      <Drifter className="left-[38%] top-[8%]" size={180} seed={58} opacity={0.45} depth={60} sway={45} />
      <div className="relative z-10 mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <h2 id="principles-title" className="max-w-[16ch] text-[clamp(2.25rem,4.2vw,4rem)] leading-[0.98] tracking-[-0.04em]">How I work when nobody’s watching the logs.</h2>
        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {principles.map((p) => (
            <GlassCard key={p.title} className="flex min-h-[230px] flex-col justify-between p-6">
              <h3 className="text-[1.4rem] leading-[1.1] tracking-[-0.025em]">{p.title}</h3>
              <p className="mt-8 text-[0.95rem] leading-[1.55] text-bone/70">{p.body}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  )
}
