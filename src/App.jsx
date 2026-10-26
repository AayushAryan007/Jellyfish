import { useEffect, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger, initSmoothScroll } from './lib/motion'
import { nav } from './data/content'
import Nav from './components/Nav'
import DepthGauge from './components/DepthGauge'
import Cursor from './components/Cursor'
import Hero from './components/sections/Hero'
import StatsStrip from './components/sections/StatsStrip'
import Mission from './components/sections/Mission'
import Pillars from './components/sections/Pillars'
import Story from './components/sections/Story'
import Principles from './components/sections/Principles'
import Work from './components/sections/Work'
import Edge from './components/sections/Edge'
import FinalCTA from './components/sections/FinalCTA'
import Footer from './components/sections/Footer'

export default function App() {
  const [active, setActive] = useState(null)

  useEffect(() => {
    const stop = initSmoothScroll()
    document.fonts?.ready.then(() => ScrollTrigger.refresh())
    return () => stop?.()
  }, [])

  // Highlight the nav pill for whichever section is in the middle of the screen.
  useGSAP(() => {
    nav.forEach(({ id }) => {
      ScrollTrigger.create({
        trigger: `#${id}`,
        start: 'top center',
        end: 'bottom center',
        onToggle: (self) => self.isActive && setActive(id),
        onLeaveBack: () => id === 'work' && setActive(null),
      })
    })
    ScrollTrigger.sort()
  })

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-ember focus:px-4 focus:py-2">Skip to content</a>
      <Nav active={active} />
      <DepthGauge />
      <Cursor />
      <div className="grain" aria-hidden="true" />
      <main id="main">
        <Hero />
        <StatsStrip />
        <Mission />
        <Pillars />
        <Story />
        <Principles />
        <Work />
        <Edge />
        <FinalCTA />
      </main>
      <Footer />
    </>
  )
}
