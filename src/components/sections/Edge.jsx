import { edge } from '../../data/content'
import Chip from '../Chip'
import Drifter from '../Drifter'

export default function Edge() {
  return (
    <section aria-labelledby="edge-title" className="relative overflow-hidden py-24 lg:py-36">
      <Drifter className="right-[10%] top-[30%]" size={130} seed={71} opacity={0.5} depth={70} sway={-25} speed={1} />
      <div className="relative z-10 mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <Chip>Competitive programming</Chip>
        <h2 id="edge-title" className="mt-6 max-w-[18ch] text-[clamp(2.25rem,4.2vw,4rem)] leading-[0.98] tracking-[-0.04em]">The problem-solving shows up on the leaderboard too.</h2>
        <ul className="mt-14 grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
          {edge.items.map((e) => (
            <li key={e.label} className="border-t border-hairline pt-5">
              <span className="block text-[clamp(3.75rem,8vw,8rem)] font-light leading-[0.85] tracking-[-0.06em]">
                {e.value}<span className="text-ember">{e.suffix}</span>
              </span>
              <span className="mt-4 block text-[0.9rem] text-bone/75">{e.label}</span>
            </li>
          ))}
        </ul>
        <p className="mt-12 text-[0.95rem] text-ash">{edge.note}</p>
      </div>
    </section>
  )
}
