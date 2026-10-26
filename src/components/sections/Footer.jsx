import { links } from '../../data/content'
import { scrollToTarget } from '../../lib/motion'

export default function Footer() {
  return (
    <footer className="border-t border-hairline">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-6 px-5 py-8 text-[0.875rem] text-ash sm:px-8 md:flex-row md:items-center md:justify-between lg:px-12">
        <span>© {new Date().getFullYear()} Aayush Aryan</span>
        <div className="flex flex-wrap gap-6">
          <a href={links.linkedin} target="_blank" rel="noreferrer" className="hover:text-bone">LinkedIn</a>
          <a href={links.github} target="_blank" rel="noreferrer" className="hover:text-bone">GitHub</a>
          <a href={`mailto:${links.email}`} className="hover:text-bone">Email</a>
          <a href={links.resume} download className="hover:text-bone">Résumé</a>
        </div>
        <button onClick={() => scrollToTarget(0)} className="text-left text-bone/80 hover:text-glow md:text-right">Back to the surface ↑</button>
      </div>
    </footer>
  )
}
