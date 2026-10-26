export default function Chip({ children, className = '' }) {
  return (
    <span className={`glass inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[0.8125rem] font-medium text-bone/90 ${className}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-ember shadow-[0_0_10px_2px_rgba(230,57,43,0.7)]" />
      {children}
    </span>
  )
}
