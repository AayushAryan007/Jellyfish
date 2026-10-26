import { stats } from '../../data/content'
import Counter from '../Counter'
import Drifter from '../Drifter'

export default function StatsStrip() {
  return (
    <section id="proof" aria-label="Highlights" className="relative py-20 lg:py-28">
      <Drifter className="-top-10 left-[6%]" size={150} seed={21} opacity={0.55} sway={30} />
      <div className="relative z-10 mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="glass grid grid-cols-2 overflow-hidden rounded-[28px] md:grid-cols-3 lg:grid-cols-5">
          {stats.map((s, i) => (
            <div key={s.label} className={`flex flex-col gap-6 p-6 lg:p-7 ${i > 0 ? 'border-hairline lg:border-l' : ''} ${i % 2 === 1 ? 'border-l border-hairline md:border-l-0' : ''} ${i >= 2 ? 'border-t border-hairline md:border-t-0' : ''} ${i >= 3 ? 'md:border-t lg:border-t-0' : ''} ${i === 4 ? 'col-span-2 md:col-span-1' : ''}`}>
              <span className="text-[0.8125rem] font-medium text-bone/85">{s.label}</span>
              <div>
                <Counter value={s.value} prefix={s.prefix} suffix={s.suffix} className="block text-[clamp(2.6rem,4.5vw,3.75rem)] font-light leading-none tracking-[-0.05em]" />
                <span className="mt-3 block text-[0.8125rem] text-ash">{s.detail}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
