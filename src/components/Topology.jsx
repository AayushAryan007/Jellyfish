import { useEffect, useRef } from 'react'

// Scene 3 fallback: jellyfish tentacles straighten into a system architecture map.
// `progress` is a ref (0 → 1) driven by scroll.
const NODES = [
  { label: 'REST API', x: 0.24, y: 0.47 },
  { label: 'Django', x: 0.5, y: 0.53 },
  { label: 'Auth · SSO', x: 0.76, y: 0.47 },
  { label: 'Celery', x: 0.15, y: 0.74 },
  { label: 'Redis', x: 0.38, y: 0.8 },
  { label: 'MySQL', x: 0.62, y: 0.8 },
  { label: 'Insurer APIs', x: 0.85, y: 0.74 },
  { label: 'LLM · RAG', x: 0.5, y: 0.94 },
]
const EDGES = [[0, 1], [1, 2], [1, 3], [1, 4], [1, 5], [2, 6], [3, 4], [0, 6], [1, 7], [5, 7]]

const smooth = (a, b, v) => { const t = Math.min(1, Math.max(0, (v - a) / (b - a))); return t * t * (3 - 2 * t) }

export default function Topology({ progress, className = '' }) {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let W = 0, H = 0, raf = 0, visible = true

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const b = canvas.getBoundingClientRect()
      W = b.width; H = b.height
      canvas.width = Math.max(1, W * dpr); canvas.height = Math.max(1, H * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    function draw(now) {
      raf = 0
      const t = now / 1000
      const p = reduce ? 1 : progress.current
      const form = smooth(0.05, 0.75, p)
      ctx.clearRect(0, 0, W, H)
      ctx.globalCompositeOperation = 'lighter'

      const R = Math.min(W * 0.13, H * 0.1)
      const cx = W / 2, cy = H * 0.17 - Math.sin(t * 1.4 - 1) * R * 0.06 * (1 - form)
      const squeeze = Math.max(0, Math.sin(t * 1.4)) * (1 - form * 0.7)
      const w = R * (1 - 0.12 * squeeze), h = R * (0.78 + 0.12 * squeeze)
      const rim = cy + h * 0.12

      const halo = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 3.2)
      halo.addColorStop(0, 'rgba(230,57,43,0.3)'); halo.addColorStop(1, 'rgba(230,57,43,0)')
      ctx.fillStyle = halo; ctx.fillRect(0, 0, W, H)

      // Edges between nodes appear once the tentacles have arrived.
      const edgeA = smooth(0.55, 0.9, p)
      ctx.lineWidth = 1
      for (const [a, b] of EDGES) {
        const A = NODES[a], B = NODES[b]
        ctx.strokeStyle = `rgba(255,90,60,${0.28 * edgeA})`
        ctx.beginPath(); ctx.moveTo(A.x * W, A.y * H); ctx.lineTo(B.x * W, B.y * H); ctx.stroke()
        if (edgeA > 0.6 && !reduce) {
          const k = ((t * 0.35 + a * 0.17 + b * 0.11) % 1)
          ctx.fillStyle = `rgba(255,170,140,${0.9 * edgeA})`
          ctx.beginPath(); ctx.arc(A.x * W + (B.x - A.x) * W * k, A.y * H + (B.y - A.y) * H * k, 1.8, 0, Math.PI * 2); ctx.fill()
        }
      }

      // Tentacles: wavy and hanging at p=0, straight lines into nodes at p=1.
      ctx.lineCap = 'round'
      NODES.forEach((n, i) => {
        const bx = cx + ((i / (NODES.length - 1)) * 2 - 1) * w * 0.85
        const hangX = bx + Math.sin(t * 0.6 + i) * R * 0.3, hangY = rim + R * (2.6 + (i % 3) * 0.5)
        const ex = hangX + (n.x * W - hangX) * form, ey = hangY + (n.y * H - hangY) * form
        const segs = 32
        ctx.beginPath(); ctx.moveTo(bx, rim)
        for (let s = 1; s <= segs; s++) {
          const k = s / segs
          const nx = ex - bx, ny = ey - rim, len = Math.hypot(nx, ny) || 1
          const wave = Math.sin(t * 1.4 - s * 0.25 + i) * R * 0.18 * k * (1 - form)
          ctx.lineTo(bx + nx * k + (-ny / len) * wave, rim + ny * k + (nx / len) * wave)
        }
        const g = ctx.createLinearGradient(bx, rim, ex, ey)
        g.addColorStop(0, 'rgba(255,120,90,0.55)'); g.addColorStop(1, `rgba(255,90,60,${0.08 + 0.5 * form})`)
        ctx.strokeStyle = g; ctx.lineWidth = 1.2; ctx.stroke()

        // Node
        const nA = smooth(0.5, 0.85, p)
        if (nA > 0) {
          const pulse = 1 + Math.sin(t * 2 + i) * 0.15
          const ng = ctx.createRadialGradient(n.x * W, n.y * H, 0, n.x * W, n.y * H, 18 * pulse)
          ng.addColorStop(0, `rgba(255,120,90,${0.7 * nA})`); ng.addColorStop(1, 'rgba(230,57,43,0)')
          ctx.fillStyle = ng; ctx.beginPath(); ctx.arc(n.x * W, n.y * H, 18 * pulse, 0, Math.PI * 2); ctx.fill()
          ctx.fillStyle = `rgba(255,220,205,${nA})`; ctx.beginPath(); ctx.arc(n.x * W, n.y * H, 2.6, 0, Math.PI * 2); ctx.fill()
          ctx.globalCompositeOperation = 'source-over'
          ctx.font = '500 11px "JetBrains Mono", monospace'; ctx.textAlign = 'center'
          ctx.fillStyle = `rgba(244,239,236,${0.75 * nA})`
          ctx.fillText(n.label, n.x * W, n.y * H + 26)
          ctx.globalCompositeOperation = 'lighter'
        }
      })

      // Bell (the hub).
      ctx.beginPath(); ctx.moveTo(cx - w, rim)
      ctx.bezierCurveTo(cx - w * 1.05, cy - h * 1.28, cx + w * 1.05, cy - h * 1.28, cx + w, rim)
      ctx.quadraticCurveTo(cx, rim - h * 0.3, cx - w, rim)
      const bell = ctx.createRadialGradient(cx, cy - h * 0.55, R * 0.05, cx, cy - h * 0.2, w * 1.25)
      bell.addColorStop(0, 'rgba(255,150,120,0.75)'); bell.addColorStop(0.45, 'rgba(230,57,43,0.5)'); bell.addColorStop(1, 'rgba(120,12,8,0.25)')
      ctx.fillStyle = bell; ctx.fill()
      ctx.beginPath(); ctx.moveTo(cx - w, rim); ctx.quadraticCurveTo(cx, rim - h * 0.3, cx + w, rim)
      ctx.strokeStyle = 'rgba(255,170,140,0.55)'; ctx.lineWidth = 1.2; ctx.stroke()

      if (visible && !reduce) raf = requestAnimationFrame(draw)
    }

    resize()
    const ro = new ResizeObserver(() => { resize(); if (reduce) draw(performance.now()) })
    ro.observe(canvas)
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
      if (visible && !raf && !reduce) raf = requestAnimationFrame(draw)
    })
    io.observe(canvas)
    raf = requestAnimationFrame(draw)
    return () => { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect() }
  }, [progress])

  return <canvas ref={ref} className={`absolute inset-0 block h-full w-full ${className}`} role="img" aria-label="A jellyfish whose tentacles connect into a backend architecture: REST API, Django, Auth and SSO, Celery, Redis, MySQL, insurer APIs and an LLM layer." />
}
