import { useEffect, useRef } from 'react'
import { gsap, isFinePointer, prefersReducedMotion } from '../lib/motion'

// Small bone dot that becomes a red "View" ring over case studies. Fine pointers only.
export default function Cursor() {
  const ref = useRef(null)
  useEffect(() => {
    if (!isFinePointer() || prefersReducedMotion()) return
    const el = ref.current
    el.style.display = 'grid'
    const x = gsap.quickTo(el, 'x', { duration: 0.35, ease: 'power3' })
    const y = gsap.quickTo(el, 'y', { duration: 0.35, ease: 'power3' })
    const move = (e) => {
      x(e.clientX); y(e.clientY)
      const view = e.target.closest?.('[data-cursor="view"]')
      el.classList.toggle('is-view', !!view)
    }
    window.addEventListener('pointermove', move)
    return () => window.removeEventListener('pointermove', move)
  }, [])
  return (
    <div ref={ref} className="cursor pointer-events-none fixed left-0 top-0 z-[60] hidden place-items-center" aria-hidden="true">
      <span className="cursor-label">View</span>
    </div>
  )
}
