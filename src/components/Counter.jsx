import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, prefersReducedMotion } from '../lib/motion'

// Counts up once when it scrolls into view.
export default function Counter({ value, prefix = '', suffix = '', className = '' }) {
  const ref = useRef(null)
  useGSAP(() => {
    if (prefersReducedMotion()) return
    const obj = { v: 0 }
    ref.current.textContent = '0'
    gsap.to(obj, {
      v: value,
      duration: 1.6,
      ease: 'power3.out',
      scrollTrigger: { trigger: ref.current, start: 'top 90%', once: true },
      onUpdate: () => { ref.current.textContent = Math.round(obj.v).toLocaleString('en-US') },
    })
  }, { scope: ref })
  return (
    <span className={className}>
      {prefix}<span ref={ref}>{value.toLocaleString('en-US')}</span>{suffix}
    </span>
  )
}
