import { useRef } from 'react'
import { gsap, isFinePointer, prefersReducedMotion } from '../lib/motion'

// Pulls gently toward the cursor. Primary = glowing ember pill, secondary = glass pill.
export default function MagneticButton({ href, variant = 'primary', children, className = '', ...rest }) {
  const ref = useRef(null)
  const active = () => isFinePointer() && !prefersReducedMotion()
  const onMove = (e) => {
    if (!active()) return
    const r = ref.current.getBoundingClientRect()
    gsap.to(ref.current, { x: (e.clientX - r.left - r.width / 2) * 0.22, y: (e.clientY - r.top - r.height / 2) * 0.3, duration: 0.4, ease: 'power3.out' })
  }
  const onLeave = () => active() && gsap.to(ref.current, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.5)' })
  const styles = variant === 'primary' ? 'btn-primary' : 'glass text-bone hover:border-glow/50'
  const Tag = href ? 'a' : 'button'
  return (
    <Tag
      ref={ref}
      href={href}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={`inline-flex min-h-[48px] items-center gap-2.5 rounded-full px-6 text-[0.95rem] font-medium transition-[border-color,box-shadow,background-color] duration-300 ${styles} ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  )
}
