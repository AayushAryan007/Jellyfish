// Glass instrument card with a soft red light that follows the pointer.
export default function GlassCard({ as: Tag = 'div', className = '', children, ...rest }) {
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
  }
  return (
    <Tag onPointerMove={onMove} className={`glass spotlight relative overflow-hidden rounded-[22px] ${className}`} {...rest}>
      {children}
    </Tag>
  )
}
